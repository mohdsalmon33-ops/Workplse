import React, { useState, useEffect } from 'react';
import { useEmployees } from './hooks/useEmployees';
import { LiveClock } from './components/LiveClock';
import { StatBox } from './components/StatBox';
import { AttendanceBar } from './components/AttendanceBar';
import { EmployeeTable } from './components/EmployeeTable';
import { DetailSidebar } from './components/DetailSidebar';
import { AddEmployeeModal } from './components/AddEmployeeModal';
import { AuthPage } from './components/AuthPage';
import { ActionLogModal } from './components/ActionLogModal';
import { TrendsChartModal } from './components/TrendsChartModal';
import { TaskDashboardModal } from './components/TaskDashboardModal';
import { NotificationsPanel } from './components/NotificationsPanel';
import { useTasks } from './hooks/useTasks';
import { useNotifications } from './hooks/useNotifications';
import { Users, Plus, Moon, Sun, Download, Upload, Activity, TrendingUp, LogOut, CheckSquare, Bell } from 'lucide-react';

export default function App() {
  const { employees, logs, setStatus, addEmployee, deleteEmployee, addLog } = useEmployees();
  const { tasks, addTask, updateTaskStatus, deleteTask } = useTasks();
  const { notifications, addNotification, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isTrendsOpen, setIsTrendsOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Overdue task checker
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.status !== 'DONE' && new Date(task.deadline) < now) {
          // Check if we already notified recently? Or just alert.
          // To avoid spamming, let's keep it simple or track notified tasks.
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [tasks, isAuthenticated]);

  // Initial scan for overdue
  useEffect(() => {
    if (!isAuthenticated) return;
    const now = new Date();
    let overdueCount = 0;
    tasks.forEach(task => {
      if (task.status !== 'DONE' && new Date(task.deadline) < now) {
        overdueCount++;
      }
    });
    if (overdueCount > 0) {
      addNotification(`System Alert: ${overdueCount} task(s) currently overdue.`, 'WARNING');
    }
  }, [isAuthenticated]); // Run once when authenticated

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'Active').length,
    break: employees.filter(e => e.status === 'Break').length,
    offline: employees.filter(e => e.status === 'Offline').length,
  };

  const selectedEmployee = employees.find(e => e.id === selectedId) || null;

  const handleExport = () => {
    const headers = ['ID', 'Name', 'Role', 'Department', 'Location', 'Status', 'Last Change'];
    const csvContent = [
      headers.join(','),
      ...employees.map(e => [
        e.id, 
        `"${e.name}"`, 
        `"${e.role}"`, 
        `"${e.department}"`, 
        `"${e.location}"`, 
        e.status, 
        e.lastStatusChange
      ].join(','))
    ].join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `workpulse_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    addLog('EXPORT_DATA', 'Personnel data exported to CSV');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Mock import behavior
        setTimeout(() => {
          addLog('IMPORT_DATA', `Attempted raw data import from ${file.name}. Parsed 0 valid records.`);
          alert(`Simulated import of ${file.name}. No real parsing implemented.`);
        }, 500);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col p-4 md:p-8 font-mono overflow-hidden transition-colors duration-300">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b-4 border-ink gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-ink text-white flex items-center justify-center -skew-x-12">
            <Users size={24} className="skew-x-12 stroke-[3]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">WorkPulse</h1>
            <span className="text-[10px] font-sans font-bold tracking-widest text-ink/70 mt-1 uppercase flex items-center gap-2">
              Personnel Tracking Matrix // v2.5.0
              <span className="bg-active-state text-ink px-1 ml-2 font-bold select-none cursor-pointer hover:bg-ink hover:text-white transition-colors" onClick={() => setIsAuthenticated(false)}>
                SESSION_ACTIVE <LogOut size={10} className="inline ml-1"/>
              </span>
            </span>
          </div>
        </div>
        
        <div className="flex gap-4 md:gap-8 items-center border-2 border-ink p-2 bg-white shadow-[4px_4px_0_0_#141414] flex-wrap justify-end">
          <div className="hidden lg:block relative">
            <LiveClock />
          </div>
          <div className="flex gap-2 border-l-2 border-ink/20 pl-4 md:pl-8 ml-2 md:ml-0 flex-wrap relative">
            <button title="Notifications" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="flex items-center justify-center w-10 h-10 border-2 border-ink text-ink hover:bg-ink hover:text-white transition-colors relative">
              <Bell size={18} strokeWidth={3} />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-offline-state text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold border-2 border-ink">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <NotificationsPanel 
              isOpen={isNotificationsOpen} 
              onClose={() => setIsNotificationsOpen(false)} 
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
            />

            <button title="Task Dashboard" onClick={() => setIsTasksOpen(true)} className="flex items-center justify-center w-10 h-10 border-2 border-ink text-ink hover:bg-ink hover:text-white transition-colors">
              <CheckSquare size={18} strokeWidth={3} />
            </button>
            <button title="System Theme" onClick={() => setIsDark(!isDark)} className="flex items-center justify-center w-10 h-10 border-2 border-ink text-ink hover:bg-ink hover:text-white transition-colors">
              {isDark ? <Sun size={18} strokeWidth={3} /> : <Moon size={18} strokeWidth={3} />}
            </button>
            <button title="Export Data" onClick={handleExport} className="flex items-center justify-center w-10 h-10 border-2 border-ink text-ink hover:bg-ink hover:text-white transition-colors">
              <Download size={18} strokeWidth={3} />
            </button>
            <button title="Import Data" onClick={handleImport} className="flex items-center justify-center w-10 h-10 border-2 border-ink text-ink hover:bg-ink hover:text-white transition-colors">
              <Upload size={18} strokeWidth={3} />
            </button>
            <button title="System Audit" onClick={() => setIsAuditOpen(true)} className="flex items-center justify-center w-10 h-10 border-2 border-ink text-ink hover:bg-ink hover:text-white transition-colors">
              <Activity size={18} strokeWidth={3} />
            </button>
            <button title="Operations Telemetry" onClick={() => setIsTrendsOpen(true)} className="flex items-center justify-center w-10 h-10 border-2 border-ink text-ink hover:bg-ink hover:text-white transition-colors">
              <TrendingUp size={18} strokeWidth={3} />
            </button>
            <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 bg-ink text-white px-4 h-10 font-bold uppercase tracking-widest text-sm hover:bg-white active:translate-y-1 transition-all border-2 border-transparent hover:border-ink hover:text-ink cursor-pointer ml-2">
              <Plus size={16} strokeWidth={3} />
              <span className="hidden sm:inline">Onboard</span>
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shrink-0">
        <StatBox label="Total Headcount" value={stats.total} />
        <StatBox label="Active Personnel" value={stats.active} colorClass="bg-active-state border-ink" />
        <StatBox label="On Break" value={stats.break} colorClass="bg-break-state border-ink" />
        <StatBox label="Offline / Away" value={stats.offline} colorClass="bg-offline-state border-ink" textColorClass="text-white" />
      </div>

      <div className="mb-6 shrink-0">
        <AttendanceBar stats={stats} />
      </div>

      <main className="flex-1 min-h-0 flex gap-6 overflow-hidden">
        <div className="flex-1 overflow-hidden flex flex-col shadow-[8px_8px_0_0_#141414] bg-white border-2 border-ink">
          <EmployeeTable 
            employees={employees}
            onRowClick={setSelectedId}
            onSetStatus={setStatus}
            onDelete={deleteEmployee}
          />
        </div>
        
        {/* We keep DetailSidebar embedded directly in the flex flow, it handles its own AnimatePresence */}
        <DetailSidebar 
          employee={selectedEmployee}
          onClose={() => setSelectedId(null)}
        />
      </main>

      <AddEmployeeModal 
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={addEmployee}
      />

      <ActionLogModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        logs={logs}
      />

      <TrendsChartModal
        isOpen={isTrendsOpen}
        onClose={() => setIsTrendsOpen(false)}
        employees={employees}
      />

      <TaskDashboardModal
        isOpen={isTasksOpen}
        onClose={() => setIsTasksOpen(false)}
        tasks={tasks}
        employees={employees}
        onAddTask={addTask}
        onUpdateTask={updateTaskStatus}
        onDeleteTask={deleteTask}
        addLog={addLog}
      />
    </div>
  );
}
