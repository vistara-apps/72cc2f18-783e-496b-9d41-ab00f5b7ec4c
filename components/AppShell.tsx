'use client';

import { ReactNode } from 'react';
import { Shield, Menu, Globe } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showLanguageSwitcher?: boolean;
}

export function AppShell({ 
  children, 
  title = "Know-Your-Rights Cards",
  showLanguageSwitcher = true 
}: AppShellProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="shape w-20 h-20 bg-white rounded-lg top-10 left-10 animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="shape w-16 h-16 bg-white rounded-full top-32 right-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="shape w-12 h-12 bg-white rounded-lg bottom-40 left-16 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="shape w-24 h-24 bg-white rounded-full bottom-20 right-12 animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="shape w-8 h-8 bg-white rounded-lg top-1/2 left-1/4 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {showLanguageSwitcher && <LanguageSwitcher />}
          <button className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm hover:bg-opacity-30 transition-all duration-200">
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-8">
        <div className="max-w-xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
