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
            <DialogContent className="max-w-7xl p-0 overflow-hidden border-none shadow-2xl bg-white/95 backdrop-blur-xl">
                <div className="bg-gray-50 border-b border-gray-100 px-6 py-5">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="bg-amber-100 p-2 rounded-xl text-amber-600">
                                <Zap className="h-5 w-5" />
                            </span>
                            Purchase Marketing Credits
                        </DialogTitle>
                        <DialogDescription className="text-base text-gray-500">
                            Choose a credit package to boost your trips and reach thousands of travelers.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {CREDIT_PACKAGES.map((pkg) => {
                            const Icon = pkg.icon;
                            const isSelected = selectedPackage.credits === pkg.credits;

                            return (
                                <div
                                    key={pkg.credits}
                                    onClick={() => setSelectedPackage(pkg)}
                                    className={`relative group cursor-pointer rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${isSelected
                                            ? 'border-gray-900 bg-gray-900 text-white shadow-2xl shadow-gray-900/20 scale-[1.02] z-10'
                                            : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-xl'
                                        }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg z-20 whitespace-nowrap">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="p-5 text-center space-y-3">
                                        <div className={`mx-auto h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${isSelected ? 'bg-white/10' : pkg.bg}`}>
                                            <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : pkg.color}`} />
                                        </div>

                                        <div>
                                            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>
                                                {pkg.title}
                                            </div>
                                            <div className="text-2xl font-black tabular-nums">
                                                {pkg.credits.toLocaleString()}
                                            </div>
                                            <div className={`text-xs font-medium ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>Credits</div>
                                        </div>

                                        <div className="pt-3 border-t border-gray-100/10">
                                            <div className={`text-xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                                ₹{pkg.price.toLocaleString()}
                                            </div>
                                            {pkg.discount > 0 ? (
                                                <div className="inline-block bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                    Save {pkg.discount}%
                                                </div>
                                            ) : (
                                                <div className="h-5"></div> // Spacer
                                            )}
                                        </div>
                                    </div>

                                    <div className="px-4 pb-4">
                                        <div className={`w-full py-2 rounded-lg text-xs font-bold text-center transition-colors ${isSelected
                                                ? 'bg-white text-gray-900'
                                                : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100'
                                            }`}>
                                            {isSelected ? 'Selected' : 'Select Plan'}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                            <h4 className="font-bold text-gray-900 text-sm mb-1">What can you do with {selectedPackage.credits} credits?</h4>
                            <p className="text-xs text-gray-500">
                                ~<span className="font-bold text-gray-900">{(selectedPackage.credits / 200).toFixed(1)} days</span> spotlight or <span className="font-bold text-gray-900">{Math.floor(selectedPackage.credits / 50)} email blasts</span>.
                            </p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <Button variant="outline" onClick={onClose} disabled={isProcessing} className="flex-1 md:flex-none h-10 px-4 rounded-xl border-gray-200 hover:bg-white hover:text-gray-900 font-semibold text-sm">
                                Cancel
                            </Button>
                            <Button onClick={handlePurchase} disabled={isProcessing} className="flex-1 md:flex-none h-10 px-6 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm shadow-lg shadow-gray-900/20">
                                {isProcessing ? 'Processing...' : 'Confirm Purchase'}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
