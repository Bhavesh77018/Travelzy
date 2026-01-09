import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    role: {
        type: String,
        enum: ['customer', 'vendor', 'admin'],
        default: 'customer',
    },
    phone: {
        type: String,
        required: false,
    },
    credits: {
        type: Number,
        default: 0,
    },
    creditTransactions: [{
        type: {
            type: String,
            enum: ['purchase', 'spent', 'refund'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        relatedTripId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trip'
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
}, {
    timestamps: true,
});

export const User = mongoose.model('User', userSchema);
