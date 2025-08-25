// Typography and styling constants
import { COLORS } from '../styles/theme';

// Typography classes - reusable text styles
export const typography = {
  // Brand font for headings and special text
  phonic: "font-['Phonic']",
  
  // Serif font for main headings
  serif: "font-serif",
  
  // Accent text styles
  accent: {
    small: "text-sm sm:text-base md:text-lg font-semibold tracking-[2px] uppercase",
    color: `text-[${COLORS.ACCENT_HEX}]`,
  },
  
  // Main heading responsive sizes
  heading: {
    hero: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight leading-tight",
    large: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight",
    medium: "text-2xl lg:text-3xl font-normal",
    small: "text-lg lg:text-xl font-semibold",
  },
  
  // Body text styles
  body: {
    large: "text-base sm:text-lg leading-relaxed",
    medium: "text-sm lg:text-base leading-relaxed",
    small: "text-xs sm:text-sm leading-relaxed",
  },
  
  // Text colors
  colors: {
    white: "text-white",
    accent: `text-[${COLORS.ACCENT_HEX}]`,
    gray: "text-gray-300",
    grayLight: "text-gray-400",
    whiteOpacity: "text-white/80",
    whiteOpacityLow: "text-white/60",
    whiteFaded: "text-white/50",
  },
};

// Common spacing patterns
export const spacing = {
  section: "space-y-6 lg:space-y-8",
  sectionLarge: "space-y-8 lg:space-y-12",
  container: "container mx-auto px-4 py-8 lg:py-16",
  maxWidth: {
    content: "max-w-6xl w-full",
    text: "max-w-3xl mx-auto",
    small: "max-w-2xl mx-auto",
    xsmall: "max-w-xl mx-auto",
    medium: "max-w-4xl mx-auto",
  },
  margins: {
    top: {
      small: "mt-8",
      medium: "mt-12",
      large: "mt-16",
      xlarge: "mt-20",
    },
    bottom: {
      small: "mb-8",
      medium: "mb-12",
      large: "mb-16",
      xlarge: "mb-20",
    },
  },
};

// Button styling patterns
export const buttonClasses = {
  base: "px-8 py-3 text-sm sm:text-base font-semibold rounded-full transition-all duration-300",
  primary: `bg-[${COLORS.ACCENT_HEX}] text-black hover:bg-[${COLORS.ACCENT_HOVER}]`,
  secondary: `border border-[${COLORS.ACCENT_HEX}] text-[${COLORS.ACCENT_HEX}] hover:bg-[${COLORS.ACCENT_HEX}] hover:text-black`,
  white: "border border-white/30 text-white hover:bg-white/10",
  sizes: {
    small: "min-w-[140px]",
    medium: "min-w-[180px]",
    large: "min-w-[200px]",
  },
  effects: {
    shadow: `hover:shadow-lg hover:shadow-[${COLORS.ACCENT_HEX}]/20`,
    shadowStrong: `shadow-lg hover:shadow-[${COLORS.ACCENT_HEX}]/25`,
  },
};

// Grid patterns
export const gridPatterns = {
  stats: "grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8",
  team: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  features: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12",
  cards: "grid grid-cols-1 md:grid-cols-2 gap-6",
};

// Card styling
export const cardStyles = {
  base: "relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl transition-all duration-500",
  hover: `hover:border-[${COLORS.ACCENT_HEX}]/30`,
  padding: "p-6 lg:p-8",
  paddingLarge: "p-8 lg:p-12",
};

// Decorative elements
export const decorative = {
  line: `w-12 h-px bg-gradient-to-r from-transparent via-[${COLORS.ACCENT_HEX}] to-transparent`,
  lineHorizontal: `w-10 md:w-16 h-px bg-[${COLORS.ACCENT_HEX}]`,
  glow: `absolute inset-0 rounded-3xl bg-gradient-to-r from-[${COLORS.ACCENT_HEX}]/20 via-transparent to-[${COLORS.ACCENT_HEX}]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`,
};
