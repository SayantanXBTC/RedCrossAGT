import express from 'express';
import { body } from 'express-validator';
import {
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteerStatus,
  deleteVolunteer
} from '../controllers/volunteer.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('areaOfInterest').trim().notEmpty().withMessage('Area of interest is required'),
    validate
  ],
  createVolunteer
);

router.get('/', 
  authenticateToken, 
  authorizeRole('admin'), 
  getAllVolunteers
);

router.get('/:id', 
  authenticateToken, 
  authorizeRole('admin'), 
  getVolunteerById
);

router.patch('/:id/status',
  authenticateToken,
  authorizeRole('admin'),
  [
    body('status').isIn(['pending', 'approved', 'rejected', 'active']).withMessage('Invalid status'),
    validate
  ],
  updateVolunteerStatus
);

router.delete('/:id',
  authenticateToken,
  authorizeRole('admin'),
  deleteVolunteer
);

export default router;
