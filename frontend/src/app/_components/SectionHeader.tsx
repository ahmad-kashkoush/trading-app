import React from 'react';
import { motion } from 'framer-motion';
import { animationVariants } from '../constants/animations';
import { typography, spacing, decorative } from '../constants/styles';

interface SectionHeaderProps {
  accent?: string;
  title: string;
  description?: string;
  showLine?: boolean;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  accent,
  title,
  description,
  showLine = false,
  alignment = 'center',
  className = '',
}) => {
  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      default:
        return 'text-center';
    }
  };

  return (
    <motion.div 
      variants={animationVariants.slideUp} 
      className={`${spacing.section} ${className}`}
    >
      <div className={`relative ${getAlignmentClasses()}`}>
        {/* Decorative line above title */}
        {showLine && alignment === 'center' && (
          <div className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 ${decorative.line}`} />
        )}
        
        {/* Accent text */}
        {accent && (
          <h3 className={`${typography.phonic} ${typography.accent.small} ${typography.colors.accent} mb-4`}>
            {accent}
          </h3>
        )}
        
        {/* Main title */}
        <h2 className={`${typography.serif} ${typography.heading.large} ${typography.colors.white}`}>
          {title}
        </h2>
      </div>
      
      {/* Description */}
      {description && (
        <p className={`${typography.phonic} ${typography.body.large} ${typography.colors.gray} ${spacing.maxWidth.text}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
