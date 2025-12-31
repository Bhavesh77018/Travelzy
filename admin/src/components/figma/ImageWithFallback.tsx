import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '../../utils/cn'; // We need to create util/cn

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    alt,
    className,
    fallbackSrc = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    ...props
}) => {
    const [error, setError] = useState(false);

    return (
        <div className={cn("relative overflow-hidden bg-muted", className)}>
            {!error ? (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setError(true)}
                    className="h-full w-full object-cover"
                    {...props}
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                </div>
            )}
        </div>
    );
};
