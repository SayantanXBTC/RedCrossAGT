import express from 'express';
import { body } from 'express-validator';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus
} from '../controllers/contact.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    validate
  ],
  createContact
);

router.get('/', 
  authenticateToken, 
  authorizeRole('admin'), 
  getAllContacts
);

router.get('/:id', 
  authenticateToken, 
  authorizeRole('admin'), 
  getContactById
);

router.patch('/:id/status',
  authenticateToken,
  authorizeRole('admin'),
  [
    body('status').isIn(['new', 'in-progress', 'resolved']).withMessage('Invalid status'),
    validate
  ],
  updateContactStatus
);

export default router;
