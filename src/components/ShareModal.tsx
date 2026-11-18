import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Mail, Share2, X } from 'lucide-react';
import type { ProfileData } from '../data/profile';
import { PlatformIcon } from './PlatformIcon';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  profileUrl: string;
  copiedUrl: boolean;
  onCopyUrl: () => void;
}

export function ShareModal({
  isOpen,
  onClose,
  profile,
  profileUrl,
  copiedUrl,
  onCopyUrl,
}: ShareModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const encodedUrl = encodeURIComponent(profileUrl);
  const encodedText = encodeURIComponent(
    `Check out ${profile.fullName} (${profile.username}) — ${profile.role}`
  );

  const shareTargets = [
    {
      id: 'x',
      label: 'Share on X',
      href: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: 'twitter' as const,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: 'linkedin' as const,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Sheet / Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl bg-[#16102A]/95 backdrop-blur-2xl border border-violet-400/25 shadow-2xl shadow-black/60 p-5 sm:p-6"
          >
            {/* Mobile drag handle */}
            <div
              className="sm:hidden w-10 h-1.5 rounded-full bg-violet-700/70 mx-auto mb-4"
              aria-hidden="true"
            />

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-violet-500/20 border border-amber-300/30 text-[#FDE047] flex items-center justify-center">
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                </span>
                <div>
                  <h2
                    id="share-modal-title"
                    className="font-display text-base font-bold text-white"
                  >
                    Share Profile
                  </h2>
                  <p className="text-xs font-mono text-[#FDE047]">{profile.username}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close share dialog"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-violet-300 hover:text-white hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Profile Link Copy Box */}
            <div className="mt-5 p-2 rounded-xl bg-[#0D091C] border border-violet-400/20 flex items-center gap-2">
              <span className="flex-1 px-2 text-xs font-mono text-[#D6CEE8] truncate">
                {profileUrl}
              </span>
              <button
                type="button"
                onClick={onCopyUrl}
                className="min-h-[40px] px-3.5 py-2 inline-flex items-center gap-1.5 rounded-lg bg-[#FACC15] hover:bg-[#FDE047] text-[#120C24] text-xs font-bold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Share Options */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {shareTargets.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-3 py-2.5 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white/[0.04] hover:bg-[#241A47] border border-violet-400/15 hover:border-amber-300/50 text-xs font-semibold text-white transition-all"
                >
                  <PlatformIcon name={item.icon} className="w-4 h-4 text-[#FDE047]" />
                  <span>{item.label}</span>
                </a>
              ))}

              <a
                href={`mailto:?subject=${encodeURIComponent(
                  `${profile.fullName} — Bio Profile`
                )}&body=${encodedText}%0A${encodedUrl}`}
                className="min-h-[48px] px-3 py-2.5 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white/[0.04] hover:bg-[#241A47] border border-violet-400/15 hover:border-amber-300/50 text-xs font-semibold text-white transition-all"
              >
                <Mail className="w-4 h-4 text-[#FDE047]" aria-hidden="true" />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
