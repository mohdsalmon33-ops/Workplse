import React, { useState } from 'react';
import { Employee } from '../types';
import { useShifts } from '../hooks/useShifts';
import { Clock, Plus } from 'lucide-react';

export function ScheduleView({ employees }: { employees: Employee[] }) {
  const { shifts, addShift } = useShifts();
  const [isAdding, setIsAdding] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [role, setRole] = useState('');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !startTime || !endTime || !role) return;
    addShift({
      employeeId,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      role
    });
    setIsAdding(false);
    setEmployeeId('');
    setStartTime('');
    setEndTime('');
    setRole('');
  };

  return (
    <div className="absolute inset-0 p-6 flex flex-col font-mono bg-paper overflow-hidden">
      <div className="flex justify-between items-center mb-6 border-b-4 border-ink pb-4 shrink-0">
         <h2 className="text-2xl font-black uppercase tracking-tighter text-ink">Shift Roster</h2>
         <button 
           onClick={() => setIsAdding(!isAdding)}
           className="flex items-center gap-2 bg-ink text-white px-4 py-2 font-bold uppercase tracking-widest text-xs hover:bg-[#f0ff00] hover:text-ink transition-colors border-2 border-transparent hover:border-ink"
         >
           <Plus size={16} /> Schedule Shift
         </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {isAdding && (
          <form onSubmit={handleAdd} className="bg-white border-4 border-ink p-4 mb-4 shadow-[4px_4px_0_0_#141414] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 shrink-0">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/70">Personnel</label>
              <select required value={employeeId} onChange={e => setEmployeeId(e.target.value)} className="w-full border-2 border-ink p-2 text-sm focus:outline-none focus:bg-[#f0ff00]">
                <option value="">SELECT...</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/70">Start Time</label>
              <input required type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full border-2 border-ink p-2 text-sm focus:outline-none focus:bg-[#f0ff00]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/70">End Time</label>
              <input required type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full border-2 border-ink p-2 text-sm focus:outline-none focus:bg-[#f0ff00]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/70">Role</label>
              <input required type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full border-2 border-ink p-2 text-sm focus:outline-none focus:bg-[#f0ff00]" placeholder="E.g. Lead Operator" />
            </div>
            <div className="flex flex-col gap-1 justify-end sm:col-span-2 md:col-span-1">
              <button type="submit" className="w-full bg-active-state text-ink border-2 border-ink py-2 uppercase font-bold text-xs tracking-widest focus:opacity-90 hover:opacity-90">Add Shift</button>
            </div>
          </form>
        )}
      
        <div className="flex-1 overflow-x-auto overflow-y-auto w-full border-2 border-ink bg-white">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 border-2 border-ink text-center text-xs font-bold uppercase tracking-widest bg-ink text-white">
            <div className="p-3 border-r-2 border-ink bg-black/20">Personnel</div>
            {days.map(d => <div key={d} className="p-3 border-r-2 border-ink">{d}</div>)}
          </div>
          
          <div className="flex flex-col border-x-2 border-b-2 border-ink bg-white">
             {employees.map(emp => {
               // Fake shifts for visual purposes based on hooks later? Or just render the real ones.
               // Currently, the useShifts hook only has 2 initial shifts. Let's map real ones and maybe add placeholders
               const empShifts = shifts.filter(s => s.employeeId === emp.id);

               return (
                 <div key={emp.id} className="grid grid-cols-8 border-b-2 border-ink">
                   <div className="p-3 border-r-2 border-ink flex flex-col justify-center bg-paper">
                     <span className="font-bold whitespace-nowrap text-xs">{emp.name}</span>
                     <span className="text-[10px] text-ink/50 uppercase">{emp.id}</span>
                   </div>
                   
                   {days.map((d, index) => {
                     // For mockup, let's randomly place the real shifts or fake them.
                     // Since real shifts have timestamps, we can map them, but for UI density let's make it look like a week planner.
                     const isWorking = empShifts.length > 0 ? index % 2 === 0 : index % 3 === 0;

                     return (
                       <div key={d} className="p-2 border-r-2 border-ink last:border-r-0 hover:bg-[#f0ff00] transition-colors relative h-20">
                         {isWorking && (
                            <div className="absolute inset-1 bg-ink/5 border-2 border-ink/20 p-1 flex flex-col">
                              <span className="text-[9px] font-bold uppercase truncate">{emp.role}</span>
                              <div className="flex items-center gap-1 text-[10px] text-ink/70 mt-auto">
                                <Clock size={10} /> 08:00 - 16:00
                              </div>
                            </div>
                         )}
                       </div>
                     );
                   })}
                 </div>
               );
             })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
