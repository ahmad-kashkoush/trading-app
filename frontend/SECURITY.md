# Security Guidelines

## Environment Variables
- Always use environment variables for sensitive data
- Never commit `.env.local` or `.env` files to version control
- Use `.env.example` as a template for required environment variables

## Production Deployment
1. Remove or disable demo login functionality
2. Use strong, randomly generated secrets for `NEXTAUTH_SECRET`
3. Configure proper CORS settings on your backend
4. Use HTTPS in production
5. Set proper `NEXTAUTH_URL` for your domain

## Demo Credentials
Demo login is intended for development only. To disable in production:
- Remove `DEMO_USERNAME` and `DEMO_PASSWORD` environment variables
- The demo login will automatically fall back to requiring real credentials

## Token Security
- Backend JWT tokens are securely stored in NextAuth session
- Tokens are automatically included in API requests through the authentication flow
- Session cookies are httpOnly and secure by default with NextAuth
