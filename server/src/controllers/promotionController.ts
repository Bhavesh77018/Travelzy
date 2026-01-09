import { Request, Response } from 'express';
import { Trip } from '../models/Trip';
import { User } from '../models/User';

// Promotion costs
const PROMOTION_COSTS = {
    homepage_spotlight: 200, // per day
    email_campaign: 50,      // one-time
    social_boost: 25         // one-time
};

// @desc    Promote a trip
// @route   POST /api/vendors/trips/:tripId/promote
// @access  Private (Vendor)
export const promoteTrip = async (req: Request, res: Response) => {
    try {
        const { tripId } = req.params;
        const { promotionType, duration } = req.body;
        const userId = (req as any).user.id;

        // Validate promotion type
        if (!['homepage_spotlight', 'email_campaign', 'social_boost'].includes(promotionType)) {
            return res.status(400).json({ message: 'Invalid promotion type' });
        }

        // Find trip and verify ownership
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        if (trip.vendorId.toString() !== userId) {
            return res.status(403).json({ message: 'You can only promote your own trips' });
        }

        // Check if trip is approved
        if (trip.status !== 'PUBLISHED') {
            return res.status(400).json({ message: 'Only published trips can be promoted' });
        }

        // Calculate cost
        const baseCost = PROMOTION_COSTS[promotionType as keyof typeof PROMOTION_COSTS];
        const days = promotionType === 'homepage_spotlight' ? (duration || 1) : 1;
        const totalCost = baseCost * days;

        // Check user credits
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if ((user.credits || 0) < totalCost) {
            return res.status(400).json({
                message: 'Insufficient credits',
                required: totalCost,
                available: user.credits || 0
            });
        }

        // Calculate dates
        const startDate = new Date();
        const endDate = new Date();
        if (promotionType === 'homepage_spotlight') {
            endDate.setDate(endDate.getDate() + days);
        } else {
            endDate.setDate(endDate.getDate() + 30); // 30 days for one-time promotions
        }

        // Add promotion to trip
        trip.promotions = trip.promotions || [];
        trip.promotions.push({
            type: promotionType,
            startDate,
            endDate,
            creditsSpent: totalCost,
            status: 'active'
        } as any);

        trip.isPromoted = true;
        await trip.save();

        // Deduct credits from user
        user.credits = (user.credits || 0) - totalCost;
        user.creditTransactions = user.creditTransactions || [];
        user.creditTransactions.push({
            type: 'spent',
            amount: -totalCost,
            description: `Promoted "${trip.title}" with ${promotionType.replace('_', ' ')}`,
            relatedTripId: trip._id,
            timestamp: new Date()
        } as any);

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Trip promoted successfully',
            promotion: trip.promotions[trip.promotions.length - 1],
            remainingCredits: user.credits
        });
    } catch (error) {
        console.error('Promote trip error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get active promotions for vendor
// @route   GET /api/vendors/promotions
// @access  Private (Vendor)
export const getActivePromotions = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;

        const trips = await Trip.find({
            vendorId: userId,
            isPromoted: true
        }).select('title destination promotions');

        const activePromotions = trips.map(trip => ({
            tripId: trip._id,
            tripTitle: trip.title,
            destination: trip.destination,
            promotions: trip.promotions?.filter((p: any) => p.status === 'active') || []
        })).filter(t => t.promotions.length > 0);

        res.status(200).json({
            success: true,
            promotions: activePromotions
        });
    } catch (error) {
        console.error('Get active promotions error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Cancel a promotion
// @route   DELETE /api/vendors/promotions/:tripId/:promotionId
// @access  Private (Vendor)
export const cancelPromotion = async (req: Request, res: Response) => {
    try {
        const { tripId, promotionId } = req.params;
        const userId = (req as any).user.id;

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        if (trip.vendorId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const promotion = trip.promotions?.find((p: any) => p._id.toString() === promotionId);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        // Update promotion status
        (promotion as any).status = 'cancelled';

        // Check if any promotions are still active
        const hasActivePromotions = trip.promotions?.some((p: any) => p.status === 'active');
        if (!hasActivePromotions) {
            trip.isPromoted = false;
        }

        await trip.save();

        res.status(200).json({
            success: true,
            message: 'Promotion cancelled successfully'
        });
    } catch (error) {
        console.error('Cancel promotion error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
