import express, { Express } from 'express';
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

// Connect to Database
connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://travelzy.vercel.app', 'https://travelzy-admin.vercel.app'],
    credentials: true
}));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/marketing', marketingRoutes);

app.get('/', (req, res) => {
    res.send('Travelzy API is running with MongoDB!');
});

// Error Handler
app.use(errorHandler);

// Only listen if not running in Vercel (Vercel exports the app)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

export default app;
