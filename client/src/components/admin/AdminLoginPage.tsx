import React, { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const AdminLoginPage: React.FC = () => {
    const { navigateToAdminDashboard } = useAppState();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simple hardcoded check for demonstration
        setTimeout(() => {
            if (formData.email === 'admin@travelzy.com' && formData.password === 'admin123') {
                toast.success("Welcome back, Admin!");
                navigateToAdminDashboard();
            } else {
                toast.error("Invalid credentials. Try admin@travelzy.com / admin123");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-0 -left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 -right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <div className="z-10 flex flex-col items-center mb-8">
                <div className="bg-slate-800 p-3 rounded-xl mb-4 shadow-lg border border-slate-700">
                    <ShieldCheck className="h-10 w-10 text-cyan-400" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Travelzy <span className="text-cyan-400">Internal</span></h1>
                <p className="text-slate-400">Authorized Personnel Only</p>
            </div>

            <Card className="w-full max-w-sm bg-slate-800 border-slate-700 z-10 shadow-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl text-white">Sign In</CardTitle>
                    <CardDescription className="text-slate-400">
                        Access the master control panel
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                <Input
                                    type="email"
                                    placeholder="admin@travelzy.com"
                                    className="pl-10 bg-slate-900 border-slate-600 text-white focus:border-cyan-400"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 bg-slate-900 border-slate-600 text-white focus:border-cyan-400"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" disabled={isLoading}>
                            {isLoading ? "Authenticating..." : "Access Dashboard"} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="mt-8 text-xs text-slate-600">
                &copy; 2024 Travelzy Inc. Internal System v1.0.0
            </div>
        </div>
    );
};
