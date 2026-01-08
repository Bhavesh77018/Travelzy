// @ts-nocheck
import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { toast } from 'sonner';

export const AdminVendorsPage: React.FC = () => {
    const { vendors, verifyVendor, navigateToVendorDetail } = useAppState();

    const handleVerify = async (id: string, currentlyVerified: boolean) => {
        if (currentlyVerified) {
            // Revoke
            await verifyVendor(id, 'REJECTED', 'Revoked by admin');
            toast.info("Vendor revoked");
        } else {
            // Verify
            await verifyVendor(id, 'VERIFIED');
            toast.success("Vendor verified successfully");
        }
    };

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
                                    <TableRow key={vendor.id || vendor._id}>
                                        <TableCell className="font-medium">{vendor.businessName}</TableCell>
                                        <TableCell>{vendor.email}</TableCell>
                                        <TableCell>{vendor.joinedDate ? new Date(vendor.joinedDate).toLocaleDateString() : 'N/A'}</TableCell>
                                        <TableCell>₹{(vendor.revenue || 0).toLocaleString()}</TableCell>
                                        <TableCell>
                                            {vendor.status === 'VERIFIED' ? (
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Verified</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200">{vendor.status || 'Unverified'}</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant={vendor.status === 'VERIFIED' ? "outline" : "default"}
                                                onClick={() => handleVerify(vendor.id || vendor._id, vendor.status === 'VERIFIED')}
                                                className={vendor.status === 'VERIFIED' ? "text-red-500 hover:text-red-600" : "bg-green-600 hover:bg-green-700"}
                                            >
                                                {vendor.status === 'VERIFIED' ? (
                                                    <><XCircle className="mr-2 h-4 w-4" /> Revoke</>
                                                ) : (
                                                    <><CheckCircle className="mr-2 h-4 w-4" /> Verify</>
                                                )}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => navigateToVendorDetail(vendor.id || vendor._id)}
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
