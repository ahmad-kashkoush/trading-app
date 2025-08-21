"use client"
import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import ThemeButton from './ThemeButton';
import Link from 'next/link';
import { COLORS, BREAKPOINTS } from '../styles/theme';

const MainLayout: React.FC = () => {
    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                background: `linear-gradient(135deg, ${COLORS.BLACK} 0%, #1a1a1a 100%)`,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <SectionLayout1 />
        </Box>
    );
};

export default MainLayout;

function SectionLayout1() {
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
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
                position: 'relative',
                zIndex: 1,
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    py: 4,
                }}
            >
                <Stack spacing={4} alignItems="center" sx={{ maxWidth: '800px' }}>
                    {/* Event Badge */}
                    <motion.div
                        variants={accentVariants}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '-60px',
                                    width: '40px',
                                    height: '1px',
                                    backgroundColor: COLORS.ACCENT,
                                    transform: 'translateY(-50%)',
                                    [`@media ${BREAKPOINTS.SMALL}`]: {
                                        left: '-80px',
                                        width: '60px',
                                    },
                                },
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    right: '-60px',
                                    width: '40px',
                                    height: '1px',
                                    backgroundColor: COLORS.ACCENT,
                                    transform: 'translateY(-50%)',
                                    [`@media ${BREAKPOINTS.SMALL}`]: {
                                        right: '-80px',
                                        width: '60px',
                                    },
                                },
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontFamily: 'Phonic, Helvetica, system-ui, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
                                    fontSize: { xs: '16px', sm: '18px', md: '22px' },
                                    fontWeight: 600,
                                    color: COLORS.ACCENT,
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                HOOD MONTH + AUG 19-SEPT 15, 2025
                            </Typography>
                        </Box>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontFamily: 'Martina Plantijn, serif',
                                fontSize: { 
                                    xs: '36px', 
                                    sm: '48px', 
                                    md: '64px', 
                                    lg: '72px' 
                                },
                                fontWeight: 400,
                                letterSpacing: '-1px',
                                lineHeight: { 
                                    xs: '40px', 
                                    sm: '52px', 
                                    md: '68px', 
                                    lg: '78px' 
                                },
                                color: COLORS.WHITE,
                                mb: 2,
                                background: `linear-gradient(135deg, ${COLORS.WHITE} 0%, #e5e5e5 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Money moves, rewards follow
                        </Typography>
                    </motion.div>

                    {/* Description */}
                    <motion.div variants={itemVariants}>
                        <Stack spacing={2} alignItems="center">
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: 'Phonic, Helvetica, system-ui, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
                                    fontSize: { xs: '14px', sm: '16px' },
                                    fontWeight: 400,
                                    letterSpacing: '-0.25px',
                                    lineHeight: { xs: '20px', sm: '24px' },
                                    color: COLORS.WHITE,
                                    maxWidth: '600px',
                                    mb: 1,
                                }}
                            >
                                HOOD Month is here. Deposit and transfer your way to bonuses and a shot at a solid gold bar.
                            </Typography>
                            
                            <Typography
                                variant="caption"
                                sx={{
                                    fontFamily: 'Phonic, Helvetica, system-ui, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
                                    fontSize: { xs: '11px', sm: '12px' },
                                    fontWeight: 300,
                                    color: COLORS.WHITE,
                                    opacity: 0.5,
                                    maxWidth: '500px',
                                    lineHeight: 1.4,
                                }}
                            >
                                No deposit or Gold membership necessary to enter via mail. Terms apply. Subscription may apply.
                            </Typography>
                        </Stack>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ marginTop: '32px' }}
                    >
                        <ThemeButton
                            component={Link}
                            href='/hood-month'
                            variant="primary"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: { xs: '14px', sm: '16px' },
                                fontWeight: 600,
                                borderRadius: '50px',
                                textTransform: 'none',
                                minWidth: '200px',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: '-100%',
                                    width: '100%',
                                    height: '100%',
                                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                                    transition: 'left 0.5s',
                                },
                                '&:hover::before': {
                                    left: '100%',
                                },
                            }}
                        >
                            Explore HOOD Month
                        </ThemeButton>
                    </motion.div>
                </Stack>

                {/* Background Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        right: '-10%',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${COLORS.ACCENT}22 0%, transparent 70%)`,
                        zIndex: -1,
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.05, scale: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        left: '-15%',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${COLORS.ACCENT}11 0%, transparent 70%)`,
                        zIndex: -1,
                    }}
                />
            </Container>
        </motion.section>
    );
}