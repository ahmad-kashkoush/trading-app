"use client"
import { SectionHeader, SectionLayout } from "@/components"
import VideoTabsComponent from "./_components/VideoTabsComponent"
import { buttonClasses, COLORS, spacing, typography } from "@/styles"
import { animationVariants, EASING, VIEWPORT_CONFIG } from "@/styles/animations"
import { motion } from "framer-motion"
import InfoIcon from '@mui/icons-material/Info'
import { useState } from "react"
import { Popup, Button as ThemeButton, Video as VideoComponent } from "@/components/ui"


export default function Legend() {
    return (
        <main>
            <SectionLayout1 />
            <SectionLayout2 />
            <SectionLayout3 />
            {/*  <SectionLayout4 /> // Heading, video, similar to section 1
            <SectionLayout5 /> // Section with cta and background video */}

        </main>
    )
}
function SectionLayout1() {
    return (
        <>
            {/* Heading section above the image */}
            <motion.section
                className="relative py-16 lg:py-24"
                variants={animationVariants.container}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CONFIG}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={animationVariants.slideUp}
                        className="text-center"
                    >
                        <h1 className={`${typography.serif} ${typography.heading.hero} ${typography.colors.white} bg-gradient-to-br from-white via-gray-100 to-[${COLORS.ACCENT_HEX}] bg-clip-text text-transparent`}>
                            The journey begins.
                        </h1>
                    </motion.div>
                </div>
            </motion.section>

            {/* Full-width background image section */}
            <motion.section
                className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black"
                style={{
                    backgroundImage: 'url(/legend_hero_desktop_20241001.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 1.5,
                    ease: EASING
                }}
                viewport={VIEWPORT_CONFIG}
            />
        </>
    )
}
function SectionLayout2() {
    return (
        <SectionLayout>
            <SectionHeader
                accent="Legend"
                title="Guided by powerful charts"
                description="View visualizations that tell the story of your portfolio's growth and performance."
            />
            <VideoTabsComponent />
        </SectionLayout>
    )
}
function SectionLayout3() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            {/* Content section */}
            <SectionLayout
                backgroundVariant="none"
                className="bg-[#151819]"
                minHeight="min-h-[25vh]"
            >
                <SectionHeader
                    accent="Legend"
                    title="It's free"
                    description="Available to anyone with a Robinhood account. Sign up today."
                />
                {/* Disclosure with popup */}
                <p className={`mt-4 ${typography.phonic} ${typography.body.small} font-light ${typography.colors.whiteFaded} ${spacing.maxWidth.xsmall} hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2`}
                    onClick={() => setIsModalOpen(true)}>
                    <InfoIcon sx={{ fontSize: 16 }} />
                    Disclosure                </p>
                <ThemeButton
                    variant="primary"
                    className={`${buttonClasses.base} ${buttonClasses.primary}`}
                    onClick={() => setIsModalOpen(true)}
                >
                    Sign up today
                </ThemeButton>
                <Popup
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    title="Disclosure"
                    description="Disclosure"
                />
            </SectionLayout>

            {/* Full-width background video section */}
            <motion.section
                className="relative w-full h-[50vh] min-h-[400px] overflow-hidden bg-black"
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 1.5,
                    ease: EASING
                }}
                viewport={VIEWPORT_CONFIG}
            >
                <VideoComponent
                    src="/wave_footer_desktop_20250426.webm"
                    className="w-full h-full object-cover"
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    showLastFrame={false}
                    controls={false}
                    playOnScroll={false}
                />
            </motion.section>
        </>
    )
}