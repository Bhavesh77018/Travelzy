import React from 'react';
import { Plus, Edit2, Trash2, MoreHorizontal } from 'lucide-react';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Clock } from 'lucide-react';

export const VendorTripsPage: React.FC = () => {
    const { navigateToVendorDashboard, navigateToVendorAddTrip, trips, deleteTrip } = useAppState();

    // Filter for 'my' trips - in this mock, we assume all trips are ours or we could filter by vendorId if we added it
    const myTrips = trips;

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this trip?')) {
            deleteTrip(id);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Trips</h1>
                        <p className="text-muted-foreground mt-2">Manage your travel packages and inventory.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={navigateToVendorDashboard}>Back to Dashboard</Button>
                        <Button onClick={navigateToVendorAddTrip} className="gap-2">
                            <Plus className="h-4 w-4" /> Create New Trip
                        </Button>
                    </div>
                </div>

                {/* Data Table */}
                <Tabs defaultValue="active" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                        <TabsTrigger value="active">Active Trips ({myTrips.filter(t => t.status !== 'PENDING' && t.status !== 'REJECTED').length})</TabsTrigger>
                        <TabsTrigger value="pending">Pending Approval ({myTrips.filter(t => t.status === 'PENDING').length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="active">
                        <div className="rounded-xl border bg-card text-card-foreground shadow">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Trip Name</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {myTrips.filter(t => t.status !== 'PENDING' && t.status !== 'REJECTED').length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                No active trips found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        myTrips.filter(t => t.status !== 'PENDING' && t.status !== 'REJECTED').map((trip) => (
                                            <TableRow key={trip.id}>
                                                <TableCell className="font-medium">{trip.title}</TableCell>
                                                <TableCell>{trip.destination}</TableCell>
                                                <TableCell>₹{trip.price.toLocaleString()}</TableCell>
                                                <TableCell>{trip.duration} Days</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                                                        Active
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>★ {trip.rating}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem className="cursor-pointer">
                                                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="cursor-pointer text-red-600 focus:text-red-600"
                                                                onClick={() => handleDelete(trip.id)}
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        )))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="pending">
                        <div className="rounded-xl border bg-card text-card-foreground shadow">
                            {myTrips.filter(t => t.status === 'PENDING').length === 0 ? (
                                <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
                                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                                        <Clock className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">No Pending Trips</h3>
                                    <p>Trips waiting for admin approval will appear here.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Trip Name</TableHead>
                                            <TableHead>Destination</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Submitted On</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {myTrips.filter(t => t.status === 'PENDING').map((trip) => (
                                            <TableRow key={trip.id}>
                                                <TableCell className="font-medium">{trip.title}</TableCell>
                                                <TableCell>{trip.destination}</TableCell>
                                                <TableCell>₹{trip.price.toLocaleString()}</TableCell>
                                                <TableCell>Just now</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                                        <Clock className="w-3 h-3 mr-1" /> Pending Approval
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(trip.id)} className="text-red-500">
                                                        Cancel
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg flex items-start gap-3">
                            <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Approval Process</h4>
                                <p className="text-sm mt-1">Trips are usually reviewed within 24-48 hours. Ensure all details and images meet our community guidelines to avoid rejection.</p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
