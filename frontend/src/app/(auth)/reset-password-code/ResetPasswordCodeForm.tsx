'use client';

import ThemeButton from '@/components/ui/Button';
import { Alert, Box, CircularProgress, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { apiAuth } from '@/services/apiAuth';

interface ResetPasswordCodeFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ResetPasswordCodeForm: React.FC<ResetPasswordCodeFormProps> = ({ onSuccess, onError }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setCode(value);
    }
    // Clear error when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiAuth.resetPasswordCode(code);
      setSuccess(response.message);
      onSuccess?.();
      
      // Redirect to reset password form after 1 second
      setTimeout(() => {
        router.push('/reset-password');
      }, 1000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Invalid or expired verification code';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      // Since we don't have a direct resend for password reset, redirect back to forgot password
      router.push('/forgot-password');
    } catch (err: any) {
      setError('Failed to resend code. Please try again.');
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
        Verify Reset Code
      </Typography>

      <Typography variant="body2" textAlign="center" color="rgba(255,255,255,0.7)" sx={{ mb: 2 }}>
        Enter the 6-digit verification code sent to your email address.
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
        name="code"
        label="Verification Code"
        type="text"
        value={code}
        onChange={handleChange}
        required
        fullWidth
        disabled={isLoading}
        placeholder="123456"
        inputProps={{
          maxLength: 6,
          style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }
        }}
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
        disabled={isLoading || code.length !== 6}
        sx={{ py: 1.5 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify Code'}
      </ThemeButton>

      <ThemeButton
        variant="secondary"
        fullWidth
        onClick={handleResendCode}
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        Resend Code
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

export default ResetPasswordCodeForm;
