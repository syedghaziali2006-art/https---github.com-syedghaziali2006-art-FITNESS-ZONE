import React, { useState } from 'react';
import { useGymData } from '../../../context/GymDataContext';
import type { BusinessInfo } from '../../../types/gym';
import {
  Building2,
  Phone,
  Clock,
  MapPin,
  Star,
  Save,
  RotateCcw,
  Check
} from 'lucide-react';

export const ClubProfileTab: React.FC = () => {
  const { clubData, updateClubData, showToast } = useGymData();

  const [formData, setFormData] = useState<BusinessInfo>(clubData);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: keyof BusinessInfo, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (subfield: keyof BusinessInfo['address'], value: string) => {
    setFormData((prev) => {
      const newAddress = { ...prev.address, [subfield]: value };
      // auto update full address if subfields change
      newAddress.full = `${newAddress.line1}, ${newAddress.landmark ? newAddress.landmark + ', ' : ''}${newAddress.district}, ${newAddress.city}, ${newAddress.country}`;
      return { ...prev, address: newAddress };
    });
  };

  const handleLinksChange = (subfield: keyof BusinessInfo['links'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      links: { ...prev.links, [subfield]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClubData(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleReset = () => {
    setFormData(clubData);
    showToast('Reset form to current saved state.', 'info');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Club Profile & Contact
          </h1>
          <p className="text-sm text-brand-gray mt-1">
            Edit the gym's public name, contact lines, WhatsApp number, opening hours, address, and ratings.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Discard</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-lg shadow-brand-lime/10"
          >
            {isSaved ? <Check className="w-4 h-4 text-black" /> : <Save className="w-4 h-4 text-black" />}
            <span>{isSaved ? 'Saved Live!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* 1. Core Brand Information */}
      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-white/10">
          <Building2 className="w-5 h-5 text-brand-lime" />
          <h2 className="text-base font-black text-white uppercase tracking-tight">
            1. Core Business Information
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Club / Gym Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Tagline / Motto
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Location Area Display
            </label>
            <input
              type="text"
              value={formData.locationArea}
              onChange={(e) => handleChange('locationArea', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>
        </div>
      </div>

      {/* 2. Direct Contact & Communication Channels */}
      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-white/10">
          <Phone className="w-5 h-5 text-brand-lime" />
          <h2 className="text-base font-black text-white uppercase tracking-tight">
            2. Phone & WhatsApp Contact
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Display Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-lime"
              placeholder="+971 54 727 4777"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Raw Dial Phone (for tel: links)
            </label>
            <input
              type="text"
              value={formData.rawPhone}
              onChange={(e) => handleChange('rawPhone', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-lime"
              placeholder="+971547274777"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              WhatsApp Direct Number (no +)
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-lime"
              placeholder="971547274777"
              required
            />
          </div>
        </div>
      </div>

      {/* 3. Operating Hours */}
      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-white/10">
          <Clock className="w-5 h-5 text-brand-lime" />
          <h2 className="text-base font-black text-white uppercase tracking-tight">
            3. Operating Hours & Schedule
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Reported Closing Time / Hours
            </label>
            <input
              type="text"
              value={formData.reportedHours}
              onChange={(e) => handleChange('reportedHours', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              placeholder="Reported: Open until 11:00 PM"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Timings Note / Advice
            </label>
            <input
              type="text"
              value={formData.hoursNote}
              onChange={(e) => handleChange('hoursNote', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>
        </div>
      </div>

      {/* 4. Physical Location & Address */}
      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-white/10">
          <MapPin className="w-5 h-5 text-brand-lime" />
          <h2 className="text-base font-black text-white uppercase tracking-tight">
            4. Address & Geographic Details
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              value={formData.address.line1}
              onChange={(e) => handleAddressChange('line1', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Landmark
            </label>
            <input
              type="text"
              value={formData.address.landmark}
              onChange={(e) => handleAddressChange('landmark', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              District / Neighborhood
            </label>
            <input
              type="text"
              value={formData.address.district}
              onChange={(e) => handleAddressChange('district', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              City
            </label>
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Country
            </label>
            <input
              type="text"
              value={formData.address.country}
              onChange={(e) => handleAddressChange('country', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Google Plus Code
            </label>
            <input
              type="text"
              value={formData.plusCode}
              onChange={(e) => handleChange('plusCode', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Full Formatted Address
            </label>
            <input
              type="text"
              value={formData.address.full}
              onChange={(e) => handleAddressChange('full', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>
        </div>
      </div>

      {/* 5. Google Reviews & Maps Links */}
      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-white/10">
          <Star className="w-5 h-5 text-brand-lime" />
          <h2 className="text-base font-black text-white uppercase tracking-tight">
            5. Google Rating & External URLs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Google Star Rating (e.g., 4.6)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => handleChange('rating', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Total Google Reviews Count (e.g., 203)
            </label>
            <input
              type="number"
              value={formData.reviewCount}
              onChange={(e) => handleChange('reviewCount', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Google Maps Directions URL
            </label>
            <input
              type="url"
              value={formData.links.googleMapsDirections}
              onChange={(e) => handleLinksChange('googleMapsDirections', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white font-mono text-xs focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
              Google Reviews URL
            </label>
            <input
              type="url"
              value={formData.links.googleReviews}
              onChange={(e) => handleLinksChange('googleReviews', e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white font-mono text-xs focus:outline-none focus:border-brand-lime"
              required
            />
          </div>
        </div>
      </div>

      {/* Floating or Bottom Save Bar */}
      <div className="flex items-center justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          className="px-8 py-3 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-xl shadow-brand-lime/10"
        >
          {isSaved ? <Check className="w-4 h-4 text-black" /> : <Save className="w-4 h-4 text-black" />}
          <span>{isSaved ? 'Changes Applied!' : 'Save & Publish Live'}</span>
        </button>
      </div>
    </form>
  );
};
