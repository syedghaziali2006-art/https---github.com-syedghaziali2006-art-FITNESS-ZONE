import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  BusinessInfo,
  TrainingCard,
  WhyUsBenefit,
  FAQItem,
  Inquiry,
  InquiryStatus,
  MembershipPlan,
  Trainer,
  Announcement,
  ActivityLog
} from '../types/gym';
import {
  CLUB_DATA,
  TRAINING_EXPERIENCES,
  WHY_US_BENEFITS,
  FAQ_ITEMS,
  DEFAULT_MEMBERSHIP_PLANS,
  DEFAULT_TRAINERS,
  DEFAULT_ANNOUNCEMENT,
  DEFAULT_INQUIRIES
} from '../data/clubData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface GymDataContextType {
  clubData: BusinessInfo;
  trainingExperiences: TrainingCard[];
  whyUsBenefits: WhyUsBenefit[];
  faqItems: FAQItem[];
  inquiries: Inquiry[];
  membershipPlans: MembershipPlan[];
  trainers: Trainer[];
  announcement: Announcement;
  showPlansSection: boolean;
  showTrainersSection: boolean;
  activityLogs: ActivityLog[];
  
  // Auth
  isAdminLoggedIn: boolean;
  adminUsername: string;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (newUser: string, newPass: string) => void;
  
  // Modifiers
  updateClubData: (updates: Partial<BusinessInfo>) => void;
  addTrainingExperience: (item: Omit<TrainingCard, 'id'>) => void;
  updateTrainingExperience: (id: string, updates: Partial<TrainingCard>) => void;
  deleteTrainingExperience: (id: string) => void;
  
  addWhyUsBenefit: (item: Omit<WhyUsBenefit, 'id'>) => void;
  updateWhyUsBenefit: (id: string, updates: Partial<WhyUsBenefit>) => void;
  deleteWhyUsBenefit: (id: string) => void;
  
  addFaqItem: (item: Omit<FAQItem, 'id'>) => void;
  updateFaqItem: (id: string, updates: Partial<FAQItem>) => void;
  deleteFaqItem: (id: string) => void;
  
  addInquiry: (inquiry: { fullName: string; phoneNumber: string; email?: string; message?: string; interestedIn: 'Membership' | 'Personal Training' | 'General Enquiry' }) => string;
  updateInquiryStatus: (id: string, status: InquiryStatus) => void;
  updateInquiryNotes: (id: string, notes: string) => void;
  deleteInquiry: (id: string) => void;
  clearAllInquiries: () => void;
  
  addMembershipPlan: (plan: Omit<MembershipPlan, 'id'>) => void;
  updateMembershipPlan: (id: string, updates: Partial<MembershipPlan>) => void;
  deleteMembershipPlan: (id: string) => void;
  togglePlansSection: () => void;
  
  addTrainer: (trainer: Omit<Trainer, 'id'>) => void;
  updateTrainer: (id: string, updates: Partial<Trainer>) => void;
  deleteTrainer: (id: string) => void;
  toggleTrainersSection: () => void;
  
  updateAnnouncement: (updates: Partial<Announcement>) => void;
  
  // Backup & Restore
  resetToDefaults: () => void;
  exportBackup: () => string;
  importBackup: (jsonString: string) => { success: boolean; message: string };
  
  // Toast
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const GymDataContext = createContext<GymDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CLUB_DATA: 'fz_club_data_v2',
  TRAININGS: 'fz_trainings_v2',
  BENEFITS: 'fz_benefits_v2',
  FAQS: 'fz_faqs_v2',
  INQUIRIES: 'fitness_zone_inquiries',
  PLANS: 'fz_membership_plans_v2',
  TRAINERS: 'fz_trainers_v2',
  ANNOUNCEMENT: 'fz_announcement_v2',
  SHOW_PLANS: 'fz_show_plans_v2',
  SHOW_TRAINERS: 'fz_show_trainers_v2',
  ADMIN_AUTH: 'fz_admin_auth_v2',
  ADMIN_CREDS: 'fz_admin_creds_v2',
  ACTIVITY_LOGS: 'fz_activity_logs_v2'
};

