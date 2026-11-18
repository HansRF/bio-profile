import {
  Briefcase,
  Globe,
  Mail,
  MessageCircle,
  Youtube,
  Instagram,
  Github,
  Linkedin,
} from 'lucide-react';
import type { PlatformIconName } from '../data/profile';

interface PlatformIconProps {
  name: PlatformIconName;
  className?: string;
}

export function PlatformIcon({ name, className = 'w-5 h-5' }: PlatformIconProps) {
  switch (name) {
    case 'instagram':
      return <Instagram className={className} strokeWidth={1.85} aria-hidden="true" />;
    case 'youtube':
      return <Youtube className={className} strokeWidth={1.85} aria-hidden="true" />;
    case 'github':
      return <Github className={className} strokeWidth={1.85} aria-hidden="true" />;
    case 'linkedin':
      return <Linkedin className={className} strokeWidth={1.85} aria-hidden="true" />;
    case 'globe':
      return <Globe className={className} strokeWidth={1.85} aria-hidden="true" />;
    case 'portfolio':
      return <Briefcase className={className} strokeWidth={1.85} aria-hidden="true" />;
    case 'whatsapp':
      return <MessageCircle className={className} strokeWidth={1.85} aria-hidden="true" />;
    case 'mail':
      return <Mail className={className} strokeWidth={1.85} aria-hidden="true" />;
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.8a4.83 4.83 0 0 1-1-.11Z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return <Globe className={className} strokeWidth={1.85} aria-hidden="true" />;
  }
}
