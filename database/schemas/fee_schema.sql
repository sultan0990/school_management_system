-- Fee Management System Database Schema
-- Comprehensive fee structure for school management system

-- Fee structures table (defines different fee types)
CREATE TABLE fee_structures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    structure_name VARCHAR(255) NOT NULL, -- e.g., "Annual Fee Structure 2024-25"
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fee categories table (tuition, transport, library, etc.)
CREATE TABLE fee_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    category_name VARCHAR(100) NOT NULL, -- e.g., "Tuition Fee", "Transport Fee", "Library Fee"
    category_code VARCHAR(20) NOT NULL, -- e.g., "TUI", "TRP", "LIB"
    description TEXT,
    is_mandatory BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, category_code)
);

-- Fee items table (specific fees within categories)
CREATE TABLE fee_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fee_structure_id UUID REFERENCES fee_structures(id) ON DELETE CASCADE,
    fee_category_id UUID REFERENCES fee_categories(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL, -- e.g., "Monthly Tuition", "Annual Development Fee"
    item_code VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    frequency VARCHAR(20) NOT NULL, -- monthly, quarterly, half_yearly, yearly, one_time
    due_date DATE,
    late_fee_amount DECIMAL(10,2) DEFAULT 0,
    late_fee_percentage DECIMAL(5,2) DEFAULT 0,
    late_fee_grace_days INTEGER DEFAULT 0,
    is_optional BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Student fee assignments (which fees apply to which students)
CREATE TABLE student_fee_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    fee_structure_id UUID REFERENCES fee_structures(id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE,
    assigned_date DATE DEFAULT CURRENT_DATE,
    total_amount DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    discount_reason TEXT,
    scholarship_amount DECIMAL(10,2) DEFAULT 0,
    scholarship_type VARCHAR(100),
    net_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, cancelled, completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fee installments (breakdown of fees into installments)
CREATE TABLE fee_installments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_fee_assignment_id UUID REFERENCES student_fee_assignments(id) ON DELETE CASCADE,
    fee_item_id UUID REFERENCES fee_items(id) ON DELETE CASCADE,
    installment_number INTEGER NOT NULL,
    installment_name VARCHAR(255) NOT NULL, -- e.g., "April Installment", "Q1 Installment"
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    late_fee_amount DECIMAL(10,2) DEFAULT 0,
    late_fee_percentage DECIMAL(5,2) DEFAULT 0,
    late_fee_grace_days INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, overdue, waived, cancelled
    paid_amount DECIMAL(10,2) DEFAULT 0,
    paid_date DATE,
    payment_method VARCHAR(50),
    payment_reference VARCHAR(255),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fee payments table (actual payment records)
CREATE TABLE fee_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    fee_installment_id UUID REFERENCES fee_installments(id) ON DELETE CASCADE,
    payment_amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- cash, cheque, online, card, upi, neft
    payment_reference VARCHAR(255),
    bank_name VARCHAR(255),
    cheque_number VARCHAR(100),
    cheque_date DATE,
    online_transaction_id VARCHAR(255),
    payment_status VARCHAR(20) DEFAULT 'completed', -- completed, pending, failed, refunded
    collected_by UUID REFERENCES teachers(id),
    receipt_number VARCHAR(100) UNIQUE,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fee waivers and discounts
CREATE TABLE fee_waivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    fee_installment_id UUID REFERENCES fee_installments(id) ON DELETE CASCADE,
    waiver_type VARCHAR(50) NOT NULL, -- discount, scholarship, waiver, concession
    waiver_amount DECIMAL(10,2) NOT NULL,
    waiver_percentage DECIMAL(5,2),
    reason TEXT NOT NULL,
    approved_by UUID REFERENCES teachers(id),
    approved_date DATE DEFAULT CURRENT_DATE,
    valid_from DATE DEFAULT CURRENT_DATE,
    valid_to DATE,
    status VARCHAR(20) DEFAULT 'approved', -- approved, pending, rejected, expired
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fee collection reports
CREATE TABLE fee_collection_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE,
    report_date DATE NOT NULL,
    report_type VARCHAR(50) NOT NULL, -- daily, monthly, quarterly, yearly
    total_due_amount DECIMAL(12,2) DEFAULT 0,
    total_collected_amount DECIMAL(12,2) DEFAULT 0,
    total_pending_amount DECIMAL(12,2) DEFAULT 0,
    total_overdue_amount DECIMAL(12,2) DEFAULT 0,
    collection_percentage DECIMAL(5,2) DEFAULT 0,
    total_students INTEGER DEFAULT 0,
    paid_students INTEGER DEFAULT 0,
    pending_students INTEGER DEFAULT 0,
    overdue_students INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fee payment reminders
CREATE TABLE fee_reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    fee_installment_id UUID REFERENCES fee_installments(id) ON DELETE CASCADE,
    reminder_type VARCHAR(50) NOT NULL, -- sms, email, whatsapp, call
    reminder_date DATE NOT NULL,
    reminder_message TEXT,
    sent_status VARCHAR(20) DEFAULT 'pending', -- pending, sent, failed, delivered
    sent_at TIMESTAMP WITH TIME ZONE,
    response_received TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fee payment gateways integration
CREATE TABLE payment_gateways (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    gateway_name VARCHAR(100) NOT NULL, -- razorpay, payu, paytm, stripe
    gateway_type VARCHAR(50) NOT NULL, -- online, offline, hybrid
    merchant_id VARCHAR(255),
    api_key VARCHAR(500),
    secret_key VARCHAR(500),
    webhook_secret VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    supported_payment_methods TEXT[], -- array of payment methods
    processing_fee_percentage DECIMAL(5,2) DEFAULT 0,
    processing_fee_fixed DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fee payment transactions (for online payments)
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    fee_installment_id UUID REFERENCES fee_installments(id) ON DELETE CASCADE,
    payment_gateway_id UUID REFERENCES payment_gateways(id),
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    order_id VARCHAR(255),
    payment_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, success, failed, cancelled, refunded
    gateway_response TEXT,
    webhook_data TEXT,
    refund_amount DECIMAL(10,2) DEFAULT 0,
    refund_reason TEXT,
    refund_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_fee_structures_school ON fee_structures(school_id);
CREATE INDEX idx_fee_structures_academic_year ON fee_structures(academic_year_id);
CREATE INDEX idx_fee_structures_class ON fee_structures(class_id);
CREATE INDEX idx_fee_structures_active ON fee_structures(is_active);

CREATE INDEX idx_fee_categories_school ON fee_categories(school_id);
CREATE INDEX idx_fee_categories_active ON fee_categories(is_active);

CREATE INDEX idx_fee_items_structure ON fee_items(fee_structure_id);
CREATE INDEX idx_fee_items_category ON fee_items(fee_category_id);
CREATE INDEX idx_fee_items_active ON fee_items(is_active);

CREATE INDEX idx_student_fee_assignments_student ON student_fee_assignments(student_id);
CREATE INDEX idx_student_fee_assignments_structure ON student_fee_assignments(fee_structure_id);
CREATE INDEX idx_student_fee_assignments_year ON student_fee_assignments(academic_year_id);
CREATE INDEX idx_student_fee_assignments_status ON student_fee_assignments(status);

CREATE INDEX idx_fee_installments_assignment ON fee_installments(student_fee_assignment_id);
CREATE INDEX idx_fee_installments_item ON fee_installments(fee_item_id);
CREATE INDEX idx_fee_installments_status ON fee_installments(status);
CREATE INDEX idx_fee_installments_due_date ON fee_installments(due_date);

CREATE INDEX idx_fee_payments_student ON fee_payments(student_id);
CREATE INDEX idx_fee_payments_installment ON fee_payments(fee_installment_id);
CREATE INDEX idx_fee_payments_date ON fee_payments(payment_date);
CREATE INDEX idx_fee_payments_status ON fee_payments(payment_status);
CREATE INDEX idx_fee_payments_receipt ON fee_payments(receipt_number);

CREATE INDEX idx_fee_waivers_student ON fee_waivers(student_id);
CREATE INDEX idx_fee_waivers_installment ON fee_waivers(fee_installment_id);
CREATE INDEX idx_fee_waivers_status ON fee_waivers(status);

CREATE INDEX idx_fee_collection_reports_school ON fee_collection_reports(school_id);
CREATE INDEX idx_fee_collection_reports_year ON fee_collection_reports(academic_year_id);
CREATE INDEX idx_fee_collection_reports_date ON fee_collection_reports(report_date);

CREATE INDEX idx_fee_reminders_student ON fee_reminders(student_id);
CREATE INDEX idx_fee_reminders_installment ON fee_reminders(fee_installment_id);
CREATE INDEX idx_fee_reminders_date ON fee_reminders(reminder_date);
CREATE INDEX idx_fee_reminders_status ON fee_reminders(sent_status);

CREATE INDEX idx_payment_gateways_school ON payment_gateways(school_id);
CREATE INDEX idx_payment_gateways_active ON payment_gateways(is_active);

CREATE INDEX idx_payment_transactions_student ON payment_transactions(student_id);
CREATE INDEX idx_payment_transactions_installment ON payment_transactions(fee_installment_id);
CREATE INDEX idx_payment_transactions_gateway ON payment_transactions(payment_gateway_id);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(payment_status);
CREATE INDEX idx_payment_transactions_date ON payment_transactions(created_at);

-- Create triggers for updated_at
CREATE TRIGGER update_fee_structures_updated_at BEFORE UPDATE ON fee_structures
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fee_items_updated_at BEFORE UPDATE ON fee_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_fee_assignments_updated_at BEFORE UPDATE ON student_fee_assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fee_installments_updated_at BEFORE UPDATE ON fee_installments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fee_payments_updated_at BEFORE UPDATE ON fee_payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_gateways_updated_at BEFORE UPDATE ON payment_gateways
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create views for common queries
CREATE VIEW v_student_fee_summary AS
SELECT 
    s.id as student_id,
    s.student_id as student_number,
    s.first_name,
    s.last_name,
    c.class_name,
    c.section,
    ay.year_name as academic_year,
    sfa.total_amount,
    sfa.discount_amount,
    sfa.scholarship_amount,
    sfa.net_amount,
    sfa.status,
    COALESCE(SUM(fi.amount), 0) as total_due,
    COALESCE(SUM(fp.payment_amount), 0) as total_paid,
    COALESCE(SUM(fi.amount), 0) - COALESCE(SUM(fp.payment_amount), 0) as balance_amount
FROM students s
JOIN classes c ON s.class_id = c.id
JOIN student_fee_assignments sfa ON s.id = sfa.student_id
JOIN academic_years ay ON sfa.academic_year_id = ay.id
LEFT JOIN fee_installments fi ON sfa.id = fi.student_fee_assignment_id
LEFT JOIN fee_payments fp ON fi.id = fp.fee_installment_id
WHERE s.is_active = true
GROUP BY s.id, s.student_id, s.first_name, s.last_name, c.class_name, c.section, 
         ay.year_name, sfa.total_amount, sfa.discount_amount, sfa.scholarship_amount, 
         sfa.net_amount, sfa.status;

CREATE VIEW v_fee_collection_summary AS
SELECT 
    school_id,
    academic_year_id,
    DATE_TRUNC('month', payment_date) as month,
    COUNT(DISTINCT student_id) as students_paid,
    COUNT(*) as total_payments,
    SUM(payment_amount) as total_collected,
    AVG(payment_amount) as average_payment
FROM fee_payments
WHERE payment_status = 'completed'
GROUP BY school_id, academic_year_id, DATE_TRUNC('month', payment_date);
