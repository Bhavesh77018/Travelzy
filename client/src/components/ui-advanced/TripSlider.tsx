import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Heart, Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyImage } from './LazyImage';
// import { cn } from '../../utils/cn';

interface TripSliderProps {
    trips: any[];
    onTripClick: (id: string) => void;
}

export const TripSlider: React.FC<TripSliderProps> = ({ trips, onTripClick }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: false });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (!trips.length) return null;

    return (
        <div className="relative group">
            {/* Controls (Centered & Reveal on Hover) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between pointer-events-none px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollPrev}
                    className="pointer-events-auto rounded-full h-12 w-12 bg-white/90 hover:bg-white text-slate-900 border-0 shadow-xl backdrop-blur-md transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollNext}
                    className="pointer-events-auto rounded-full h-12 w-12 bg-white/90 hover:bg-white text-slate-900 border-0 shadow-xl backdrop-blur-md transform translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>

            <div className="overflow-hidden px-1 -mx-1" ref={emblaRef}>
                <div className="flex gap-6 py-4">
                    {trips.map((trip) => (
                        <div key={trip.id} className="min-w-[300px] md:min-w-[340px] flex-[0_0_auto]" onClick={() => onTripClick(trip.id)}>
                            <Card className="group h-full border-0 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden rounded-[2rem] bg-white cursor-pointer relative">
                                {/* Image with Gradient Overlay */}
                                <div className="relative h-72 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity" />
                                    <LazyImage
                                        src={trip.images?.[0] || ''}
                                        alt={trip.title}
                                        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors cursor-pointer border border-white/10 shadow-sm">
                                            <Heart className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4 z-20">
                                        <Badge className="bg-cyan-500/90 backdrop-blur-md text-white border-0 shadow-lg font-semibold px-3 py-1">
                                            {trip.duration} Days
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20 text-white w-[calc(100%-2rem)]">
                                        <div className="flex items-center gap-1.5 mb-2 bg-black/20 backdrop-blur-sm w-fit px-2 py-0.5 rounded-full border border-white/10">
                                            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                                            <span className="text-xs font-medium tracking-wide truncate max-w-[150px]">{trip.destination}</span>
                                        </div>
                                        <h3 className="font-bold text-xl leading-tight text-white group-hover:text-cyan-200 transition-colors line-clamp-1 drop-shadow-sm">{trip.title}</h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 pt-4 bg-white relative">
                                    <div className="flex justify-between items-center mb-4">
                                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
                                            {trip.category || 'Experience'}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                                            <Star className="h-4 w-4 fill-current" />
                                            {trip.rating}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 border-dashed">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Starting from</span>
                                            <span className="text-2xl font-black text-slate-800 tracking-tight">
                                                ₹{trip.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <Button className="rounded-full h-10 px-6 bg-slate-900 text-white shadow-lg shadow-slate-900/20 group-hover:bg-cyan-600 group-hover:shadow-cyan-500/30 transition-all duration-300 font-semibold">
                                            Book
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
