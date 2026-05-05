import React from 'react';
import { Employee } from '../types';

export function MapView({ employees }: { employees: Employee[] }) {
  // Generate fake coordinates for employees
  const blips = employees.map((emp, i) => {
    // Stable pseudo-random based on id
    const hash = emp.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const x = (hash * (i+1) % 80) + 10; // 10% to 90%
    const y = ((hash*2) * (i+1) % 80) + 10; 
    return { ...emp, x, y };
  });

  return (
    <div className="absolute inset-0 p-6 flex flex-col font-mono bg-ink text-active-state overflow-hidden">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Facility Schematic</h2>
        <div className="text-xs uppercase tracking-widest border border-white p-2 text-white">Live Tracking Active</div>
      </div>
      
      <div className="flex-1 relative border-4 border-active-state/50 rounded-full overflow-hidden self-center aspect-square w-full max-w-3xl max-h-full">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,230,0,0.1)_100%)]"></div>
         {/* Radar sweep */}
         <div className="absolute inset-0 border-r-2 border-active-state rounded-full origin-center animate-[spin_4s_linear_infinite] w-1/2 left-0 shadow-[0_0_15px_#00e600]"></div>
         
         {/* Grid rings */}
         <div className="absolute inset-[20%] border border-active-state/20 rounded-full"></div>
         <div className="absolute inset-[40%] border border-active-state/20 rounded-full"></div>
         <div className="absolute inset-[60%] border border-active-state/20 rounded-full"></div>
         <div className="absolute inset-[80%] border border-active-state/20 rounded-full"></div>

         <div className="absolute top-0 bottom-0 left-1/2 w-px bg-active-state/20"></div>
         <div className="absolute left-0 right-0 top-1/2 h-px bg-active-state/20"></div>

         {/* Blips */}
         {blips.map(emp => (
           <div 
             key={emp.id} 
             className="absolute"
             style={{ left: `${emp.x}%`, top: `${emp.y}%` }}
           >
             <div className="w-2 h-2 rounded-full bg-active-state shadow-[0_0_8px_#00e600]"></div>
             <div className="absolute top-2 left-2 text-[8px] bg-ink/80 text-white p-0.5 border border-active-state/50 whitespace-nowrap">
               {emp.id}<br/>{emp.name}
             </div>
           </div>
         ))}
      </div>
    </div>
  );
}
