import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  occupation: {
    type: String,
    trim: true
  },
  membershipType: {
    type: String,
    required: [true, 'Membership type is required'],
    enum: ['individual', 'family', 'corporate'],
    default: 'individual'
  },
  interests: {
    type: [String],
    default: []
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'active', 'expired'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

memberSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

const Member = mongoose.model('Member', memberSchema);

export default Member;
