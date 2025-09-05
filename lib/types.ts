export interface User {
  userId: string;
  preferredLanguage: 'en' | 'es';
  emergencyContacts: EmergencyContact[];
  stateSpecificInformation?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface Interaction {
  interactionId: string;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  recordingUrl?: string;
  notes?: string;
  shareableContentUrl?: string;
  userId: string;
}

export interface RightsCard {
  cardId: string;
  content: string;
  language: 'en' | 'es';
  state?: string;
  createdAt: Date;
  onchainHash?: string;
}

export interface RightsGuide {
  id: string;
  title: string;
  content: string;
  language: 'en' | 'es';
  category: 'traffic-stop' | 'arrest' | 'search' | 'general';
  state?: string;
}

export type AlertType = 'info' | 'warning' | 'success' | 'error';

export interface ShareableCard {
  id: string;
  title: string;
  content: string;
  location?: string;
  timestamp: Date;
  hash?: string;
}
