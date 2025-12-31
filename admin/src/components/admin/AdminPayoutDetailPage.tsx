import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, ArrowLeft, CreditCard, Calendar, User } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { toast } from 'sonner';

export const AdminPayoutDetailPage: React.FC = () => {
    const {
        selectedDetailId,
        navigateToAdminPayouts
    } = useAppState();

    // Mock payout data retrieval since it's not in global state yet
    const payout = {
        id: selectedDetailId || 'PO-001',
        vendor: 'Global Travels',
        amount: 45000,
        date: '2024-04-10',
        status: 'PENDING',
        method: 'Bank Transfer',
        account: '**** **** **** 1234',
        ifsc: 'HDFC0001234'
    };

    const handleApprove = () => {
        toast.success(`Payout ${payout.id} processed successfully.`);
        navigateToAdminPayouts();
    };

    const handleReject = () => {
        toast.error(`Payout ${payout.id} rejected.`);
        navigateToAdminPayouts();
    };

    return (
        <div className="min-h-screen bg-muted/30 flex">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={navigateToAdminPayouts}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Payout #{payout.id}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Requested on {payout.date}</span>
                            </div>
                        </div>
                        <div className="ml-auto">
                            <Badge className={`text-sm px-3 py-1 ${payout.status === 'PAID' ? 'bg-green-100 text-green-700' : payout.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {payout.status}
                            </Badge>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Transfer Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Vendor Name</label>
                                    <div className="flex items-center gap-2 mt-1 font-medium">
                                        <User className="h-4 w-4" /> {payout.vendor}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Amount</label>
                                    <div className="text-2xl font-bold mt-1">₹{payout.amount.toLocaleString()}</div>
                                </div>
                                <div className="col-span-2 border-t pt-4">
                                    <label className="text-sm font-medium text-muted-foreground">Bank Account Details</label>
                                    <div className="flex items-center gap-2 mt-2 p-3 bg-muted rounded-md">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                        <div className="space-y-0.5">
                                            <p className="font-mono text-sm">{payout.account}</p>
                                            <p className="text-xs text-muted-foreground">IFSC: {payout.ifsc} • {payout.method}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4">
                        <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleApprove}>
                            <CheckCircle className="mr-2 h-4 w-4" /> Confirm Transfer
                        </Button>
                        <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleReject}>
                            <XCircle className="mr-2 h-4 w-4" /> Reject Request
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
