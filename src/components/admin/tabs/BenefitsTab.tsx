import React, { useState } from 'react';
import { useGymData } from '../../../context/GymDataContext';
import type { WhyUsBenefit } from '../../../types/gym';
import {
  Target,
  Dumbbell,
  MapPin,
  Compass,
  Trophy,
  Flame,
  Zap,
  Shield,
  Plus,
  Trash2,
  Edit2,
  X
} from 'lucide-react';

const ICON_OPTIONS: WhyUsBenefit['iconName'][] = [
  'Target',
  'Dumbbell',
  'MapPin',
  'Compass',
  'Trophy',
  'Flame',
  'Zap',
  'Shield'
];

export const BenefitsTab: React.FC = () => {
  const {
    whyUsBenefits,
    addWhyUsBenefit,
    updateWhyUsBenefit,
    deleteWhyUsBenefit,
    showToast
  } = useGymData();

  const [editingBenefit, setEditingBenefit] = useState<WhyUsBenefit | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [metric, setMetric] = useState('05');
  const [iconName, setIconName] = useState<WhyUsBenefit['iconName']>('Target');

  const renderIcon = (name: WhyUsBenefit['iconName'], className = 'w-5 h-5') => {
    switch (name) {
      case 'Target': return <Target className={className} />;
      case 'Dumbbell': return <Dumbbell className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Trophy': return <Trophy className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Shield': return <Shield className={className} />;
      default: return <Target className={className} />;
    }
  };

  const openCreateModal = () => {
    setTitle('');
    setDescription('');
    setMetric(`0${whyUsBenefits.length + 1}`);
    setIconName('Target');
    setEditingBenefit(null);
    setIsCreating(true);
  };

  const openEditModal = (b: WhyUsBenefit) => {
    setTitle(b.title);
    setDescription(b.description);
    setMetric(b.metric);
    setIconName(b.iconName);
    setEditingBenefit(b);
    setIsCreating(false);
  };

  const closeModal = () => {
    setEditingBenefit(null);
    setIsCreating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Please provide both title and description.', 'error');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      metric: metric.trim(),
      iconName
    };

    if (isCreating) {
      addWhyUsBenefit(payload);
    } else if (editingBenefit) {
      updateWhyUsBenefit(editingBenefit.id, payload);
    }

    closeModal();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Why Choose Us (Core Value Propositions)
          </h1>
          <p className="text-sm text-brand-gray mt-1">
            Manage the unique club differentiators and benefit cards displayed in the "Why Fitness Zone" section.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-lg shadow-brand-lime/10"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Add Benefit</span>
        </button>
      </div>

      {/* Grid of Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyUsBenefits.map((benefit) => (
          <div
            key={benefit.id}
            className="group p-6 rounded-2xl bg-[#161616] border border-white/10 hover:border-brand-lime/40 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-brand-lime">
                  {renderIcon(benefit.iconName, 'w-5 h-5 text-brand-lime')}
                </div>
                <span className="font-mono text-sm font-bold text-white/30 group-hover:text-brand-lime transition-colors">
                  /{benefit.metric}
                </span>
              </div>

              <h3 className="text-base font-bold text-white uppercase tracking-tight mb-2">
                {benefit.title}
              </h3>

              <p className="text-xs text-brand-gray leading-relaxed">
                {benefit.description}
              </p>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-4 mt-6 border-t border-white/5">
              <button
                onClick={() => openEditModal(benefit)}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-white/60" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete benefit "${benefit.title}"?`)) {
                    deleteWhyUsBenefit(benefit.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                title="Delete Benefit"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isCreating || editingBenefit) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">
              {isCreating ? 'Add Value Proposition' : `Edit: ${title || 'Benefit'}`}
            </h2>
            <p className="text-xs text-brand-gray mb-6">
              Highlight what sets Fitness Zone apart from other facilities in Dubai.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Headline / Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. A Focused Training Environment"
                  className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Explain why this benefit matters to prospective members..."
                  className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Metric / Step
                  </label>
                  <input
                    type="text"
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                    placeholder="01, 02, 03..."
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-lime"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Icon
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
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
                  {isCreating ? 'Create Benefit' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
