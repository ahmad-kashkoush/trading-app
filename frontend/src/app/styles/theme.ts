// Shared theme configuration for the entire app

export const COLORS = {
    ACCENT: "rgb(204, 255, 0)",
    ACCENT_HEX: "#ccff00", // For Tailwind classes
    ACCENT_HOVER: "#b8e600", // Hover variant
    BLACK: "black",
    WHITE: "white",
    HOVER: "rgba(255,255,255,0.1)",
    HOVER_DARK: "rgba(0,0,0,0.1)",
    GOLD: "rgba(191, 170, 112, 1)",
    GOLD_HEX: "#bfaa70ff",
} as const;

export const BREAKPOINTS = {
    DESKTOP: '(min-width:1200px)',
    TABLET: '(min-width:768px)',
    SMALL: '(min-width:500px)',
} as const;

// Shared button styles that can be used across the entire app
export const buttonStyles = {
    // Base button style - white text with hover effect
    base: {
        color: COLORS.WHITE,
        textTransform: 'inherit' as const,
        '&:hover': {
            backgroundColor: COLORS.HOVER,
        },
    },

    // Primary accent button - filled with accent color
    primary: {
        color: COLORS.BLACK,
        backgroundColor: 'var(--accent-color)',
        border: '1px solid var(--accent-color)',
        textTransform: 'inherit' as const,
        '&:hover': {
            backgroundColor: COLORS.BLACK,
            borderColor: 'var(--accent-color)',
            color: 'var(--accent-color)',
        },
    },

    // Secondary outline button - accent border with transparent background
    secondary: {
        color: 'var(--accent-color)',
        borderColor: 'var(--accent-color)',
        backgroundColor: 'transparent',
        border: "1px solid",
        textTransform: 'inherit' as const,
        '&:hover': {
            backgroundColor: 'var(--accent-color)',
            color: COLORS.BLACK,
        },
    },

    // Login button (secondary variant with black background)
    login: {
        color: 'var(--accent-color)',
        borderColor: 'var(--accent-color)',
        backgroundColor: COLORS.BLACK,
        border: "1px solid",
        textTransform: 'inherit' as const,
        mx: 1,
        '&:hover': {
            backgroundColor: 'var(--accent-color)',
            color: COLORS.BLACK,
        },
    },

    // Signup button (primary variant)
    signup: {
        color: COLORS.BLACK,
        backgroundColor: 'var(--accent-color)',
        border: '1px solid var(--accent-color)',
        textTransform: 'inherit' as const,
        mx: 1,
        '&:hover': {
            backgroundColor: COLORS.BLACK,
            borderColor: 'var(--accent-color)',
            color: 'var(--accent-color)',
        },
    },

    // Danger/Error button - red accent
    danger: {
        color: COLORS.WHITE,
        backgroundColor: '#dc2626',
        border: '1px solid #dc2626',
        textTransform: 'inherit' as const,
        '&:hover': {
            backgroundColor: '#b91c1c',
            borderColor: '#b91c1c',
        },
    },

    // Success button - green accent
    success: {
        color: COLORS.WHITE,
        backgroundColor: '#16a34a',
        border: '1px solid #16a34a',
        textTransform: 'inherit' as const,
        '&:hover': {
            backgroundColor: '#15803d',
            borderColor: '#15803d',
        },
    },

    // Disabled button
    disabled: {
        color: 'rgba(255,255,255,0.3)',
        backgroundColor: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        textTransform: 'inherit' as const,
        cursor: 'not-allowed',
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
        },
    },
} as const;

// Menu/dropdown styles
export const menuStyles = {
    paper: {
        backgroundColor: COLORS.BLACK,
        color: COLORS.WHITE,
        '& .MuiMenuItem-root:hover': {
            backgroundColor: COLORS.HOVER,
        },
    },
    drawer: {
        backgroundColor: COLORS.BLACK,
        color: COLORS.WHITE,
        width: "100vw",
        height: "100vh",
        top: "64px",
    },
} as const;

// Common spacing and sizing utilities
export const spacing = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
} as const;

export const borderRadius = {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
} as const;
