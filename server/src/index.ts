import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorHandler';

// Routes Imports
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';
import bookingRoutes from './routes/bookingRoutes';
import vendorRoutes from './routes/vendorRoutes';
import marketingRoutes from './routes/marketingRoutes';

dotenv.config();

const app: Express = express();

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://travelzy.vercel.app',
        'https://travelzy-admin.vercel.app'
    ],
    credentials: true
}));

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());

// Database connection middleware - connect on first request
let dbConnected = false;
app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (!dbConnected) {
        try {
            await connectDB();
            dbConnected = true;
        } catch (error) {
            console.error('Failed to connect to database:', error);
            return res.status(500).json({
                success: false,
                message: 'Database connection failed'
            });
        }
    }
    next();
});

// Health check route
app.get('/', (req: Request, res: Response) => {
    res.send('Travelzy API is running with MongoDB!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/marketing', marketingRoutes);

// Error Handler
app.use(errorHandler);

// Only listen if not running in Vercel (Vercel exports the app)
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

export default app;
