import React, { useState, useEffect } from 'react';
import { useGymData } from '../context/GymDataContext';
import { NAV_ITEMS } from '../data/clubData';
import { Menu, X, Phone, ArrowUpRight, Settings } from 'lucide-react';

interface NavbarProps {
  onEnquireClick: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnquireClick, onOpenAdmin }) => {
  const { clubData, isAdminLoggedIn } = useGymData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Wordmark */}
            <a
              href="#"
              className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded-sm"
              aria-label="Fitness Zone City Walk Dubai Homepage"
            >
              <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white uppercase group-hover:text-brand-lime transition-colors">
                FITNESS ZONE
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-brand-gray uppercase">
                CITY WALK · DUBAI
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-brand-gray hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brand-lime hover:after:w-full after:transition-all after:duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center space-x-3">
              {isAdminLoggedIn ? (
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-brand-lime/10 border border-brand-lime/40 text-brand-lime hover:bg-brand-lime hover:text-black font-bold text-xs uppercase tracking-wider transition-all"
                  title="Open Admin Suite"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
              ) : null}

              <a
                href={clubData.links.telDirect}
                className="flex items-center space-x-2 text-xs font-semibold tracking-wide text-brand-gray hover:text-white transition-colors px-3 py-2 rounded border border-white/10 hover:border-white/30"
                aria-label={`Call ${clubData.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-brand-lime" />
                <span className="font-mono">{clubData.phone}</span>
              </a>

              <button
                onClick={onEnquireClick}
                className="flex items-center space-x-2 px-5 py-2.5 rounded bg-brand-lime text-black font-bold text-xs uppercase tracking-wider hover:bg-brand-lime-hover transition-all duration-200 shadow-md shadow-brand-lime/10 active:scale-[0.98]"
              >
                <span>JOIN / ENQUIRE</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center space-x-2">
              <button
                onClick={onEnquireClick}
                className="px-3 py-1.5 rounded bg-brand-lime text-black font-bold text-[11px] uppercase tracking-wider"
              >
                ENQUIRE
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:text-brand-lime transition-colors focus:outline-none focus:ring-2 focus:ring-brand-lime rounded"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#141414] border-l border-white/10 z-50 p-6 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <div className="text-lg font-extrabold tracking-wider text-white uppercase">
                FITNESS ZONE
              </div>
              <div className="text-[10px] tracking-widest text-brand-gray uppercase">
                CITY WALK · DUBAI
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-brand-gray hover:text-white rounded"
              aria-label="Close navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-3 py-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-base font-semibold text-white/90 hover:text-brand-lime transition-colors py-1.5 flex items-center justify-between border-b border-white/5 pb-2"
              >
                <span>{item.label}</span>
                <span className="text-xs text-white/30 font-mono">→</span>
              </a>
            ))}

            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-sm font-bold text-brand-lime hover:underline py-2 flex items-center justify-between border-b border-white/5"
              >
                <span>{isAdminLoggedIn ? '⚡ Admin Control Panel' : '🔒 Admin Portal Login'}</span>
                <span className="text-xs text-brand-lime font-mono">⚙️</span>
              </button>
            )}
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-white/10">
          <div className="text-xs text-brand-gray">
            <span className="block text-white font-medium mb-0.5">{clubData.locationArea}</span>
            <span>{clubData.reportedHours}</span>
          </div>

          <a
            href={clubData.links.telDirect}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded border border-white/20 text-white font-semibold text-sm hover:border-brand-lime transition-colors font-mono"
          >
            <Phone className="w-4 h-4 text-brand-lime" />
            <span>Call {clubData.phone}</span>
          </a>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onEnquireClick();
            }}
            className="w-full py-3.5 rounded bg-brand-lime text-black font-extrabold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"
          >
            <span>ENQUIRE ABOUT MEMBERSHIP</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </>
  );
};
