import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { SectionLayout } from '@/components/layout';
import { typography, spacing, buttonClasses } from '@/styles';

interface PaymentResultPageProps {
  type: 'success' | 'cancel' | 'error';
  title: string;
  description: string;
  icon: React.ReactNode;
  buttons: Array<{
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
  additionalContent?: React.ReactNode;
  iconBgColor?: string;
  borderColor?: string;
  titleColor?: string;
}

export default function PaymentResultLayout({
  type,
  title,
  description,
  icon,
  buttons,
  additionalContent,
  iconBgColor,
  borderColor,
  titleColor
}: PaymentResultPageProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          iconBg: iconBgColor || 'bg-green-500',
          container: `bg-green-900/20 border ${borderColor || 'border-green-500'}`,
          titleColor: titleColor || 'text-green-400'
        };
      case 'cancel':
        return {
          iconBg: iconBgColor || 'bg-yellow-500',
          container: `bg-yellow-900/20 border ${borderColor || 'border-yellow-500'}`,
          titleColor: titleColor || 'text-yellow-400'
        };
      case 'error':
        return {
          iconBg: iconBgColor || 'bg-red-500',
          container: `bg-red-900/20 border ${borderColor || 'border-red-500'}`,
          titleColor: titleColor || 'text-red-400'
        };
      default:
        return {
          iconBg: 'bg-gray-500',
          container: 'bg-gray-900/20 border border-gray-500',
          titleColor: 'text-gray-400'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <SectionLayout backgroundVariant="default" contentAlignment="center" minHeight="min-h-screen">
      <div className={`${spacing.maxWidth.small} text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${styles.container} rounded-lg p-8`}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-16 h-16 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${typography.heading.medium} mb-4 ${styles.titleColor}`}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${typography.body.medium} mb-6 text-gray-300`}
          >
            {description}
          </motion.p>

          {/* Additional Content */}
          {additionalContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              {additionalContent}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            {buttons.map((button, index) => (
              <Link key={index} href={button.href} className="block">
                <Button 
                  variant={button.variant} 
                  className={`${buttonClasses.base} w-full`}
                >
                  {button.label}
                </Button>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionLayout>
  );
}
