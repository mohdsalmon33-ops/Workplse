import React, { useState } from 'react';
import { X, CheckSquare, Plus, Clock, AlertCircle } from 'lucide-react';
import { Task, Employee, TaskStatus, TaskPriority } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface TaskDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  employees: Employee[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onUpdateTask: (id: string, status: TaskStatus) => void;
  onDeleteTask: (id: string) => void;
  addLog: (action: string, details: string) => void;
}

export function TaskDashboardModal({ isOpen, onClose, tasks, employees, onAddTask, onUpdateTask, onDeleteTask, addLog }: TaskDashboardModalProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [deadline, setDeadline] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !assigneeId || !deadline) return;
    
    onAddTask({
      title,
      assigneeId,
      priority,
      deadline: new Date(deadline).toISOString(),
      status: 'TODO'
    });
    addLog('TASK_ASSIGNED', `Task "${title}" assigned to ${assigneeId}`);
    setIsAdding(false);
    setTitle('');
    setDeadline('');
    setPriority('MEDIUM');
    setAssigneeId('');
  };

  const priorityColors = {
    LOW: 'bg-paper text-ink',
    MEDIUM: 'bg-[#f0ff00] text-ink',
    HIGH: 'bg-[#ff9900] text-white',
    CRITICAL: 'bg-offline-state text-white'
  };

  const isOverdue = (deadlineStr: string, status: TaskStatus) => {
    return status !== 'DONE' && new Date(deadlineStr) < new Date();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-ink/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm font-mono flex-col"
        >
          <motion.div 
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            className="bg-white border-4 border-ink w-full max-w-5xl shadow-[8px_8px_0_0_#fff] flex flex-col max-h-[85vh]"
          >
            <div className="bg-ink text-white p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                 <CheckSquare className="text-active-state" />
                 <h2 className="font-bold tracking-widest uppercase">Task Directive Dashboard</h2>
              </div>
              <button onClick={onClose} className="hover:text-active-state transition-colors">
                <X size={24} strokeWidth={3} />
              </button>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b-2 border-ink bg-paper flex justify-between items-center shrink-0">
                <div className="text-xs font-bold uppercase tracking-widest text-ink/70">
                  Active Objectives: {tasks.filter(t => t.status !== 'DONE').length}
                </div>
                <button 
                  onClick={() => setIsAdding(!isAdding)}
                  className="flex items-center gap-2 bg-ink text-white px-3 py-1 text-xs font-bold uppercase hover:bg-active-state hover:text-ink transition-colors border-2 border-ink"
                >
                  <Plus size={14} /> Assign New Directive
                </button>
              </div>

              <AnimatePresence>
                {isAdding && (
                  <motion.form 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                    onSubmit={handleAdd} 
                    className="px-4 py-4 bg-white border-b-2 border-ink grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-end shrink-0"
                  >
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="text-[10px] font-sans font-bold tracking-widest uppercase text-ink/70">Directive Title</label>
                      <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border-2 border-ink p-2 text-sm focus:outline-none focus:bg-[#f0ff00] transition-colors" placeholder="E.g. Recalibrate Sensors" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-sans font-bold tracking-widest uppercase text-ink/70">Assignee</label>
                      <select required value={assigneeId} onChange={e => setAssigneeId(e.target.value)} className="w-full border-2 border-ink p-2 text-sm focus:outline-none focus:bg-[#f0ff00] transition-colors">
                        <option value="">SELECT...</option>
                        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-sans font-bold tracking-widest uppercase text-ink/70">Priority</label>
                      <select required value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className="w-full border-2 border-ink p-2 text-sm focus:outline-none focus:bg-[#f0ff00] transition-colors font-bold">
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                        <option value="CRITICAL">CRITICAL</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-sans font-bold tracking-widest uppercase text-ink/70">Deadline</label>
                      <input required type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full border-2 border-ink p-2 text-sm focus:outline-none focus:bg-[#f0ff00] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1 sm:col-span-2 md:col-span-1">
                      <button type="submit" className="w-full bg-active-state text-ink border-2 border-ink p-2 text-sm font-bold uppercase hover:opacity-90">Dispatch</button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="flex-1 overflow-y-auto overflow-x-hidden bg-paper p-4 grid gap-3 pt-4">
                <AnimatePresence>
                  {tasks.length === 0 ? (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center p-12 text-ink/40 font-bold uppercase text-sm tracking-widest flex items-center justify-center italic"
                    >
                      No directives found
                    </motion.div>
                  ) : (
                    tasks.sort((a,b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()).map((task, i) => {
                      const assignee = employees.find(e => e.id === task.assigneeId);
                      const overdue = isOverdue(task.deadline, task.status);

                      return (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2, delay: i * 0.05 < 0.5 ? i * 0.05 : 0 }}
                          key={task.id} 
                          className={`bg-white border-2 border-ink flex flex-col sm:flex-row shadow-[4px_4px_0_0_#141414] ${overdue ? 'border-offline-state shadow-[4px_4px_0_0_#ff3333]' : ''}`}
                        >
                          <div className="p-3 flex items-center justify-center shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-ink bg-paper w-32">
                            <select 
                              value={task.status} 
                              onChange={(e) => {
                                onUpdateTask(task.id, e.target.value as TaskStatus);
                                addLog('TASK_UPDATE', `Task "${task.id}" status: ${e.target.value}`);
                              }}
                              className={`w-full text-center text-xs font-bold uppercase p-1 border-2 outline-none cursor-pointer appearance-none ${
                                task.status === 'DONE' ? 'bg-ink text-white border-ink' : 
                                task.status === 'IN_PROGRESS' ? 'bg-active-state text-ink border-ink' : 
                                'bg-white text-ink border-ink'
                              }`}
                            >
                              <option value="TODO">TODO</option>
                              <option value="IN_PROGRESS">IN PROG</option>
                              <option value="DONE">DONE</option>
                            </select>
                          </div>

                          <div className="p-3 flex-1 flex flex-col justify-center overflow-hidden">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`text-[9px] uppercase font-bold tracking-widest px-1 py-0.5 border border-ink/20 ${priorityColors[task.priority]}`}>
                                {task.priority}
                              </span>
                              {overdue && (
                                <span className="text-[9px] uppercase font-bold tracking-widest px-1 py-0.5 bg-offline-state text-white flex items-center gap-1 animate-pulse">
                                  <AlertCircle size={10} /> OVERDUE
                                </span>
                              )}
                              <span className="text-[10px] font-black text-ink/40 tracking-widest">[{task.id}]</span>
                            </div>
                            <h3 className={`font-bold leading-tight truncate ${task.status === 'DONE' ? 'line-through opacity-50' : ''}`}>{task.title}</h3>
                          </div>

                          <div className="p-3 border-t-2 sm:border-t-0 sm:border-l-2 border-ink/20 flex flex-col justify-center bg-paper text-xs sm:w-48 shrink-0 overflow-hidden">
                             <div className="text-[9px] uppercase font-bold text-ink/50 tracking-widest mb-1 leading-none">Assignee</div>
                             <div className="font-bold truncate">{assignee ? assignee.name : task.assigneeId}</div>
                          </div>

                          <div className="p-3 border-t-2 sm:border-t-0 sm:border-l-2 border-ink/20 flex flex-col justify-center bg-paper text-xs sm:w-48 shrink-0 relative overflow-hidden">
                             <div className="text-[9px] uppercase font-bold text-ink/50 tracking-widest mb-1 leading-none">Deadline</div>
                             <div className={`font-bold flex items-center gap-1 ${overdue ? 'text-offline-state tracking-tighter' : ''}`}>
                                <Clock size={12} />
                                {new Date(task.deadline).toLocaleString(undefined, {
                                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                })}
                             </div>
                             
                             <button onClick={() => onDeleteTask(task.id)} className="absolute top-2 right-2 text-ink/30 hover:text-offline-state text-[10px] uppercase font-bold transition-colors">
                               DEL
                             </button>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
