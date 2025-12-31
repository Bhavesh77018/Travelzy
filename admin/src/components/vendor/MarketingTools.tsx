import React from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Mail, Share2, TrendingUp, Zap } from 'lucide-react';

export const MarketingTools: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="pl-64">
                <header className="bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Marketing Center</h1>
                        <p className="text-gray-500">Promote your trips and reach more travelers.</p>
                    </div>
                    <div className="bg-gradient-to-r from-amber-200 to-yellow-400 px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-amber-500/20">
                        <Zap className="h-5 w-5 text-amber-700" />
                        <span className="text-amber-900">1,250 Credits Available</span>
                    </div>
                </header>

                <main className="p-8 space-y-8">
                    {/* Campaigns Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                            <CardHeader>
                                <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <CardTitle>Email Campaigns</CardTitle>
                                <CardDescription>Send newsletters to your customer base.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm font-medium text-gray-500 mb-4">Cost: 50 Credits</div>
                                <Button className="w-full">Create Campaign</Button>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                            <CardHeader>
                                <div className="h-12 w-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                                    <Share2 className="h-6 w-6" />
                                </div>
                                <CardTitle>Social Boost</CardTitle>
                                <CardDescription>Auto-post to Facebook and Instagram.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm font-medium text-gray-500 mb-4">Cost: 25 Credits</div>
                                <Button className="w-full" variant="secondary">Boost Post</Button>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                            <CardHeader>
                                <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <CardTitle>Homepage Spotlight</CardTitle>
                                <CardDescription>Get featured on the main landing page.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm font-medium text-gray-500 mb-4">Cost: 200 Credits/Day</div>
                                <Button className="w-full" variant="outline">Promote Now</Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Analytics Preview */}
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle>Campaign Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-green-100 p-2 rounded-lg text-green-600 font-bold">ACTIVE</div>
                                        <div>
                                            <div className="font-bold">Monsoon Special 2025</div>
                                            <div className="text-xs text-gray-500">Email Campaign • Started 2 days ago</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">24%</div>
                                        <div className="text-xs text-gray-500">Open Rate</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl opacity-60">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gray-200 p-2 rounded-lg text-gray-600 font-bold">ENDED</div>
                                        <div>
                                            <div className="font-bold">Summer Early Bird</div>
                                            <div className="text-xs text-gray-500">Social Boost • Ended 1 week ago</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">1.2k</div>
                                        <div className="text-xs text-gray-500">Clicks</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
};
