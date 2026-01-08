import mongoose from 'mongoose';

const vendorProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: {
            type: String,
            enum: ['company', 'individual', 'cheque'],
            required: true
        },
        urls: [String]
    }],
    verificationNotes: String,
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

export const VendorProfile = mongoose.model('VendorProfile', vendorProfileSchema);
