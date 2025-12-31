import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, ArrowLeft, MapPin, Clock, Star, Users } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { toast } from 'sonner';

export const AdminTripDetailPage: React.FC = () => {
    const {
        trips,
        vendors,
        selectedDetailId,
        approveTrip,
        rejectTrip,
        navigateToAdminTrips
    } = useAppState();

    const trip = trips.find(t => t.id === selectedDetailId);

    // In a real app, trip would have a 'vendorId' field
    // For now mocking a vendor match or just picking the first for display
    const host = vendors[0];

    if (!trip) {
        return <div>Trip not found</div>;
    }

    const handleApprove = () => {
        approveTrip(trip.id);
        toast.success(`Trip "${trip.title}" has been approved.`);
    };

    const handleReject = () => {
        rejectTrip(trip.id);
        toast.error(`Trip "${trip.title}" has been rejected.`);
    };

    return (
        <div className="min-h-screen bg-muted/30 flex">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={navigateToAdminTrips}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{trip.title}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {trip.destination}</span>
                                <span className="flex items-center gap-1 ml-3"><Clock className="h-3 w-3" /> {trip.duration} Days</span>
                                <span className="flex items-center gap-1 ml-3"><Users className="h-3 w-3" /> {trip.pricing?.double ? `₹${trip.pricing.double}/p` : `₹${trip.price}`}</span>
                            </div>
                        </div>
                        <div className="ml-auto">
                            <Badge className={`text-sm px-3 py-1 ${trip.status === 'APPROVED' ? 'bg-green-100 text-green-700' : trip.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {trip.status}
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Images */}
                            <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
                                </CardContent>
                            </Card>

                            {/* Itinerary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Itinerary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {trip.itinerary.map((day) => (
                                        <div key={day.day} className="border-l-2 border-primary/20 pl-4 py-1 relative">
                                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-white"></div>
                                            <h3 className="font-semibold text-lg">Day {day.day}: {day.title}</h3>
                                            <ul className="mt-2 space-y-1">
                                                {day.activities.map((act, i) => (
                                                    <li key={i} className="text-muted-foreground text-sm">• {act}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar Actions */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Verification</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700"
                                        onClick={handleApprove}
                                        disabled={trip.status === 'APPROVED'}
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" /> Approve Trip
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                                        onClick={handleReject}
                                    >
                                        <XCircle className="mr-2 h-4 w-4" /> Reject Trip
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Host Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                                            {host.businessName.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-medium">{host.businessName}</div>
                                            <div className="text-xs text-muted-foreground">Verified Operator</div>
                                        </div>
                                    </div>
                                    <Button variant="link" className="px-0 mt-2 text-primary">
                                        View Vendor Profile
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
