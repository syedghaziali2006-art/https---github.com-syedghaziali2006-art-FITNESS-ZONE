import React, { useState } from 'react';
import { useGymData } from '../../../context/GymDataContext';
import {
  Download,
  Upload,
  RotateCcw,
  Key,
  Clock,
  Check,
  AlertTriangle,
  Lock
} from 'lucide-react';

export const BackupSettingsTab: React.FC = () => {
  const {
    exportBackup,
    importBackup,
    resetToDefaults,
    updateAdminCredentials,
    adminUsername,
    activityLogs,
    showToast
  } = useGymData();

  // Password Change State
  const [newUsername, setNewUsername] = useState(adminUsername);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Import JSON State
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  const handleDownloadBackup = () => {
    const jsonStr = exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fitness-zone-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Database configuration downloaded successfully!', 'success');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importBackup(content);
      if (!res.success) {
        showToast(res.message, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleApplyPasteBackup = () => {
    if (!importJsonText.trim()) {
      showToast('Please paste valid JSON data.', 'error');
      return;
    }
    const res = importBackup(importJsonText);
    if (res.success) {
      setImportJsonText('');
      setShowImportArea(false);
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      showToast('Username cannot be empty.', 'error');
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    if (newPassword.length > 0 && newPassword.length < 4) {
      showToast('Password should be at least 4 characters.', 'error');
      return;
    }

    updateAdminCredentials(newUsername, newPassword || 'admin123');
    setPasswordSaved(true);
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  const handleResetFactory = () => {
    const confirmed = window.confirm(
      'CRITICAL WARNING: This will reset all website text, programs, pricing, coaches, and CRM leads back to factory default. Continue?'
    );
    if (confirmed) {
      resetToDefaults();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-2xl font-black text-white uppercase tracking-tight">
          Backup, Security & System Logs
        </h1>
        <p className="text-sm text-brand-gray mt-1">
          Export full JSON snapshots of the entire website, import previous backups, update admin login credentials, or restore defaults.
        </p>
      </div>

      {/* Grid: Backup & Restore */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Backup Card */}
        <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="p-3 w-fit rounded-xl bg-brand-lime/10 text-brand-lime border border-brand-lime/20 mb-4">
              <Download className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              Export Complete Backup (JSON)
            </h2>
            <p className="text-xs text-brand-gray mt-2 leading-relaxed">
              Download a complete JSON database snapshot of your website including club contact data, pricing tiers, training programs, team profiles, FAQ items, top banner, and all CRM inquiries.
            </p>
          </div>

          <button
            onClick={handleDownloadBackup}
            className="w-full py-3 rounded-xl bg-brand-lime hover:bg-brand-lime-hover text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-brand-lime/10"
          >
            <Download className="w-4 h-4 text-black" />
            <span>Download Backup (.json)</span>
          </button>
        </div>

        {/* Import Backup Card */}
        <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="p-3 w-fit rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
              <Upload className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              Restore / Import Backup
            </h2>
            <p className="text-xs text-brand-gray mt-2 leading-relaxed">
              Upload a previously exported backup file or paste JSON code to restore or migrate all gym information and inquiries instantly.
            </p>
          </div>

          <div className="space-y-2">
            <label className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-white/70" />
              <span>Upload Backup File (.json)</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={() => setShowImportArea((prev) => !prev)}
              className="w-full py-2 text-xs text-brand-lime hover:underline font-bold uppercase tracking-wider text-center"
            >
              {showImportArea ? 'Hide Paste Area' : 'Or Paste JSON Manually'}
            </button>
          </div>
        </div>
      </div>

      {/* Manual Paste JSON area */}
      {showImportArea && (
        <div className="bg-[#161616] border border-brand-lime/30 rounded-2xl p-6 space-y-3 animate-fade-in">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray">
            Paste JSON Backup Data
          </label>
          <textarea
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            rows={5}
            placeholder='{"version": "2.0.0", "clubData": { ... } }'
            className="w-full p-3 bg-[#111] border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-brand-lime"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowImportArea(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyPasteBackup}
              className="px-5 py-2 bg-brand-lime text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-lime/10"
            >
              Apply Backup
            </button>
          </div>
        </div>
      )}

      {/* Admin Security Credentials */}
      <form onSubmit={handleUpdatePassword} className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-white/10">
          <Lock className="w-5 h-5 text-brand-lime" />
          <h2 className="text-base font-black text-white uppercase tracking-tight">
            Admin Account & Access Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep unchanged"
              className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-lime"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-brand-gray">
            Default credentials for testing: <strong className="text-brand-lime">admin</strong> / <strong className="text-brand-lime">admin123</strong>
          </span>

          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-lime hover:bg-brand-lime-hover text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg shadow-brand-lime/10 flex items-center space-x-2"
          >
            {passwordSaved ? <Check className="w-4 h-4 text-black" /> : <Key className="w-4 h-4 text-black" />}
            <span>{passwordSaved ? 'Credentials Saved!' : 'Update Credentials'}</span>
          </button>
        </div>
      </form>

      {/* Danger Zone: Factory Reset */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2.5">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h2 className="text-base font-black text-red-400 uppercase tracking-tight">
            Danger Zone: Factory Reset
          </h2>
        </div>

        <p className="text-xs text-white/70 leading-relaxed max-w-2xl">
          Restore all gym business information, training programs, pricing plans, coach profiles, FAQs, and announcement settings to their initial factory default state. This action cannot be undone unless you have downloaded a backup.
        </p>

        <button
          onClick={handleResetFactory}
          className="px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restore Factory Defaults</span>
        </button>
      </div>

      {/* Audit Log Feed */}
      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-white/10">
          <Clock className="w-5 h-5 text-brand-lime" />
          <h2 className="text-base font-black text-white uppercase tracking-tight">
            System Activity & Audit Log
          </h2>
        </div>

        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-[#111] border border-white/5 flex items-start justify-between gap-4 text-xs"
            >
              <div>
                <span className="font-bold text-white block">{log.action}</span>
                <span className="text-white/60 text-[11px] mt-0.5 block">{log.details}</span>
              </div>
              <span className="text-[10px] font-mono text-white/40 flex-shrink-0">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
