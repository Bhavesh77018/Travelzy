
import React, { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Plane, Mail, Lock, ArrowRight } from 'lucide-react';

export const VendorLoginPage: React.FC = () => {
    const { navigateToVendorDashboard, navigateToCustomerHome, navigateToVendorSignup } = useAppState();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            navigateToVendorDashboard();
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div onClick={navigateToCustomerHome} className="absolute top-8 left-8 cursor-pointer flex items-center gap-2 font-black text-2xl tracking-tighter text-gray-900">
                <Plane className="h-6 w-6 text-primary" /> Travelzy<span className="text-primary">Partner</span>
            </div>

            <Card className="w-full max-w-md border-none shadow-xl">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Button variant="outline" className="w-full h-11 relative" onClick={handleLogin}>
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 absolute left-4" />
                            Continue with Google
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input type="email" placeholder="name@agency.com" className="pl-10" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input type="password" placeholder="Password" className="pl-10" required />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-cyan-700" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-center text-sm text-gray-500 w-full">
                        Don't have an account? <span onClick={navigateToVendorSignup} className="font-bold text-primary cursor-pointer hover:underline">Sign up</span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};
