import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Avatar } from '@mui/material';
import { COLORS, borderRadius, spacingValues } from '@/styles/theme';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  value?: string | number;
  icon?: React.ReactNode;
  variant?: 'default' | 'accent' | 'info' | 'success' | 'warning';
  children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  value,
  icon,
  variant = 'default',
  children
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'accent':
        return {
          background: `linear-gradient(135deg, ${COLORS.ACCENT}20, ${COLORS.ACCENT}10)`,
          border: `1px solid ${COLORS.ACCENT}40`,
        };
      case 'info':
        return {
          background: 'linear-gradient(135deg, #3b82f620, #3b82f610)',
          border: '1px solid #3b82f640',
        };
      case 'success':
        return {
          background: 'linear-gradient(135deg, #10b98120, #10b98110)',
          border: '1px solid #10b98140',
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #f59e0b20, #f59e0b10)',
          border: '1px solid #f59e0b40',
        };
      default:
        return {
          background: 'white',
          border: '1px solid rgba(0,0,0,0.1)',
        };
    }
  };

  return (
    <Card
      sx={{
        ...getVariantStyles(),
        borderRadius: borderRadius.lg,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <CardContent sx={{ p: spacingValues.lg }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                color: COLORS.BLACK,
                mb: subtitle ? 0.5 : 1
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(0,0,0,0.6)',
                  mb: 1
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {icon && (
            <Avatar
              sx={{
                bgcolor: variant === 'accent' ? COLORS.ACCENT : 'rgba(0,0,0,0.1)',
                color: variant === 'accent' ? COLORS.BLACK : 'rgba(0,0,0,0.6)',
                width: 40,
                height: 40,
              }}
            >
              {icon}
            </Avatar>
          )}
        </Box>
        
        {value && (
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: variant === 'accent' ? COLORS.ACCENT_HEX : COLORS.BLACK,
              mb: 2
            }}
          >
            {value}
          </Typography>
        )}
        
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
