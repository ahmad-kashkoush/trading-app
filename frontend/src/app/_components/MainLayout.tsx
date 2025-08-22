"use client"
import React from 'react';
import { motion, Variants } from 'framer-motion';
import ThemeButton from './ThemeButton';
import ImageComponent from './ImageComponent';
import Link from 'next/link';

// Reusable Section Component Interface
interface SectionLayoutProps {
    id?: string;
    children: React.ReactNode;
    className?: string;
    backgroundVariant?: 'default' | 'alternate' | 'accent';
    showDecorations?: boolean;
    contentAlignment?: 'left' | 'center' | 'right';
    backgroundImage?: string;
    imagePosition?: 'left' | 'right' | 'center' | 'background';
    imageSize?: 'small' | 'medium' | 'large' | 'cover';
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
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
            },
        },
    };

    const getBackgroundClasses = () => {
        switch (backgroundVariant) {
            case 'alternate':
                return 'bg-gradient-to-br from-gray-900 to-black';
            case 'accent':
                return 'bg-gradient-to-br from-black via-gray-900 to-green-950';
            default:
                return 'bg-gradient-to-br from-black to-gray-800';
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
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`relative min-h-screen ${getBackgroundClasses()} overflow-hidden ${className}`}
            style={backgroundImage && imagePosition === 'background' ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            } : undefined}
        >
            {/* Overlay for background images */}
            {overlay && backgroundImage && imagePosition === 'background' && (
                <div className="absolute inset-0 bg-black/80 z-0" />
            )}

            <div className={`container mx-auto px-4 py-8 lg:py-16 flex flex-col justify-center min-h-screen relative z-10 ${getContentAlignment()}`}>
                <div className={`max-w-6xl w-full space-y-6 lg:space-y-8 ${getLayoutClasses()}`}>
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
                    <div className={`${imagePosition === 'left' || imagePosition === 'right' ? 'flex-1' : 'w-full'} space-y-6 lg:space-y-8`}>
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

const MainLayout: React.FC = () => {
    return (
        <main className="relative overflow-hidden">
            <SectionLayout1 />
            <SectionLayout2 />
            <SectionLayout3 />
            <SectionLayout4 />
            <SectionLayout5 />
        </main>
    );
};

export default MainLayout;

