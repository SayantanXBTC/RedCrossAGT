import Member from '../models/Member.js';
import logger from '../utils/logger.js';
import { sendMemberWelcomeEmail, sendAdminNotificationEmail, sendApplicationAcceptedEmail } from '../services/email.service.js';
import { generateMembershipReceiptPDF } from '../services/pdf.service.js';

export const createMember = async (req, res) => {
  try {
    const { fullName, email, phone, address, occupation, membershipType, interests, message } = req.body;

    // Log received data for debugging
    logger.info('Member registration attempt:', {
      fullName,
      email,
      phone,
      membershipType,
      hasAddress: !!address,
      interestsCount: interests?.length || 0
    });

    // Validate required fields
    if (!fullName || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Phone, Address)',
        errors: [{ message: 'Please fill in all required fields' }]
      });
    }

    // Check for existing member
    const existingMember = await Member.findOne({ email: email.toLowerCase() });
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered as a member with this email',
        errors: [{ message: 'Email already registered' }]
      });
    }

    // Create member with proper data
    const member = await Member.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      address: address.trim(),
      occupation: occupation ? occupation.trim() : '',
      membershipType: membershipType || 'individual',
      interests: Array.isArray(interests) ? interests : [],
      message: message ? message.trim() : ''
    });

    logger.info(`New member registered: ${email} - ${membershipType}`);

    // Send welcome email to member
    sendMemberWelcomeEmail(member.email, member.fullName, member.membershipType).catch(err =>
      logger.error('Failed to send welcome email:', err)
    );

    // Send notification to admin
    sendAdminNotificationEmail('Member', member.fullName, member.email).catch(err =>
      logger.error('Failed to send admin notification:', err)
    );

    // Generate PDF receipt
    try {
      const pdfBuffer = await generateMembershipReceiptPDF(member);

      res.status(201).json({
        success: true,
        message: 'Membership application submitted successfully! Download your receipt below.',
        data: {
          id: member._id,
          fullName: member.fullName,
          email: member.email,
          membershipType: member.membershipType,
          pdfReceipt: pdfBuffer.toString('base64') // Send PDF as base64 string
        }
      });
    } catch (pdfError) {
      logger.error('PDF generation failed:', pdfError);

      // Still return success but without PDF
      res.status(201).json({
        success: true,
        message: 'Membership application submitted successfully! We will contact you soon.',
        data: {
          id: member._id,
          fullName: member.fullName,
          email: member.email,
          membershipType: member.membershipType
        },
        pdfError: 'Receipt generation failed, but application was successful'
      });
    }
  } catch (error) {
    logger.error('Member registration error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages.map(msg => ({ message: msg }))
      });
    }

    // Handle duplicate key error (unique constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered',
        errors: [{ message: 'Email already exists' }]
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again later.',
      errors: [{ message: error.message || 'Internal server error' }]
    });
  }
};

export const getAllMembers = async (req, res) => {
  try {
    // Search and filter parameters
    const {
      search,
      status,
      membershipType,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 50
    } = req.query;

    // Build query
    const query = {};

    // Search by name, email, or phone
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by membership type
    if (membershipType) {
      query.membershipType = membershipType;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === 'asc' ? 1 : -1;

    // Execute query with pagination
    const [members, total] = await Promise.all([
      Member.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(parseInt(limit)),
      Member.countDocuments(query)
    ]);

    res.json({
      success: true,
      count: members.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: members
    });
  } catch (error) {
    logger.error('Get members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch members',
      error: error.message
    });
  }
};

export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    logger.error('Get member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch member',
      error: error.message
    });
  }
};

export const updateMemberStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    logger.info(`Member status updated: ${member.email} - ${status}`);

    // Send automated acceptance email when application is approved
    // Email sending happens after successful database update
    // If email fails, it won't block the status update process
    if (status === 'approved') {
      sendApplicationAcceptedEmail(member.email, member.fullName)
        .then(result => {
          if (result.success) {
            logger.info(`✅ Acceptance email sent to member: ${member.email}`);
          } else {
            logger.error(`❌ Failed to send acceptance email to member: ${member.email} - ${result.error}`);
          }
        })
        .catch(err => {
          logger.error(`❌ Error sending acceptance email to member: ${member.email}`, err);
        });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: member
    });
  } catch (error) {
    logger.error('Update member status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message
    });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    logger.info(`Member deleted: ${member.email}`);

    res.json({
      success: true,
      message: 'Member deleted successfully'
    });
  } catch (error) {
    logger.error('Delete member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete member',
      error: error.message
    });
  }
};

// Generate and download PDF receipt for existing member
export const downloadMemberReceipt = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    const pdfBuffer = await generateMembershipReceiptPDF(member);

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="membership-receipt-${member._id}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    res.send(pdfBuffer);

    logger.info(`PDF receipt downloaded for member: ${member.email}`);

  } catch (error) {
    logger.error('PDF download error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate receipt',
      error: error.message
    });
  }
};