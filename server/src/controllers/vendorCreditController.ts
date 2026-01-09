import { Request, Response } from 'express';
import { User } from '../models/User';

// @desc    Purchase credits
// @route   POST /api/vendors/credits/purchase
// @access  Private (Vendor)
export const purchaseCredits = async (req: Request, res: Response) => {
    try {
        const { amount, package: packageType } = req.body;
        const userId = (req as any).user.id;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid credit amount' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'vendor') {
            return res.status(403).json({ message: 'Only vendors can purchase credits' });
        }

        // Update user credits
        user.credits = (user.credits || 0) + amount;

        // Add transaction record
        user.creditTransactions = user.creditTransactions || [];
        user.creditTransactions.push({
            type: 'purchase',
            amount,
            description: `Purchased ${amount} credits (${packageType || 'Custom'} package)`,
            timestamp: new Date()
        } as any);

        await user.save();

        res.status(200).json({
            success: true,
            credits: user.credits,
            transaction: user.creditTransactions[user.creditTransactions.length - 1]
        });
    } catch (error) {
        console.error('Purchase credits error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get credit transaction history
// @route   GET /api/vendors/credits/history
// @access  Private (Vendor)
export const getCreditHistory = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;

        const user = await User.findById(userId).select('credits creditTransactions');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            credits: user.credits || 0,
            transactions: user.creditTransactions || []
        });
    } catch (error) {
        console.error('Get credit history error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get current credit balance
// @route   GET /api/vendors/credits/balance
// @access  Private (Vendor)
export const getCreditBalance = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;

        const user = await User.findById(userId).select('credits');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            credits: user.credits || 0
        });
    } catch (error) {
        console.error('Get credit balance error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
