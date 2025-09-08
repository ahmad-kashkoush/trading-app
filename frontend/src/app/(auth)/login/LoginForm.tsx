'use client';

import React, { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Alert, CircularProgress, TextField } from '@mui/material';
import ThemeButton from '@/components/ui/Button';

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid username or password');
        onError?.('Invalid username or password');
      } else if (result?.ok) {
        // Get the session to verify login
        const session = await getSession();
        if (session) {
          onSuccess?.();
          router.push('/'); // Redirect to home page
        }
      }
    } catch (err) {
      const errorMessage = 'An error occurred during login';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('github', { callbackUrl: '/' });
    } catch (err) {
      setError('GitHub login failed');
      onError?.('GitHub login failed');
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
        Sign In
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

      <ThemeButton
        type="submit"
        variant="login"
        fullWidth
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
      </ThemeButton>

      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          or
        </Typography>
      </Box>

      <ThemeButton
        variant="secondary"
        fullWidth
        onClick={handleGitHubLogin}
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        Continue with GitHub
      </ThemeButton>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          Don't have an account?{' '}
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
            Sign up
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
