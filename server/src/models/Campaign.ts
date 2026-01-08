import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['EMAIL', 'SMS', 'FEATURED_LISTING', 'SOCIAL_MEDIA'],
        required: true
    },
    status: {
        type: String,
        enum: ['DRAFT', 'ACTIVE', 'COMPLETED', 'PAUSED'],
        default: 'DRAFT'
    },
    budget: {
        type: Number,
        required: true
    },
    startDate: Date,
    endDate: Date,
    stats: {
        impressions: { type: Number, default: 0 },
        clicks: { type: Number, default: 0 },
        conversions: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

export const Campaign = mongoose.model('Campaign', campaignSchema);
