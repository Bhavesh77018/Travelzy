import React, { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from '../ui/badge';
import { DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner';

// Mock Payout Data (In a real app, this would come from the backend/context)
const MOCK_PAYOUTS = [
    { id: 'PO-001', vendor: 'Global Travels', amount: 45000, date: '2024-04-10', status: 'PENDING', method: 'Bank Transfer' },
    { id: 'PO-002', vendor: 'Himalayan Adventures', amount: 12000, date: '2024-04-08', status: 'PAID', method: 'UPI' },
    { id: 'PO-003', vendor: 'Goa Vibez', amount: 28500, date: '2024-04-12', status: 'PENDING', method: 'Bank Transfer' },
    { id: 'PO-004', vendor: 'Urban Trips', amount: 8500, date: '2024-04-05', status: 'REJECTED', method: 'Bank Transfer' },
];

export const AdminPayoutsPage: React.FC = () => {
    const { navigateToPayoutDetail } = useAppState();
    // In a real app we would fetch payouts from useAppState()
    const [payouts, setPayouts] = useState(MOCK_PAYOUTS);

    const handleProcessPayout = (id: string) => {
        setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'PAID' } : p));
        toast.success(`Payout ${id} processed successfully.`);
    };

    const handleRejectPayout = (id: string) => {
        setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'REJECTED' } : p));
        toast.error(`Payout ${id} rejected.`);
    };

    const totalPending = payouts.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="min-h-screen bg-muted/30 flex">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Financial Payouts</h1>
                            <p className="text-muted-foreground">Manage vendor withdrawals and platform commissions.</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{totalPending.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">
                                    Total amount requested by vendors
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Processed (This Month)</CardTitle>
                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹1,45,000</div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹82,500</div>
                                <p className="text-xs text-muted-foreground">
                                    Commission earnings
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Payout ID</TableHead>
                                    <TableHead>Vendor</TableHead>
                                    <TableHead>Date Requested</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payouts.map((payout) => (
                                    <TableRow key={payout.id}>
                                        <TableCell className="font-medium">{payout.id}</TableCell>
                                        <TableCell>{payout.vendor}</TableCell>
                                        <TableCell>{payout.date}</TableCell>
                                        <TableCell>{payout.method}</TableCell>
                                        <TableCell>₹{payout.amount.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={payout.status === 'PAID' ? 'default' : payout.status === 'REJECTED' ? 'destructive' : 'secondary'} className={payout.status === 'PAID' ? 'bg-green-600' : payout.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : ''}>
                                                {payout.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {payout.status === 'PENDING' ? (
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="ghost" onClick={() => navigateToPayoutDetail(payout.id)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleProcessPayout(payout.id)}>
                                                        Approve
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleRejectPayout(payout.id)}>
                                                        Reject
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="ghost" onClick={() => navigateToPayoutDetail(payout.id)}>
                                                        <Eye className="h-4 w-4" /> View
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};
