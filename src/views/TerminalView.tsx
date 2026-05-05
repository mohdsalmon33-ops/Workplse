import React, { useState, useEffect, useRef } from 'react';
import { Employee } from '../types';

export function TerminalView({ employees }: { employees: Employee[] }) {
  const [history, setHistory] = useState<{ type: 'input'|'output', text: string }[]>([
    { type: 'output', text: 'SYSTEM OVERRIDE INITIATED.' },
    { type: 'output', text: 'TYPE "HELP" FOR COMMAND LIST.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toUpperCase();
    const newHistory = [...history, { type: 'input' as const, text: `> ${input}` }];
    
    if (cmd === 'CLEAR') {
      setHistory([]);
    } else if (cmd === 'HELP') {
       newHistory.push({ type: 'output', text: 'AVAILABLE COMMANDS: HELP, CLEAR, STATUS, LIST_PERSONNEL, PING' });
       setHistory(newHistory);
    } else if (cmd === 'PING') {
       newHistory.push({ type: 'output', text: 'PONG. LATENCY 14ms.' });
       setHistory(newHistory);
    } else if (cmd === 'STATUS') {
       newHistory.push({ type: 'output', text: `SYSTEM NOMINAL. ${employees.length} PERSONNEL REGISTERED.` });
       setHistory(newHistory);
    } else if (cmd === 'LIST_PERSONNEL') {
       employees.forEach(emp => {
         newHistory.push({ type: 'output', text: `[${emp.id}] ${emp.name} - ${emp.role} (${emp.status})` });
       });
       setHistory(newHistory);
    } else {
       newHistory.push({ type: 'output', text: `COMMAND NOT RECOGNIZED: ${cmd}` });
       setHistory(newHistory);
    }
    
    setInput('');
  };

  return (
    <div className="absolute inset-0 bg-ink text-active-state font-mono p-4 flex flex-col uppercase tracking-widest text-xs sm:text-sm">
      <div className="flex-1 overflow-y-auto w-full flex flex-col gap-1">
        {history.map((h, i) => (
          <div key={i} className={`whitespace-pre-wrap ${h.type === 'input' ? 'text-white' : ''}`}>
            {h.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleCommand} className="mt-4 flex items-center shrink-0 border-t-2 border-active-state/30 pt-4">
        <span className="mr-2 text-white">{'>'}</span>
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
          className="flex-1 bg-transparent outline-none text-active-state uppercase"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
