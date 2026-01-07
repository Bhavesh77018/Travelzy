import { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { Trip } from '../models/Trip';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req: Request, res: Response) => {
    try {
        const {
            tripId,
            vendorId,
            travelDate,
            guests,
            totalAmount,
            contactDetails,
            paymentMethod
        } = req.body;

        if (!tripId) {
            res.status(400);
            throw new Error('Trip ID is required');
        }

        const booking = await Booking.create({
            userId: (req as any).user._id,
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
        await Trip.findByIdAndUpdate(tripId, {
            $inc: { availableSeats: -totalGuests }
        });

        res.status(201).json(booking);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
export const getMyBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find({ userId: (req as any).user._id }).populate('tripId');
        res.json(bookings);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Validate Coupon
// @route   POST /api/bookings/validate-coupon
// @access  Public
export const validateCoupon = async (req: Request, res: Response) => {
    const { code } = req.body;

    // Mock Coupon Logic
    if (code === 'GENZ20') {
        res.json({ valid: true, discountPercent: 20, message: 'Coupon Applied: GENZ20' });
    } else if (code === 'WELCOME50') {
        res.json({ valid: true, discountAmount: 500, message: 'Coupon Applied: WELCOME50' });
    } else {
        res.status(400).json({ valid: false, message: 'Invalid Coupon Code' });
    }
};
