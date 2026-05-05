import React from 'react';
import { Employee } from '../types';
import { useAssets } from '../hooks/useAssets';

export function InventoryView({ employees }: { employees: Employee[] }) {
  const { assets } = useAssets();

  return (
    <div className="absolute inset-0 p-6 flex flex-col font-mono">
      <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter">Asset Ledger</h2>
      
      <div className="flex-1 overflow-y-auto w-full">
        <div className="grid grid-cols-[100px_1fr_120px_120px_150px] bg-ink text-white p-3 text-[10px] font-bold uppercase tracking-widest sticky top-0">
          <div>Ident</div>
          <div>Asset Designation</div>
          <div>Category</div>
          <div>Status</div>
          <div>Assigned To</div>
        </div>
        
        {assets.map(asset => {
           let statusColor = 'text-ink';
           if (asset.status === 'OFFLINE') statusColor = 'text-offline-state bg-offline-state/10';
           if (asset.status === 'MAINTENANCE') statusColor = 'text-break-state bg-break-state/10';
           if (asset.status === 'OPERATIONAL') statusColor = 'text-active-state bg-active-state/10';

           const assignee = employees.find(e => e.id === asset.assignedTo);

           return (
             <div key={asset.id} className="grid grid-cols-[100px_1fr_120px_120px_150px] border-b-2 border-ink p-3 items-center bg-white hover:bg-[#f0ff00] transition-colors">
               <div className="text-xs text-ink/50 font-bold">{asset.id}</div>
               <div className="font-bold text-sm truncate pr-4">{asset.name}</div>
               <div className="text-[10px] tracking-widest bg-ink text-white px-2 py-0.5 inline-block w-fit">{asset.category}</div>
               <div className={`text-[10px] tracking-widest font-bold px-2 py-1 uppercase items-center flex ${statusColor} border-2 border-current w-fit`}>
                 {asset.status}
               </div>
               <div className="text-xs font-bold truncate">
                 {assignee ? assignee.name : (asset.assignedTo || 'UNASSIGNED')}
               </div>
             </div>
           );
        })}
      </div>
    </div>
  );
}
