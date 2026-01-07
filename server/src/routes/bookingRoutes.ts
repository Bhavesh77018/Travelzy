import express from 'express';
import { createBooking, getMyBookings, validateCoupon } from '../controllers/bookingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.post('/validate-coupon', validateCoupon);

export default router;
