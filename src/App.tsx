import React, { useState, useEffect } from 'react';
import { GymDataProvider } from './context/GymDataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutClub } from './components/AboutClub';
import { TrainingExperience } from './components/TrainingExperience';
import { FeatureShowcase } from './components/FeatureShowcase';
import { MembershipPlans } from './components/MembershipPlans';
import { TrainersSection } from './components/TrainersSection';
import { WhyFitnessZone } from './components/WhyFitnessZone';
import { GoogleRating } from './components/GoogleRating';
import { MembershipEnquiry } from './components/MembershipEnquiry';
import { LocationContact } from './components/LocationContact';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { AdminBar } from './components/AdminBar';
import { AdminPortal } from './components/admin/AdminPortal';
import { ToastContainer } from './components/admin/ToastContainer';

const GymAppContent: React.FC = () => {
  const [selectedInterest, setSelectedInterest] = useState<'Membership' | 'Personal Training' | 'General Enquiry'>('Membership');
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  // Check URL hash for direct #admin route
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setIsAdminPortalOpen(true);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminPortalOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global keyboard shortcut to open Admin Suite (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminPortalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToEnquiry = () => {
    const el = document.getElementById('membership-enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExperience = () => {
    const el = document.getElementById('experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectExperience = (title: string) => {
    if (title.toLowerCase().includes('personal')) {
      setSelectedInterest('Personal Training');
    } else {
      setSelectedInterest('Membership');
    }
    scrollToEnquiry();
  };

  const handleSelectPlan = (_planName: string) => {
    setSelectedInterest('Membership');
    scrollToEnquiry();
  };

  const handleSelectTrainer = (_trainerName: string) => {
    setSelectedInterest('Personal Training');
    scrollToEnquiry();
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white flex flex-col selection:bg-brand-lime selection:text-black">
      {/* Toast Alerts System */}
      <ToastContainer />

      {/* Top Floating Admin Status Bar / Trigger */}
      <AdminBar onOpenAdmin={() => setIsAdminPortalOpen(true)} />

      {/* Skip to Main Content Link for Keyboard Accessibility (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-brand-lime text-black font-bold text-xs uppercase tracking-wider rounded shadow-xl"
      >
        Skip to main content
      </a>

      {/* Navigation Bar */}
      <Navbar
        onEnquireClick={scrollToEnquiry}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onEnquireClick={scrollToEnquiry}
          onExploreClick={scrollToExperience}
        />

        {/* 2. The Club / Brand Introduction */}
        <AboutClub />

        {/* 3. Training Experience */}
        <TrainingExperience onSelectExperience={handleSelectExperience} />

        {/* 4. Cinematic Visual Feature Section */}
        <FeatureShowcase onEnquireClick={scrollToEnquiry} />

        {/* 5. Membership Packages & Pricing (Controlled via Admin) */}
        <MembershipPlans onSelectPlan={handleSelectPlan} />

        {/* 6. Elite Coaches & Personal Trainers (Controlled via Admin) */}
        <TrainersSection onSelectTrainer={handleSelectTrainer} />

        {/* 7. Why Fitness Zone */}
        <WhyFitnessZone />

        {/* 8. Social Proof & Google Reviews */}
        <GoogleRating />

        {/* 9. Membership Conversion & Lead Capture Section */}
        <MembershipEnquiry
          selectedInterest={selectedInterest}
          onInterestChange={setSelectedInterest}
        />

        {/* 10. Location & Contact */}
        <LocationContact />

        {/* 11. FAQ Section */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminPortalOpen(true)} />

      {/* Mobile Sticky Action Bar */}
      <MobileQuickBar onEnquireClick={scrollToEnquiry} />

      {/* Full Control Admin Portal */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => {
          setIsAdminPortalOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, '', window.location.pathname);
          }
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GymDataProvider>
      <GymAppContent />
    </GymDataProvider>
  );
};

export default App;
