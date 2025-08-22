"use client"
import React from 'react';
import { motion, Variants } from 'framer-motion';
import ThemeButton from './ThemeButton';
import Link from 'next/link';

// Reusable Section Component Interface
interface SectionLayoutProps {
    id?: string;
    children: React.ReactNode;
    className?: string;
    backgroundVariant?: 'default' | 'alternate' | 'accent';
    showDecorations?: boolean;
}

// Reusable Section Component
const SectionLayout: React.FC<SectionLayoutProps> = ({ 
    id, 
    children, 
    className = '', 
    backgroundVariant = 'default',
    showDecorations = true 
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

    return (
        <motion.section
            id={id}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`relative min-h-screen ${getBackgroundClasses()} overflow-hidden ${className}`}
        >
            <div className="container mx-auto px-4 py-8 lg:py-16 flex flex-col items-center justify-center min-h-screen text-center">
                <div className="max-w-4xl w-full space-y-6 lg:space-y-8">
                    {children}
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
        <SectionLayout id="hood-month" backgroundVariant="default">
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

    const cardVariants: Variants = {
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
            title: "Commission-Free Trading",
            description: "Trade stocks, ETFs, and crypto without paying commissions",
            icon: "💰"
        },
        {
            title: "Real-Time Data",
            description: "Get instant market data and execute trades in milliseconds",
            icon: "⚡"
        },
        {
            title: "Advanced Analytics",
            description: "Make informed decisions with our comprehensive analysis tools",
            icon: "📊"
        }
    ];

    return (
        <SectionLayout id="trading-features" backgroundVariant="alternate" showDecorations={false}>
            {/* Section Header */}
            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
                    Trade with Confidence
                </h2>
                <p className="font-['Phonic'] text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                    Experience next-generation trading with our cutting-edge platform designed for modern investors.
                </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition-all duration-300"
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="font-['Phonic'] text-lg lg:text-xl font-semibold text-white mb-3">
                            {feature.title}
                        </h3>
                        <p className="font-['Phonic'] text-sm lg:text-base text-gray-300 leading-relaxed">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-12">
                <ThemeButton
                    variant="secondary"
                    className="px-8 py-3 text-sm sm:text-base font-semibold rounded-full border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black transition-all duration-300"
                >
                    Start Trading Today
                </ThemeButton>
            </motion.div>
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
        <SectionLayout id="investment-opportunities" backgroundVariant="accent">
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