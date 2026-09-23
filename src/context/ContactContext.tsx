'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
  isLoading: boolean;
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => Promise<ContactMessage | null>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  refreshMessages: () => Promise<void>;
  resetMessages: () => void;
}

const STORAGE_KEY = 'xtreme_admin_inbox';

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch messages from server database
  const fetchServerMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/messages', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.messages)) {
          setMessages(data.messages);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.messages));
          } catch {
            // Ignore localStorage error
          }
          return;
        }
      }
    } catch (e) {
      console.error('Failed to fetch messages from server API, falling back to cache:', e);
    }

    // Fallback to localStorage if server request fails
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  // Initial load & periodic background sync every 10 seconds
  useEffect(() => {
    let isMounted = true;
    // Immediate hydration from cache
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          queueMicrotask(() => {
            if (isMounted) setMessages(parsed);
          });
        }
      }
    } catch {
      // Ignore
    }

    queueMicrotask(() => {
      if (isMounted) {
        fetchServerMessages().finally(() => {
          if (isMounted) setIsLoading(false);
        });
      }
    });

    const interval = setInterval(fetchServerMessages, 10000);
    const handleFocus = () => fetchServerMessages();
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchServerMessages]);

  const addMessage = async (msgData: Omit<ContactMessage, 'id' | 'date' | 'isRead'>): Promise<ContactMessage | null> => {
    // Generate optimistic message for zero UI latency
    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const tempId = `msg-${Date.now()}`;
    const optimisticMsg: ContactMessage = {
      ...msgData,
      id: tempId,
      date: dateFormatted,
      isRead: false
    };

    setMessages((prev) => [optimisticMsg, ...prev]);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.message) {
          setMessages((prev) => [data.message, ...prev.filter((m) => m.id !== tempId)]);
          return data.message;
        }
      }
    } catch (e) {
      console.error('Failed to post message to server:', e);
    }

    return optimisticMsg;
  };

  const markAsRead = async (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
    try {
      await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isRead: true })
      });
    } catch (e) {
      console.error('Failed to update message on server:', e);
    }
  };

  const markAllAsRead = async () => {
    setMessages((prev) => prev.map((m) => ({ ...m, isRead: true })));
    try {
      await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAllRead: true })
      });
    } catch (e) {
      console.error('Failed to mark all as read on server:', e);
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    try {
      await fetch(`/api/messages?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.error('Failed to delete message on server:', e);
    }
  };

  const resetMessages = () => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <ContactContext.Provider
      value={{
        messages,
        unreadCount,
        isLoading,
        addMessage,
        markAsRead,
        markAllAsRead,
        deleteMessage,
        refreshMessages: fetchServerMessages,
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
