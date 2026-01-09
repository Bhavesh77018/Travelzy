import React from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Play, Clock, CheckCircle2, ChevronRight, BookOpen, PlayCircle, Award, FileText, CheckCircle } from 'lucide-react';
import { useAppState } from '../../hooks/useAppState';

export const PlatformTutorial: React.FC = () => {
    const { navigateToVendorSupport } = useAppState();

    const tutorials = [
        {
            title: "Getting Started with Travelzy",
            duration: "5 min",
            watched: true,
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
            description: "Learn the basics of setting up your vendor profile and dashboard navigation."
        },
        {
            title: "Creating Your First Trip",
            duration: "12 min",
            watched: false,
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
            description: "A comprehensive guide to using the trip builder tool effectively."
        },
        {
            title: "Mastering Marketing Credits",
            duration: "8 min",
            watched: false,
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
            description: "How to use credits to boost visibility and get more bookings."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="pl-64 transition-all duration-300">
                <main className="p-8 max-w-[1200px] mx-auto min-h-screen">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Partner Academy</h1>
                            <p className="text-slate-500 mt-1">Master the platform with these video guides.</p>
                        </div>
                        <Button variant="outline" onClick={navigateToVendorSupport}>
                            Need Help?
                        </Button>
                    </header>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tutorials.map((tutorial, index) => (
                            <Card key={index} className="border-none shadow-xl shadow-gray-200/50 bg-white rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer">
                                <div className="relative h-48">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                                    <img src={tutorial.image} alt={tutorial.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <div className="h-14 w-14 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl group-hover:scale-105 transition-transform">
                                            <Play className="h-6 w-6 text-blue-600 ml-1" fill="currentColor" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
                                        {tutorial.duration}
                                    </div>
                                    {tutorial.watched && (
                                        <div className="absolute top-3 left-3 z-20 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                            <CheckCircle2 className="h-3 w-3" /> Watched
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                                        {tutorial.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                        {tutorial.description}
                                    </p>
                                    <div className="flex items-center text-xs font-bold text-blue-600">
                                        <BookOpen className="h-4 w-4 mr-1.5" /> Start Learning
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-16 bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 bg-blue-500 blur-[100px] h-64 w-64 opacity-30 rounded-full"></div>

                        <div className="relative z-10 max-w-2xl">
                            <div className="inline-block bg-blue-500/20 text-blue-200 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                Pro Tip
                            </div>
                            <h2 className="text-3xl font-black mb-4">Complete the certification course</h2>
                            <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
                                Become a certified premium partner by completing our 1-hour advanced training course.
                                Get an exclusive badge on your profile and 20% more visibility.
                            </p>
                            <Button className="bg-white text-indigo-950 font-bold h-12 px-8 rounded-full hover:bg-blue-50 transition-colors">
                                Start Certification <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
