const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    fullName: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    loginCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    preferences: {
        theme: {
            type: String,
            default: 'light'
        },
        notifications: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true
});

// Static method to find user by UID
userSchema.statics.findByUid = function(uid) {
    return this.findOne({ uid: uid });
};

// Static method to create or update user from Firebase
userSchema.statics.createOrUpdateFromFirebase = function(userData) {
    return this.findOneAndUpdate(
        { uid: userData.uid },
        {
            uid: userData.uid,
            name: userData.name,
            email: userData.email,
            photo: userData.photo,
            emailVerified: userData.emailVerified,
            lastLogin: new Date(),
            loginCount: 1
        },
        { upsert: true, new: true }
    );
};

module.exports = mongoose.model('User', userSchema);
