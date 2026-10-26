import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { ArrowRight } from 'lucide-react';

interface TrainersSectionProps {
  onSelectTrainer: (trainerName: string) => void;
}

export const TrainersSection: React.FC<TrainersSectionProps> = ({ onSelectTrainer }) => {
  const { trainers, showTrainersSection } = useGymData();

  if (!showTrainersSection || trainers.length === 0) {
    return null;
  }

  const activeTrainers = trainers.filter((t) => t.isActive);

  return (
    <section id="coaches" className="py-24 sm:py-32 bg-[#121212] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-lime mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-lime" />
              <span>ELITE GUIDANCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              MEET YOUR COACHES.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-brand-gray max-w-sm">
            Certified coaching specialists dedicated to form, athletic conditioning, and injury prevention.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeTrainers.map((coach) => (
            <div
              key={coach.id}
              className="group relative flex flex-col justify-between bg-[#171717] rounded-2xl overflow-hidden border border-white/10 hover:border-brand-lime/40 transition-all duration-300 shadow-xl"
            >
              {/* Photo */}
              <div className="relative h-80 w-full overflow-hidden bg-black/50">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent" />

                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-lime">
                    {coach.role}
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-0.5">
                    {coach.name}
                  </h3>
                </div>
              </div>

              {/* Bio & Certifications */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-white/90 uppercase tracking-wide">
                    {coach.specialty}
                  </div>
                  <p className="text-xs text-brand-gray mt-2 leading-relaxed">
                    {coach.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {coach.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => onSelectTrainer(coach.name)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-brand-lime hover:text-black border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Train with {coach.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
