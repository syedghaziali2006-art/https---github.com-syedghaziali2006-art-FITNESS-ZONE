import React, { useState } from 'react';
import { useGymData } from '../../context/GymDataContext';
import { X, UserPlus } from 'lucide-react';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose }) => {
  const { addInquiry, showToast } = useGymData();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [interestedIn, setInterestedIn] = useState<'Membership' | 'Personal Training' | 'General Enquiry'>('Membership');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      showToast('Name and phone number are required.', 'error');
      return;
    }

    const newId = addInquiry({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim() || undefined,
      message: message.trim() || 'Walk-in / Direct phone lead added by staff.',
      interestedIn
    });

    showToast(`Lead registered successfully (#${newId})!`, 'success');
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-2">
          <div className="p-2 rounded-lg bg-brand-lime/10 text-brand-lime">
            <UserPlus className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            Register New Lead / Walk-In
          </h2>
        </div>
        <p className="text-xs text-brand-gray mb-6">
          Record a prospective member walking into City Walk reception or calling via phone.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rashid Al-Nuaimi"
              className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Contact Phone / WhatsApp *
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+971 50 000 0000"
              className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
              className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Primary Interest
            </label>
            <select
              value={interestedIn}
              onChange={(e) => setInterestedIn(e.target.value as any)}
              className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
            >
              <option value="Membership">Club Membership</option>
              <option value="Personal Training">Personal Training (1-on-1)</option>
              <option value="General Enquiry">General / Day Pass Trial</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Initial Notes / Client Requirements
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Came by in person, looking for 3-month coaching package..."
              className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-lime/10"
            >
              Save to CRM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
