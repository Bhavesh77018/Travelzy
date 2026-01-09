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

        // Disconnect any existing connections first
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        // Connect with optimized settings for serverless
        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 30000, // Increased to 30s
            socketTimeoutMS: 75000,
            maxPoolSize: 10,
            minPoolSize: 1,
            bufferCommands: false, // Disable buffering to fail fast
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Cache the connection
        cachedConnection = conn;

        return conn;
    } catch (error) {
        console.error('MongoDB connection error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            name: error instanceof Error ? error.name : 'Unknown',
        });
        // Don't call process.exit in serverless - just throw the error
        throw error;
    }
};

export default connectDB;
