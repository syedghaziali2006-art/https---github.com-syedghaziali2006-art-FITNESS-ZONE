import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import type { FAQItem } from '../types/gym';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { faqItems, clubData } = useGymData();
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#141414] border-b border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-lime mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-lime" />
            <span>CLARITY & DETAILS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-4">
            FREQUENTLY ASKED QUESTIONS.
          </h2>
          <p className="text-base text-brand-gray">
            Direct, verified answers regarding {clubData.name}.
          </p>
        </div>

        {/* Minimalist Accordion */}
        <div className="space-y-4">
          {faqItems.map((item: FAQItem) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#1a1a1a] border-brand-lime/40'
                    : 'bg-[#161616] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between space-x-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
                >
                  <span className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-brand-lime text-black border-transparent' : 'text-brand-gray'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm text-brand-gray leading-relaxed border-t border-white/5 pt-4 animate-fadeIn"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-12 text-center text-xs text-brand-gray/80">
          Have an additional question? Call us directly at{' '}
          <a href={clubData.links.telDirect} className="text-brand-lime hover:underline font-mono">
            {clubData.phone}
          </a>
          .
        </div>
      </div>
    </section>
  );
};
