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
  {
    id: 'WRK-1097',
    name: 'Dinesh Chugtai',
    role: 'Senior Engineer',
    department: 'Engineering',
    location: 'Zone A',
    status: 'Active',
    lastStatusChange: new Date(Date.now() - 3600000 * 1.5).toISOString(),
  },
  {
    id: 'WRK-1098',
    name: 'Bertram Gilfoyle',
    role: 'Sys Architect',
    department: 'Engineering',
    location: 'Zone A',
    status: 'Active',
    lastStatusChange: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'WRK-1099',
    name: 'Nelson Bighetti',
    role: 'R&D Head',
    department: 'Research',
    location: 'Zone C',
    status: 'Break',
    lastStatusChange: new Date(Date.now() - 3600000 * 0.5).toISOString(),
  },
  {
    id: 'WRK-1100',
    name: 'Laurie Bream',
    role: 'Director',
    department: 'Management',
    location: 'Zone B',
    status: 'Active',
    lastStatusChange: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'WRK-1101',
    name: 'Peter Gregory',
    role: 'Founder',
    department: 'Management',
    location: 'Zone B',
    status: 'Offline',
    lastStatusChange: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'WRK-1102',
    name: 'Jian Yang',
    role: 'Incubator',
    department: 'Operations',
    location: 'Zone C',
    status: 'Active',
    lastStatusChange: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'WRK-1103',
    name: 'Gavin Belson',
    role: 'Exec',
    department: 'Management',
    location: 'Zone A',
    status: 'Offline',
    lastStatusChange: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'WRK-1104',
    name: 'Hoover',
    role: 'Head of Security',
    department: 'Security',
    location: 'Zone B',
    status: 'Active',
    lastStatusChange: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'WRK-1105',
    name: 'Denpok',
    role: 'Spiritual Advisor',
    department: 'HR',
    location: 'Zone B',
    status: 'Break',
    lastStatusChange: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'WRK-1106',
    name: 'Russ Hanneman',
    role: 'Investor',
    department: 'Management',
    location: 'Zone A',
    status: 'Active',
    lastStatusChange: new Date(Date.now() - 3600000 * 0.2).toISOString(),
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
