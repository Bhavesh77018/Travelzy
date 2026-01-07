
import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    overlay?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, overlay = false, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        // In a real scenario, you might fetch a tiny blurhash or low-res placeholder here.
        // For now, we just rely on standard loading.
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
    }, [src]);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            <img
                src={src}
                alt={alt}
                className={cn(
                    "h-full w-full object-cover transition-all duration-700 ease-in-out",
                    isLoaded ? "scale-100 blur-0" : "scale-110 blur-xl grayscale",
                    className
                )}
                {...props}
            />
            {overlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
            )}
        </div>
    );
};
