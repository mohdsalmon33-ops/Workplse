import { useState, useCallback } from 'react';
import { CommsMessage } from '../types';

const INITIAL_MESSAGES: CommsMessage[] = [
  {
    id: 'MSG-1',
    senderId: 'SYSTEM',
    content: 'Automated routine check completed. All systems nominal.',
    channel: 'GLOBAL',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'MSG-2',
    senderId: 'WRK-4291',
    content: 'Security sweep of Sector 7 commencing.',
    channel: 'SECURITY',
    timestamp: new Date(Date.now() - 1800000).toISOString()
  }
];

export function useComms() {
  const [messages, setMessages] = useState<CommsMessage[]>(INITIAL_MESSAGES);

  const sendMessage = useCallback((senderId: string, content: string, channel: 'GLOBAL'|'MAINTENANCE'|'SECURITY') => {
    const newMessage: CommsMessage = {
      id: `MSG-${Math.floor(Math.random() * 10000)}`,
      senderId,
      content,
      channel,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  return { messages, sendMessage };
}
