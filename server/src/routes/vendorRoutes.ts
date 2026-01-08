import express from 'express';
import { getVendorStats, updateVendorProfile, getPendingVendors, verifyVendor } from '../controllers/vendorController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/stats', protect, getVendorStats);
router.put('/profile', protect, updateVendorProfile);

// Admin routes
router.get('/pending', protect, admin, getPendingVendors);
router.put('/:id/verify', protect, admin, verifyVendor);

export default router;
