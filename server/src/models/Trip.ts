import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PENDING', 'PUBLISHED', 'COMPLETED', 'CANCELLED'],
        default: 'DRAFT'
    },
    timeline: [{
        day: Number,
        title: String,
        description: String
    }],
    inclusions: [String],
    exclusions: [String],
    isPromoted: {
        type: Boolean,
        default: false
    },
    adminComments: String
}, {
    timestamps: true
});

export const Trip = mongoose.model('Trip', tripSchema);
