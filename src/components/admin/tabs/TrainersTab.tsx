import React, { useState } from 'react';
import { useGymData } from '../../../context/GymDataContext';
import type { Trainer } from '../../../types/gym';
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

const PRESET_TRAINER_PHOTOS = [
  { label: 'Strength Coach (Male)', url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop' },
  { label: 'Mobility Specialist (Female)', url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop' },
  { label: 'Transformation Coach (Male)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop' },
  { label: 'Athletic Trainer (Female)', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop' }
];

export const TrainersTab: React.FC = () => {
  const {
    trainers,
    showTrainersSection,
    toggleTrainersSection,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    showToast
  } = useGymData();

  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('Senior Fitness Coach');
  const [specialty, setSpecialty] = useState('Strength & Body Recomposition');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(PRESET_TRAINER_PHOTOS[0].url);
  const [certs, setCerts] = useState<string[]>(['NASM-CPT', 'REPs UAE Level 3']);
  const [certInput, setCertInput] = useState('');

  const openCreateModal = () => {
    setName('');
    setRole('Personal Fitness Coach');
    setSpecialty('Hypertrophy & Conditioning');
    setBio('Dedicated to helping clients achieve sustainable fitness habits and optimal athletic progress.');
    setImage(PRESET_TRAINER_PHOTOS[0].url);
    setCerts(['NASM-CPT', 'REPs Level 3']);
    setCertInput('');
    setEditingTrainer(null);
    setIsCreating(true);
  };

  const openEditModal = (t: Trainer) => {
    setName(t.name);
    setRole(t.role);
    setSpecialty(t.specialty);
    setBio(t.bio);
    setImage(t.image);
    setCerts([...t.certifications]);
    setCertInput('');
    setEditingTrainer(t);
    setIsCreating(false);
  };

  const closeModal = () => {
    setEditingTrainer(null);
    setIsCreating(false);
  };

  const handleAddCert = () => {
    if (certInput.trim()) {
      setCerts((prev) => [...prev, certInput.trim()]);
      setCertInput('');
    }
  };

  const handleRemoveCert = (index: number) => {
    setCerts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter coach name.', 'error');
      return;
    }

    const payload = {
      name: name.trim(),
      role: role.trim(),
      specialty: specialty.trim(),
      bio: bio.trim(),
      certifications: certs.length > 0 ? certs : ['Certified Coach'],
      image: image.trim(),
      isActive: true
    };

    if (isCreating) {
      addTrainer(payload);
    } else if (editingTrainer) {
      updateTrainer(editingTrainer.id, payload);
    }

    closeModal();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Coaches & Personal Trainers
          </h1>
          <p className="text-sm text-brand-gray mt-1">
            Showcase certified personal fitness coaches, their specializations, and accreditations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTrainersSection}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
              showTrainersSection
                ? 'bg-brand-lime/10 text-brand-lime border-brand-lime/30'
                : 'bg-white/5 text-white/50 border-white/10'
            }`}
          >
            {showTrainersSection ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{showTrainersSection ? 'Coaches Visible on Site' : 'Coaches Hidden on Site'}</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-lg shadow-brand-lime/10"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add Coach</span>
          </button>
        </div>
      </div>

      {/* Grid of Trainers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((t) => (
          <div
            key={t.id}
            className="group relative flex flex-col justify-between bg-[#161616] rounded-2xl overflow-hidden border border-white/10 hover:border-brand-lime/40 transition-all shadow-xl"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/30 to-transparent" />

              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-lime">
                  {t.role}
                </span>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  {t.name}
                </h3>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs font-semibold text-white/90">
                  {t.specialty}
                </p>
                <p className="text-xs text-brand-gray mt-2 line-clamp-3 leading-relaxed">
                  {t.bio}
                </p>

                {/* Certifications */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.certifications.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-white/70 font-mono"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-white/5">
                <button
                  onClick={() => openEditModal(t)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-white/60" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove coach "${t.name}"?`)) {
                      deleteTrainer(t.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                  title="Remove Coach"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isCreating || editingTrainer) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">
              {isCreating ? 'Add Coach Profile' : `Edit: ${name || 'Coach'}`}
            </h2>
            <p className="text-xs text-brand-gray mb-6">
              Enter trainer credentials, expertise, bio, and high-resolution photo.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Coach Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Head Strength Coach"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="e.g. Powerlifting, Athletic Hypertrophy & Nutrition"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Bio / Background
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Summary of experience and training methodology..."
                  className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Coach Photo URL
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-1 px-4 py-2 bg-[#111] border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-brand-lime"
                    required
                  />
                  {image && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] text-white/40 mr-1">Presets:</span>
                  {PRESET_TRAINER_PHOTOS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setImage(p.url)}
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-white/70 border border-white/5"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Certifications & Degrees
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={certInput}
                    onChange={(e) => setCertInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCert();
                      }
                    }}
                    placeholder="e.g. CSCS, NASM-CPT, Precision Nutrition"
                    className="flex-1 px-4 py-2 bg-[#111] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-lime"
                  />
                  <button
                    type="button"
                    onClick={handleAddCert}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {certs.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#111] border border-white/10 text-xs text-white"
                    >
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCert(i)}
                        className="text-white/40 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
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
                  {isCreating ? 'Save Coach' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
