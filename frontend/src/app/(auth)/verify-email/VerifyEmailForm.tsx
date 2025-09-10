'use client';

import React, { useState, useEffect } from 'react';
import { verifyEmail, resendVerificationCode } from '@/actions/action';
import { useRouter } from 'next/navigation';
import { TextField, Box, Typography, Alert, CircularProgress } from '@mui/material';
import ThemeButton from '@/components/ui/Button';
import { getTokenFromCookie, saveTokenToCookie } from '@/utils';

interface VerifyEmailFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    code: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get token from cookie when component mounts
    const userToken = getTokenFromCookie('userToken');
    if (!userToken) {
      setError('No authentication token found. Please sign up first.');
      // Redirect to signup if no token
      setTimeout(() => {
        router.push('/signup');
      }, 3000);
    } else {
      setToken(userToken);
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow numbers and limit to 6 digits
    if (name === 'code' && !/^\d{0,6}$/.test(value)) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error and success message when user starts typing
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const validateForm = () => {
    if (formData.code.length !== 6) {
      setError('Verification code must be 6 digits');
      return false;
    }
    if (!/^\d{6}$/.test(formData.code)) {
      setError('Verification code must contain only numbers');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !token) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const result = await verifyEmail(formData.code, token);
      console.log('Verification result:', result);
      
      if (result.token) {
        saveTokenToCookie(result.token);
      }
      
      onSuccess?.();
      router.push('/dashboard'); // Redirect to dashboard after successful verification
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred during email verification';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!token) {
      setError('No authentication token found');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const result = await resendVerificationCode(token);
      console.log('Resend result:', result);
      // Show success message
      setSuccessMessage('New verification code sent to your email!');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to resend verification code';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render form if no token
  if (!token) {
    return (
      <Box
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
          Email Verification
        </Typography>
        <Alert severity="error">
          No authentication token found. Redirecting to signup...
        </Alert>
      </Box>
    );
  }

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
        Verify Your Email
      </Typography>

      <Typography variant="body1" textAlign="center" color="rgba(255,255,255,0.7)" sx={{ mb: 2 }}>
        We've sent a 6-digit verification code to your email address. Please enter it below to verify your account.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <TextField
        name="code"
        label="Verification Code"
        type="text"
        value={formData.code}
        onChange={handleChange}
        required
        fullWidth
        disabled={isLoading}
        placeholder="Enter 6-digit code"
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
        variant="signup"
        fullWidth
        disabled={isLoading || formData.code.length !== 6}
        sx={{ py: 1.5 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify Email'}
      </ThemeButton>

      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          Didn't receive the code?
        </Typography>
      </Box>

      <ThemeButton
        variant="secondary"
        fullWidth
        onClick={handleResendCode}
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        Resend Verification Code
      </ThemeButton>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          Need to use a different email?{' '}
          <Typography
            component="a"
            href="/signup"
            sx={{
              color: 'var(--accent-color)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sign up again
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default VerifyEmailForm;
