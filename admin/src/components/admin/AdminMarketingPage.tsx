import React, { useState, useEffect } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { AdminService } from '../../services/AdminService';
import { AdminSidebar } from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';

export const AdminMarketingPage: React.FC = () => {
    // In a real app, we'd get the token from auth context
    const token = "mock-admin-token";
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCampaigns = async () => {
            try {
                // In production, use real token
                // const data = await AdminService.getAllCampaigns(token);
                // For now, if no campaigns are returned (because no backend running/connected properly in this env), show empty or mock
                const data = await AdminService.getAllCampaigns(token).catch(() => []);
                setCampaigns(data);
            } catch (error) {
                console.error("Failed", error);
            } finally {
                setLoading(false);
            }
        };
        loadCampaigns();
    }, []);

    return (
        <div className="min-h-screen bg-muted/30 flex">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Marketing Overview</h1>
                            <p className="text-muted-foreground">Monitor all vendor campaigns and performance.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stats Cards */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Campaigns</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{campaigns.length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {campaigns.filter(c => c.status === 'ACTIVE').length}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue (Ads)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">
                                    ₹{campaigns.reduce((acc, curr) => acc + (curr.budget || 0), 0).toLocaleString()}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <div className="p-6">
                            <h3 className="font-semibold text-lg mb-4">Recent Campaigns</h3>
                            {loading ? <p>Loading...</p> : (
                                <div className="space-y-4">
                                    {campaigns.length === 0 ? <p className="text-muted-foreground">No campaigns found.</p> : campaigns.map(camp => (
                                        <div key={camp._id || Math.random()} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <div className="font-medium">{camp.title}</div>
                                                <div className="text-sm text-muted-foreground">by {camp.vendorId?.businessName || 'Vendor'} • {camp.type}</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge variant={camp.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                                    {camp.status}
                                                </Badge>
                                                <div className="text-right text-sm">
                                                    <div className="font-bold">₹{camp.budget}</div>
                                                    <div className="text-muted-foreground">{camp.stats?.clicks || 0} clicks</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
