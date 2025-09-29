"use client"
import CheckoutButton from "@/components/CheckoutButton"
import { SectionLayout } from "@/components/layout"
import { Button as ThemeButton } from "@/components/ui"
import { animationVariants } from "@/styles/animations"
import { cardStyles, decorative, gridPatterns, spacing, typography } from "@/styles"
import { motion } from "framer-motion"
import { Check, Star } from "@mui/icons-material"
import { useEffect, useState } from "react"
import apiSubscriptions from "@/services/apiSubscriptions"
import { useSession } from "next-auth/react"

const PlansPage: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const {data: session} = useSession();
    

    
    useEffect(() => {
        const fetchSubscriptions = async () => {
            setLoading(true)
            setError(null)
           
            const response = await apiSubscriptions.fetchSubscriptions();
            const data = response.subscriptions;
            // Validate and set subscriptions
            if (Array.isArray(data)) {
                setSubscriptions(data);
                setLoading(false);
                // console.log('Subscriptions loaded:', data)
            } else {
                throw new Error('Invalid subscriptions data format')
            }
        }

        fetchSubscriptions()
    }, [])

    return (
        <main className="relative overflow-hidden">
            <SectionLayout
                id="plans"
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
                    {/* Section Header */}
                    <motion.div variants={animationVariants.slideUp} className="text-center mb-16">
                        <h3 className={`${typography.phonic} ${typography.accent.small} ${typography.colors.accent} mb-4`}>
                            SUBSCRIPTION PLANS
                        </h3>
                        <h1 className={`${typography.serif} ${typography.heading.large} ${typography.colors.white} mb-6`}>
                            Choose Your Trading Plan
                        </h1>
                        <p className={`${typography.body.large} ${typography.colors.whiteOpacity} ${spacing.maxWidth.text}`}>
                            Select the perfect plan to unlock premium trading features and take your investment strategy to the next level.
                        </p>
                    </motion.div>

                    {/* Loading State */}
                    {/* {loading && (
                        <motion.div variants={animationVariants.slideUp} className="text-center">
                            <div className={`${typography.body.large} ${typography.colors.whiteOpacity}`}>
                                Loading subscription plans...
                            </div>
                            <div className="mt-4 flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-color)]"></div>
                            </div>
                        </motion.div>
                    )} */}

                    {/* Error State */}
                    {/* {error && !loading && (
                        <motion.div variants={animationVariants.slideUp} className="text-center">
                            <div className={`${typography.body.medium} text-red-400 mb-4`}>
                                {error}
                            </div>
                            <ThemeButton 
                                variant="secondary" 
                                onClick={() => window.location.reload()}
                                className="min-w-[160px]"
                            >
                                Try Again
                            </ThemeButton>
                        </motion.div>
                    )} */}

                    {/* Plans Grid */}
                    {!loading && !error && subscriptions.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                            {subscriptions.map((subscription: any) => (
                                <SubscriptionCard key={subscription.id} subscription={subscription} />
                            ))}
                        </div>
                    )}

                    {/* No Subscriptions State */}
                    {!loading && !error && subscriptions.length === 0 && (
                        <motion.div variants={animationVariants.slideUp} className="text-center">
                            <div className={`${typography.body.large} ${typography.colors.whiteOpacity} mb-6`}>
                                No subscription plans available at the moment.
                            </div>
                            <ThemeButton variant="primary" className="min-w-[160px]">
                                Contact Sales
                            </ThemeButton>
                        </motion.div>
                    )}

                    {/* Additional Info Section */}
                    <motion.div variants={animationVariants.slideUp} className="text-center mt-16">
                        <p className={`${typography.body.medium} ${typography.colors.whiteOpacity} mb-6`}>
                            All plans include a 30-day money-back guarantee. No setup fees. Cancel anytime.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <ThemeButton variant="secondary" className="min-w-[160px]">
                                Compare Features
                            </ThemeButton>
                            <ThemeButton variant="login" className="min-w-[160px]">
                                Contact Sales
                            </ThemeButton>
                        </div>
                    </motion.div>
                </motion.div>
            </SectionLayout>
        </main>
    )
}

function SubscriptionCard({ subscription }: { subscription: any }) {
    const subscriptionFeatures = subscription.features || [
        "Essential trading features",
        "Basic market data",
        "Email support"
    ];
    console.log(subscription);

    const currentPlan = subscription.ownedByCurrentUser || false;
    const borderClass = currentPlan ? 'border-[var(--accent-color)]/50' : 'border-white/20';

    return (
        <motion.div variants={animationVariants.card} className="group">
            <div className={`${cardStyles.base} ${cardStyles.hover} ${cardStyles.padding} h-full flex flex-col relative ${borderClass}`}>
                {/* Popular Badge - Only show if subscription is marked as popular */}
                {currentPlan && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-[var(--accent-color)] text-black px-4 py-1.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-[var(--accent-color)]/50">
                            <span className={`${typography.phonic} text-xs font-bold tracking-wide uppercase flex items-center`}>
                                <Star className="w-3 h-3 mr-1.5" />
                                MOST POPULAR
                            </span>
                        </div>
                    </div>
                )}

                <div className={`flex-1 ${currentPlan ? 'mt-4' : 'mt-0'}`}>
                    <h2 className={`${typography.heading.small} ${typography.colors.white} mb-4`}>
                        {subscription.name || 'Subscription Plan'}
                    </h2>
                    <p className={`${typography.body.medium} ${typography.colors.whiteOpacity} mb-8`}>
                        {subscription.description || "Premium trading features for professional traders."}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                        {subscriptionFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <Check className={`w-5 h-5 ${typography.colors.accent} mr-3`} />
                                <span className={`${typography.body.medium} ${typography.colors.white}`}>
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                    <div className="flex items-baseline">
                        <span className={`${typography.heading.medium} ${typography.colors.accent}`}>
                            {subscription.price || "$29.99"}
                        </span>
                        <span className={`${typography.body.medium} ${typography.colors.whiteOpacity} ml-2`}>
                            /month
                        </span>
                    </div>
                    {subscription.savings && (
                        <p className={`${typography.body.small} ${typography.colors.whiteOpacity} mt-1`}>
                            {subscription.savings}
                        </p>
                    )}
                </div>

                {/* CTA Button */}
                <CheckoutButton
                    productName={subscription.name || "Trading Plan"}
                    amount={subscription.amount || 2999}
                    description={subscription.description || "Premium trading features"}
                    className="w-full"
                />
            </div>
        </motion.div>
    )
}

export default PlansPage

