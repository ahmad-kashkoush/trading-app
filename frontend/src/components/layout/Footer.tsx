"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Logo } from '@/components/ui';

// ===== MAIN COMPONENT =====

export default function Footer() {
    const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    const footerLinks = {
        company: {
            title: "Company",
            links: [
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Press", href: "/press" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" }
            ]
        },
        products: {
            title: "Products",
            links: [
                { label: "Trading", href: "/trading" },
                { label: "Investing", href: "/investing" },
                { label: "Crypto", href: "/crypto" },
                { label: "Options", href: "/options" },
                { label: "Gold", href: "/gold" }
            ]
        },
        support: {
            title: "Support",
            links: [
                { label: "Help Center", href: "/help" },
                { label: "Security", href: "/security" },
                { label: "API", href: "/api" },
                { label: "Status", href: "/status" },
                { label: "Community", href: "/community" }
            ]
        },
        legal: {
            title: "Legal",
            links: [
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Disclosures", href: "/disclosures" },
                { label: "Regulatory", href: "/regulatory" },
                { label: "SIPC", href: "/sipc" }
            ]
        }
    };

    const socialLinks = [
        { label: "Twitter", href: "https://twitter.com", icon: "𝕏" },
        { label: "LinkedIn", href: "https://linkedin.com", icon: "💼" },
        { label: "Instagram", href: "https://instagram.com", icon: "📸" },
        { label: "YouTube", href: "https://youtube.com", icon: "📺" }
    ];

    return (
        <motion.footer
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative border-t border-black/10"
            style={{
                background: 'linear-gradient(to bottom right, var(--accent-color), var(--accent-hover), var(--accent-color))'
            }}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-color)]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent-color)]/5 rounded-full blur-2xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 lg:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Logo and Description */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                        <div className="flex items-center space-x-3">
                            <Logo
                                width="165px"
                                className="w-[165px] h-[40px] text-black fill-black [&>*]:fill-black [&>path]:fill-black" />
                        </div>
                        <p className="font-['Phonic'] text-black/70 leading-relaxed max-w-sm">
                            Democratizing finance for all. Commission-free trading, investing, and crypto
                            for everyone.
                        </p>

                        {/* Social Links */}
                        <SocialLinks socialLinks={socialLinks} />
                    </motion.div>

                    {/* Footer Links */}
                    <FooterLinks footerLinks={footerLinks} />
                </div>

                {/* Divider */}
                <motion.div
                    variants={itemVariants}
                    className="my-12 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"
                />

                {/* Bottom Section */}
                <motion.div variants={itemVariants} className="space-y-6">
                    {/* Legal Disclaimer */}
                    <LegalDisclaimer />

                    {/* Copyright and Legal Links */}
                    <CopyrightSection />
                </motion.div>
            </div>
        </motion.footer>
    );
}

// ===== TYPES =====

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

interface FooterLinksData {
    [key: string]: FooterSection;
}

interface SocialLink {
    label: string;
    href: string;
    icon: string;
}

interface FooterLinksProps {
    footerLinks: FooterLinksData;
}

interface SocialLinksProps {
    socialLinks: SocialLink[];
}

// ===== SUB-COMPONENTS =====

// Footer Links Section
function FooterLinks({ footerLinks }: FooterLinksProps) {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <>
            {Object.entries(footerLinks).map(([key, section]) => (
                <motion.div key={key} variants={itemVariants} className="space-y-4">
                    <h3 className="font-['Phonic'] text-black font-semibold text-sm uppercase tracking-wider">
                        {section.title}
                    </h3>
                    <ul className="space-y-3">
                        {section.links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.href}
                                    className="font-['Phonic'] text-black/70 hover:text-black transition-colors duration-300 text-sm"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </>
    );
}

// Social Links
function SocialLinks({ socialLinks }: SocialLinksProps) {
    return (
        <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
                <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-black/10 hover:bg-black/20 border border-black/20 hover:border-black/40 rounded-lg flex items-center justify-center text-black hover:text-black transition-all duration-300"
                    aria-label={social.label}
                >
                    <span className="text-lg">{social.icon}</span>
                </motion.a>
            ))}
        </div>
    );
}

// Legal Disclaimer Card
function LegalDisclaimer() {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <motion.div variants={itemVariants} className="bg-black/10 border border-black/20 rounded-2xl p-6 lg:p-8">
            <h4 className="font-['Phonic'] text-black font-semibold mb-4 text-sm uppercase tracking-wider">
                Important Information
            </h4>
            <div className="space-y-3 text-xs lg:text-sm text-black/70 leading-relaxed">
                <p>
                    <strong className="text-black">Securities trading:</strong> Robinhood Financial LLC is a registered broker dealer and member of SIPC.
                    Securities in your account are protected up to $500,000. For details, please see{' '}
                    <Link href="/sipc" className="text-black underline hover:no-underline">www.sipc.org</Link>.
                </p>
                <p>
                    <strong className="text-black">Cryptocurrency:</strong> Robinhood Crypto, LLC provides crypto currency trading.
                    Crypto trading is not suitable for all investors due to the number of risks involved.
                </p>
                <p>
                    <strong className="text-black">Options trading:</strong> Options trading entails significant risk and is not appropriate for all customers.
                    Please review the options disclosure document before trading options.
                </p>
            </div>
        </motion.div>
    );
}

// App Download Buttons
function AppDownloadButtons() {
    return (
        <div className="flex space-x-3">
            <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-black/10 hover:bg-black/20 border border-black/20 rounded-lg text-black text-xs font-medium transition-all duration-300"
            >
                📱 App Store
            </motion.a>
            <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-black/10 hover:bg-black/20 border border-black/20 rounded-lg text-black text-xs font-medium transition-all duration-300"
            >
                🤖 Google Play
            </motion.a>
        </div>
    );
}

// Copyright and Legal Links
function CopyrightSection() {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-black/60">
                <p>&copy; 2025 Robinhood Markets, Inc. All rights reserved.</p>
                <div className="flex space-x-4">
                    <Link href="/privacy" className="hover:text-black transition-colors duration-300">
                        Privacy
                    </Link>
                    <Link href="/terms" className="hover:text-black transition-colors duration-300">
                        Terms
                    </Link>
                    <Link href="/disclosures" className="hover:text-black transition-colors duration-300">
                        Disclosures
                    </Link>
                </div>
            </div>
            <AppDownloadButtons />
        </motion.div>
    );
}
