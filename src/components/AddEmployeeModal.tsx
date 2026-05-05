import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Employee } from '../types';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (emp: Omit<Employee, 'id' | 'status' | 'lastStatusChange'>) => void;
}

export function AddEmployeeModal({ isOpen, onClose, onAdd }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'Engineering',
    location: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.location) return;
    onAdd(formData);
    onClose();
    setFormData({ name: '', role: '', department: 'Engineering', location: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm">
      <div className="bg-paper border-4 border-ink w-full max-w-md shadow-[12px_12px_0_0_rgba(20,20,20,1)] relative">
        <button onClick={onClose} className="absolute top-2 right-2 p-2 hover:bg-ink hover:text-paper transition-colors border-2 border-transparent hover:border-ink">
          <X size={20} className="stroke-[3]" />
        </button>
        
        <div className="p-6 border-b-2 border-ink bg-white">
          <h2 className="text-2xl font-black uppercase tracking-tight">Onboard Staff</h2>
          <p className="text-xs font-sans text-ink/70 mt-1 uppercase font-semibold">Initialize physical record</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-paper bg-[radial-gradient(#d5d5d5_1px,transparent_1px)] [background-size:16px_16px]">
          <div>
            <label className="block text-[10px] uppercase font-sans font-bold tracking-widest mb-1 ml-1 bg-paper inline-block px-1 border-ink border-2 translate-y-2 relative z-10">Legal Name</label>
            <input 
              required
              type="text" 
              className="w-full border-2 border-ink bg-white px-3 py-3 font-mono font-medium focus:outline-none focus:bg-[#f0ff00] transition-colors rounded-none placeholder:text-ink/30"
              placeholder="_"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-sans font-bold tracking-widest mb-1 ml-1 bg-paper inline-block px-1 border-ink border-2 translate-y-2 relative z-10">Designation</label>
            <input 
              required
              type="text" 
              className="w-full border-2 border-ink bg-white px-3 py-3 font-mono font-medium focus:outline-none focus:bg-[#f0ff00] transition-colors rounded-none placeholder:text-ink/30"
              placeholder="_"
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-sans font-bold tracking-widest mb-1 ml-1 bg-paper inline-block px-1 border-ink border-2 translate-y-2 relative z-10">Division</label>
              <select 
                className="w-full border-2 border-ink bg-white px-3 py-3 font-mono font-medium focus:outline-none focus:bg-[#f0ff00] transition-colors rounded-none appearance-none"
                value={formData.department}
                onChange={e => setFormData({...formData, department: e.target.value})}
              >
                <option>Engineering</option>
                <option>Security</option>
                <option>Logistics</option>
                <option>Marketing</option>
                <option>Operations</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-sans font-bold tracking-widest mb-1 ml-1 bg-paper inline-block px-1 border-ink border-2 translate-y-2 relative z-10">Sector</label>
              <input 
                required
                type="text" 
                className="w-full border-2 border-ink bg-white px-3 py-3 font-mono font-medium focus:outline-none focus:bg-[#f0ff00] transition-colors rounded-none placeholder:text-ink/30"
                placeholder="Zone X"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>
          
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full border-2 border-ink bg-ink text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-ink transition-colors relative group overflow-hidden"
            >
              <span className="relative z-10">Commit Record</span>
              <div className="absolute inset-0 bg-active-state translate-y-[100%] group-hover:translate-y-0 transition-transform duration-200 ease-out z-0" />
              <span className="relative z-10 group-hover:text-ink transition-colors">Commit Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
