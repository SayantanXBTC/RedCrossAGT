import PDFDocument from 'pdfkit';
import logger from '../utils/logger.js';

// Membership pricing
const membershipPricing = {
    individual: { amount: 500, currency: 'Rs', description: 'Individual Membership (1 Year)' },
    family: { amount: 1000, currency: 'Rs', description: 'Family Membership (1 Year)' },
    corporate: { amount: 'Custom', currency: '', description: 'Corporate Membership (Contact Office)' }
};

// Generate receipt number
const generateReceiptNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `IRCS-TR-${timestamp.slice(-6)}${random}`;
};

// Generate membership receipt PDF
export const generateMembershipReceiptPDF = (memberData) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const chunks = [];

            // Collect PDF data
            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(chunks);
                resolve(pdfBuffer);
            });

            // Generate receipt number
            const receiptNumber = generateReceiptNumber();
            const currentDate = new Date().toLocaleDateString('en-IN');
            const membershipType = memberData.membershipType || 'individual';
            const pricing = membershipPricing[membershipType];

            // Header with Red Cross branding
            doc.fontSize(20)
                .fillColor('#DC2626')
                .text('Indian Red Cross Society', 50, 50)
                .fontSize(14)
                .fillColor('#666666')
                .text('Tripura State Branch', 50, 75)
                .text('Red Cross Bhavan, Agartala, Tripura 799001', 50, 95);

            // Title
            doc.fontSize(18)
                .fillColor('#000000')
                .text('MEMBERSHIP APPLICATION RECEIPT', 50, 140, { align: 'center' });

            // Receipt details box
            doc.rect(50, 170, 500, 200)
                .stroke('#DC2626')
                .lineWidth(2);

            // Receipt content
            let yPosition = 190;

            doc.fontSize(12)
                .fillColor('#000000')
                .text('Receipt Number:', 70, yPosition)
                .font('Helvetica-Bold')
                .text(receiptNumber, 200, yPosition)
                .font('Helvetica');

            yPosition += 25;
            doc.text('Date:', 70, yPosition)
                .font('Helvetica-Bold')
                .text(currentDate, 200, yPosition)
                .font('Helvetica');

            yPosition += 25;
            doc.text('Applicant Name:', 70, yPosition)
                .font('Helvetica-Bold')
                .text(memberData.fullName || 'N/A', 200, yPosition)
                .font('Helvetica');

            yPosition += 25;
            doc.text('Email:', 70, yPosition)
                .font('Helvetica-Bold')
                .text(memberData.email || 'N/A', 200, yPosition)
                .font('Helvetica');

            yPosition += 25;
            doc.text('Phone:', 70, yPosition)
                .font('Helvetica-Bold')
                .text(memberData.phone || 'N/A', 200, yPosition)
                .font('Helvetica');

            yPosition += 25;
            doc.text('Membership Type:', 70, yPosition)
                .font('Helvetica-Bold')
                .fillColor('#DC2626')
                .text(pricing.description || `${membershipType.charAt(0).toUpperCase() + membershipType.slice(1)} Membership`, 200, yPosition)
                .font('Helvetica')
                .fillColor('#000000');

            yPosition += 25;
            doc.text('Amount to Pay:', 70, yPosition)
                .font('Helvetica-Bold')
                .fontSize(14)
                .fillColor('#DC2626')
                .text(pricing.amount === 'Custom' ? 'To be determined' : `${pricing.currency} ${pricing.amount}`, 200, yPosition)
                .font('Helvetica')
                .fontSize(12)
                .fillColor('#000000');

            // Instructions section
            doc.fontSize(14)
                .fillColor('#DC2626')
                .text('PAYMENT INSTRUCTIONS', 50, 400)
                .fontSize(11)
                .fillColor('#000000')
                .text('1. Please visit our office at Red Cross Bhavan, Agartala during office hours.', 50, 425)
                .text('2. Present this receipt to complete your membership registration.', 50, 445)
                .text('3. Payment can be made in cash or by demand draft.', 50, 465)
                .text('4. Office Hours: Monday to Friday, 10:00 AM – 5:00 PM', 50, 485)
                .text('5. For queries, contact: +91 9774137698 or ircstrp@gmail.com', 50, 505);

            // Important note
            doc.fontSize(10)
                .fillColor('#666666')
                .text('Note: This is a computer-generated receipt. Please keep it safe for your records.', 50, 550)
                .text('Your membership will be activated after payment verification at our office.', 50, 565);

            // Footer
            doc.fontSize(8)
                .fillColor('#999999')
                .text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 50, 700)
                .text('Indian Red Cross Society - Tripura State Branch', 350, 700);

            // Finalize the PDF
            doc.end();

            logger.info(`PDF receipt generated for ${memberData.fullName} - Receipt: ${receiptNumber}`);

        } catch (error) {
            logger.error('PDF generation error:', error);
            reject(error);
        }
    });
};

export default {
    generateMembershipReceiptPDF,
    generateReceiptNumber
};