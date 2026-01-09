import express from 'express';
import { protect } from '../middleware/auth';
import { purchaseCredits, getCreditHistory, getCreditBalance } from '../controllers/vendorCreditController';
import { promoteTrip, getActivePromotions, cancelPromotion } from '../controllers/promotionController';

const router = express.Router();

// Credit routes
router.post('/credits/purchase', protect, purchaseCredits);
router.get('/credits/history', protect, getCreditHistory);
router.get('/credits/balance', protect, getCreditBalance);

// Promotion routes
router.post('/trips/:tripId/promote', protect, promoteTrip);
router.get('/promotions', protect, getActivePromotions);
router.delete('/promotions/:tripId/:promotionId', protect, cancelPromotion);

export default router;
