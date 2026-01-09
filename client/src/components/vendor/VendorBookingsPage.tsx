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
import { Calendar, User, CheckCircle, XCircle, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Sidebar } from './Sidebar';

export const VendorBookingsPage: React.FC = () => {
    const { bookings, updateBookingStatus } = useAppState();

    const handleStatusUpdate = (id: string, status: 'CONFIRMED' | 'CANCELLED') => {
        updateBookingStatus(id, status);
        // In a real app we'd show a toast here
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="pl-64 transition-all duration-300">
                <main className="p-8 max-w-[1600px] mx-auto min-h-screen">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Booking Management</h1>
                            <p className="text-slate-500 mt-1">Track reservations and manage customer trips.</p>
                        </div>
                    </div>

                    {/* Filters & Actions */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by booking ID, customer name..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 gap-2 rounded-xl h-10">
                                <Filter className="h-4 w-4" /> Filter
                            </Button>
                            <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 gap-2 rounded-xl h-10">
                                Export List
                            </Button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="hover:bg-transparent border-slate-100">
                                    <TableHead className="font-bold text-slate-500 h-12">Booking ID</TableHead>
                                    <TableHead className="font-bold text-slate-500 h-12">Trip Info</TableHead>
                                    <TableHead className="font-bold text-slate-500 h-12">Customer</TableHead>
                                    <TableHead className="font-bold text-slate-500 h-12">Date & Guests</TableHead>
                                    <TableHead className="font-bold text-slate-500 h-12">Total Amount</TableHead>
                                    <TableHead className="font-bold text-slate-500 h-12">Status</TableHead>
                                    <TableHead className="text-right font-bold text-slate-500 h-12">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookings.map((booking) => (
                                    <TableRow key={booking.id} className="hover:bg-blue-50/30 border-slate-100 transition-colors group">
                                        <TableCell className="font-mono text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                                            #{booking.id.slice(0, 8).toUpperCase()}
                                        </TableCell>
                                        <TableCell className="font-bold text-slate-900">{booking.trip}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                                                    {booking.customer.slice(0, 2)}
                                                </div>
                                                <span className="font-medium text-slate-700">{booking.customer}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                                                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                    {booking.date}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                    <User className="h-3.5 w-3.5 text-slate-400" />
                                                    {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold text-slate-900">₹{booking.total.toLocaleString()}</TableCell>
                                        <TableCell>
                                            {booking.status === 'CONFIRMED' && (
                                                <Badge className="bg-emerald-100 text-emerald-700 border-none shadow-none hover:bg-emerald-200">
                                                    Confirmed
                                                </Badge>
                                            )}
                                            {booking.status === 'PENDING' && (
                                                <Badge className="bg-amber-100 text-amber-700 border-none shadow-none hover:bg-amber-200">
                                                    Pending
                                                </Badge>
                                            )}
                                            {booking.status === 'CANCELLED' && (
                                                <Badge className="bg-red-50 text-red-600 border-none shadow-none hover:bg-red-100">
                                                    Cancelled
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2 items-center">
                                                {booking.status === 'PENDING' ? (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            className="h-8 px-3 bg-emerald-500 hover:bg-emerald-600 text-white border-0 rounded-lg shadow-sm font-bold text-xs"
                                                            onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                                                        >
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 px-3 border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs"
                                                            onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </div>
        </div>
    );
};
