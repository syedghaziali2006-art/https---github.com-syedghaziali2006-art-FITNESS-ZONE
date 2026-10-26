import React, { useState, useEffect } from 'react';
import { useGymData } from '../context/GymDataContext';
import { Phone, ArrowRight } from 'lucide-react';

interface MobileQuickBarProps {
  onEnquireClick: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onEnquireClick }) => {
  const { clubData } = useGymData();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past the initial hero viewport
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#121212]/95 backdrop-blur-lg border-t border-white/10 sm:hidden animate-fade-in">
      <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
        <a
          href={clubData.links.telDirect}
          className="py-3 px-3 rounded-lg border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 active:bg-white/10"
        >
          <Phone className="w-3.5 h-3.5 text-brand-lime" />
          <span>CALL CLUB</span>
        </a>

        <button
          onClick={onEnquireClick}
          className="py-3 px-3 rounded-lg bg-brand-lime text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-lg active:bg-brand-lime-hover"
        >
          <span>ENQUIRE NOW</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
