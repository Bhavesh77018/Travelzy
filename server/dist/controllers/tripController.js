"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrip = exports.updateTrip = exports.createTrip = exports.getTripById = exports.getTrips = void 0;
const Trip_1 = require("../models/Trip");
// @desc    Get all trips with filters
// @route   GET /api/trips
// @access  Public
const getTrips = async (req, res) => {
    try {
        const { keyword, category, minPrice, maxPrice } = req.query;
        let query = {};
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { destination: { $regex: keyword, $options: 'i' } },
            ];
        }
        if (category) {
            query.category = category;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = Number(minPrice);
            if (maxPrice)
                query.price.$lte = Number(maxPrice);
        }
        // Only show published trips to public unless verified as admin (TODO)
        query.status = 'PUBLISHED';
        const trips = await Trip_1.Trip.find(query);
        res.json(trips);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};
exports.getTrips = getTrips;
// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Public
const getTripById = async (req, res) => {
    try {
        const trip = await Trip_1.Trip.findById(req.params.id).populate('vendorId', 'name email');
        if (trip) {
            res.json(trip);
        }
        else {
            res.status(404);
            throw new Error('Trip not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Trip not found' });
        }
    }
};
exports.getTripById = getTripById;
// @desc    Create a trip (Vendor only)
// @route   POST /api/trips
// @access  Private (Vendor)
const createTrip = async (req, res) => {
    try {
        const vendorId = req.user._id;
        const tripData = { ...req.body, vendorId };
        const trip = await Trip_1.Trip.create(tripData);
        res.status(201).json(trip);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
exports.createTrip = createTrip;
// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private (Vendor/Admin)
const updateTrip = async (req, res) => {
    try {
        const trip = await Trip_1.Trip.findById(req.params.id);
        if (trip) {
            // Check ownership
            if (trip.vendorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                res.status(401);
                throw new Error('Not authorized to update this trip');
            }
            const updatedTrip = await Trip_1.Trip.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            res.json(updatedTrip);
        }
        else {
            res.status(404);
            throw new Error('Trip not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
exports.updateTrip = updateTrip;
// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private (Vendor/Admin)
const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip_1.Trip.findById(req.params.id);
        if (trip) {
            if (trip.vendorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                res.status(401);
                throw new Error('Not authorized to delete this trip');
            }
            await trip.deleteOne();
            res.json({ message: 'Trip removed' });
        }
        else {
            res.status(404);
            throw new Error('Trip not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
exports.deleteTrip = deleteTrip;
