"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageComponentProps {
    src: string;
    alt: string;
    className?: string;
    fallbackSrc?: string;
    loadingClassName?: string;
    errorClassName?: string;
    lazy?: boolean;
    priority?: boolean;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const ImageComponent: React.FC<ImageComponentProps> = ({
    src,
    alt,
    className = '',
    fallbackSrc = 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop&crop=center',
    loadingClassName = 'bg-gray-800 animate-pulse',
    errorClassName = 'bg-gray-800 flex items-center justify-center text-gray-400',
    lazy = true,
    priority = false,
    objectFit = 'cover'
}) => {
    const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [imageSrc, setImageSrc] = useState(src);

    const handleLoad = () => {
        setImageState('loaded');
    };

    const handleError = () => {
        setImageState('error');
        if (fallbackSrc && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setImageState('loading');
        }
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {imageState === 'loading' && (
                <div className={`absolute inset-0 ${loadingClassName}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                </div>
            )}
            
            {imageState === 'error' && (
                <div className={`absolute inset-0 ${errorClassName}`}>
                    <span className="text-sm">Image not available</span>
                </div>
            )}

            <Image
                src={imageSrc}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                loading={priority ? undefined : (lazy ? 'lazy' : 'eager')}
                fill
                className={`w-full h-full object-${objectFit} opacity-100 scale-100`}
                sizes="100vw"
                priority={priority}
                unoptimized={imageSrc.startsWith('http') && !imageSrc.startsWith(process.env.NEXT_PUBLIC_IMAGE_DOMAIN || '')}
            />
        </div>
    );
};

export default ImageComponent;
