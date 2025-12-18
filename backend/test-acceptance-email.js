import { sendApplicationAcceptedEmail } from './services/email.service.js';
import logger from './utils/logger.js';

// Test the acceptance email functionality
async function testAcceptanceEmail() {
    console.log('🧪 Testing Acceptance Email System...\n');

    // Test acceptance email for volunteer
    console.log('📧 Testing Volunteer Acceptance Email:');
    const volunteerResult = await sendApplicationAcceptedEmail('volunteer@example.com', 'John Doe');
    console.log('Result:', volunteerResult);
    console.log('');

    // Test acceptance email for member
    console.log('📧 Testing Member Acceptance Email:');
    const memberResult = await sendApplicationAcceptedEmail('member@example.com', 'Jane Smith');
    console.log('Result:', memberResult);
    console.log('');

    console.log('✅ Acceptance email testing completed!');
    console.log('📝 Note: In development mode, emails are logged to console.');
    console.log('📝 For production, configure SMTP settings in .env file.');

    process.exit(0);
}

testAcceptanceEmail().catch(error => {
    console.error('❌ Error testing acceptance email:', error);
    process.exit(1);
});