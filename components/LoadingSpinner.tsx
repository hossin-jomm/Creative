'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  text,
  fullScreen = false
}) => {
  // Size mapping
  const sizeMap = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  // Color mapping
  const colorMap = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent',
    white: 'border-white'
  };

  const spinnerSize = sizeMap[size];
  const spinnerColor = colorMap[color as keyof typeof colorMap] || 'border-primary';

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-black/50 z-50'
    : 'flex flex-col items-center justify-center';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <motion.div
          className={`${spinnerSize} border-4 border-t-transparent rounded-full ${spinnerColor}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          data-testid="loading-spinner"
        />
        {text && (
          <motion.p 
            className="mt-3 text-sm font-medium text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;