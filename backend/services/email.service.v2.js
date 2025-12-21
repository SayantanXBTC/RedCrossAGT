import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

// Determine which email service to use
const USE_SENDGRID_API = process.env.SENDGRID_API_KEY ? true : false;

// Configure SendGrid if API key is available
if (USE_SENDGRID_API) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  logger.info('📧 Email service: SendGrid API');
} else {
  logger.info('📧 Email service: SMTP (Nodemailer)');
}

// Create SMTP transporter (fallback)
const createTransporter = () => {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const config = {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      debug: true,
      logger: true
    };

    logger.info('📧 Email transporter configured:', {
      host: config.host,
      port: config.port,
      secure: config.secure,
      user: config.auth.user
    });

    return nodemailer.createTransport(config);
  }

  logger.warn('Email service not configured. Emails will be logged to console.');
  return null;
};

const transporter = USE_SENDGRID_API ? null : createTransporter();

// Verify transporter connection on startup (only for SMTP)
if (transporter) {
  transporter.verify((error, success) => {
    if (error) {
      logger.error('❌ Email transporter verification failed:', error);
    } else {
      logger.info('✅ Email transporter is ready to send emails');
    }
  });
}

// Email templates
const templates = {
  volunteerWelcome: (name) => ({
    subject: 'Welcome to Indian Red Cross Society - Tripura',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DC2626;">Welcome to Indian Red Cross Society - Tripura!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for registering as a volunteer with us. Your application has been received and is currently under review.</p>
        <p>We appreciate your willingness to serve the community. Our team will review your application and get back to you soon.</p>
        <p><strong>What happens next?</strong></p>
        <ul>
          <li>Our team will review your application</li>
          <li>You will receive an email once your application is approved</li>
          <li>We will contact you with volunteer opportunities</li>
        </ul>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best regards,<br>Indian Red Cross Society - Tripura State Branch</p>
      </div>
    `
  }),

  memberWelcome: (name, membershipType) => ({
    subject: 'Membership Application Received - Indian Red Cross Society',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DC2626;">Thank You for Joining Us!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for applying for ${membershipType} membership with Indian Red Cross Society - Tripura.</p>
        <p>Your application has been received and is currently under review by our team.</p>
        <p><strong>Membership Benefits:</strong></p>
        <ul>
          <li>Be part of a humanitarian organization</li>
          <li>Participate in community service activities</li>
          <li>Access to training programs</li>
          <li>Networking opportunities</li>
        </ul>
        <p>We will notify you once your membership is approved.</p>
        <p>Best regards,<br>Indian Red Cross Society - Tripura State Branch</p>
      </div>
    `
  }),

  statusUpdate: (name, type, status) => ({
    subject: `Application ${status === 'approved' ? 'Approved' : 'Update'} - Indian Red Cross Society`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: ${status === 'approved' ? '#16A34A' : '#DC2626'};">
          Application ${status === 'approved' ? 'Approved!' : 'Status Update'}
        </h2>
        <p>Dear ${name},</p>
        <p>Your ${type} application status has been updated to: <strong>${status}</strong></p>
        ${status === 'approved' ? `
          <p>Congratulations! We are excited to have you as part of our team.</p>
          <p>We will contact you soon with next steps and opportunities to get involved.</p>
        ` : `
          <p>If you have any questions, please feel free to contact us.</p>
        `}
        <p>Best regards,<br>Indian Red Cross Society - Tripura State Branch</p>
      </div>
    `
  }),

  adminNotification: (type, name, email) => ({
    subject: `New ${type} Registration - Action Required`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DC2626;">New ${type} Registration</h2>
        <p>A new ${type} has registered on the website:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Time:</strong> ${new Date().toLocaleString('en-IN')}</li>
        </ul>
        <p>Please log in to the admin portal to review and approve this registration.</p>
        <p><a href="${process.env.FRONTEND_URL}/admin/login" style="background-color: #DC2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Admin Portal</a></p>
      </div>
    `
  }),

  contactAcknowledgment: (name, subject) => ({
    subject: 'We received your message - Indian Red Cross Society',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DC2626;">Thank You for Contacting Us</h2>
        <p>Dear ${name},</p>
        <p>We have received your message regarding: <strong>${subject}</strong></p>
        <p>Our team will review your message and get back to you as soon as possible.</p>
        <p>Thank you for reaching out to Indian Red Cross Society - Tripura.</p>
        <p>Best regards,<br>Indian Red Cross Society - Tripura State Branch</p>
      </div>
    `
  }),

  applicationAccepted: (name) => ({
    subject: 'Application Approved – Indian Red Cross Society, Tripura',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #DC2626;">
          <h2 style="color: #DC2626; margin: 0; font-size: 24px;">Indian Red Cross Society</h2>
          <p style="color: #666; margin: 5px 0; font-size: 14px;">Tripura State Branch</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="margin: 0 0 15px 0; font-size: 16px;">Dear ${name},</p>
          
          <p style="margin: 0 0 15px 0; font-size: 16px;">We are pleased to inform you that your application has been successfully accepted by the Indian Red Cross Society, Tripura Branch.</p>
          
          <p style="margin: 0 0 15px 0; font-size: 16px;">Thank you for your interest in contributing as a volunteer/member. Our team will reach out to you shortly with further details and next steps.</p>
          
          <p style="margin: 0 0 15px 0; font-size: 16px;">We appreciate your willingness to support humanitarian efforts and serve the community.</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0 0 5px 0; font-size: 16px;">Warm regards,</p>
          <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold;">Indian Red Cross Society</p>
          <p style="margin: 0 0 5px 0; font-size: 16px;">Tripura State Branch</p>
          <p style="margin: 0; font-size: 16px; color: #DC2626;">Email: ircstrp@gmail.com</p>
        </div>
      </div>
    `
  })
};

