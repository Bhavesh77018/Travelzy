"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const errorHandler_1 = require("./middleware/errorHandler");
// Routes Imports
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const tripRoutes_1 = __importDefault(require("./routes/tripRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const vendorRoutes_1 = __importDefault(require("./routes/vendorRoutes"));
dotenv_1.default.config();
// Connect to Database
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/trips', tripRoutes_1.default);
app.use('/api/bookings', bookingRoutes_1.default);
app.use('/api/vendors', vendorRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Travelzy API is running with MongoDB!');
});
// Error Handler
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
