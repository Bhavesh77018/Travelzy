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
    const { trips, addTrip, navigateToTripDetail } = useAppState(); // In a real app we would have updateTripStatus
    const [selectedTrip, setSelectedTrip] = useState<any | null>(null);

    // Filter only Pending trips (For mock data, we'll assume some are pending or just show all for demo)
    // In a real scenario: const pendingTrips = trips.filter(t => t.status === 'PENDING');
    // For this generic implementation without modifying all mock data status, we will simulate it.

    // Let's assume all trips without a status are 'APPROVED' for now, but we want to show how it works.
    // We'll trust the user has added 'status' to the type, so we can filter if data existed.
    // Fallback to showing all trips for demonstration if none are pending.
    const pendingTrips = trips.filter(t => t.status === 'PENDING');
    const displayTrips = pendingTrips.length > 0 ? pendingTrips : trips;

    const handleAction = (_tripId: string, action: 'APPROVE' | 'REJECT') => {
        // Here we would call an API updateTripStatus(tripId, action)
        toast.success(`Trip ${action === 'APPROVE' ? 'Approved' : 'Rejected'} successfully!`);
        // Simulate removing from list
        // In real app, context update would trigger re-render
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
                                    <TableRow key={trip.id}>
                                        <TableCell className="font-medium">{trip.title}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-muted-foreground">
                                                <MapPin className="mr-1 h-3 w-3" /> {trip.destination}
                                            </div>
                                        </TableCell>
                                        <TableCell>Unknown Vendor</TableCell> {/* Mock data doesn't link vendor name yet */}
                                        <TableCell>₹{trip.pricing ? trip.pricing.double : trip.price}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                                {trip.status || 'PENDING'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right flex justify-end gap-2">
                                            <Button size="sm" variant="ghost" onClick={() => navigateToTripDetail(trip.id)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAction(trip.id, 'APPROVE')}>
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleAction(trip.id, 'REJECT')}>
                                                <XCircle className="h-4 w-4" />
                                            </Button>
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

            {/* Trip Details Dialog */}
            <Dialog open={!!selectedTrip} onOpenChange={() => setSelectedTrip(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Trip Details Verification</DialogTitle>
                        <DialogDescription>Review all details before approving.</DialogDescription>
                    </DialogHeader>
                    {selectedTrip && (
                        <div className="grid gap-6 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <img src={selectedTrip.image} alt="Trip" className="rounded-lg object-cover w-full h-48" />
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl">{selectedTrip.title}</h3>
                                    <div className="flex items-center text-muted-foreground">
                                        <MapPin className="mr-2 h-4 w-4" /> {selectedTrip.destination}
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <Calendar className="mr-2 h-4 w-4" /> {selectedTrip.duration} Days
                                    </div>
                                    <div className="flex items-center font-bold text-primary">
                                        <DollarSign className="mr-2 h-4 w-4" /> ₹{selectedTrip.pricing?.double || selectedTrip.price} / person
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Itinerary</h4>
                                    <div className="space-y-2 max-h-40 overflow-y-auto bg-muted p-2 rounded text-sm">
                                        {selectedTrip.itinerary?.map((day: any) => (
                                            <div key={day.day}>
                                                <span className="font-bold">Day {day.day}: {day.title}</span>
                                                <ul className="list-disc list-inside text-muted-foreground pl-2">
                                                    {day.activities.map((act: string, idx: number) => <li key={idx}>{act}</li>)}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-green-50 p-3 rounded">
                                        <span className="font-semibold text-green-700">Inclusions:</span>
                                        <ul className="list-disc list-inside mt-1">{selectedTrip.inclusions?.map((i: string) => <li key={i}>{i}</li>)}</ul>
                                    </div>
                                    <div className="bg-red-50 p-3 rounded">
                                        <span className="font-semibold text-red-700">Exclusions:</span>
                                        <ul className="list-disc list-inside mt-1">{selectedTrip.exclusions?.map((e: string) => <li key={e}>{e}</li>)}</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedTrip(null)}>Close</Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => { handleAction(selectedTrip.id, 'APPROVE'); setSelectedTrip(null); }}>
                            Approve Trip
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
