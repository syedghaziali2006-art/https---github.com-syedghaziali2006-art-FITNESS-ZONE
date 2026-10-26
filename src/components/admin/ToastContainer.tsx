import React from 'react';
import { useGymData } from '../../context/GymDataContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useGymData();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start space-x-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl animate-fade-in transition-all bg-[#181818]/95 border-white/10 text-white"
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === 'success' && (
              <CheckCircle className="w-5 h-5 text-brand-lime" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-cyan-400" />
            )}
          </div>
          <div className="flex-1 text-sm font-medium leading-snug">
            {toast.message}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-white/40 hover:text-white transition-colors p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
