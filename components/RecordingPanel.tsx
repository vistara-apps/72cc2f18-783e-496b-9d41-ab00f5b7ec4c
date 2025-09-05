'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square, Play, Pause, AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { RecordingIndicator } from './RecordingIndicator';
import { AlertBanner } from './AlertBanner';
import { EmergencyContact } from '@/lib/types';
import { getCurrentLocation } from '@/lib/utils';
import { EMERGENCY_ALERT_MESSAGE } from '@/lib/constants';

interface RecordingPanelProps {
  emergencyContacts: EmergencyContact[];
  language: 'en' | 'es';
}

export function RecordingPanel({ emergencyContacts, language }: RecordingPanelProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [alertSent, setAlertSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false // For now, just audio recording
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        // Here you would typically upload the recording to your backend
        console.log('Recording saved:', blob);
        
        // Clean up
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Send emergency alert
      await sendEmergencyAlert();

    } catch (err) {
      console.error('Error starting recording:', err);
      setError(language === 'en' 
        ? 'Unable to start recording. Please check microphone permissions.'
        : 'No se puede iniciar la grabación. Verifique los permisos del micrófono.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const sendEmergencyAlert = async () => {
    if (emergencyContacts.length === 0) return;

    try {
      const location = await getCurrentLocation();
      const message = EMERGENCY_ALERT_MESSAGE[language];
      const timestamp = new Date().toLocaleString();
      
      const alertData = {
        message,
        timestamp,
        location: location ? `${location.latitude}, ${location.longitude}` : 'Location unavailable',
        contacts: emergencyContacts
      };

      // Here you would send the alert via your backend API
      // For now, we'll simulate it
      console.log('Emergency alert sent:', alertData);
      setAlertSent(true);

    } catch (err) {
      console.error('Error sending emergency alert:', err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {error && (
        <AlertBanner variant="error" onClose={() => setError(null)}>
          {error}
        </AlertBanner>
      )}

      {alertSent && (
        <AlertBanner variant="success">
          {language === 'en' 
            ? '✅ Emergency alert sent to your contacts'
            : '✅ Alerta de emergencia enviada a sus contactos'
          }
        </AlertBanner>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {language === 'en' ? 'Record & Alert' : 'Grabar y Alertar'}
            </CardTitle>
            <RecordingIndicator variant={isRecording ? 'active' : 'inactive'} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recording Controls */}
          <div className="text-center space-y-4">
            {isRecording && (
              <div className="text-2xl font-mono text-white">
                {formatTime(recordingTime)}
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  variant="destructive"
                  size="lg"
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Start Recording' : 'Iniciar Grabación'}
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  variant="secondary"
                  size="lg"
                >
                  <Square className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Stop Recording' : 'Detener Grabación'}
                </Button>
              )}
            </div>
          </div>

          {/* Emergency Contacts Info */}
          {emergencyContacts.length > 0 ? (
            <div className="p-4 bg-white bg-opacity-10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium text-white">
                  {language === 'en' 
                    ? `Alert will be sent to ${emergencyContacts.length} contact(s)`
                    : `La alerta se enviará a ${emergencyContacts.length} contacto(s)`
                  }
                </span>
              </div>
              <div className="text-xs text-white text-opacity-70">
                {emergencyContacts.map(contact => contact.name).join(', ')}
              </div>
            </div>
          ) : (
            <AlertBanner variant="warning">
              {language === 'en' 
                ? 'No emergency contacts set. Add contacts in settings to enable alerts.'
                : 'No hay contactos de emergencia configurados. Agregue contactos en la configuración para habilitar alertas.'
              }
            </AlertBanner>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
