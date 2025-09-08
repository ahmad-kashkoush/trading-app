# Trading App Frontend

A modern trading application built with Next.js, Material UI, and NextAuth.js.

## Demo
https://github.com/user-attachments/assets/b48c61c6-95c4-45e3-8811-df6a5eb21726

## Features

- **Authentication**: Secure login/signup with NextAuth.js
- **Protected Routes**: Middleware-based route protection
- **Responsive Design**: Material UI components with custom theme
- **Dashboard**: User role-based dashboard with trading metrics
- **Modern UI**: Custom design system with consistent styling

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: Material UI v7
- **Authentication**: NextAuth.js
- **Styling**: Custom theme system + Tailwind CSS
- **TypeScript**: Full type safety
- **Animations**: Framer Motion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Add your environment variables
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (protected)/       # Protected dashboard pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── styles/               # Theme and styling
└── middleware.ts         # Route protection
```

## Authentication

The app uses Next.js middleware for route protection. Protected routes are automatically redirected to login if not authenticated.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

- `npm run lint` - Run ESLint
