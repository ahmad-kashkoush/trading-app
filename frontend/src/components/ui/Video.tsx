"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoComponentProps {
    src: string;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    showLastFrame?: boolean;
    onVideoEnd?: () => void;
    poster?: string; // Optional poster image
    controls?: boolean; // Show video controls
    playOnScroll?: boolean; // Play video when it comes into view (first time)
}

const VideoComponent: React.FC<VideoComponentProps> = ({
    src,
    className = '',
    autoPlay = true,
    muted = true,
    loop = false,
    showLastFrame = true,
    onVideoEnd,
    poster,
    controls = false,
    playOnScroll = false
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isEnded, setIsEnded] = useState(false);
    const [lastFrameUrl, setLastFrameUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasPlayedOnScroll, setHasPlayedOnScroll] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleVideoEnd = () => {
            if (showLastFrame) {
                captureLastFrame();
            }
            setIsEnded(true);
            onVideoEnd?.();
        };

        const handleLoadedData = () => {
            setIsLoading(false);
            // Only auto-play if not using playOnScroll mode
            if (autoPlay && !playOnScroll) {
                video.play().catch(console.error);
            }
        };

        const handleCanPlay = () => {
            setIsLoading(false);
        };

        const captureLastFrame = () => {
            const canvas = canvasRef.current;
            if (!canvas || !video) return;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0);
                const dataURL = canvas.toDataURL('image/jpeg', 0.9);
                setLastFrameUrl(dataURL);
            }
        };

        video.addEventListener('ended', handleVideoEnd);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('canplay', handleCanPlay);

        // Cleanup
        return () => {
            video.removeEventListener('ended', handleVideoEnd);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, [autoPlay, showLastFrame, onVideoEnd, playOnScroll]);

    // Intersection Observer for playOnScroll
    useEffect(() => {
        if (!playOnScroll || hasPlayedOnScroll) return;

        const container = containerRef.current;
        const video = videoRef.current;
        if (!container || !video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasPlayedOnScroll) {
                        setHasPlayedOnScroll(true);
                        video.play().catch(console.error);
                    }
                });
            },
            {
                threshold: 0.5, // Play when 50% of the video is visible
                rootMargin: '0px'
            }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, [playOnScroll, hasPlayedOnScroll]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <canvas ref={canvasRef} className="hidden" />

            {/* Video Element */}
            <motion.video
                ref={videoRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: isEnded && showLastFrame ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                controls={controls}
                playsInline
                preload="metadata"
                poster={poster}
                onLoadStart={() => setIsLoading(true)}
            >
                <source src={src} type="video/webm" />
                <source src={src.replace('.webm', '.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
            </motion.video>

            {/* Last Frame Thumbnail */}
            {isEnded && showLastFrame && lastFrameUrl && (
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={lastFrameUrl}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}
        </div>
    );
};

export default VideoComponent;
