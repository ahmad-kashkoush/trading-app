"use client"
import { motion } from "framer-motion"
import { SectionLayout } from "@/components/layout"
import { animationVariants } from "@/styles/animations"
import { spacing, typography } from "@/styles"

export default function Loading() {
    return (
        <main className="relative overflow-hidden">
            <SectionLayout
                id="plans-loading"
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
                    {/* Loading Header */}
                    <motion.div variants={animationVariants.slideUp} className="text-center mb-16">
                        <div className={`${typography.phonic} ${typography.accent.small} ${typography.colors.accent} mb-4 animate-pulse`}>
                            SUBSCRIPTION PLANS
                        </div>
                        <div className={`${typography.serif} ${typography.heading.large} ${typography.colors.white} mb-6`}>
                            Loading Your Trading Plans
                        </div>
                        <div className={`${typography.body.large} ${typography.colors.whiteOpacity} ${spacing.maxWidth.text}`}>
                            Please wait while we fetch the latest subscription options for you.
                        </div>
                    </motion.div>

                    {/* Loading Animation */}
                    <motion.div variants={animationVariants.slideUp} className="text-center">
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--accent-color)]/20 border-t-[var(--accent-color)]"></div>
                                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-[var(--accent-color)] animate-ping opacity-20"></div>
                            </div>
                        </div>
                        
                        {/* Loading Cards Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                            {[1, 2, 3].map((index) => (
                                <motion.div 
                                    key={index}
                                    variants={animationVariants.card}
                                    className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 lg:p-8 h-96 animate-pulse"
                                >
                                    <div className="space-y-4">
                                        <div className="h-6 bg-white/20 rounded-md w-3/4"></div>
                                        <div className="h-4 bg-white/10 rounded-md w-full"></div>
                                        <div className="h-4 bg-white/10 rounded-md w-2/3"></div>
                                        <div className="space-y-2 mt-8">
                                            {[1, 2, 3, 4].map((item) => (
                                                <div key={item} className="h-3 bg-white/5 rounded-md w-full"></div>
                                            ))}
                                        </div>
                                        <div className="h-8 bg-[var(--accent-color)]/20 rounded-full w-full mt-auto"></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </SectionLayout>
        </main>
    )
}
