import React from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"; // Corrected import path

export const FinancialManagement: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="pl-64">
                <header className="bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Financial Overview</h1>
                        <p className="text-gray-500">Track earnings, payouts, and expenses.</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Export Report
                    </Button>
                </header>

                <main className="p-8 space-y-8">
                    {/* Financial Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-gray-900 text-white border-none shadow-xl">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">Total Earnings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">₹12,45,000</div>
                                <div className="flex items-center gap-2 mt-2 text-sm text-green-400">
                                    <TrendingUp className="h-4 w-4" /> +15% this month
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">Pending Payout</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">₹45,200</div>
                                <div className="mt-2 text-sm text-gray-500">Scheduled for Friday</div>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">Next Payout Date</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">Oct 28</div>
                                <Button size="sm" variant="link" className="px-0">Manage Settings</Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Transaction History */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-mono text-xs">TXN-{1000 + i}</TableCell>
                                            <TableCell>Oct {10 + i}, 2025</TableCell>
                                            <TableCell>Payout for Trip #BK{120 + i}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Completed</span>
                                            </TableCell>
                                            <TableCell className="text-right font-bold">₹12,000</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
};

function TrendingUp({ className }: { className?: string }) {
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
}
