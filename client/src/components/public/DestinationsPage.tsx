import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const POPULAR_DESTINATIONS = [
    { title: 'Ladakh', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80', count: 42 },
    { title: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', count: 35 },
    { title: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80', count: 28 },
    { title: 'Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80', count: 19 },
    { title: 'Himachal', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80', count: 56 },
    { title: 'Andaman', image: 'https://images.unsplash.com/photo-1589330273594-fade1ee916e3?w=800&q=80', count: 12 },
];

export const DestinationsPage: React.FC = () => {
    const { navigateToCustomerHome } = useAppState();

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={navigateToCustomerHome}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-4xl font-black tracking-tight">Explore Destinations</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {POPULAR_DESTINATIONS.map((dest) => (
                        <div key={dest.title} className="group cursor-pointer relative aspect-video overflow-hidden rounded-2xl">
                            <ImageWithFallback
                                src={dest.image}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-2xl font-bold">{dest.title}</h3>
                                <p className="flex items-center gap-2 text-sm opacity-90">
                                    <MapPin className="h-3 w-3" /> {dest.count} Trips Available
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
