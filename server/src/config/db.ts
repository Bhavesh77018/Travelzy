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
            console.error('MONGO_URI environment variable is missing');
            throw new Error('MONGO_URI environment variable is not defined');
        }

        console.log('Creating new MongoDB connection...');
        console.log('MongoDB URI exists:', !!mongoUri);
        console.log('MongoDB URI length:', mongoUri.length);

        // Connect with optimized settings for serverless
        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000, // Increased to 10s
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            minPoolSize: 1,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Cache the connection
        cachedConnection = conn;

        return conn;
    } catch (error) {
        console.error('MongoDB connection error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            name: error instanceof Error ? error.name : 'Unknown',
            stack: error instanceof Error ? error.stack : undefined
        });
        // Don't call process.exit in serverless - just throw the error
        throw error;
    }
};

export default connectDB;
