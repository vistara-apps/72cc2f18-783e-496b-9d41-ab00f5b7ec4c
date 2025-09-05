'use client';

import { cn } from '@/lib/utils';

interface RecordingIndicatorProps {
  variant: 'active' | 'inactive';
  className?: string;
}

export function RecordingIndicator({ variant, className = '' }: RecordingIndicatorProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn(
        "w-3 h-3 rounded-full",
        variant === 'active' ? "recording-indicator" : "bg-gray-400"
      )} />
      <span className={cn(
        "text-sm font-medium",
        variant === 'active' ? "text-red-300" : "text-gray-400"
      )}>
        {variant === 'active' ? 'Recording' : 'Not Recording'}
      </span>
    </div>
  );
}
