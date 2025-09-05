# Shared Theme & Button Styles Guide

## Overview
The trading app uses a centralized theme system to ensure consistent styling across all components.

## Files
- `src/app/styles/theme.ts` - Central theme configuration
- `src/app/_components/ThemeButton.tsx` - Reusable button component

## Usage Examples

### 1. Using the ThemeButton Component (Recommended)

```tsx
import ThemeButton from '@/app/_components/ThemeButton';

// Primary button (filled with accent color)
<ThemeButton variant="primary">Sign Up Now</ThemeButton>

// Secondary button (outline style)
<ThemeButton variant="secondary">Learn More</ThemeButton>

// Login button
<ThemeButton variant="login">Login</ThemeButton>

// Danger button
<ThemeButton variant="danger">Delete Account</ThemeButton>

// Success button
<ThemeButton variant="success">Save Changes</ThemeButton>

// Custom styles (extends the theme)
<ThemeButton 
    variant="primary" 
    sx={{ width: '100%', py: 2 }}
>
    Full Width Button
</ThemeButton>
```

### 2. Using Styles Directly in Material-UI Components

```tsx
import { Button } from '@mui/material';
import { buttonStyles } from '@/app/styles/theme';

<Button sx={buttonStyles.primary}>
    Primary Action
</Button>

<Button sx={buttonStyles.secondary}>
    Secondary Action
</Button>

// Combine with custom styles
<Button sx={{ ...buttonStyles.primary, mt: 2 }}>
    Primary with Margin
</Button>
```

### 3. Using Colors and Other Theme Values

```tsx
import { COLORS, BREAKPOINTS, spacing } from '@/app/styles/theme';
import { useMediaQuery, Box } from '@mui/material';

const MyComponent = () => {
    const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
    
    return (
        <Box 
            sx={{ 
                backgroundColor: COLORS.BLACK,
                color: COLORS.WHITE,
                padding: spacing.lg,
                '&:hover': {
                    backgroundColor: COLORS.HOVER
                }
            }}
        >
            Content here
        </Box>
    );
};
```

## Available Button Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `primary` | Filled with accent color | Main CTAs, sign up buttons |
| `secondary` | Outline style | Secondary actions, learn more |
| `login` | Black background with accent border | Login forms |
| `signup` | Same as primary | Signup forms |
| `danger` | Red background | Delete, cancel actions |
| `success` | Green background | Save, confirm actions |
| `disabled` | Grayed out | Disabled states |
| `base` | Simple white text | Navigation items |

## Theme Colors

```tsx
COLORS.ACCENT      // "rgb(204, 255, 0)" - Main brand color
COLORS.BLACK       // "black" - Dark backgrounds
COLORS.WHITE       // "white" - Light text
COLORS.HOVER       // "rgba(255,255,255,0.1)" - Hover states
COLORS.HOVER_DARK  // "rgba(0,0,0,0.1)" - Dark hover states
```

## Breakpoints

```tsx
BREAKPOINTS.DESKTOP  // "(min-width:1200px)"
BREAKPOINTS.TABLET   // "(min-width:768px)" 
BREAKPOINTS.SMALL    // "(min-width:500px)"
```

## Best Practices

1. **Use ThemeButton component** for consistent button styling
2. **Import from theme.ts** for colors and breakpoints
3. **Extend, don't override** - use sx prop to add custom styles
4. **Stay consistent** - stick to the defined variants
5. **Test responsively** - use the defined breakpoints

## Adding New Button Variants

To add a new button variant:

1. Add the style to `buttonStyles` in `theme.ts`
2. Update the `CustomButtonProps` type in `ThemeButton.tsx`
3. Add the case to the `getVariantStyle()` function
4. Update this documentation

Example:
```tsx
// In theme.ts
warning: {
    color: COLORS.BLACK,
    backgroundColor: '#f59e0b',
    border: '1px solid #f59e0b',
    textTransform: 'inherit' as const,
    '&:hover': {
        backgroundColor: '#d97706',
        borderColor: '#d97706',
    },
},
```
