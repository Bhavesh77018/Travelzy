
import React, { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Plane, Mail, Lock, ArrowRight, User, Phone, Check } from 'lucide-react';
import { toast } from 'sonner';

export const VendorSignupPage: React.FC = () => {
    const { navigateToVendorOnboarding, navigateToCustomerHome, navigateToVendorLogin } = useAppState();
    const [isLoading, setIsLoading] = useState(false);

    // Auth Flow State
    const [step, setStep] = useState<'DETAILS' | 'OTP'>('DETAILS');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    });
    const [otp, setOtp] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.mobile || formData.mobile.length < 10) {
            toast.error("Please enter a valid mobile number.");
            return;
        }
        setIsLoading(true);
        // Simulate OTP API
        setTimeout(() => {
            setIsLoading(false);
            setStep('OTP');
            toast.success("OTP Sent! (Use 1234)", { duration: 5000 });
        }, 1500);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate Verification
        setTimeout(() => {
            if (otp === "1234") {
                toast.success("Account Verified!");
                navigateToVendorOnboarding();
            } else {
                toast.error("Invalid OTP. Try again.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div onClick={navigateToCustomerHome} className="absolute top-8 left-8 cursor-pointer flex items-center gap-2 font-black text-2xl tracking-tighter text-gray-900">
                <Plane className="h-6 w-6 text-primary" /> Travelzy<span className="text-primary">Partner</span>
            </div>

            <Card className="w-full max-w-md border-none shadow-xl">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">
                        {step === 'DETAILS' ? "Join as a Partner" : "Verify Mobile"}
                    </CardTitle>
                    <CardDescription>
                        {step === 'DETAILS' ? "Start growing your travel business today." : `Enter the OTP sent to +91 ${formData.mobile}`}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {step === 'DETAILS' ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="space-y-2">
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" className="pl-10" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="email" value={formData.email} onChange={handleChange} type="email" placeholder="name@agency.com" className="pl-10" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="mobile" value={formData.mobile} onChange={handleChange} type="tel" placeholder="Mobile Number" className="pl-10" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="password" value={formData.password} onChange={handleChange} type="password" placeholder="Create Password" className="pl-10" required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-cyan-700 mt-2" disabled={isLoading}>
                                {isLoading ? "Sending OTP..." : "Get OTP"} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div className="space-y-2 text-center">
                                <Input
                                    type="text"
                                    placeholder="Enter OTP (1234)"
                                    className="text-center text-2xl tracking-widest h-14"
                                    maxLength={4}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    autoFocus
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                    Didn't receive code? <span onClick={() => toast.info("Resending OTP...")} className="text-primary cursor-pointer hover:underline">Resend</span>
                                </p>
                            </div>
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                                {isLoading ? "Verifying..." : "Verify & Create Account"} <Check className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="ghost" type="button" onClick={() => setStep('DETAILS')} className="w-full">
                                Back to Details
                            </Button>
                        </form>
                    )}
                </CardContent>
                {step === 'DETAILS' && (
                    <CardFooter>
                        <div className="text-center text-sm text-gray-500 w-full">
                            Already have an account? <span onClick={navigateToVendorLogin} className="font-bold text-primary cursor-pointer hover:underline">Log in</span>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};
