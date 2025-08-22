"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageComponentProps {
    src: string;
    alt: string;
    className?: string;
    fallbackSrc?: string;
    loadingClassName?: string;
    errorClassName?: string;
    lazy?: boolean;
    priority?: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
    src,
    alt,
    className = '',
    fallbackSrc = 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop&crop=center',
    loadingClassName = 'bg-gray-800 animate-pulse',
    errorClassName = 'bg-gray-800 flex items-center justify-center text-gray-400',
    lazy = true,
    priority = false
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

            <motion.img
                src={imageSrc}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                loading={lazy ? 'lazy' : priority ? 'eager' : 'lazy'}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                    opacity: imageState === 'loaded' ? 1 : 0,
                    scale: imageState === 'loaded' ? 1 : 1.1
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default ImageComponent;
