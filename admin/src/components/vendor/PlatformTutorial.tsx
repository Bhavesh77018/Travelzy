import React from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { PlayCircle, Award, FileText, CheckCircle } from 'lucide-react';

export const PlatformTutorial: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="pl-64">
                <header className="bg-white border-b border-gray-100 px-8 py-6">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Platform Tutorial</h1>
                    <p className="text-gray-500">Learn how to maximize your agency's success on Travelzy.</p>
                </header>

                <main className="p-8 max-w-5xl space-y-8">
                    {/* Progress */}
                    <Card className="bg-primary/5 border-primary/20 shadow-none">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center border-4 border-primary text-primary font-bold text-xl shadow-lg">
                                    35%
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary">Getting Started</h3>
                                    <p className="text-muted-foreground">Level 1 - Novice</p>
                                </div>
                            </div>
                            <Button className="gap-2">
                                Resume Learning <PlayCircle className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                                    <PlayCircle className="h-5 w-5" /> Creating your first Trip
                                </CardTitle>
                                <CardDescription>Video • 5 mins</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                    <PlayCircle className="h-12 w-12 text-gray-400" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                                    <CheckCircle className="h-5 w-5 text-green-500" /> Managing Bookings
                                </CardTitle>
                                <CardDescription>Guide • Completed</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-green-50 rounded-lg flex items-center justify-center">
                                    <Award className="h-12 w-12 text-green-600" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                                    <FileText className="h-5 w-5" /> Understanding Analytics
                                </CardTitle>
                                <CardDescription>Article • 3 mins read</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-500 text-sm">
                                    Learn how to interpret your dashboard metrics to optimize pricing and increase bookings.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};
