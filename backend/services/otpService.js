// OTP Service - SMS Integration
// backend/services/otpService.js

const twilio = require('twilio');
const OTP = require('../models/OTP');

// Twilio Configuration (Free tier available)
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

class OTPService {
  // Generate and send OTP
  static async sendOTP(mobile, purpose, userType) {
    try {
      // Generate 6-digit OTP
      const otpCode = OTP.generateOTP();
      
      // Save OTP to database
      const otpRecord = new OTP({
        mobile,
        otp: otpCode,
        purpose,
        userType,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      });
      
      await otpRecord.save();
      
      // Send SMS via Twilio
      const message = await client.messages.create({
        body: `Your Shaheen Academy ${purpose} OTP is: ${otpCode}. Valid for 10 minutes. Do not share this OTP.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${mobile}`
      });
      
      console.log(`✅ OTP sent to ${mobile}: ${message.sid}`);
      
      return {
        success: true,
        message: 'OTP sent successfully',
        otpId: otpRecord._id
      };
      
    } catch (error) {
      console.error('❌ OTP sending failed:', error);
      
      // Fallback: For development/testing, return OTP in response
      if (process.env.NODE_ENV === 'development') {
        return {
          success: true,
          message: 'OTP sent successfully (Development Mode)',
          otp: otpCode, // Only in development
          otpId: otpRecord._id
        };
      }
      
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.'
      };
    }
  }
  
  // Verify OTP
  static async verifyOTP(mobile, otp, purpose, userType) {
    try {
      // Find the most recent OTP for this mobile
      const otpRecord = await OTP.findOne({
        mobile,
        purpose,
        userType,
        isUsed: false
      }).sort({ createdAt: -1 });
      
      if (!otpRecord) {
        return {
          success: false,
          message: 'No OTP found for this mobile number'
        };
      }
      
      // Check if OTP is expired
      if (new Date() > otpRecord.expiresAt) {
        return {
          success: false,
          message: 'OTP has expired. Please request a new one.'
        };
      }
      
      // Check attempts
      if (otpRecord.attempts >= 3) {
        return {
          success: false,
          message: 'Too many incorrect attempts. Please request a new OTP.'
        };
      }
      
      // Verify OTP
      if (otpRecord.otp !== otp) {
        otpRecord.attempts += 1;
        await otpRecord.save();
        
        return {
          success: false,
          message: 'Invalid OTP. Please try again.',
          attemptsLeft: 3 - otpRecord.attempts
        };
      }
      
      // Mark OTP as used
      otpRecord.isUsed = true;
      await otpRecord.save();
      
      return {
        success: true,
        message: 'OTP verified successfully'
      };
      
    } catch (error) {
      console.error('❌ OTP verification failed:', error);
      return {
        success: false,
        message: 'OTP verification failed. Please try again.'
      };
    }
  }
  
  // Check if user exists (for login)
  static async checkUserExists(mobile, userType) {
    try {
      let user = null;
      
      if (userType === 'student') {
        const Student = require('../models/Student');
        user = await Student.findOne({ mobile, isActive: true });
      } else if (userType === 'teacher') {
        const Teacher = require('../models/Teacher');
        user = await Teacher.findOne({ mobile, isActive: true });
      } else if (userType === 'parent') {
        const Student = require('../models/Student');
        user = await Student.findOne({
          $or: [
            { fatherMobile: mobile },
            { motherMobile: mobile }
          ],
          isActive: true
        });
      }
      
      if (!user) {
        return {
          success: false,
          message: 'You are not eligible to login. If your child is enrolled in Shaheen Academy, please contact the school.',
          contactMessage: 'Contact Shaheen Academy for assistance.'
        };
      }
      
      // Check if user can login (not locked out)
      if (!user.canLogin()) {
        return {
          success: false,
          message: 'Account temporarily locked due to multiple failed attempts. Please try again later or contact the school.',
          contactMessage: 'Contact Shaheen Academy for assistance.'
        };
      }
      
      return {
        success: true,
        message: 'User found',
        user: user
      };
      
    } catch (error) {
      console.error('❌ User check failed:', error);
      return {
        success: false,
        message: 'User verification failed. Please try again.'
      };
    }
  }
}

module.exports = OTPService;
