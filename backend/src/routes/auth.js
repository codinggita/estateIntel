// Authentication Routes - Google Authentication Endpoint
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// POST /api/auth/google - Handle Google Authentication
router.post('/google', async (req, res) => {
  try {
    console.log('🔐 Google authentication request received');
    
    const { uid, name, email, photo, emailVerified } = req.body;
    
    // Validate required fields
    if (!uid || !name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: uid, name, email'
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    console.log('📝 Processing user data:', { uid, name, email, photo: photo ? 'provided' : 'not provided' });
    
    // Create or update user in MongoDB
    let user = await User.findByUid(uid);
    
    if (user) {
      // Update existing user
      user.name = name;
      user.photo = photo || user.photo;
      user.emailVerified = emailVerified;
      user.lastLogin = new Date();
      user.loginCount += 1;
      await user.save();
      
      console.log('✅ Existing user updated:', user.email);
    } else {
      // Create new user
      user = await User.createOrUpdateFromFirebase({
        uid,
        name,
        email,
        photo,
        emailVerified
      });
      
      console.log('✅ New user created:', user.email);
    }
    
    // Return user data (excluding sensitive information)
    const userData = {
      id: user._id,
      uid: user.uid,
      name: user.name,
      email: user.email,
      photo: user.photo,
      emailVerified: user.emailVerified,
      lastLogin: user.lastLogin,
      loginCount: user.loginCount,
      createdAt: user.createdAt,
      isActive: user.isActive,
      isPremium: user.isPremium,
      preferences: user.preferences
    };
    
    console.log('🎉 Authentication successful for:', userData.email);
    
    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      user: userData
    });
    
  } catch (error) {
    console.error('❌ Google authentication error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `User with this ${field} already exists`
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }
    
    // General server error
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/auth/user/:uid - Get user by UID
router.get('/user/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: 'UID is required'
      });
    }
    
    const user = await User.findByUid(uid);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const userData = {
      id: user._id,
      uid: user.uid,
      name: user.name,
      email: user.email,
      photo: user.photo,
      emailVerified: user.emailVerified,
      lastLogin: user.lastLogin,
      loginCount: user.loginCount,
      createdAt: user.createdAt,
      isActive: user.isActive,
      isPremium: user.isPremium,
      preferences: user.preferences
    };
    
    res.status(200).json({
      success: true,
      user: userData
    });
    
  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// PUT /api/auth/user/:uid - Update user profile
router.put('/user/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const updates = req.body;
    
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: 'UID is required'
      });
    }
    
    const user = await User.findByUid(uid);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update allowed fields
    const allowedFields = ['name', 'photo', 'preferences'];
    const updateData = {};
    
    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        updateData[key] = updates[key];
      }
    });
    
    Object.assign(user, updateData);
    await user.save();
    
    const userData = {
      id: user._id,
      uid: user.uid,
      name: user.name,
      email: user.email,
      photo: user.photo,
      emailVerified: user.emailVerified,
      lastLogin: user.lastLogin,
      loginCount: user.loginCount,
      createdAt: user.createdAt,
      isActive: user.isActive,
      isPremium: user.isPremium,
      preferences: user.preferences
    };
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: userData
    });
    
  } catch (error) {
    console.error('❌ Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// DELETE /api/auth/user/:uid - Delete user account
router.delete('/user/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: 'UID is required'
      });
    }
    
    const user = await User.findByUid(uid);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    await User.deleteOne({ uid });
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
    
  } catch (error) {
    console.error('❌ Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
