import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeatureShowcaseProps {
  onEnquireClick: () => void;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ onEnquireClick }) => {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[85vh] w-full flex items-center justify-center overflow-hidden border-t border-b border-white/10 group">
      {/* Background Image with Cinematic Dark Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
          alt="High intensity training at Fitness Zone"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
        {/* Layered dark filters to make typography dramatically legible */}
        <div className="absolute inset-0 bg-[#101010]/80 sm:bg-[#101010]/75" />
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      {/* Editorial Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-brand-lime">
          CITY WALK · DUBAI
        </div>

        {/* Oversized Editorial Typography */}
        <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none mb-8 select-none">
          <span className="block opacity-90">SHOW UP.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gray to-white/70">
            PUT IN THE WORK.
          </span>
          <span className="block text-brand-lime">
            BECOME STRONGER.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-brand-gray mb-10 leading-relaxed font-normal">
          Consistency is the cornerstone of every milestone. Your environment sets the standard.
        </p>

        <div>
          <button
            onClick={onEnquireClick}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded bg-brand-lime hover:bg-brand-lime-hover text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-200 shadow-xl shadow-brand-lime/10 active:scale-[0.98]"
          >
            <span>JOIN FITNESS ZONE TODAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
