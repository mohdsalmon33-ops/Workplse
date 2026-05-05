import React, { useState } from 'react';
import { Fingerprint, Scan, ShieldAlert } from 'lucide-react';

interface AuthPageProps {
  onLogin: () => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [ident, setIdent] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ident || !pin) {
      setError('Credentials incomplete. Proceeding requires full identity verification. ⚠️');
      return;
    }
    onLogin();
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center font-mono p-4">
      <div className="max-w-md w-full bg-white border-4 border-ink shadow-[8px_8px_0_0_#141414] p-8 flex flex-col gap-6">
        
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-ink text-white flex items-center justify-center -skew-x-12 transform rotate-3">
            <Fingerprint size={48} className="skew-x-12 stroke-[2]" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Identity Core</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-ink/50 mt-1">
            {mode === 'login' ? 'Authentication Required' : 'Personnel Onboarding'}
          </p>
        </div>

        {error && (
          <div className="bg-offline-state text-white p-3 text-xs font-bold flex items-center gap-2 border-2 border-ink">
            <ShieldAlert size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
             <label className="text-[10px] font-sans font-bold tracking-widest uppercase text-ink/70">Subject Ident / ID</label>
             <div className="relative">
               <Scan size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
               <input 
                 type="text" 
                 className="w-full border-2 border-ink py-2 pl-10 pr-3 font-mono focus:outline-none focus:bg-[#f0ff00] transition-colors"
                 placeholder="WRK-0000"
                 value={ident}
                 onChange={e => setIdent(e.target.value)}
               />
             </div>
          </div>
          
          <div className="flex flex-col gap-1">
             <label className="text-[10px] font-sans font-bold tracking-widest uppercase text-ink/70">Passcode / PIN</label>
             <input 
               type="password" 
               className="w-full border-2 border-ink py-2 px-3 font-mono focus:outline-none focus:bg-[#f0ff00] tracking-[0.5em] transition-colors"
               placeholder="••••••••"
               value={pin}
               onChange={e => setPin(e.target.value)}
             />
          </div>

          <button 
            type="submit" 
            className="w-full bg-active-state border-2 border-ink py-3 font-bold uppercase tracking-widest mt-4 hover:opacity-90 active:translate-y-1 transition-all flex justify-center"
          >
            {mode === 'login' ? 'Authenticate' : 'Register Identity'}
          </button>
        </form>

        <div className="text-center pt-4 border-t-2 border-ink/10">
          <button 
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
            className="text-xs uppercase font-bold tracking-widest text-ink/50 hover:text-ink transition-colors underline decoration-2 underline-offset-4"
          >
            {mode === 'login' ? 'Request New Identity' : 'Existing Identity Login'}
          </button>
        </div>

      </div>
    </div>
  );
}
