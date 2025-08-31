# Components Directory

This directory contains all shared, reusable components organized by their purpose and scope.

## Directory Structure

```
src/
├── components/             # Shared components
│   ├── ui/                # All UI components (interactive + utility)
│   │   ├── Accordion/     # Accordion components (multiple files)
│   │   ├── Button.tsx     # Interactive button component
│   │   ├── Popup.tsx      # Modal/overlay component
│   │   ├── Logo.tsx       # Brand logo component
│   │   ├── Image.tsx      # Image handling component
│   │   ├── Video.tsx      # Video player component
│   │   └── index.ts       # Barrel exports
│   ├── layout/            # Layout and structural components
│   │   ├── MainLayout.tsx # Single file component
│   │   ├── Footer.tsx     # Single file component
│   │   ├── Navbar/        # Navbar components (multiple files)
│   │   ├── SectionLayout/ # Section layout components (multiple files)
│   │   └── index.ts       # Barrel exports
│   └── index.ts           # Main barrel export
├── constants/              # Application constants and configuration
│   ├── animations.ts       # Animation variants and configurations
│   ├── styles.ts           # Typography, spacing, and styling constants
│   └── index.ts            # Barrel exports
└── styles/                 # Theme and styling configurations
    ├── theme.ts            # Color schemes, breakpoints, and theme variables
    └── index.ts            # Barrel exports
```

## Component Organization Rules

### Single-File Components
- **No folders needed** for components with only one file
- **Direct placement** in their category directory
- **Examples**: `Button.tsx`, `Logo.tsx`, `MainLayout.tsx`

### Multi-File Components
- **Use folders** when a component has multiple related files
- **Include index.ts** for barrel exports from the folder
- **Examples**: `Accordion/`, `Navbar/`, `SectionLayout/`

## Component Categories

### UI Components (`/components/ui`)
All user interface components, both interactive and utility-focused.

- **Interactive Components**: Button, Popup, Accordion
- **Utility Components**: Logo, Image, Video
- **Accordion**: Collapsible content sections (multiple files)

### Layout Components (`/components/layout`)
Structural components that define the overall page layout and navigation.

- **MainLayout**: Primary page layout wrapper (single file)
- **Footer**: Page footer component (single file)
- **Navbar**: Main navigation components (multiple files)
- **SectionLayout**: Flexible section layout system (multiple files)

### Constants (`/constants`)
Application-wide constants and configuration values.

- **animations.ts**: Framer Motion animation variants and configurations
- **styles.ts**: Typography, spacing, button classes, and grid patterns

### Styles (`/styles`)
Theme and styling configurations.

- **theme.ts**: Color schemes, breakpoints, and CSS custom properties

## Import Patterns

### Components
```tsx
import { Button, Logo, Video } from '@/components/ui';
import { MainLayout, Footer } from '@/components/layout';
import { Accordion } from '@/components/ui/Accordion';
```

### Constants and Styles
```tsx
import { animationVariants, spacing, typography } from '@/constants';
import { COLORS, BREAKPOINTS } from '@/styles';
```

### All from Components
```tsx
import { Button, MainLayout, Logo } from '@/components';
```

## Naming Conventions

- **Component files**: PascalCase (e.g., `Accordion.tsx`)
- **Directories**: Only for multi-file components
- **Exports**: PascalCase (e.g., `export { Accordion }`)
- **No suffixes**: Remove unnecessary suffixes like "Component"

## Route-Specific Components

Route-specific components should remain in their respective route's `_components` folder:

```
src/app/
├── gold/
│   ├── _components/        # Gold route specific
│   │   └── Card.tsx
│   └── page.tsx
├── strategies/
│   ├── _components/        # Strategies route specific
│   │   └── TabsComponent.tsx
│   └── page.tsx
```

## Best Practices

1. **Component Organization**: Group related components together
2. **Folder Usage**: Only use folders for multi-file components
3. **Barrel Exports**: Use index.ts files for clean imports
4. **Naming**: Use descriptive, consistent names without suffixes
5. **Separation**: Keep route-specific vs. shared components separate
6. **Constants**: Keep application constants separate from components
7. **Styles**: Maintain theme and styling configurations separately

## Adding New Components

1. **Determine category**: UI or layout
2. **Check file count**: Single file → direct placement, multiple files → folder
3. **Add component**: Create the component file(s)
4. **Create index.ts**: Only if using a folder structure
5. **Update category index**: Add to appropriate category index.ts
6. **Update main index**: Add to main components index.ts if needed

## Adding New Constants/Styles

1. **Determine category**: constants or styles
2. **Add file**: Create the new constant or style file
3. **Update index.ts**: Export from the appropriate index.ts file
