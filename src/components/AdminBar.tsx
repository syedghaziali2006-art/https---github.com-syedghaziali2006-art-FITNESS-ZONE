import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { Settings, LogOut, Key } from 'lucide-react';

interface AdminBarProps {
  onOpenAdmin: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({ onOpenAdmin }) => {
  const { isAdminLoggedIn, logoutAdmin } = useGymData();

  if (!isAdminLoggedIn) {
    return (
      <button
        onClick={onOpenAdmin}
        className="fixed bottom-20 left-4 z-40 bg-black/80 hover:bg-black text-brand-lime border border-brand-lime/30 hover:border-brand-lime p-2.5 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 group flex items-center space-x-2"
        title="Admin Login Portal (Ctrl+Shift+A)"
        aria-label="Open Admin Login"
      >
        <Key className="w-4 h-4 text-brand-lime" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold uppercase tracking-wider text-white pr-1">
          Admin Portal
        </span>
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] bg-[#111111]/95 backdrop-blur-md border-b border-brand-lime/40 px-4 py-1.5 flex items-center justify-between text-xs text-white shadow-2xl">
      <div className="flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
        <span className="font-bold uppercase tracking-wider text-[11px] text-brand-lime">
          Admin Session Active
        </span>
        <span className="hidden sm:inline text-white/40">·</span>
        <span className="hidden sm:inline text-white/70 text-[11px]">
          Full site control enabled
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenAdmin}
          className="px-3 py-1 rounded-lg bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-sm"
        >
          <Settings className="w-3.5 h-3.5 text-black" />
          <span>Open Admin Dashboard</span>
        </button>

        <button
          onClick={logoutAdmin}
          className="text-white/60 hover:text-red-400 text-xs font-semibold flex items-center space-x-1 transition-colors"
          title="Sign out of Admin"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};