// Section 1: HOOD Month Promotion
function SectionLayout1() {
    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const accentVariants: Variants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <SectionLayout
            id="hood-month"
            backgroundVariant="default"
            contentAlignment="center"
            backgroundImage="/RH_Hood-Month_Web_Hero_Desktop-1920.png"
            imagePosition="background"
            overlay={true}
        >
            {/* Event Badge */}
            <motion.div variants={accentVariants} className="relative">
                <div className="relative flex items-center justify-center">
                    {/* Decorative Lines */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 w-10 md:w-16 h-px bg-[#ccff00]" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 w-10 md:w-16 h-px bg-[#ccff00]" />

                    <h2 className="font-['Phonic'] text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#ccff00] tracking-[2px] uppercase">
                        HOOD MONTH + AUG 19-SEPT 15, 2025
                    </h2>
                </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight leading-tight text-white bg-gradient-to-br from-white via-gray-100 to-[#ccff00] bg-clip-text text-transparent mb-4">
                    Money moves, rewards follow
                </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-4">
                <p className="font-['Phonic'] text-sm sm:text-base md:text-lg font-normal tracking-tight leading-relaxed text-white max-w-2xl mx-auto">
                    HOOD Month is here. Deposit and transfer your way to bonuses and a shot at a solid gold bar.
                </p>

                <p className="font-['Phonic'] text-xs sm:text-sm font-light text-white/50 max-w-xl mx-auto leading-relaxed">
                    No deposit or Gold membership necessary to enter via mail. Terms apply. Subscription may apply.
                </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8"
            >
                <ThemeButton
                    component={Link}
                    href='/hood-month'
                    variant="primary"
                    className="px-8 py-3 text-sm sm:text-base font-semibold rounded-full min-w-[200px] relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#ccff00]/20"
                >
                    <span className="relative z-10">Explore HOOD Month</span>
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </ThemeButton>
            </motion.div>
        </SectionLayout>
    );
}

// Section 2: Trading Features
function SectionLayout2() {
    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <SectionLayout
            id="trading-features"
            backgroundVariant="alternate"
            showDecorations={false}
            contentAlignment="center"
            backgroundImage="/web_homepage_investing_2.jpeg"
            imagePosition="background"
            overlay={true}
        >
            <div className="flex w-full">
                {/* Empty left column */}
                <div className="flex-1"></div>

                {/* Right column with content */}
                <div className="flex-1">
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="space-y-6 text-left">
                        {/* Accent Color Heading */}
                        <h3 className="font-['Phonic'] text-sm sm:text-base md:text-lg font-semibold text-[#ccff00] tracking-[2px] uppercase">
                            PROFESSIONAL TRADING
                        </h3>

                        {/* White Heading */}
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
                            Trade with Confidence
                        </h2>

                        {/* Paragraph */}
                        <p className="font-['Phonic'] text-base sm:text-lg text-gray-300 leading-relaxed">
                            Experience next-generation trading with our cutting-edge platform designed for modern investors. Access real-time market data, advanced analytics, and commission-free trading all in one place.
                        </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div variants={itemVariants} className="mt-12 text-left">
                        <ThemeButton
                            variant="secondary"
                            className="px-8 py-3 text-sm sm:text-base font-semibold rounded-full border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black transition-all duration-300"
                        >
                            Start Trading Today
                        </ThemeButton>
                    </motion.div>
                </div>
            </div>
        </SectionLayout>
    );
}

// Section 3: Investment Opportunities
function SectionLayout3() {
    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const statsVariants: Variants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const stats = [
        { label: "Active Users", value: "30M+", color: "text-[#ccff00]" },
        { label: "Assets Under Management", value: "$100B+", color: "text-blue-400" },
        { label: "Daily Trades", value: "1M+", color: "text-green-400" },
        { label: "Countries Served", value: "190+", color: "text-purple-400" }
    ];

    return (
        <SectionLayout
            id="investment-opportunities"
            backgroundVariant="accent"
            contentAlignment="center"
        >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="space-y-6">
                <div className="relative">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 w-12 h-px bg-gradient-to-r from-transparent via-[#ccff00] to-transparent" />
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
                        Build Your Financial Future
                    </h2>
                </div>
                <p className="font-['Phonic'] text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Join millions of investors who trust our platform to grow their wealth.
                    From beginner-friendly tools to advanced investment strategies.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={statsVariants}
                        whileHover={{ scale: 1.05 }}
                        className="text-center space-y-2"
                    >
                        <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${stat.color}`}>
                            {stat.value}
                        </div>
                        <div className="font-['Phonic'] text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Final CTA */}
            <motion.div variants={itemVariants} className="mt-12 space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <ThemeButton
                        variant="primary"
                        className="px-8 py-3 text-sm sm:text-base font-semibold rounded-full min-w-[180px] bg-[#ccff00] text-black hover:bg-[#b8e600] transition-all duration-300"
                    >
                        Get Started Free
                    </ThemeButton>
                    <ThemeButton
                        variant="secondary"
                        className="px-8 py-3 text-sm sm:text-base font-semibold rounded-full min-w-[180px] border border-white/30 text-white hover:bg-white/10 transition-all duration-300"
                    >
                        Learn More
                    </ThemeButton>
                </div>

                <p className="font-['Phonic'] text-xs text-gray-500 max-w-md mx-auto">
                    * Investment products are not FDIC insured and may lose value.
                    Past performance does not guarantee future results.
                </p>
            </motion.div>
        </SectionLayout>
    );
}

// Section 4: About Us with Modern Team Design
function SectionLayout4() {
    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { y: 30, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            bio: "15+ years in fintech with experience at Goldman Sachs and Morgan Stanley.",
            initials: "SJ",
            gradient: "from-purple-400 to-pink-400"
        },
        {
            name: "Michael Chen",
            role: "CTO",
            bio: "Former Google engineer specializing in high-frequency trading systems.",
            initials: "MC",
            gradient: "from-blue-400 to-cyan-400"
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Trading",
            bio: "Former hedge fund manager with $2B+ in assets under management.",
            initials: "ER",
            gradient: "from-green-400 to-emerald-400"
        },
        {
            name: "David Kim",
            role: "Head of Security",
            bio: "Cybersecurity expert with 12 years protecting financial institutions.",
            initials: "DK",
            gradient: "from-orange-400 to-red-400"
        }
    ];

    return (
        <SectionLayout
            id="about-us"
            backgroundVariant="accent"
            contentAlignment="center"
            backgroundImage='/meet-our-team-bg.jpg'
            overlay={true}
            showDecorations={true}
        >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="space-y-6 mb-16">
                <div className="relative">
                    <h3 className="font-['Phonic'] text-sm sm:text-base md:text-lg font-semibold text-[#ccff00] tracking-[2px] uppercase mb-4">
                        OUR LEADERSHIP
                    </h3>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
                        Meet Our Team
                    </h2>
                </div>
                <p className="font-['Phonic'] text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Our experienced team combines decades of financial expertise with cutting-edge technology
                    to deliver the best trading experience for our users.
                </p>
            </motion.div>

            {/* Team Grid */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            >
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 lg:p-8 hover:border-[#ccff00]/30 transition-all duration-500"
                    >
                        {/* Background Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 ${member.gradient}`} />

                        {/* Avatar */}
                        <div className="relative mb-6">
                            <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg`}>
                                {member.initials}
                            </div>
                            {/* Decorative Ring - removed blur */}
                            <div className={`absolute inset-0 w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center space-y-3">
                            <h3 className="font-['Phonic'] text-lg lg:text-xl font-semibold text-white group-hover:text-[#ccff00] transition-colors duration-300">
                                {member.name}
                            </h3>
                            <p className="font-['Phonic'] text-sm text-[#ccff00] font-medium">
                                {member.role}
                            </p>
                            <p className="font-['Phonic'] text-xs lg:text-sm text-gray-400 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                {member.bio}
                            </p>
                        </div>

                        {/* Hover Border Effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#ccff00]/20 via-transparent to-[#ccff00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                ))}
            </motion.div>

            {/* Mission Statement */}
            <motion.div variants={itemVariants} className="mt-20 space-y-8">
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 lg:p-12 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#ccff00]/20 to-transparent" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ccff00]/10 rounded-full" />
                    </div>

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <h3 className="font-serif text-2xl lg:text-3xl font-normal text-white mb-6">
                            Our Mission
                        </h3>
                        <blockquote className="font-['Phonic'] text-base lg:text-lg text-gray-300 leading-relaxed italic">
                            &ldquo;To democratize finance for all by providing accessible, secure, and innovative
                            trading tools that empower individuals to take control of their financial future.&rdquo;
                        </blockquote>
                        <div className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-[#ccff00] to-transparent mx-auto" />
                    </div>
                </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div variants={itemVariants} className="mt-12">
                <ThemeButton
                    variant="primary"
                    className="px-8 py-3 text-sm sm:text-base font-semibold rounded-full bg-[#ccff00] text-black hover:bg-[#b8e600] transition-all duration-300 shadow-lg hover:shadow-[#ccff00]/25"
                >
                    Get in Touch
                </ThemeButton>
            </motion.div>
        </SectionLayout>
    );
}

// Section 5: Robinhood Protection Guarantee
function SectionLayout5() {
    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const featureVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const features = [
        {
            icon: "/illo_secure.svg",
            title: "Bank-Level Security",
            description: "Your data and investments are protected with state-of-the-art encryption and security protocols used by major financial institutions."
        },
        {
            icon: "/illo_protect.svg",
            title: "SIPC Protection",
            description: "Securities in your account are protected up to $500,000 by the Securities Investor Protection Corporation (SIPC)."
        },
        {
            icon: "/illo_multi-factor.svg",
            title: "Multi-Factor Authentication",
            description: "Advanced authentication methods ensure that only you can access your account, with biometric and SMS verification options."
        },
        {
            icon: "/illo_247.svg",
            title: "24/7 Monitoring",
            description: "Our security team continuously monitors for suspicious activity and potential threats to keep your account safe around the clock."
        }
    ];

    return (
        <motion.section
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        duration: 0.6,
                        staggerChildren: 0.2,
                    },
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative min-h-screen overflow-hidden"
            style={{ backgroundColor: '#1c180d' }}
        >
            <div className="container mx-auto px-4 py-8 lg:py-16 flex flex-col justify-center min-h-screen relative z-10 items-center text-center">
                <div className="max-w-6xl w-full space-y-12">
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white"
                            style={{ fontFamily: 'serif, Georgia, "Times New Roman", Times, serif' }}>
                            Robinhood Protection Guarantee
                        </h2>
                        <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
                           style={{ fontFamily: 'Phonic, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                            Your security is our priority. We employ multiple layers of protection to safeguard your investments and personal information.
                        </p>
                    </motion.div>

                    {/* Features Grid - 2 columns, 4 features - Firefox Compatible */}
                    <motion.div 
                        variants={itemVariants}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={featureVariants}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6 p-6 rounded-2xl hover:bg-white/5 transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto sm:mx-0 flex items-center justify-center icon-container">
                                        <ImageComponent
                                            src={feature.icon}
                                            alt={feature.title}
                                            className="w-12 h-12 lg:w-16 lg:h-16 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-3">
                                    <h3 className="font-['Phonic'] text-lg lg:text-xl font-semibold text-white group-hover:text-[#ccff00] transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="font-['Phonic'] text-sm lg:text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div variants={itemVariants} className="mt-16">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto">
                            <p className="font-['Phonic'] text-sm lg:text-base text-white/60 leading-relaxed">
                                <strong className="text-white">Important:</strong> Robinhood Financial LLC is a member of SIPC, which protects securities customers 
                                of its members up to $500,000 (including $250,000 for claims for cash). 
                                An explanatory brochure is available upon request or at{' '}
                                <span className="text-[#ccff00]">www.sipc.org</span>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}