import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { buttonStyles } from '@/styles/theme';

// Extend ButtonProps to include our custom variant types
interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
    variant?: 'primary' | 'secondary' | 'login' | 'signup' | 'danger' | 'success' | 'disabled' | 'base';
    children: React.ReactNode;
}

/**
 * Reusable Button component that uses the shared theme styles
 * 
 * Usage examples:
 * <ThemeButton variant="primary">Sign Up</ThemeButton>
 * <ThemeButton variant="secondary">Learn More</ThemeButton>
 * <ThemeButton variant="login">Login</ThemeButton>
 * <ThemeButton variant="danger">Delete</ThemeButton>
 */
const ThemeButton: React.FC<CustomButtonProps> = ({
    variant = 'base',
    children,
    sx = {},
    ...props
}) => {
    // Get the style based on variant
    const getVariantStyle = () => {
        switch (variant) {
            case 'primary':
                return buttonStyles.primary;
            case 'secondary':
                return buttonStyles.secondary;
            case 'login':
                return buttonStyles.login;
            case 'signup':
                return buttonStyles.signup;
            case 'danger':
                return buttonStyles.danger;
            case 'success':
                return buttonStyles.success;
            case 'disabled':
                return buttonStyles.disabled;
            case 'base':
            default:
                return buttonStyles.base;
        }
    };

    return (
        <Button
            sx={{
                ...getVariantStyle(),
                ...sx, // Allow custom styles to override
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default ThemeButton;
