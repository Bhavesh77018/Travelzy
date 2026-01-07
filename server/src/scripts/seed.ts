import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Trip } from '../models/Trip';
import { User } from '../models/User';
import { Booking } from '../models/Booking';
import { VendorProfile } from '../models/VendorProfile';
import { TRIPS, MOCK_BOOKINGS, MOCK_VENDORS } from '../data/mockData';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log('MongoDB Connected for Seeding...');

        // Clear existing data
        await Trip.deleteMany({});
        await User.deleteMany({});
        await Booking.deleteMany({});
        await VendorProfile.deleteMany({});
        console.log('Data Cleared.');

        // 1. Create Users (Admin, Vendor, Customer)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@travelzy.com',
            password: hashedPassword,
            role: 'admin'
        });

        const vendorUser = await User.create({
            name: 'Himalayan Adventures',
            email: 'vendor@travelzy.com',
            password: hashedPassword,
            role: 'vendor'
        });

        const customerUser = await User.create({
            name: 'Demo Traveler',
            email: 'user@travelzy.com',
            password: hashedPassword,
            role: 'customer'
        });

        console.log('Users Created.');

        // 2. Create Vendor Profile
        await VendorProfile.create({
            userId: vendorUser._id,
            businessName: 'Himalayan Adventures',
            description: 'Premium adventure travel agency.',
            verificationStatus: 'VERIFIED',
            revenue: 0,

        });

        // 3. Create Trips
        // Map mock trips to the new Vendor ID
        const tripsToInsert = TRIPS.map(trip => ({
            ...trip,
            vendorId: vendorUser._id,
            price: Number(trip.price),
            duration: String(trip.duration) + ' Days', // Convert number to string for schema if needed, schema says String? checking schema...
            // Wait, schema says duration: String, Mock says number. Converting.
            images: [trip.image], // Mock has 'image', Schema has 'images' array.
            startDate: new Date(), // Mock dates are strings, initializing to now for seed
            endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
            totalSeats: 20,
            availableSeats: 20,
            status: 'PUBLISHED',
            // isPromoted is already in mockData update
        }));

        await Trip.insertMany(tripsToInsert);
        console.log('Trips Imported.');

        console.log('Seeding Completed Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error with Seeding:', error);
        process.exit(1);
    }
};

seedData();
