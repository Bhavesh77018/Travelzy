import React from 'react';
import { CheckCircle, Home, Calendar, MapPin } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { TRIPS } from '../utils/constants';

export const BookingConfirmation: React.FC = () => {
    const { confirmedBookingId, bookingData, navigateToCustomerHome } = useAppState();

    const trip = TRIPS.find(t => t.id === bookingData?.tripId);

    if (!confirmedBookingId || !bookingData || !trip) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">No Confirmed Booking Found</h1>
                    <button
                        onClick={navigateToCustomerHome}
                        className="text-primary hover:underline"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden animate-bounce">
                <div className="bg-green-500 p-8 text-center text-white">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                        <CheckCircle className="h-12 w-12" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                    <p className="text-green-100">Your trip is all set.</p>
                </div>

                <div className="p-8 space-y-6">
                    <div className="text-center pb-6 border-b">
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Booking ID</span>
                        <p className="text-2xl font-mono font-bold text-gray-800">{confirmedBookingId}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <img
                                src={trip.images[0]}
                                alt={trip.title}
                                className="h-20 w-20 rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="font-bold text-lg">{trip.title}</h3>
                                <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" /> {trip.destination}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                            <div>
                                <span className="text-xs text-gray-500 block mb-1">Date</span>
                                <span className="font-medium flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> {bookingData.date}
                                </span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block mb-1">Guests</span>
                                <span className="font-medium">
                                    {bookingData.guests.adults} Adults
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-500">Amount Paid</span>
                            <span className="font-bold text-xl text-primary">₹{bookingData.totalPrice.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={navigateToCustomerHome}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-4 font-bold text-white hover:bg-gray-800"
                    >
                        <Home className="h-4 w-4" /> Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};
