import React from 'react';
import { useGymData } from '../context/GymDataContext';
import type { TrainingCard } from '../types/gym';
import { ArrowUpRight, Check, HelpCircle } from 'lucide-react';

interface TrainingExperienceProps {
  onSelectExperience: (experienceTitle: string) => void;
}

export const TrainingExperience: React.FC<TrainingExperienceProps> = ({ onSelectExperience }) => {
  const { trainingExperiences } = useGymData();

  return (
    <section id="training" className="py-24 sm:py-32 bg-[#101010] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-lime mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-lime" />
              <span>THE TRAINING EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              DESIGNED FOR DISCIPLINE & GROWTH.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-brand-gray max-w-sm">
            Focus on what matters most: intentional movement, progressive strength, and sustainable training habits.
          </p>
        </div>

        {/* Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingExperiences.map((card: TrainingCard) => (
            <div
              key={card.id}
              className="group relative flex flex-col justify-between bg-[#161616] rounded-xl overflow-hidden border border-white/10 hover:border-brand-lime/50 transition-all duration-300 shadow-xl"
            >
              {/* Card Image with Overlay */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/40 to-transparent" />

                {/* Badge if present */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-white border border-white/10">
                    {card.tag}
                  </span>
                  {card.badge && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded bg-brand-lime/90 backdrop-blur-md text-[10px] font-extrabold tracking-wider uppercase text-black">
                      <HelpCircle className="w-3 h-3 text-black mr-0.5" />
                      {card.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white uppercase mb-2 group-hover:text-brand-lime transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-brand-lime font-mono uppercase tracking-wider mb-4">
                    {card.subtitle}
                  </p>
                  <p className="text-sm text-brand-gray leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 mb-8 pt-4 border-t border-white/5">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-brand-gray/90">
                        <Check className="w-3.5 h-3.5 text-brand-lime flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Action */}
                <button
                  onClick={() => onSelectExperience(card.title)}
                  className="w-full py-3 px-4 rounded bg-[#202020] hover:bg-brand-lime hover:text-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-200 border border-white/5 group-hover:border-transparent active:scale-[0.98]"
                >
                  <span>{card.id.includes('personal') ? 'ENQUIRE ABOUT COACHING' : 'ENQUIRE ABOUT THIS'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Note */}
        <div className="mt-12 text-center text-xs text-brand-gray/70">
          Personal coaching availability is subject to trainer schedules and enquiry. Contact club reception for verification.
        </div>
      </div>
    </section>
  );
};
