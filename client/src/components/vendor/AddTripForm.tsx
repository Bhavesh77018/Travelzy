import React, { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Sidebar } from './Sidebar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import {
    Calendar,
    MapPin,
    DollarSign,
    Clock,
    Plane,
    Camera,
    CheckCircle2,
    Plus,
    Trash2,
    ArrowRight,
    ArrowLeft,
    Image as ImageIcon
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { cn } from '../../utils/cn';

export const AddTripForm: React.FC = () => {
    const { navigateToVendorTrips, addTrip } = useAppState();
    const [currentStep, setCurrentStep] = useState(1);

    // State wrappers
    const [formData, setFormData] = useState({
        title: '',
        destination: '',
        duration: '',
        type: '',
        description: '',
        image: ''
    });

    const [pricing, setPricing] = useState({
        single: '',
        double: '',
        triple: '',
        quad: ''
    });

    const [itinerary, setItinerary] = useState<{ day: number; title: string; activities: string[] }[]>([
        { day: 1, title: '', activities: [''] }
    ]);

    const [inclusions, setInclusions] = useState<string[]>(['']);
    const [exclusions, setExclusions] = useState<string[]>(['']);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPricing({ ...pricing, [e.target.id]: e.target.value });
    };

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, type: value });
    };

    // Itinerary helpers
    const addDay = () => setItinerary([...itinerary, { day: itinerary.length + 1, title: '', activities: [''] }]);
    const updateDayTitle = (idx: number, val: string) => {
        const newItin = [...itinerary];
        newItin[idx].title = val;
        setItinerary(newItin);
    };
    const updateActivity = (dIdx: number, aIdx: number, val: string) => {
        const newItin = [...itinerary];
        newItin[dIdx].activities[aIdx] = val;
        setItinerary(newItin);
    };
    const addActivity = (dIdx: number) => {
        const newItin = [...itinerary];
        newItin[dIdx].activities.push('');
        setItinerary(newItin);
    };
    const removeActivity = (dIdx: number, aIdx: number) => {
        const newItin = [...itinerary];
        newItin[dIdx].activities.splice(aIdx, 1);
        setItinerary(newItin);
    };

    // Inclusions/Exclusions helpers
    const updateList = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        list: string[],
        index: number,
        value: string
    ) => {
        const newList = [...list];
        newList[index] = value;
        setter(newList);
    };
    const addListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[]) => setter([...list, '']);
    const removeListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[], index: number) => {
        const newList = [...list];
        newList.splice(index, 1);
        setter(newList);
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.destination || !pricing.double || !formData.duration) {
            toast.error("Please fill in required fields (Title, Dest, Duration, Double Sharing Price).");
            return;
        }

        const newTrip = {
            id: `t${Date.now()}`,
            title: formData.title,
            destination: formData.destination,
            duration: parseInt(formData.duration),
            price: parseInt(pricing.double),
            type: (formData.type as any) || 'leisure',
            description: formData.description,
            images: [formData.image],
            rating: 0,
            reviews: 0,
            itinerary: itinerary.map(day => ({
                day: day.day,
                title: day.title,
                activities: day.activities.filter(a => a.trim() !== '')
            })),
            inclusions: inclusions.filter(i => i.trim() !== ''),
            exclusions: exclusions.filter(e => e.trim() !== ''),
            dates: [],
            pricing: {
                single: parseInt(pricing.single) || 0,
                double: parseInt(pricing.double) || 0,
                triple: parseInt(pricing.triple) || 0,
                quad: parseInt(pricing.quad) || 0
            },
            status: 'PENDING'
        };

        addTrip(newTrip as any);
        toast.success("Trip submitted for approval!");
        // We do typically navigate, but user asked 'enhance the page after create trips'. 
        // Maybe keeping them here with a success state is better? 
        // Or redirecting to Trips page which now shows pending trips.
        navigateToVendorTrips();
    };

    const steps = [
        { id: 1, label: 'Basics', icon: Plane },
        { id: 2, label: 'Itinerary', icon: Calendar },
        { id: 3, label: 'Pricing', icon: DollarSign },
        { id: 4, label: 'Details', icon: CheckCircle2 }
    ];

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="pl-64 transition-all duration-300">
                <main className="p-8 max-w-5xl mx-auto min-h-screen">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="ghost" size="icon" onClick={navigateToVendorTrips} className="hover:bg-slate-200 rounded-full">
                            <ArrowLeft className="h-5 w-5 text-slate-700" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create New Trip</h1>
                            <p className="text-slate-500 mt-1">Design a new travel experience for your customers.</p>
                        </div>
                    </div>

                    {/* Stepper */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full" />
                            <div
                                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500"
                                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                            />
                            {steps.map((step) => (
                                <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                                    <div className={cn(
                                        "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                        currentStep >= step.id
                                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30"
                                            : "bg-white border-slate-300 text-slate-400"
                                    )}>
                                        <step.icon className="h-5 w-5" />
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold uppercase tracking-wider transition-colors",
                                        currentStep >= step.id ? "text-blue-700" : "text-slate-400"
                                    )}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}
                    <Card className="border-none shadow-xl shadow-gray-200/50 bg-white rounded-3xl overflow-hidden min-h-[500px] flex flex-col">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                            <CardTitle className="text-xl font-bold text-slate-800">
                                {steps[currentStep - 1].label} Information
                            </CardTitle>
                            <CardDescription>Fill in the details below.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 flex-1">
                            {currentStep === 1 && (
                                <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title" className="text-slate-700 font-bold">Trip Title</Label>
                                        <Input id="title" value={formData.title} onChange={handleChange} placeholder="e.g. Magical Ladakh Adventure" className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-100" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="destination" className="text-slate-700 font-bold">Destination</Label>
                                            <Input id="destination" value={formData.destination} onChange={handleChange} placeholder="e.g. Leh, India" className="h-12 rounded-xl" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="duration" className="text-slate-700 font-bold">Duration (Days)</Label>
                                            <Input id="duration" type="number" value={formData.duration} onChange={handleChange} placeholder="7" className="h-12 rounded-xl" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="type" className="text-slate-700 font-bold">Trip Type</Label>
                                        <Select onValueChange={handleSelectChange}>
                                            <SelectTrigger className="h-12 rounded-xl">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="adventure">Adventure</SelectItem>
                                                <SelectItem value="leisure">Leisure</SelectItem>
                                                <SelectItem value="family">Family</SelectItem>
                                                <SelectItem value="romantic">Romantic</SelectItem>
                                                <SelectItem value="cultural">Cultural</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="image" className="text-slate-700 font-bold">Cover Image URL</Label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                            <Input id="image" value={formData.image} onChange={handleChange} placeholder="https://..." className="pl-12 h-12 rounded-xl" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="space-y-6">
                                        {itinerary.map((day, dIndex) => (
                                            <div key={dIndex} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative group hover:shadow-md transition-shadow">
                                                <div className="absolute -left-3 top-6 h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-600/20">
                                                    {day.day}
                                                </div>
                                                <div className="ml-6 space-y-4">
                                                    <Input
                                                        placeholder="Day Title (e.g. Arrival in Leh)"
                                                        value={day.title}
                                                        onChange={(e) => updateDayTitle(dIndex, e.target.value)}
                                                        className="font-bold text-lg border-transparent bg-transparent hover:bg-white focus:bg-white transition-colors h-10 px-2 -ml-2 rounded-lg"
                                                    />
                                                    <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-1">
                                                        {day.activities.map((act, aIndex) => (
                                                            <div key={aIndex} className="flex gap-2 items-center">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                                                                <Input
                                                                    placeholder="Activity details..."
                                                                    value={act}
                                                                    onChange={(e) => updateActivity(dIndex, aIndex, e.target.value)}
                                                                    className="flex-1 bg-white h-10 rounded-lg border-slate-200"
                                                                />
                                                                <Button variant="ghost" size="icon" onClick={() => removeActivity(dIndex, aIndex)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full h-8 w-8">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                        <Button variant="ghost" size="sm" onClick={() => addActivity(dIndex)} className="text-blue-600 hover:bg-blue-50 font-bold text-xs h-8">
                                                            + Add Activity
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button onClick={addDay} variant="outline" className="w-full border-dashed border-2 border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 py-8 rounded-2xl flex flex-col gap-2">
                                        <Plus className="h-6 w-6" />
                                        <span className="font-bold">Add Day {itinerary.length + 1}</span>
                                    </Button>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl space-y-4 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10"><DollarSign className="h-24 w-24 text-blue-600" /></div>
                                        <Label htmlFor="double" className="text-blue-900 font-bold">Double Sharing (Base)*</Label>
                                        <Input id="double" type="number" value={pricing.double} onChange={handlePricingChange} placeholder="₹ 24999" className="bg-white border-blue-200 h-12 text-lg font-bold text-blue-900 placeholder:font-normal" />
                                        <p className="text-xs text-blue-700/60">This is the primary price displayed on cards.</p>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                                        <Label htmlFor="triple" className="text-slate-700 font-bold">Triple Sharing</Label>
                                        <Input id="triple" type="number" value={pricing.triple} onChange={handlePricingChange} placeholder="₹ 22999" className="bg-white h-11" />
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                                        <Label htmlFor="quad" className="text-slate-700 font-bold">Quad Sharing</Label>
                                        <Input id="quad" type="number" value={pricing.quad} onChange={handlePricingChange} placeholder="₹ 20999" className="bg-white h-11" />
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                                        <Label htmlFor="single" className="text-slate-700 font-bold">Single Occupancy</Label>
                                        <Input id="single" type="number" value={pricing.single} onChange={handlePricingChange} placeholder="₹ 35999" className="bg-white h-11" />
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                                <h3 className="font-bold text-slate-800">Inclusions</h3>
                                            </div>
                                            {inclusions.map((item, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <Input value={item} onChange={(e) => updateList(setInclusions, inclusions, index, e.target.value)} placeholder="e.g. Breakfast & Dinner" className="bg-emerald-50/50 border-emerald-100 focus:ring-emerald-200" />
                                                    <Button variant="ghost" size="icon" onClick={() => removeListItem(setInclusions, inclusions, index)} className="text-slate-400 hover:text-red-500">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button variant="link" onClick={() => addListItem(setInclusions, inclusions)} className="text-emerald-600 pl-0 font-bold text-xs">+ Add Inclusion</Button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Trash2 className="h-5 w-5 text-red-500" />
                                                <h3 className="font-bold text-slate-800">Exclusions</h3>
                                            </div>
                                            {exclusions.map((item, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <Input value={item} onChange={(e) => updateList(setExclusions, exclusions, index, e.target.value)} placeholder="e.g. Personal Expenses" className="bg-red-50/50 border-red-100 focus:ring-red-200" />
                                                    <Button variant="ghost" size="icon" onClick={() => removeListItem(setExclusions, exclusions, index)} className="text-slate-400 hover:text-red-500">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button variant="link" onClick={() => addListItem(setExclusions, exclusions)} className="text-red-600 pl-0 font-bold text-xs">+ Add Exclusion</Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="font-bold text-slate-700">Detailed Description</Label>
                                        <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Describe the experience..." className="min-h-[150px] rounded-2xl bg-slate-50 border-slate-200 p-4" />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-between">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="rounded-xl border-slate-300 text-slate-600 font-bold"
                            >
                                Previous
                            </Button>

                            {currentStep < 4 ? (
                                <Button onClick={nextStep} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 px-8">
                                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button onClick={handleSubmit} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 px-8">
                                    <CheckCircle2 className="mr-2 h-4 w-4" /> Publish Trip
                                </Button>
                            )}
                        </div>
                    </Card>
                </main>
            </div>
        </div>
    );
};
