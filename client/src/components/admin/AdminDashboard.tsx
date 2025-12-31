import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Users, AlertCircle, TrendingUp } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';

export const AdminDashboard: React.FC = () => {
    const {
        vendors,
        tickets,
    } = useAppState();

    const pendingVerifications = vendors.filter(v => !v.isVerified).length;
    const openTickets = tickets.filter(t => t.status === 'OPEN').length;
    const totalRevenue = vendors.reduce((sum, v) => sum + v.revenue, 0);

    return (
        <div className="min-h-screen bg-muted/30 flex">
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 p-8">
                <h1 className="text-3xl font-bold mb-8">System Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pendingVerifications}</div>
                            <p className="text-xs text-muted-foreground">Vendors awaiting approval</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Open Support Tickets</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{openTickets}</div>
                            <p className="text-xs text-muted-foreground">Requires attention</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">Total processed volume</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions / Recent Activity could go here */}
            </div>
        </div>
    );
};
