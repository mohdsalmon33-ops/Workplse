import React, { useState } from 'react';
import { Employee, IncidentStatus } from '../types';
import { useIncidents } from '../hooks/useIncidents';
import { AlertTriangle, Plus } from 'lucide-react';

export function IncidentsView({ employees }: { employees: Employee[] }) {
  const { incidents, addIncident, updateIncidentStatus } = useIncidents();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const severityColors = {
    MINOR: 'bg-[#f0ff00] text-ink',
    MAJOR: 'bg-[#ff9900] text-white',
    CRITICAL: 'bg-offline-state text-white animate-pulse'
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) return;
    addIncident({ title, description: desc, severity: 'MINOR', status: 'OPEN', reportedBy: 'SYSTEM_ADMIN' });
    setIsAdding(false);
    setTitle('');
    setDesc('');
  };

  return (
    <div className="absolute inset-0 p-6 flex flex-col font-mono bg-paper">
      <div className="flex justify-between items-center mb-6 border-b-4 border-ink pb-4 shrink-0">
         <div className="flex items-center gap-4">
           <AlertTriangle size={32} className="text-break-state" />
           <h2 className="text-2xl font-black uppercase tracking-tighter text-ink">Anomaly Reports</h2>
         </div>
         <button 
           onClick={() => setIsAdding(!isAdding)}
           className="flex items-center gap-2 bg-ink text-white px-4 py-2 font-bold uppercase tracking-widest text-xs hover:bg-break-state transition-colors"
         >
           <Plus size={16} /> Report Anomaly
         </button>
      </div>

      <div className="flex-1 overflow-y-auto w-full flex flex-col gap-4">
        {isAdding && (
          <form onSubmit={handleReport} className="bg-white border-4 border-ink p-4 shadow-[4px_4px_0_0_#141414] grid gap-4 shrink-0">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/70 mb-1 block">Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border-2 border-ink p-2 text-sm focus:outline-none focus:bg-[#f0ff00]" required/>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/70 mb-1 block">Details</label>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} className="w-full border-2 border-ink p-2 text-sm focus:outline-none focus:bg-[#f0ff00] h-20" required/>
            </div>
            <button type="submit" className="bg-break-state text-ink border-2 border-ink py-2 uppercase font-bold text-xs tracking-widest">Submit Report</button>
          </form>
        )}

        {incidents.map(inc => {
          return (
             <div key={inc.id} className="bg-white border-2 border-ink shadow-[4px_4px_0_0_#141414] flex flex-col">
               <div className="flex justify-between items-start border-b-2 border-ink p-3 bg-paper">
                 <div>
                   <h3 className="font-bold text-lg leading-tight uppercase tracking-tight">{inc.title}</h3>
                   <div className="text-[10px] font-bold tracking-widest text-ink/50 mt-1">
                     {inc.id} // REPORTER: {inc.reportedBy} // {new Date(inc.timestamp).toLocaleString()}
                   </div>
                 </div>
                 <div className="flex flex-col items-end gap-2">
                   <div className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest border border-ink ${severityColors[inc.severity]}`}>
                     {inc.severity}
                   </div>
                   <select 
                      value={inc.status} 
                      onChange={(e) => updateIncidentStatus(inc.id, e.target.value as IncidentStatus)}
                      className={`text-[9px] font-bold uppercase tracking-widest border-2 border-ink p-1 outline-none appearance-none text-center
                        ${inc.status === 'OPEN' ? 'bg-white' : 
                          inc.status === 'INVESTIGATING' ? 'bg-[#f0ff00]' : 'bg-active-state text-ink'}`}
                   >
                     <option value="OPEN">OPEN</option>
                     <option value="INVESTIGATING">INVESTIGATING</option>
                     <option value="RESOLVED">RESOLVED</option>
                   </select>
                 </div>
               </div>
               <div className="p-4 text-sm text-ink/80 leading-relaxed font-mono whitespace-pre-wrap">
                 {inc.description}
               </div>
             </div>
          );
        })}
      </div>
    </div>
  );
}
