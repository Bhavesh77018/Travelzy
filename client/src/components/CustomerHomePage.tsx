import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { MapPin, Calendar, ArrowRight, Plane, Star, Heart } from 'lucide-react';
import { ImageWithFallback } from './ui/image-with-fallback';

export const CustomerHomePage: React.FC = () => {
    const {
        navigateToTripDetail,
        navigateToDestinations,
        navigateToDeals,
        navigateToAbout,
        navigateToSupport,
        navigateToVendorLanding,
        navigateToCustomerDashboard,
        trips
    } = useAppState();

    const [searchQuery, setSearchQuery] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = React.useState(false);

    // Extract unique destinations
    const allDestinations = React.useMemo(() => {
        const dests = trips.map(t => t.destination);
        return Array.from(new Set(dests));
    }, [trips]);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            const filtered = allDestinations.filter(d =>
                d.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelectDestination = (dest: string) => {
        setSearchQuery(dest);
        setShowSuggestions(false);
        const trip = trips.find(t => t.destination === dest);
        if (trip) {
            navigateToTripDetail(trip.id);
        } else {
            navigateToDestinations();
        }
    };

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Navigation Header (Mock) */}
            <nav className="absolute top-0 z-50 w-full px-6 py-4 flex justify-between items-center text-white">
                <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <Plane className="h-6 w-6" /> Travelzy
                </div>
                <div className="space-x-6 hidden md:block">
                    <button onClick={navigateToDestinations} className="hover:text-primary transition-colors">Destinations</button>
                    <button onClick={navigateToDeals} className="hover:text-primary transition-colors">Deals</button>
                    <button onClick={navigateToAbout} className="hover:text-primary transition-colors">About</button>
                    <button onClick={navigateToSupport} className="hover:text-primary transition-colors">Support</button>
                    <button onClick={navigateToVendorLanding} className="hover:text-primary transition-colors font-semibold">For Agencies</button>
                </div>
                <Button
                    onClick={navigateToCustomerDashboard}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full"
                >
                    My Dashboard
                </Button>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 via-purple-900/40 to-slate-900/90 z-10" />
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/5 text-6xl animate-bounce delay-700 opacity-80 blur-[1px]">✈️</div>
                    <div className="absolute bottom-1/3 right-1/4 text-5xl animate-pulse delay-1000 opacity-80 blur-[0.5px]">🌍</div>
                </div>

                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2670&auto=format&fit=crop"
                    className="h-full w-full object-cover opacity-70 scale-110 animate-slow-zoom"
                    alt="Hero Background"
                />

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center text-white">
                    <Badge variant="outline" className="mb-6 px-6 py-2 text-sm font-semibold tracking-widest backdrop-blur-xl border-cyan-500/30 text-cyan-300 bg-cyan-950/30 uppercase rounded-full shadow-lg shadow-cyan-500/20">
                        ✨ Experience the Extraordinary
                    </Badge>

                    <h1 className="mb-8 text-7xl md:text-9xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-50 to-cyan-200 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                        TRAVEL<br />
                        <span className="text-stroke-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">BEYOND.</span>
                    </h1>

                    <p className="mb-12 text-xl md:text-2xl max-w-3xl text-slate-200 font-light tracking-wide leading-relaxed">
                        Curated journeys for the modern wanderer. <br className="hidden md:block" /> Connect directly with premier travel designers.
                    </p>

                    {/* Search Bar */}
                    <div className="relative z-50 flex w-full max-w-5xl flex-col gap-4 rounded-3xl bg-white/5 p-3 backdrop-blur-2xl border border-white/10 md:flex-row shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 group">
                        <div className="relative flex flex-[2] items-center gap-4 rounded-2xl bg-white/95 p-4 text-slate-900 shadow-inner group-hover:bg-white transition-colors">
                            <MapPin className="ml-2 h-6 w-6 text-cyan-600" />
                            <div className="flex flex-col items-start w-full">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</label>
                                <Input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchInput}
                                    onFocus={() => { if (searchQuery) setShowSuggestions(true); }}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    placeholder="Where to next?"
                                    className="border-0 bg-transparent p-0 h-6 shadow-none focus-visible:ring-0 placeholder:text-slate-400 text-lg font-semibold w-full"
                                />
                            </div>

                            {/* Autocomplete Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 mt-4 w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up-fade border border-gray-100 p-2">
                                    <ul className="max-h-60 overflow-y-auto">
                                        {suggestions.map((dest, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => handleSelectDestination(dest)}
                                                className="px-4 py-3 hover:bg-cyan-50 cursor-pointer rounded-xl flex items-center gap-3 transition-colors text-left"
                                            >
                                                <div className="bg-cyan-100 p-2 rounded-full text-cyan-700">
                                                    <MapPin className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <span className="font-bold text-gray-800 block">{dest}</span>
                                                    <span className="text-xs text-gray-400">Popular Destination</span>
                                                </div>
                                                <ArrowRight className="h-4 w-4 ml-auto text-gray-300" />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-[1.5] items-center gap-4 rounded-2xl bg-white/95 p-4 text-slate-900 shadow-inner group-hover:bg-white transition-colors">
                            <Calendar className="ml-2 h-6 w-6 text-cyan-600" />
                            <div className="flex flex-col items-start w-full">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dates</label>
                                <Input
                                    type="date"
                                    className="border-0 bg-transparent p-0 h-6 shadow-none focus-visible:ring-0 text-slate-600 text-lg font-medium w-full"
                                />
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                if (searchQuery) handleSelectDestination(searchQuery);
                                else navigateToDestinations();
                            }}
                            size="lg"
                            className="h-auto rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-10 text-lg font-bold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </section>

            {/* Enhanced Trip Sections */}
            <div className="space-y-20 py-20 pb-32">

                {/* Recommended Section (Premium Horizontal Scroll) */}
                <TripSection
                    title="Curated For You"
                    subtitle="Handpicked destinations based on current trends."
                    trips={trips}
                    onTripClick={navigateToTripDetail}
                />

                {/* Spiritual Journeys (New Section) */}
                <TripSection
                    title="Spiritual Journeys 🕉️"
                    subtitle="Rediscover peace and find your inner self."
                    trips={trips.filter(t => t.category === 'Spiritual')}
                    bgClass="bg-orange-50/50"
                    onTripClick={navigateToTripDetail}
                />

                {/* Budget Friendly */}
                <TripSection
                    title="Budget Friendly Escapes"
                    subtitle="Adventure doesn't have to break the bank."
                    trips={trips.filter(t => t.price < 20000)}
                    onTripClick={navigateToTripDetail}
                />

                {/* Luxury Collections */}
                <TripSection
                    title="Luxury Collections"
                    subtitle="Indulge in the finest experiences the world has to offer."
                    trips={trips.filter(t => t.price > 50000)}
                    bgClass="bg-slate-50"
                    onTripClick={navigateToTripDetail}
                />

            </div>

            {/* Rich Footer */}
            <footer className="bg-slate-950 text-slate-300 py-16">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-2xl font-bold text-white tracking-tighter">
                            <Plane className="h-6 w-6 text-cyan-400" /> Travelzy
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Connecting you with the world's best travel designers. Experience the extraordinary with curated journeys.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-600 transition-colors cursor-pointer text-white">𝕏</div>
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer text-white">📸</div>
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-white">in</div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">About Us</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Careers</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Press</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Blog</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Help Center</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Safety Information</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Cancellation Options</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Report a Concern</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Newsletter</h4>
                        <p className="text-sm text-slate-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500" />
                            <Button size="icon" className="bg-cyan-600 hover:bg-cyan-500 text-white shrink-0">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-xs text-slate-500 flex justify-between items-center">
                    <p>© 2024 Travelzy Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-white cursor-pointer">Privacy</span>
                        <span className="hover:text-white cursor-pointer">Terms</span>
                        <span className="hover:text-white cursor-pointer">Sitemap</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Reusable Trip Section Component
