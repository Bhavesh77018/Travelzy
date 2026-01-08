// @ts-nocheck
import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, ArrowLeft, Mail, Phone, Calendar, DollarSign, FileText } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { toast } from 'sonner';

export const AdminVendorDetailPage: React.FC = () => {
    const {
        vendors,
        selectedDetailId,
        verifyVendor,
        navigateToAdminVendors
    } = useAppState();

    const vendor = vendors.find((v: any) => v.id === selectedDetailId);

    if (!vendor) {
        return <div>Vendor not found</div>;
    }

    const handleVerify = () => {
        verifyVendor(vendor.id);
        toast.success(`Vendor ${vendor.businessName} has been verified.`);
    };

    const handleReject = () => {
        // Ideally verifyVendor handles status toggle, or we add rejectVendor
        verifyVendor(vendor.id);
        toast.error(`Vendor ${vendor.businessName} has been rejected/revoked.`);
    };

    return (
        <div className="min-h-screen bg-muted/30 flex">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={navigateToAdminVendors}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{vendor.businessName}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {vendor.email}</span>
                                {vendor.mobile && <span className="flex items-center gap-1 ml-3"><Phone className="h-3 w-3" /> {vendor.mobile}</span>}
                            </div>
                        </div>
                        <div className="ml-auto">
                            <Badge className={`text-sm px-3 py-1 ${vendor.status === 'VERIFIED' ? 'bg-green-100 text-green-700' : vendor.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {vendor.status}
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Business Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Joined Date</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Calendar className="h-4 w-4 opacity-50" />
                                                <span>{vendor.joinedDate}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <DollarSign className="h-4 w-4 opacity-50" />
                                                <span>₹{vendor.revenue.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Verification Documents</CardTitle>
                                    <CardDescription>Review uploaded documents for KYC.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {vendor.documents && vendor.documents.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {vendor.documents.map((doc: any, idx: number) => (
                                                <div key={idx} className="border rounded-lg p-4 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium capitalize">{doc.type}</span>
                                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative overflow-hidden group">
                                                        {/* Placeholder for document preview */}
                                                        <img src={doc.urls[0] || "/placeholder.svg"} alt={doc.type} className="object-cover w-full h-full" />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Button variant="secondary" size="sm">View Full</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                            No documents uploaded.
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar Actions */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Verification Action</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700"
                                        onClick={handleVerify}
                                        disabled={vendor.status === 'VERIFIED'}
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" /> Approve Vendor
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                                        onClick={handleReject}
                                    >
                                        <XCircle className="mr-2 h-4 w-4" /> Reject Vendor
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
