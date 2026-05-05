import React from 'react';
import { Bell, X, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { Notification } from '../types';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationsPanel({ isOpen, onClose, notifications, onMarkAsRead, onMarkAllAsRead }: NotificationsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-12 left-0 md:left-auto md:right-0 w-80 bg-white border-4 border-ink shadow-[4px_4px_0_0_#141414] z-50 flex flex-col max-h-[400px]">
      <div className="bg-ink text-white p-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Bell size={16} />
          <span className="font-bold text-xs uppercase tracking-widest">Alerts</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onMarkAllAsRead} className="text-[10px] uppercase font-bold hover:text-[#f0ff00] transition-colors border border-white/20 px-1 py-0.5">
            Mark All Read
          </button>
          <button onClick={onClose} className="hover:text-active-state transition-colors">
            <X size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-paper flex flex-col font-mono text-xs">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-ink/50 italic opacity-80 uppercase font-bold">
            No notifications
          </div>
        ) : (
          notifications.map(n => (
            <div 
              key={n.id} 
              className={`p-3 border-b-2 border-ink hover:bg-[#f0ff00] transition-colors cursor-pointer flex gap-3 ${!n.read ? 'bg-white' : 'bg-transparent opacity-60'}`}
              onClick={() => onMarkAsRead(n.id)}
            >
              <div className="pt-0.5 shrink-0">
                {n.type === 'INFO' && <Info size={14} className="text-active-state" />}
                {n.type === 'WARNING' && <AlertTriangle size={14} className="text-break-state" />}
                {n.type === 'ALERT' && <AlertTriangle size={14} className="text-offline-state" />}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="font-bold leading-tight">{n.message}</div>
                <div className="text-[9px] uppercase tracking-widest text-ink/50 font-bold">
                  {new Date(n.timestamp).toLocaleTimeString()}
                </div>
              </div>
              {!n.read && (
                <div className="w-2 h-2 rounded-full bg-active-state border border-ink shrink-0 self-center"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
