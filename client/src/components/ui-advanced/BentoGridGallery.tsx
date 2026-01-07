
import React from 'react';
import { LazyImage } from './LazyImage';
import { Button } from '../ui/button';
import { Grid, ImageIcon } from 'lucide-react';

interface BentoGridGalleryProps {
    images: string[];
    className?: string;
}

export const BentoGridGallery: React.FC<BentoGridGalleryProps> = ({ images, className }) => {
    if (!images || images.length === 0) return null;

    const mainImage = images[0];
    const subImages = images.slice(1, 4);

    return (
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[60vh] rounded-3xl overflow-hidden ${className}`}>
            {/* Main Image - Takes 2 col on md */}
            <div className="md:col-span-2 md:row-span-2 relative group">
                <LazyImage
                    src={mainImage}
                    alt="Main view"
                    className="h-full w-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Sub Images */}
            <div className="hidden md:flex flex-col gap-4 md:col-span-1">
                {subImages[0] && (
                    <div className="h-1/2 relative group overflow-hidden">
                        <LazyImage src={subImages[0]} alt="Gallery 1" className="h-full w-full object-cover hover:scale-110" />
                    </div>
                )}
                {subImages[1] && (
                    <div className="h-1/2 relative group overflow-hidden">
                        <LazyImage src={subImages[1]} alt="Gallery 2" className="h-full w-full object-cover hover:scale-110" />
                    </div>
                )}
            </div>

            <div className="hidden md:flex flex-col gap-4 md:col-span-1">
                {subImages[2] && (
                    <div className="h-1/2 relative group overflow-hidden">
                        <LazyImage src={subImages[2]} alt="Gallery 3" className="h-full w-full object-cover hover:scale-110" />
                    </div>
                )}
                {/* 5th Slot - View All */}
                <div className="h-1/2 relative bg-gray-100 flex items-center justify-center cursor-pointer group overflow-hidden">
                    {images[4] ? (
                        <>
                            <LazyImage src={images[4]} alt="Gallery 4" className="h-full w-full object-cover opacity-80 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                                <Button variant="secondary" className="gap-2 pointer-events-none">
                                    <Grid className="h-4 w-4" /> View All Photos
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                            <ImageIcon className="h-8 w-8" />
                            <span className="font-medium">No more photos</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
