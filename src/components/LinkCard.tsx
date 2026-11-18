import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { BioLink } from '../data/profile';
import { PlatformIcon } from './PlatformIcon';

interface LinkCardProps {
  link: BioLink;
  index: number;
}

export function LinkCard({ link, index }: LinkCardProps) {
  const isMailto = link.url.startsWith('mailto:');
  const isFeaturedTop = index === 0;

  return (
    <motion.a
      href={link.url}
      target={isMailto ? undefined : '_blank'}
      rel={isMailto ? undefined : 'noopener noreferrer'}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.34,
        delay: Math.min(0.22 + index * 0.045, 0.56),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -2.5, scale: 1.012 }}
      whileTap={{ scale: 0.98 }}
      className={
        isFeaturedTop
          ? 'group relative grid grid-cols-[44px_1fr_44px] items-center w-full min-h-[62px] px-3 py-2 rounded-[18px] bg-gradient-to-r from-[#FACC15] via-[#FDE047] to-[#F59E0B] border border-amber-200 shadow-[0_10px_28px_-6px_rgba(250,204,21,0.38)] hover:shadow-[0_14px_34px_-6px_rgba(250,204,21,0.55)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
          : 'group relative grid grid-cols-[44px_1fr_44px] items-center w-full min-h-[62px] px-3 py-2 rounded-[18px] bg-gradient-to-r from-[#281557]/95 via-[#1F1044]/95 to-[#2D1862]/95 hover:from-[#361D73] hover:to-[#412387] border border-amber-300/35 hover:border-[#FACC15] backdrop-blur-xl shadow-[0_8px_24px_-8px_rgba(12,6,28,0.65)] hover:shadow-[0_12px_28px_-6px_rgba(250,204,21,0.28)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]'
      }
    >
      {/* Subtle purple-yellow shimmer overlay on non-featured cards */}
      {!isFeaturedTop && (
        <span
          className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-r from-purple-500/10 via-transparent to-amber-400/15 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Left Icon Box */}
      <span
        className={
          isFeaturedTop
            ? 'relative z-10 w-10 h-10 rounded-xl bg-[#1A0D38] text-[#FDE047] border border-purple-900/40 flex items-center justify-center transition-transform duration-200 group-hover:scale-105'
            : 'relative z-10 w-10 h-10 rounded-xl bg-[#FACC15] group-hover:bg-[#FEF08A] text-[#150A2E] border border-amber-200/70 flex items-center justify-center transition-all duration-200 shadow-sm shadow-amber-500/20 group-hover:scale-105'
        }
      >
        <PlatformIcon name={link.icon} className="w-[18px] h-[18px]" />
      </span>

      {/* Centered Link Title */}
      <span
        className={
          isFeaturedTop
            ? 'relative z-10 px-2 text-center font-display text-[15px] font-bold tracking-tight text-[#150A2E] truncate'
            : 'relative z-10 px-2 text-center font-display text-[15px] font-semibold tracking-tight text-white group-hover:text-[#FEF08A] transition-colors truncate'
        }
      >
        {link.title}
      </span>

      {/* Right Arrow */}
      <span
        className={
          isFeaturedTop
            ? 'relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-[#150A2E] bg-[#150A2E]/10 group-hover:bg-[#150A2E] group-hover:text-[#FDE047] transition-all duration-200'
            : 'relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-[#FDE047]/80 group-hover:bg-[#FACC15]/15 group-hover:text-[#FDE047] transition-all duration-200'
        }
        aria-hidden="true"
      >
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </motion.a>
  );
}
