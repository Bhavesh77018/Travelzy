
import React from 'react';
import { useAppState } from '../hooks/useAppState';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MapPin, ArrowRight, Plane } from 'lucide-react';
import { WhyChooseUs, VerifiedBadge, SupportBanner, MarketingBanner, Testimonials } from './BrandingSections';
// import { LazyImage } from './ui-advanced/LazyImage';
import { HeroCarousel } from './ui-advanced/HeroCarousel';
import { TripSlider } from './ui-advanced/TripSlider';


export const CustomerHomePage: React.FC = () => {
    const {
        navigateToTripDetail,
        navigateToDestinations,
        navigateToDeals,
        navigateToAbout,
        navigateToVendorLanding,
        navigateToCustomerDashboard,
        navigateToSearchResults,
        trips
    } = useAppState();

    const [searchQuery, setSearchQuery] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = React.useState(false);

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
        navigateToSearchResults(dest);
    };

    return (
        <div className="min-h-screen bg-slate-950 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
            {/* Flash Sale Banner */}
            <MarketingBanner />

            {/* Navigation Header (Mock - Updated for Dark Theme) */}
            <nav className="absolute top-10 z-50 w-full px-6 py-4 flex justify-between items-center text-white">
                <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <Plane className="h-6 w-6 text-cyan-400" /> Travelzy
                </div>
                <div className="space-x-8 hidden md:block text-sm font-medium tracking-wide">
                    <button onClick={navigateToDestinations} className="hover:text-cyan-400 transition-colors">Destinations</button>
                    <button onClick={navigateToDeals} className="hover:text-cyan-400 transition-colors">Deals</button>
                    <button onClick={navigateToAbout} className="hover:text-cyan-400 transition-colors">About</button>
                    <button onClick={navigateToVendorLanding} className="hover:text-cyan-400 transition-colors font-semibold bg-white/10 px-4 py-2 rounded-full hover:bg-white/20">For Agencies</button>
                </div>
                <Button
                    onClick={navigateToCustomerDashboard}
                    variant="outline"
                    className="bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/20 hover:text-white rounded-full px-6"
                >
                    My Dashboard
                </Button>
            </nav>

            {/* Hero Section with Search Overlay */}
            <div className="relative">
                <HeroCarousel onCtaClick={navigateToDestinations} />

                {/* Search Overlay */}
                <div className="absolute bottom-20 left-0 right-0 z-50 px-6">
                    <div className="max-w-3xl mx-auto bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-full flex gap-2 shadow-2xl shadow-cyan-900/20">
                        <div className="flex-1 relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Where to next? (e.g., Bali, Mars, Tokyo)"
                                className="w-full h-12 bg-transparent text-white placeholder:text-slate-400 pl-12 pr-4 outline-none text-lg font-medium"
                                value={searchQuery}
                                onChange={handleSearchInput}
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in zoom-in-95">
                                    {suggestions.map((s) => (
                                        <div
                                            key={s}
                                            className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-center gap-3 text-slate-300 hover:text-white transition-colors border-b border-white/5 last:border-0"
                                            onClick={() => handleSelectDestination(s)}
                                        >
                                            <MapPin className="h-4 w-4 text-cyan-500" />
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Button size="lg" className="rounded-full bg-cyan-600 hover:bg-cyan-500 border-0 px-8 font-bold shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-all hover:scale-105" onClick={() => handleSelectDestination(searchQuery)}>
                            Let's Go 🚀
                        </Button>
                    </div>
                </div>
            </div>

            {/* Enhanced Trip Sections with Branding */}
            <div className="space-y-0 pb-0 bg-slate-950">

                <div className="py-20 border-b border-white/5">
                    {/* Recommended Section */}
                    <TripSection
                        title="Curated For You"
                        subtitle="Handpicked destinations based on current trends."
                        trips={trips}
                        onTripClick={navigateToTripDetail}
                        dark
                    />
                </div>

                <WhyChooseUs />

                <div className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
                    {/* Spiritual Journeys */}
                    <TripSection
                        title="Spiritual Journeys 🕉️"
                        subtitle="Rediscover peace and find your inner self."
                        trips={trips.filter(t => t.category === 'Spiritual')}
                        onTripClick={navigateToTripDetail}
                        dark
                    />
                </div>

                <VerifiedBadge />

                <div className="py-20 bg-slate-950">
                    {/* Adventure Sports (New Section) */}
                    <TripSection
                        title="Adventure Sports 🪂"
                        subtitle="Get your adrenaline pumping with our extreme sports collection."
                        trips={trips.filter(t => t.category === 'Adventure Sports' || t.title.includes('Skydiving') || t.title.includes('Scuba'))}
                        onTripClick={navigateToTripDetail}
                        dark
                    />
                </div>

                <Testimonials />

                <div className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/5">
                    {/* Budget Friendly */}
                    <TripSection
                        title="Budget Friendly Escapes"
                        subtitle="Adventure doesn't have to break the bank."
                        trips={trips.filter(t => t.price < 30000 && t.category !== 'Adventure Sports')}
                        onTripClick={navigateToTripDetail}
                        dark
                    />
                </div>

                <SupportBanner />

                <div className="py-20 bg-slate-950">
                    {/* International Gems (New Section) */}
                    <TripSection
                        title="International Gems 🌏"
                        subtitle="Explore the world beyond borders."
                        trips={trips.filter(t => t.category === 'International')}
                        onTripClick={navigateToTripDetail}
                        dark
                    />
                </div>

                <div className="py-20 bg-slate-950">
                    {/* Luxury Collections */}
                    <TripSection
                        title="Luxury Collections"
                        subtitle="Indulge in the finest experiences the world has to offer."
                        trips={trips.filter(t => t.price > 50000)}
                        onTripClick={navigateToTripDetail}
                        dark
                    />
                </div>

            </div>

            {/* Rich Footer */}
            <footer className="bg-black text-slate-400 py-20 border-t border-white/10">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-3xl font-bold text-white tracking-tighter">
                            <Plane className="h-8 w-8 text-cyan-400" /> Travelzy
                        </div>
                        <p className="text-sm leading-relaxed text-slate-500">
                            Connecting you with the world's best travel designers. Experience the extraordinary with curated journeys.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-600 transition-colors cursor-pointer text-white hover:scale-110 transition-transform">𝕏</div>
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer text-white hover:scale-110 transition-transform">📸</div>
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-white hover:scale-110 transition-transform">in</div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">About Us</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Careers</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Press</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Blog</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Help Center</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Safety Information</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Cancellation Options</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Report a Concern</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Newsletter</h4>
                        <p className="text-sm text-slate-500 mb-6">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500 h-12" />
                            <Button size="icon" className="h-12 w-12 bg-cyan-600 hover:bg-cyan-500 text-white shrink-0 rounded-lg">
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-xs text-slate-600 flex justify-between items-center">
                    <p>© 2024 Travelzy Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
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
    dark?: boolean;
}

const TripSection = ({ title, subtitle, trips, bgClass = '', onTripClick, dark }: TripSectionProps) => {
    if (trips.length === 0) return null;
    return (
        <section className={`py-16 ${bgClass} ${dark ? 'text-white' : ''}`}>
            <div className="container mx-auto px-6 mb-8 flex items-end justify-between">
                <div>
                    <div className="h-1 w-20 bg-cyan-500 mb-4 rounded-full" />
                    <h2 className={`text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r mb-4 tracking-tight ${dark ? 'from-white to-slate-400' : 'from-slate-900 to-slate-600'}`}>{title}</h2>
                    <p className={`font-medium text-lg max-w-2xl ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>
                </div>
                <Button variant="ghost" className={`font-bold tracking-wide group rounded-full px-6 ${dark ? 'text-cyan-400 hover:text-cyan-300 hover:bg-white/10' : 'text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50'}`}>
                    View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            {/* Embla Carousel Slider */}
            <div className="container mx-auto px-6">
                <TripSlider trips={trips} onTripClick={onTripClick} />
            </div>
        </section>
    );
};
