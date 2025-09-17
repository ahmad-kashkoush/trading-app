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
  buttons: Array<{ label: string; href: string; variant: 'primary' | 'secondary' }>;
  additionalContent?: React.ReactNode;
}

const STYLES = {
  success: { iconBg: 'bg-green-500', container: 'bg-green-900/20 border-green-500', titleColor: 'text-green-400' },
  cancel: { iconBg: 'bg-yellow-500', container: 'bg-yellow-900/20 border-yellow-500', titleColor: 'text-yellow-400' },
  error: { iconBg: 'bg-red-500', container: 'bg-red-900/20 border-red-500', titleColor: 'text-red-400' }
};

export default function PaymentResultLayout({ type, title, description, icon, buttons, additionalContent }: PaymentResultPageProps) {
  const styles = STYLES[type];

  return (
    <SectionLayout backgroundVariant="default" contentAlignment="center" minHeight="min-h-screen">
      <div className={`${spacing.maxWidth.small} text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${styles.container} border rounded-lg p-8`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-16 h-16 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}
          >
            {icon}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${typography.heading.medium} mb-4 ${styles.titleColor}`}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${typography.body.medium} mb-6 text-gray-300`}
          >
            {description}
          </motion.p>

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            {buttons.map((button, index) => (
              <Link key={index} href={button.href} className="block">
                <Button variant={button.variant} className={`${buttonClasses.base} w-full`}>
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
