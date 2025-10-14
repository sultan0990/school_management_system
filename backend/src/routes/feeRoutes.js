// Fee Management API Routes
// backend/src/routes/feeRoutes.js

const express = require('express');
const router = express.Router();
const feeController = require('../controllers/feeController');
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validation');

// Fee Structure Management
router.get('/structures', authMiddleware, feeController.getFeeStructures);
router.post('/structures', authMiddleware, validationMiddleware.validateFeeStructure, feeController.createFeeStructure);
router.put('/structures/:id', authMiddleware, validationMiddleware.validateFeeStructure, feeController.updateFeeStructure);
router.delete('/structures/:id', authMiddleware, feeController.deleteFeeStructure);

// Fee Categories Management
router.get('/categories', authMiddleware, feeController.getFeeCategories);
router.post('/categories', authMiddleware, validationMiddleware.validateFeeCategory, feeController.createFeeCategory);
router.put('/categories/:id', authMiddleware, validationMiddleware.validateFeeCategory, feeController.updateFeeCategory);
router.delete('/categories/:id', authMiddleware, feeController.deleteFeeCategory);

// Fee Items Management
router.get('/items', authMiddleware, feeController.getFeeItems);
router.post('/items', authMiddleware, validationMiddleware.validateFeeItem, feeController.createFeeItem);
router.put('/items/:id', authMiddleware, validationMiddleware.validateFeeItem, feeController.updateFeeItem);
router.delete('/items/:id', authMiddleware, feeController.deleteFeeItem);

// Student Fee Assignment
router.get('/assignments', authMiddleware, feeController.getStudentFeeAssignments);
router.post('/assignments', authMiddleware, validationMiddleware.validateStudentFeeAssignment, feeController.createStudentFeeAssignment);
router.put('/assignments/:id', authMiddleware, validationMiddleware.validateStudentFeeAssignment, feeController.updateStudentFeeAssignment);
router.delete('/assignments/:id', authMiddleware, feeController.deleteStudentFeeAssignment);

// Fee Installments
router.get('/installments', authMiddleware, feeController.getFeeInstallments);
router.get('/installments/student/:studentId', authMiddleware, feeController.getStudentInstallments);
router.put('/installments/:id', authMiddleware, feeController.updateInstallment);

// Fee Payments
router.get('/payments', authMiddleware, feeController.getFeePayments);
router.post('/payments', authMiddleware, validationMiddleware.validateFeePayment, feeController.createFeePayment);
router.put('/payments/:id', authMiddleware, validationMiddleware.validateFeePayment, feeController.updateFeePayment);
router.delete('/payments/:id', authMiddleware, feeController.deleteFeePayment);

// Online Payment Integration
router.post('/payments/online', authMiddleware, validationMiddleware.validateOnlinePayment, feeController.createOnlinePayment);
router.post('/payments/verify', authMiddleware, feeController.verifyOnlinePayment);
router.post('/payments/refund', authMiddleware, validationMiddleware.validateRefund, feeController.processRefund);

// Fee Waivers and Discounts
router.get('/waivers', authMiddleware, feeController.getFeeWaivers);
router.post('/waivers', authMiddleware, validationMiddleware.validateFeeWaiver, feeController.createFeeWaiver);
router.put('/waivers/:id', authMiddleware, validationMiddleware.validateFeeWaiver, feeController.updateFeeWaiver);
router.delete('/waivers/:id', authMiddleware, feeController.deleteFeeWaiver);

// Fee Reports
router.get('/reports/summary', authMiddleware, feeController.getFeeSummaryReport);
router.get('/reports/collection', authMiddleware, feeController.getCollectionReport);
router.get('/reports/outstanding', authMiddleware, feeController.getOutstandingReport);
router.get('/reports/student/:studentId', authMiddleware, feeController.getStudentFeeReport);

// Fee Reminders
router.get('/reminders', authMiddleware, feeController.getFeeReminders);
router.post('/reminders', authMiddleware, validationMiddleware.validateFeeReminder, feeController.createFeeReminder);
router.post('/reminders/send', authMiddleware, feeController.sendFeeReminders);

// Payment Gateways
router.get('/gateways', authMiddleware, feeController.getPaymentGateways);
router.post('/gateways', authMiddleware, validationMiddleware.validatePaymentGateway, feeController.createPaymentGateway);
router.put('/gateways/:id', authMiddleware, validationMiddleware.validatePaymentGateway, feeController.updatePaymentGateway);

// Fee Dashboard Data
router.get('/dashboard', authMiddleware, feeController.getFeeDashboardData);

module.exports = router;
