import { useState, useCallback } from 'react';
import { Incident, IncidentStatus, IncidentSeverity } from '../types';

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-991',
    title: 'Unauthorized Access Breach - Sector 7',
    description: 'Motion sensors triggered in restricted area. No visual confirmation yet.',
    severity: 'CRITICAL',
    status: 'INVESTIGATING',
    reportedBy: 'SYSTEM',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'INC-992',
    title: 'Pressure Valve Fault',
    description: 'Sub-system 4 showing irregular pressure readings.',
    severity: 'MINOR',
    status: 'OPEN',
    reportedBy: 'WRK-8812',
    timestamp: new Date(Date.now() - 7200000).toISOString()
  }
];

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);

  const addIncident = useCallback((incident: Omit<Incident, 'id' | 'timestamp'>) => {
    const newId = `INC-${Math.floor(100 + Math.random() * 900)}`;
    setIncidents(prev => [{ ...incident, id: newId, timestamp: new Date().toISOString() }, ...prev]);
  }, []);

  const updateIncidentStatus = useCallback((id: string, status: IncidentStatus) => {
    setIncidents(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  }, []);

  return { incidents, addIncident, updateIncidentStatus };
}
