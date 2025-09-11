"use client"
import Card from "@/app/gold/_components/Card"
import { Popup, Button as ThemeButton, Video as VideoComponent } from "@/components/ui"
import { SectionLayout, AccordionSection } from "@/components/layout"
import { animationVariants } from "@/styles/animations"
import { buttonClasses, spacing, typography } from "@/styles"
import InfoIcon from '@mui/icons-material/Info'
import { motion } from "framer-motion"
import { useEffect, useState } from "react"


export default function Gold() {


    useEffect(() => {
        document.body.classList.add('theme-gold');

        // Cleanup: remove theme when component unmounts
        return () => {
            document.body.classList.remove('theme-gold');
        };
    }, []);

    return <main>
        <SectionLayout1 />
        <SectionLayout2 />
        <SectionLayout3 />
        <SectionLayout4 />
        <AccordionSection />
    </main>
}
function SectionLayout1() {
    // Apply gold theme when component mounts
    const [isModalOpen, setIsModalOpen] = useState(false);
    return <SectionLayout
        id="trading-features"
        backgroundVariant="alternate"
        showDecorations={false}
        contentAlignment="center"
        backgroundImage="/web_gold_hero_1.5x.jpeg"
        imagePosition="background"
    // overlay={true}
    >
        <div className="flex w-full">
            {/* Left column for image */}
            <div className="flex-1">
                {/* Section Header */}
                <motion.div variants={animationVariants.slideUp} className={`${spacing.section} text-left`}>
                    {/* Accent Color Heading */}
                    <h3 className={`${typography.phonic} ${typography.accent.small} ${typography.colors.white}`}>
                        PROFESSIONAL TRADING
                    </h3>

                    {/* Gold Heading */}
                    <h2 className={`${typography.serif} ${typography.heading.hero} ${typography.colors.accent}`}>
                        The New Gold Standard
                    </h2>

                    {/* Paragraph */}
                    <p className={`${typography.phonic} ${typography.body.large} ${typography.colors.gray}`}>
                        Supercharge your cash with rates and products usually reserved for the 1% — Only $5/month.
                    </p>
                </motion.div>
                {/* Disclosure with popup */}
                <p className={`mt-4 ${typography.phonic} ${typography.body.small} font-light ${typography.colors.whiteFaded} ${spacing.maxWidth.xsmall} hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2`}
                    onClick={() => setIsModalOpen(true)}>
                    <InfoIcon sx={{ fontSize: 16 }} />
                    For Illustrative purposes only. Not an actual customer account or portfolio.
                </p>

                {/* CTA */}
                <motion.div variants={animationVariants.slideUp} className={`${spacing.margins.top.medium} text-left`}>
                    <ThemeButton
                        variant="secondary"
                        className={`${buttonClasses.base} ${buttonClasses.secondary}`}

                    >
                        Start Trading Today
                    </ThemeButton>
                </motion.div>
            </div>
            {/* Empty left column */}
            <div className="flex-1"></div>

        </div>
        <Popup
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title="Robinhood Gold Disclosures"
            description="Robinhood Gold is a subscription-based membership program of premium services offered through Robinhood Gold, LLC." />

    </SectionLayout>
}
function SectionLayout2() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return <SectionLayout
        backgroundVariant="none"
        contentAlignment="center"
        className='bg-black'
    >

        {/* Video Section */}
        <motion.div
            variants={animationVariants.slideUp}
            className="w-full max-w-4xl mx-auto mt-8"
        >
            <VideoComponent
                src="/_RH24_Gold-productPage_4_Module_NoBoost_web_1440x900_v003.webm"
                className="rounded-2xl overflow-hidden shadow-2xl"
                autoPlay={false}
                muted={true}
                loop={false}
                showLastFrame={true}
                controls={false}
                playOnScroll={true}
                onVideoEnd={() => { }}
            />
        </motion.div>
        <motion.div>

            {/* Header */}
            <h2 className={`${typography.phonic} ${typography.colors.goldFaded} ${typography.heading.large} mb-12 max-w-2xl mx-auto`}>
                Make the most
                of your uninvested cash with 4% APY
            </h2>
            {/* Paragraph */}
            <p className={` ${typography.body.large} ${typography.colors.white}`}>
                Supercharge your cash with rates and products usually reserved for the 1% — Only $5/month.
            </p>
            {/* Disclosure with popup */}
            <p className={`mt-4 ${typography.phonic} ${typography.body.small} font-light ${typography.colors.whiteFaded} ${spacing.maxWidth.xsmall} hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2`}
                onClick={() => setIsModalOpen(true)}>
                <InfoIcon sx={{ fontSize: 16 }} />
                For Illustrative purposes only. Not an actual customer account or portfolio.
            </p>
        </motion.div>
        {/* CTA */}
        <motion.div variants={animationVariants.slideUp} className={`${spacing.margins.top.medium} text-center`}>
            <ThemeButton
                variant="secondary"
                className={`${buttonClasses.base} ${buttonClasses.secondary}`}
            >
                Get started
            </ThemeButton>
        </motion.div>

        {/* Modal */}
        <Popup
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title="Robinhood Gold Disclosures"
            description="Robinhood Gold is a subscription-based membership program of premium services offered through Robinhood Gold, LLC."
        />

    </SectionLayout>
}
function SectionLayout3() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return <SectionLayout
        backgroundImage="/web_gold_ret.jpeg"
        imageSize="cover"
        contentAlignment="center"
        className="h-[175vh]"
    >
        <div className="flex flex-col justify-start items-center h-full">
            <motion.div variants={animationVariants.slideUp} className={`${spacing.section} text-center`}>
                {/* Heading */}
                <h2 className={`${typography.serif} ${typography.heading.large} ${typography.colors.goldFaded} max-w-3xl mb-6`}>
                    Boost your retirement with Robinhood Gold
                </h2>

                {/* Description */}
                <p className={`${typography.phonic} ${typography.body.large} ${typography.colors.gray} max-w-3xl mx-auto mb-4`}>
                    You contribute, we boost. Get a 3% match on annual contributions. That&apos;s $210 when maxing out your 2025 IRA contribution limit.
                </p>

                {/* Disclosure with popup */}
                <p className={`${typography.phonic} ${typography.body.small} font-light ${typography.colors.whiteFaded} hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2`}
                    onClick={() => setIsModalOpen(true)}>
                    <InfoIcon sx={{ fontSize: 16 }} />
                    Subscription ($5/month) and limitations apply
                </p>
            </motion.div>

            {/* CTA */}
            <motion.div variants={animationVariants.slideUp} className={`${spacing.margins.top.medium} text-center`}>
                <ThemeButton
                    variant="secondary"
                    className={`${buttonClasses.base} ${buttonClasses.secondary}`}
                >
                    Get Started
                </ThemeButton>
            </motion.div>
        </div>

        {/* Modal */}
        <Popup
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title="Subscription ($5/month) and limitations apply"
            description="$210 match available to Robinhood Gold customers making the maximum 2025 IRA contribution by the IRS tax deadline. Robinhood does not provide tax advice; consult a tax adviser.

