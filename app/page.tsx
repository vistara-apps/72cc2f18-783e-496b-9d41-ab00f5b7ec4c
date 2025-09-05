'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card';
import { Button } from '@/components/Button';
import { RightsGuide } from '@/components/RightsGuide';
import { RecordingPanel } from '@/components/RecordingPanel';
import { ShareableCardGenerator } from '@/components/ShareableCardGenerator';
import { ContactPicker } from '@/components/ContactPicker';
import { AlertBanner } from '@/components/AlertBanner';
import { BookOpen, Mic, Share2, Users, Settings2 } from 'lucide-react';
import { EmergencyContact } from '@/lib/types';

type ActiveTab = 'home' | 'rights' | 'record' | 'share' | 'contacts';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const renderContent = () => {
    switch (activeTab) {
      case 'rights':
        return <RightsGuide language={language} />;
      case 'record':
        return <RecordingPanel emergencyContacts={emergencyContacts} language={language} />;
      case 'share':
        return <ShareableCardGenerator language={language} />;
      case 'contacts':
        return (
          <ContactPicker
            contacts={emergencyContacts}
            onContactsChange={setEmergencyContacts}
          />
        );
      default:
        return (
          <div className="space-y-6">
            {showWelcome && (
              <AlertBanner 
                variant="info" 
                onClose={() => setShowWelcome(false)}
              >
                {language === 'en' 
                  ? 'Welcome to Know-Your-Rights Cards. Your pocket guide to legal rights and safer interactions.'
                  : 'Bienvenido a Know-Your-Rights Cards. Su guía de bolsillo para derechos legales e interacciones más seguras.'
                }
              </AlertBanner>
            )}

            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-white">
                Know-Your-Rights Cards
              </h1>
              <p className="text-white text-opacity-80 text-lg leading-7">
                {language === 'en' 
                  ? 'Your pocket guide to legal rights and safer interactions.'
                  : 'Su guía de bolsillo para derechos legales e interacciones más seguras.'
                }
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Card 
                variant="outline" 
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => setActiveTab('record')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mic className="w-6 h-6 text-red-300" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">
                    {language === 'en' ? 'Record & Alert' : 'Grabar y Alertar'}
                  </h3>
                  <p className="text-sm text-white text-opacity-70">
                    {language === 'en' ? 'Start recording' : 'Iniciar grabación'}
                  </p>
                </CardContent>
              </Card>

              <Card 
                variant="outline" 
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => setActiveTab('rights')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-blue-300" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">
                    {language === 'en' ? 'Know Your Rights' : 'Conozca Sus Derechos'}
                  </h3>
                  <p className="text-sm text-white text-opacity-70">
                    {language === 'en' ? 'Legal guide' : 'Guía legal'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'One-page Rights Guide' : 'Guía de Derechos de Una Página'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Quick access to essential legal information and what to say during interactions.'
                      : 'Acceso rápido a información legal esencial y qué decir durante las interacciones.'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setActiveTab('rights')}
                    variant="secondary"
                    className="w-full"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'View Rights Guide' : 'Ver Guía de Derechos'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Shareable Content' : 'Contenido Compartible'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Generate and share rights information or incident documentation.'
                      : 'Genere y comparta información de derechos o documentación de incidentes.'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setActiveTab('share')}
                    variant="secondary"
                    className="w-full"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Generate Card' : 'Generar Tarjeta'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {renderContent()}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-purple-600 to-transparent">
          <div className="max-w-xl mx-auto">
            <div className="glass-card p-2 rounded-full">
              <div className="flex justify-around">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    activeTab === 'home' 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'text-white text-opacity-60 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Settings2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTab('rights')}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    activeTab === 'rights' 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'text-white text-opacity-60 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTab('record')}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    activeTab === 'record' 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'text-white text-opacity-60 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTab('share')}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    activeTab === 'share' 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'text-white text-opacity-60 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    activeTab === 'contacts' 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'text-white text-opacity-60 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Users className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom padding to account for fixed navigation */}
        <div className="h-20" />
      </div>
    </AppShell>
  );
}
