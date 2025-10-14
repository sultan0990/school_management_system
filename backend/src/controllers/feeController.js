// Fee Management Controller
// backend/src/controllers/feeController.js

const feeService = require('../services/feeService');
const paymentService = require('../services/paymentService');
const notificationService = require('../services/notificationService');
const { validationResult } = require('express-validator');

class FeeController {
    // Fee Structure Management
    async getFeeStructures(req, res) {
        try {
            const { schoolId, academicYearId, classId } = req.query;
            const structures = await feeService.getFeeStructures(schoolId, academicYearId, classId);
            res.json({ success: true, data: structures });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createFeeStructure(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const structure = await feeService.createFeeStructure(req.body);
            res.status(201).json({ success: true, data: structure });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateFeeStructure(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const structure = await feeService.updateFeeStructure(req.params.id, req.body);
            res.json({ success: true, data: structure });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteFeeStructure(req, res) {
        try {
            await feeService.deleteFeeStructure(req.params.id);
            res.json({ success: true, message: 'Fee structure deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Fee Categories Management
    async getFeeCategories(req, res) {
        try {
            const { schoolId } = req.query;
            const categories = await feeService.getFeeCategories(schoolId);
            res.json({ success: true, data: categories });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createFeeCategory(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const category = await feeService.createFeeCategory(req.body);
            res.status(201).json({ success: true, data: category });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateFeeCategory(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const category = await feeService.updateFeeCategory(req.params.id, req.body);
            res.json({ success: true, data: category });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteFeeCategory(req, res) {
        try {
            await feeService.deleteFeeCategory(req.params.id);
            res.json({ success: true, message: 'Fee category deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Fee Items Management
    async getFeeItems(req, res) {
        try {
            const { feeStructureId, feeCategoryId } = req.query;
            const items = await feeService.getFeeItems(feeStructureId, feeCategoryId);
            res.json({ success: true, data: items });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createFeeItem(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const item = await feeService.createFeeItem(req.body);
            res.status(201).json({ success: true, data: item });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateFeeItem(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const item = await feeService.updateFeeItem(req.params.id, req.body);
            res.json({ success: true, data: item });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteFeeItem(req, res) {
        try {
            await feeService.deleteFeeItem(req.params.id);
            res.json({ success: true, message: 'Fee item deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Student Fee Assignment
    async getStudentFeeAssignments(req, res) {
        try {
            const { studentId, academicYearId, status } = req.query;
            const assignments = await feeService.getStudentFeeAssignments(studentId, academicYearId, status);
            res.json({ success: true, data: assignments });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createStudentFeeAssignment(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const assignment = await feeService.createStudentFeeAssignment(req.body);
            res.status(201).json({ success: true, data: assignment });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateStudentFeeAssignment(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const assignment = await feeService.updateStudentFeeAssignment(req.params.id, req.body);
            res.json({ success: true, data: assignment });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteStudentFeeAssignment(req, res) {
        try {
            await feeService.deleteStudentFeeAssignment(req.params.id);
            res.json({ success: true, message: 'Student fee assignment deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Fee Installments
    async getFeeInstallments(req, res) {
        try {
            const { studentId, status, dueDateFrom, dueDateTo } = req.query;
            const installments = await feeService.getFeeInstallments(studentId, status, dueDateFrom, dueDateTo);
            res.json({ success: true, data: installments });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getStudentInstallments(req, res) {
        try {
            const installments = await feeService.getStudentInstallments(req.params.studentId);
            res.json({ success: true, data: installments });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateInstallment(req, res) {
        try {
            const installment = await feeService.updateInstallment(req.params.id, req.body);
            res.json({ success: true, data: installment });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Fee Payments
    async getFeePayments(req, res) {
        try {
            const { studentId, paymentDateFrom, paymentDateTo, paymentMethod, status } = req.query;
            const payments = await feeService.getFeePayments(studentId, paymentDateFrom, paymentDateTo, paymentMethod, status);
            res.json({ success: true, data: payments });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createFeePayment(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const payment = await feeService.createFeePayment(req.body);
            res.status(201).json({ success: true, data: payment });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateFeePayment(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const payment = await feeService.updateFeePayment(req.params.id, req.body);
            res.json({ success: true, data: payment });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteFeePayment(req, res) {
        try {
            await feeService.deleteFeePayment(req.params.id);
            res.json({ success: true, message: 'Fee payment deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Online Payment Integration
    async createOnlinePayment(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const paymentData = await paymentService.createOnlinePayment(req.body);
            res.status(201).json({ success: true, data: paymentData });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async verifyOnlinePayment(req, res) {
        try {
            const verificationResult = await paymentService.verifyOnlinePayment(req.body);
            res.json({ success: true, data: verificationResult });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async processRefund(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const refundResult = await paymentService.processRefund(req.body);
            res.json({ success: true, data: refundResult });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Fee Waivers and Discounts
    async getFeeWaivers(req, res) {
        try {
            const { studentId, waiverType, status } = req.query;
            const waivers = await feeService.getFeeWaivers(studentId, waiverType, status);
            res.json({ success: true, data: waivers });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createFeeWaiver(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const waiver = await feeService.createFeeWaiver(req.body);
            res.status(201).json({ success: true, data: waiver });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateFeeWaiver(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const waiver = await feeService.updateFeeWaiver(req.params.id, req.body);
            res.json({ success: true, data: waiver });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteFeeWaiver(req, res) {
        try {
            await feeService.deleteFeeWaiver(req.params.id);
            res.json({ success: true, message: 'Fee waiver deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Fee Reports
    async getFeeSummaryReport(req, res) {
        try {
            const { schoolId, academicYearId, classId, dateFrom, dateTo } = req.query;
            const report = await feeService.getFeeSummaryReport(schoolId, academicYearId, classId, dateFrom, dateTo);
            res.json({ success: true, data: report });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getCollectionReport(req, res) {
        try {
            const { schoolId, academicYearId, period } = req.query;
            const report = await feeService.getCollectionReport(schoolId, academicYearId, period);
            res.json({ success: true, data: report });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getOutstandingReport(req, res) {
        try {
            const { schoolId, academicYearId, classId, overdueDays } = req.query;
            const report = await feeService.getOutstandingReport(schoolId, academicYearId, classId, overdueDays);
            res.json({ success: true, data: report });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getStudentFeeReport(req, res) {
        try {
            const report = await feeService.getStudentFeeReport(req.params.studentId);
            res.json({ success: true, data: report });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Fee Reminders
    async getFeeReminders(req, res) {
        try {
            const { studentId, reminderType, status } = req.query;
            const reminders = await feeService.getFeeReminders(studentId, reminderType, status);
            res.json({ success: true, data: reminders });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createFeeReminder(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const reminder = await feeService.createFeeReminder(req.body);
            res.status(201).json({ success: true, data: reminder });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async sendFeeReminders(req, res) {
        try {
            const result = await notificationService.sendFeeReminders(req.body);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Payment Gateways
    async getPaymentGateways(req, res) {
        try {
            const { schoolId } = req.query;
            const gateways = await paymentService.getPaymentGateways(schoolId);
            res.json({ success: true, data: gateways });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createPaymentGateway(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const gateway = await paymentService.createPaymentGateway(req.body);
            res.status(201).json({ success: true, data: gateway });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updatePaymentGateway(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const gateway = await paymentService.updatePaymentGateway(req.params.id, req.body);
            res.json({ success: true, data: gateway });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Fee Dashboard Data
    async getFeeDashboardData(req, res) {
        try {
            const { schoolId, academicYearId } = req.query;
            const dashboardData = await feeService.getFeeDashboardData(schoolId, academicYearId);
            res.json({ success: true, data: dashboardData });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new FeeController();
