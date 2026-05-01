const express = require('express');
const router = express.Router();
const Inspection = require('../models/inspection.model');

// @route   POST /api/inspection/book
// @desc    Book a new inspection
router.post('/book', async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            propertyType,
            propertyAddress,
            preferredDate,
            preferredTime,
            inspectionType,
            message
        } = req.body;

        // Validate required fields
        if (!name || !phone || !email || !propertyAddress || !preferredDate) {
            return res.status(400).json({ 
                message: 'Please fill all required fields' 
            });
        }

        // Create new inspection booking
        const inspection = new Inspection({
            name,
            phone,
            email,
            propertyType,
            propertyAddress,
            preferredDate,
            preferredTime,
            inspectionType,
            message
        });

        await inspection.save();

        res.status(201).json({
            message: 'Inspection booked successfully',
            inspection: {
                id: inspection._id,
                name: inspection.name,
                email: inspection.email,
                propertyAddress: inspection.propertyAddress,
                preferredDate: inspection.preferredDate,
                preferredTime: inspection.preferredTime,
                inspectionType: inspection.inspectionType,
                status: inspection.status,
                bookingDate: inspection.bookingDate
            }
        });
    } catch (error) {
        console.error('Inspection booking error:', error);
        res.status(500).json({ 
            message: 'Server error while booking inspection', 
            error: error.message 
        });
    }
});

// @route   GET /api/inspection/all
// @desc    Get all inspection bookings (for admin)
router.get('/all', async (req, res) => {
    try {
        const inspections = await Inspection.find().sort({ bookingDate: -1 });
        
        res.json({
            message: 'Inspections retrieved successfully',
            count: inspections.length,
            inspections
        });
    } catch (error) {
        console.error('Get inspections error:', error);
        res.status(500).json({ 
            message: 'Server error while fetching inspections', 
            error: error.message 
        });
    }
});

// @route   GET /api/inspection/:id
// @desc    Get inspection by ID
router.get('/:id', async (req, res) => {
    try {
        const inspection = await Inspection.findById(req.params.id);
        
        if (!inspection) {
            return res.status(404).json({ message: 'Inspection not found' });
        }

        res.json({
            message: 'Inspection retrieved successfully',
            inspection
        });
    } catch (error) {
        console.error('Get inspection error:', error);
        res.status(500).json({ 
            message: 'Server error while fetching inspection', 
            error: error.message 
        });
    }
});

// @route   PUT /api/inspection/:id/status
// @desc    Update inspection status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['pending', 'confirmed', 'scheduled', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const inspection = await Inspection.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!inspection) {
            return res.status(404).json({ message: 'Inspection not found' });
        }

        res.json({
            message: 'Inspection status updated successfully',
            inspection
        });
    } catch (error) {
        console.error('Update inspection status error:', error);
        res.status(500).json({ 
            message: 'Server error while updating inspection status', 
            error: error.message 
        });
    }
});

module.exports = router;
