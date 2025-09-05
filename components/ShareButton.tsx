'use client';

import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Button } from './Button';
import { shareContent, copyToClipboard } from '@/lib/utils';

interface ShareButtonProps {
  variant?: 'iconOnly' | 'withText';
  title: string;
  text: string;
  url?: string;
  className?: string;
}

export function ShareButton({ 
  variant = 'withText', 
  title, 
  text, 
  url,
  className = '' 
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    
    const success = await shareContent({ title, text, url });
    
    if (!success) {
      // Fallback to copy
      const copySuccess = await copyToClipboard(`${title}\n\n${text}${url ? `\n\n${url}` : ''}`);
      if (copySuccess) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
    
    setLoading(false);
  };

  if (variant === 'iconOnly') {
    return (
      <button
        onClick={handleShare}
        disabled={loading}
        className={cn(
          "p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm hover:bg-opacity-30 transition-all duration-200 disabled:opacity-50",
          className
        )}
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-300" />
        ) : (
          <Share2 className="w-5 h-5 text-white" />
        )}
      </button>
    );
  }

  return (
    <Button
      onClick={handleShare}
      loading={loading}
      variant="secondary"
      className={className}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </>
      )}
    </Button>
  );
}
