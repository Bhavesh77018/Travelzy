import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { toast } from 'sonner';
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
        description: 'Feature your trip on the main landing page',
        cost: 200,
        unit: 'per day',
        requiresDuration: true
    },
    {
        id: 'email_campaign',
        name: 'Email Campaign',
        description: 'Send to our subscriber base',
        cost: 50,
        unit: 'one-time',
        requiresDuration: false
    },
    {
        id: 'social_boost',
        name: 'Social Media Boost',
        description: 'Auto-post to Facebook and Instagram',
        cost: 25,
        unit: 'one-time',
        requiresDuration: false
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

    const fetchPublishedTrips = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/trips`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Filter for published trips only
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
            const token = localStorage.getItem('adminToken');
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
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Promote Your Trip</DialogTitle>
                    <DialogDescription>
                        Select a trip and promotion type to boost visibility
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Trip Selection */}
                    <div>
                        <Label htmlFor="trip">Select Trip</Label>
                        {isLoading ? (
                            <div className="text-sm text-muted-foreground">Loading trips...</div>
                        ) : trips.length === 0 ? (
                            <div className="text-sm text-muted-foreground">No published trips available</div>
                        ) : (
                            <Select value={selectedTripId} onValueChange={setSelectedTripId}>
                                <SelectTrigger id="trip">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {trips.map((trip) => (
                                        <SelectItem key={trip.id} value={trip.id}>
                                            {trip.title} - {trip.destination}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {/* Promotion Type */}
                    <div>
                        <Label htmlFor="promotion-type">Promotion Type</Label>
                        <Select value={promotionType} onValueChange={setPromotionType}>
                            <SelectTrigger id="promotion-type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {PROMOTION_TYPES.map((promo) => (
                                    <SelectItem key={promo.id} value={promo.id}>
                                        {promo.name} - {promo.cost} credits {promo.unit}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {selectedPromotion && (
                            <p className="text-sm text-muted-foreground mt-1">{selectedPromotion.description}</p>
                        )}
                    </div>

                    {/* Duration (for homepage spotlight) */}
                    {selectedPromotion?.requiresDuration && (
                        <div>
                            <Label htmlFor="duration">Duration (days)</Label>
                            <Input
                                id="duration"
                                type="number"
                                min="1"
                                max="30"
                                value={duration}
                                onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                        </div>
                    )}

                    {/* Cost Summary */}
                    <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Total Cost:</span>
                            <span className="text-2xl font-bold">{totalCost} credits</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Your Balance:</span>
                            <span className={currentCredits >= totalCost ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                {currentCredits} credits
                            </span>
                        </div>
                        {!canAfford && (
                            <div className="mt-2 text-sm text-red-600">
                                Insufficient credits. You need {totalCost - currentCredits} more credits.
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={onClose} disabled={isProcessing}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handlePromote}
                        disabled={isProcessing || !canAfford || trips.length === 0}
                    >
                        {isProcessing ? 'Processing...' : 'Promote Trip'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
