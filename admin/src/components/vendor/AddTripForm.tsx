import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { toast } from 'sonner';

export const AddTripForm: React.FC = () => {
    const { navigateToVendorTrips, addTrip } = useAppState();

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
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPricing(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, type: value }));
    };

    // --- Itinerary Logic ---
    const addDay = () => {
        setItinerary(prev => [...prev, { day: prev.length + 1, title: '', activities: [''] }]);
    };

    const updateDayTitle = (index: number, title: string) => {
        const newItinerary = [...itinerary];
        newItinerary[index].title = title;
        setItinerary(newItinerary);
    };

    const updateActivity = (dayIndex: number, actIndex: number, value: string) => {
        const newItinerary = [...itinerary];
        newItinerary[dayIndex].activities[actIndex] = value;
        setItinerary(newItinerary);
    };

    const addActivity = (dayIndex: number) => {
        const newItinerary = [...itinerary];
        newItinerary[dayIndex].activities.push('');
        setItinerary(newItinerary);
    };

    const removeActivity = (dayIndex: number, actIndex: number) => {
        const newItinerary = [...itinerary];
        newItinerary[dayIndex].activities.splice(actIndex, 1);
        setItinerary(newItinerary);
    };

    // --- Inclusions/Exclusions Logic ---
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

    const addListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[]) => {
        setter([...list, '']);
    };

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
            price: parseInt(pricing.double), // Base price on double sharing
            type: (formData.type as any) || 'leisure',
            description: formData.description,
            image: formData.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
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
            }
        };

        // Note: We need to update the Trip interface in types.ts to support 'pricing' object if we want strict typing,
        // but for now we are passing it to the context which might ignore it if typed strictly.
        // Assuming addTrip handles it or we update types later.

        addTrip(newTrip as any);
        toast.success("Trip published successfully!");
    };

    return (
        <div className="min-h-screen bg-muted/30 p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={navigateToVendorTrips}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create New Trip</h1>
                        <p className="text-muted-foreground">Fill in the details to publish a new travel package.</p>
                    </div>
                </div>

                <div className="grid gap-6">
                    {/* Basic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Trip Title</Label>
                                <Input id="title" value={formData.title} onChange={handleChange} placeholder="e.g. Magical Ladakh Adventure" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="destination">Destination</Label>
                                    <Input id="destination" value={formData.destination} onChange={handleChange} placeholder="e.g. Leh, India" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="duration">Duration (Days)</Label>
                                    <Input id="duration" type="number" value={formData.duration} onChange={handleChange} placeholder="7" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type">Trip Type</Label>
                                <Select onValueChange={handleSelectChange}>
                                    <SelectTrigger>
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
                        </CardContent>
                    </Card>

                    {/* Pricing Structure */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing Structure (Per Person)</CardTitle>
                            <CardDescription>Enter prices for different sharing options.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="double">Double Sharing (Base)*</Label>
                                    <Input id="double" type="number" value={pricing.double} onChange={handlePricingChange} placeholder="₹ 24999" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="triple">Triple Sharing</Label>
                                    <Input id="triple" type="number" value={pricing.triple} onChange={handlePricingChange} placeholder="₹ 22999" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="quad">Quad Sharing</Label>
                                    <Input id="quad" type="number" value={pricing.quad} onChange={handlePricingChange} placeholder="₹ 20999" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="single">Single Occupancy</Label>
                                    <Input id="single" type="number" value={pricing.single} onChange={handlePricingChange} placeholder="₹ 35999" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Itinerary Builder */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Day-wise Itinerary</CardTitle>
                            <CardDescription>Plan out the trip day by day.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {itinerary.map((day, dIndex) => (
                                <div key={dIndex} className="border rounded-lg p-4 space-y-3 bg-gray-50/50">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full text-sm">
                                            {day.day}
                                        </span>
                                        <Input
                                            placeholder="Day Title (e.g. Arrival in Leh)"
                                            value={day.title}
                                            onChange={(e) => updateDayTitle(dIndex, e.target.value)}
                                            className="font-medium"
                                        />
                                    </div>
                                    <div className="pl-11 space-y-2">
                                        {day.activities.map((act, aIndex) => (
                                            <div key={aIndex} className="flex gap-2">
                                                <Input
                                                    placeholder="Activity details..."
                                                    value={act}
                                                    onChange={(e) => updateActivity(dIndex, aIndex, e.target.value)}
                                                    className="bg-white"
                                                />
                                                <Button variant="ghost" size="icon" onClick={() => removeActivity(dIndex, aIndex)} className="text-red-400 hover:text-red-500 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button variant="link" size="sm" onClick={() => addActivity(dIndex)} className="text-primary px-0">
                                            + Add Activity
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addDay} className="w-full border-dashed border-2">
                                <Plus className="h-4 w-4 mr-2" /> Add Next Day
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Inclusions & Exclusions */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-green-600">Inclusions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {inclusions.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input value={item} onChange={(e) => updateList(setInclusions, inclusions, index, e.target.value)} placeholder="e.g. Breakfast & Dinner" />
                                        <Button variant="ghost" size="icon" onClick={() => removeListItem(setInclusions, inclusions, index)} className="text-red-400">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="link" onClick={() => addListItem(setInclusions, inclusions)}>+ Add Inclusion</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-red-600">Exclusions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {exclusions.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input value={item} onChange={(e) => updateList(setExclusions, exclusions, index, e.target.value)} placeholder="e.g. Personal Expenses" />
                                        <Button variant="ghost" size="icon" onClick={() => removeListItem(setExclusions, exclusions, index)} className="text-red-400">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="link" onClick={() => addListItem(setExclusions, exclusions)}>+ Add Exclusion</Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Media */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Media</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Describe the experience..." className="min-h-[150px]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image">Cover Image URL</Label>
                                <Input id="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4 sticky bottom-4 z-10 bg-white/80 backdrop-blur-md p-4 rounded-xl border shadow-lg">
                        <Button variant="outline" onClick={navigateToVendorTrips}>Cancel</Button>
                        <Button className="gap-2" onClick={handleSubmit}>
                            <Save className="h-4 w-4" /> Publish Trip
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
