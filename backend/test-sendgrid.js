import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

console.log('🔍 Testing SendGrid Configuration...\n');

if (!process.env.SENDGRID_API_KEY) {
  console.error('❌ SENDGRID_API_KEY not found in .env file');
  console.log('\n📝 To set up SendGrid:');
  console.log('1. Sign up at: https://signup.sendgrid.com/');
  console.log('2. Create API key at: https://app.sendgrid.com/settings/api_keys');
  console.log('3. Add to .env: SENDGRID_API_KEY=your-api-key');
  console.log('4. Verify sender at: https://app.sendgrid.com/settings/sender_auth/senders');
  process.exit(1);
}

console.log('✅ SendGrid API Key found');
console.log('API Key:', '***' + process.env.SENDGRID_API_KEY.slice(-8));
console.log('From Email:', process.env.EMAIL_FROM || 'ircstrp@gmail.com');
console.log('\n📧 Sending test email...\n');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'btcccc777@gmail.com',
  from: process.env.EMAIL_FROM || 'ircstrp@gmail.com',
  subject: 'SendGrid Test - Indian Red Cross Society',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #DC2626;">SendGrid Test Email</h2>
      <p>This is a test email from Indian Red Cross Society - Tripura using SendGrid.</p>
      <p>If you receive this, SendGrid is configured correctly!</p>
      <p>Sent at: ${new Date().toLocaleString()}</p>
    </div>
  `,
  text: 'This is a test email from Indian Red Cross Society - Tripura using SendGrid.'
};

sgMail
  .send(msg)
  .then((response) => {
    console.log('✅ Email sent successfully!');
    console.log('Status Code:', response[0].statusCode);
    console.log('Message ID:', response[0].headers['x-message-id']);
    console.log('\n📬 Check your inbox at btcccc777@gmail.com');
    console.log('⚠️  Also check SPAM/JUNK folder!');
    console.log('\n✨ SendGrid is working! You can now deploy to Render.');
  })
  .catch((error) => {
    console.error('❌ SendGrid Error:', error.message);
    if (error.response) {
      console.error('Response Body:', error.response.body);
    }
    console.log('\n🔧 Common issues:');
    console.log('1. Sender email not verified in SendGrid');
    console.log('2. Invalid API key');
    console.log('3. API key doesn\'t have "Mail Send" permission');
    process.exit(1);
  });
