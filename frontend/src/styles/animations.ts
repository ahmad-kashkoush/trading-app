// Shared animation variants for framer-motion
import { Variants } from 'framer-motion';

// Common easing function used throughout the app
export const EASING = [0.25, 0.1, 0.25, 1] as const;

// Standard animation variants
export const animationVariants = {
  // Container animations
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  } as Variants,

  // Item slide up animation
  slideUp: {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: EASING,
      },
    },
  } as Variants,

  // Scale animation for accent elements
  scale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: EASING,
      },
    },
  } as Variants,

  // Stats/card animation
  card: {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: EASING,
      },
    },
  } as Variants,

  // Feature item animation
  feature: {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: EASING,
      },
    },
  } as Variants,

  // Stats animation
  stats: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: EASING,
      },
    },
  } as Variants,
};

// Common viewport settings
export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.3,
} as const;

// Common hover animations
export const HOVER_ANIMATIONS = {
  scale: { scale: 1.05 },
  scaleSmall: { scale: 1.02 },
  tap: { scale: 0.95 },
  lift: { y: -8, scale: 1.02 },
  liftSmall: { y: -5, scale: 1.02 },
} as const;

// Common transition durations
export const TRANSITIONS = {
  fast: { duration: 0.3 },
  medium: { duration: 0.5 },
  slow: { duration: 0.8 },
  verySlow: { duration: 1.2 },
} as const;
