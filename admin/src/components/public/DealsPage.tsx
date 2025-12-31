import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { ArrowLeft, Tag } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export const DealsPage: React.FC = () => {
    const { navigateToCustomerHome } = useAppState();

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={navigateToCustomerHome}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-4xl font-black tracking-tight text-primary">Hot Deals 🔥</h1>
                </div>

                <div className="grid gap-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="overflow-hidden border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
                            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <Tag className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Monsoon Madness Sale</h3>
                                        <p className="text-muted-foreground">Get flat 20% off on all Kerala packages this week.</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-gray-400 line-through">₹25,000</div>
                                    <div className="text-2xl font-bold text-gray-900">₹19,999</div>
                                    <Button className="mt-2" size="sm">Grab Deal</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
