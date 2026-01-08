// @ts-nocheck
import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';

export const AdminVendorsPage: React.FC = () => {
    const { vendors, verifyVendor, navigateToVendorDetail } = useAppState();

    return (
        <div className="min-h-screen bg-muted/30 flex">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
                            <p className="text-muted-foreground">Verify and manage vendor accounts.</p>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Business Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Joined Date</TableHead>
                                    <TableHead>Revenue</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vendors.map((vendor: any) => (
                                    <TableRow key={vendor.id}>
                                        <TableCell className="font-medium">{vendor.businessName}</TableCell>
                                        <TableCell>{vendor.email}</TableCell>
                                        <TableCell>{vendor.joinedDate}</TableCell>
                                        <TableCell>₹{vendor.revenue.toLocaleString()}</TableCell>
                                        <TableCell>
                                            {vendor.isVerified ? (
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Verified</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200">Unverified</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant={vendor.isVerified ? "outline" : "default"}
                                                onClick={() => verifyVendor(vendor.id)}
                                                className={vendor.isVerified ? "text-red-500 hover:text-red-600" : "bg-green-600 hover:bg-green-700"}
                                            >
                                                {vendor.isVerified ? (
                                                    <><XCircle className="mr-2 h-4 w-4" /> Revoke</>
                                                ) : (
                                                    <><CheckCircle className="mr-2 h-4 w-4" /> Verify</>
                                                )}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => navigateToVendorDetail(vendor.id)}
                                                className="ml-2"
                                            >
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};
