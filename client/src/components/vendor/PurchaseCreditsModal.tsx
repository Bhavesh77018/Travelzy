import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Check, Zap, TrendingUp, Star, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../config';

interface PurchaseCreditsModalProps {
    open: boolean;
    onClose: () => void;
    onPurchaseSuccess: (credits: number) => void;
}

const CREDIT_PACKAGES = [
    { credits: 100, price: 1000, discount: 0, popular: false, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100', title: 'Starter' },
    { credits: 500, price: 4500, discount: 10, popular: true, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-100', title: 'Growth' },
    { credits: 1000, price: 8000, discount: 20, popular: false, icon: Star, color: 'text-purple-500', bg: 'bg-purple-100', title: 'Professional' },
    { credits: 5000, price: 35000, discount: 30, popular: false, icon: Sparkles, color: 'text-indigo-500', bg: 'bg-indigo-100', title: 'Enterprise' },
];

export const PurchaseCreditsModal: React.FC<PurchaseCreditsModalProps> = ({ open, onClose, onPurchaseSuccess }) => {
    const [selectedPackage, setSelectedPackage] = useState(CREDIT_PACKAGES[1]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePurchase = async () => {
        setIsProcessing(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/vendors/credits/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: selectedPackage.credits,
                    package: `${selectedPackage.credits} Credits Package`
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Successfully purchased ${selectedPackage.credits} credits!`);
                onPurchaseSuccess(data.credits);
                onClose();
            } else {
                toast.error(data.message || 'Failed to purchase credits');
            }
        } catch (error) {
            console.error('Purchase error:', error);
            toast.error('Failed to process purchase');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl p-0 overflow-hidden border-none shadow-2xl bg-white/95 backdrop-blur-xl">
                <div className="bg-gray-50 border-b border-gray-100 px-8 py-6">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="bg-amber-100 p-2 rounded-xl text-amber-600">
                                <Zap className="h-6 w-6" />
                            </span>
                            Purchase Marketing Credits
                        </DialogTitle>
                        <DialogDescription className="text-lg">
                            Choose a credit package to boost your trips and reach thousands of travelers.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CREDIT_PACKAGES.map((pkg) => {
                            const Icon = pkg.icon;
                            const isSelected = selectedPackage.credits === pkg.credits;

                            return (
                                <div
                                    key={pkg.credits}
                                    onClick={() => setSelectedPackage(pkg)}
                                    className={`relative group cursor-pointer rounded-3xl border-2 transition-all duration-300 hover:-translate-y-1 ${isSelected
                                        ? 'border-gray-900 bg-gray-900 text-white shadow-2xl shadow-gray-900/20 scale-[1.02] z-10'
                                        : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-xl'
                                        }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg z-20">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="p-6 text-center space-y-4">
                                        <div className={`mx-auto h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${isSelected ? 'bg-white/10' : pkg.bg}`}>
                                            <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : pkg.color}`} />
                                        </div>

                                        <div>
                                            <div className={`text-sm font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>
                                                {pkg.title}
                                            </div>
                                            <div className="text-3xl font-black tabular-nums">
                                                {pkg.credits.toLocaleString()}
                                            </div>
                                            <div className={`text-sm font-medium ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>Credits</div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100/10">
                                            <div className={`text-2xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                                ₹{pkg.price.toLocaleString()}
                                            </div>
                                            {pkg.discount > 0 ? (
                                                <div className="inline-block bg-green-500/10 text-green-500 text-xs font-bold px-2 py-1 rounded-full">
                                                    Save {pkg.discount}%
                                                </div>
                                            ) : (
                                                <div className="h-6"></div> // Spacer
                                            )}
                                        </div>

                                        <div className={`w-full py-2 rounded-xl text-sm font-bold transition-colors ${isSelected
                                            ? 'bg-white text-gray-900'
                                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                                            }`}>
                                            {isSelected ? 'Selected' : 'Select Plan'}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">What can you do with {selectedPackage.credits} credits?</h4>
                            <p className="text-sm text-gray-500">
                                Approximately <span className="font-bold text-gray-900">{(selectedPackage.credits / 200).toFixed(1)} days</span> of Homepage Spotlight or <span className="font-bold text-gray-900">{Math.floor(selectedPackage.credits / 50)} email blasts</span>.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={onClose} disabled={isProcessing} className="h-12 px-6 rounded-xl border-gray-200 hover:bg-white hover:text-gray-900 font-semibold">
                                Cancel
                            </Button>
                            <Button onClick={handlePurchase} disabled={isProcessing} className="h-12 px-8 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold shadow-lg shadow-gray-900/20">
                                {isProcessing ? 'Processing...' : 'Confirm Purchase'}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
