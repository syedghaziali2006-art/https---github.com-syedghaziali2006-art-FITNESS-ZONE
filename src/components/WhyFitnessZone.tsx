import React from 'react';
import { useGymData } from '../context/GymDataContext';
import type { WhyUsBenefit } from '../types/gym';
import {
  Target,
  Dumbbell,
  MapPin,
  Compass,
  Trophy,
  Flame,
  Zap,
  Shield
} from 'lucide-react';

export const WhyFitnessZone: React.FC = () => {
  const { whyUsBenefits } = useGymData();

  const getIcon = (iconName: WhyUsBenefit['iconName']) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-6 h-6 text-brand-lime" />;
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6 text-brand-lime" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-brand-lime" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-brand-lime" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-brand-lime" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-brand-lime" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-brand-lime" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-brand-lime" />;
      default:
        return <Target className="w-6 h-6 text-brand-lime" />;
    }
  };

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#141414] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-lime mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-lime" />
            <span>STANDARDS & FOCUS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
            WHY FITNESS ZONE.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-gray">
            A gym tailored for consistency, motivation, and tangible progress right in City Walk.
          </p>
        </div>

        {/* Dynamic Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {whyUsBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group p-8 rounded-xl bg-[#191919] border border-white/10 hover:border-brand-lime/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Metric Number & Icon Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 group-hover:border-brand-lime/30 transition-colors">
                    {getIcon(benefit.iconName)}
                  </div>
                  <span className="font-mono text-sm font-bold text-white/30 group-hover:text-brand-lime transition-colors">
                    /{benefit.metric}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-3 group-hover:text-white transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-sm text-brand-gray leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center text-xs font-semibold uppercase tracking-wider text-white/40 group-hover:text-brand-lime transition-colors">
                <span>City Walk Dubai</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
