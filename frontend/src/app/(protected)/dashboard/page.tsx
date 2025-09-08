"use client";
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Divider,
  useMediaQuery,
} from '@mui/material';
import {
  Person as PersonIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useSession } from "next-auth/react";
import { COLORS, BREAKPOINTS, spacingValues } from '@/styles/theme';
import ThemeButton from '@/components/ui/Button';
import DashboardCard from './_components/DashboardCard';
import RoleBadge from './_components/RoleBadge';

export default function DashboardPage() {
  const { data: session } = useSession();
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);

  const userDisplayName = session?.user?.name || session?.user?.email || 'User';
  const userInitials = userDisplayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: spacingValues.xl,
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: spacingValues.xl }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: COLORS.BLACK,
              mb: 2,
              textAlign: isTablet ? 'center' : 'left',
            }}
          >
            Dashboard
          </Typography>
          
          {/* Welcome Card */}
          <DashboardCard
            variant="accent"
            title="Welcome back!"
            subtitle={`You are logged in as ${userDisplayName}`}
            icon={<PersonIcon />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Avatar
                src={session?.user?.image || undefined}
                sx={{
                  bgcolor: session?.user?.image ? 'transparent' : COLORS.ACCENT,
                  color: session?.user?.image ? 'inherit' : COLORS.BLACK,
                  width: 48,
                  height: 48,
                }}
              >
                {!session?.user?.image && userInitials}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: COLORS.BLACK }}>
                  {userDisplayName}
                </Typography>
                <RoleBadge role={session?.user?.role || 'user'} size="medium" />
              </Box>
            </Box>
          </DashboardCard>
        </Box>

        {/* Main Content Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
            mb: 3,
          }}
        >
          {/* Account Information Card */}
          <DashboardCard
            title="Account Information"
            subtitle="Your account details"
            icon={<PersonIcon />}
          >
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', mb: 0.5 }}>
                  Email Address
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {session?.user?.email || 'Not provided'}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', mb: 0.5 }}>
                  User ID
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
                  {session?.user?.id || 'N/A'}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <ThemeButton variant="secondary" size="small" fullWidth>
                Edit Profile
              </ThemeButton>
            </Box>
          </DashboardCard>

          {/* Role & Permissions Card */}
          <DashboardCard
            title="Role & Permissions"
            subtitle="Your access level and capabilities"
            icon={<SecurityIcon />}
            variant="info"
          >
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <RoleBadge role={session?.user?.role || 'user'} size="large" showLabel={false} />
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', mb: 2 }}>
                Your role determines what features and data you can access within the platform.
              </Typography>
              <ThemeButton variant="secondary" size="small" fullWidth>
                View Permissions
              </ThemeButton>
            </Box>
          </DashboardCard>

          {/* Quick Actions Card */}
          <DashboardCard
            title="Quick Actions"
            subtitle="Common tasks and shortcuts"
            icon={<SettingsIcon />}
            variant="success"
          >
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <ThemeButton variant="primary" size="small" fullWidth>
                View Trading Dashboard
              </ThemeButton>
              <ThemeButton variant="secondary" size="small" fullWidth>
                Account Settings
              </ThemeButton>
              <ThemeButton variant="base" size="small" fullWidth>
                Help & Support
              </ThemeButton>
            </Box>
          </DashboardCard>
        </Box>

        {/* Stats Overview - Full Width */}
        <DashboardCard
          title="Platform Overview"
          subtitle="Your trading journey at a glance"
          icon={<TrendingUpIcon />}
          variant="warning"
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 3,
              mt: 1,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: COLORS.ACCENT_HEX, mb: 1 }}>
                $0.00
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                Portfolio Value
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981', mb: 1 }}>
                0
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                Active Positions
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#3b82f6', mb: 1 }}>
                0
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                Watchlists
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#7c3aed', mb: 1 }}>
                0
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                Alerts Set
              </Typography>
            </Box>
          </Box>
        </DashboardCard>
      </Container>
    </Box>
  );
}