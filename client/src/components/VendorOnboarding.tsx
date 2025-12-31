import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Check, ArrowRight, Upload, Building2, User } from 'lucide-react';

export const VendorOnboarding: React.FC = () => {
    const { navigateToVendorDashboard } = useAppState();
    const [step, setStep] = useState(1);
    const [verificationType, setVerificationType] = useState<'company' | 'individual'>('company');
    const [documents, setDocuments] = useState({
        license: null as File | null,
        aadharFront: null as File | null,
        aadharBack: null as File | null,
        pan: null as File | null,
        cheque: null as File | null
    });

    // Mock file upload handler
    const handleFileChange = (type: keyof typeof documents) => {
        // In a real app, this would handle the file object.
        // For mock, we just set a truthy value to simulate upload.
        setDocuments(prev => ({ ...prev, [type]: new File([""], "mock.jpg") }));
    };

    const handleNext = () => {
        if (step === 2) {
            if (verificationType === 'company' && !documents.license) {
                alert("Please upload your Business License / GST document.");
                return;
            }
            if (verificationType === 'individual' && (!documents.aadharFront || !documents.aadharBack || !documents.pan)) {
                alert("Please upload both Aadhar (Front & Back) and PAN card.");
                return;
            }
        }

        if (step === 3) {
            if (!documents.cheque) {
                alert("Please upload a Cancelled Cheque for payout verification.");
                return;
            }
        }

        if (step < 4) setStep(step + 1);
        else {
            // In real app, we would make an API call here to set status 'PENDING'
            // For now, we simulate by navigating but typically we'd show a persistent waiting screen on dashboard access if pending.
            // We'll simulate this by navigating to a "waiting" view or dashboard with pending state.
            navigateToVendorDashboard();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl mb-8">
                {/* Progress Steps */}
                <div className="flex justify-between items-center relative mb-12">
                    <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10" />
                    <div className={`active-line absolute left-0 top-1/2 h-1 bg-primary -z-10 transition-all duration-500`} style={{ width: `${((step - 1) / 3) * 100}%` }} />

                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors duration-300 ${step >= s ? 'bg-primary' : 'bg-gray-300'}`}>
                            {step > s ? <Check className="h-5 w-5" /> : s}
                        </div>
                    ))}
                </div>

                <Card className="border-none shadow-xl overflow-hidden">
                    <CardHeader className="text-center pb-8 border-b bg-white">
                        <CardTitle className="text-2xl font-bold">
                            {step === 1 && "Agency Details"}
                            {step === 2 && "Verify Business"}
                            {step === 3 && "Payout Setup"}
                            {step === 4 && "Create First Trip"}
                        </CardTitle>
                        <CardDescription>
                            {step === 1 && "Tell us about your travel agency."}
                            {step === 2 && "Upload documents to get verified."}
                            {step === 3 && "Where should we send your earnings?"}
                            {step === 4 && "Set up your first package to start selling."}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-8 min-h-[400px]">
                        {step === 1 && (
                            <>
                                <div className="space-y-2">
                                    <Label>Agency Name</Label>
                                    <Input placeholder="e.g. Dream Travels" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input placeholder="contact@agency.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone</Label>
                                        <Input placeholder="+91" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <textarea className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" placeholder="We specialize in..." />
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <RadioGroup defaultValue="company" onValueChange={(v) => setVerificationType(v as 'company' | 'individual')} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="company" id="company" className="peer sr-only" />
                                        <Label
                                            htmlFor="company"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                        >
                                            <Building2 className="mb-3 h-6 w-6" />
                                            Business / Agency
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="individual" id="individual" className="peer sr-only" />
                                        <Label
                                            htmlFor="individual"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                        >
                                            <User className="mb-3 h-6 w-6" />
                                            Individual Agent
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {verificationType === 'company' ? (
                                    <div
                                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${documents.license ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50 bg-gray-50/50'}`}
                                        onClick={() => handleFileChange('license')}
                                    >
                                        <div className={`p-4 rounded-full mb-4 ${documents.license ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                                            {documents.license ? <Check className="h-6 w-6" /> : <Upload className="h-6 w-6" />}
                                        </div>
                                        <h3 className="font-bold">{documents.license ? "License Uploaded" : "Upload License / GST"}</h3>
                                        <p className="text-sm text-gray-500 mt-2">{documents.license ? "Click to change" : "Drag & drop or click to upload PDF/JPG"}</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-4">
                                        <div
                                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${documents.aadharFront ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50 bg-gray-50/50'}`}
                                            onClick={() => handleFileChange('aadharFront')}
                                        >
                                            <div className={`p-3 rounded-full mb-2 ${documents.aadharFront ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                                                {documents.aadharFront ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
                                            </div>
                                            <h3 className="font-semibold text-sm">{documents.aadharFront ? "Aadhar Front Uploaded" : "Upload Aadhar Front"}</h3>
                                        </div>
                                        <div
                                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${documents.aadharBack ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50 bg-gray-50/50'}`}
                                            onClick={() => handleFileChange('aadharBack')}
                                        >
                                            <div className={`p-3 rounded-full mb-2 ${documents.aadharBack ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                                                {documents.aadharBack ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
                                            </div>
                                            <h3 className="font-semibold text-sm">{documents.aadharBack ? "Aadhar Back Uploaded" : "Upload Aadhar Back"}</h3>
                                        </div>

                                        <div
                                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${documents.pan ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50 bg-gray-50/50'}`}
                                            onClick={() => handleFileChange('pan')}
                                        >
                                            <div className={`p-3 rounded-full mb-2 ${documents.pan ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                                                {documents.pan ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
                                            </div>
                                            <h3 className="font-semibold text-sm">{documents.pan ? "PAN Card Uploaded" : "Upload PAN Card"}</h3>
                                            <p className="text-xs text-gray-400 mt-1">Official ID</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <>
                                <div className="space-y-2">
                                    <Label>Account Holder Name</Label>
                                    <Input placeholder="As per bank records" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Account Number</Label>
                                    <Input type="password" placeholder="XXXXXX" />
                                </div>
                                <div className="space-y-2">
                                    <Label>IFSC Code</Label>
                                    <Input placeholder="SBIN000..." />
                                </div>

                                <div className="space-y-2 pt-4">
                                    <Label>Cancelled Cheque</Label>
                                    <div
                                        className={`border-2 border-dashed rounded-md p-4 flex items-center justify-center text-center transition-colors cursor-pointer ${documents.cheque ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                        onClick={() => handleFileChange('cheque')}
                                    >
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            {documents.cheque ? <Check className="h-4 w-4 text-green-600" /> : <Upload className="h-4 w-4" />}
                                            <span>{documents.cheque ? "Cheque Uploaded" : "Upload Cancelled Cheque"}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Required for bank account verification.</p>
                                </div>
                            </>
                        )}

                        {step === 4 && (
                            <div className="text-center space-y-4 py-8">
                                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-yellow-600 mb-4 animate-pulse">
                                    <ShieldCheck className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Application Submitted!</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    Your documents are currently under review. You will be notified once your profile is approved.
                                </p>
                                <div className="pt-4 p-4 bg-blue-50 text-blue-800 text-sm rounded-lg max-w-md mx-auto">
                                    <p><strong>Note:</strong> You can explore the dashboard, but your trips will not be published until approval.</p>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    {/* Styled Footer for Navigation Buttons */}
                    <CardFooter className="bg-gray-50 border-t p-6">
                        <div className="flex gap-4 w-full">
                            {step > 1 && (
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(step - 1)}
                                    className="flex-1 border-gray-300 hover:bg-white hover:text-gray-900 font-medium"
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                onClick={handleNext}
                                className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20"
                            >
                                {step === 4 ? "Launch Dashboard" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};
