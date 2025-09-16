'use client';

import ThemeButton from '@/components/ui/Button';
import { Alert, Box, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { apiAuth } from '@/services/apiAuth';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiAuth.resetPassword(formData.password);
      setSuccess(response.message);
      onSuccess?.();
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred while resetting password';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
        Reset Password
      </Typography>

      <Typography variant="body2" textAlign="center" color="rgba(255,255,255,0.7)" sx={{ mb: 2 }}>
        Create a new password for your account.
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
        name="password"
        label="New Password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        disabled={isLoading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                edge="end"
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
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

      <TextField
        name="confirmPassword"
        label="Confirm New Password"
        type={showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        fullWidth
        disabled={isLoading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={toggleShowConfirmPassword}
                edge="end"
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
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
        disabled={isLoading || !formData.password || !formData.confirmPassword}
        sx={{ py: 1.5 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
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

export default ResetPasswordForm;
