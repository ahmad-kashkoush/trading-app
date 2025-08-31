"use client"
import { SectionHeader, SectionLayout } from '@/components/layout';
import { Image as ImageComponent, Button as ThemeButton } from '@/components/ui';
import { buttonClasses, cardStyles, COLORS, decorative, gridPatterns, spacing, typography } from '@/styles';
import { animationVariants, HOVER_ANIMATIONS, VIEWPORT_CONFIG } from '@/styles/animations';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';



const Home: React.FC = () => {
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


// Section 1: HOOD Month Promotion
function SectionLayout1() {
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
            <motion.div variants={animationVariants.scale} className="relative">
                <div className="relative flex items-center justify-center">
                    {/* Decorative Lines */}
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 ${decorative.lineHorizontal}`} />
                    <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 ${decorative.lineHorizontal}`} />

                    <h2 className={`${typography.phonic} ${typography.accent.small} ${typography.colors.accent}`}>
                        HOOD MONTH + AUG 19-SEPT 15, 2025
                    </h2>
                </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={animationVariants.slideUp}>
                <h1 className={`${typography.serif} ${typography.heading.hero} ${typography.colors.white} bg-gradient-to-br from-white via-gray-100 to-[${COLORS.ACCENT_HEX}] bg-clip-text text-transparent mb-4`}>
                    Money moves, rewards follow
                </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={animationVariants.slideUp} className="space-y-4">
                <p className={`${typography.phonic} ${typography.body.large} font-normal tracking-tight ${typography.colors.white} ${spacing.maxWidth.small}`}>
                    HOOD Month is here. Deposit and transfer your way to bonuses and a shot at a solid gold bar.
                </p>

                <p className={`${typography.phonic} ${typography.body.small} font-light ${typography.colors.whiteFaded} ${spacing.maxWidth.xsmall}`}>
                    No deposit or Gold membership necessary to enter via mail. Terms apply. Subscription may apply.
                </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                variants={animationVariants.slideUp}
                whileHover={HOVER_ANIMATIONS.scale}
                whileTap={HOVER_ANIMATIONS.tap}
                className={spacing.margins.top.small}
            >
                <ThemeButton
                    component={Link}
                    href='/hood-month'
                    variant="primary"
                    className={`${buttonClasses.base} ${buttonClasses.sizes.large} relative overflow-hidden group ${buttonClasses.effects.shadow}`}
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
                    <motion.div variants={animationVariants.slideUp} className={`${spacing.section} text-left`}>
                        {/* Accent Color Heading */}
                        <h3 className={`${typography.phonic} ${typography.accent.small} ${typography.colors.accent}`}>
                            PROFESSIONAL TRADING
                        </h3>

                        {/* White Heading */}
                        <h2 className={`${typography.serif} ${typography.heading.large} ${typography.colors.white}`}>
                            Trade with Confidence
                        </h2>

                        {/* Paragraph */}
                        <p className={`${typography.phonic} ${typography.body.large} ${typography.colors.gray}`}>
                            Experience next-generation trading with our cutting-edge platform designed for modern investors. Access real-time market data, advanced analytics, and commission-free trading all in one place.
                        </p>
                    </motion.div>

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
            </div>
        </SectionLayout>
    );
}

