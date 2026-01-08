import { Request, Response } from 'express';
import { Campaign } from '../models/Campaign';

// @desc    Create a new campaign
// @route   POST /api/marketing
// @access  Private (Vendor)
export const createCampaign = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user._id;
        const campaign = await Campaign.create({
            ...req.body,
            vendorId
        });
        res.status(201).json(campaign);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

// @desc    Get vendor's campaigns
// @route   GET /api/marketing/my
// @access  Private (Vendor)
export const getVendorCampaigns = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user._id;
        const campaigns = await Campaign.find({ vendorId });
        res.json(campaigns);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Get all campaigns (Admin)
// @route   GET /api/marketing/all
// @access  Private (Admin)
export const getAllCampaigns = async (req: Request, res: Response) => {
    try {
        const campaigns = await Campaign.find().populate('vendorId', 'name email');
        res.json(campaigns);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Update campaign status
// @route   PUT /api/marketing/:id/status
// @access  Private (Vendor/Admin)
export const updateCampaignStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const campaign = await Campaign.findById(req.params.id);

        if (campaign) {
            // Check auth
            // If vendor, can only update own
            // If admin, can update any
            if ((req as any).user.role !== 'admin' && campaign.vendorId.toString() !== (req as any).user._id.toString()) {
                res.status(401);
                throw new Error('Not authorized');
            }

            campaign.status = status;
            const updated = await campaign.save();
            res.json(updated);
        } else {
            res.status(404);
            throw new Error('Campaign not found');
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
