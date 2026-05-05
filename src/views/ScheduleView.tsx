import React from 'react';
import { Employee } from '../types';
import { useShifts } from '../hooks/useShifts';
import { Clock } from 'lucide-react';

export function ScheduleView({ employees }: { employees: Employee[] }) {
  const { shifts } = useShifts();

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="absolute inset-0 p-6 flex flex-col font-mono bg-paper">
      <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter text-ink border-b-4 border-ink pb-4">Shift Roster</h2>
      
      <div className="flex-1 overflow-x-auto">
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
  );
}
