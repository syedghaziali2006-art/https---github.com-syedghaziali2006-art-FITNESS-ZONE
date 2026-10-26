import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { MapPin, Phone, Clock, Navigation, ExternalLink, MessageSquare } from 'lucide-react';

export const LocationContact: React.FC = () => {
  const { clubData } = useGymData();

  return (
    <section id="location" className="py-24 sm:py-32 bg-[#101010] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-lime mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-lime" />
            <span>ACCESSIBILITY & LOCATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-4">
            FIND YOUR ZONE.
          </h2>
          <p className="text-base sm:text-lg text-brand-gray">
            Conveniently situated within the City Walk precinct in {clubData.address.district}, {clubData.address.city}.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#161616] rounded-2xl border border-white/10 p-6 sm:p-10 shadow-xl">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-brand-lime">
                  DUBAI FLAGSHIP LOCATION
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-1">
                  {clubData.name}
                </h3>
              </div>

              {/* Physical Address */}
              <div className="flex items-start space-x-3.5 pt-2">
                <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-brand-lime flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-brand-gray font-semibold mb-1">
                    Address
                  </div>
                  <p className="text-sm text-white font-medium leading-relaxed">
                    {clubData.address.line1}, {clubData.address.landmark}
                  </p>
                  <p className="text-sm text-brand-gray">
                    {clubData.address.district}, {clubData.address.city}, {clubData.address.country}
                  </p>
                  <div className="mt-2 inline-flex items-center text-xs font-mono text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded border border-brand-lime/20">
                    Plus Code: {clubData.plusCode}
                  </div>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start space-x-3.5 pt-2">
                <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-brand-lime flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-brand-gray font-semibold mb-1">
                    Direct Phone Line
                  </div>
                  <a
                    href={clubData.links.telDirect}
                    className="text-base font-bold text-white hover:text-brand-lime font-mono transition-colors"
                  >
                    {clubData.phone}
                  </a>
                  <p className="text-xs text-brand-gray mt-0.5">
                    Click to call directly from mobile or desktop
                  </p>
                </div>
              </div>

              {/* Reported Opening Hours */}
              <div className="flex items-start space-x-3.5 pt-2">
                <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-brand-lime flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-brand-gray font-semibold mb-1">
                    Operating Schedule
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {clubData.reportedHours}
                  </div>
                  <p className="text-xs text-brand-gray/80 mt-1 leading-relaxed">
                    {clubData.hoursNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 mt-8 border-t border-white/10 space-y-3">
              <a
                href={clubData.links.googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded bg-brand-lime hover:bg-brand-lime-hover text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-[0.98]"
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={clubData.links.telDirect}
                  className="py-3 px-4 rounded border border-white/20 hover:border-white text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-lime" />
                  <span>CALL THE CLUB</span>
                </a>

                <a
                  href={clubData.links.whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded border border-white/20 hover:border-brand-lime hover:text-brand-lime text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Column */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-[#161616] min-h-[380px] lg:min-h-[500px] relative group">
            {/* Embedded Google Map iframe with lazy loading & sandbox */}
            <iframe
              title="Fitness Zone City Walk Dubai Location Map"
              src="https://maps.google.com/maps?q=Fitness%20Zone%20City%20Walk%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[400px] flex-1 border-0 filter grayscale invert contrast-125 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Map Overlay Badge */}
            <div className="absolute top-4 left-4 p-3 rounded-lg glass-panel max-w-xs shadow-xl hidden sm:block pointer-events-none">
              <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-lime animate-ping" />
                <span>{clubData.address.line1}</span>
              </div>
              <p className="text-[11px] text-brand-gray mt-1">
                {clubData.address.landmark}, {clubData.address.district}
              </p>
            </div>

            {/* Direct Open in Google Maps Link */}
            <div className="p-4 bg-[#141414] border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-brand-gray">
                Looking for parking or transit routes?
              </span>
              <a
                href={clubData.links.googleMapsSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-lime hover:underline inline-flex items-center space-x-1 font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
