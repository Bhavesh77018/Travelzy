import { Request, Response } from 'express';
import { VendorProfile } from '../models/VendorProfile';
import { Booking } from '../models/Booking';
import { Trip } from '../models/Trip';
import { User } from '../models/User';

// @desc    Get Vendor Dashboard Stats
// @route   GET /api/vendors/stats
// @access  Private (Vendor)
export const getVendorStats = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user._id;

        // 1. Get Profile
        const profile = await VendorProfile.findOne({ userId: vendorId });

        // 2. Count Trips
        const totalTrips = await Trip.countDocuments({ vendorId });

        // 3. Get Bookings & Revenue
        const bookings = await Booking.find({ vendorId });
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, curr) => acc + curr.totalAmount, 0);

        // 4. Calculate Views (Mock logic for now, or sum from Trips if we had a view counter)
        const totalViews = totalTrips * 125 + Math.floor(Math.random() * 100);

        res.json({
            profile,
            stats: {
                totalTrips,
                totalBookings,
                totalRevenue,
                totalViews,
            }
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Update Vendor Profile
// @route   PUT /api/vendors/profile
// @access  Private (Vendor)
export const updateVendorProfile = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user._id;
        const { businessName, description, address, website, documents } = req.body;

        const profile = await VendorProfile.findOne({ userId: vendorId });

        if (profile) {
            profile.businessName = businessName || profile.businessName;
            profile.description = description || profile.description;
            profile.address = address || profile.address;
            profile.website = website || profile.website;
            if (documents) profile.documents = documents; // Update documents if provided

            const updatedProfile = await profile.save();
            res.json(updatedProfile);
        } else {
            // Create if not exists
            const newProfile = await VendorProfile.create({
                userId: vendorId,
                businessName,
                description,
                address,
                website,
                documents: documents || []
            });
            res.status(201).json(newProfile);
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

// @desc    Get all pending vendors (Admin)
// @route   GET /api/vendors/pending
// @access  Private (Admin)
export const getPendingVendors = async (req: Request, res: Response) => {
    try {
        const vendors = await VendorProfile.find({ verificationStatus: 'PENDING' });
        res.json(vendors);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Verify or Reject Vendor
// @route   PUT /api/vendors/:id/verify
// @access  Private (Admin)
export const verifyVendor = async (req: Request, res: Response) => {
    try {
        const { status, notes } = req.body; // status: 'VERIFIED' | 'REJECTED'
        const vendor = await VendorProfile.findById(req.params.id);

        if (vendor) {
            vendor.verificationStatus = status;
            vendor.verificationNotes = notes;
            const updatedVendor = await vendor.save();

            // Also update the User role if needed or notify them (simulated)
            if (status === 'VERIFIED') {
                // Could verify the User model too if we had a field there, but VendorProfile is enough
            }

            res.json(updatedVendor);
        } else {
            res.status(404);
            throw new Error('Vendor not found');
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
