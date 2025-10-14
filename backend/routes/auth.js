// Authentication Routes - OTP Login System
// backend/routes/auth.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const OTPService = require('../services/otpService');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Generate JWT Token
const generateToken = (user, userType) => {
  return jwt.sign(
    { 
      userId: user._id, 
      userType: userType,
      mobile: user.mobile 
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Request OTP for Login
router.post('/request-otp', [
  body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
  body('userType').isIn(['student', 'teacher', 'parent']).withMessage('Invalid user type')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { mobile, userType } = req.body;

    // Check if user exists
    const userCheck = await OTPService.checkUserExists(mobile, userType);
    if (!userCheck.success) {
      return res.status(400).json({
        success: false,
        message: userCheck.message,
        contactMessage: userCheck.contactMessage
      });
    }

    // Send OTP
    const otpResult = await OTPService.sendOTP(mobile, 'login', userType);
    
    if (otpResult.success) {
      res.json({
        success: true,
        message: 'OTP sent to your mobile number',
        // In development, include OTP for testing
        ...(process.env.NODE_ENV === 'development' && { otp: otpResult.otp })
      });
    } else {
      res.status(500).json({
        success: false,
        message: otpResult.message
      });
    }

  } catch (error) {
    console.error('❌ Request OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify OTP and Login
router.post('/verify-otp', [
  body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  body('userType').isIn(['student', 'teacher', 'parent']).withMessage('Invalid user type')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { mobile, otp, userType } = req.body;

    // Verify OTP
    const otpVerification = await OTPService.verifyOTP(mobile, otp, 'login', userType);
    
    if (!otpVerification.success) {
      return res.status(400).json({
        success: false,
        message: otpVerification.message,
        attemptsLeft: otpVerification.attemptsLeft
      });
    }

    // Get user details
    let user = null;
    if (userType === 'student') {
      user = await Student.findOne({ mobile, isActive: true });
    } else if (userType === 'teacher') {
      user = await Teacher.findOne({ mobile, isActive: true });
    } else if (userType === 'parent') {
      user = await Student.findOne({
        $or: [
          { fatherMobile: mobile },
          { motherMobile: mobile }
        ],
        isActive: true
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lastLoginAttempt = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken(user, userType);

    // Prepare user data (exclude sensitive info)
    const userData = {
      id: user._id,
      userId: user.studentId || user.teacherId,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
      userType: userType
    };

    // Add specific data based on user type
    if (userType === 'student') {
      userData.classSection = user.classSection;
      userData.grNumber = user.grNumber;
      userData.fatherName = user.fatherName;
      userData.motherName = user.motherName;
    } else if (userType === 'teacher') {
      userData.qualification = user.qualification;
      userData.subjects = user.subjects;
      userData.classes = user.classes;
      userData.hasStudentPermission = user.hasStudentPermission;
      userData.hasParentPermission = user.hasParentPermission;
    } else if (userType === 'parent') {
      userData.childName = `${user.firstName} ${user.lastName}`;
      userData.childClass = user.classSection;
      userData.childGRNumber = user.grNumber;
    }

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('❌ Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Check Login Status
router.get('/status', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    res.json({
      success: true,
      message: 'Token is valid',
      user: decoded
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Logout (Client-side token removal)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
