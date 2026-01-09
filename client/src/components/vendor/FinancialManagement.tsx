import React from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, TrendingUp, Wallet, ArrowUpRight, DollarSign, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from '../ui/badge';

export const FinancialManagement: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="pl-64 transition-all duration-300">
                <main className="p-8 max-w-[1600px] mx-auto min-h-screen">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Overview</h1>
                            <p className="text-slate-500 mt-1">Track earnings, payouts, and business growth.</p>
                        </div>
                        <Button variant="outline" className="gap-2 border-slate-200 text-slate-700 hover:bg-white hover:text-blue-600 rounded-xl">
                            <Download className="h-4 w-4" /> Download Report
                        </Button>
                    </header>

                    {/* Financial Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="bg-slate-900 text-white border-none shadow-xl shadow-slate-900/20 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <DollarSign className="h-32 w-32 -mr-8 -mt-8 text-white" />
                            </div>
                            <CardHeader className="pb-2 relative z-10">
                                <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Earnings</CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="text-4xl font-black tracking-tight">₹12,45,000</div>
                                <div className="flex items-center gap-2 mt-4 text-sm font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg w-fit">
                                    <TrendingUp className="h-4 w-4" /> +15% this month
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow bg-white">
                            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending Payout</CardTitle>
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <Wallet className="h-5 w-5 text-amber-500" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-black text-slate-900 tracking-tight">₹45,200</div>
                                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-lg w-fit">
                                    <Calendar className="h-4 w-4 text-slate-400" /> Scheduled for Friday
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold text-blue-100 uppercase tracking-wider">Growth Insights</CardTitle>
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <ArrowUpRight className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-medium leading-relaxed mb-4">You're earning <span className="font-bold text-white bg-white/20 px-1 rounded">24% more</span> than vendors in your category.</div>
                                <Button size="sm" variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 border-0 font-bold w-full rounded-lg">
                                    View Full Analysis
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Revenue Chart Placeholder using CSS Bars */}
                        <Card className="lg:col-span-2 border-none shadow-xl shadow-gray-200/50 bg-white rounded-2xl">
                            <CardHeader className="border-b border-gray-100 px-6 py-5">
                                <CardTitle className="font-bold text-slate-800">Revenue Trends</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="h-64 flex items-end justify-between gap-2 md:gap-4">
                                    {[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 85, 95].map((height, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                                            <div
                                                className="w-full bg-blue-100 rounded-t-lg transition-all duration-500 hover:bg-blue-600 relative group-hover:shadow-lg shadow-blue-500/30"
                                                style={{ height: `${height}%` }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {height}%
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600 truncate w-full text-center">
                                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Transaction History */}
                        <Card className="border-none shadow-xl shadow-gray-200/50 bg-white rounded-2xl overflow-hidden flex flex-col">
                            <CardHeader className="border-b border-gray-100 bg-slate-50/50 px-6 py-5 flex flex-row items-center justify-between">
                                <CardTitle className="font-bold text-slate-800">Recent Transactions</CardTitle>
                                <Button variant="link" className="text-blue-600 font-bold text-xs">View All</Button>
                            </CardHeader>
                            <CardContent className="p-0 flex-1 overflow-auto">
                                <div className="divide-y divide-gray-50">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center">
                                                    <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm">Payout for Trip #BK{120 + i}</p>
                                                    <p className="text-xs text-slate-500 font-medium mt-0.5">Oct {10 + i}, 2025 • 4:3{i} PM</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-slate-900">₹{12000 + i * 500}</p>
                                                <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200 text-[10px] px-1.5 py-0 h-5">Completed</Badge>
                                            </div>
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
