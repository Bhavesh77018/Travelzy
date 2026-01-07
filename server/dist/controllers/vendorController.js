"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendorProfile = exports.getVendorStats = void 0;
const VendorProfile_1 = require("../models/VendorProfile");
const Booking_1 = require("../models/Booking");
const Trip_1 = require("../models/Trip");
// @desc    Get Vendor Dashboard Stats
// @route   GET /api/vendors/stats
// @access  Private (Vendor)
const getVendorStats = async (req, res) => {
    try {
        const vendorId = req.user._id;
        // 1. Get Profile
        const profile = await VendorProfile_1.VendorProfile.findOne({ userId: vendorId });
        // 2. Count Trips
        const totalTrips = await Trip_1.Trip.countDocuments({ vendorId });
        // 3. Get Bookings & Revenue
        const bookings = await Booking_1.Booking.find({ vendorId });
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};
exports.getVendorStats = getVendorStats;
// @desc    Update Vendor Profile
// @route   PUT /api/vendors/profile
// @access  Private (Vendor)
const updateVendorProfile = async (req, res) => {
    try {
        const vendorId = req.user._id;
        const { businessName, description, address, website } = req.body;
        const profile = await VendorProfile_1.VendorProfile.findOne({ userId: vendorId });
        if (profile) {
            profile.businessName = businessName || profile.businessName;
            profile.description = description || profile.description;
            profile.address = address || profile.address;
            profile.website = website || profile.website;
            const updatedProfile = await profile.save();
            res.json(updatedProfile);
        }
        else {
            // Create if not exists
            const newProfile = await VendorProfile_1.VendorProfile.create({
                userId: vendorId,
                businessName,
                description,
                address,
                website
            });
            res.status(201).json(newProfile);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
exports.updateVendorProfile = updateVendorProfile;
