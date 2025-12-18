import { generateMembershipReceiptPDF } from './services/pdf.service.js';
import fs from 'fs';

// Test PDF generation
const testPDFGeneration = async () => {
    console.log('🧪 Testing PDF Receipt Generation...\n');

    const testMemberData = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        membershipType: 'individual',
        address: '123 Test Street, Agartala, Tripura'
    };

    try {
        console.log('📄 Generating PDF for test member...');
        const pdfBuffer = await generateMembershipReceiptPDF(testMemberData);

        // Save test PDF to file
        fs.writeFileSync('test-receipt.pdf', pdfBuffer);

        console.log('✅ PDF generated successfully!');
        console.log('📁 Test PDF saved as: test-receipt.pdf');
        console.log('📊 PDF size:', pdfBuffer.length, 'bytes');

    } catch (error) {
        console.error('❌ PDF generation failed:', error);
    }
};

testPDFGeneration();