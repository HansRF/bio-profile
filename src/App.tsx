import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { Check, Link2, Share2 } from 'lucide-react';
import { AmbientBackground } from './components/AmbientBackground';
import { CustomCursor } from './components/CustomCursor';
import { LinkCard } from './components/LinkCard';
import { ProfileHeader } from './components/ProfileHeader';
import { ShareModal } from './components/ShareModal';
import { Toast } from './components/Toast';
import { PROFILE_DATA } from './data/profile';

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export default function App() {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const toastTimerRef = useRef<number | null>(null);
  const urlResetRef = useRef<number | null>(null);
  const emailResetRef = useRef<number | null>(null);

  const profileUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://nadiakusuma.studio';

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      if (urlResetRef.current) window.clearTimeout(urlResetRef.current);
      if (emailResetRef.current) window.clearTimeout(emailResetRef.current);
    };
  }, []);

  const handleCopyUrl = useCallback(async () => {
    const ok = await copyToClipboard(profileUrl);
    if (ok) {
      setCopiedUrl(true);
      showToast('Profile URL copied');
      if (urlResetRef.current) window.clearTimeout(urlResetRef.current);
      urlResetRef.current = window.setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setIsShareOpen(true);
    }
  }, [profileUrl, showToast]);

  const handleCopyEmail = useCallback(async () => {
    const ok = await copyToClipboard(PROFILE_DATA.email);
    if (ok) {
      setCopiedEmail(true);
      showToast(`Copied ${PROFILE_DATA.email}`);
      if (emailResetRef.current) window.clearTimeout(emailResetRef.current);
      emailResetRef.current = window.setTimeout(() => setCopiedEmail(false), 2200);
    }
  }, [showToast]);

  const handleShareProfile = useCallback(async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${PROFILE_DATA.fullName} (${PROFILE_DATA.username})`,
          text: PROFILE_DATA.bio,
          url: profileUrl,
        });
        showToast('Profile shared!');
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }
    setIsShareOpen(true);
  }, [profileUrl, showToast]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-dvh flex flex-col items-center justify-between text-white">
        <AmbientBackground />
        <CustomCursor enabled />

        {/* Centered Linktree-Style Main Container (max-w-500px, mobile padding 20-24px) */}
        <main className="w-full max-w-[500px] mx-auto px-5 sm:px-6 pt-5 sm:pt-8 pb-8 flex-1 flex flex-col">
          {/* Minimal Floating Top-Right Utility Controls (Copy URL & Share) */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-end gap-2 mb-3"
          >
            <button
              type="button"
              onClick={handleCopyUrl}
              aria-label="Copy profile URL"
              title="Copy profile URL"
              className="w-11 h-11 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#2B175E] to-[#1C0F3E] hover:from-[#FACC15] hover:to-[#FDE047] border border-amber-300/45 hover:border-[#FDE047] text-[#FDE047] hover:text-[#140A2B] backdrop-blur-md shadow-md shadow-purple-950/50 transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]"
            >
              {copiedUrl ? (
                <Check className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Link2 className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={handleShareProfile}
              aria-label="Share profile"
              title="Share profile"
              className="w-11 h-11 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#2B175E] to-[#1C0F3E] hover:from-[#FACC15] hover:to-[#FDE047] border border-amber-300/45 hover:border-[#FDE047] text-[#FDE047] hover:text-[#140A2B] backdrop-blur-md shadow-md shadow-purple-950/50 transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>

          {/* Profile Avatar, Display Name, @username, Bio, Social Icons, Copy Email */}
          <ProfileHeader
            profile={PROFILE_DATA}
            copiedEmail={copiedEmail}
            onCopyEmail={handleCopyEmail}
          />

          {/* Vertical Linktree Link Buttons Stack */}
          <section aria-label="Links" className="mt-7 space-y-3.5 w-full">
            {PROFILE_DATA.links.map((link, index) => (
              <LinkCard key={link.id} link={link} index={index} />
            ))}
          </section>
        </main>

        {/* Linktree-Style Centered Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="w-full max-w-[500px] mx-auto px-5 sm:px-6 pb-8 pt-4 text-center"
        >
          <div
            className="mx-auto mb-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"
            aria-hidden="true"
          />
          <p className="text-xs font-medium text-[#D6CEE8]">
            {PROFILE_DATA.madeWithText} <span className="text-[#FDE047]">·</span> © {new Date().getFullYear()}
          </p>
        </motion.footer>

        {/* Share Fallback Dialog & Toast Feedback */}
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          profile={PROFILE_DATA}
          profileUrl={profileUrl}
          copiedUrl={copiedUrl}
          onCopyUrl={handleCopyUrl}
        />

        <Toast message={toastMessage} />
      </div>
    </MotionConfig>
  );
}
