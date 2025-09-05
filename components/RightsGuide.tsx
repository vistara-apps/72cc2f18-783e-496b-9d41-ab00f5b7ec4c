'use client';

import { useState } from 'react';
import { Copy, Check, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { Button } from './Button';
import { BASIC_RIGHTS } from '@/lib/constants';
import { copyToClipboard } from '@/lib/utils';

interface RightsGuideProps {
  language: 'en' | 'es';
}

export function RightsGuide({ language }: RightsGuideProps) {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);
  const rights = BASIC_RIGHTS[language];

  const handleCopyScript = async (script: string, key: string) => {
    const success = await copyToClipboard(script);
    if (success) {
      setCopiedScript(key);
      setTimeout(() => setCopiedScript(null), 2000);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{rights.title}</CardTitle>
          <CardDescription>
            {language === 'en' 
              ? "Essential rights you should know during law enforcement interactions"
              : "Derechos esenciales que debe conocer durante interacciones con las fuerzas del orden"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {rights.rights.map((right, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <span className="text-white text-opacity-90 leading-6">{right}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? "What to Say" : "Qué Decir"}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? "Use these exact phrases to protect your rights"
              : "Use estas frases exactas para proteger sus derechos"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(rights.scripts).map(([key, script]) => (
            <div key={key} className="p-4 bg-white bg-opacity-10 rounded-lg">
              <p className="text-white mb-3 leading-6">"{script}"</p>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleCopyScript(script, key)}
                  variant="ghost"
                  size="sm"
                >
                  {copiedScript === key ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Copied!' : '¡Copiado!'}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Copy' : 'Copiar'}
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => handleSpeak(script)}
                  variant="ghost"
                  size="sm"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Listen' : 'Escuchar'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