// Send email function - supports both SendGrid API and SMTP
export const sendEmail = async (to, template) => {
  try {
    // Use SendGrid API if available
    if (USE_SENDGRID_API) {
      const msg = {
        to,
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'ircstrp@gmail.com',
        subject: template.subject,
        html: template.html,
        text: template.html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
      };

      logger.info(`📧 Sending email via SendGrid API to: ${to}`);
      logger.info(`📧 Subject: ${template.subject}`);

      const response = await sgMail.send(msg);
      
      logger.info(`✅ Email sent successfully via SendGrid!`);
      logger.info(`📧 Status Code: ${response[0].statusCode}`);

      return { 
        success: true, 
        messageId: response[0].headers['x-message-id'],
        service: 'sendgrid-api'
      };
    }

    // Fallback to SMTP
    if (!transporter) {
      logger.info('📧 Email (not sent - no config):', {
        to,
        subject: template.subject,
        preview: template.html.substring(0, 100)
      });
      return { success: true, message: 'Email logged (development mode)' };
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject: template.subject,
      html: template.html,
      text: template.html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    };

    logger.info(`📧 Attempting to send email via SMTP to: ${to}`);
    logger.info(`📧 Subject: ${template.subject}`);

    const info = await transporter.sendMail(mailOptions);
    
    logger.info(`✅ Email sent successfully via SMTP!`);
    logger.info(`📧 Message ID: ${info.messageId}`);
    logger.info(`📧 Response: ${info.response}`);

    return { 
      success: true, 
      messageId: info.messageId,
      service: 'smtp'
    };
  } catch (error) {
    logger.error('❌ Email send error:', error);
    logger.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      response: error.response
    });
    return { success: false, error: error.message };
  }
};

// Specific email functions
export const sendVolunteerWelcomeEmail = async (email, name) => {
  return await sendEmail(email, templates.volunteerWelcome(name));
};

export const sendMemberWelcomeEmail = async (email, name, membershipType) => {
  return await sendEmail(email, templates.memberWelcome(name, membershipType));
};

export const sendStatusUpdateEmail = async (email, name, type, status) => {
  return await sendEmail(email, templates.statusUpdate(name, type, status));
};

export const sendAdminNotificationEmail = async (type, name, email) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    logger.warn('ADMIN_EMAIL not configured. Skipping admin notification.');
    return { success: false, message: 'Admin email not configured' };
  }
  return await sendEmail(adminEmail, templates.adminNotification(type, name, email));
};

export const sendContactAcknowledgmentEmail = async (email, name, subject) => {
  return await sendEmail(email, templates.contactAcknowledgment(name, subject));
};

export const sendApplicationAcceptedEmail = async (email, name) => {
  try {
    logger.info(`📧 Sending acceptance email to: ${email} for ${name}`);

    const result = await sendEmail(email, templates.applicationAccepted(name));

    if (result.success) {
      logger.info(`✅ Acceptance email sent successfully to ${email}`);
    } else {
      logger.error(`❌ Failed to send acceptance email to ${email}: ${result.error}`);
    }

    return result;
  } catch (error) {
    logger.error(`❌ Error sending acceptance email to ${email}:`, error);
    return { success: false, error: error.message };
  }
};

export default {
  sendVolunteerWelcomeEmail,
  sendMemberWelcomeEmail,
  sendStatusUpdateEmail,
  sendAdminNotificationEmail,
  sendContactAcknowledgmentEmail,
  sendApplicationAcceptedEmail
};
