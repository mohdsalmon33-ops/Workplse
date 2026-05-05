import React, { useState } from 'react';
import { X, Terminal, Box, Map, Calendar, Radio, AlertOctagon } from 'lucide-react';
import { TerminalView } from '../views/TerminalView';
import { InventoryView } from '../views/InventoryView';
import { MapView } from '../views/MapView';
import { ScheduleView } from '../views/ScheduleView';
import { CommsView } from '../views/CommsView';
import { IncidentsView } from '../views/IncidentsView';
import { Employee } from '../types';

interface CommandCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
}

export function CommandCenterModal({ isOpen, onClose, employees }: CommandCenterModalProps) {
  const [activeTab, setActiveTab] = useState<'TERMINAL'|'INVENTORY'|'MAP'|'SCHEDULE'|'COMMS'|'INCIDENTS'>('TERMINAL');

  if (!isOpen) return null;

  const tabs = [
    { id: 'TERMINAL', label: 'Terminal Access', icon: Terminal },
    { id: 'INVENTORY', label: 'Asset Ledger', icon: Box },
    { id: 'MAP', label: 'Facility Schematic', icon: Map },
    { id: 'SCHEDULE', label: 'Shift Roster', icon: Calendar },
    { id: 'COMMS', label: 'Secure Comms', icon: Radio },
    { id: 'INCIDENTS', label: 'Anomaly Reports', icon: AlertOctagon },
  ] as const;

  return (
    <div className="fixed inset-0 bg-ink/90 flex flex-col z-50 p-4 sm:p-8 backdrop-blur-md font-mono">
      <div className="bg-white border-4 border-ink flex-1 flex flex-col shadow-[8px_8px_0_0_#00e600] overflow-hidden drop-shadow-2xl">
        <div className="bg-ink text-white p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
             <Terminal className="text-active-state animate-pulse" />
             <h2 className="font-bold tracking-widest uppercase text-xl">Command Center Override</h2>
          </div>
          <button onClick={onClose} className="hover:text-active-state transition-colors bg-white/10 p-1">
            <X size={24} strokeWidth={3} />
          </button>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-16 md:w-64 border-r-4 border-ink bg-paper flex flex-col shrink-0">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center md:justify-start justify-center gap-3 p-4 border-b-2 border-ink transition-all ${
                    isActive ? 'bg-[#f0ff00] text-ink font-bold relative' : 'hover:bg-white text-ink/70'
                  }`}
                  title={tab.label}
                >
                  <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                  <span className="hidden md:inline text-xs uppercase tracking-widest">{tab.label}</span>
                  {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-ink"></div>}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-paper overflow-y-auto relative">
            {activeTab === 'TERMINAL' && <TerminalView employees={employees} />}
            {activeTab === 'INVENTORY' && <InventoryView employees={employees} />}
            {activeTab === 'MAP' && <MapView employees={employees} />}
            {activeTab === 'SCHEDULE' && <ScheduleView employees={employees} />}
            {activeTab === 'COMMS' && <CommsView employees={employees} />}
            {activeTab === 'INCIDENTS' && <IncidentsView employees={employees} />}
          </div>
        </div>
      </div>
    </div>
  );
}
