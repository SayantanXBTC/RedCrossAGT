import express from 'express';
import { body } from 'express-validator';
import {
  createMember,
  getAllMembers,
  getMemberById,
  updateMemberStatus,
  deleteMember,
  downloadMemberReceipt
} from '../controllers/member.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/',
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('membershipType').isIn(['individual', 'family', 'corporate']).withMessage('Invalid membership type'),
    validate
  ],
  createMember
);

router.get('/',
  authenticateToken,
  authorizeRole('admin'),
  getAllMembers
);

router.get('/:id',
  authenticateToken,
  authorizeRole('admin'),
  getMemberById
);

router.patch('/:id/status',
  authenticateToken,
  authorizeRole('admin'),
  [
    body('status').isIn(['pending', 'approved', 'active', 'expired']).withMessage('Invalid status'),
    validate
  ],
  updateMemberStatus
);

router.delete('/:id',
  authenticateToken,
  authorizeRole('admin'),
  deleteMember
);

// PDF receipt download route (public access for members)
router.get('/:id/receipt', downloadMemberReceipt);

export default router;
