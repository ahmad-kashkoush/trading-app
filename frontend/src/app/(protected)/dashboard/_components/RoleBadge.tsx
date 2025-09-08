import React from 'react';
import { Chip, Box, Typography } from '@mui/material';
import { COLORS, borderRadius } from '@/styles/theme';

interface RoleBadgeProps {
  role: string;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ 
  role, 
  size = 'medium', 
  showLabel = true 
}) => {
  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return {
          bgcolor: '#dc2626',
          color: 'white',
        };
      case 'moderator':
        return {
          bgcolor: '#7c3aed',
          color: 'white',
        };
      case 'user':
        return {
          bgcolor: COLORS.ACCENT_HEX,
          color: COLORS.BLACK,
        };
      case 'premium':
        return {
          bgcolor: COLORS.GOLD_HEX,
          color: COLORS.BLACK,
        };
      default:
        return {
          bgcolor: 'rgba(0,0,0,0.1)',
          color: 'rgba(0,0,0,0.8)',
        };
    }
  };

  const getSizeProps = () => {
    switch (size) {
      case 'small':
        return { height: 24, fontSize: '0.75rem' };
      case 'large':
        return { height: 40, fontSize: '1rem', px: 2 };
      default:
        return { height: 32, fontSize: '0.875rem' };
    }
  };

  const roleColors = getRoleColor(role);
  const sizeProps = getSizeProps();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {showLabel && (
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(0,0,0,0.7)',
            fontWeight: 500
          }}
        >
          Role:
        </Typography>
      )}
      <Chip
        label={role.toUpperCase()}
        sx={{
          ...roleColors,
          ...sizeProps,
          borderRadius: borderRadius.md,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      />
    </Box>
  );
};

export default RoleBadge;
