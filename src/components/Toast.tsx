import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  return (
    <div
      className="pointer-events-none fixed bottom-6 inset-x-0 z-50 flex justify-center px-4"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 rounded-full bg-[#FACC15] text-[#120C24] px-4 py-2.5 text-sm font-semibold shadow-xl shadow-black/45 border border-amber-200/60"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6D28D9] text-[#FDE047] shrink-0">
              <Check className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
