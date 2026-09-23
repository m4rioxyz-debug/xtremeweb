'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ContactMessage {
  id: string;
  date: string;
  type: 'contact' | 'product_inquiry';
  productName?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  subject: string;
  message: string;
  isRead: boolean;
}

interface ContactContextType {
  messages: ContactMessage[];
  unreadCount: number;
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteMessage: (id: string) => void;
  resetMessages: () => void;
}

const defaultInitialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    date: '2024-11-20 14:35',
    type: 'product_inquiry',
    productName: 'FiberGel S2',
    name: 'Eng. Manuel Navarro',
    company: 'Construcciones Mediterráneo SL',
    email: 'm.navarro@med-construcciones.es',
    phone: '+34 612 345 678',
    country: 'Spain',
    subject: 'Maritime container pricing for FiberGel S2 (25kg)',
    message: 'We are bidding for a 4-star coastal resort renovation in Alicante. We need technical submittal documents and FOB Valencia prices for two 20ft containers of FiberGel S2.',
    isRead: false
  },
  {
    id: 'msg-2',
    date: '2025-01-14 10:12',
    type: 'contact',
    name: 'Karim Ben Salem',
    company: 'Société Carthage Bâtiment',
    email: 'k.bensalem@carthage-bat.tn',
    phone: '+216 71 XXX XXX',
    country: 'Tunisia',
    subject: 'Distributorship agreement for CemAir & FiberGel in Greater Tunis',
    message: 'We are interested in distributing Xtreme European-certified tile adhesives and CemAir lightweight mortar across our retail branches in Tunis and Sousse.',
    isRead: false
  },
  {
    id: 'msg-3',
    date: '2025-01-10 16:45',
    type: 'product_inquiry',
    productName: 'SuperCol PISCINAS',
    name: 'Youssef Trabelsi',
    company: 'Société Hôtelière & Balnéaire',
    email: 'y.trabelsi@resort-hammamet.tn',
    phone: '+216 72 XXX XXX',
    country: 'Tunisia',
    subject: 'Pool mosaic adhesive resistance specification for Hammamet resort',
    message: 'We require verification that SuperCol Piscinas is compatible with chlorinated and saltwater thermal pools for our hotel renovation project in Hammamet.',
    isRead: true
  }
];

const STORAGE_KEY = 'xtreme_admin_inbox';

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ContactMessage[]>(defaultInitialMessages);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          queueMicrotask(() => {
            setMessages(parsed);
          });
        }
      }
    } catch (e) {
      console.error('Failed to load messages from localStorage', e);
    }
  }, []);

  const saveMessages = (updated: ContactMessage[]) => {
    setMessages(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist messages', e);
    }
  };

  const addMessage = (msgData: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => {
    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      date: dateFormatted,
      isRead: false
    };

    saveMessages([newMsg, ...messages]);
  };

  const markAsRead = (id: string) => {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, isRead: true } : m
    );
    saveMessages(updated);
  };

  const markAllAsRead = () => {
    const updated = messages.map((m) => ({ ...m, isRead: true }));
    saveMessages(updated);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    saveMessages(updated);
  };

  const resetMessages = () => {
    saveMessages(defaultInitialMessages);
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <ContactContext.Provider
      value={{
        messages,
        unreadCount,
        addMessage,
        markAsRead,
        markAllAsRead,
        deleteMessage,
        resetMessages
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
}
