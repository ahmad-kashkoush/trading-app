'use client';

import ThemeButton from '@/components/ui/Button';
import { Alert, Box, CircularProgress, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { apiAuth } from '@/services/apiAuth';

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiAuth.forgotPassword(email);
      setSuccess(response.message);
      onSuccess?.();
      
      // Redirect to reset password code page after 2 seconds
      setTimeout(() => {
        router.push('/reset-password-code');
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred while sending reset code';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        p: 3,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Forgot Password
      </Typography>

      <Typography variant="body2" textAlign="center" color="rgba(255,255,255,0.7)" sx={{ mb: 2 }}>
        Enter your email address and we&apos;ll send you a verification code to reset your password.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <TextField
        name="email"
        label="Email Address"
        type="email"
        value={email}
        onChange={handleChange}
        required
        fullWidth
        disabled={isLoading}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--accent-color)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--accent-color)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255,255,255,0.7)',
            '&.Mui-focused': {
              color: 'var(--accent-color)',
            },
          },
        }}
      />

      <ThemeButton
        type="submit"
        variant="login"
        fullWidth
        disabled={isLoading || !email.trim()}
        sx={{ py: 1.5 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Code'}
      </ThemeButton>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          Remember your password?{' '}
          <Typography
            component="a"
            href="/login"
            sx={{
              color: 'var(--accent-color)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sign in
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
