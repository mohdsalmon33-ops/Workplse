import React, { useMemo, useState } from 'react';
import { Search, X, ChevronDown, ChevronUp, UserX, Clock } from 'lucide-react';
import { Employee, EmployeeStatus } from '../types';

interface EmployeeTableProps {
  employees: Employee[];
  onRowClick: (id: string) => void;
  onSetStatus: (id: string, status: EmployeeStatus) => void;
  onDelete: (id: string) => void;
}

type SortField = 'name' | 'id' | 'department' | 'status' | 'lastStatusChange';
type SortOrder = 'asc' | 'desc';

export function EmployeeTable({ employees, onRowClick, onSetStatus, onDelete }: EmployeeTableProps) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const departments = ['ALL', ...Array.from(new Set(employees.map(e => e.department)))];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    let result = employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || 
                            emp.id.toLowerCase().includes(search.toLowerCase());
      const matchesDept = deptFilter === 'ALL' || emp.department === deptFilter;
      const matchesStatus = statusFilter === 'ALL' || emp.status === statusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });

    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [employees, search, deptFilter, statusFilter, sortField, sortOrder]);

  const getStatusColor = (status: EmployeeStatus) => {
    if (status === 'Active') return 'bg-active-state text-ink';
    if (status === 'Break') return 'bg-break-state text-ink';
    return 'bg-offline-state text-white';
  };

  return (
    <div className="flex flex-col border-2 mx-[-2px] mt-[-2px] border-ink bg-white drop-shadow-none">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center p-2 border-b-2 border-ink bg-paper gap-2">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 w-4 h-4 text-stroke-[3]" />
          <input 
            type="text" 
            placeholder="QUERY RECORD..."
            className="w-full border-2 border-ink bg-white py-2 pl-9 pr-3 font-mono text-sm placeholder:text-ink/30 focus:outline-none focus:bg-[#f0ff00] focus:text-ink transition-colors"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="border-2 border-ink bg-white py-2 px-3 font-mono text-sm font-bold uppercase focus:outline-none focus:bg-ink focus:text-white"
          value={deptFilter}
          onChange={e => setDeptFilter(e.target.value)}
        >
          {departments.map(d => <option key={d} value={d}>DEPT: {d}</option>)}
        </select>
        <select 
          className="border-2 border-ink bg-white py-2 px-3 font-mono text-sm font-bold uppercase focus:outline-none focus:bg-ink focus:text-white"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="ALL">STATUS: ALL</option>
          <option value="Active">STATUS: ACTIVE</option>
          <option value="Break">STATUS: BREAK</option>
          <option value="Offline">STATUS: OFFLINE</option>
        </select>
      </div>

      {/* Grid Header */}
      <div className="grid grid-cols-[90px_1fr_110px_110px_90px_140px_40px] items-center border-b-2 border-ink bg-ink text-white font-sans text-[10px] font-bold tracking-widest uppercase items-stretch">
        <button className="flex items-center gap-1 p-3 hover:bg-white/10 transition-colors" onClick={() => handleSort('id')}>
          SYS iD {sortField === 'id' && (sortOrder === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
        </button>
        <button className="flex items-center gap-1 p-3 border-l text-left border-white/20 hover:bg-white/10 transition-colors" onClick={() => handleSort('name')}>
          Personnel {sortField === 'name' && (sortOrder === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
        </button>
        <button className="flex items-center gap-1 p-3 border-l text-left border-white/20 hover:bg-white/10 transition-colors hidden sm:flex" onClick={() => handleSort('department')}>
          Division {sortField === 'department' && (sortOrder === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
        </button>
        <button className="flex items-center gap-1 p-3 border-l border-white/20 hover:bg-white/10 transition-colors justify-center" onClick={() => handleSort('status')}>
          State {sortField === 'status' && (sortOrder === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
        </button>
        <button className="flex items-center gap-1 p-3 border-l border-white/20 hover:bg-white/10 transition-colors justify-center" onClick={() => handleSort('lastStatusChange')}>
          Time {sortField === 'lastStatusChange' && (sortOrder === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
        </button>
        <div className="p-3 border-l border-white/20 text-center flex items-center justify-center">Action</div>
        <div className="p-3 border-l border-white/20 flex items-center justify-center"></div>
      </div>

      {/* Grid Body */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {filteredAndSorted.length === 0 ? (
           <div className="flex flex-col items-center justify-center p-12 text-ink/30 italic font-serif">
             No records synchronized.
           </div>
        ) : (
          filteredAndSorted.map(emp => (
            <div 
              key={emp.id}
              className="grid grid-cols-[90px_1fr_110px_110px_90px_140px_40px] border-b border-ink hover:bg-ink group hover:text-white transition-colors cursor-pointer text-sm font-medium items-stretch bg-paper"
              onClick={() => onRowClick(emp.id)}
            >
              <div className="p-3 text-ink/50 group-hover:text-white/50 text-xs flex items-center truncate">
                {emp.id}
              </div>
              <div className="p-3 border-l border-ink group-hover:border-white/20 flex flex-col justify-center overflow-hidden">
                <span className="font-bold truncate">{emp.name}</span>
                <span className="text-[10px] font-sans text-ink/50 group-hover:text-white/50 truncate uppercase tracking-widest">{emp.role}</span>
              </div>
              <div className="p-3 border-l border-ink group-hover:border-white/20 flex items-center truncate text-xs uppercase hidden sm:flex font-bold">
                {emp.department}
              </div>
              <div className="p-3 border-l border-ink group-hover:border-white/20 flex items-center justify-center">
                <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider border-2 border-ink ${getStatusColor(emp.status)}`}>
                  {emp.status}
                </span>
              </div>
              <div className="p-3 border-l border-ink group-hover:border-white/20 flex items-center justify-center text-xs tabular-nums text-ink/60 group-hover:text-white/60">
                <Clock size={12} className="mr-1" />
                {Math.floor((Date.now() - new Date(emp.lastStatusChange).getTime()) / 60000)}m
              </div>
              <div className="p-2 border-l border-ink group-hover:border-white/20 flex items-center justify-center">
                <select
                  value={emp.status}
                  onChange={(e) => onSetStatus(emp.id, e.target.value as EmployeeStatus)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-white border-2 border-ink text-ink font-bold text-xs py-2 px-1 hover:bg-ink hover:text-white hover:border-white focus:bg-[#f0ff00] focus:text-ink focus:border-ink transition-all uppercase text-center cursor-pointer appearance-none outline-none relative"
                >
                  <option value="Active">SET: ACTIVE</option>
                  <option value="Break">SET: BREAK</option>
                  <option value="Offline">SET: OFFLINE</option>
                </select>
              </div>
              <div className="p-0 border-l border-ink group-hover:border-white/20 flex items-stretch justify-stretch">
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(emp.id); }}
                  className="w-full flex items-center justify-center text-ink/30 hover:bg-offline-state hover:text-white transition-colors"
                  title="Purge Record"
                >
                  <X size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}
