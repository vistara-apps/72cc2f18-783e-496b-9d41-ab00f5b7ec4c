'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
  onClick?: () => void;
}

export function Card({ 
  children, 
  variant = 'default', 
  className = '',
  onClick 
}: CardProps) {
  const baseClasses = "rounded-lg transition-all duration-200";
  
  const variantClasses = {
    default: "glass-card hover:bg-opacity-15",
    outline: "bg-transparent border-2 border-white border-opacity-30 hover:border-opacity-50 hover:bg-white hover:bg-opacity-5"
  };

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("p-6 pb-4", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-xl font-semibold text-white mb-2", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-white text-opacity-80 text-sm leading-6", className)}>
      {children}
    </p>
  );
}
