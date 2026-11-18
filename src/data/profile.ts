export type PlatformIconName =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'facebook'
  | 'twitter'
  | 'github'
  | 'linkedin'
  | 'globe'
  | 'whatsapp'
  | 'portfolio'
  | 'mail';

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: PlatformIconName;
}

export interface BioLink {
  id: string;
  title: string;
  url: string;
  icon: PlatformIconName;
}

export interface ProfileData {
  fullName: string;
  username: string;
  role: string;
  bio: string;
  email: string;
  avatarUrl: string;
  avatarAlt: string;
  initials: string;
  socials: SocialLink[];
  links: BioLink[];
  madeWithText: string;
}

/**
 * Centralized Link-in-Bio profile data.
 * Edit this file to customize avatar, display name, username, bio, social icons, and link buttons.
 */
export const PROFILE_DATA: ProfileData = {
  fullName: 'Budiono Siregar',
  username: '@budiono.s',
  role: 'Product Designer & Content Creator',
  bio: 'Product Designer & Creative Technologist in Jakarta. Sharing UI craft, design systems, and everyday creator workflows.',
  email: 'hello@budiono.studio',
  avatarUrl: './user.png',
  avatarAlt: 'Profile portrait of Budiono Siregar',
  initials: 'NK',
  socials: [
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@budiono.s',
      url: 'https://instagram.com',
      icon: 'instagram',
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      handle: '@budiono.s',
      url: 'https://tiktok.com',
      icon: 'tiktok',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      handle: 'Budiono Siregar',
      url: 'https://youtube.com',
      icon: 'youtube',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      handle: 'budiono.s.studio',
      url: 'https://facebook.com',
      icon: 'facebook',
    },
    {
      id: 'twitter',
      label: 'X',
      handle: '@budiono.s',
      url: 'https://x.com',
      icon: 'twitter',
    },
    {
      id: 'github',
      label: 'GitHub',
      handle: 'budiono.s',
      url: 'https://github.com',
      icon: 'github',
    },
  ],
  links: [
    {
      id: 'website',
      title: 'My Personal Website',
      url: 'https://read.cv',
      icon: 'globe',
    },
    {
      id: 'instagram-link',
      title: 'Instagram',
      url: 'https://instagram.com',
      icon: 'instagram',
    },
    {
      id: 'tiktok-link',
      title: 'TikTok',
      url: 'https://tiktok.com',
      icon: 'tiktok',
    },
    {
      id: 'youtube-link',
      title: 'My YouTube Channel',
      url: 'https://youtube.com',
      icon: 'youtube',
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Contact',
      url: 'https://wa.me/6281234567890',
      icon: 'whatsapp',
    },
    {
      id: 'portfolio',
      title: 'My Portfolio',
      url: 'https://dribbble.com',
      icon: 'portfolio',
    },
    {
      id: 'github-repo',
      title: 'GitHub Repository',
      url: 'https://github.com',
      icon: 'github',
    },
    {
      id: 'contact',
      title: 'Contact Me',
      url: 'mailto:hello@budiono.s.studio',
      icon: 'mail',
    },
  ],
  madeWithText: 'Made with care by Budiono Siregar',
};
