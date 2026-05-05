import { useState, useCallback } from 'react';
import { Notification, NotificationType } from '../types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: NotificationType) => {
    setNotifications(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      read: false,
      timestamp: new Date().toISOString()
    }, ...prev].slice(0, 100));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return { notifications, addNotification, markAsRead, markAllAsRead, unreadCount };
}
