import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { NAV_ITEMS } from '../data/clubData';
import { MapPin, Phone, Star, Navigation, ArrowUp, Lock } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { clubData, isAdminLoggedIn } = useGymData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0b0b] text-white pt-16 pb-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-2xl font-black tracking-wider uppercase text-white">
                FITNESS ZONE
              </span>
              <span className="block text-xs font-semibold tracking-widest text-brand-lime uppercase mt-0.5">
                CITY WALK · DUBAI
              </span>
            </div>

            <p className="text-sm text-brand-gray max-w-sm leading-relaxed">
              A contemporary, focused training club located at {clubData.address.line1}, Dubai. Built for disciplined workouts, consistent progression, and personal athletic goals.
            </p>

            <div className="inline-flex items-center space-x-2 pt-2 text-xs text-brand-gray">
              <Star className="w-4 h-4 fill-brand-lime text-brand-lime" />
              <span className="text-white font-bold">{clubData.rating}/5</span>
              <span>· {clubData.reviewCount} Google Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">
              NAVIGATION
            </h3>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-brand-gray hover:text-brand-lime transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#membership-enquiry"
                  className="text-sm text-brand-lime hover:underline font-semibold"
                >
                  Membership Enquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">
              VISIT & CONNECT
            </h3>
            
            <div className="space-y-3 text-sm text-brand-gray">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-lime flex-shrink-0 mt-1" />
                <span>
                  {clubData.address.full}
                  <span className="block text-xs text-brand-lime font-mono mt-0.5">
                    Plus Code: {clubData.plusCode}
                  </span>
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-brand-lime flex-shrink-0" />
                <a
                  href={clubData.links.telDirect}
                  className="text-white hover:text-brand-lime font-mono font-medium transition-colors"
                >
                  {clubData.phone}
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <a
                href={clubData.links.googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:border-brand-lime text-brand-gray hover:text-white transition-colors inline-flex items-center space-x-1"
              >
                <Navigation className="w-3 h-3 text-brand-lime" />
                <span>Directions</span>
              </a>

              <a
                href={clubData.links.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:border-brand-lime text-brand-gray hover:text-white transition-colors"
              >
                Google Reviews
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-gray/60 gap-4">
          <div>
            © {CURRENT_YEAR} {clubData.name}. All rights reserved.
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center space-x-1.5 text-white/40 hover:text-brand-lime transition-colors py-1 px-2 rounded hover:bg-white/5"
                title="Admin Control Suite"
              >
                <Lock className="w-3 h-3 text-brand-lime" />
                <span className="font-semibold">{isAdminLoggedIn ? '⚡ Admin Mode Active' : 'Admin Portal'}</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-white/5 hover:bg-brand-lime hover:text-black text-white transition-colors flex items-center space-x-1"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
