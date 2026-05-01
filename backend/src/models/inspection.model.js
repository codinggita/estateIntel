const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    propertyType: {
        type: String,
        required: true,
        enum: ['apartment', 'house', 'villa', 'commercial']
    },
    propertyAddress: {
        type: String,
        required: true,
        trim: true
    },
    preferredDate: {
        type: String,
        required: true
    },
    preferredTime: {
        type: String,
        required: true,
        enum: ['morning', 'afternoon', 'evening']
    },
    inspectionType: {
        type: String,
        required: true,
        enum: ['standard', 'premium', 'comprehensive']
    },
    message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'scheduled', 'completed', 'cancelled'],
        default: 'pending'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Inspection', inspectionSchema);
