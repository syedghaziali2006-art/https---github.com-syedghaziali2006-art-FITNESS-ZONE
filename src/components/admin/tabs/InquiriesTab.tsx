import React, { useState } from 'react';
import { useGymData } from '../../../context/GymDataContext';
import type { Inquiry, InquiryStatus } from '../../../types/gym';
import {
  Search,
  Filter,
  Plus,
  Trash2,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  FileSpreadsheet,
  Save,
  X
} from 'lucide-react';

interface InquiriesTabProps {
  onOpenAddLeadModal: () => void;
}

export const InquiriesTab: React.FC<InquiriesTabProps> = ({ onOpenAddLeadModal }) => {
  const {
    inquiries,
    updateInquiryStatus,
    updateInquiryNotes,
    deleteInquiry,
    clearAllInquiries,
    showToast
  } = useGymData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [interestFilter, setInterestFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Filtering
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.email && inq.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.message && inq.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.adminNotes && inq.adminNotes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesInterest = interestFilter === 'all' || inq.interestedIn === interestFilter;

    return matchesSearch && matchesStatus && matchesInterest;
  });

  const getWhatsAppLink = (inquiry: Inquiry) => {
    const cleanNumber = inquiry.phoneNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${inquiry.fullName}, this is Fitness Zone City Walk Dubai!\n\n` +
      `We received your enquiry regarding ${inquiry.interestedIn}.\n` +
      `How can our team help you reach your goals this week?`
    );
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      showToast('No inquiries to export.', 'info');
      return;
    }

    const headers = ['ID', 'Date', 'Full Name', 'Phone Number', 'Email', 'Interest', 'Status', 'Admin Notes', 'Customer Message'];
    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${new Date(inq.createdAt).toLocaleString()}"`,
      `"${inq.fullName.replace(/"/g, '""')}"`,
      `"${inq.phoneNumber}"`,
      `"${(inq.email || '').replace(/"/g, '""')}"`,
      `"${inq.interestedIn}"`,
      `"${inq.status}"`,
      `"${(inq.adminNotes || '').replace(/"/g, '""')}"`,
      `"${(inq.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fitness-zone-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported as CSV successfully!', 'success');
  };

  const handleStartEditNote = (inquiry: Inquiry) => {
    setEditingNotesId(inquiry.id);
    setNoteText(inquiry.adminNotes || '');
  };

  const handleSaveNote = (id: string) => {
    updateInquiryNotes(id, noteText);
    setEditingNotesId(null);
  };

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
    converted: inquiries.filter((i) => i.status === 'converted').length,
    archived: inquiries.filter((i) => i.status === 'archived').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Leads & Inquiries CRM
          </h1>
          <p className="text-sm text-brand-gray mt-1">
            Track member prospects, direct WhatsApp/call follow-ups, record staff notes, and manage conversions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenAddLeadModal}
            className="px-4 py-2.5 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-lg shadow-brand-lime/10"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(['all', 'new', 'contacted', 'converted', 'archived'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
              statusFilter === tab
                ? 'bg-brand-lime text-black shadow-lg shadow-brand-lime/20'
                : 'bg-[#181818] text-brand-gray hover:text-white border border-white/5'
            }`}
          >
            <span>{tab}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                statusFilter === tab ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'
              }`}
            >
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Search and Interest Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, phone (+971...), email, message, notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-lime"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="sm:col-span-4">
          <select
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
            className="w-full py-3 px-4 bg-[#161616] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
          >
            <option value="all">All Interest Types</option>
            <option value="Membership">Membership</option>
            <option value="Personal Training">Personal Training</option>
            <option value="General Enquiry">General Enquiry</option>
          </select>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-12 text-center text-brand-gray">
            <Filter className="w-12 h-12 mx-auto text-white/20 mb-3" />
            <h3 className="text-base font-bold text-white uppercase tracking-tight">
              No matching inquiries found
            </h3>
            <p className="text-xs text-brand-gray mt-1">
              {searchTerm || statusFilter !== 'all' || interestFilter !== 'all'
                ? 'Try resetting the filters or search query.'
                : 'Submitted leads from the website form will appear here automatically.'}
            </p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={`rounded-2xl border transition-all p-5 sm:p-6 ${
                inquiry.status === 'new'
                  ? 'bg-[#181818] border-brand-lime/40 shadow-lg shadow-brand-lime/5'
                  : 'bg-[#151515] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Lead Core Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-lg font-black text-white tracking-tight">
                      {inquiry.fullName}
                    </span>
                    <span className="text-xs font-mono text-white/40">#{inquiry.id}</span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                        inquiry.status === 'new'
                          ? 'bg-brand-lime/20 text-brand-lime border-brand-lime/50'
                          : inquiry.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : inquiry.status === 'converted'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-white/10 text-white/60 border-white/10'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-brand-lime">
                      {inquiry.interestedIn}
                    </span>
                  </div>

                  {/* Contact Info Pills */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-brand-gray">
                    <div className="flex items-center space-x-1.5 text-white font-mono font-medium">
                      <Phone className="w-3.5 h-3.5 text-brand-lime" />
                      <span>{inquiry.phoneNumber}</span>
                    </div>

                    {inquiry.email && (
                      <div className="flex items-center space-x-1.5 text-white/80">
                        <Mail className="w-3.5 h-3.5 text-white/50" />
                        <span>{inquiry.email}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-1.5 text-white/40">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(inquiry.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* User Message */}
                  {inquiry.message && (
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-white/90 leading-relaxed mt-2">
                      <span className="text-white/40 block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                        Inquiry Message:
                      </span>
                      "{inquiry.message}"
                    </div>
                  )}

                  {/* Admin Internal Notes Section */}
                  <div className="mt-3 pt-3 border-t border-white/5">
                    {editingNotesId === inquiry.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Type internal staff notes (e.g. called client, offered 10% discount, visited on Tuesday)..."
                          rows={2}
                          className="w-full p-2.5 bg-black/60 border border-brand-lime/40 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
                        />
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleSaveNote(inquiry.id)}
                            className="px-3 py-1 bg-brand-lime text-black font-bold text-xs rounded-lg hover:bg-brand-lime-hover transition-colors flex items-center space-x-1"
                          >
                            <Save className="w-3 h-3" />
                            <span>Save Note</span>
                          </button>
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-3 py-1 bg-white/10 text-white text-xs rounded-lg hover:bg-white/20 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group">
                        <div className="text-xs">
                          <span className="text-white/40 font-bold uppercase tracking-wider text-[10px] mr-2">
                            Staff Note:
                          </span>
                          <span className="text-white/80 italic">
                            {inquiry.adminNotes || 'No notes added yet.'}
                          </span>
                        </div>
                        <button
                          onClick={() => handleStartEditNote(inquiry)}
                          className="text-xs text-brand-lime hover:underline font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100"
                        >
                          {inquiry.adminNotes ? 'Edit Note' : '+ Add Note'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions & Status selector */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5 flex-shrink-0">
                  {/* Status Dropdown */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-brand-gray hidden lg:inline">Status:</span>
                    <select
                      value={inquiry.status}
                      onChange={(e) =>
                        updateInquiryStatus(inquiry.id, e.target.value as any)
                      }
                      className="bg-black/60 text-white text-xs font-bold px-3 py-2 rounded-xl border border-white/15 focus:outline-none focus:border-brand-lime"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  {/* WhatsApp & Call Direct Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <a
                      href={getWhatsAppLink(inquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center space-x-1.5 transition-colors"
                      title="Open WhatsApp chat"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${inquiry.phoneNumber}`}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 flex items-center space-x-1.5 transition-colors"
                      title="Direct telephone call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete lead #${inquiry.id} (${inquiry.fullName})?`)) {
                          deleteInquiry(inquiry.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                      title="Delete lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {inquiries.length > 0 && (
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
          <span>Showing {filteredInquiries.length} of {inquiries.length} total inquiries</span>
          <button
            onClick={() => {
              if (confirm('Warning: This will clear all inquiries in the CRM. Are you sure?')) {
                clearAllInquiries();
              }
            }}
            className="text-red-400 hover:underline"
          >
            Clear all inquiries
          </button>
        </div>
      )}
    </div>
  );
};
