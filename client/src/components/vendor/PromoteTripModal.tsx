import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { TrendingUp, Mail, Share2 } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import type { Trip } from '../../types';

interface PromoteTripModalProps {
    open: boolean;
    onClose: () => void;
    onPromoteSuccess: () => void;
    currentCredits: number;
}

const PROMOTION_TYPES = [
    {
        id: 'homepage_spotlight',
        name: 'Homepage Spotlight',
        description: 'Get featured on the main landing page for maximum exposure.',
        cost: 200,
        unit: 'per day',
        requiresDuration: true,
        icon: TrendingUp
    },
    {
        id: 'email_campaign',
        name: 'Email Campaign',
        description: 'Send targeted emails to our subscriber base.',
        cost: 50,
        unit: 'one-time',
        requiresDuration: false,
        icon: Mail
    },
    {
        id: 'social_boost',
        name: 'Social Media Boost',
        description: 'Auto-post promotion to Facebook & Instagram pages.',
        cost: 25,
        unit: 'one-time',
        requiresDuration: false,
        icon: Share2
    }
];

export const PromoteTripModal: React.FC<PromoteTripModalProps> = ({ open, onClose, onPromoteSuccess, currentCredits }) => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [selectedTripId, setSelectedTripId] = useState('');
    const [promotionType, setPromotionType] = useState('homepage_spotlight');
    const [duration, setDuration] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const selectedPromotion = PROMOTION_TYPES.find(p => p.id === promotionType);
    const totalCost = selectedPromotion ? (selectedPromotion.requiresDuration ? selectedPromotion.cost * duration : selectedPromotion.cost) : 0;
    const canAfford = currentCredits >= totalCost;

    useEffect(() => {
        if (open) {
            fetchPublishedTrips();
        }
    }, [open]);

    // ... fetchPublishedTrips and handlePromote same as before ...
    const fetchPublishedTrips = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/trips`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const publishedTrips = data.filter((trip: Trip) => trip.status === 'APPROVED');
                setTrips(publishedTrips);
                if (publishedTrips.length > 0) {
                    setSelectedTripId(publishedTrips[0].id);
                }
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
            toast.error('Failed to load trips');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePromote = async () => {
        if (!selectedTripId) {
            toast.error('Please select a trip');
            return;
        }

        if (!canAfford) {
            toast.error('Insufficient credits');
            return;
        }

        setIsProcessing(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/vendors/trips/${selectedTripId}/promote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    promotionType,
                    duration: selectedPromotion?.requiresDuration ? duration : undefined
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Trip promoted successfully!');
                onPromoteSuccess();
                onClose();
            } else {
                toast.error(data.message || 'Failed to promote trip');
            }
        } catch (error) {
            console.error('Promotion error:', error);
            toast.error('Failed to process promotion');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl p-0 overflow-hidden border-none shadow-2xl bg-white">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                            Promote Your Trip
                        </DialogTitle>
                        <DialogDescription className="text-gray-300">
                            Boost visibility and get more bookings in just a few clicks.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-8 space-y-8">
                    {/* Trip Selection */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Select Trip to Promote</Label>
                        {isLoading ? (
                            <div className="h-12 w-full bg-gray-50 animate-pulse rounded-xl" />
                        ) : trips.length === 0 ? (
                            <div className="text-center p-8 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                                <p className="text-gray-500 font-medium">No published trips found.</p>
                                <p className="text-xs text-gray-400">Please publish a trip before promoting.</p>
                            </div>
                        ) : (
                            <Select value={selectedTripId} onValueChange={setSelectedTripId}>
                                <SelectTrigger className="w-full h-14 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-white transition-colors text-lg px-4">
                                    <SelectValue placeholder="Select a trip..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {trips.map((trip) => (
                                        <SelectItem key={trip.id} value={trip.id} className="py-3">
                                            <span className="font-semibold text-gray-900">{trip.title}</span>
                                            <span className="text-gray-400 mx-2">•</span>
                                            <span className="text-gray-500">{trip.destination}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {/* Promotion Type */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Choose Promotion Type</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {PROMOTION_TYPES.map((type) => {
                                const Icon = type.icon;
                                const isSelected = promotionType === type.id;
                                return (
                                    <div
                                        key={type.id}
                                        onClick={() => setPromotionType(type.id)}
                                        className={`cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-[1.02] ${isSelected
                                            ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900/5'
                                            : 'border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className={`font-bold text-sm mb-1 ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{type.name}</h3>
                                        <div className="text-xs text-gray-500 leading-tight mb-3 min-h-[40px]">{type.description}</div>
                                        <div className="font-bold text-gray-900">{type.cost} Credits <span className="text-[10px] text-gray-400 uppercase font-medium">{type.unit}</span></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Duration (if needed) */}
                    {selectedPromotion?.requiresDuration && (
                        <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-300">
                            <Label className="text-base font-semibold text-gray-900">Duration (Days)</Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={duration}
                                    onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="h-14 w-32 rounded-xl text-xl font-bold text-center border-gray-200"
                                />
                                <div className="text-sm text-gray-500">
                                    Feature your trip on the homepage for {duration} days.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer / Cost Summary */}
                    <div className="bg-gray-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-500">Total Investment</div>
                            <div className="text-4xl font-black text-gray-900 tracking-tight">
                                {totalCost} <span className="text-base font-bold text-gray-400">Credits</span>
                            </div>
                            <div className={`text-sm font-semibold flex items-center gap-2 ${canAfford ? 'text-green-600' : 'text-red-500'}`}>
                                {canAfford ? (
                                    <>
                                        Available Balance: {currentCredits} Credits
                                    </>
                                ) : (
                                    <>
                                        Insufficient Balance ({currentCredits} Credits)
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <Button variant="ghost" onClick={onClose} disabled={isProcessing} className="flex-1 md:flex-none h-14 px-6 rounded-xl font-semibold text-gray-500 hover:text-gray-900">
                                Cancel
                            </Button>
                            <Button
                                onClick={handlePromote}
                                disabled={isProcessing || !canAfford || trips.length === 0}
                                className={`flex-1 md:flex-none h-14 px-10 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105 ${canAfford
                                    ? 'bg-gray-900 hover:bg-black text-white shadow-gray-900/20'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isProcessing ? 'Processing...' : 'Promote Trip'}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
