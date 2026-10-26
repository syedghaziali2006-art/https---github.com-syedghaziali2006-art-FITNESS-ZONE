import React, { useState, useEffect } from 'react';
import { useGymData } from '../../context/GymDataContext';
import { AdminLoginModal } from './AdminLoginModal';
import { AddLeadModal } from './AddLeadModal';
import { ToastContainer } from './ToastContainer';

// Tabs
import { DashboardTab } from './tabs/DashboardTab';
import { InquiriesTab } from './tabs/InquiriesTab';
import { ClubProfileTab } from './tabs/ClubProfileTab';
import { TrainingProgramsTab } from './tabs/TrainingProgramsTab';
import { MembershipPlansTab } from './tabs/MembershipPlansTab';
import { TrainersTab } from './tabs/TrainersTab';
import { BenefitsTab } from './tabs/BenefitsTab';
import { FaqManagerTab } from './tabs/FaqManagerTab';
import { AnnouncementTab } from './tabs/AnnouncementTab';
import { BackupSettingsTab } from './tabs/BackupSettingsTab';

import {
  LayoutDashboard,
  Users,
  Building2,
  Dumbbell,
  CreditCard,
  UserCheck,
  Sparkles,
  HelpCircle,
  Bell,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabKey =
  | 'dashboard'
  | 'inquiries'
  | 'profile'
  | 'programs'
  | 'plans'
  | 'trainers'
  | 'benefits'
  | 'faqs'
  | 'announcement'
  | 'backup';

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const {
    isAdminLoggedIn,
    adminUsername,
    logoutAdmin,
    inquiries,
    clubData,
    announcement
  } = useGymData();

  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isAddLeadModalOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isAddLeadModalOpen, onClose]);

  if (!isOpen) return null;

  // If not logged in, prompt login modal
  if (!isAdminLoggedIn) {
    return (
      <AdminLoginModal
        isOpen={isOpen}
        onClose={onClose}
        onLoginSuccess={() => setActiveTab('dashboard')}
      />
    );
  }

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  const navItems: { id: TabKey; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'inquiries',
      label: 'Leads & CRM',
      icon: <Users className="w-4 h-4" />,
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined
    },
    { id: 'profile', label: 'Club Profile', icon: <Building2 className="w-4 h-4" /> },
    { id: 'programs', label: 'Training Programs', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'plans', label: 'Membership Plans', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'trainers', label: 'Coaches Roster', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'benefits', label: 'Why Us (Benefits)', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'faqs', label: 'FAQ Manager', icon: <HelpCircle className="w-4 h-4" /> },
    {
      id: 'announcement',
      label: 'Top Announcement',
      icon: <Bell className="w-4 h-4" />,
      badge: announcement.enabled ? 'Live' : undefined
    },
    { id: 'backup', label: 'Backup & Security', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[900] bg-[#0c0c0c] text-white flex flex-col md:flex-row overflow-hidden animate-fade-in font-sans">
      <ToastContainer />

      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
      />

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#141414] border-b border-white/10 z-20">
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setMobileSidebarOpen((prev) => !prev)}
            className="p-2 rounded-lg bg-white/5 text-white"
            aria-label="Toggle Navigation"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-lime">ADMIN PANEL</span>
            <span className="block text-[10px] text-brand-gray truncate max-w-[180px]">{clubData.name}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg bg-brand-lime text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-1"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-72 bg-[#121212] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Portal Branding */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-black uppercase tracking-wider text-white">
                  FITNESS ZONE
                </span>
                <span className="px-2 py-0.5 rounded bg-brand-lime/20 text-brand-lime text-[10px] font-black uppercase border border-brand-lime/30">
                  ADMIN
                </span>
              </div>
              <span className="block text-[11px] font-semibold text-brand-gray mt-0.5">
                City Walk Dubai Control
              </span>
            </div>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-brand-lime text-black shadow-lg shadow-brand-lime/20'
                      : 'text-brand-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={isActive ? 'text-black' : 'text-brand-gray'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                        isActive
                          ? 'bg-black text-brand-lime'
                          : 'bg-brand-lime text-black'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with User Info & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#0e0e0e]">
          <div className="flex items-center justify-between px-2 py-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
              <span className="text-white/60 font-mono text-[11px]">{adminUsername}</span>
            </div>
            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="text-white/40 hover:text-red-400 text-[11px] flex items-center space-x-1 transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
          >
            <span>← Return to Website</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Desktop Top Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#121212] border-b border-white/10 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gray">
              Admin Suite
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              {navItems.find((n) => n.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-brand-lime/10 hover:bg-brand-lime/20 border border-brand-lime/30 text-brand-lime text-xs font-bold uppercase tracking-wider transition-colors"
            >
              + Quick Walk-In
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-lg shadow-brand-lime/10"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Tab View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardTab
                onNavigateTab={(tab) => handleTabChange(tab as TabKey)}
                onOpenAddLeadModal={() => setIsAddLeadModalOpen(true)}
              />
            )}

            {activeTab === 'inquiries' && (
              <InquiriesTab onOpenAddLeadModal={() => setIsAddLeadModalOpen(true)} />
            )}

            {activeTab === 'profile' && <ClubProfileTab />}

            {activeTab === 'programs' && <TrainingProgramsTab />}

            {activeTab === 'plans' && <MembershipPlansTab />}

            {activeTab === 'trainers' && <TrainersTab />}

            {activeTab === 'benefits' && <BenefitsTab />}

            {activeTab === 'faqs' && <FaqManagerTab />}

            {activeTab === 'announcement' && <AnnouncementTab />}

            {activeTab === 'backup' && <BackupSettingsTab />}
          </div>
        </main>
      </div>
    </div>
  );
};
