import React from 'react';
import { useAppState } from '../hooks/useAppState';
import { Button } from './ui/button';
import { Users, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export const VendorLanding: React.FC = () => {
    const { navigateToVendorSignup, navigateToVendorLogin, navigateToCustomerHome } = useAppState();
    const handleGetStarted = () => {
        navigateToVendorSignup();
    };

    const handleLogin = () => {
        navigateToVendorLogin();
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <nav className="border-b px-6 py-4 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="font-black text-2xl tracking-tighter text-gray-900">
                    Travelzy<span className="text-primary">Partner</span>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" onClick={navigateToCustomerHome}>For Travelers</Button>
                    <Button variant="outline" onClick={handleLogin}>Login</Button>
                    <Button onClick={handleGetStarted}>Get Started</Button>
                </div>
            </nav>

            {/* Hero */}
            <section className="py-20 px-6 text-center max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-8 animate-fade-in">
                    <CheckCircle2 className="h-4 w-4" /> 0% Commission Forever
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight leading-none mb-8">
                    Grow Your Agency.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Keep 100% Profit.</span>
                </h1>
                <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                    Manage trips, bookings, and marketing in one place. Connect with verified travelers instantly.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full" onClick={handleGetStarted}>
                        Join Now - It's Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="container mx-auto grid md:grid-cols-3 gap-8">
                    <Card className="border-none shadow-lg hover:-translate-y-2 transition-transform duration-300">
                        <CardContent className="p-8">
                            <div className="h-14 w-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                <TrendingUp className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Free Marketing Tools</h3>
                            <p className="text-gray-500">
                                Use our credit system to promote your trips via email and social media for free.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg hover:-translate-y-2 transition-transform duration-300">
                        <CardContent className="p-8">
                            <div className="h-14 w-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                                <ShieldCheck className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Verified Trust</h3>
                            <p className="text-gray-500">
                                Get the "Verified Badge" and build instant trust with millions of travelers.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg hover:-translate-y-2 transition-transform duration-300">
                        <CardContent className="p-8">
                            <div className="h-14 w-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                                <Users className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">CRM Included</h3>
                            <p className="text-gray-500">
                                Manage customer data, history, and communication without third-party tools.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};
