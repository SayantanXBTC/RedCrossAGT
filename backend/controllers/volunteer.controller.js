import Volunteer from '../models/Volunteer.js';
import logger from '../utils/logger.js';
import { sendVolunteerWelcomeEmail, sendAdminNotificationEmail, sendApplicationAcceptedEmail } from '../services/email.service.js';

export const createVolunteer = async (req, res) => {
  try {
    logger.info('Volunteer registration request:', req.body);

    const { name, email, phone, areaOfInterest, availability, experience, skills, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !areaOfInterest || !availability) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields',
        errors: [{ message: 'Missing required fields' }]
      });
    }

    // Check for existing volunteer
    const existingVolunteer = await Volunteer.findOne({ email: email.toLowerCase() });
    if (existingVolunteer) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered as a volunteer with this email',
        errors: [{ message: 'Email already registered' }]
      });
    }

    // Create volunteer with proper data
    const volunteer = await Volunteer.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      areaOfInterest: areaOfInterest.trim(),
      availability: availability.trim(),
      experience: experience ? experience.trim() : '',
      skills: Array.isArray(skills) ? skills : [],
      message: message ? message.trim() : ''
    });

    logger.info(`New volunteer registered: ${email} - ${areaOfInterest}`);

    // Send welcome email to volunteer
    sendVolunteerWelcomeEmail(volunteer.email, volunteer.name).catch(err =>
      logger.error('Failed to send welcome email:', err)
    );

    // Send notification to admin
    sendAdminNotificationEmail('Volunteer', volunteer.name, volunteer.email).catch(err =>
      logger.error('Failed to send admin notification:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Volunteer registration successful! We will contact you soon.',
      data: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        areaOfInterest: volunteer.areaOfInterest
      }
    });
  } catch (error) {
    logger.error('Volunteer registration error:', error.message, error.stack);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages.map(msg => ({ message: msg }))
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered',
        errors: [{ message: 'Email already exists' }]
      });
    }

    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again later.',
      errors: [{ message: error.message || 'Internal server error' }]
    });
  }
};

export const getAllVolunteers = async (req, res) => {
  try {
    // Search and filter parameters
    const {
      search,
      status,
      areaOfInterest,
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
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by area of interest
    if (areaOfInterest) {
      query.areaOfInterest = { $regex: areaOfInterest, $options: 'i' };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === 'asc' ? 1 : -1;

    // Execute query with pagination
    const [volunteers, total] = await Promise.all([
      Volunteer.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(parseInt(limit)),
      Volunteer.countDocuments(query)
    ]);

    res.json({
      success: true,
      count: volunteers.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: volunteers
    });
  } catch (error) {
    logger.error('Get volunteers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteers',
      error: error.message
    });
  }
};

export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    res.json({
      success: true,
      data: volunteer
    });
  } catch (error) {
    logger.error('Get volunteer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteer',
      error: error.message
    });
  }
};

export const updateVolunteerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    logger.info(`Volunteer status updated: ${volunteer.email} - ${status}`);

    // Send automated acceptance email when application is approved
    // Email sending happens after successful database update
    // If email fails, it won't block the status update process
    if (status === 'approved') {
      sendApplicationAcceptedEmail(volunteer.email, volunteer.name)
        .then(result => {
          if (result.success) {
            logger.info(`✅ Acceptance email sent to volunteer: ${volunteer.email}`);
          } else {
            logger.error(`❌ Failed to send acceptance email to volunteer: ${volunteer.email} - ${result.error}`);
          }
        })
        .catch(err => {
          logger.error(`❌ Error sending acceptance email to volunteer: ${volunteer.email}`, err);
        });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: volunteer
    });
  } catch (error) {
    logger.error('Update volunteer status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message
    });
  }
};

export const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    logger.info(`Volunteer deleted: ${volunteer.email}`);

    res.json({
      success: true,
      message: 'Volunteer deleted successfully'
    });
  } catch (error) {
    logger.error('Delete volunteer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete volunteer',
      error: error.message
    });
  }
};
