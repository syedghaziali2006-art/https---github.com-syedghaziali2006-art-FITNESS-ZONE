import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { Star, ExternalLink, CheckCircle2 } from 'lucide-react';

export const GoogleRating: React.FC = () => {
  const { clubData } = useGymData();

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#101010] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card Container */}
        <div className="rounded-2xl bg-gradient-to-br from-[#161616] to-[#121212] border border-white/10 p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-lime/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & Ratings Overview */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-lime mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-lime" />
                <span>COMMUNITY SATISFACTION</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-4">
                THE EXPERIENCE SPEAKS.
              </h2>

              <p className="text-base sm:text-lg text-brand-gray leading-relaxed mb-8 max-w-xl">
                Rated by athletes, residents, and visitors who choose {clubData.name} for their daily conditioning and strength routine.
              </p>

              {/* Big Metrics Display */}
              <div className="flex flex-wrap items-baseline gap-6 sm:gap-10 pb-8 border-b border-white/10">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">
                      {clubData.rating}
                    </span>
                    <span className="text-2xl text-brand-gray font-mono">/ 5.0</span>
                  </div>
                  {/* Star row */}
                  <div className="flex items-center space-x-1 mt-2 text-brand-lime" aria-label={`${clubData.rating} out of 5 stars`}>
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-brand-lime text-brand-lime" />
                    ))}
                    {/* Partial 5th star */}
                    <div className="relative">
                      <Star className="w-5 h-5 text-brand-lime/30" />
                      <div className="absolute inset-0 overflow-hidden w-[60%]">
                        <Star className="w-5 h-5 fill-brand-lime text-brand-lime" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l border-white/10 pl-6 sm:pl-10">
                  <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">
                    {clubData.reviewCount}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-brand-lime font-bold mt-2">
                    Google Reviews
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-4">
                <a
                  href={clubData.links.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-brand-lime transition-all duration-200 active:scale-[0.98] shadow-lg"
                >
                  <span>READ GOOGLE REVIEWS</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={clubData.links.googleMapsSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded border border-white/20 hover:border-white text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>VIEW GOOGLE MAPS LISTING</span>
                </a>
              </div>
            </div>

            {/* Right Column: Authenticity & Trust Card */}
            <div className="lg:col-span-5 bg-[#181818] rounded-xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-8 h-8 rounded-full bg-brand-lime/10 flex items-center justify-center text-brand-lime">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Verified Google Listing
                  </h3>
                  <p className="text-[11px] text-brand-gray">
                    {clubData.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-brand-gray leading-relaxed">
                <p>
                  We prioritize transparency. Review statistics represent authentic user ratings published on Google Maps for {clubData.name}.
                </p>
                <div className="p-3 bg-black/40 rounded border border-white/5 space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-brand-gray">Business Category:</span>
                    <span className="text-white font-medium">{clubData.category}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-brand-gray">Location:</span>
                    <span className="text-white font-medium">{clubData.locationArea}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-brand-gray">Direct Plus Code:</span>
                    <span className="text-brand-lime font-mono">{clubData.plusCode}</span>
                  </div>
                </div>
                <p className="text-[11px] text-brand-gray/60 italic">
                  *Rating data accurate as reported on the verified Google Maps listing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
