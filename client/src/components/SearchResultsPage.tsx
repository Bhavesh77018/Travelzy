import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { Trip } from '../types';
import { useAppState } from '../hooks/useAppState';
import { TripCard } from './ui-advanced/TripCard';

export function SearchResultsPage() {
    const location = useLocation();
    const { trips, navigateToTripDetail } = useAppState();

    // Parse query
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q')?.toLowerCase() || '';

    // Filter and Sort Logic
    const filteredTrips = useMemo(() => {
        if (!query) return trips;

        const results = trips.filter(trip =>
            trip.title.toLowerCase().includes(query) ||
            trip.destination.toLowerCase().includes(query) ||
            trip.category?.toLowerCase().includes(query)
        );

        // Sorting: Promoted First
        return results.sort((a, b) => {
            if (a.isPromoted && !b.isPromoted) return -1;
            if (!a.isPromoted && b.isPromoted) return 1;
            return 0; // Maintain original order otherwise
        });
    }, [query, trips]);

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-400">
                        <Search className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                            Search Results
                        </h1>
                        <p className="text-slate-400 mt-1">
                            Showing results for "{query}"
                        </p>
                    </div>
                </div>

                {filteredTrips.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <MapPin className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-slate-300">No trips found</h2>
                        <p className="text-slate-500 mt-2">Try searching for 'Goa', 'Ladakh', or 'Adventure'</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTrips.map((trip, index) => (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="relative">
                                    <TripCard
                                        trip={trip}
                                        onClick={() => navigateToTripDetail(trip.id)}
                                    />
                                    {/* Promoted Badge Overlay */}
                                    {trip.isPromoted && (
                                        <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/20 animate-pulse">
                                            FEATURED
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
