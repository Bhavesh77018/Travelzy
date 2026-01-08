import express from 'express';
import { createCampaign, getVendorCampaigns, getAllCampaigns, updateCampaignStatus } from '../controllers/marketingController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(protect, createCampaign);

router.get('/my', protect, getVendorCampaigns);
router.get('/all', protect, admin, getAllCampaigns);
router.put('/:id/status', protect, updateCampaignStatus);

export default router;
