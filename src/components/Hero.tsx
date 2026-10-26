import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { Star, ArrowRight, ChevronDown, MapPin, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onEnquireClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnquireClick, onExploreClick }) => {
  const { clubData } = useGymData();

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image with Layered Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
          alt="Premium training environment at Fitness Zone City Walk"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
          decoding="async"
        />
        {/* Layered cinematic dark gradients for high contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/70 to-[#101010]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101010]/90 via-[#101010]/60 to-transparent" />
        <div className="absolute inset-0 bg-black/30 backdrop-[1px]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 md:mt-16">
        <div className="max-w-3xl">
          {/* Rating Badge & Location Pill */}
          <div className="inline-flex flex-wrap items-center gap-2.5 mb-6">
            <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
              <div className="flex items-center text-brand-lime">
                <Star className="w-4 h-4 fill-brand-lime text-brand-lime mr-1" />
                <span className="font-bold text-xs text-white">{clubData.rating}/5</span>
              </div>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-xs text-brand-gray font-medium">Google Rating</span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-xs text-brand-lime font-medium">{clubData.reviewCount} Reviews</span>
            </div>

            <div className="inline-flex items-center space-x-1.5 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-brand-gray">
              <MapPin className="w-3.5 h-3.5 text-brand-lime" />
              <span>{clubData.locationArea}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05] mb-6">
            BUILT FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-brand-gray">
              YOUR NEXT
            </span>{' '}
            <span className="text-brand-lime underline decoration-brand-lime/30 underline-offset-8">
              LEVEL.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg md:text-xl text-brand-gray font-normal leading-relaxed max-w-2xl mb-10">
            Train with purpose. Build strength. Move better. Discover your fitness journey at{' '}
            <span className="text-white font-medium">{clubData.name}</span>.
          </p>

          {/* Primary & Secondary Call To Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onEnquireClick}
              className="group inline-flex items-center justify-center space-x-3 px-8 py-4 rounded bg-brand-lime text-black font-extrabold text-sm uppercase tracking-wider hover:bg-brand-lime-hover transition-all duration-200 shadow-xl shadow-brand-lime/15 active:scale-[0.98]"
            >
              <span>ENQUIRE ABOUT MEMBERSHIP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center space-x-2 px-7 py-4 rounded border border-white/20 hover:border-white/50 text-white font-semibold text-sm uppercase tracking-wider bg-black/30 hover:bg-white/5 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
            >
              <span>EXPLORE THE CLUB</span>
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{clubData.rating}★</div>
              <div className="text-xs text-brand-gray mt-0.5">{clubData.reviewCount} Google Reviews</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-lime font-mono">11 PM</div>
              <div className="text-xs text-brand-gray mt-0.5">{clubData.reportedHours.replace('Reported: ', '')}</div>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center space-x-2 sm:block">
              <ShieldCheck className="w-5 h-5 text-brand-lime hidden sm:block mb-1" />
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">{clubData.address.line1}</div>
                <div className="text-xs text-brand-gray">{clubData.address.district}, {clubData.address.city}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <button
        onClick={onExploreClick}
        aria-label="Scroll down to explore the club"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center space-y-1 text-brand-gray/60 hover:text-white transition-colors focus:outline-none"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-brand-lime" />
      </button>
    </section>
  );
};
