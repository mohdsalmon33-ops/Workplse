import React from 'react';
import { X, Activity, MapPin, Clock, Briefcase, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Employee } from '../types';

interface DetailSidebarProps {
  employee: Employee | null;
  onClose: () => void;
}

export function DetailSidebar({ employee, onClose }: DetailSidebarProps) {
  return (
    <AnimatePresence>
      {employee && (
        <motion.div 
          key="sidebar"
          initial={{ width: 0, opacity: 0, marginLeft: 0 }}
          animate={{ width: 320, opacity: 1, marginLeft: 16 }}
          exit={{ width: 0, opacity: 0, marginLeft: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="overflow-hidden flex flex-col shrink-0 h-full drop-shadow-[-8px_8px_0_rgba(20,20,20,1)]"
        >
          <div className="w-80 border-2 border-ink bg-paper h-full flex flex-col relative shrink-0">
            <div className="sticky top-0 bg-ink text-white p-4 flex justify-between items-center border-b-4 border-ink z-10 shrink-0">
              <span className="font-sans font-bold text-xs tracking-widest uppercase">Dossier</span>
              <button onClick={onClose} className="hover:text-active-state transition-colors">
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-8 bg-[radial-gradient(var(--color-ink)_1px,transparent_1px)] [background-size:16px_16px] opacity-90">
              
              <div>
                <div className="text-[10px] font-sans font-bold tracking-widest uppercase text-ink/50 mb-2 bg-paper inline-block px-1 border-2 border-ink">Subject Ident</div>
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1 bg-paper inline-block">{employee.name}</h2>
                <div className="inline-block border-2 border-ink px-2 py-0.5 text-xs font-bold uppercase mt-2 bg-paper">
                  <span className="text-ink/50">ID /</span> {employee.id}
                </div>
              </div>

              <div className="space-y-6 bg-paper border-2 border-ink p-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center shrink-0 bg-white">
                    <Briefcase size={14} className="stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-sans font-bold tracking-widest uppercase text-ink/50 mb-1">Designation</div>
                    <div className="font-bold text-lg leading-tight">{employee.role}</div>
                    <div className="text-sm font-medium mt-0.5 bg-ink text-white inline-block px-1.5 py-0.5">
                      {employee.department}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center shrink-0 bg-white">
                    <MapPin size={14} className="stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-sans font-bold tracking-widest uppercase text-ink/50 mb-1">Location / Sector</div>
                    <div className="font-bold">{employee.location}</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center shrink-0 ${
                    employee.status === 'Active' ? 'bg-active-state' :
                    employee.status === 'Break' ? 'bg-break-state' : 'bg-offline-state'
                  }`}>
                    <Activity size={14} className={`stroke-[3] ${employee.status === 'Offline' ? 'text-white' : 'text-ink'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-sans font-bold tracking-widest uppercase text-ink/50 mb-1">Current State</div>
                    <div className="flex items-center justify-between border-b-2 border-ink pb-2">
                      <div className="font-black uppercase text-xl">{employee.status}</div>
                      <div className="text-sm border border-ink px-2 font-bold bg-white tabular-nums flex items-center gap-1 shadow-[2px_2px_0_0_#141414]">
                        <Clock size={12} strokeWidth={3}/> {Math.floor((Date.now() - new Date(employee.lastStatusChange).getTime()) / 60000)}m
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>

              <div className="mt-auto border-2 border-ink p-4 bg-ink text-white">
                <div className="text-[10px] font-sans font-bold tracking-widest uppercase text-white/50 mb-2 border-b border-white/20 pb-2 flex items-center gap-2">
                   <Hash size={12} className="text-active-state"/> Meta Logs
                </div>
                <div className="text-xs space-y-2 opacity-80 tabular-nums">
                   <div><span className="text-white/40">L_CHG:</span> {new Date(employee.lastStatusChange).toLocaleTimeString()}</div>
                   <div><span className="text-white/40">S_LOC:</span> DOM-Node-88</div>
                   <div><span className="text-white/40">SYNC:</span> OK</div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