const safeJsonParse = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage`, e);
    return fallback;
  }
};

export const GymDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State initialization with localStorage fallback
  const [clubData, setClubData] = useState<BusinessInfo>(() =>
    safeJsonParse(STORAGE_KEYS.CLUB_DATA, CLUB_DATA)
  );

  const [trainingExperiences, setTrainingExperiences] = useState<TrainingCard[]>(() =>
    safeJsonParse(STORAGE_KEYS.TRAININGS, TRAINING_EXPERIENCES)
  );

  const [whyUsBenefits, setWhyUsBenefits] = useState<WhyUsBenefit[]>(() =>
    safeJsonParse(STORAGE_KEYS.BENEFITS, WHY_US_BENEFITS)
  );

  const [faqItems, setFaqItems] = useState<FAQItem[]>(() =>
    safeJsonParse(STORAGE_KEYS.FAQS, FAQ_ITEMS)
  );

  const [inquiries, setInquiries] = useState<Inquiry[]>(() =>
    safeJsonParse(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES)
  );

  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>(() =>
    safeJsonParse(STORAGE_KEYS.PLANS, DEFAULT_MEMBERSHIP_PLANS)
  );

  const [trainers, setTrainers] = useState<Trainer[]>(() =>
    safeJsonParse(STORAGE_KEYS.TRAINERS, DEFAULT_TRAINERS)
  );

  const [announcement, setAnnouncement] = useState<Announcement>(() =>
    safeJsonParse(STORAGE_KEYS.ANNOUNCEMENT, DEFAULT_ANNOUNCEMENT)
  );

  const [showPlansSection, setShowPlansSection] = useState<boolean>(() =>
    safeJsonParse(STORAGE_KEYS.SHOW_PLANS, true)
  );

  const [showTrainersSection, setShowTrainersSection] = useState<boolean>(() =>
    safeJsonParse(STORAGE_KEYS.SHOW_TRAINERS, true)
  );

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() =>
    safeJsonParse(STORAGE_KEYS.ADMIN_AUTH, false)
  );

  const [adminCreds, setAdminCreds] = useState<{ user: string; pass: string }>(() =>
    safeJsonParse(STORAGE_KEYS.ADMIN_CREDS, { user: 'admin', pass: 'admin123' })
  );

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() =>
    safeJsonParse(STORAGE_KEYS.ACTIVITY_LOGS, [
      {
        id: 'log-init',
        action: 'System Initialized',
        details: 'Admin panel connected with full live control.',
        timestamp: new Date().toISOString(),
        type: 'info'
      }
    ])
  );

  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLUB_DATA, JSON.stringify(clubData));
  }, [clubData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRAININGS, JSON.stringify(trainingExperiences));
  }, [trainingExperiences]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BENEFITS, JSON.stringify(whyUsBenefits));
  }, [whyUsBenefits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqItems));
  }, [faqItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(membershipPlans));
  }, [membershipPlans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRAINERS, JSON.stringify(trainers));
  }, [trainers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(announcement));
  }, [announcement]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHOW_PLANS, JSON.stringify(showPlansSection));
  }, [showPlansSection]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHOW_TRAINERS, JSON.stringify(showTrainersSection));
  }, [showTrainersSection]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, JSON.stringify(adminCreds));
  }, [adminCreds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logActivity = (action: string, details: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      action,
      details,
      timestamp: new Date().toISOString(),
      type
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]); // keep latest 50
  };

  // Auth Handlers
  const loginAdmin = (user: string, pass: string): boolean => {
    if (user.trim() === adminCreds.user && pass.trim() === adminCreds.pass) {
      setIsAdminLoggedIn(true);
      logActivity('Admin Login', `User "${user}" successfully logged in.`, 'success');
      showToast('Welcome back, Administrator!', 'success');
      return true;
    }
    showToast('Invalid username or password.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    logActivity('Admin Logout', 'Administrator logged out.', 'info');
    showToast('You have been logged out.', 'info');
  };

  const updateAdminCredentials = (newUser: string, newPass: string) => {
    setAdminCreds({ user: newUser.trim(), pass: newPass.trim() });
    logActivity('Security Updated', 'Admin credentials have been updated.', 'warning');
    showToast('Admin credentials updated successfully!', 'success');
  };

  // Club Info Modifiers
  const updateClubData = (updates: Partial<BusinessInfo>) => {
    setClubData((prev) => {
      const merged = { ...prev, ...updates };
      // Keep direct contact links synchronized if phone or whatsapp changes
      if (updates.phone || updates.rawPhone || updates.whatsappNumber) {
        const raw = updates.rawPhone || updates.phone?.replace(/[^0-9+]/g, '') || prev.rawPhone;
        const wa = updates.whatsappNumber || prev.whatsappNumber;
        merged.links = {
          ...merged.links,
          telDirect: `tel:${raw}`,
          whatsappDirect: `https://wa.me/${wa}?text=Hello%20Fitness%20Zone%20City%20Walk,%20I%20would%20like%20to%20enquire%20about%20membership%20options.`
        };
      }
      return merged;
    });
    logActivity('Club Details Updated', 'Gym business details were modified.', 'success');
    showToast('Club details updated in real time!', 'success');
  };

  // Training Experiences
  const addTrainingExperience = (item: Omit<TrainingCard, 'id'>) => {
    const id = `training-${Date.now()}`;
    setTrainingExperiences((prev) => [...prev, { ...item, id }]);
    logActivity('Program Added', `Created training program: ${item.title}`, 'success');
    showToast(`Program "${item.title}" added!`, 'success');
  };

  const updateTrainingExperience = (id: string, updates: Partial<TrainingCard>) => {
    setTrainingExperiences((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    logActivity('Program Updated', `Modified training program ID: ${id}`, 'info');
    showToast('Program updated!', 'success');
  };

  const deleteTrainingExperience = (id: string) => {
    setTrainingExperiences((prev) => prev.filter((c) => c.id !== id));
    logActivity('Program Deleted', `Deleted program ID: ${id}`, 'warning');
    showToast('Program removed.', 'info');
  };

  // Why Us Benefits
  const addWhyUsBenefit = (item: Omit<WhyUsBenefit, 'id'>) => {
    const id = `benefit-${Date.now()}`;
    setWhyUsBenefits((prev) => [...prev, { ...item, id }]);
    logActivity('Benefit Added', `Added benefit card: ${item.title}`, 'success');
    showToast('Benefit added!', 'success');
  };

  const updateWhyUsBenefit = (id: string, updates: Partial<WhyUsBenefit>) => {
    setWhyUsBenefits((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
    showToast('Benefit updated!', 'success');
  };

  const deleteWhyUsBenefit = (id: string) => {
    setWhyUsBenefits((prev) => prev.filter((b) => b.id !== id));
    showToast('Benefit deleted.', 'info');
  };

  // FAQs
  const addFaqItem = (item: Omit<FAQItem, 'id'>) => {
    const id = `faq-${Date.now()}`;
    setFaqItems((prev) => [...prev, { ...item, id }]);
    logActivity('FAQ Added', `Added FAQ: "${item.question.slice(0, 30)}..."`, 'success');
    showToast('FAQ question added!', 'success');
  };

  const updateFaqItem = (id: string, updates: Partial<FAQItem>) => {
    setFaqItems((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
    showToast('FAQ question updated!', 'success');
  };

  const deleteFaqItem = (id: string) => {
    setFaqItems((prev) => prev.filter((f) => f.id !== id));
    showToast('FAQ question deleted.', 'info');
  };

  // Inquiries / Leads (CRM)
  const addInquiry = (inquiry: {
    fullName: string;
    phoneNumber: string;
    email?: string;
    message?: string;
    interestedIn: 'Membership' | 'Personal Training' | 'General Enquiry';
  }): string => {
    const newId = `FZ-${Date.now().toString().slice(-6)}`;
    const newInquiry: Inquiry = {
      id: newId,
      ...inquiry,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    logActivity('New Lead Received', `Inquiry received from ${inquiry.fullName} (${inquiry.phoneNumber})`, 'success');
    return newId;
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, status, updatedAt: new Date().toISOString() } : inq
      )
    );
    logActivity('Lead Status Changed', `Inquiry ${id} status set to "${status.toUpperCase()}"`, 'info');
    showToast(`Lead marked as ${status.toUpperCase()}`, 'success');
  };

  const updateInquiryNotes = (id: string, notes: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, adminNotes: notes, updatedAt: new Date().toISOString() } : inq
      )
    );
    showToast('Admin note saved.', 'success');
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    logActivity('Lead Deleted', `Inquiry ${id} was deleted from database`, 'warning');
    showToast('Inquiry deleted.', 'info');
  };

  const clearAllInquiries = () => {
    setInquiries([]);
    logActivity('Leads Cleared', 'All inquiries were cleared by admin.', 'warning');
    showToast('All inquiries cleared.', 'info');
  };

  // Membership Plans
  const addMembershipPlan = (plan: Omit<MembershipPlan, 'id'>) => {
    const id = `plan-${Date.now()}`;
    setMembershipPlans((prev) => [...prev, { ...plan, id }]);
    logActivity('Plan Created', `Added membership package: ${plan.name}`, 'success');
    showToast(`Plan "${plan.name}" created!`, 'success');
  };

  const updateMembershipPlan = (id: string, updates: Partial<MembershipPlan>) => {
    setMembershipPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Membership plan updated!', 'success');
  };

  const deleteMembershipPlan = (id: string) => {
    setMembershipPlans((prev) => prev.filter((p) => p.id !== id));
    showToast('Membership plan deleted.', 'info');
  };

  const togglePlansSection = () => {
    setShowPlansSection((prev) => !prev);
    showToast(`Pricing Section ${!showPlansSection ? 'Enabled' : 'Disabled'} on site`, 'info');
  };

  // Trainers
  const addTrainer = (trainer: Omit<Trainer, 'id'>) => {
    const id = `trainer-${Date.now()}`;
    setTrainers((prev) => [...prev, { ...trainer, id }]);
    logActivity('Trainer Added', `Added coach: ${trainer.name}`, 'success');
    showToast(`Coach "${trainer.name}" added!`, 'success');
  };

  const updateTrainer = (id: string, updates: Partial<Trainer>) => {
    setTrainers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    showToast('Trainer profile updated!', 'success');
  };

  const deleteTrainer = (id: string) => {
    setTrainers((prev) => prev.filter((t) => t.id !== id));
    showToast('Trainer removed.', 'info');
  };

  const toggleTrainersSection = () => {
    setShowTrainersSection((prev) => !prev);
    showToast(`Coaches Section ${!showTrainersSection ? 'Enabled' : 'Disabled'} on site`, 'info');
  };

  // Announcement
  const updateAnnouncement = (updates: Partial<Announcement>) => {
    setAnnouncement((prev) => ({ ...prev, ...updates }));
    showToast('Top Announcement Banner updated!', 'success');
  };

  // Backup & Reset
  const resetToDefaults = () => {
    setClubData(CLUB_DATA);
    setTrainingExperiences(TRAINING_EXPERIENCES);
    setWhyUsBenefits(WHY_US_BENEFITS);
    setFaqItems(FAQ_ITEMS);
    setInquiries(DEFAULT_INQUIRIES);
    setMembershipPlans(DEFAULT_MEMBERSHIP_PLANS);
    setTrainers(DEFAULT_TRAINERS);
    setAnnouncement(DEFAULT_ANNOUNCEMENT);
    setShowPlansSection(true);
    setShowTrainersSection(true);
    logActivity('System Reset', 'All data restored to factory defaults.', 'warning');
    showToast('Reset all data to default configuration!', 'info');
  };

  const exportBackup = (): string => {
    const dump = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      clubData,
      trainingExperiences,
      whyUsBenefits,
      faqItems,
      inquiries,
      membershipPlans,
      trainers,
      announcement,
      showPlansSection,
      showTrainersSection
    };
    return JSON.stringify(dump, null, 2);
  };

  const importBackup = (jsonString: string): { success: boolean; message: string } => {
    try {
      const data = JSON.parse(jsonString);
      if (!data.clubData || !data.trainingExperiences) {
        return { success: false, message: 'Invalid backup file format: missing required core tables.' };
      }
      if (data.clubData) setClubData(data.clubData);
      if (data.trainingExperiences) setTrainingExperiences(data.trainingExperiences);
      if (data.whyUsBenefits) setWhyUsBenefits(data.whyUsBenefits);
      if (data.faqItems) setFaqItems(data.faqItems);
      if (data.inquiries) setInquiries(data.inquiries);
      if (data.membershipPlans) setMembershipPlans(data.membershipPlans);
      if (data.trainers) setTrainers(data.trainers);
      if (data.announcement) setAnnouncement(data.announcement);
      if (data.showPlansSection !== undefined) setShowPlansSection(data.showPlansSection);
      if (data.showTrainersSection !== undefined) setShowTrainersSection(data.showTrainersSection);

      logActivity('Data Restored', 'Complete site configuration imported from backup.', 'success');
      showToast('Backup successfully imported and applied!', 'success');
      return { success: true, message: 'Website data restored successfully.' };
    } catch (err: any) {
      return { success: false, message: `Parse error: ${err.message || 'Corrupted JSON'}` };
    }
  };

  return (
    <GymDataContext.Provider
      value={{
        clubData,
        trainingExperiences,
        whyUsBenefits,
        faqItems,
        inquiries,
        membershipPlans,
        trainers,
        announcement,
        showPlansSection,
        showTrainersSection,
        activityLogs,
        isAdminLoggedIn,
        adminUsername: adminCreds.user,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,
        updateClubData,
        addTrainingExperience,
        updateTrainingExperience,
        deleteTrainingExperience,
        addWhyUsBenefit,
        updateWhyUsBenefit,
        deleteWhyUsBenefit,
        addFaqItem,
        updateFaqItem,
        deleteFaqItem,
        addInquiry,
        updateInquiryStatus,
        updateInquiryNotes,
        deleteInquiry,
        clearAllInquiries,
        addMembershipPlan,
        updateMembershipPlan,
        deleteMembershipPlan,
        togglePlansSection,
        addTrainer,
        updateTrainer,
        deleteTrainer,
        toggleTrainersSection,
        updateAnnouncement,
        resetToDefaults,
        exportBackup,
        importBackup,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </GymDataContext.Provider>
  );
};

export const useGymData = (): GymDataContextType => {
  const context = useContext(GymDataContext);
  if (!context) {
    throw new Error('useGymData must be used within a GymDataProvider');
  }
  return context;
};
