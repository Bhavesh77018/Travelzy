import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

export const AboutPage: React.FC = () => {
    const { navigateToCustomerHome } = useAppState();

    return (
        <div className="min-h-screen bg-background p-8 flex flex-col items-center">
            <div className="max-w-3xl space-y-8">
                <div className="relative">
                    <Button variant="ghost" size="icon" className="absolute -left-16 top-0" onClick={navigateToCustomerHome}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-5xl font-black tracking-tighter mb-6">About <span className="text-primary">Travelzy</span></h1>
                </div>

                <div className="prose prose-lg prose-gray">
                    <p className="text-xl leading-relaxed text-gray-600">
                        Travelzy is a next-generation travel marketplace connecting travelers directly with verified local agencies.
                        We believe in transparency, speed, and eliminating the middleman commission.
                    </p>

                    <div className="grid grid-cols-2 gap-8 my-12">
                        <div>
                            <h3 className="font-bold text-2xl mb-2">Our Mission</h3>
                            <p>To democratize travel bookings and empower local businesses.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-2xl mb-2">Our Vision</h3>
                            <p>A world where every journey is seamless and fair.</p>
                        </div>
                    </div>

                    <div className="p-8 bg-muted rounded-3xl text-center">
                        <h3 className="text-2xl font-bold mb-4">Join 10,000+ Travelers</h3>
                        <Button size="lg">Start Exploring</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
