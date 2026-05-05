import { useState, useCallback } from 'react';
import { Employee, EmployeeStatus, ActionLogEntry } from '../types';

const INITIAL_DATA: Employee[] = [
  {
    id: 'WRK-1092',
    name: 'Althea Vance',
    role: 'Sec Ops',
    department: 'Security',
    location: 'Zone B',
    status: 'Active',
    lastStatusChange: new Date(Date.now() - 3600000 * 2.5).toISOString(),
  },
  {
    id: 'WRK-1093',
    name: 'Jared Dunn',
    role: 'Sys Admin',
    department: 'Engineering',
    location: 'Zone A',
    status: 'Offline',
    lastStatusChange: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'WRK-1094',
    name: 'Monica Hall',
    role: 'Logistics Coord',
    department: 'Logistics',
    location: 'Zone C',
    status: 'Break',
    lastStatusChange: new Date(Date.now() - 1200000).toISOString(),
  },
  {
    id: 'WRK-1095',
    name: 'Erlich Bachman',
    role: 'Evangelist',
    department: 'Marketing',
    location: 'Zone A',
    status: 'Active',
    lastStatusChange: new Date(Date.now() - 3600000 * 1.2).toISOString(),
  },
  {
    id: 'WRK-1096',
    name: 'Richard Hendricks',
    role: 'Lead Arch',
    department: 'Engineering',
    location: 'Zone A',
    status: 'Active',
    lastStatusChange: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
];

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_DATA);
  const [logs, setLogs] = useState<ActionLogEntry[]>([]);

  const addLog = useCallback((action: string, details: string) => {
    setLogs(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      action,
      details
    }, ...prev].slice(0, 50));
  }, []);

  const setStatus = useCallback((id: string, status: EmployeeStatus) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== id) return emp;
        addLog('STATUS_CHANGE', `${emp.id} status changed to ${status}`);
        return {
          ...emp,
          status,
          lastStatusChange: new Date().toISOString(),
        };
      })
    );
  }, [addLog]);

  const generateId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `WRK-${result}`;
  };

  const addEmployee = useCallback(
    (emp: Omit<Employee, 'id' | 'status' | 'lastStatusChange'>) => {
      const newId = generateId();
      addLog('ONBOARD', `New personnel onboarded: ${newId} (${emp.name})`);
      setEmployees((prev) => [
        ...prev,
        {
          ...emp,
          id: newId,
          status: 'Offline',
          lastStatusChange: new Date().toISOString(),
        },
      ]);
    },
    [addLog]
  );

  const deleteEmployee = useCallback((id: string) => {
    addLog('TERMINATE', `Personnel terminated: ${id}`);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  }, [addLog]);

  return {
    employees,
    logs,
    setStatus,
    addEmployee,
    deleteEmployee,
    addLog,
  };
}
