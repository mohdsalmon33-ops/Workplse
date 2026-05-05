import React from 'react';

interface AttendanceBarProps {
  stats: {
    total: number;
    active: number;
    break: number;
    offline: number;
  };
}

export function AttendanceBar({ stats }: AttendanceBarProps) {
  const total = stats.total || 1; // avoid /0
  const activePct = (stats.active / total) * 100;
  const breakPct = (stats.break / total) * 100;
  const offlinePct = (stats.offline / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-xs uppercase font-sans font-bold tracking-widest text-ink/70">System Readiness</h3>
        <span className="text-lg font-bold tabular-nums">{stats.active}/{stats.total} ACTIVE</span>
      </div>
      <div className="flex w-full h-8 border-2 border-ink bg-white overflow-hidden">
        {stats.active > 0 && <div style={{ width: `${activePct}%` }} className="bg-active-state border-r-2 border-ink transition-all duration-500 ease-out" />}
        {stats.break > 0 && <div style={{ width: `${breakPct}%` }} className="bg-break-state border-r-2 border-ink transition-all duration-500 ease-out" />}
        {stats.offline > 0 && <div style={{ width: `${offlinePct}%` }} className="bg-offline-state transition-all duration-500 ease-out" />}
      </div>
    </div>
  );
}
