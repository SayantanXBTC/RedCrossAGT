import Volunteer from '../models/Volunteer.js';
import Member from '../models/Member.js';
import Contact from '../models/Contact.js';
import logger from '../utils/logger.js';

export const getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const [
      totalVolunteers,
      totalMembers,
      totalContacts,
      pendingVolunteers,
      pendingMembers,
      approvedVolunteers,
      approvedMembers
    ] = await Promise.all([
      Volunteer.countDocuments(),
      Member.countDocuments(),
      Contact.countDocuments(),
      Volunteer.countDocuments({ status: 'pending' }),
      Member.countDocuments({ status: 'pending' }),
      Volunteer.countDocuments({ status: 'approved' }),
      Member.countDocuments({ status: 'approved' })
    ]);

    // Get registrations by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const volunteersByMonth = await Volunteer.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const membersByMonth = await Member.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Get volunteers by area of interest
    const volunteersByArea = await Volunteer.aggregate([
      {
        $group: {
          _id: '$areaOfInterest',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get members by membership type
    const membersByType = await Member.aggregate([
      {
        $group: {
          _id: '$membershipType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get status distribution
    const volunteerStatusDist = await Volunteer.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const memberStatusDist = await Member.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentVolunteers = await Volunteer.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    const recentMembers = await Member.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalVolunteers,
          totalMembers,
          totalContacts,
          pendingVolunteers,
          pendingMembers,
          approvedVolunteers,
          approvedMembers,
          recentVolunteers,
          recentMembers
        },
        trends: {
          volunteersByMonth,
          membersByMonth
        },
        distribution: {
          volunteersByArea,
          membersByType,
          volunteerStatusDist,
          memberStatusDist
        }
      }
    });
  } catch (error) {
    logger.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message
    });
  }
};

export const getVolunteerAnalytics = async (req, res) => {
  try {
    const total = await Volunteer.countDocuments();
    const byStatus = await Volunteer.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const byArea = await Volunteer.aggregate([
      { $group: { _id: '$areaOfInterest', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: { total, byStatus, byArea }
    });
  } catch (error) {
    logger.error('Volunteer analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteer analytics',
      error: error.message
    });
  }
};

export const getMemberAnalytics = async (req, res) => {
  try {
    const total = await Member.countDocuments();
    const byStatus = await Member.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const byType = await Member.aggregate([
      { $group: { _id: '$membershipType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: { total, byStatus, byType }
    });
  } catch (error) {
    logger.error('Member analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch member analytics',
      error: error.message
    });
  }
};
