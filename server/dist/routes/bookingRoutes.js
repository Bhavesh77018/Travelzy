"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, bookingController_1.createBooking);
router.get('/my-bookings', authMiddleware_1.protect, bookingController_1.getMyBookings);
router.post('/validate-coupon', bookingController_1.validateCoupon);
exports.default = router;
