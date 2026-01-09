import React from 'react';
import { Plus, Edit2, Trash2, MoreHorizontal, MapPin, Clock, Star, Calendar, ArrowUpRight } from 'lucide-react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from '../ui/card';

export const VendorTripsPage: React.FC = () => {
    const { navigateToVendorDashboard, navigateToVendorAddTrip, trips, deleteTrip } = useAppState();

    const myTrips = trips;

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this trip?')) {
            deleteTrip(id);
        }
    };

    const TripCard = ({ trip }: { trip: any }) => (
        <Card className="group border-none shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white cursor-pointer h-full flex flex-col">
            <div className="relative h-48 bg-slate-200 overflow-hidden">
                <img
                    src={trip.image || `https://source.unsplash.com/800x600/?${trip.destination},travel`}
                    alt={trip.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className={`backdrop-blur-md shadow-sm ${trip.status === 'PENDING' ? 'bg-amber-500/90 text-white' :
                        trip.status === 'REJECTED' ? 'bg-red-500/90 text-white' : 'bg-emerald-500/90 text-white'
                        }`}>
                        {trip.status === 'PENDING' ? 'Under Review' : trip.status}
                    </Badge>
                </div>

                <div className="absolute bottom-3 left-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs font-semibold bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg w-fit mb-1">
                        <MapPin className="h-3 w-3" /> {trip.destination}
                    </div>
                </div>
            </div>

            <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors">
                        {trip.title}
                    </h3>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-slate-400 hover:text-slate-600">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                                <Edit2 className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={(e) => handleDelete(trip.id, e)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Trip
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{trip.duration} Days</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-slate-700 font-medium">{trip.rating}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Starting from</p>
                        <p className="text-xl font-black text-slate-900">₹{trip.price.toLocaleString()}</p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full border-slate-200 hover:bg-slate-900 hover:text-white group/btn">
                        Details <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="pl-64 transition-all duration-300">
                <main className="p-8 max-w-[1600px] mx-auto min-h-screen">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Trip Management</h1>
                            <p className="text-slate-500 mt-1">Curate and manage your travel packages.</p>
                        </div>
                        <Button onClick={navigateToVendorAddTrip} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-6 shadow-lg shadow-blue-600/20 font-bold transition-all hover:scale-105 active:scale-95">
                            <Plus className="h-5 w-5 mr-2" /> Create New Trip
                        </Button>
                    </div>

                    <Tabs defaultValue="active" className="w-full space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                            <TabsList className="bg-slate-100 p-1 rounded-xl h-auto flex-1 sm:flex-none">
                                <TabsTrigger value="active" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md font-medium transition-all">
                                    Active Trips <span className="ml-2 bg-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-full">{myTrips.filter(t => t.status !== 'PENDING' && t.status !== 'REJECTED').length}</span>
                                </TabsTrigger>
                                <TabsTrigger value="pending" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-md font-medium transition-all">
                                    Pending Approval <span className="ml-2 bg-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-full">{myTrips.filter(t => t.status === 'PENDING').length}</span>
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex items-center gap-2 px-4 text-sm text-slate-500 font-medium">
                                <span>Sort by:</span>
                                <select className="bg-transparent border-none text-slate-900 font-bold focus:ring-0 cursor-pointer">
                                    <option>Newest First</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <TabsContent value="active" className="outline-none mt-0">
                            {myTrips.filter(t => t.status !== 'PENDING' && t.status !== 'REJECTED').length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <MapPin className="h-10 w-10 text-slate-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">No active trips yet</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto mt-2 mb-8">Start building your catalog to reach thousands of travelers.</p>
                                    <Button onClick={navigateToVendorAddTrip} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                        Create your first trip
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {myTrips.filter(t => t.status !== 'PENDING' && t.status !== 'REJECTED').map((trip) => (
                                        <TripCard key={trip.id} trip={trip} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="pending" className="outline-none mt-0">
                            {myTrips.filter(t => t.status === 'PENDING').length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                                    <div className="bg-amber-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Clock className="h-10 w-10 text-amber-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">No pending approvals</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto mt-2">All your submitted trips have been processed.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {myTrips.filter(t => t.status === 'PENDING').map((trip) => (
                                        <TripCard key={trip.id} trip={trip} />
                                    ))}
                                </div>
                            )}
                            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex items-start gap-4">
                                <div className="bg-blue-600 text-white p-2 rounded-lg mt-1 shrink-0">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-900 text-lg">Approval Process</h4>
                                    <p className="text-blue-700/80 mt-1 max-w-2xl">
                                        Our team reviews every trip to ensure quality standards. Approvals typically take 24-48 hours.
                                        You'll receive a notification once your trip is live.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
};
