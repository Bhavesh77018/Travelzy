import React, { useMemo, useState } from 'react';
import { MapPin, Clock, Star, ArrowLeft, Check, X, Shield, Users, Calendar as CalendarIcon, Utensils, Info } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from '../utils/cn';

export const TripDetailPage: React.FC = () => {
    const { selectedTripId, navigateToCustomerHome, navigateToBookingCheckout, trips } = useAppState();
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [guests, setGuests] = useState({ adults: 1, children: 0 });
    const [sharing, setSharing] = useState<'single' | 'double' | 'triple'>('double');

    const trip = useMemo(() => trips.find(t => t.id === selectedTripId), [selectedTripId, trips]);

    if (!trip) return <div className="min-h-screen flex items-center justify-center">Trip not found</div>;

    const calculateTotal = () => {
        let base = trip.price;
        // Basic logic for sharing adjustment
        if (trip.pricing) {
            if (sharing === 'single') base = trip.pricing.single;
            if (sharing === 'double') base = trip.pricing.double;
            if (sharing === 'triple') base = trip.pricing.triple;
        } else {
            // Fallback logic if specific pricing obj missing (backward compat)
            if (sharing === 'single') base *= 1.5;
            if (sharing === 'triple') base *= 0.9;
        }

        return (base * guests.adults) + (base * 0.75 * guests.children);
    };

    const handleBook = () => {
        if (!selectedDate) return alert('Please select a date');
        navigateToBookingCheckout({
            tripId: trip.id,
            date: selectedDate,
            guests,
            sharing,
            totalPrice: calculateTotal()
        });
    };

    return (
        <div className="min-h-screen bg-neutral-50 pb-20 font-sans text-neutral-900">
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-transparent lg:bg-gradient-to-b lg:from-black/50 lg:to-transparent pointer-events-none">
                <button
                    onClick={navigateToCustomerHome}
                    className="pointer-events-auto rounded-full bg-white/90 p-3 shadow-sm backdrop-blur-md transition hover:bg-white hover:scale-105"
                >
                    <ArrowLeft className="h-5 w-5 text-neutral-800" />
                </button>
                {/* Share/Save icons could go here */}
            </nav>

            {/* Hero Section */}
            <div className="relative h-[50vh] lg:h-[65vh] w-full overflow-hidden">
                <ImageWithFallback src={trip.image} className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 text-white">
                    <div className="container mx-auto max-w-7xl">
                        <div className="flex flex-col gap-2 animate-fade-in-up">
                            <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md border border-white/10 uppercase tracking-wider">
                                {trip.type || 'Adventure'}
                            </span>
                            <h1 className="text-4xl font-black tracking-tight leading-tight lg:text-7xl drop-shadow-lg">
                                {trip.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 lg:gap-8 mt-2 text-sm lg:text-base font-medium opacity-90">
                                <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> {trip.destination}</span>
                                <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> {trip.duration} Days / {trip.duration - 1} Nights</span>
                                <span className="flex items-center gap-2"><Star className="h-5 w-5 fill-yellow-400 text-yellow-400" /> {trip.rating} ({trip.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 lg:px-8 py-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Highlights / Quick Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Shield, label: 'Verified Trip', desc: 'Curated by Experts' },
                                { icon: Users, label: 'Group Size', desc: 'Max 15 People' },
                                { icon: CalendarIcon, label: 'Free Reschedule', desc: 'Up to 7 days before' },
                                { icon: Utensils, label: 'Meals Included', desc: 'Breakfast & Dinner' },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                    <item.icon className="h-6 w-6 text-primary mb-2" />
                                    <span className="text-sm font-bold text-gray-900">{item.label}</span>
                                    <span className="text-xs text-gray-500">{item.desc}</span>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Experience</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">{trip.description}</p>
                        </div>

                        {/* Itinerary */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                Itinerary
                                <span className="text-sm font-normal text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">Day by Day</span>
                            </h2>
                            <div className="relative border-l-2 border-primary/20 ml-3 space-y-8 pl-8 pb-4">
                                {trip.itinerary.map((day, index) => (
                                    <div key={day.day} className="relative group">
                                        <div className="absolute -left-[41px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-primary shadow-sm group-hover:scale-110 transition-transform">
                                            <span className="text-xs font-bold text-primary">{day.day}</span>
                                        </div>
                                        <div className="rounded-xl bg-white p-6 border border-gray-100 shadow-sm group-hover:border-primary/20 transition-colors">
                                            <h3 className="text-lg font-bold text-gray-900 mb-3">{day.title}</h3>
                                            <ul className="space-y-2">
                                                {day.activities.map((act, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                                                        <span className="leading-snug">{act}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inclusions / Exclusions */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                                <h3 className="text-lg font-bold mb-4 text-green-800 flex items-center gap-2">
                                    <Check className="h-5 w-5" /> What's Included
                                </h3>
                                <ul className="space-y-3">
                                    {trip.inclusions?.map((inc, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                                            <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> {inc}
                                        </li>
                                    )) || (
                                            <>
                                                <li className="flex items-start gap-2 text-sm text-green-900"><Check className="h-4 w-4 text-green-600" /> Accommodation</li>
                                                <li className="flex items-start gap-2 text-sm text-green-900"><Check className="h-4 w-4 text-green-600" /> Selected Meals</li>
                                                <li className="flex items-start gap-2 text-sm text-green-900"><Check className="h-4 w-4 text-green-600" /> Transport</li>
                                            </>
                                        )}
                                </ul>
                            </div>
                            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                                <h3 className="text-lg font-bold mb-4 text-red-800 flex items-center gap-2">
                                    <X className="h-5 w-5" /> What's Excluded
                                </h3>
                                <ul className="space-y-3">
                                    {trip.exclusions?.map((exc, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                                            <X className="h-4 w-4 text-red-600 shrink-0 mt-0.5" /> {exc}
                                        </li>
                                    )) || (
                                            <>
                                                <li className="flex items-start gap-2 text-sm text-red-900"><X className="h-4 w-4 text-red-600" /> Airfare</li>
                                                <li className="flex items-start gap-2 text-sm text-red-900"><X className="h-4 w-4 text-red-600" /> Personal Expenses</li>
                                            </>
                                        )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Card (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="rounded-2xl bg-white p-6 shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-600" />

                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-gray-900">₹{trip.price.toLocaleString()}</span>
                                        <span className="text-gray-500 font-medium">/ person</span>
                                    </div>
                                    <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded w-fit font-medium flex items-center gap-1">
                                        <Info className="h-3 w-3" /> Best Price Guaranteed
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {/* Date Selection */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Select Date</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {trip.dates.map(date => (
                                                <button
                                                    key={date}
                                                    onClick={() => setSelectedDate(date)}
                                                    className={cn(
                                                        "rounded-lg border p-2 text-sm font-medium transition-all text-center",
                                                        selectedDate === date
                                                            ? "border-primary bg-primary text-white shadow-md transform scale-[1.02]"
                                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-transparent hover:border-gray-200"
                                                    )}
                                                >
                                                    {date}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Configurations */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Sharing</label>
                                            <select
                                                className="w-full p-2.5 rounded-lg bg-gray-50 border-none text-sm font-semibold focus:ring-2 focus:ring-primary/20"
                                                value={sharing}
                                                onChange={(e) => setSharing(e.target.value as any)}
                                            >
                                                <option value="single">Single</option>
                                                <option value="double">Double</option>
                                                <option value="triple">Triple</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Adults</label>
                                            <div className="flex items-center rounded-lg bg-gray-50 p-1">
                                                <button onClick={() => setGuests(g => ({ ...g, adults: Math.max(1, g.adults - 1) }))} className="p-1 hover:bg-white rounded shadow-sm transition">-</button>
                                                <input className="w-full bg-transparent text-center font-bold text-sm" readOnly value={guests.adults} />
                                                <button onClick={() => setGuests(g => ({ ...g, adults: g.adults + 1 }))} className="p-1 hover:bg-white rounded shadow-sm transition">+</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="pt-4 border-t flex justify-between items-center text-lg font-bold">
                                        <span>Total Amount</span>
                                        <span className="text-primary">₹{calculateTotal().toLocaleString()}</span>
                                    </div>

                                    <button
                                        onClick={handleBook}
                                        className="w-full group relative overflow-hidden rounded-xl bg-gray-900 py-4 font-bold text-white shadow-lg transition-all hover:bg-black active:scale-[0.98]"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Proceed to Book <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </button>

                                    <p className="text-center text-xs text-gray-400">No payment required today.</p>
                                </div>
                            </div>

                            {/* Vendor/Host Mini Card */}
                            <div className="rounded-xl bg-white p-4 border border-gray-100 flex items-center gap-4 shadow-sm">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold text-lg">
                                    T
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Trip Hosted by</p>
                                    <p className="font-bold text-sm">Travelzy Verified Partner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
