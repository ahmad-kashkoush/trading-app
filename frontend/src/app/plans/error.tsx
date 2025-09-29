"use client"
import { motion } from "framer-motion"
import { SectionLayout } from "@/components/layout"
import { Button as ThemeButton } from "@/components/ui"
import { animationVariants } from "@/styles/animations"
import { spacing, typography } from "@/styles"
import { Warning, Refresh } from "@mui/icons-material"
import { useEffect } from "react"

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Plans page error:', error)
    }, [error])

    return (
        <main className="relative overflow-hidden">
            <SectionLayout
                id="plans-error"
                backgroundVariant="default"
                contentAlignment="center"
                className="py-16 lg:py-24"
            >
                <motion.div
                    variants={animationVariants.container}
                    initial="hidden"
                    animate="visible"
                    className={`${spacing.maxWidth.content} ${spacing.section}`}
                >
                    {/* Error Header */}
                    <motion.div variants={animationVariants.slideUp} className="text-center mb-16">
                        <div className={`${typography.phonic} ${typography.accent.small} text-red-400 mb-4`}>
                            OOPS! SOMETHING WENT WRONG
                        </div>
                        <div className={`${typography.serif} ${typography.heading.large} ${typography.colors.white} mb-6`}>
                            Unable to Load Plans
                        </div>
                        <div className={`${typography.body.large} ${typography.colors.whiteOpacity} ${spacing.maxWidth.text}`}>
                            We're having trouble loading the subscription plans. Please try again or contact our support team.
                        </div>
                    </motion.div>

                    {/* Error Display */}
                    <motion.div variants={animationVariants.slideUp} className="text-center">
                        {/* Error Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="p-6 rounded-full bg-red-500/10 border border-red-500/20">
                                <Warning className="w-12 h-12 text-red-400" />
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="mb-8">
                            <h3 className={`${typography.heading.small} text-red-400 mb-4`}>
                                Failed to Load Subscription Plans
                            </h3>
                            <p className={`${typography.body.medium} ${typography.colors.whiteOpacity} max-w-md mx-auto mb-2`}>
                                {error.message || "An unexpected error occurred while fetching subscription data."}
                            </p>
                            {error.digest && (
                                <p className={`${typography.body.small} text-gray-500`}>
                                    Error ID: {error.digest}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <ThemeButton
                                variant="primary"
                                onClick={reset}
                                className="min-w-[160px] flex items-center gap-2"
                            >
                                <Refresh className="w-4 h-4" />
                                Try Again
                            </ThemeButton>
                            
                            <ThemeButton
                                variant="secondary"
                                onClick={() => window.location.href = '/'}
                                className="min-w-[160px]"
                            >
                                Go Home
                            </ThemeButton>
                            
                            <ThemeButton
                                variant="login"
                                onClick={() => window.location.href = '/contact'}
                                className="min-w-[160px]"
                            >
                                Contact Support
                            </ThemeButton>
                        </div>
                    </motion.div>

                    {/* Additional Help */}
                    <motion.div variants={animationVariants.slideUp} className="text-center mt-16">
                        <p className={`${typography.body.medium} ${typography.colors.whiteOpacity} mb-6`}>
                            If this problem persists, please contact our support team for assistance.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <span className={`${typography.colors.whiteOpacity}`}>
                                📧 support@tradingapp.com
                            </span>
                            <span className={`${typography.colors.whiteOpacity}`}>
                                📞 1-800-TRADING
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </SectionLayout>
        </main>
    )
}
