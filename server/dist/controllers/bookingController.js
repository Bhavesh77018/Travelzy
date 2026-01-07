"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCoupon = exports.getMyBookings = exports.createBooking = void 0;
const Booking_1 = require("../models/Booking");
const Trip_1 = require("../models/Trip");
// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    try {
        const { tripId, vendorId, travelDate, guests, totalAmount, contactDetails, paymentMethod } = req.body;
        if (!tripId) {
            res.status(400);
            throw new Error('Trip ID is required');
        }
        const booking = await Booking_1.Booking.create({
            userId: req.user._id,
            tripId,
            vendorId,
            travelDate,
            guests,
            totalAmount,
            contactDetails,
            paymentStatus: 'COMPLETED', // Simulating instant success for now
            bookingStatus: 'CONFIRMED'
        });
        // Update Trip Available Seats (Atomic operation)
        const totalGuests = Number(guests.adults) + Number(guests.children);
        await Trip_1.Trip.findByIdAndUpdate(tripId, {
            $inc: { availableSeats: -totalGuests }
        });
        res.status(201).json(booking);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
exports.createBooking = createBooking;
// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking_1.Booking.find({ userId: req.user._id }).populate('tripId');
        res.json(bookings);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};
exports.getMyBookings = getMyBookings;
// @desc    Validate Coupon
// @route   POST /api/bookings/validate-coupon
// @access  Public
const validateCoupon = async (req, res) => {
    const { code } = req.body;
    // Mock Coupon Logic
    if (code === 'GENZ20') {
        res.json({ valid: true, discountPercent: 20, message: 'Coupon Applied: GENZ20' });
    }
    else if (code === 'WELCOME50') {
        res.json({ valid: true, discountAmount: 500, message: 'Coupon Applied: WELCOME50' });
    }
    else {
        res.status(400).json({ valid: false, message: 'Invalid Coupon Code' });
    }
};
exports.validateCoupon = validateCoupon;
