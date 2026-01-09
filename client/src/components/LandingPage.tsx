import React from 'react';
import { useAppState } from '../hooks/useAppState';
import { Button } from './ui/button';
import { Users, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2, Globe, BarChart3, Zap } from 'lucide-react';
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
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 rounded-lg">
                            <Globe className="h-5 w-5 text-white" />
                        </div>
                        Travelzy<span className="text-blue-600">Partner</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="font-semibold text-slate-600 hover:text-slate-900 hidden md:flex" onClick={navigateToCustomerHome}>For Travelers</Button>
                        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
                        <Button variant="ghost" className="font-bold text-slate-900 hover:bg-slate-100" onClick={handleLogin}>Log In</Button>
                        <Button onClick={handleGetStarted} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 font-bold shadow-lg shadow-slate-900/20">
                            Start Selling
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent"></div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wide mb-8 shadow-sm hover:scale-105 transition-transform cursor-default">
                        <CheckCircle2 className="h-4 w-4" /> 0% Commission Forever
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
                        Scale your travel agency.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Keep 100% of the profits.</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        The all-in-one platform to manage trips, bookings, and marketing. Connect with millions of verified travelers and grow your business effortlessly.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-600/30 transition-all hover:scale-105 border-t border-white/20" onClick={handleGetStarted}>
                            Join Now - It's Free <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 font-bold bg-transparent" onClick={handleLogin}>
                            Vendor Login
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 pt-12">
                        {[
                            { label: 'Active Vendors', value: '2,000+' },
                            { label: 'Monthly Bookings', value: '15k+' },
                            { label: 'Travelers Reach', value: '1M+' },
                            { label: 'Platform Fee', value: '0%' }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-white py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-black text-slate-900 mb-4">Everything you need to grow</h2>
                        <p className="text-lg text-slate-500">Powerful tools built specifically for modern travel agencies and independent tour operators.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-none shadow-xl shadow-blue-900/5 bg-slate-50 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                                <TrendingUp className="h-32 w-32 -mr-8 -mt-8 text-blue-600" />
                            </div>
                            <CardContent className="p-8 relative z-10">
                                <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm border border-blue-50">
                                    <Zap className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">Marketing Suite</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    Boost your visibility with our built-in credit system. Run email campaigns and get featured spots on the homepage.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-xl shadow-blue-900/5 bg-slate-50 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                                <ShieldCheck className="h-32 w-32 -mr-8 -mt-8 text-purple-600" />
                            </div>
                            <CardContent className="p-8 relative z-10">
                                <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm border border-purple-50">
                                    <ShieldCheck className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">Verified Trust</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    Earn the "Verified Vendor" badge and build instant credibility. Travelers trust verified partners 3x more.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-xl shadow-blue-900/5 bg-slate-50 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                                <BarChart3 className="h-32 w-32 -mr-8 -mt-8 text-emerald-600" />
                            </div>
                            <CardContent className="p-8 relative z-10">
                                <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm border border-emerald-50">
                                    <BarChart3 className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">Smart Analytics</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    Track revenue, customer growth, and booking trends in real-time with our advanced financial dashboard.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-slate-900 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full h-96 w-96 blur-[120px] opacity-20"></div>

                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Ready to scale your business?</h2>
                    <p className="text-xl text-slate-400 mb-10">Join 2,000+ top-rated agencies growing with Travelzy.</p>
                    <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-white text-slate-900 hover:bg-blue-50 font-bold shadow-2xl transition-transform hover:scale-105" onClick={handleGetStarted}>
                        Create Free Account
                    </Button>
                    <p className="mt-6 text-sm text-slate-500 font-medium">No credit card required • Cancel anytime</p>
                </div>
            </section>
        </div>
    );
};
