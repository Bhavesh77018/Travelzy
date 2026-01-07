"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tripId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    vendorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User', // Vendor is also a User
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    travelDate: {
        type: Date,
        required: true
    },
    guests: {
        adults: { type: Number, required: true },
        children: { type: Number, default: 0 },
        total: { type: Number, required: true }
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
        default: 'PENDING'
    },
    bookingStatus: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
        default: 'PENDING'
    },
    contactDetails: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String
    }
}, {
    timestamps: true
});
exports.Booking = mongoose_1.default.model('Booking', bookingSchema);
