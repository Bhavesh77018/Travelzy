import React, { useState } from 'react';
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';

export const BookingCheckout: React.FC = () => {
    const { bookingData, navigateToTripDetail, navigateToBookingConfirmation, trips } = useAppState();

    // Find trip based on booking data
    const trip = trips.find(t => t.id === bookingData?.tripId);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    if (!bookingData || !trip) return <div>Invalid Booking Session</div>;

    const handlePayment = () => {
        // Mock payment processing
        setTimeout(() => {
            const mockBookingId = `BK${Math.floor(Math.random() * 1000000000)}`;
            navigateToBookingConfirmation(mockBookingId);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="mx-auto max-w-5xl rounded-2xl bg-white shadow-xl overflow-hidden grid md:grid-cols-3">
                {/* Left: Summary */}
                <div className="bg-muted/30 p-8 md:col-span-1 border-r">
                    <button
                        onClick={() => navigateToTripDetail(trip.id)}
                        className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Trip
                    </button>

                    <h2 className="text-xl font-bold mb-4">Trip Summary</h2>
                    <div className="mb-4 aspect-video rounded-lg overflow-hidden">
                        <img src={trip.image} alt={trip.title} className="h-full w-full object-cover" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{trip.title}</h3>

                    <div className="space-y-4 text-sm mt-6">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Date</span>
                            <span className="font-medium">{bookingData.date}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Guests</span>
                            <span className="font-medium">{bookingData.guests.adults} Ad, {bookingData.guests.children} Ch</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Room Sharing</span>
                            <span className="font-medium capitalize">{bookingData.sharing}</span>
                        </div>
                        <div className="flex justify-between pt-2 text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary">₹{bookingData.totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Checkout Form */}
                <div className="p-8 md:col-span-2">
                    {step === 1 ? (
                        <div className="space-y-6 animate-fade-in">
                            <h1 className="text-2xl font-bold">Guest Details</h1>
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full rounded-lg border p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            className="w-full rounded-lg border p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                className="w-full rounded-xl bg-primary py-4 font-bold text-white hover:bg-primary/90"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <CreditCard className="h-6 w-6" /> Payment
                            </h1>

                            <div className="rounded-xl border bg-blue-50 p-4 border-blue-100 flex items-center gap-3">
                                <ShieldCheck className="h-6 w-6 text-blue-600" />
                                <p className="text-sm text-blue-800">Payments are secure and encrypted.</p>
                            </div>

                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className="w-full rounded-lg border p-3 focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Expiry</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-full rounded-lg border p-3 focus:border-primary outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="w-full rounded-lg border p-3 focus:border-primary outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 rounded-xl border border-gray-300 py-4 font-bold text-gray-700 hover:bg-gray-50"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handlePayment}
                                    className="flex-[2] rounded-xl bg-accent py-4 font-bold text-white hover:bg-accent/90 shadow-lg shadow-accent/20"
                                >
                                    Pay ₹{bookingData.totalPrice.toLocaleString()}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
