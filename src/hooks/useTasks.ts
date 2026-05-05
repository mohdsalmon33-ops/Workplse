import { useState, useCallback, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';

const INITIAL_TASKS: Task[] = [
  {
    id: 'TSK-1001',
    title: 'Recalibrate Main Sensors',
    assigneeId: 'WRK-4291',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'TSK-1002',
    title: 'Update Operations Manual',
    assigneeId: 'WRK-8812',
    status: 'TODO',
    priority: 'LOW',
    deadline: new Date(Date.now() + 86400000 * 5).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'TSK-1003',
    title: 'Emergency Override Protocol Test',
    assigneeId: 'WRK-1102',
    status: 'DONE',
    priority: 'CRITICAL',
    deadline: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  }
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newId = `TSK-${Math.floor(1000 + Math.random() * 9000)}`;
    setTasks(prev => [...prev, {
      ...task,
      id: newId,
      createdAt: new Date().toISOString()
    }]);
  }, []);

  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  return { tasks, addTask, updateTaskStatus, deleteTask };
}
