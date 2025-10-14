// Admin Routes - Create Students and Teachers
// backend/routes/admin.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const router = express.Router();

// Create Student (Admin)
router.post('/create-student', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('dateOfBirth').isISO8601().withMessage('Invalid date of birth'),
  body('classSection').notEmpty().withMessage('Class section is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('currentAddress').notEmpty().withMessage('Current address is required'),
  body('permanentAddress').notEmpty().withMessage('Permanent address is required'),
  body('fatherName').notEmpty().withMessage('Father name is required'),
  body('fatherMobile').isLength({ min: 10, max: 10 }).withMessage('Father mobile must be 10 digits'),
  body('motherName').notEmpty().withMessage('Mother name is required'),
  body('motherMobile').isLength({ min: 10, max: 10 }).withMessage('Mother mobile must be 10 digits'),
  body('admissionDate').isISO8601().withMessage('Invalid admission date')
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

    const studentData = req.body;

    // Generate unique GR Number
    const grNumber = await Student.generateGRNumber();
    studentData.grNumber = grNumber;

    // Create student
    const student = new Student(studentData);
    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      student: {
        id: student._id,
        studentId: student.studentId,
        grNumber: student.grNumber,
        name: `${student.firstName} ${student.lastName}`,
        mobile: student.mobile,
        classSection: student.classSection,
        fatherMobile: student.fatherMobile,
        motherMobile: student.motherMobile,
        admissionDate: student.admissionDate
      }
    });

  } catch (error) {
    console.error('❌ Create student error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create student'
    });
  }
});

// Create Teacher (Admin)
router.post('/create-teacher', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('dateOfBirth').isISO8601().withMessage('Invalid date of birth'),
  body('qualification').notEmpty().withMessage('Qualification is required'),
  body('subjects').isArray({ min: 1 }).withMessage('At least one subject is required'),
  body('classes').isArray({ min: 1 }).withMessage('At least one class is required'),
  body('currentAddress').notEmpty().withMessage('Current address is required'),
  body('permanentAddress').notEmpty().withMessage('Permanent address is required'),
  body('joiningDate').isISO8601().withMessage('Invalid joining date')
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

    const teacherData = req.body;

    // Create teacher
    const teacher = new Teacher(teacherData);
    await teacher.save();

    res.status(201).json({
      success: true,
      message: 'Teacher created successfully',
      teacher: {
        id: teacher._id,
        teacherId: teacher.teacherId,
        name: `${teacher.firstName} ${teacher.lastName}`,
        mobile: teacher.mobile,
        email: teacher.email,
        qualification: teacher.qualification,
        subjects: teacher.subjects,
        classes: teacher.classes,
        hasStudentPermission: teacher.hasStudentPermission,
        hasParentPermission: teacher.hasParentPermission,
        joiningDate: teacher.joiningDate
      }
    });

  } catch (error) {
    console.error('❌ Create teacher error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create teacher'
    });
  }
});

// Get All Students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({ isActive: true })
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Students retrieved successfully',
      students: students.map(student => ({
        id: student._id,
        studentId: student.studentId,
        grNumber: student.grNumber,
        name: `${student.firstName} ${student.lastName}`,
        mobile: student.mobile,
        email: student.email,
        gender: student.gender,
        classSection: student.classSection,
        category: student.category,
        fatherName: student.fatherName,
        fatherMobile: student.fatherMobile,
        motherName: student.motherName,
        motherMobile: student.motherMobile,
        admissionDate: student.admissionDate,
        createdAt: student.createdAt
      }))
    });

  } catch (error) {
    console.error('❌ Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students'
    });
  }
});

// Get All Teachers
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find({ isActive: true })
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Teachers retrieved successfully',
      teachers: teachers.map(teacher => ({
        id: teacher._id,
        teacherId: teacher.teacherId,
        name: `${teacher.firstName} ${teacher.lastName}`,
        mobile: teacher.mobile,
        email: teacher.email,
        gender: teacher.gender,
        qualification: teacher.qualification,
        subjects: teacher.subjects,
        classes: teacher.classes,
        hasStudentPermission: teacher.hasStudentPermission,
        hasParentPermission: teacher.hasParentPermission,
        joiningDate: teacher.joiningDate,
        createdAt: teacher.createdAt
      }))
    });

  } catch (error) {
    console.error('❌ Get teachers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve teachers'
    });
  }
});

// Get Student by ID
router.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student retrieved successfully',
      student
    });

  } catch (error) {
    console.error('❌ Get student error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve student'
    });
  }
});

// Get Teacher by ID
router.get('/teacher/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      message: 'Teacher retrieved successfully',
      teacher
    });

  } catch (error) {
    console.error('❌ Get teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve teacher'
    });
  }
});

module.exports = router;
