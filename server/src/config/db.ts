import mongoose from 'mongoose';

// Cache the database connection
let cachedConnection: typeof mongoose | null = null;

const connectDB = async () => {
    // If we have a cached connection, reuse it
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('Using cached MongoDB connection');
        return cachedConnection;
    }

    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        console.log('Creating new MongoDB connection...');

        // Connect with optimized settings for serverless
        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Cache the connection
        cachedConnection = conn;

        return conn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Don't call process.exit in serverless - just throw the error
        throw error;
    }
};

export default connectDB;
