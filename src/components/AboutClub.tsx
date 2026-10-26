import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { MapPin, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutClub: React.FC = () => {
  const { clubData } = useGymData();

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#141414] border-t border-b border-white/5 relative overflow-hidden">
      {/* Background subtle ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-lime mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-lime" />
            <span>THE CLUB PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight mb-4">
            MORE THAN A WORKOUT.
          </h2>
          <p className="text-lg sm:text-xl text-brand-lime/90 font-medium tracking-wide">
            {clubData.tagline}
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
              At <strong className="text-white font-semibold">{clubData.name}</strong>, training is approached with intention. Whether you are aiming to build raw strength, elevate overall conditioning, or simply establish a disciplined physical habit, our space is structured to support every phase of your personal fitness journey.
            </p>

            <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
              Located right in the heart of <strong className="text-white font-semibold">{clubData.locationArea}</strong>, we provide a focused, energetic atmosphere where you can leave everyday noise at the door and concentrate wholly on your progression.
            </p>

            {/* Core Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#1a1a1a] border border-white/10 hover:border-brand-lime/40 transition-colors">
                <Target className="w-5 h-5 text-brand-lime mb-2" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                  Purposeful Training
                </h3>
                <p className="text-xs text-brand-gray leading-relaxed">
                  An environment curated for sustained focus, free of unnecessary clutter.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#1a1a1a] border border-white/10 hover:border-brand-lime/40 transition-colors">
                <Sparkles className="w-5 h-5 text-brand-lime mb-2" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                  Progressive Mindset
                </h3>
                <p className="text-xs text-brand-gray leading-relaxed">
                  Celebrating consistency and personal development with every repetition.
                </p>
              </div>
            </div>

            {/* Direct Information Verification Strip */}
            <div className="pt-2 flex items-start space-x-3 text-xs text-brand-gray/80 bg-white/[0.03] p-3.5 rounded border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-brand-lime flex-shrink-0 mt-0.5" />
              <span>
                Verified location at {clubData.address.line1}, {clubData.address.landmark}. {clubData.reportedHours} as reported on Google Maps.
              </span>
            </div>
          </div>

          {/* Photographic Column with Floating Badges */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
                alt="Focused athlete training at Fitness Zone City Walk"
                className="w-full h-[400px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-lime flex items-center justify-center text-black font-extrabold text-sm font-mono">
                    FZ
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      {clubData.name}
                    </div>
                    <div className="text-[11px] text-brand-gray flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-brand-lime" />
                      <span>{clubData.address.district}, {clubData.address.city}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black text-white font-mono">{clubData.rating} / 5.0</div>
                  <div className="text-[10px] text-brand-lime uppercase tracking-wider font-semibold">
                    Google Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