IRS contribution limit for 2025 is $7,000 ($8,000 if you're age 50 or older). Visit the IRS site for more information. The annual tax filing deadline typically is April 15th but may vary by year or individual taxpayer circumstances. All IRA contributions count toward your annual limit.

The 3% matching on contributions requires a subscription with Robinhood Gold ($5/mo) and customers must stay subscribed to Gold for 1 year after your first Gold match to keep the full Gold match. The funds that earned the match must be kept in the account for at least 5 years to avoid a potential Early IRA Match Removal Fee. Match rate subject to change. Non-Gold customers receive a 1% match. For more information refer to the IRA Match FAQ."
        />
    </SectionLayout>;
}
function SectionLayout4() {
    return <SectionLayout
        backgroundVariant="default"
        contentAlignment="center"
        showDecorations={true}
        // className="h-[100vh]"
    >
        <div className="w-full h-full flex flex-col">
            {/* Section Header with SectionLayout3 style */}
            <motion.div variants={animationVariants.slideUp} className={`${spacing.section} text-center mb-12`}>
                <h2 className={`${typography.serif} ${typography.heading.large} ${typography.colors.goldFaded} max-w-3xl mx-auto`}>
                    Maximize your money&apos;s potential.
                </h2>
            </motion.div>

            {/* 2 Column Card Layout */}
            <motion.div
                variants={animationVariants.slideUp}
                className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto flex-1"
            >
                {/* Card 1 */}
                <Card
                    title="Smart Investing"
                    description="Diversify your portfolio with intelligent investment strategies designed to maximize returns while minimizing risk through advanced algorithms."
                    disclaimerText="Learn more about our investment strategies."
                    disclaimerTitle="Investment Strategies"
                    disclaimerDescription="Our investment strategies are designed to help you achieve your financial goals while managing risk."
                    ctaText="Join the waitlist"
                    smallText="Min. investment $1. SIPC protected."
                    backgroundImage="value_prop_credit_card.jpg"
                />

                <Card
                    title="Premium Benefits"
                    description="Unlock exclusive features including priority support, advanced analytics, and premium research tools to elevate your trading experience."
                    ctaText="Upgrade Now"
                    smallText="$5/month. Cancel anytime."
                    backgroundImage="value_prop_banking.jpg"/>
            </motion.div>
        </div>
    </SectionLayout>
}
