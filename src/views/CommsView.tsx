import React, { useState } from 'react';
import { Employee } from '../types';
import { useComms } from '../hooks/useComms';
import { Radio, Send } from 'lucide-react';

export function CommsView({ employees }: { employees: Employee[] }) {
  const { messages, sendMessage } = useComms();
  const [input, setInput] = useState('');
  const [channel, setChannel] = useState<'GLOBAL'|'MAINTENANCE'|'SECURITY'>('GLOBAL');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage('SYSTEM_ADMIN', input, channel);
    setInput('');
  };

  return (
    <div className="absolute inset-0 p-6 flex flex-col font-mono bg-paper">
      <div className="flex gap-4 items-center mb-6 border-b-4 border-ink pb-4 shrink-0">
        <Radio size={32} className="text-ink" />
        <h2 className="text-2xl font-black uppercase tracking-tighter text-ink">Secure Broadcast Network</h2>
      </div>
      
      <div className="flex-1 flex flex-col bg-white border-2 border-ink shadow-[8px_8px_0_0_#141414] overflow-hidden">
        <div className="flex border-b-2 border-ink font-bold text-xs uppercase tracking-widest bg-ink text-white">
          {(['GLOBAL', 'MAINTENANCE', 'SECURITY'] as const).map(c => (
            <button 
              key={c}
              onClick={() => setChannel(c)}
              className={`flex-1 p-3 transition-colors ${channel === c ? 'bg-[#f0ff00] text-ink' : 'hover:bg-white/10'}`}
            >
              / {c}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.filter(m => m.channel === channel).map(msg => {
            const isSystem = msg.senderId === 'SYSTEM' || msg.senderId === 'SYSTEM_ADMIN';
            return (
              <div key={msg.id} className={`flex flex-col ${isSystem ? 'items-end' : 'items-start'}`}>
                <div className="text-[9px] uppercase tracking-widest text-ink/50 font-bold mb-1">
                  {msg.senderId} // {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
                <div className={`p-3 max-w-[80%] border-2 border-ink text-sm ${isSystem ? 'bg-active-state text-ink' : 'bg-paper text-ink'}`}>
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-ink flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Transmit message..."
            className="flex-1 bg-white border-2 border-ink px-4 py-2 text-sm focus:outline-none focus:bg-[#f0ff00] transition-colors"
          />
          <button type="submit" className="bg-active-state text-ink border-2 border-ink px-4 uppercase font-bold text-xs tracking-widest hover:opacity-90 flex items-center gap-2">
            <Send size={14} /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
