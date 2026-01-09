import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { useAppState } from '../../hooks/useAppState';
import { VendorService } from '../../services/VendorService';
import { toast } from 'sonner';
import { User, Mail, Globe, Phone, MapPin, Building, Camera } from 'lucide-react';

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
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="pl-64 transition-all duration-300">
                <main className="p-8 max-w-[1600px] mx-auto min-h-screen">
                    <header className="mb-8">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Agency Profile</h1>
                        <p className="text-slate-500 mt-1">Manage your public business profile and settings.</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Preview Card */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-xl shadow-gray-200/50 bg-white overflow-hidden rounded-3xl">
                                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>
                                <CardContent className="px-6 pb-6 pt-0 relative">
                                    <div className="flex flex-col items-center -mt-12 mb-4">
                                        <div className="h-24 w-24 rounded-2xl bg-white p-1.5 shadow-lg relative group cursor-pointer">
                                            <div className="h-full w-full bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                                                <Building className="h-8 w-8 text-slate-400" />
                                                {/* Placeholder for uploaded image */}
                                            </div>
                                            <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        <h2 className="text-xl font-black text-slate-900 mt-3 text-center">{formData.businessName || 'Your Agency Name'}</h2>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Verified Vendor</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                                <Mail className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <div className="truncate">{formData.email}</div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                                <Globe className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <div className="truncate">{formData.website || 'Add your website'}</div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                                <Phone className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <div className="truncate">{formData.phone || 'Add phone number'}</div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                                <MapPin className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <div className="truncate">{formData.address || 'Add business address'}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-lg shadow-gray-200/50 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl overflow-hidden p-6 relative">
                                <div className="relative z-10">
                                    <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                                    <p className="text-slate-300 text-sm mb-4">Contact our priority support team for assistance with your profile.</p>
                                    <Button size="sm" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-lg w-full">Contact Support</Button>
                                </div>
                            </Card>
                        </div>

                        {/* Edit Form */}
                        <div className="lg:col-span-2">
                            <Card className="border-none shadow-xl shadow-gray-200/50 bg-white rounded-3xl overflow-hidden">
                                <CardHeader className="border-b border-gray-100 bg-slate-50/50 px-8 py-6">
                                    <CardTitle>Edit details</CardTitle>
                                    <CardDescription>Update your business information visible to customers.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Agency Name</label>
                                            <Input
                                                name="businessName"
                                                value={formData.businessName}
                                                onChange={handleChange}
                                                className="bg-slate-50 border-slate-200 focus:bg-white transition-all h-11 rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Contact Email</label>
                                            <Input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled
                                                className="bg-slate-100 border-slate-200 text-slate-500 h-11 rounded-xl cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Bio / Description</label>
                                        <textarea
                                            name="description"
                                            className="w-full min-h-[120px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Tell travelers about your agency..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Website</label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    placeholder="https://www.example.com"
                                                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all h-11 rounded-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Phone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+91 98765 43210"
                                                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all h-11 rounded-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-bold text-slate-700">Business Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    placeholder="123 Business Park, City, State"
                                                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all h-11 rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 px-8 font-bold shadow-lg shadow-blue-600/20">
                                            {loading ? 'Saving Changes...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
