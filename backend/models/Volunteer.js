import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
  areaOfInterest: {
    type: String,
    required: [true, 'Area of interest is required'],
    trim: true
  },
  availability: {
    type: String,
    default: 'flexible',
    trim: true
  },
  experience: {
    type: String,
    trim: true,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active'],
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

volunteerSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
