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
            const token = localStorage.getItem('token');
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
            const token = localStorage.getItem('token');
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
                {/* Glassmorphic Header */}
                <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 border-b border-gray-100/50 px-8 py-6 flex justify-between items-center transition-all duration-300">
                    <div>
                        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">Marketing Center</h1>
                        <p className="text-gray-500 font-medium">Promote your trips to thousands of travelers.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="animate-in fade-in slide-in-from-top-4 duration-700 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200/50 px-5 py-2.5 rounded-2xl flex items-center gap-3 font-bold shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all cursor-default group">
                            <div className="bg-white p-1.5 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                            </div>
                            <span className="text-amber-950 font-extrabold text-lg tabular-nums tracking-tight">
                                {isLoading ? '...' : credits.toLocaleString()} <span className="text-amber-700/70 text-sm font-semibold ml-0.5">Credits</span>
                            </span>
                        </div>
                        <Button
                            onClick={() => setShowPurchaseModal(true)}
                            className="bg-gray-900 hover:bg-gray-800 text-white shadow-xl shadow-gray-900/10 hover:shadow-gray-900/20 rounded-xl px-6 h-12 font-semibold transition-all hover:scale-[1.02]"
                        >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Buy Credits
                        </Button>
                    </div>
                </header>

                <main className="p-8 space-y-10 max-w-7xl mx-auto">
                    {/* Promotion Actions */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold text-gray-900">Start a Promotion</h2>
                                <p className="text-gray-500">Choose how you want to reach your audience.</p>
                            </div>
                            <Button variant="outline" onClick={() => setShowPromoteModal(true)} className="rounded-xl border-dashed border-2 hover:border-solid hover:bg-gray-50">
                                <Plus className="h-4 w-4 mr-2" />
                                Custom Promotion
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Email Campaign Card */}
                            <div className="group relative bg-white rounded-3xl p-1 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
                                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-50/50 to-transparent rounded-t-[1.3rem]" />
                                <div className="relative p-7 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="h-14 w-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                            <Mail className="h-7 w-7" />
                                        </div>
                                        <div className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
                                            Most Effective
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-gray-900">Email Campaigns</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm">Send targeted newsletters directly to our subscriber base interested in your destination.</p>
                                    </div>
                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                                        <div className="text-sm font-semibold text-gray-400">
                                            Cost per blast
                                        </div>
                                        <div className="text-lg font-black text-gray-900">
                                            50 <span className="text-xs font-medium text-gray-400">Credits</span>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-white hover:bg-blue-50 border-2 border-blue-100 hover:border-blue-200 text-blue-700 font-bold rounded-xl h-11 shadow-sm" variant="ghost" onClick={() => setShowPromoteModal(true)}>
                                        Create Campaign
                                    </Button>
                                </div>
                            </div>

                            {/* Social Boost Card */}
                            <div className="group relative bg-white rounded-3xl p-1 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
                                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-purple-50/50 to-transparent rounded-t-[1.3rem]" />
                                <div className="relative p-7 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="h-14 w-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                            <Share2 className="h-7 w-7" />
                                        </div>
                                        <div className="bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full">
                                            Best Value
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-gray-900">Social Boost</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm">Automated posts to our Facebook and Instagram pages to boost your trip's visibility.</p>
                                    </div>
                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                                        <div className="text-sm font-semibold text-gray-400">
                                            Cost per post
                                        </div>
                                        <div className="text-lg font-black text-gray-900">
                                            25 <span className="text-xs font-medium text-gray-400">Credits</span>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-white hover:bg-purple-50 border-2 border-purple-100 hover:border-purple-200 text-purple-700 font-bold rounded-xl h-11 shadow-sm" variant="ghost" onClick={() => setShowPromoteModal(true)}>
                                        Boost Post
                                    </Button>
                                </div>
                            </div>

                            {/* Homepage Spotlight Card */}
                            <div className="group relative bg-white rounded-3xl p-1 border-2 border-amber-100 shadow-lg shadow-amber-500/5 hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                                <div className="absolute top-0 right-0 p-3">
                                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                                        Premium
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-amber-50/50 to-transparent" />
                                <div className="relative p-7 space-y-6">
                                    <div className="h-14 w-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                        <TrendingUp className="h-7 w-7" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-gray-900">Homepage Spotlight</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm">Get featured in the "Trending" section on our main landing page for maximum exposure.</p>
                                    </div>
                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                                        <div className="text-sm font-semibold text-gray-400">
                                            Daily Rate
                                        </div>
                                        <div className="text-lg font-black text-gray-900">
                                            200 <span className="text-xs font-medium text-gray-400">Credits</span>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white font-bold rounded-xl h-11 shadow-lg shadow-gray-900/10 border-0" onClick={() => setShowPromoteModal(true)}>
                                        Promote Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Promotions */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Active Campaigns</h2>
                        <Card className="border-none shadow-xl shadow-gray-200/40 bg-white/50 backdrop-blur-sm">
                            <CardContent className="p-6">
                                {activePromotions.length === 0 ? (
                                    <div className="text-center py-16 px-4">
                                        <div className="bg-gray-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Zap className="h-8 w-8 text-gray-300" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No active promotions</h3>
                                        <p className="text-gray-500 max-w-sm mx-auto mb-8">
                                            Start a new campaign to boost your visibility and get more bookings today.
                                        </p>
                                        <Button onClick={() => setShowPromoteModal(true)} variant="outline" className="rounded-xl">
                                            Create First Campaign
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {activePromotions.map((promo) => (
                                            <div key={promo.tripId} className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-bold text-gray-900 text-lg">{promo.tripTitle}</h3>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-500">{promo.destination}</span>
                                                </div>
                                                <div className="grid gap-4">
                                                    {promo.promotions.map((p, idx) => (
                                                        <div key={idx} className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                                                            <div className="flex items-start gap-5 mb-4 md:mb-0">
                                                                <div className={`p-3 rounded-xl ${p.type.includes('homepage') ? 'bg-amber-100 text-amber-600' :
                                                                        p.type.includes('social') ? 'bg-purple-100 text-purple-600' :
                                                                            'bg-blue-100 text-blue-600'
                                                                    }`}>
                                                                    {p.type.includes('homepage') ? <TrendingUp className="h-5 w-5" /> :
                                                                        p.type.includes('social') ? <Share2 className="h-5 w-5" /> :
                                                                            <Mail className="h-5 w-5" />}
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-3 mb-1">
                                                                        <div className="font-bold text-gray-900">{formatPromotionType(p.type)}</div>
                                                                        <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-green-200">
                                                                            Active
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-sm text-gray-500 font-medium">
                                                                        {new Date(p.startDate).toLocaleDateString()} — {new Date(p.endDate).toLocaleDateString()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-8 pl-14 md:pl-0">
                                                                <div className="text-right">
                                                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Investment</div>
                                                                    <div className="font-bold text-gray-900">{p.creditsSpent} credits</div>
                                                                </div>
                                                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
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
