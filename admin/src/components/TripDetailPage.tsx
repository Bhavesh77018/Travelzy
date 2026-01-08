import React, { useMemo, useState } from 'react';
import { MapPin, Clock, Star, ArrowLeft } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from '../utils/cn';

export const TripDetailPage: React.FC = () => {
    const { selectedTripId, navigateToCustomerHome, navigateToBookingCheckout, trips } = useAppState();
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [guests, setGuests] = useState({ adults: 1, children: 0 });
    const [sharing, setSharing] = useState<'single' | 'double' | 'triple'>('double');

    const trip = useMemo(() => trips.find(t => t.id === selectedTripId), [selectedTripId, trips]);

    if (!trip) return <div>Trip not found</div>;

    const calculateTotal = () => {
        // Simple mock calculation logic
        let base = trip.price;
        if (sharing === 'single') base *= 1.5;
        if (sharing === 'triple') base *= 0.9;

        return (base * guests.adults) + (base * 0.5 * guests.children);
    };

    const handleBook = () => {
        if (!selectedDate) return alert('Please select a date');
        navigateToBookingCheckout(trip.id, {
            tripId: trip.id,
            date: selectedDate,
            guests,
            sharing,
            totalPrice: calculateTotal()
        } as any);
    };

    return (
        <div className="min-h-screen bg-muted/30 pb-20">
            {/* Header Image */}
            <div className="relative h-[60vh] w-full">
                <ImageWithFallback src={trip.image} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button
                    onClick={navigateToCustomerHome}
                    className="absolute top-6 left-6 rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/40"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <div className="container mx-auto">
                        <h1 className="mb-2 text-4xl font-bold md:text-6xl">{trip.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-lg">
                            <span className="flex items-center gap-2"><MapPin className="h-5 w-5" /> {trip.destination}</span>
                            <span className="flex items-center gap-2"><Clock className="h-5 w-5" /> {trip.duration} Days</span>
                            <span className="flex items-center gap-2 text-yellow-400"><Star className="h-5 w-5 fill-current" /> {trip.rating} ({trip.reviews} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto -mt-10 grid grid-cols-1 gap-8 px-4 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About */}
                    <div className="rounded-xl bg-white p-8 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold">About this Trip</h2>
                        <p className="text-gray-600 leading-relaxed">{trip.description}</p>
                    </div>

                    {/* Itinerary */}
                    <div className="rounded-xl bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Itinerary</h2>
                        <div className="space-y-6">
                            {trip.itinerary.map((day) => (
                                <div key={day.day} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                                            {day.day}
                                        </div>
                                        <div className="flex-1 w-0.5 bg-gray-200 my-2" />
                                    </div>
                                    <div className="pb-8">
                                        <h3 className="text-lg font-bold mb-2">{day.title}</h3>
                                        <ul className="space-y-2">
                                            {day.activities.map((act, i) => (
                                                <li key={i} className="flex items-center gap-2 text-gray-600">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                                                    {act}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Booking Card */}
                <div className="relative">
                    <div className="sticky top-8 rounded-xl bg-white p-6 shadow-xl border border-gray-100">
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-primary">₹{trip.price.toLocaleString()}</span>
                            <span className="text-gray-500"> / person</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium">Select Date</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {trip.dates.map(date => (
                                        <button
                                            key={date}
                                            onClick={() => setSelectedDate(date)}
                                            className={cn(
                                                "rounded-lg border p-2 text-sm transition-all",
                                                selectedDate === date
                                                    ? "border-primary bg-primary/10 text-primary font-bold ring-2 ring-primary/20"
                                                    : "hover:border-primary/50"
                                            )}
                                        >
                                            {date}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">Room Sharing</label>
                                <div className="flex gap-2">
                                    {(['single', 'double', 'triple'] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setSharing(type)}
                                            className={cn(
                                                "rounded-lg border px-3 py-2 text-sm capitalize transition-all",
                                                sharing === type
                                                    ? "border-primary bg-primary/10 text-primary font-bold"
                                                    : "hover:border-primary/50"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">Guests</label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <span className="text-xs text-gray-500">Adults</span>
                                        <input
                                            type="number"
                                            min={1}
                                            value={guests.adults}
                                            onChange={e => setGuests({ ...guests, adults: parseInt(e.target.value) })}
                                            className="w-full rounded-lg border p-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-xs text-gray-500">Children</span>
                                        <input
                                            type="number"
                                            min={0}
                                            value={guests.children}
                                            onChange={e => setGuests({ ...guests, children: parseInt(e.target.value) })}
                                            className="w-full rounded-lg border p-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-muted p-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{calculateTotal().toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleBook}
                                className="w-full rounded-xl bg-gradient-to-r from-primary to-blue-600 py-4 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                            >
                                Proceed to Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
