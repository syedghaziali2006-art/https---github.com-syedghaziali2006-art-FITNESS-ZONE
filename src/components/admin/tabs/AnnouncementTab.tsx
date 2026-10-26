import React, { useState } from 'react';
import { useGymData } from '../../../context/GymDataContext';
import {
  Save,
  Check,
  Eye,
  ArrowRight
} from 'lucide-react';

export const AnnouncementTab: React.FC = () => {
  const { announcement, updateAnnouncement } = useGymData();

  const [enabled, setEnabled] = useState(announcement.enabled);
  const [badge, setBadge] = useState(announcement.badge);
  const [message, setMessage] = useState(announcement.message);
  const [linkText, setLinkText] = useState(announcement.linkText || 'Claim Offer');
  const [linkUrl, setLinkUrl] = useState(announcement.linkUrl || '#membership-enquiry');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      enabled,
      badge: badge.trim(),
      message: message.trim(),
      linkText: linkText.trim(),
      linkUrl: linkUrl.trim()
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Top Announcement Banner
          </h1>
          <p className="text-sm text-brand-gray mt-1">
            Display urgent club notices, Ramadan/Holiday operating hours, or special membership promotions at the very top of the website.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-lg shadow-brand-lime/10"
        >
          {isSaved ? <Check className="w-4 h-4 text-black" /> : <Save className="w-4 h-4 text-black" />}
          <span>{isSaved ? 'Live Updated!' : 'Apply Banner'}</span>
        </button>
      </div>

      {/* Live Preview Box */}
      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-gray flex items-center space-x-1.5">
          <Eye className="w-4 h-4 text-brand-lime" />
          <span>Live Visual Preview</span>
        </span>

        {enabled ? (
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-brand-lime/20 via-brand-lime/10 to-brand-lime/20 border border-brand-lime/40 py-3 px-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-white">
              {badge && (
                <span className="px-2 py-0.5 rounded bg-brand-lime text-black font-extrabold uppercase text-[10px]">
                  {badge}
                </span>
              )}
              <span className="font-medium">{message || 'Your announcement message will show here.'}</span>
              {linkText && (
                <span className="inline-flex items-center text-brand-lime font-bold hover:underline cursor-pointer">
                  <span>{linkText}</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#111] border border-white/5 text-center text-xs text-white/40">
            Banner is currently disabled. Toggle the switch below to activate it on the live website.
          </div>
        )}
      </div>

      {/* Controls Card */}
      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Toggle Switch */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-tight">
              Enable Announcement Banner
            </h3>
            <p className="text-xs text-brand-gray mt-0.5">
              When turned on, this banner pins above the main navigation bar.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-lime peer-checked:after:bg-black"></div>
          </label>
        </div>

        {/* Input fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                Badge / Tag Text
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. SPECIAL OFFER, NOTICE, RAMADAN TIMINGS"
                className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white uppercase focus:outline-none focus:border-brand-lime"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                Action Button Text
              </label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="e.g. Claim Offer, View Hours"
                className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Announcement Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Join this month and receive 2 Complimentary 1-on-1 Personal Coaching Sessions with InBody Scan..."
              className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Destination URL or Page Section Anchor
            </label>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="e.g. #membership-enquiry or https://..."
              className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white font-mono text-xs focus:outline-none focus:border-brand-lime"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div className="pt-4 border-t border-white/5">
          <span className="text-xs text-brand-gray font-bold uppercase tracking-wider block mb-2">
            Quick Templates:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setEnabled(true);
                setBadge('SPECIAL PROMO');
                setMessage('Join this month & get 2 complimentary 1-on-1 Personal Training sessions + InBody scan!');
                setLinkText('Claim Offer');
                setLinkUrl('#membership-enquiry');
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/80 border border-white/5"
            >
              Promo Offer
            </button>
            <button
              type="button"
              onClick={() => {
                setEnabled(true);
                setBadge('TIMINGS UPDATE');
                setMessage('Special holiday timings in effect: Gym open daily from 6:00 AM until 12:00 AM midnight.');
                setLinkText('View Details');
                setLinkUrl('#location');
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/80 border border-white/5"
            >
              Holiday Timings
            </button>
            <button
              type="button"
              onClick={() => {
                setEnabled(true);
                setBadge('FREE TRIAL');
                setMessage('Complimentary 1-Day Trial passes available for UAE residents this weekend.');
                setLinkText('Book Pass');
                setLinkUrl('#membership-enquiry');
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/80 border border-white/5"
            >
              Free Trial Pass
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
