export type EmployeeStatus = 'Active' | 'Break' | 'Offline';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  status: EmployeeStatus;
  lastStatusChange: string; // ISO string
}

export interface ActionLogEntry {
  id: string;
  timestamp: string; // ISO string
  action: string;
  details: string;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Task {
  id: string;
  title: string;
  assigneeId: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string; // ISO string
  createdAt: string; // ISO string
}

export type NotificationType = 'INFO' | 'WARNING' | 'ALERT';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: string; // ISO string
}

export type AssetStatus = 'OPERATIONAL' | 'MAINTENANCE' | 'OFFLINE';

export interface Asset {
  id: string;
  name: string;
  category: 'HARDWARE' | 'VEHICLE' | 'WEAPONRY' | 'TERMINAL';
  status: AssetStatus;
  assignedTo?: string; // Employee ID
}

export type IncidentSeverity = 'MINOR' | 'MAJOR' | 'CRITICAL';
export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'RESOLVED';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  reportedBy: string; // Employee ID or 'SYSTEM'
  timestamp: string; // ISO string
}

export interface Shift {
  id: string;
  employeeId: string;
  startTime: string; // ISO
  endTime: string; // ISO
  role: string;
}

export interface CommsMessage {
  id: string;
  senderId: string; // 'SYSTEM' or Employee ID
  content: string;
  timestamp: string;
  channel: 'GLOBAL' | 'MAINTENANCE' | 'SECURITY';
}
