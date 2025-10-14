// OTP Model - For Authentication
// backend/models/OTP.js

const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: 'Invalid mobile number'
    }
  },
  otp: {
    type: String,
    required: true,
    length: 6
  },
  purpose: {
    type: String,
    enum: ['login', 'registration', 'password_reset'],
    required: true
  },
  userType: {
    type: String,
    enum: ['student', 'teacher', 'parent'],
    required: true
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
otpSchema.index({ mobile: 1, createdAt: -1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static method to generate OTP
otpSchema.statics.generateOTP = function() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Instance method to check if OTP is valid
otpSchema.methods.isValid = function() {
  return !this.isUsed && 
         this.attempts < 3 && 
         new Date() < this.expiresAt;
};

module.exports = mongoose.model('OTP', otpSchema);
