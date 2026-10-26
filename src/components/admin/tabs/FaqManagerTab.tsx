import React, { useState } from 'react';
import { useGymData } from '../../../context/GymDataContext';
import type { FAQItem } from '../../../types/gym';
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Search
} from 'lucide-react';

export const FaqManagerTab: React.FC = () => {
  const {
    faqItems,
    addFaqItem,
    updateFaqItem,
    deleteFaqItem,
    showToast
  } = useGymData();

  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const filteredFaqs = faqItems.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setQuestion('');
    setAnswer('');
    setEditingFaq(null);
    setIsCreating(true);
  };

  const openEditModal = (f: FAQItem) => {
    setQuestion(f.question);
    setAnswer(f.answer);
    setEditingFaq(f);
    setIsCreating(false);
  };

  const closeModal = () => {
    setEditingFaq(null);
    setIsCreating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      showToast('Please provide both question and answer.', 'error');
      return;
    }

    const payload = {
      question: question.trim(),
      answer: answer.trim()
    };

    if (isCreating) {
      addFaqItem(payload);
    } else if (editingFaq) {
      updateFaqItem(editingFaq.id, payload);
    }

    closeModal();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-sm text-brand-gray mt-1">
            Maintain clear answers regarding club facilities, location, parking, coaching, and pricing.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-lg shadow-brand-lime/10"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter questions or answers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-[#161616] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-lime"
        />
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => {
          return (
            <div
              key={faq.id}
              className="bg-[#161616] border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-white/20"
            >
              <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs text-brand-lime font-bold">
                      Q{index + 1}.
                    </span>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight">
                      {faq.question}
                    </h3>
                  </div>

                  <p className="text-xs text-brand-gray leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => openEditModal(faq)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-white/60" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete FAQ: "${faq.question}"?`)) {
                        deleteFaqItem(faq.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {(isCreating || editingFaq) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">
              {isCreating ? 'Add New FAQ Question' : 'Edit FAQ Question'}
            </h2>
            <p className="text-xs text-brand-gray mb-6">
              Answer common inquiries about parking, timing, amenities, and coaching packages.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Question
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. Is valet parking available at City Walk Mall?"
                  className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Detailed Answer
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={4}
                  placeholder="Provide a clear, reassuring answer..."
                  className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime leading-relaxed"
                  required
                />
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
                  {isCreating ? 'Add FAQ' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
