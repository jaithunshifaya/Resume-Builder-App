import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    profilePhoto: { type: String },
    profileSummary: { type: String },
  },
  workExperience: [{
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String },
    isCurrentJob: { type: Boolean, default: false },
    description: { type: String },
  }],
  education: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String },
    graduationDate: { type: String },
    gpa: { type: String },
    description: { type: String },
  }],
  skills: [{
    category: { type: String, required: true },
    items: [{ type: String }],
  }],
  certifications: [{
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String },
    expiryDate: { type: String },
    credentialId: { type: String },
  }],
  projects: [{
    name: { type: String, required: true },
    description: { type: String },
    technologies: [{ type: String }],
    link: { type: String },
    githubLink: { type: String },
    startDate: { type: String },
    endDate: { type: String },
  }],
  socialLinks: {
    linkedin: { type: String },
    github: { type: String },
    website: { type: String },
    twitter: { type: String },
  },
  template: {
    type: String,
    default: 'modern',
    enum: ['modern', 'classic', 'creative', 'minimal'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

resumeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Resume', resumeSchema);