import React from 'react';
import { Sidebar } from './Sidebar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { useAppState } from '../../hooks/useAppState';

export const ProfileManagement: React.FC = () => {
    const { vendorUser } = useAppState();

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="pl-64">
                <header className="bg-white border-b border-gray-100 px-8 py-6">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Agency Profile</h1>
                    <p className="text-gray-500">Manage your business details and settings.</p>
                </header>

                <main className="p-8 max-w-4xl">
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Business Information</CardTitle>
                            <CardDescription>Public details visible to travelers.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Agency Name</label>
                                    <Input defaultValue={vendorUser?.businessName || "My Agency"} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Contact Email</label>
                                    <Input defaultValue={vendorUser?.email || "email@agency.com"} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Bio / Description</label>
                                <textarea className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue="We are a premium travel agency specializing in Himalayan adventures." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Website</label>
                                    <Input placeholder="https://" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input placeholder="+91" />
                                </div>
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
};
