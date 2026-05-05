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