// Section 3: Investment Opportunities
function SectionLayout3() {
    const stats = [
        { label: "Active Users", value: "30M+", color: `text-[${COLORS.ACCENT_HEX}]` },
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
            <SectionHeader
                title="Build Your Financial Future"
                description="Join millions of investors who trust our platform to grow their wealth. From beginner-friendly tools to advanced investment strategies."
                showLine={true}
            />

            {/* Stats Grid */}
            <motion.div
                variants={animationVariants.slideUp}
                className={`${gridPatterns.stats} ${spacing.margins.top.medium}`}
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={animationVariants.stats}
                        whileHover={HOVER_ANIMATIONS.scale}
                        className="text-center space-y-2"
                    >
                        <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${stat.color}`}>
                            {stat.value}
                        </div>
                        <div className={`${typography.phonic} ${typography.body.small} ${typography.colors.grayLight} uppercase tracking-wider`}>
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Final CTA */}
            <motion.div variants={animationVariants.slideUp} className={`${spacing.margins.top.medium} space-y-6`}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <ThemeButton
                        variant="primary"
                        className={`${buttonClasses.base} ${buttonClasses.sizes.medium} ${buttonClasses.primary}`}
                    >
                        Get Started Free
                    </ThemeButton>
                    <ThemeButton
                        variant="secondary"
                        className={`${buttonClasses.base} ${buttonClasses.sizes.medium} ${buttonClasses.white}`}
                    >
                        Learn More
                    </ThemeButton>
                </div>

                <p className={`${typography.phonic} ${typography.body.small} ${typography.colors.grayLight} ${spacing.maxWidth.medium}`}>
                    * Investment products are not FDIC insured and may lose value.
                    Past performance does not guarantee future results.
                </p>
            </motion.div>
        </SectionLayout>
    );
}

// Section 4: About Us with Modern Team Design
function SectionLayout4() {
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
            <SectionHeader
                accent="OUR LEADERSHIP"
                title="Meet Our Team"
                description="Our experienced team combines decades of financial expertise with cutting-edge technology to deliver the best trading experience for our users."
                className={spacing.margins.bottom.large}
            />

            {/* Team Grid */}
            <motion.div
                variants={animationVariants.slideUp}
                className={`${gridPatterns.team} ${spacing.margins.top.medium}`}
            >
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        variants={animationVariants.card}
                        whileHover={HOVER_ANIMATIONS.lift}
                        className={`group ${cardStyles.base} ${cardStyles.hover} ${cardStyles.padding}`}
                    >
                        {/* Background Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 ${member.gradient}`} />

                        {/* Avatar */}
                        <div className="relative mb-6">
                            <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg`}>
                                {member.initials}
                            </div>
                            {/* Decorative Ring */}
                            <div className={`absolute inset-0 w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center space-y-3">
                            <h3 className={`${typography.phonic} ${typography.heading.small} ${typography.colors.white} group-hover:${typography.colors.accent} transition-colors duration-300`}>
                                {member.name}
                            </h3>
                            <p className={`${typography.phonic} text-sm ${typography.colors.accent} font-medium`}>
                                {member.role}
                            </p>
                            <p className={`${typography.phonic} ${typography.body.medium} ${typography.colors.grayLight} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                                {member.bio}
                            </p>
                        </div>

                        {/* Hover Border Effect */}
                        <div className={decorative.glow} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Mission Statement */}
            <motion.div variants={animationVariants.slideUp} className={`${spacing.margins.top.xlarge} space-y-8`}>
                <div className={`relative ${cardStyles.base} ${cardStyles.paddingLarge} overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[${COLORS.ACCENT_HEX}]/20 to-transparent`} />
                        <div className={`absolute bottom-0 right-0 w-32 h-32 bg-[${COLORS.ACCENT_HEX}]/10 rounded-full`} />
                    </div>

                    <div className={`relative z-10 text-center ${spacing.maxWidth.medium}`}>
                        <h3 className={`${typography.serif} ${typography.heading.medium} ${typography.colors.white} mb-6`}>
                            Our Mission
                        </h3>
                        <blockquote className={`${typography.phonic} ${typography.body.large} ${typography.colors.gray} italic`}>
                            &ldquo;To democratize finance for all by providing accessible, secure, and innovative
                            trading tools that empower individuals to take control of their financial future.&rdquo;
                        </blockquote>
                        <div className={`mt-6 w-16 h-px bg-gradient-to-r from-transparent via-[${COLORS.ACCENT_HEX}] to-transparent mx-auto`} />
                    </div>
                </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div variants={animationVariants.slideUp} className={spacing.margins.top.medium}>
                <ThemeButton
                    variant="primary"
                    className={`${buttonClasses.base} ${buttonClasses.primary} ${buttonClasses.effects.shadowStrong}`}
                >
                    Get in Touch
                </ThemeButton>
            </motion.div>
        </SectionLayout>
    );
}

// Section 5: Robinhood Protection Guarantee
function SectionLayout5() {
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
            variants={animationVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="relative min-h-screen overflow-hidden"
            style={{ backgroundColor: '#1c180d' }}
        >
            <div className={`${spacing.container} flex flex-col justify-center min-h-screen relative z-10 items-center text-center`}>
                <div className={`${spacing.maxWidth.content} ${spacing.sectionLarge}`}>
                    {/* Section Header */}
                    <motion.div variants={animationVariants.slideUp} className={spacing.section}>
                        <h2 className={`${typography.serif} ${typography.heading.large} ${typography.colors.white}`}
                            style={{ fontFamily: 'serif, Georgia, "Times New Roman", Times, serif' }}>
                            Robinhood Protection Guarantee
                        </h2>
                        <p className={`${typography.body.large} ${typography.colors.whiteOpacity} ${spacing.maxWidth.text}`}
                           style={{ fontFamily: 'Phonic, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                            Your security is our priority. We employ multiple layers of protection to safeguard your investments and personal information.
                        </p>
                    </motion.div>

                    {/* Features Grid - 2 columns, 4 features - Firefox Compatible */}
                    <motion.div 
                        variants={animationVariants.slideUp}
                        className={`${gridPatterns.features} ${spacing.margins.top.large}`}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={animationVariants.feature}
                                whileHover={HOVER_ANIMATIONS.liftSmall}
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
                                    <h3 className={`${typography.phonic} ${typography.heading.small} ${typography.colors.white} group-hover:${typography.colors.accent} transition-colors duration-300`}>
                                        {feature.title}
                                    </h3>
                                    <p className={`${typography.phonic} ${typography.body.medium} text-white/70 group-hover:text-white/90 transition-colors duration-300`}>
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div variants={animationVariants.slideUp} className={spacing.margins.top.large}>
                        <div className={`${cardStyles.base} ${cardStyles.paddingLarge} ${spacing.maxWidth.medium}`}>
                            <p className={`${typography.phonic} ${typography.body.medium} ${typography.colors.whiteOpacityLow}`}>
                                <strong className={typography.colors.white}>Important:</strong> Robinhood Financial LLC is a member of SIPC, which protects securities customers 
                                of its members up to $500,000 (including $250,000 for claims for cash). 
                                An explanatory brochure is available upon request or at{' '}
                                <span className={typography.colors.accent}>www.sipc.org</span>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}