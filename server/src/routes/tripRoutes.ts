import express from 'express';
import { getTrips, getTripById, createTrip, updateTrip, deleteTrip, getPendingTrips, approveTrip, rejectTrip } from '../controllers/tripController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getTrips)
    .post(protect, createTrip);

// Admin Routes for Trips
router.get('/admin/pending', protect, admin, getPendingTrips);
router.put('/:id/approve', protect, admin, approveTrip);
router.put('/:id/reject', protect, admin, rejectTrip);

router.route('/:id')
    .get(getTripById)
    .put(protect, updateTrip)
    .delete(protect, deleteTrip);

export default router;
