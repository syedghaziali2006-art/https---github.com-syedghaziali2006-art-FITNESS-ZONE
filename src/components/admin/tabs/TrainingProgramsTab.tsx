import React, { useState } from 'react';
import { useGymData } from '../../../context/GymDataContext';
import type { TrainingCard } from '../../../types/gym';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Strength & Barbells', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Personal Coaching', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Cardio & Conditioning', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop' },
  { label: 'High Intensity HIIT', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Boxing & Combat', url: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1200&auto=format&fit=crop' }
];

export const TrainingProgramsTab: React.FC = () => {
  const {
    trainingExperiences,
    addTrainingExperience,
    updateTrainingExperience,
    deleteTrainingExperience,
    showToast
  } = useGymData();

  const [editingCard, setEditingCard] = useState<TrainingCard | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [tag, setTag] = useState('Core Focus');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [features, setFeatures] = useState<string[]>(['Progressive overload culture', 'Dedicated lifting zones']);
  const [featureInput, setFeatureInput] = useState('');

  const openCreateModal = () => {
    setTitle('');
    setSubtitle('');
    setTag('Core Focus');
    setBadge('');
    setDescription('');
    setImage(PRESET_IMAGES[0].url);
    setFeatures(['Targeted athletic conditioning', 'Dedicated coach supervision']);
    setFeatureInput('');
    setEditingCard(null);
    setIsCreating(true);
  };

  const openEditModal = (card: TrainingCard) => {
    setTitle(card.title);
    setSubtitle(card.subtitle);
    setTag(card.tag);
    setBadge(card.badge || '');
    setDescription(card.description);
    setImage(card.image);
    setFeatures([...card.features]);
    setFeatureInput('');
    setEditingCard(card);
    setIsCreating(false);
  };

  const closeModal = () => {
    setEditingCard(null);
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
    if (!title.trim() || !description.trim() || !image.trim()) {
      showToast('Please fill in title, description, and image URL.', 'error');
      return;
    }

    const payload = {
      title: title.trim().toUpperCase(),
      subtitle: subtitle.trim(),
      tag: tag.trim() || 'General',
      badge: badge.trim() || undefined,
      description: description.trim(),
      image: image.trim(),
      features: features.length > 0 ? features : ['Expert programming']
    };

    if (isCreating) {
      addTrainingExperience(payload);
    } else if (editingCard) {
      updateTrainingExperience(editingCard.id, payload);
    }

    closeModal();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Training Experiences & Programs
          </h1>
          <p className="text-sm text-brand-gray mt-1">
            Manage the training cards shown on the website with high-res photography, custom tags, and feature bullets.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-lg shadow-brand-lime/10"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Add Program</span>
        </button>
      </div>

      {/* Grid of Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingExperiences.map((card) => (
          <div
            key={card.id}
            className="group relative flex flex-col justify-between bg-[#161616] rounded-2xl overflow-hidden border border-white/10 hover:border-brand-lime/40 transition-all shadow-xl"
          >
            {/* Image Preview with Badges */}
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/40 to-transparent" />

              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase text-white border border-white/10">
                  {card.tag}
                </span>
                {card.badge && (
                  <span className="px-2.5 py-0.5 rounded bg-brand-lime/90 text-[10px] font-black uppercase text-black">
                    {card.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-brand-lime font-semibold mt-0.5">
                  {card.subtitle}
                </p>
                <p className="text-xs text-brand-gray mt-2 line-clamp-3 leading-relaxed">
                  {card.description}
                </p>

                {/* Features Bullets */}
                <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                  {card.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-[11px] text-white/70">
                      <Check className="w-3 h-3 text-brand-lime flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-white/5">
                <button
                  onClick={() => openEditModal(card)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-white/60" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete program "${card.title}"?`)) {
                      deleteTrainingExperience(card.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors"
                  title="Delete Program"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isCreating || editingCard) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">
              {isCreating ? 'Add New Training Program' : `Edit: ${title || 'Program'}`}
            </h2>
            <p className="text-xs text-brand-gray mb-6">
              Customize program title, photography, tags, and value highlights.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Program Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. STRENGTH & CONDITIONING"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime uppercase"
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
                    placeholder="e.g. Built on discipline & progression"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. Core Focus, Lifestyle, Enquire Option"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Highlight Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Enquire with Team"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe the training environment, coaching approach, and expectations..."
                  className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                  required
                />
              </div>

              {/* Image URL & Preset Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Cover Image URL
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-brand-lime"
                    required
                  />
                  {image && (
                    <div className="w-12 h-10 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-white/40 mr-1">Presets:</span>
                  {PRESET_IMAGES.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setImage(p.url)}
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/5 transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Feature Bullets */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Feature Highlights
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
                    placeholder="e.g. Spacious dedicated lifting zones"
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

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-brand-lime/10"
                >
                  {isCreating ? 'Create Program' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
