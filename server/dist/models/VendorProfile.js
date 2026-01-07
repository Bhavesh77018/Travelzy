"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProfile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const vendorProfileSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        required: true
    },
    description: String,
    logo: String,
    website: String,
    address: String,
    verificationStatus: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED'],
        default: 'PENDING'
    },
    documents: [{
            type: String, // URLs to uploaded docs
            name: String
        }],
    revenue: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 5.0
    }
}, {
    timestamps: true
});
exports.VendorProfile = mongoose_1.default.model('VendorProfile', vendorProfileSchema);
