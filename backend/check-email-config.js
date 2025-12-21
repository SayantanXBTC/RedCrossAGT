import dotenv from 'dotenv';

dotenv.config();

console.log('\n🔍 EMAIL CONFIGURATION CHECK\n');
console.log('=' .repeat(50));

// Check SendGrid
if (process.env.SENDGRID_API_KEY) {
  console.log('✅ SENDGRID_API_KEY: Found');
  console.log('   Value: SG.' + '***' + process.env.SENDGRID_API_KEY.slice(-8));
  console.log('   → Will use: SendGrid API');
} else {
  console.log('❌ SENDGRID_API_KEY: Not found');
}

console.log('');

// Check SMTP
if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  console.log('✅ SMTP Config: Found');
  console.log('   HOST:', process.env.EMAIL_HOST);
  console.log('   PORT:', process.env.EMAIL_PORT);
  console.log('   USER:', process.env.EMAIL_USER);
  console.log('   PASS:', '***' + (process.env.EMAIL_PASS?.slice(-4) || ''));
  if (!process.env.SENDGRID_API_KEY) {
    console.log('   → Will use: SMTP (Nodemailer)');
  } else {
    console.log('   → Will be ignored (SendGrid takes priority)');
  }
} else {
  console.log('❌ SMTP Config: Not found');
}

console.log('');

// Check other email settings
console.log('📧 Other Settings:');
console.log('   EMAIL_FROM:', process.env.EMAIL_FROM || 'Not set');
console.log('   ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'Not set');

console.log('');
console.log('=' .repeat(50));

// Final verdict
if (process.env.SENDGRID_API_KEY) {
  console.log('\n✅ RESULT: Will use SendGrid API for emails');
  console.log('   No SMTP ports needed - should work on Render!');
} else if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  console.log('\n⚠️  RESULT: Will use SMTP');
  console.log('   This will TIMEOUT on Render!');
  console.log('   Add SENDGRID_API_KEY to fix this.');
} else {
  console.log('\n❌ RESULT: No email service configured');
  console.log('   Emails will be logged to console only.');
}

console.log('');
