import React from 'react';
import { Sidebar } from './vendor/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, DollarSign, Users, Activity } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';

export const DashboardOverview: React.FC = () => {
    const { bookings, trips } = useAppState();

    const totalRevenue = bookings.filter(b => b.status === 'CONFIRMED').reduce((acc, curr) => acc + curr.total, 0);
    const totalBookings = bookings.length;
    const activeTrips = trips.length;

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="pl-64">
                <header className="bg-white border-b border-gray-100 px-8 py-6">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
                </header>

                <main className="p-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="border-none shadow-lg shadow-blue-500/5 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-blue-100">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-blue-100" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                                <p className="text-xs text-blue-100 mt-1">+20.1% from last month</p>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-lg shadow-purple-500/5 bg-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
                                <Calendar className="h-4 w-4 text-purple-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">{totalBookings}</div>
                                <p className="text-xs text-gray-400 mt-1">+12 this week</p>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-lg shadow-amber-500/5 bg-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">Active Trips</CardTitle>
                                <Activity className="h-4 w-4 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">{activeTrips}</div>
                                <p className="text-xs text-gray-400 mt-1">Ready for booking</p>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-lg shadow-green-500/5 bg-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">Avg. Rating</CardTitle>
                                <Users className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">4.9</div>
                                <p className="text-xs text-gray-400 mt-1">Based on 128 reviews</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Chart Section Placeholder */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Revenue Analytics</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px] flex items-center justify-center bg-gray-50 rounded-xl m-4 border border-dashed">
                                <p className="text-gray-400">Chart Visualization Placeholder</p>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">BK</div>
                                            <div>
                                                <p className="font-bold text-sm">New Booking #BK123{i}</p>
                                                <p className="text-xs text-gray-500">2 minutes ago</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="text-primary">View</Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};
