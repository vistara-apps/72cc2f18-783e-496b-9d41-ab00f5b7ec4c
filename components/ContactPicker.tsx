'use client';

import { useState } from 'react';
import { Plus, X, Phone, Mail } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { EmergencyContact } from '@/lib/types';
import { generateId } from '@/lib/utils';

interface ContactPickerProps {
  contacts: EmergencyContact[];
  onContactsChange: (contacts: EmergencyContact[]) => void;
  maxContacts?: number;
}

export function ContactPicker({ 
  contacts, 
  onContactsChange, 
  maxContacts = 5 
}: ContactPickerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: generateId(),
        name: newContact.name,
        phone: newContact.phone,
        email: newContact.email || undefined
      };
      
      onContactsChange([...contacts, contact]);
      setNewContact({ name: '', phone: '', email: '' });
      setIsAdding(false);
    }
  };

  const handleRemoveContact = (id: string) => {
    onContactsChange(contacts.filter(contact => contact.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
            <div className="flex-1">
              <div className="font-medium text-white">{contact.name}</div>
              <div className="flex items-center space-x-4 text-sm text-white text-opacity-70">
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>{contact.phone}</span>
                </div>
                {contact.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span>{contact.email}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => handleRemoveContact(contact.id)}
              className="p-1 text-red-300 hover:text-red-200 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {isAdding ? (
          <div className="space-y-3 p-4 bg-white bg-opacity-5 rounded-lg">
            <Input
              label="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              placeholder="Contact name"
            />
            <Input
              label="Phone"
              type="tel"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              placeholder="Phone number"
            />
            <Input
              label="Email (optional)"
              type="email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              placeholder="Email address"
            />
            <div className="flex space-x-2">
              <Button onClick={handleAddContact} size="sm">
                Add Contact
              </Button>
              <Button 
                onClick={() => {
                  setIsAdding(false);
                  setNewContact({ name: '', phone: '', email: '' });
                }}
                variant="ghost" 
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          contacts.length < maxContacts && (
            <Button
              onClick={() => setIsAdding(true)}
              variant="ghost"
              className="w-full border-2 border-dashed border-white border-opacity-30 hover:border-opacity-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Emergency Contact
            </Button>
          )
        )}
      </CardContent>
    </Card>
  );
}
