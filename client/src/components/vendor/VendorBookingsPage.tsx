import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Badge } from '../ui/badge';
import { Calendar, User, CheckCircle, XCircle } from 'lucide-react';

export const VendorBookingsPage: React.FC = () => {
    const { navigateToVendorDashboard, bookings, updateBookingStatus } = useAppState();

    const handleStatusUpdate = (id: string, status: 'CONFIRMED' | 'CANCELLED') => {
        updateBookingStatus(id, status);
        // In a real app we'd show a toast here
    };

    return (
        <div className="min-h-screen bg-muted/30 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
                        <p className="text-muted-foreground mt-2">Manage incoming reservations and customer trips.</p>
                    </div>
                    <Button variant="outline" onClick={navigateToVendorDashboard}>Back to Dashboard</Button>
                </div>

                {/* Data Table */}
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Booking ID</TableHead>
                                <TableHead>Trip Name</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Travel Date</TableHead>
                                <TableHead>Guests</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-mono text-xs">{booking.id}</TableCell>
                                    <TableCell className="font-medium">{booking.trip}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="h-3 w-3 text-muted-foreground" />
                                            {booking.customer}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3 text-muted-foreground" />
                                            {booking.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>{booking.guests}</TableCell>
                                    <TableCell>₹{booking.total.toLocaleString()}</TableCell>
                                    <TableCell>
                                        {booking.status === 'CONFIRMED' && <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200">Confirmed</Badge>}
                                        {booking.status === 'PENDING' && <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200">Pending</Badge>}
                                        {booking.status === 'CANCELLED' && <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">Cancelled</Badge>}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {booking.status === 'PENDING' && (
                                                <>
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                        title="Approve"
                                                        onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        title="Reject"
                                                        onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                            {booking.status === 'CONFIRMED' && (
                                                <Button size="sm" variant="ghost">Details</Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
