import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { ArrowRight } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const { announcement } = useGymData();

  if (!announcement || !announcement.enabled || !announcement.message) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    if (announcement.linkUrl?.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(announcement.linkUrl);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative z-[60] bg-gradient-to-r from-[#181818] via-brand-lime/15 to-[#181818] border-b border-brand-lime/30 text-white py-2 px-4 text-center">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs">
        {announcement.badge && (
          <span className="px-2 py-0.5 rounded-full bg-brand-lime text-black font-black uppercase text-[10px] tracking-wider shadow-sm">
            {announcement.badge}
          </span>
        )}
        <span className="font-semibold text-white/95">
          {announcement.message}
        </span>
        {announcement.linkText && (
          <a
            href={announcement.linkUrl || '#membership-enquiry'}
            onClick={handleClick}
            className="inline-flex items-center text-brand-lime font-bold hover:underline ml-1"
          >
            <span>{announcement.linkText}</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </a>
        )}
      </div>
    </div>
  );
};
