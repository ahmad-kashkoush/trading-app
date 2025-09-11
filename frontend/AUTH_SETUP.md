# Authentication Setup Guide

This guide will help you set up authentication for your trading app.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# GitHub OAuth (Optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## Features

### Login Page (`/auth/login`)
- Username/password authentication
- GitHub OAuth integration
- Form validation and error handling
- Responsive design

### Signup Page (`/auth/signup`)
- User registration form
- Password confirmation
- Email validation
- GitHub OAuth integration

### Authentication Components
- `LoginForm`: Handles user login
- `SignupForm`: Handles user registration
- `AuthWrapper`: Provides session context
- `UserMenu`: Shows user info and logout option

## Usage

### Testing Credentials
For development, you can use demo login functionality by setting up environment variables in your `.env.local` file:
```env
DEMO_USERNAME=your-demo-username
DEMO_PASSWORD=your-demo-password
```

### GitHub OAuth Setup
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to your `.env.local` file

## Navigation
The navbar automatically shows:
- Login/Signup buttons when user is not authenticated
- User menu with logout option when user is authenticated

## Styling
All authentication pages use the app's theme with:
- Dark background with gradient
- Glassmorphism effect
- Accent color highlights
- Responsive design
