import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, TrendingUp, Wallet, ArrowUpRight, DollarSign, Calendar, BarChart3, PieChart } from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '../../utils/cn';

export const FinancialManagement: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('year');

    // Enhanced Mock Data for Charts
    const revenueData = [
        { label: 'Jan', value: 35, growth: true },
        { label: 'Feb', value: 45, growth: true },
        { label: 'Mar', value: 30, growth: false },
        { label: 'Apr', value: 60, growth: true },
        { label: 'May', value: 75, growth: true },
        { label: 'Jun', value: 50, growth: false },
        { label: 'Jul', value: 65, growth: true },
        { label: 'Aug', value: 80, growth: true },
        { label: 'Sep', value: 70, growth: false },
        { label: 'Oct', value: 90, growth: true },
        { label: 'Nov', value: 85, growth: false },
        { label: 'Dec', value: 95, growth: true },
    ];

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
                        <div className="flex gap-2">
                            <div className="bg-white border p-1 rounded-xl flex gap-1">
                                {(['week', 'month', 'year'] as const).map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all",
                                            timeRange === range ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
                                        )}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                            <Button variant="outline" className="gap-2 border-slate-200 text-slate-700 hover:bg-white hover:text-blue-600 rounded-xl h-10">
                                <Download className="h-4 w-4" /> Report
                            </Button>
                        </div>
                    </header>

                    {/* Financial Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="bg-slate-900 text-white border-none shadow-xl shadow-slate-900/20 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                <DollarSign className="h-32 w-32 -mr-8 -mt-8 text-white" />
                            </div>
                            <CardHeader className="pb-2 relative z-10">
                                <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Earnings</CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="text-4xl font-black tracking-tight group-hover:scale-105 transition-transform origin-left duration-300">₹12,45,000</div>
                                <div className="flex items-center gap-2 mt-4 text-sm font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg w-fit border border-emerald-400/20">
                                    <TrendingUp className="h-4 w-4" /> +15% this month
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow bg-white group">
                            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending Payout</CardTitle>
                                <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
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

                        <Card className="border-none shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-600 to-indigo-700 text-white group">
                            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold text-blue-100 uppercase tracking-wider">Net Profit</CardTitle>
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                                    <PieChart className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-black tracking-tight">₹11,80,400</div>
                                <div className="mt-4 flex items-center gap-2 text-sm text-blue-100 font-medium bg-white/10 px-3 py-1.5 rounded-lg w-fit border border-white/10">
                                    After commission & tax
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Enhanced Revenue Chart */}
                        <Card className="lg:col-span-2 border-none shadow-xl shadow-gray-200/50 bg-white rounded-3xl overflow-hidden">
                            <CardHeader className="border-b border-gray-100 px-8 py-6 flex flex-row items-center justify-between bg-slate-50/50">
                                <div>
                                    <CardTitle className="font-bold text-slate-800 text-xl">Revenue Trends</CardTitle>
                                    <p className="text-sm text-slate-500 mt-1">Monthly earning performance</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-600 rounded-full"></div> Revenue</div>
                                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-200 rounded-full"></div> Projection</div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="h-72 flex items-end justify-between gap-4">
                                    {revenueData.map((data, i) => (
                                        <div key={i} className="flex flex-col items-center gap-3 flex-1 group cursor-pointer h-full justify-end">
                                            <div className="relative w-full flex items-end justify-center h-full">
                                                {/* Background track */}
                                                <div className="absolute bottom-0 w-full bg-slate-100 rounded-t-lg h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-x-150"></div>

                                                {/* Bar */}
                                                <div
                                                    className={cn(
                                                        "w-full max-w-[40px] rounded-t-lg transition-all duration-700 relative group-hover:shadow-lg group-hover:-translate-y-1",
                                                        data.growth ? "bg-gradient-to-t from-blue-600 to-indigo-500 shadow-blue-500/20" : "bg-gradient-to-t from-slate-400 to-slate-300"
                                                    )}
                                                    style={{ height: `${data.value}%` }}
                                                >
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-xl whitespace-nowrap z-20 pointer-events-none">
                                                        ₹{(data.value * 1200).toLocaleString()}
                                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "text-xs font-bold transition-colors uppercase tracking-wider",
                                                data.growth ? "text-slate-600 group-hover:text-blue-700" : "text-slate-400"
                                            )}>
                                                {data.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Transaction History */}
                        <Card className="border-none shadow-xl shadow-gray-200/50 bg-white rounded-3xl overflow-hidden flex flex-col h-[500px]">
                            <CardHeader className="border-b border-gray-100 bg-slate-50/50 px-6 py-5 flex flex-row items-center justify-between">
                                <CardTitle className="font-bold text-slate-800">History</CardTitle>
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-600">Filters</Button>
                            </CardHeader>
                            <CardContent className="p-0 flex-1 overflow-auto custom-scrollbar">
                                <div className="divide-y divide-gray-50">
                                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "h-10 w-10 rounded-full flex items-center justify-center transition-colors shadow-sm",
                                                    i % 3 === 0 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                                                )}>
                                                    {i % 3 === 0 ? <TrendingUp className="h-5 w-5 rotate-180" /> : <ArrowUpRight className="h-5 w-5" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                                                        {i % 3 === 0 ? 'Monthly Subscription' : `Payout for Trip #BK${120 + i}`}
                                                    </p>
                                                    <p className="text-xs text-slate-500 font-medium mt-0.5">Oct {10 + i}, 2025 • 4:3{i} PM</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={cn(
                                                    "font-black text-sm",
                                                    i % 3 === 0 ? "text-slate-900" : "text-emerald-600"
                                                )}>
                                                    {i % 3 === 0 ? '-' : '+'}₹{12000 + i * 500}
                                                </p>
                                                <Badge variant="secondary" className="mt-1 bg-slate-100 text-slate-500 text-[9px] px-1.5 py-0 h-4 border-none shadow-none">
                                                    {i % 3 === 0 ? 'Debit' : 'Credit'}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                                <Button variant="outline" className="w-full border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600">
                                    View Older Transactions
                                </Button>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};