interface TripSectionProps {
    title: string;
    subtitle: string;
    trips: any[];
    bgClass?: string;
    onTripClick: (id: string) => void;
}

const TripSection = ({ title, subtitle, trips, bgClass = '', onTripClick }: TripSectionProps) => {
    if (trips.length === 0) return null;
    return (
        <section className={`py-12 ${bgClass}`}>
            <div className="container mx-auto px-6 mb-8 flex items-end justify-between">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">{title}</h2>
                    <p className="text-slate-500 font-light text-lg">{subtitle}</p>
                </div>
                <Button variant="ghost" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 font-semibold group">
                    View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            {/* Snap Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-6 snap-x snap-mandatory hide-scrollbar">
                {trips.map((trip) => (
                    <div key={trip.id} onClick={() => onTripClick(trip.id)} className="min-w-[300px] md:min-w-[340px] snap-center">
                        <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-[2rem] bg-white cursor-pointer relative">
                            {/* Image with Gradient Overlay */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                <ImageWithFallback
                                    src={trip.image}
                                    alt={trip.title}
                                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors cursor-pointer">
                                        <Heart className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 z-20 text-white">
                                    <Badge className="bg-cyan-500/80 backdrop-blur-sm hover:bg-cyan-500 border-0 mb-2">
                                        {trip.category || trip.type || 'Adventure'}
                                    </Badge>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-xl leading-tight group-hover:text-cyan-700 transition-colors line-clamp-2">{trip.title}</h3>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                        <span className="font-bold text-slate-700 text-sm">{trip.rating}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                                    <MapPin className="h-4 w-4 text-cyan-500" />
                                    <span className="truncate">{trip.destination}</span>
                                </div>

                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Starting from</span>
                                        <span className="text-2xl font-black text-slate-800">
                                            ₹{trip.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <Button className="rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/20 group-hover:bg-cyan-600 group-hover:shadow-cyan-500/30 transition-all duration-300">
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
};
