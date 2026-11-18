import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import type { ProfileData } from '../data/profile';
import { PlatformIcon } from './PlatformIcon';

interface ProfileHeaderProps {
  profile: ProfileData;
  copiedEmail: boolean;
  onCopyEmail: () => void;
}

export function ProfileHeader({ profile, copiedEmail, onCopyEmail }: ProfileHeaderProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="flex flex-col items-center text-center"
    >
      {/* 1. Circular Profile Picture with Vivid Purple-Yellow Gradient Halo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative group mb-4"
      >
        <div
          className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#9333EA]/55 via-[#FACC15]/40 to-[#7C3AED]/55 blur-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />
        <div className="relative p-[4px] rounded-full bg-gradient-to-tr from-[#9333EA] via-[#FACC15] to-[#7C3AED] shadow-xl shadow-purple-950/60">
          <div className="w-[104px] h-[104px] sm:w-[114px] sm:h-[114px] rounded-full overflow-hidden bg-[#1D0F3F] ring-[3px] ring-[#120829]">
            {!imgError ? (
              <img
                src={profile.avatarUrl}
                alt={profile.avatarAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7C3AED] to-[#FACC15] text-white font-display text-2xl font-bold">
                {profile.initials}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 2. Display Name */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-2xl sm:text-[27px] font-extrabold tracking-tight text-white text-balance"
      >
        {profile.fullName}
      </motion.h1>

      {/* 3. Username (@username) + Purple-Yellow Accent Line */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-1 flex flex-col items-center gap-2"
      >
        <p className="font-mono text-[13.5px] font-semibold text-[#FDE047]">
          {profile.username}
        </p>
        <span
          className="h-[3px] w-14 rounded-full bg-gradient-to-r from-[#9333EA] via-[#FACC15] to-[#9333EA]"
          aria-hidden="true"
        />
      </motion.div>

      {/* 4. Short Bio */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 max-w-[38ch] text-[13.5px] sm:text-sm leading-relaxed text-[#E4DDF5]"
      >
        {profile.bio}
      </motion.p>

      {/* 5. Horizontal Social Media Icons Row */}
      <motion.nav
        aria-label="Social media links"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap"
      >
        {profile.socials.map((social, idx) => (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} (${social.handle})`}
            title={social.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.2 + idx * 0.035,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-11 h-11 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#2B175E] to-[#1C0F3E] hover:from-[#FACC15] hover:to-[#FDE047] border border-amber-300/40 hover:border-[#FDE047] text-[#FDE047] hover:text-[#140A2B] shadow-md shadow-purple-950/50 hover:shadow-lg hover:shadow-amber-400/30 backdrop-blur-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]"
          >
            <PlatformIcon name={social.icon} className="w-[18px] h-[18px]" />
          </motion.a>
        ))}
      </motion.nav>

      {/* Quick Copy Email Action */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4"
      >
        <button
          type="button"
          onClick={onCopyEmail}
          aria-label={`Copy email address ${profile.email}`}
          className="min-h-[40px] px-4 py-1.5 inline-flex items-center gap-2 rounded-full bg-[#24134F]/90 hover:bg-[#311A6B] border border-amber-300/45 hover:border-[#FACC15] text-xs font-semibold text-white shadow-sm shadow-purple-950/40 backdrop-blur-md transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15] whitespace-nowrap"
        >
          {copiedEmail ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#FDE047]" aria-hidden="true" />
              <span className="text-[#FDE047]">Email copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#FDE047]" aria-hidden="true" />
              <span>{profile.email}</span>
            </>
          )}
        </button>
      </motion.div>
    </section>
  );
}
