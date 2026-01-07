import express from 'express';
import { getVendorStats, updateVendorProfile } from '../controllers/vendorController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/stats', protect, getVendorStats);
router.put('/profile', protect, updateVendorProfile);

export default router;
