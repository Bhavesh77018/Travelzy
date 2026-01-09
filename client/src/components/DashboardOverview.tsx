import React from 'react';
import { Sidebar } from './vendor/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, DollarSign, Users, Activity, MessageCircle, ArrowRight, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';

export const DashboardOverview: React.FC = () => {
    const { bookings, trips, navigateToVendorMessages, navigateToVendorMarketing } = useAppState();

    const totalRevenue = bookings.filter(b => b.status === 'CONFIRMED').reduce((acc, curr) => acc + curr.total, 0);
    const totalBookings = bookings.length;
    const activeTrips = trips.length;
    const unreadMessages = 3; // Placeholder

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="pl-64 transition-all duration-300">
                {/* Header */}
                <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-white/80 border-b border-gray-200/50 px-8 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                        <p className="text-slate-500 font-medium">Welcome back! Here's what's happening with your business today.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm border border-blue-100">
                            <TrendingUp className="h-4 w-4" />
                            <span>Revenue up 20%</span>
                        </div>
                        <Button onClick={navigateToVendorMarketing} className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl shadow-lg shadow-slate-900/10">
                            Boost Sales
                        </Button>
                    </div>
                </header>

                <main className="p-8 space-y-8 max-w-[1600px] mx-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="relative overflow-hidden border-none shadow-xl shadow-blue-500/10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white group cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <DollarSign className="h-24 w-24 -mr-4 -mt-4 text-white" />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                                <CardTitle className="text-sm font-medium text-blue-100">Total Revenue</CardTitle>
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <DollarSign className="h-4 w-4 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="text-3xl font-black tracking-tight">₹{totalRevenue.toLocaleString()}</div>
                                <p className="text-xs text-blue-100 mt-2 font-medium flex items-center gap-1">
                                    <span className="bg-white/20 px-1.5 py-0.5 rounded text-white flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3" /> +20.1%
                                    </span>
                                    from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="relative overflow-hidden border-none shadow-xl shadow-purple-500/10 bg-white group cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Calendar className="h-24 w-24 -mr-4 -mt-4 text-purple-600" />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">Total Bookings</CardTitle>
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <Calendar className="h-4 w-4 text-purple-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-slate-900 tracking-tight">{totalBookings}</div>
                                <p className="text-xs text-slate-400 mt-2 font-medium flex items-center gap-1">
                                    <span className="text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded flex items-center gap-1 font-bold">
                                        +12
                                    </span>
                                    this week
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="relative overflow-hidden border-none shadow-xl shadow-amber-500/10 bg-white group cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Activity className="h-24 w-24 -mr-4 -mt-4 text-amber-600" />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">Active Trips</CardTitle>
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <Activity className="h-4 w-4 text-amber-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-slate-900 tracking-tight">{activeTrips}</div>
                                <p className="text-xs text-slate-400 mt-2 font-medium">
                                    Live and ready for booking
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="relative overflow-hidden border-none shadow-xl shadow-emerald-500/10 bg-white group cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Star className="h-24 w-24 -mr-4 -mt-4 text-emerald-600" />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">Avg. Rating</CardTitle>
                                <div className="p-2 bg-emerald-50 rounded-lg">
                                    <Users className="h-4 w-4 text-emerald-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-slate-900 tracking-tight">4.9</div>
                                <p className="text-xs text-slate-400 mt-2 font-medium flex items-center gap-1">
                                    Based on 128 verified reviews
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Messages Banner */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-cyan-900 to-blue-900 rounded-3xl p-8 text-white shadow-2xl shadow-blue-900/20">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 bg-blue-500 rounded-full h-64 w-64 blur-3xl opacity-20"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="h-16 w-16 bg-white/10 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                                    <MessageCircle className="h-8 w-8 text-cyan-300" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold tracking-tight">You have {unreadMessages} unread inquiries</h3>
                                    <p className="text-blue-200 font-medium">Responding quickly increases booking chances by 40%.</p>
                                </div>
                            </div>
                            <Button onClick={navigateToVendorMessages} className="bg-white text-blue-900 hover:bg-blue-50 border-0 font-bold h-12 px-8 rounded-xl shadow-lg transition-transform hover:scale-105">
                                View Messages <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Highlights / Chart */}
                        <Card className="lg:col-span-2 border-none shadow-xl shadow-gray-200/50 bg-white rounded-3xl overflow-hidden">
                            <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-bold text-slate-800">Revenue Analytics</CardTitle>
                                <Button variant="ghost" size="sm" className="text-blue-600 font-semibold hover:bg-blue-50">View Report</Button>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="h-[320px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center flex-col gap-3 group hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer">
                                    <div className="p-4 bg-white rounded-full shadow-sm">
                                        <TrendingUp className="h-6 w-6 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <p className="text-slate-400 font-medium group-hover:text-blue-600 transition-colors">Visualization Loading...</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="border-none shadow-xl shadow-gray-200/50 bg-white rounded-3xl overflow-hidden">
                            <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-bold text-slate-800">Recent Activity</CardTitle>
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">See All</Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-50">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm
                                                ${i % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {i % 2 === 0 ? 'BK' : 'TR'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                                                    {i % 2 === 0 ? `New Booking #BK-2024-${800 + i}` : `Trip "Bali Escape" Approved`}
                                                </p>
                                                <p className="text-xs text-slate-500 font-medium mt-0.5">{i} hour{i > 1 ? 's' : ''} ago</p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};
