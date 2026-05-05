import React, { useMemo } from 'react';
import { X, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Employee } from '../types';

interface TrendsChartModalProps {
  employees: Employee[];
  isOpen: boolean;
  onClose: () => void;
}

export function TrendsChartModal({ employees, isOpen, onClose }: TrendsChartModalProps) {
  if (!isOpen) return null;

  // Mock historical data generation based on current employees count
  const data = useMemo(() => {
    const total = employees.length;
    const history = [];
    let currentActive = employees.filter(e => e.status === 'Active').length;
    let currentOffline = employees.filter(e => e.status === 'Offline').length;

    for (let i = 6; i >= 0; i--) {
      const active = Math.max(0, currentActive + Math.floor(Math.random() * 4) - 2);
      history.push({
        day: new Date(Date.now() - i * 86400000).toLocaleDateString(undefined, { weekday: 'short' }),
        Active: active,
        Offline: total - active - Math.floor(Math.random()*2), 
      });
    }
    return history;
  }, [employees]);

  return (
    <div className="fixed inset-0 bg-ink/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white border-4 border-ink w-full max-w-4xl shadow-[8px_8px_0_0_#fff] flex flex-col">
        <div className="bg-ink text-white p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
             <TrendingUp className="text-[#f0ff00]" />
             <h2 className="font-bold tracking-widest uppercase">Operations Telemetry</h2>
          </div>
          <button onClick={onClose} className="hover:text-active-state transition-colors">
            <X size={24} strokeWidth={3} />
          </button>
        </div>
        
        <div className="p-6 bg-paper h-[60vh] min-h-[400px] flex flex-col font-mono">
            <h3 className="text-xl font-black uppercase mb-6 tracking-tighter">7-Day Attendance Trend</h3>
            <div className="flex-1 bg-white border-2 border-ink p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="day" tick={{fill: '#141414', fontFamily: 'monospace', fontSize: 12}} />
                  <YAxis tick={{fill: '#141414', fontFamily: 'monospace', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ border: '2px solid #141414', borderRadius: 0, fontFamily: 'monospace', fontWeight: 'bold' }}
                    itemStyle={{ fontFamily: 'monospace' }} 
                  />
                  <Line type="stepAfter" dataKey="Active" stroke="#00cc00" strokeWidth={4} dot={{r: 6, fill: '#141414'}} activeDot={{ r: 8 }} />
                  <Line type="stepAfter" dataKey="Offline" stroke="#e62e2e" strokeWidth={4} dot={{r: 6, fill: '#141414'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
}
