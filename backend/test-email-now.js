import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

console.log('🔍 Testing Email Configuration...\n');

console.log('Configuration:');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_SECURE:', process.env.EMAIL_SECURE);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('\n');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true,
  logger: true
});

console.log('📧 Step 1: Verifying SMTP connection...\n');

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection Failed:', error);
    process.exit(1);
  } else {
    console.log('✅ SMTP Connection Successful!\n');
    
    console.log('📧 Step 2: Sending test email...\n');
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: 'btcccc777@gmail.com', // Test recipient
      subject: 'Test Email - Indian Red Cross Society',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DC2626;">Test Email</h2>
          <p>This is a test email from Indian Red Cross Society - Tripura.</p>
          <p>If you receive this, the email service is working correctly!</p>
          <p>Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `,
      text: 'This is a test email from Indian Red Cross Society - Tripura. If you receive this, the email service is working correctly!'
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email Send Failed:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          command: error.command,
          response: error.response
        });
        process.exit(1);
      } else {
        console.log('✅ Email Sent Successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
        console.log('Accepted:', info.accepted);
        console.log('Rejected:', info.rejected);
        console.log('\n📬 Check your inbox at btcccc777@gmail.com');
        console.log('⚠️  Also check SPAM/JUNK folder!');
        process.exit(0);
      }
    });
  }
});
