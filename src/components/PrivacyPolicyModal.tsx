import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-paper border-4 border-ink w-full max-w-2xl shadow-[12px_12px_0_0_rgba(20,20,20,1)] relative flex flex-col max-h-[80vh]"
          >
            <button onClick={onClose} className="absolute top-2 right-2 p-2 hover:bg-ink hover:text-paper transition-colors border-2 border-transparent hover:border-ink z-20">
              <X size={20} className="stroke-[3]" />
            </button>
            
            <div className="p-6 border-b-2 border-ink bg-white relative z-10 flex items-center gap-3 shrink-0">
              <ShieldCheck className="text-active-state size-8" />
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-ink">Privacy Protocol</h2>
                <p className="text-[10px] font-sans text-ink/70 mt-1 uppercase font-bold tracking-widest">Document Class: Confidentiality</p>
              </div>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto font-sans relative z-0 flex-1">
              <div className="prose prose-sm prose-p:text-ink/80 prose-headings:text-ink max-w-none text-sm space-y-4">
                <p className="font-bold border-l-4 border-ink pl-3">Effective Date: [Insert Date]</p>

                <h3 className="text-lg font-black uppercase underline decoration-2 underline-offset-4 tracking-tighter">1. Information Collection</h3>
                <p>We collect biometric ident logs, schedule activities, and communication records originating from or related to your facility presence. Your location data might also be tracked locally within the company network bounds.</p>

                <h3 className="text-lg font-black uppercase underline decoration-2 underline-offset-4 tracking-tighter">2. Use of Information</h3>
                <p>The information collected is used solely for the purpose of facility management, operational scheduling, security compliance, and direct employee communications. Your personnel ident enables efficient monitoring of tasks and physical location mapping essential for corporate operations.</p>

                <h3 className="text-lg font-black uppercase underline decoration-2 underline-offset-4 tracking-tighter">3. Operational Confidentiality</h3>
                <p>Identity records and corresponding task allocations are heavily restricted. Standard operatives can only access their scheduled zones, while managerial directives may require deeper contextual visibility.</p>

                <h3 className="text-lg font-black uppercase underline decoration-2 underline-offset-4 tracking-tighter">4. Third-Party Sharing</h3>
                <p>All collected logs are classified under severe corporate confidentiality. We do not sell, distribute, or leak data to external contractors unauthorized by central management. Violations entail immediate revocation of privileges.</p>

                <h3 className="text-lg font-black uppercase underline decoration-2 underline-offset-4 tracking-tighter">5. Compliance Protocol</h3>
                <p>By interacting with the Identity Core, you acknowledge monitoring conditions established. Direct inquiries regarding specific log retention policies should be forwarded to the primary security handler.</p>
              </div>
            </div>

            <div className="p-4 border-t-2 border-ink bg-white shrink-0">
                <button 
                  onClick={onClose} 
                  className="w-full border-2 border-ink bg-ink text-white py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-ink transition-colors relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-active-state translate-y-[100%] group-hover:translate-y-0 transition-transform duration-200 ease-out z-0" />
                  <span className="relative z-10">Acknowledge & Close</span>
                </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
