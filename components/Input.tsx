'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white text-opacity-90">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "input-field w-full",
            error && "border-red-400 focus:ring-red-400",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-300">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
