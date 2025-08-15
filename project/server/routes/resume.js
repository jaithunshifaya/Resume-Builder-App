import express from 'express';
import { body, validationResult } from 'express-validator';
import Resume from '../models/Resume.js';
import User from '../models/User.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all resumes for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ updatedAt: -1 });
    
    res.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single resume
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check if user owns this resume or if it's a guest resume
    if (resume.userId && req.user && resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new resume
router.post('/', optionalAuth, [
  body('personalInfo.fullName').trim().isLength({ min: 2 }),
  body('personalInfo.email').isEmail(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const resumeData = {
      ...req.body,
      userId: req.user ? req.user._id : null,
    };

    const resume = new Resume(resumeData);
    await resume.save();

    // Add resume to user's resumes array if authenticated
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: { resumes: resume._id }
      });
    }

    res.status(201).json(resume);
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update resume
router.put('/:id', optionalAuth, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check ownership for authenticated users
    if (resume.userId && req.user && resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // For guest resumes, allow updates without authentication
    if (resume.userId && !req.user) {
      return res.status(403).json({ message: 'Authentication required' });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedResume);
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete resume
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check ownership
    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Resume.findByIdAndDelete(req.params.id);
    
    // Remove from user's resumes array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { resumes: req.params.id }
    });

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;