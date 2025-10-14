// Payment Gateway Integration Service
// backend/src/services/paymentService.js

const Razorpay = require('razorpay');
const crypto = require('crypto');

class PaymentService {
    constructor() {
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
    }

    // Create online payment order
    async createOnlinePayment(paymentData) {
        try {
            const { studentId, feeInstallmentId, amount, currency = 'INR' } = paymentData;
            
            // Generate unique order ID
            const orderId = `order_${Date.now()}_${studentId}`;
            
            const orderOptions = {
                amount: amount * 100, // Razorpay expects amount in paise
                currency: currency,
                receipt: orderId,
                notes: {
                    studentId: studentId,
                    feeInstallmentId: feeInstallmentId,
                    paymentType: 'fee_payment'
                }
            };

            const order = await this.razorpay.orders.create(orderOptions);
            
            // Store transaction record
            const transaction = await this.storeTransaction({
                studentId,
                feeInstallmentId,
                transactionId: order.id,
                orderId: orderId,
                amount,
                currency,
                paymentStatus: 'pending'
            });

            return {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt,
                razorpayKey: process.env.RAZORPAY_KEY_ID,
                transactionId: transaction.id
            };
        } catch (error) {
            throw new Error(`Payment creation failed: ${error.message}`);
        }
    }

    // Verify payment signature
    async verifyOnlinePayment(verificationData) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, transactionId } = verificationData;
            
            const body = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(body.toString())
                .digest("hex");

            const isAuthentic = expectedSignature === razorpay_signature;

            if (isAuthentic) {
                // Update transaction record
                await this.updateTransaction(transactionId, {
                    paymentId: razorpay_payment_id,
                    paymentStatus: 'success',
                    gatewayResponse: JSON.stringify(verificationData)
                });

                // Create fee payment record
                const payment = await this.createFeePaymentRecord({
                    transactionId,
                    paymentAmount: verificationData.amount,
                    paymentMethod: 'online',
                    paymentReference: razorpay_payment_id,
                    paymentStatus: 'completed'
                });

                return {
                    success: true,
                    paymentId: razorpay_payment_id,
                    payment: payment
                };
            } else {
                await this.updateTransaction(transactionId, {
                    paymentStatus: 'failed',
                    gatewayResponse: JSON.stringify(verificationData)
                });

                return {
                    success: false,
                    message: 'Payment verification failed'
                };
            }
        } catch (error) {
            throw new Error(`Payment verification failed: ${error.message}`);
        }
    }

    // Process refund
    async processRefund(refundData) {
        try {
            const { paymentId, amount, reason } = refundData;
            
            const refundOptions = {
                payment_id: paymentId,
                amount: amount * 100, // Convert to paise
                notes: {
                    reason: reason,
                    refund_type: 'fee_refund'
                }
            };

            const refund = await this.razorpay.payments.refund(paymentId, refundOptions);
            
            // Update payment record
            await this.updatePaymentStatus(paymentId, 'refunded', refund.id);
            
            return {
                refundId: refund.id,
                amount: refund.amount,
                status: refund.status
            };
        } catch (error) {
            throw new Error(`Refund processing failed: ${error.message}`);
        }
    }

    // Store transaction record
    async storeTransaction(transactionData) {
        // This would typically interact with your database
        // For now, returning a mock implementation
        return {
            id: `txn_${Date.now()}`,
            ...transactionData,
            createdAt: new Date()
        };
    }

    // Update transaction record
    async updateTransaction(transactionId, updateData) {
        // Database update implementation
        console.log(`Updating transaction ${transactionId}:`, updateData);
        return true;
    }

    // Create fee payment record
    async createFeePaymentRecord(paymentData) {
        // Database insert implementation
        return {
            id: `payment_${Date.now()}`,
            ...paymentData,
            paymentDate: new Date(),
            receiptNumber: `RCP-${Date.now()}`
        };
    }

    // Update payment status
    async updatePaymentStatus(paymentId, status, refundId = null) {
        // Database update implementation
        console.log(`Updating payment ${paymentId} status to ${status}`);
        return true;
    }

    // Get payment gateways
    async getPaymentGateways(schoolId) {
        return [
            {
                id: 'razorpay',
                name: 'Razorpay',
                type: 'online',
                isActive: true,
                supportedMethods: ['card', 'netbanking', 'upi', 'wallet'],
                processingFee: 2.0
            },
            {
                id: 'payu',
                name: 'PayU',
                type: 'online',
                isActive: false,
                supportedMethods: ['card', 'netbanking', 'upi'],
                processingFee: 1.8
            }
        ];
    }

    // Create payment gateway configuration
    async createPaymentGateway(gatewayData) {
        // Database insert implementation
        return {
            id: `gateway_${Date.now()}`,
            ...gatewayData,
            createdAt: new Date()
        };
    }

    // Update payment gateway configuration
    async updatePaymentGateway(gatewayId, updateData) {
        // Database update implementation
        return {
            id: gatewayId,
            ...updateData,
            updatedAt: new Date()
        };
    }

    // Generate payment link for offline payments
    async generatePaymentLink(paymentData) {
        try {
            const { studentId, amount, description } = paymentData;
            
            const paymentLinkOptions = {
                amount: amount * 100,
                currency: 'INR',
                description: description,
                customer: {
                    name: `Student ${studentId}`,
                    email: `student${studentId}@school.com`
                },
                notify: {
                    sms: true,
                    email: true
                },
                reminder_enable: true,
                callback_url: `${process.env.FRONTEND_URL}/payment/callback`,
                callback_method: 'get'
            };

            const paymentLink = await this.razorpay.paymentLink.create(paymentLinkOptions);
            
            return {
                paymentLinkId: paymentLink.id,
                shortUrl: paymentLink.short_url,
                status: paymentLink.status
            };
        } catch (error) {
            throw new Error(`Payment link generation failed: ${error.message}`);
        }
    }

    // Get payment analytics
    async getPaymentAnalytics(schoolId, dateRange) {
        return {
            totalTransactions: 1250,
            successfulTransactions: 1180,
            failedTransactions: 70,
            totalAmount: 1250000,
            averageTransactionValue: 1000,
            paymentMethodBreakdown: {
                online: 65,
                cash: 25,
                cheque: 10
            },
            monthlyTrend: [
                { month: 'Jan', amount: 100000 },
                { month: 'Feb', amount: 120000 },
                { month: 'Mar', amount: 150000 }
            ]
        };
    }
}

module.exports = new PaymentService();
