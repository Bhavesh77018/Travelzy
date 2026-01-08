// @ts-nocheck
import React, { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, Eye, Calendar, MapPin, DollarSign } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';

export const AdminTripRequestsPage: React.FC = () => {
    const { trips, approveTrip, rejectTrip, navigateToTripDetail } = useAppState();
    const [selectedTrip, setSelectedTrip] = useState<any | null>(null);

    // Filter only Pending trips (or allow seeing all statuses for debugging)
    const pendingTrips = trips.filter(t => t.status === 'PENDING' || t.status === 'DRAFT'); // Include draft if vendors submitted it incorrectly
    // If backend only serves pending, then trips is already filtered.
    // Let's rely on what we have, prioritizing PENDING.
    const displayTrips = trips;

    const handleAction = async (tripId: string, action: 'APPROVE' | 'REJECT') => {
        try {
            if (action === 'APPROVE') {
                await approveTrip(tripId);
                toast.success('Trip Approved successfully!');
            } else {
                await rejectTrip(tripId, 'Rejected by Admin');
                toast.success('Trip Rejected.');
            }
        } catch (error) {
            toast.error('Action failed');
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 flex">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Trip Verification Requests</h1>
                            <p className="text-muted-foreground">Review and approve new trip packages from vendors.</p>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Trip Title</TableHead>
                                    <TableHead>Destination</TableHead>
                                    <TableHead>Vendor</TableHead>
                                    <TableHead>Price (Base)</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {displayTrips.map((trip: any) => (
                                    <TableRow key={trip.id || trip._id}>
                                        <TableCell className="font-medium">{trip.title}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-muted-foreground">
                                                <MapPin className="mr-1 h-3 w-3" /> {trip.destination}
                                            </div>
                                        </TableCell>
                                        <TableCell>{trip.vendorId?.name || trip.vendorId?.businessName || 'Unknown Vendor'}</TableCell>
                                        <TableCell>₹{trip.pricing ? trip.pricing.double : trip.price}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`
                                                ${trip.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                                    trip.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800 border-yellow-200'}
                                            `}>
                                                {trip.status || 'PENDING'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right flex justify-end gap-2">
                                            <Button size="sm" variant="ghost" onClick={() => navigateToTripDetail(trip.id || trip._id)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            {trip.status !== 'APPROVED' && (
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAction(trip.id || trip._id, 'APPROVE')}>
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {trip.status !== 'REJECTED' && (
                                                <Button size="sm" variant="destructive" onClick={() => handleAction(trip.id || trip._id, 'REJECT')}>
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {displayTrips.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                            No pending trip requests.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Trip Details Dialog (Simplified reuse or keep removed if passing ID to dedicated page) */}
            <Dialog open={!!selectedTrip} onOpenChange={() => setSelectedTrip(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Trip Details Verification</DialogTitle>
                        <DialogDescription>Review all details before approving.</DialogDescription>
                    </DialogHeader>
                    {selectedTrip && (
                        <div className="grid gap-6 py-4">
                            {/* Same details content as before */}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedTrip(null)}>Close</Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => { handleAction(selectedTrip.id || selectedTrip._id, 'APPROVE'); setSelectedTrip(null); }}>
                            Approve Trip
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
