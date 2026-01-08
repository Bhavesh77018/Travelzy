import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { useAppState } from '../../hooks/useAppState';
import { VendorService } from '../../services/VendorService';
import { toast } from 'sonner';

export const ProfileManagement: React.FC = () => {
    const { vendorUser, token, setVendorUser } = useAppState();
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        businessName: vendorUser?.businessName || '',
        email: vendorUser?.email || '',
        description: vendorUser?.description || '',
        website: vendorUser?.website || '',
        phone: vendorUser?.phone || '',
        address: vendorUser?.address || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const updated = await VendorService.updateProfile(token!, formData);
            setVendorUser({ ...vendorUser, ...updated }); // Update context
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="pl-64">
                <header className="bg-white border-b border-gray-100 px-8 py-6">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Agency Profile</h1>
                    <p className="text-gray-500">Manage your business details and settings.</p>
                </header>

                <main className="p-8 max-w-4xl">
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Business Information</CardTitle>
                            <CardDescription>Public details visible to travelers.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Agency Name</label>
                                    <Input name="businessName" value={formData.businessName} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Contact Email</label>
                                    <Input name="email" value={formData.email} onChange={handleChange} disabled />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Bio / Description</label>
                                <textarea
                                    name="description"
                                    className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Website</label>
                                    <Input name="website" value={formData.website} onChange={handleChange} placeholder="https://" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91" />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-sm font-medium">Address</label>
                                    <Input name="address" value={formData.address} onChange={handleChange} />
                                </div>
                            </div>
                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
};
