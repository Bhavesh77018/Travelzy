import React from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, HelpCircle, FileText, MessageCircle, Phone, Mail, ChevronRight, PlayCircle } from 'lucide-react';
import { useAppState } from '../../hooks/useAppState';

export const SupportPage: React.FC = () => {
    const { navigateToVendorTutorial } = useAppState();

    const FAQs = [
        { q: "How do I get paid?", a: "Payouts are processed weekly on Fridays directly to your registered bank account." },
        { q: "Can I cancel a confirmed booking?", a: "Yes, but cancellation fees may apply depending on the timing. Check the policy page." },
        { q: "How can I promote my trips?", a: "Use the Marketing tab to purchase credits and boost your trips to the homepage." },
        { q: "What are the image requirements?", a: "We recommend landscape images with at least 1920x1080 resolution for best display." }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="pl-64 transition-all duration-300">
                <main className="p-8 max-w-[1200px] mx-auto min-h-screen">
                    <header className="mb-10 text-center max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full font-bold text-sm mb-6">
                            <HelpCircle className="h-4 w-4" /> Support Center
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">How can we help you today?</h1>
                        <div className="relative max-w-lg mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                                className="pl-12 h-14 rounded-2xl border-slate-200 text-lg shadow-sm focus:ring-4 focus:ring-blue-100 transition-all"
                                placeholder="Search for articles, guides..."
                            />
                        </div>
                    </header>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card className="border-none shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all cursor-pointer group">
                            <CardHeader>
                                <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <CardTitle className="font-bold">Documentation</CardTitle>
                                <CardDescription>Detailed guides on platform features and policies.</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-none shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all cursor-pointer group" onClick={navigateToVendorTutorial}>
                            <CardHeader>
                                <div className="h-12 w-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 mb-4 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                                    <PlayCircle className="h-6 w-6" />
                                </div>
                                <CardTitle className="font-bold">Video Tutorials</CardTitle>
                                <CardDescription>Step-by-step walkthroughs to get you started.</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-none shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all cursor-pointer group">
                            <CardHeader>
                                <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <MessageCircle className="h-6 w-6" />
                                </div>
                                <CardTitle className="font-bold">Live Chat</CardTitle>
                                <CardDescription>Chat instantly with our support team (9am - 6pm).</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {FAQs.map((faq, i) => (
                                        <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                                            <CardContent className="p-6 flex justify-between items-center bg-white">
                                                <div>
                                                    <h3 className="font-bold text-slate-800 mb-2">{faq.q}</h3>
                                                    <p className="text-sm text-slate-500">{faq.a}</p>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-slate-300" />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="bg-slate-900 text-white border-none shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Phone className="h-32 w-32 -mr-8 -mt-8 text-white" />
                                </div>
                                <CardHeader>
                                    <CardTitle>Contact Us</CardTitle>
                                    <CardDescription className="text-slate-400">Direct lines for urgent issues.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <div className="font-bold">+91 1800-TRAVELZY</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <div className="font-bold">partners@travelzy.com</div>
                                    </div>
                                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold mt-4">
                                        Open Ticket
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
