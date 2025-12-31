import React from 'react';
import { MapPin, Calendar, ArrowRight, Plane } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

export const CustomerHomePage: React.FC = () => {
    const {
        navigateToTripDetail,
        navigateToCustomerDashboard,
        navigateToDestinations,
        navigateToDeals,
        navigateToAbout,
        navigateToSupport,
        navigateToVendorLanding,
        trips
    } = useAppState();

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
            <section className="relative h-screen w-full overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-900/50 z-10" />

                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 z-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                </div>

                {/* Floating Emojis */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 text-4xl animate-float-random-1">✈️</div>
                    <div className="absolute top-1/3 right-1/4 text-5xl animate-float-random-1" style={{ animationDelay: '2s' }}>🌍</div>
                    <div className="absolute bottom-1/4 left-1/3 text-4xl animate-float-random-1" style={{ animationDelay: '4s' }}>🏖️</div>
                    <div className="absolute top-20 right-20 text-3xl animate-float-random-1" style={{ animationDelay: '1s' }}>🎒</div>
                </div>

                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=900&fit=crop"
                    className="h-full w-full object-cover opacity-60 scale-105 animate-pulse" // Subtle pulse on bg
                    alt="Hero Background"
                />

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center text-white">
                    <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium backdrop-blur-md border-white/20 animate-fade-in text-cyan-300 bg-white/10">
                        ✨ Zero Commission. 100% Experience.
                    </Badge>

                    <h1 className="mb-6 text-6xl font-black md:text-8xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-2xl">
                        TRAVEL<br />MODERN.
                    </h1>

                    <p className="mb-10 text-xl md:text-2xl max-w-2xl text-white/90 font-light tracking-wide">
                        The next-generation marketplace for the modern traveler.
                    </p>

                    {/* Search Bar - Mock */}
                    <div className="flex w-full max-w-4xl flex-col gap-3 rounded-2xl bg-white/10 p-2 backdrop-blur-xl border border-white/20 md:flex-row shadow-2xl hover:scale-[1.01] transition-transform duration-300">
                        <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/90 p-2 text-foreground">
                            <MapPin className="ml-2 h-5 w-5 text-primary" />
                            <Input
                                type="text"
                                placeholder="Where to?"
                                className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-gray-400 text-base"
                            />
                        </div>
                        <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/90 p-2 text-foreground">
                            <Calendar className="ml-2 h-5 w-5 text-primary" />
                            <Input
                                type="date"
                                className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-gray-600 text-base"
                            />
                        </div>
                        <Button
                            onClick={navigateToDestinations}
                            size="lg"
                            className="rounded-xl bg-gradient-to-r from-primary to-cyan-600 px-8 font-bold text-white shadow-lg shadow-cyan-500/20"
                        >
                            Explore <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Marquee */}
                <div className="absolute bottom-0 w-full bg-black/30 backdrop-blur-sm py-4 border-t border-white/10 overflow-hidden z-20">
                    <div className="animate-scroll-left whitespace-nowrap text-white/50 font-mono text-sm uppercase tracking-[0.2em] flex gap-12">
                        <span>Discover • Explore • Adventure</span>
                        <span>• No Hidden Fees • Direct Vendor Connect</span>
                        <span>• Best Price Guarantee</span>
                        <span> Discover • Explore • Adventure</span>
                        <span>• No Hidden Fees • Direct Vendor Connect</span>
                        <span>• Best Price Guarantee</span>
                    </div>
                </div>
            </section>

            {/* Featured Trips */}
            <section className="container mx-auto py-24 px-4">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Trending Now <span className="text-primary">🔥</span></h2>
                        <p className="text-xl text-gray-500">Curated experiences just for you.</p>
                    </div>
                    <Button
                        onClick={navigateToDestinations}
                        variant="ghost"
                        className="hidden md:flex items-center gap-2 font-bold text-primary hover:translate-x-1 hover:bg-transparent p-0"
                    >
                        View All Trips <ArrowRight className="h-5 w-5" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {trips.map((trip) => (
                        <Card
                            key={trip.id}
                            onClick={() => navigateToTripDetail(trip.id)}
                            className="group cursor-pointer relative overflow-hidden rounded-3xl border-0 shadow-none hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-transparent"
                        >
                            {/* Card Image */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                                <ImageWithFallback
                                    src={trip.image}
                                    alt={trip.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Floating Tags */}
                                <div className="absolute top-4 left-4 z-20 flex gap-2">
                                    <Badge variant="secondary" className="backdrop-blur-md bg-white/20 text-white border-white/20 uppercase tracking-wider">
                                        {trip.type}
                                    </Badge>
                                    {trip.rating > 4.5 && (
                                        <Badge className="bg-amber-400 text-black border-amber-300 animate-pulse">
                                            TOP RATED
                                        </Badge>
                                    )}
                                </div>

                                {/* Price Tag */}
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="rounded-xl bg-white px-4 py-2 font-black text-gray-900 shadow-xl">
                                        ₹{trip.price.toLocaleString()}
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                                    <div className="flex items-center gap-2 mb-2 text-primary-200">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm font-medium uppercase tracking-wide">{trip.destination}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">{trip.title}</h3>

                                    <div className="flex items-center justify-between border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                        <div className="flex items-center gap-4 text-sm font-medium">
                                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {trip.duration} Days</span>
                                            <span className="flex items-center gap-1">★ {trip.rating}</span>
                                        </div>
                                        <span className="text-sm font-bold text-primary">Book Now &rarr;</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Recommended Section (Horizontal Scroll) */}
            <section className="container mx-auto py-12 px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Recommended for You 🎯</h2>
                    <Button variant="link" className="text-primary font-bold">See All</Button>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {trips.slice(0, 5).map((trip) => (
                        <div key={trip.id} onClick={() => navigateToTripDetail(trip.id)} className="min-w-[300px] snap-center group cursor-pointer relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all">
                            <div className="h-48 w-full overflow-hidden">
                                <ImageWithFallback src={trip.image} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="p-4 bg-white">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg leading-tight line-clamp-1">{trip.title}</h3>
                                    <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">{trip.category}</Badge>
                                </div>
                                <div className="flex gap-2 text-sm text-gray-500 mb-3">
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {trip.duration} Days</span>
                                    <span className="flex items-center gap-1">★ {trip.rating}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">₹{trip.price.toLocaleString()}</span>
                                    <Button size="sm" variant="outline" className="h-8 rounded-full border-primary text-primary hover:bg-primary hover:text-white">View</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Banner Section */}
            <section className="container mx-auto px-4 py-8">
                <div className="relative rounded-3xl overflow-hidden bg-black h-[300px] flex items-center justify-center text-center">
                    <ImageWithFallback src="https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2070" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="relative z-10 p-6">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Summer Sale is Live! ☀️</h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Get up to 40% off on all beach destinations. Limited time offer.</p>
                        <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 font-bold px-8">Check Offers</Button>
                    </div>
                </div>
            </section>

            {/* Budget vs Luxury Split */}
            <section className="container mx-auto py-16 px-4">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Budget Friendly */}
                    <div>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Budget Friendly 🎒</h2>
                                <p className="text-gray-500">Adventures under ₹50k</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {trips.filter(t => t.price <= 50000).slice(0, 3).map((trip) => (
                                <div key={trip.id} onClick={() => navigateToTripDetail(trip.id)} className="flex gap-4 group cursor-pointer bg-white rounded-xl p-2 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className="h-24 w-24 rounded-lg overflow-hidden shrink-0">
                                        <ImageWithFallback src={trip.image} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{trip.title}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                            <MapPin className="h-3 w-3" /> {trip.destination}
                                        </div>
                                        <div className="flex justify-between items-center mt-3">
                                            <span className="font-bold text-primary">₹{trip.price.toLocaleString()}</span>
                                            <span className="text-xs text-gray-400">{trip.duration} days</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Luxury Escapes */}
                    <div>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Luxury Escapes 💎</h2>
                                <p className="text-gray-500">Premium experiences over ₹80k</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {trips.filter(t => t.price >= 80000).slice(0, 3).map((trip) => (
                                <div key={trip.id} onClick={() => navigateToTripDetail(trip.id)} className="flex gap-4 group cursor-pointer bg-white rounded-xl p-2 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className="h-24 w-24 rounded-lg overflow-hidden shrink-0">
                                        <ImageWithFallback src={trip.image} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{trip.title}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                            <MapPin className="h-3 w-3" /> {trip.destination}
                                        </div>
                                        <div className="flex justify-between items-center mt-3">
                                            <span className="font-bold text-primary">₹{trip.price.toLocaleString()}</span>
                                            <span className="text-xs text-gray-400">{trip.duration} days</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Marketplace Section */}
            <section className="bg-gray-50 py-20 px-4 border-t border-gray-100">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Travel Marketplace 🛍️</h2>
                        <p className="text-gray-500">Everything you need for your trip, in one place.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { title: 'Travel Insurance', icon: '🛡️', color: 'bg-blue-100 text-blue-600', desc: 'Medical & Trip Protection' },
                            { title: 'Visa Assistance', icon: '🛂', color: 'bg-purple-100 text-purple-600', desc: 'Hassle-free Processing' },
                            { title: 'Travel Gear', icon: '🧳', color: 'bg-orange-100 text-orange-600', desc: 'Bags, Adapters & More' },
                            { title: 'Forex Cards', icon: '💳', color: 'bg-green-100 text-green-600', desc: 'Best Exchange Rates' },
                        ].map((item, index) => (
                            <Card key={index} className="border-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
                                <CardContent className="p-6 text-center">
                                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl ${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="bg-white py-20 border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Why Travelzy?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-8 border-none shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">💰</div>
                            <h3 className="text-xl font-bold mb-3">0% Commission</h3>
                            <p className="text-gray-500">We don't charge agencies, so you get the best price directly.</p>
                        </Card>
                        <Card className="p-8 border-none shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">🛡️</div>
                            <h3 className="text-xl font-bold mb-3">Verified Vendors</h3>
                            <p className="text-gray-500">All agencies are verified for safety and quality service.</p>
                        </Card>
                        <Card className="p-8 border-none shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">⚡</div>
                            <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
                            <p className="text-gray-500">Real-time availability and instant confirmation protocols.</p>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};
