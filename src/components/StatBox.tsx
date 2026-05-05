import React from 'react';

interface StatBoxProps {
  label: string;
  value: number | string;
  colorClass?: string;
  textColorClass?: string;
}

export function StatBox({ label, value, colorClass = 'bg-white', textColorClass = 'text-ink' }: StatBoxProps) {
  return (
    <div className={`border-2 border-ink p-4 flex flex-col justify-between ${colorClass}`}>
      <div className={`text-[10px] font-sans uppercase font-bold tracking-widest mb-4 ${textColorClass === 'text-white' ? 'text-white/80' : 'text-ink/60'}`}>
        {label}
      </div>
      <div className={`text-5xl font-black tabular-nums tracking-tighter ${textColorClass}`}>
        {value}
      </div>
    </div>
  );
}
