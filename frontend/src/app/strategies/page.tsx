
"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Logo from "../_components/Logo";
import SectionLayout from "../_components/SectionLayout";
import VideoComponent from "../_components/VideoComponent";
import { animationVariants } from "../constants/animations";
import { spacing, typography } from '../constants/styles';
import { COLORS } from '../styles/theme';
import { JSX } from '@emotion/react/jsx-runtime';
import ThemeButton from '../_components/ThemeButton';
import Link from 'next/link';
import SectionHeader from '../_components/SectionHeader';
import TabsComponent from './_components/TabsComponent';
import AccordionComponent from './_components/AccordionComponent';
import { Typography } from '@mui/material';
import Popup from '../_components/Popup';



export default function Strategies() {

    return (
        <main>
            <SectionLayout1 />

            {/* Vertical Dashed Line Divider */}
            <div className="bg-black flex justify-center py-8">
                <div className="w-px h-[8rem] border-l-2 border-dashed border-white border-opacity-30"></div>
            </div>

            <SectionLayout2 />
            <SectionLayout3 />
        </main>
    );
}

function SectionLayout1(): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <SectionLayout
            backgroundVariant="none"
            contentAlignment="center"
            className='bg-black'
        >
            <motion.div variants={animationVariants.scale} className="relative flex justify-center">
                <Logo />  <span className='ml-1 text-2xl font-semibold'>: Strategies </span>
            </motion.div>
            {/* Main Heading */}
            <motion.div variants={animationVariants.slideUp}>
                <h1 className={`${typography.serif} ${typography.heading.hero} ${typography.colors.white} bg-gradient-to-br from-white via-gray-100 to-[${COLORS.ACCENT_HEX}] bg-clip-text text-transparent mb-4`}>
                    Strategy that works harder.
                    So you don't have to.
                </h1>
            </motion.div>

            {/* Video Section */}
            <motion.div
                variants={animationVariants.slideUp}
                className="w-full max-w-4xl mx-auto mt-8"
            >
                <VideoComponent
                    src="/RH25_Strategies_GTM_dotcom_productHeader_1900X1183_v43.webm"
                    className="rounded-2xl overflow-hidden shadow-2xl"
                    autoPlay={true}
                    muted={true}
                    loop={false}
                    showLastFrame={true}
                    controls={false}
                    onVideoEnd={() => { }}
                />
            </motion.div>
            {/* Content section */}
            <p className={`${typography.phonic} ${typography.body.large} ${typography.colors.gray} ${spacing.maxWidth.text}`}>
                Define your financial goals and Robinhood Strategies will deliver a tailored, expert-managed portfolio. Follow current market trends, always know why your money moves, and invest with confidence.
            </p>
            <p className={`${typography.phonic} ${typography.body.small} font-light ${typography.colors.whiteFaded} ${spacing.maxWidth.xsmall} hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2`}
                onClick={() => setIsModalOpen(true)}>
                <InfoIcon sx={{ fontSize: 16 }} />
                For Illustrative purposes only. Not an actual customer account or portfolio.
            </p>
            <ThemeButton
                component={Link}
                href="/signup"
                variant='primary'
                sx={{
                    mt: 4,
                    px: 4,
                    py: 2,
                    borderRadius: '25px',
                    '&:hover': {
                        backgroundColor: COLORS.ACCENT_HOVER,
                    },
                }}
            >
                Get Started
            </ThemeButton>
            <Popup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="About future projections" description="Future projection uses Monte Carlo simulations to project a range of hypothetical market return scenarios, based on a historical performance analysis of asset class returns. Future projection is a feature available to Robinhood Strategies clients for informational purposes and is not intended to be a recommendation to invest in any security, or engage in any investment strategy. Past performance is not indicative of future results. All investing involves risk and loss of principal is possible." />

        </SectionLayout>
    );
};
function SectionLayout2(): JSX.Element {
    return (
        <SectionLayout
            backgroundVariant="none"
            contentAlignment="center"
            className='bg-black py-16'
        >
            <h2
                className={`${typography.phonic} ${typography.colors.white} ${typography.heading.large}`}
            >
                Cutting-edge tech meets human expertise
            </h2>
            <div className="mt-24">
                <TabsComponent />
            </div>
        </SectionLayout>
    )

}

// SectionLayout3 Component - FAQ Section
function SectionLayout3(): JSX.Element {
    return (
        <SectionLayout
            backgroundVariant="none"
            contentAlignment="center"
            className='bg-black py-16'
        >
            <motion.div variants={animationVariants.slideUp}>
                <h2 className={`${typography.phonic} ${typography.colors.white} ${typography.heading.large} mb-12`}>
                    Frequently Asked Questions
                </h2>
            </motion.div>

            <motion.div
                variants={animationVariants.slideUp}
                className="w-full"
            >
                <AccordionComponent />
            </motion.div>
        </SectionLayout>
    );
}
