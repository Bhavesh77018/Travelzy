import React, { useState } from 'react';
import {
    Plane,
    Clock,
    Grid,
    User,
    MessageCircle,
    LogOut,
    Home,
    Download
} from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from '../utils/cn';

export const CustomerDashboard: React.FC = () => {
    const { navigateToCustomerHome, navigateToTripDetail, navigateToSupport, trips } = useAppState();
    const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'completed'>('upcoming');
    const [view, setView] = useState<'bookings' | 'profile'>('bookings');

    // Apps usually fetch this data. We'll use mock data derived from constants for now.
    // In a real app, `bookings` would be fetched and joined with `trips`.
    // For now, ensuring we don't crash if trips are empty.
    const safeTrips = trips.length > 0 ? trips : [];

    const activeTrips = safeTrips.length >= 3 ? [
        { ...safeTrips[0], bookingId: 'BK9876543210', date: '2025-01-15', status: 'upcoming' },
        { ...safeTrips[1], bookingId: 'BK1234567890', date: '2024-12-20', status: 'ongoing' },
        { ...safeTrips[2], bookingId: 'BK5555555555', date: '2024-10-10', status: 'completed' },
    ] : [];

    const filteredTrips = activeTrips.filter(t => t.status === activeTab);

    return (
        <div className="min-h-screen bg-muted/20 flex">
            {/* Sidebar (Desktop) */}
            <aside className="hidden w-64 flex-col border-r bg-white p-6 md:flex">
                <div className="mb-8 flex items-center gap-2 text-2xl font-bold text-primary">
                    <Plane className="h-8 w-8" /> Travelzy
                </div>

                <nav className="space-y-2 flex-1">
                    <button
                        onClick={() => setView('bookings')}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-4 py-3 font-bold transition-colors",
                            view === 'bookings' ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <Grid className="h-5 w-5" /> My Bookings
                    </button>
                    <button
                        onClick={() => setView('profile')}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-4 py-3 font-bold transition-colors",
                            view === 'profile' ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <User className="h-5 w-5" /> Profile
                    </button>
                    <button
                        onClick={navigateToSupport}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        <MessageCircle className="h-5 w-5" /> Support
                    </button>
                </nav>

                <button
                    onClick={navigateToCustomerHome}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                    <LogOut className="h-5 w-5" /> Back to Home
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{view === 'bookings' ? 'My Bookings' : 'My Profile'}</h1>
                        <p className="text-gray-500">{view === 'bookings' ? 'Manage your trips and view details.' : 'Manage your personal information.'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-[2px]">
                            <div className="h-full w-full rounded-full bg-white p-0.5">
                                <img src="https://github.com/shadcn.png" alt="User" className="h-full w-full rounded-full" />
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-bold">Bhavesh Aggarwal</p>
                            <p className="text-xs text-gray-500">Traveler</p>
                        </div>
                    </div>
                </header>

                {view === 'bookings' ? (
                    <>
                        {/* Tabs */}
                        <div className="mb-8 flex gap-4 border-b border-gray-200">
                            {(['upcoming', 'ongoing', 'completed'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "relative pb-4 text-sm font-medium capitalize transition-colors",
                                        activeTab === tab
                                            ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                                            : "text-gray-500 hover:text-gray-900"
                                    )}
                                >
                                    {tab} ({activeTrips.filter(t => t.status === tab).length})
                                </button>
                            ))}
                        </div>

                        {/* Trip Cards */}
                        <div className="grid gap-6">
                            {filteredTrips.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-16 text-center shadow-sm">
                                    <Plane className="h-16 w-16 text-gray-200 mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900">No {activeTab} trips found</h3>
                                    <p className="text-gray-500 mb-6">Time to plan your next adventure!</p>
                                    <button
                                        onClick={navigateToCustomerHome}
                                        className="rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90"
                                    >
                                        Explore Destinations
                                    </button>
                                </div>
                            ) : (
                                filteredTrips.map((trip) => (
                                    <div key={trip.bookingId} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md border border-gray-100 flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-64 h-48 md:h-auto">
                                            <ImageWithFallback src={trip.images?.[0] || ''} className="h-full w-full object-cover" />
                                            <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
                                                {trip.status}
                                            </div>
                                        </div>

                                        <div className="flex-1 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900">{trip.title}</h3>
                                                        <p className="text-gray-500 flex items-center gap-1 text-sm mt-1">
                                                            <Clock className="h-4 w-4" /> {trip.duration} Days • {trip.date}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold text-primary">₹{trip.price.toLocaleString()}</p>
                                                        <p className="text-xs text-gray-400">Paid in full</p>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                        Booking ID: {trip.bookingId}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                                        {trip.type}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex gap-3 border-t pt-4">
                                                <button
                                                    onClick={() => navigateToTripDetail(trip.id)}
                                                    className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    View Itinerary
                                                </button>
                                                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary/10 py-2.5 text-sm font-bold text-primary hover:bg-primary/20 transition-colors">
                                                    <Download className="h-4 w-4" /> Invoice
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                ) : (
                    <div className="rounded-xl bg-white p-8 shadow-sm max-w-2xl">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
                                <img src="https://github.com/shadcn.png" alt="Profile" className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Bhavesh Aggarwal</h2>
                                <p className="text-gray-500">bhavesh.traveler@example.com</p>
                                <button className="mt-2 text-primary font-bold text-sm hover:underline">Change Profile Picture</button>
                            </div>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" defaultValue="Bhavesh Aggarwal" className="w-full rounded-lg border p-2.5 bg-gray-50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" defaultValue="+91 98765 43210" className="w-full rounded-lg border p-2.5 bg-gray-50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" defaultValue="bhavesh.traveler@example.com" className="w-full rounded-lg border p-2.5 bg-gray-50" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input type="text" defaultValue="Mumbai, India" className="w-full rounded-lg border p-2.5 bg-gray-50" />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button type="button" className="rounded-lg bg-primary px-6 py-2.5 font-bold text-white hover:bg-primary/90">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>

            {/* Mobile Nav Overlay (Mock) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-around md:hidden z-50">
                <Home className={cn("h-6 w-6", view === 'bookings' ? "text-primary" : "text-gray-400")} onClick={navigateToCustomerHome} />
                <Grid className={cn("h-6 w-6", view === 'bookings' ? "text-primary" : "text-gray-400")} onClick={() => setView('bookings')} />
                <MessageCircle className="h-6 w-6 text-gray-400" onClick={navigateToSupport} />
                <User className={cn("h-6 w-6", view === 'profile' ? "text-primary" : "text-gray-400")} onClick={() => setView('profile')} />
            </div>
        </div>
    );
};
