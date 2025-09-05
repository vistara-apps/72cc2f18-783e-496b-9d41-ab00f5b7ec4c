'use client';

import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlertType } from '@/lib/types';

interface AlertBannerProps {
  children: ReactNode;
  variant: AlertType;
  onClose?: () => void;
  className?: string;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertCircle,
};

const variantClasses = {
  info: 'alert-info',
  warning: 'alert-warning',
  success: 'alert-success',
  error: 'alert-error',
};

export function AlertBanner({ 
  children, 
  variant, 
  onClose, 
  className = '' 
}: AlertBannerProps) {
  const Icon = icons[variant];

  return (
    <div className={cn(
      'alert-banner flex items-start space-x-3',
      variantClasses[variant],
      className
    )}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-sm leading-5">
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
