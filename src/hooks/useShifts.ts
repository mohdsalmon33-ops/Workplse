import { useState, useCallback } from 'react';
import { Shift } from '../types';

const INITIAL_SHIFTS: Shift[] = [
  {
    id: 'SHF-1',
    employeeId: 'WRK-4291',
    startTime: new Date(new Date().setHours(8,0,0,0)).toISOString(),
    endTime: new Date(new Date().setHours(16,0,0,0)).toISOString(),
    role: 'Lead Operator'
  },
  {
    id: 'SHF-2',
    employeeId: 'WRK-8812',
    startTime: new Date(new Date().setHours(16,0,0,0)).toISOString(),
    endTime: new Date(new Date().setHours(24,0,0,0)).toISOString(),
    role: 'Maintenance Tech'
  }
];

export function useShifts() {
  const [shifts, setShifts] = useState<Shift[]>(INITIAL_SHIFTS);

  const addShift = useCallback((shift: Omit<Shift, 'id'>) => {
    const newId = `SHF-${Math.floor(Math.random() * 10000)}`;
    setShifts(prev => [...prev, { ...shift, id: newId }]);
  }, []);

  const deleteShift = useCallback((id: string) => {
    setShifts(prev => prev.filter(s => s.id !== id));
  }, []);

  return { shifts, addShift, deleteShift };
}
