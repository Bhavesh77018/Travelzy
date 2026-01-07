import express from 'express';
import { getTrips, getTripById, createTrip, updateTrip, deleteTrip } from '../controllers/tripController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getTrips)
    .post(protect, createTrip);

router.route('/:id')
    .get(getTripById)
    .put(protect, updateTrip)
    .delete(protect, deleteTrip);

export default router;
