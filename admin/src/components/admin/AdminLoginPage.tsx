import React, { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
// Reuse the client AuthService or create an admin specific one. Client one works if URL is same.
// But we need to import it. Since this is admin repo, we need to check if we have access to shared validation or just copy logic.
// For now, let's implement the fetch call directly here or create AdminAuthService if better structure needed.
import { API_BASE_URL } from '../../config';

export const AdminLoginPage: React.FC = () => {
    const { navigateToAdminDashboard } = useAppState();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Check if user is admin
                if (data.role === 'admin') {
                    // Store token? The AppState context usually handles user, but for now lets rely on simple navigation
                    // Ideally we should setToken(data.token) in context.
                    // Let's assume for this MVP we just navigate and maybe store in localStorage if we implemented fetch wrappers.
                    // Detailed Auth implementation would involve updating Context to hold Token.

                    // Simple hack for now: Store in localStorage so services can pick it up
                    localStorage.setItem('adminToken', data.token);

                    toast.success("Welcome back, Admin!");
                    navigateToAdminDashboard();
                } else {
                    toast.error("Access Denied: You are not an administrator.");
                }
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Failed to connect to server. Ensure backend is running.");
        } finally {
            setIsLoading(false);
        }
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
