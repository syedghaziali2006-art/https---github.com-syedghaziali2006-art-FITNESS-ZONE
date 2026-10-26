import React, { useState } from 'react';
import { useGymData } from '../../../context/GymDataContext';
import type { MembershipPlan } from '../../../types/gym';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

export const MembershipPlansTab: React.FC = () => {
  const {
    membershipPlans,
    showPlansSection,
    togglePlansSection,
    addMembershipPlan,
    updateMembershipPlan,
    deleteMembershipPlan,
    showToast
  } = useGymData();

  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('850 AED');
  const [period, setPeriod] = useState('/ month');
  const [isPopular, setIsPopular] = useState(false);
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [ctaText, setCtaText] = useState('Enquire for Plan');
  const [features, setFeatures] = useState<string[]>([
    'Full gym floor access',
    'Locker & sauna access',
    'Complimentary assessment'
  ]);
  const [featureInput, setFeatureInput] = useState('');

  const openCreateModal = () => {
    setName('');
    setSubtitle('');
    setPrice('850 AED');
    setPeriod('/ month');
    setIsPopular(false);
    setBadge('');
    setDescription('Full access to all facilities with monthly flexibility.');
    setCtaText('Choose Plan');
    setFeatures(['Unlimited floor access', 'Locker & luxury showers', 'Complimentary InBody assessment']);
    setFeatureInput('');
    setEditingPlan(null);
    setIsCreating(true);
  };

  const openEditModal = (plan: MembershipPlan) => {
    setName(plan.name);
    setSubtitle(plan.subtitle);
    setPrice(plan.price);
    setPeriod(plan.period);
    setIsPopular(!!plan.isPopular);
    setBadge(plan.badge || '');
    setDescription(plan.description);
    setCtaText(plan.ctaText);
    setFeatures([...plan.features]);
    setFeatureInput('');
    setEditingPlan(plan);
    setIsCreating(false);
  };

  const closeModal = () => {
    setEditingPlan(null);
    setIsCreating(false);
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures((prev) => [...prev, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) {
      showToast('Please specify a plan name and price.', 'error');
      return;
    }

    const payload = {
      name: name.trim(),
      subtitle: subtitle.trim(),
      price: price.trim(),
      period: period.trim(),
      isPopular,
      badge: badge.trim() || undefined,
      description: description.trim(),
      ctaText: ctaText.trim() || 'Enquire Now',
      features: features.length > 0 ? features : ['Full floor access'],
      isActive: true
    };

    if (isCreating) {
      addMembershipPlan(payload);
    } else if (editingPlan) {
      updateMembershipPlan(editingPlan.id, payload);
    }

    closeModal();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Membership Packages & Pricing
          </h1>
          <p className="text-sm text-brand-gray mt-1">
            Configure rates in AED, popular highlight badges, and included features shown to visitors.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlansSection}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
              showPlansSection
                ? 'bg-brand-lime/10 text-brand-lime border-brand-lime/30'
                : 'bg-white/5 text-white/50 border-white/10'
            }`}
          >
            {showPlansSection ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{showPlansSection ? 'Section Visible on Site' : 'Section Hidden on Site'}</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-lg shadow-brand-lime/10"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add Package</span>
          </button>
        </div>
      </div>

      {/* Grid of Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {membershipPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all shadow-xl ${
              plan.isPopular
                ? 'bg-[#181818] border-2 border-brand-lime shadow-brand-lime/10'
                : 'bg-[#151515] border border-white/10 hover:border-white/20'
            }`}
          >
            {/* Top Badge */}
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full bg-brand-lime text-black font-black text-[10px] uppercase tracking-wider shadow-md">
                  {plan.badge}
                </span>
              </div>
            )}

            <div>
              <div className="text-center pt-2 pb-4 border-b border-white/5">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-xs text-brand-gray mt-0.5">{plan.subtitle}</p>

                <div className="mt-4 flex items-baseline justify-center space-x-1">
                  <span className="text-2xl sm:text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-brand-gray">{plan.period}</span>
                </div>
              </div>

              <p className="text-xs text-brand-gray mt-4 leading-relaxed line-clamp-2">
                {plan.description}
              </p>

              {/* Features List */}
              <div className="mt-4 space-y-2">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-white/80">
                    <Check className="w-3.5 h-3.5 text-brand-lime flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                {plan.ctaText}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openEditModal(plan)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-white/70" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete package "${plan.name}"?`)) {
                      deleteMembershipPlan(plan.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Delete Package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isCreating || editingPlan) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">
              {isCreating ? 'Create Membership Package' : `Edit: ${name || 'Plan'}`}
            </h2>
            <p className="text-xs text-brand-gray mb-6">
              Set tier name, rate in AED, billing frequency, and perk list.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. 3-Month Transformation"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Most Popular Choice"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Price (AED)
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 2,250 AED"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-lime"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Billing Period
                  </label>
                  <input
                    type="text"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="e.g. / month, / 3 months, / year"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                    required
                  />
                </div>

                <div className="sm:col-span-2 flex items-center space-x-6 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="rounded accent-brand-lime w-4 h-4"
                    />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Highlight with Glowing Border (Popular)
                    </span>
                  </label>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="Badge label (e.g. MOST POPULAR)"
                      className="w-full px-3 py-1.5 bg-[#111] border border-white/10 rounded-lg text-xs text-white uppercase focus:outline-none focus:border-brand-lime"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Plan Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Features & Inclusions
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="e.g. 1 Complimentary 1-on-1 PT coaching session"
                    className="flex-1 px-4 py-2 bg-[#111] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-lime"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#111] border border-white/5 text-xs text-white/80"
                    >
                      <span className="flex items-center space-x-1.5">
                        <Check className="w-3 h-3 text-brand-lime" />
                        <span>{feat}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="text-white/40 hover:text-red-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-lime/10"
                >
                  {isCreating ? 'Create Package' : 'Save Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
