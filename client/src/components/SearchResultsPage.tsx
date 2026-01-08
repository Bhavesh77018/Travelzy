import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Search, Star, Heart } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LazyImage } from './ui-advanced/LazyImage';

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
                                <div className="relative group cursor-pointer" onClick={() => navigateToTripDetail(trip.id)}>
                                    <Card className="border-0 shadow-lg overflow-hidden rounded-[2rem] bg-white h-full hover:-translate-y-1 transition-all duration-300">
                                        {/* Image Area */}
                                        <div className="relative h-64 overflow-hidden">
                                            <LazyImage
                                                src={trip.images?.[0] || ''}
                                                alt={trip.title}
                                                className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                            <div className="absolute top-4 right-4 z-10">
                                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors">
                                                    <Heart className="h-5 w-5 text-white" />
                                                </div>
                                            </div>

                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <Badge className="bg-cyan-500/90 backdrop-blur-md border-0 mb-2">
                                                    {trip.duration} Days
                                                </Badge>
                                                <h3 className="font-bold text-xl leading-tight line-clamp-1">{trip.title}</h3>
                                                <div className="flex items-center gap-1 text-sm text-slate-200 mt-1">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {trip.destination}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-5">
                                            <div className="flex justify-between items-center mb-4">
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                                                    {trip.category || 'Experience'}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                                    <Star className="h-4 w-4 fill-current" />
                                                    {trip.rating}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-400 font-bold uppercase">Starts from</span>
                                                    <span className="text-xl font-black text-slate-800">
                                                        ₹{trip.price.toLocaleString()}
                                                    </span>
                                                </div>
                                                <Button size="sm" className="rounded-full bg-slate-900 text-white group-hover:bg-cyan-600 transition-colors">
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Promoted Badge Overlay */}
                                    {trip.isPromoted && (
                                        <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/20 animate-pulse">
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
