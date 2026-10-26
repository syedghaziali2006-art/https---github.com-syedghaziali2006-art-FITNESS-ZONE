import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { Check, ArrowRight } from 'lucide-react';

interface MembershipPlansProps {
  onSelectPlan: (planName: string) => void;
}

export const MembershipPlans: React.FC<MembershipPlansProps> = ({ onSelectPlan }) => {
  const { membershipPlans, showPlansSection } = useGymData();

  if (!showPlansSection || membershipPlans.length === 0) {
    return null;
  }

  const activePlans = membershipPlans.filter((p) => p.isActive);

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#101010] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-lime mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-lime" />
              <span>TRANSPARENT VALUE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              MEMBERSHIP PACKAGES.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-brand-gray max-w-sm">
            Flexible monthly passes or transformative annual tiers tailored for discipline and steady progression.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activePlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 shadow-xl ${
                plan.isPopular
                  ? 'bg-[#181818] border-2 border-brand-lime shadow-brand-lime/10 transform lg:-translate-y-2'
                  : 'bg-[#151515] border border-white/10 hover:border-brand-lime/40'
              }`}
            >
              {/* Highlight Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full bg-brand-lime text-black font-black text-[10px] uppercase tracking-wider shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="pb-6 border-b border-white/10">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-brand-gray mt-1">{plan.subtitle}</p>

                  <div className="mt-5 flex items-baseline space-x-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-brand-gray font-medium">{plan.period}</span>
                  </div>
                </div>

                <p className="text-xs text-brand-gray mt-5 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features Checklist */}
                <div className="mt-6 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                    What's Included:
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-white/80">
                      <Check className="w-4 h-4 text-brand-lime flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-8 mt-6">
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                    plan.isPopular
                      ? 'bg-brand-lime hover:bg-brand-lime-hover text-black shadow-lg shadow-brand-lime/20'
                      : 'bg-white/10 hover:bg-brand-lime hover:text-black text-white border border-white/10'
                  }`}
                >
                  <span>{plan.ctaText || 'Enquire for Plan'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
