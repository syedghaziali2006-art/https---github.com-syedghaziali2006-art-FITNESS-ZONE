import React from 'react';
import { useGymData } from '../../../context/GymDataContext';
import {
  Users,
  Dumbbell,
  CreditCard,
  MessageSquare,
  TrendingUp,
  Clock,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Star,
  MapPin,
  Sparkles
} from 'lucide-react';

interface DashboardTabProps {
  onNavigateTab: (tabId: string) => void;
  onOpenAddLeadModal: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  onNavigateTab,
  onOpenAddLeadModal,
}) => {
  const {
    clubData,
    inquiries,
    trainingExperiences,
    membershipPlans,
    announcement,
    activityLogs,
    updateInquiryStatus
  } = useGymData();

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;
  const contactedCount = inquiries.filter((i) => i.status === 'contacted').length;
  const convertedCount = inquiries.filter((i) => i.status === 'converted').length;
  const conversionRate = inquiries.length > 0 
    ? Math.round((convertedCount / inquiries.length) * 100) 
    : 0;

  const recentInquiries = inquiries.slice(0, 5);

  const getWhatsAppLink = (inquiry: typeof inquiries[0]) => {
    const text = encodeURIComponent(
      `Hello ${inquiry.fullName}, this is Fitness Zone City Walk Dubai! We received your enquiry regarding ${inquiry.interestedIn}. How can we assist you today?`
    );
    const cleanNumber = inquiry.phoneNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#181818] via-[#141414] to-[#1a1a1a] border border-white/10 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Control Master Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              {clubData.name}
            </h1>
            <p className="text-sm text-brand-gray mt-1 max-w-xl">
              Control website content, update membership plans, manage incoming leads CRM, and adjust timings in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddLeadModal}
              className="px-4 py-2.5 bg-brand-lime text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-brand-lime-hover transition-colors shadow-lg shadow-brand-lime/10 flex items-center space-x-2"
            >
              <span>+ Add Walk-In Lead</span>
            </button>
            <button
              onClick={() => onNavigateTab('profile')}
              className="px-4 py-2.5 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors"
            >
              Edit Club Info
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Inquiries */}
        <div className="bg-[#161616] border border-white/10 rounded-2xl p-5 hover:border-brand-lime/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gray">
              Total Inquiries
            </span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-white">{inquiries.length}</span>
            {newInquiriesCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-lime/20 text-brand-lime border border-brand-lime/30">
                {newInquiriesCount} New
              </span>
            )}
          </div>
          <p className="text-xs text-brand-muted mt-2">
            {contactedCount} contacted · {convertedCount} converted
          </p>
        </div>

        {/* Conversion Rate */}
        <div className="bg-[#161616] border border-white/10 rounded-2xl p-5 hover:border-brand-lime/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gray">
              Lead Conversion
            </span>
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-white">{conversionRate}%</span>
            <span className="text-xs text-brand-gray">closed</span>
          </div>
          <p className="text-xs text-brand-muted mt-2">
            {convertedCount} active members gained
          </p>
        </div>

        {/* Training Programs */}
        <div className="bg-[#161616] border border-white/10 rounded-2xl p-5 hover:border-brand-lime/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gray">
              Live Programs
            </span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Dumbbell className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-white">{trainingExperiences.length}</span>
            <span className="text-xs text-brand-gray">experiences</span>
          </div>
          <p className="text-xs text-brand-muted mt-2">
            Displayed on public homepage
          </p>
        </div>

        {/* Membership Plans */}
        <div className="bg-[#161616] border border-white/10 rounded-2xl p-5 hover:border-brand-lime/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gray">
              Pricing Packages
            </span>
            <div className="p-2.5 rounded-xl bg-brand-lime/10 text-brand-lime border border-brand-lime/20">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-white">{membershipPlans.length}</span>
            <span className="text-xs text-brand-gray">plans</span>
          </div>
          <p className="text-xs text-brand-muted mt-2">
            Interactive membership cards
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Inquiries + Club Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Inquiries Feed */}
        <div className="lg:col-span-8 bg-[#161616] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-5">
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center space-x-2">
                <span>Recent Leads & Enquiries</span>
                {newInquiriesCount > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-lime text-black">
                    {newInquiriesCount} Action Needed
                  </span>
                )}
              </h2>
              <p className="text-xs text-brand-gray mt-0.5">
                Incoming prospective member inquiries from the website form
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs font-bold text-brand-lime hover:underline flex items-center space-x-1 uppercase tracking-wider"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="text-center py-12 text-brand-gray">
              <MessageSquare className="w-10 h-10 mx-auto text-white/20 mb-3" />
              <p className="text-sm">No inquiries yet. Submissions from the website will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="p-4 rounded-xl bg-[#1b1b1b] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-bold text-sm text-white">{inquiry.fullName}</span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                          inquiry.status === 'new'
                            ? 'bg-brand-lime/20 text-brand-lime border-brand-lime/40'
                            : inquiry.status === 'contacted'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            : inquiry.status === 'converted'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-white/10 text-white/60 border-white/10'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    <div className="text-xs text-brand-gray flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-white/80 font-mono">{inquiry.phoneNumber}</span>
                      <span>·</span>
                      <span className="text-brand-lime">{inquiry.interestedIn}</span>
                      <span>·</span>
                      <span className="text-white/40">
                        {new Date(inquiry.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {inquiry.message && (
                      <p className="text-xs text-white/60 italic line-clamp-1 mt-1">
                        "{inquiry.message}"
                      </p>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <a
                      href={getWhatsAppLink(inquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center space-x-1.5 transition-colors"
                      title="Quick WhatsApp message"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${inquiry.phoneNumber}`}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 flex items-center space-x-1.5 transition-colors"
                      title="Direct phone call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>

                    <select
                      value={inquiry.status}
                      onChange={(e) =>
                        updateInquiryStatus(inquiry.id, e.target.value as any)
                      }
                      className="bg-black/50 text-white text-xs font-semibold px-2 py-1.5 rounded-lg border border-white/15 focus:outline-none focus:border-brand-lime"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Gym Status Snapshot & Quick Navigation */}
        <div className="lg:col-span-4 space-y-6">
          {/* Gym Info Card */}
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
              Live Business Snapshot
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-brand-gray block">Club Name</span>
                <span className="text-sm font-bold text-white block mt-0.5">{clubData.name}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div>
                  <span className="text-xs text-brand-gray block">Google Rating</span>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <Star className="w-4 h-4 fill-brand-lime text-brand-lime" />
                    <span className="text-sm font-bold text-white">{clubData.rating}/5.0</span>
                    <span className="text-xs text-brand-gray font-normal">({clubData.reviewCount})</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-brand-gray block">Contact Line</span>
                  <span className="text-sm font-bold text-brand-lime font-mono block mt-0.5">
                    {clubData.phone}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-xs text-brand-gray block">Address</span>
                <div className="flex items-start space-x-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-lime flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-white/80 leading-relaxed">
                    {clubData.address.full}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-xs text-brand-gray block">Reported Timings</span>
                <span className="text-xs font-medium text-emerald-400 block mt-0.5">
                  {clubData.reportedHours}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('profile')}
              className="w-full mt-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Update Business Profile
            </button>
          </div>

          {/* Announcement Banner Status */}
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
                <span>Top Announcement Bar</span>
              </h3>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  announcement.enabled
                    ? 'bg-brand-lime/20 text-brand-lime border border-brand-lime/30'
                    : 'bg-white/10 text-white/40'
                }`}
              >
                {announcement.enabled ? 'ACTIVE ON SITE' : 'DISABLED'}
              </span>
            </div>

            <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
              {announcement.message}
            </p>

            <button
              onClick={() => onNavigateTab('announcement')}
              className="mt-4 text-xs font-bold text-brand-lime hover:underline uppercase tracking-wider block"
            >
              Configure Banner →
            </button>
          </div>

          {/* Recent Activity Log */}
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-white/50" />
              <span>Recent Activity</span>
            </h3>

            <div className="space-y-3">
              {activityLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="text-xs border-l-2 border-brand-lime/40 pl-3 py-0.5">
                  <div className="font-bold text-white">{log.action}</div>
                  <div className="text-white/60 text-[11px] mt-0.5">{log.details}</div>
                  <div className="text-[10px] text-white/30 font-mono mt-0.5">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
