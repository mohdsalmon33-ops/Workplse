import React from 'react';
import { X, Activity } from 'lucide-react';
import { ActionLogEntry } from '../types';

interface ActionLogModalProps {
  logs: ActionLogEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export function ActionLogModal({ logs, isOpen, onClose }: ActionLogModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ink/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white border-4 border-ink w-full max-w-2xl max-h-[80vh] flex flex-col shadow-[8px_8px_0_0_#fff]">
        <div className="bg-ink text-white p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
             <Activity className="text-active-state animate-pulse" />
             <h2 className="font-bold tracking-widest uppercase">System Audit Trail</h2>
          </div>
          <button onClick={onClose} className="hover:text-active-state transition-colors">
            <X size={24} strokeWidth={3} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 font-mono text-sm flex flex-col gap-2 bg-paper">
          {logs.length === 0 ? (
            <div className="text-center py-8 text-ink/50 italic opacity-80 uppercase tracking-widest text-xs font-bold">
              No recent anomalies detected.
            </div>
          ) : (
            logs.map(log => (
              <div key={log.id} className="border-2 border-ink bg-white p-3 flex flex-col sm:flex-row sm:items-center gap-2 group hover:bg-[#f0ff00] transition-colors">
                <div className="text-xs font-bold text-ink/40 w-24 shrink-0 tabular-nums">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </div>
                <div className="px-2 py-0.5 border border-ink text-[10px] font-bold uppercase tracking-widest bg-ink text-white shrink-0">
                  {log.action}
                </div>
                <div className="flex-1 text-ink group-hover:font-bold">
                  {log.details}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
