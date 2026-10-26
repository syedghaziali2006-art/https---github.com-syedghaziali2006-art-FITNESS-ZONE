import React, { useState } from 'react';
import { useGymData } from '../../context/GymDataContext';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, Key } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const { loginAdmin } = useGymData();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = loginAdmin(username, password);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Incorrect username or password. Please try again.');
    }
  };

  const handleFillDemoCreds = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#161616] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
        {/* Back to Site Button */}
        <button
          onClick={onClose}
          className="inline-flex items-center space-x-1.5 text-xs text-brand-gray hover:text-white transition-colors mb-6 uppercase tracking-wider font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Live Website</span>
        </button>

        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-brand-lime/10 border border-brand-lime/30 text-brand-lime shadow-lg shadow-brand-lime/10 mb-2">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            Admin Master Portal
          </h2>
          <p className="text-xs text-brand-gray max-w-xs mx-auto">
            Authorized access only. Manage live content, membership pricing, coaches, and CRM inquiries.
          </p>
        </div>

        {/* Demo Quick-Fill Pill */}
        <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="text-[11px] text-brand-gray">
            <span className="font-bold text-white block">Default Credentials:</span>
            <span>User: <strong className="text-brand-lime">admin</strong> · Pass: <strong className="text-brand-lime">admin123</strong></span>
          </div>
          <button
            type="button"
            onClick={handleFillDemoCreds}
            className="px-2.5 py-1 rounded bg-brand-lime/10 hover:bg-brand-lime/20 text-brand-lime text-[10px] font-bold uppercase tracking-wider border border-brand-lime/30 transition-colors"
          >
            Auto-Fill
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime pr-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-brand-lime hover:bg-brand-lime-hover text-black font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xl shadow-brand-lime/10 flex items-center justify-center space-x-2"
          >
            <Key className="w-4 h-4 text-black" />
            <span>Unlock Admin Control</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <span className="text-[11px] text-white/30 flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-lime/60" />
            <span>Encrypted local session authenticated</span>
          </span>
        </div>
      </div>
    </div>
  );
};
