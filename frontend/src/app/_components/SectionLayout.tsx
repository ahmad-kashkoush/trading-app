"use client"
import { animationVariants, VIEWPORT_CONFIG } from "../constants/animations";
import { spacing } from "../constants/styles";
import ImageComponent from "./ImageComponent";
import { motion } from 'framer-motion';

// Reusable Section Component Interface
export interface SectionLayoutProps {
    id?: string;
    children: React.ReactNode;
    className?: string;
    backgroundVariant?: 'default' | 'alternate' | 'accent' | 'none';
    showDecorations?: boolean;
    contentAlignment?: 'left' | 'center' | 'right';
    backgroundImage?: string;
    imagePosition?: 'left' | 'right' | 'center' | 'background';
    imageSize?: 'small' | 'medium' | 'large' | 'cover' | 'contain';
    overlay?: boolean;
}

// Reusable Section Component
const SectionLayout: React.FC<SectionLayoutProps> = ({
    id,
    children,
    className = '',
    backgroundVariant = 'default',
    showDecorations = true,
    contentAlignment = 'center',
    backgroundImage,
    imagePosition = 'background',
    imageSize = 'cover',
    overlay = false
}) => {
    const getBackgroundClasses = () => {
        switch (backgroundVariant) {
            case 'alternate':
                return 'bg-gradient-to-br from-gray-900 to-black';
            case 'accent':
                return 'bg-gradient-to-br from-black via-gray-900 to-green-950';
            case 'default':
                return 'bg-gradient-to-br from-black to-gray-800';
            case 'none':
                return '';
        }
    };

    const getContentAlignment = () => {
        switch (contentAlignment) {
            case 'left':
                return 'items-start text-left';
            case 'right':
                return 'items-end text-right';
            default:
                return 'items-center text-center';
        }
    };

    const getImageSizeClasses = () => {
        switch (imageSize) {
            case 'small':
                return 'w-64 h-64 md:w-80 md:h-80';
            case 'medium':
                return 'w-80 h-80 md:w-96 md:h-96';
            case 'large':
                return 'w-96 h-96 md:w-[500px] md:h-[500px]';
            case 'cover':
                return 'w-full h-full object-cover';
            case 'contain':
                return 'w-full h-full object-contain';
            default:
                return 'w-full h-auto';
        }
    };

    const getLayoutClasses = () => {
        if (imagePosition === 'left' || imagePosition === 'right') {
            return `flex flex-col ${imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`;
        }
        return 'flex flex-col items-center';
    };

    return (
        <motion.section
            id={id}
            variants={animationVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className={`relative min-h-screen ${getBackgroundClasses()} overflow-hidden ${className}`}
            style={backgroundImage && imagePosition === 'background' ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: imageSize === 'contain' ? 'contain' : 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            } : undefined}
        >
            {/* Overlay for background images */}
            {overlay && backgroundImage && imagePosition === 'background' && (
                <div className="absolute inset-0 bg-black/80 z-0" />
            )}

            <div className={`${spacing.container} flex flex-col justify-center min-h-screen relative z-10 ${getContentAlignment()}`}>
                <div className={`${spacing.maxWidth.content} ${spacing.section} ${getLayoutClasses()}`}>
                    {/* Image Section (when positioned left/right/center) */}
                    {backgroundImage && imagePosition !== 'background' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className={`${imagePosition === 'center' ? 'w-full flex justify-center mb-8' : 'flex-shrink-0'}`}
                        >
                            <ImageComponent
                                src={backgroundImage}
                                alt="Section visual"
                                className={`${getImageSizeClasses()} rounded-2xl shadow-2xl ${imagePosition === 'center' ? 'mx-auto' : ''}`}
                            />
                        </motion.div>
                    )}

                    {/* Content Section */}
                    <div className={`${imagePosition === 'left' || imagePosition === 'right' ? 'flex-1' : 'w-full'} ${spacing.section}`}>
                        {children}
                    </div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            {showDecorations && (
                <>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                        className="absolute top-1/5 -right-1/10 w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-radial from-[#ccff0022] to-transparent -z-10"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.05, scale: 1 }}
                        transition={{ duration: 2, delay: 1.5 }}
                        className="absolute bottom-1/10 -left-1/6 w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-radial from-[#ccff0011] to-transparent -z-10"
                    />
                </>
            )}
        </motion.section>
    );
};

export default SectionLayout;