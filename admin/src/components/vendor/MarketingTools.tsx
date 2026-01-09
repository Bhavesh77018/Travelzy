import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Mail, Share2, TrendingUp, Zap, Plus, ShoppingCart } from 'lucide-react';
import { PurchaseCreditsModal } from './PurchaseCreditsModal';
import { PromoteTripModal } from './PromoteTripModal';
import { API_BASE_URL } from '../../config';
import { toast } from 'sonner';

interface Promotion {
    tripId: string;
    tripTitle: string;
    destination: string;
    promotions: Array<{
        type: string;
        startDate: string;
        endDate: string;
        creditsSpent: number;
        status: string;
    }>;
}

export const MarketingTools: React.FC = () => {
    const [credits, setCredits] = useState(0);
    const [activePromotions, setActivePromotions] = useState<Promotion[]>([]);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showPromoteModal, setShowPromoteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCreditBalance();
        fetchActivePromotions();
    }, []);

    const fetchCreditBalance = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/vendors/credits/balance`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCredits(data.credits);
            }
        } catch (error) {
            console.error('Error fetching credit balance:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchActivePromotions = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/vendors/promotions`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setActivePromotions(data.promotions || []);
            }
        } catch (error) {
            console.error('Error fetching promotions:', error);
        }
    };

    const handlePurchaseSuccess = (newCredits: number) => {
        setCredits(newCredits);
    };

    const handlePromoteSuccess = () => {
        fetchCreditBalance();
        fetchActivePromotions();
    };

    const formatPromotionType = (type: string) => {
        return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="pl-64">
                <header className="bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Marketing Center</h1>
                        <p className="text-gray-500">Promote your trips and reach more travelers.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-amber-200 to-yellow-400 px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-amber-500/20">
                            <Zap className="h-5 w-5 text-amber-700" />
                            <span className="text-amber-900">
                                {isLoading ? '...' : credits.toLocaleString()} Credits
                            </span>
                        </div>
                        <Button onClick={() => setShowPurchaseModal(true)} className="gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Buy Credits
                        </Button>
                    </div>
                </header>

                <main className="p-8 space-y-8">
                    {/* Promotion Actions */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Promotion Types</h2>
                            <Button onClick={() => setShowPromoteModal(true)} className="gap-2">
                                <Plus className="h-4 w-4" />
                                Promote a Trip
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                                <CardHeader>
                                    <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <CardTitle>Email Campaigns</CardTitle>
                                    <CardDescription>Send newsletters to our subscriber base.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm font-medium text-gray-500 mb-4">Cost: 50 Credits</div>
                                    <Button className="w-full" onClick={() => setShowPromoteModal(true)}>
                                        Create Campaign
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                                <CardHeader>
                                    <div className="h-12 w-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Share2 className="h-6 w-6" />
                                    </div>
                                    <CardTitle>Social Boost</CardTitle>
                                    <CardDescription>Auto-post to Facebook and Instagram.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm font-medium text-gray-500 mb-4">Cost: 25 Credits</div>
                                    <Button className="w-full" variant="secondary" onClick={() => setShowPromoteModal(true)}>
                                        Boost Post
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                                <CardHeader>
                                    <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                                        <TrendingUp className="h-6 w-6" />
                                    </div>
                                    <CardTitle>Homepage Spotlight</CardTitle>
                                    <CardDescription>Get featured on the main landing page.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm font-medium text-gray-500 mb-4">Cost: 200 Credits/Day</div>
                                    <Button className="w-full" variant="outline" onClick={() => setShowPromoteModal(true)}>
                                        Promote Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Active Promotions */}
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle>Active Promotions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {activePromotions.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No active promotions. Start promoting your trips to reach more customers!
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {activePromotions.map((promo) => (
                                        <div key={promo.tripId} className="space-y-2">
                                            <div className="font-semibold text-lg">{promo.tripTitle} - {promo.destination}</div>
                                            {promo.promotions.map((p, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                                    <div className="flex items-center gap-4">
                                                        <div className="bg-green-100 p-2 rounded-lg text-green-600 font-bold text-xs">
                                                            ACTIVE
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{formatPromotionType(p.type)}</div>
                                                            <div className="text-xs text-gray-500">
                                                                Started {new Date(p.startDate).toLocaleDateString()} •
                                                                Ends {new Date(p.endDate).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-bold text-lg">{p.creditsSpent} credits</div>
                                                        <div className="text-xs text-gray-500">Total Spent</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>

            {/* Modals */}
            <PurchaseCreditsModal
                open={showPurchaseModal}
                onClose={() => setShowPurchaseModal(false)}
                onPurchaseSuccess={handlePurchaseSuccess}
            />
            <PromoteTripModal
                open={showPromoteModal}
                onClose={() => setShowPromoteModal(false)}
                onPromoteSuccess={handlePromoteSuccess}
                currentCredits={credits}
            />
        </div>
    );
};
