"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { typography, buttonClasses } from '@/constants/styles';
import ThemeButton from '@/_components/ThemeButton';
import Popup from '@/_components/Popup';
import InfoIcon from '@mui/icons-material/Info';

interface CardProps {
    title: string;
    description: string;
    disclaimerText?: string;
    disclaimerTitle?: string;
    disclaimerDescription?: string;
    ctaText: string;
    smallText: string;
    className?: string;
    onCtaClick?: () => void;
    backgroundImage: string;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    disclaimerText = '',
    disclaimerTitle = '',
    disclaimerDescription = '',
    ctaText,
    smallText,
    backgroundImage = '',
    className = '',
    onCtaClick
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={`relative min-h-[700px] w-full   bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:border-[var(--accent-color)]/30 group overflow-hidden ${className}`}
                style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>

                {/* Background overlay for better text readability */}
                {backgroundImage && (
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 rounded-3xl" />
                )}

                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col mx-auto px-12">
                    {/* Heading */}
                    <h3 className={`${typography.serif} ${typography.heading.medium} ${typography.colors.white} mb-4`}>
                        {title}
                    </h3>

                    {/* Description */}
                    <p className={`${typography.phonic} ${typography.body.medium} ${typography.colors.gray} mb-6 flex-grow`}>
                        {description}
                    </p>

                    {/* Disclaimer with popup */}
                    {disclaimerText !== '' &&
                        <p className={`${typography.phonic} ${typography.body.small} ${typography.colors.whiteFaded} hover:text-white transition-colors cursor-pointer flex items-center gap-2 mb-6`}
                            onClick={() => setIsModalOpen(true)}>
                            <InfoIcon sx={{ fontSize: 16 }} />
                            {disclaimerText}
                        </p>
                    }

                    {/* CTA Button */}
                    <ThemeButton
                        variant="primary"
                        className={`${buttonClasses.base} ${buttonClasses.primary} ${buttonClasses.sizes.medium}`}
                        onClick={onCtaClick}
                    >
                        {ctaText}
                    </ThemeButton>

                    {/* Very small text */}
                    <p className={`${typography.phonic} text-xs ${typography.colors.whiteFaded} leading-tight mt-6`}>
                        {smallText}
                    </p>
                </div>
            </div>

            {/* Modal */}
            {disclaimerText !== '' && <Popup
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                title={disclaimerTitle}
                description={disclaimerDescription}
            />
            }
        </>
    );
};

export default Card;
