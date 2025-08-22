# MainLayout Component Documentation

## Overview
The `MainLayout` component provides a flexible and reusable section layout system for building modern landing pages with support for images, different content alignments, and smooth animations.

## Features
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Flexible Alignments**: Left, center, or right content alignment
- ✅ **Image Integration**: Background images, positioned images (left/right/center)
- ✅ **Smooth Animations**: Framer Motion for scroll-triggered animations
- ✅ **Reusable Components**: Modular section design
- ✅ **Image Optimization**: Built-in loading states and error handling

## SectionLayout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | - | Unique identifier for the section |
| `children` | ReactNode | - | Content to render inside the section |
| `className` | string | '' | Additional CSS classes |
| `backgroundVariant` | 'default' \| 'alternate' \| 'accent' | 'default' | Background color theme |
| `showDecorations` | boolean | true | Whether to show decorative background elements |
| `contentAlignment` | 'left' \| 'center' \| 'right' | 'center' | Content alignment |
| `backgroundImage` | string | - | URL for background or positioned image |
| `imagePosition` | 'left' \| 'right' \| 'center' \| 'background' | 'background' | Where to position the image |
| `imageSize` | 'small' \| 'medium' \| 'large' \| 'cover' | 'cover' | Size of positioned images |
| `overlay` | boolean | false | Dark overlay for background images |

## Usage Examples

### 1. Basic Section (Center-aligned, no image)
```tsx
<SectionLayout id="basic" backgroundVariant="default">
  <h1>Hello World</h1>
  <p>This is a basic section</p>
</SectionLayout>
```

### 2. Section with Background Image
```tsx
<SectionLayout 
  id="hero" 
  backgroundVariant="default"
  backgroundImage="https://example.com/hero.jpg"
  imagePosition="background"
  overlay={true}
>
  <h1>Hero Section</h1>
  <p>Content over background image</p>
</SectionLayout>
```

### 3. Left-aligned Content with Right Image
```tsx
<SectionLayout 
  id="features" 
  backgroundVariant="alternate"
  contentAlignment="left"
  backgroundImage="https://example.com/features.jpg"
  imagePosition="right"
  imageSize="large"
>
  <h2>Amazing Features</h2>
  <p>Description of features...</p>
</SectionLayout>
```

### 4. Right-aligned Content with Left Image
```tsx
<SectionLayout 
  id="about" 
  backgroundVariant="accent"
  contentAlignment="right"
  backgroundImage="https://example.com/about.jpg"
  imagePosition="left"
  imageSize="medium"
>
  <h2>About Us</h2>
  <p>Our story...</p>
</SectionLayout>
```

### 5. Center Image with Content Below
```tsx
<SectionLayout 
  id="team" 
  backgroundVariant="default"
  contentAlignment="center"
  backgroundImage="https://example.com/team.jpg"
  imagePosition="center"
  imageSize="large"
>
  <h2>Our Team</h2>
  <p>Meet the people behind our success</p>
</SectionLayout>
```

## Background Variants

### Default
- Dark gradient from black to gray-800
- Professional and clean look

### Alternate  
- Dark gradient from gray-900 to black
- Slightly lighter than default

### Accent
- Dark gradient with green accent (green-950)
- Matches the brand's accent color

## Image Sizes

- **small**: 256px × 256px (mobile), 320px × 320px (desktop)
- **medium**: 320px × 320px (mobile), 384px × 384px (desktop)
- **large**: 384px × 384px (mobile), 500px × 500px (desktop)
- **cover**: Full width and height, object-cover

## Content Alignment

- **left**: Content aligned to the left side
- **center**: Content centered (default)
- **right**: Content aligned to the right side

## Animation Features

- Scroll-triggered animations using Framer Motion
- Staggered children animation for smooth reveals
- Hover effects on interactive elements
- Smooth image loading with fade-in effect

## Custom Styling

The component uses Tailwind CSS classes. You can extend styling by:

1. Adding custom classes via the `className` prop
2. Modifying the global CSS in `globals.css`
3. Creating custom variants in the component

## Best Practices

1. **Image Optimization**: Use optimized images (WebP format recommended)
2. **Alt Text**: Always provide meaningful alt text for images
3. **Loading**: Use lazy loading for images not in viewport
4. **Responsive**: Test on different screen sizes
5. **Performance**: Avoid large background images for mobile

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- Focus management

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers
