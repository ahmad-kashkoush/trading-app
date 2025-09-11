'use client';

import { signup } from '@/actions/action';
import ThemeButton from '@/components/ui/Button';
import { saveTokenToCookie } from '@/utils';
import { Alert, Box, CircularProgress, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface SignupFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onError }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // For now, we'll simulate a signup by creating a user and then signing them in
      // In a real app, you'd make an API call to create the user first
      // const result = await signIn('credentials', {
      //   username: formData.username,
      //   password: formData.password,
      //   redirect: false,
      // });

      // if (result?.error) {
      //   setError('Failed to create account. Please try again.');
      //   onError?.('Failed to create account. Please try again.');
      // } else if (result?.ok) {
      //   onSuccess?.();
      //   router.push('/'); // Redirect to home page
      // }
      const result = await signup(formData);
      if(result.token){
        saveTokenToCookie(result.token);
      }
      router.push('/verify-email'); // Redirect to verify email page

    } catch {
      const errorMessage = 'An error occurred during signup';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignup = async () => {
    setIsLoading(true);
    try {
      await signIn('github', { callbackUrl: '/dashboard' });
    } catch {
      setError('GitHub signup failed');
      onError?.('GitHub signup failed');
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
        Create Account
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        name="username"
        label="Username"
        type="text"
        value={formData.username}
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

      <TextField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
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

      <TextField
        name="password"
        label="Password"
        type="password"
        value={formData.password}
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

      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
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
        variant="signup"
        fullWidth
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
      </ThemeButton>

      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          or
        </Typography>
      </Box>

      <ThemeButton
        variant="secondary"
        fullWidth
        onClick={handleGitHubSignup}
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        Continue with GitHub
      </ThemeButton>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          Already have an account?{' '}
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

export default SignupForm;
