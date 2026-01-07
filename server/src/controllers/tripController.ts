import { Request, Response } from 'express';
import { Trip } from '../models/Trip';

// @desc    Get all trips with filters
// @route   GET /api/trips
// @access  Public
export const getTrips = async (req: Request, res: Response) => {
    try {
        const { keyword, category, minPrice, maxPrice } = req.query;

        let query: any = {};

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
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Only show published trips to public unless verified as admin (TODO)
        query.status = 'PUBLISHED';

        const trips = await Trip.find(query);
        res.json(trips);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Public
export const getTripById = async (req: Request, res: Response) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('vendorId', 'name email');
        if (trip) {
            res.json(trip);
        } else {
            res.status(404);
            throw new Error('Trip not found');
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Trip not found' });
        }
    }
};

// @desc    Create a trip (Vendor only)
// @route   POST /api/trips
// @access  Private (Vendor)
export const createTrip = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user._id;
        const tripData = { ...req.body, vendorId };

        const trip = await Trip.create(tripData);
        res.status(201).json(trip);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private (Vendor/Admin)
export const updateTrip = async (req: Request, res: Response) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (trip) {
            // Check ownership
            if (trip.vendorId.toString() !== (req as any).user._id.toString() && (req as any).user.role !== 'admin') {
                res.status(401);
                throw new Error('Not authorized to update this trip');
            }

            const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            res.json(updatedTrip);
        } else {
            res.status(404);
            throw new Error('Trip not found');
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private (Vendor/Admin)
export const deleteTrip = async (req: Request, res: Response) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (trip) {
            if (trip.vendorId.toString() !== (req as any).user._id.toString() && (req as any).user.role !== 'admin') {
                res.status(401);
                throw new Error('Not authorized to delete this trip');
            }
            await trip.deleteOne();
            res.json({ message: 'Trip removed' });
        } else {
            res.status(404);
            throw new Error('Trip not found');
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
