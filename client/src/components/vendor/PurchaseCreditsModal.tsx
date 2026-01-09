import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Check, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../config';

interface PurchaseCreditsModalProps {
    open: boolean;
    onClose: () => void;
    onPurchaseSuccess: (credits: number) => void;
}

const CREDIT_PACKAGES = [
    { credits: 100, price: 1000, discount: 0, popular: false },
    { credits: 500, price: 4500, discount: 10, popular: true },
    { credits: 1000, price: 8000, discount: 20, popular: false },
    { credits: 5000, price: 35000, discount: 30, popular: false },
];

export const PurchaseCreditsModal: React.FC<PurchaseCreditsModalProps> = ({ open, onClose, onPurchaseSuccess }) => {
    const [selectedPackage, setSelectedPackage] = useState(CREDIT_PACKAGES[1]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePurchase = async () => {
        setIsProcessing(true);
        try {
            const token = localStorage.getItem('adminToken');
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
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Purchase Marketing Credits</DialogTitle>
                    <DialogDescription>
                        Choose a credit package to boost your trips and reach more travelers
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {CREDIT_PACKAGES.map((pkg) => (
                        <Card
                            key={pkg.credits}
                            className={`cursor-pointer transition-all ${selectedPackage.credits === pkg.credits
                                    ? 'ring-2 ring-primary shadow-lg scale-105'
                                    : 'hover:shadow-md'
                                } ${pkg.popular ? 'border-primary' : ''}`}
                            onClick={() => setSelectedPackage(pkg)}
                        >
                            {pkg.popular && (
                                <div className="bg-primary text-primary-foreground text-xs font-bold text-center py-1">
                                    MOST POPULAR
                                </div>
                            )}
                            <CardContent className="p-6 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <Zap className="h-8 w-8 text-amber-500" />
                                </div>
                                <div className="text-3xl font-bold mb-2">{pkg.credits}</div>
                                <div className="text-sm text-muted-foreground mb-4">Credits</div>
                                <div className="text-2xl font-bold text-primary mb-2">₹{pkg.price.toLocaleString()}</div>
                                {pkg.discount > 0 && (
                                    <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full inline-block">
                                        Save {pkg.discount}%
                                    </div>
                                )}
                                {selectedPackage.credits === pkg.credits && (
                                    <div className="mt-4">
                                        <Check className="h-6 w-6 text-primary mx-auto" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="bg-muted p-4 rounded-lg mt-6">
                    <h4 className="font-semibold mb-2">What you can do with credits:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Homepage Spotlight: 200 credits/day</li>
                        <li>• Email Campaign: 50 credits (one-time)</li>
                        <li>• Social Media Boost: 25 credits (one-time)</li>
                    </ul>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={onClose} disabled={isProcessing}>
                        Cancel
                    </Button>
                    <Button onClick={handlePurchase} disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : `Purchase ${selectedPackage.credits} Credits for ₹${selectedPackage.price.toLocaleString()}`}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
