import React from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { MessageSquare, Mail } from 'lucide-react';
import { Input } from '../ui/input';

export const SupportPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="pl-64">
                <header className="bg-white border-b border-gray-100 px-8 py-6">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Agency Support</h1>
                    <p className="text-gray-500">We're here to help you grow your business.</p>
                </header>

                <main className="p-8 max-w-4xl space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Live Chat</CardTitle>
                                <CardDescription>Connect with our support team instantly.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Start Chat</Button>
                                <p className="text-xs text-center mt-2 text-muted-foreground">Avg. wait time: 2 mins</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Email Support</CardTitle>
                                <CardDescription>Send us your detailed queries.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">support@travelzy.com</Button>
                                <p className="text-xs text-center mt-2 text-muted-foreground">Response within 24 hours</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Create Support Ticket</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Topic</label>
                                    <Input placeholder="e.g., Booking Cancellation Issue" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Priority</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                        <option>Critical</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus:ring-1 focus:ring-primary" placeholder="Describe your issue..." />
                            </div>
                            <Button>Submit Ticket</Button>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
};
