"use client";

import { useEffect, useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Eye, 
  EyeOff, 
  Trash2, 
  Download, 
  Upload,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { StorageService } from '@/services/storage';
import { TOPICS } from '@/data/sampleQuestions';

export default function Settings() {
  const [topicSettings, setTopicSettings] = useState<Record<string, boolean>>({});
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({ type: null, msg: '' });

  useEffect(() => {
    setTopicSettings(StorageService.getTopicSettings());
  }, []);

  const handleToggleTopic = (topic: string) => {
    const updated = {
      ...topicSettings,
      [topic]: topicSettings[topic] === false ? true : false
    };
    setTopicSettings(updated);
    StorageService.saveTopicSettings(updated);
    window.dispatchEvent(new CustomEvent('local-storage-update'));
  };

  const handleExportData = () => {
    const data = StorageService.getProgressMap();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dsa_tracker_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        
        // Simple validation of import format
        if (typeof parsed !== 'object' || parsed === null) {
          throw new Error("Invalid backup format");
        }

        StorageService.saveProgressMap(parsed);
        setImportStatus({ type: 'success', msg: 'Data imported successfully! Reloading page...' });
        window.dispatchEvent(new CustomEvent('local-storage-update'));
        
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err) {
        setImportStatus({ type: 'error', msg: 'Failed to import. Invalid JSON format.' });
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    StorageService.resetAllData();
    setTopicSettings(StorageService.getTopicSettings());
    setShowConfirmReset(false);
    window.dispatchEvent(new CustomEvent('local-storage-update'));
    
    // Quick toast alert or visual refresh
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Preferences & Config</h2>
        <p className="text-xs text-slate-400 font-medium">Manage visible topics, export backups, and configure local files</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Topic Visibility Manager (Span 2) */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-md space-y-4">
          <div className="space-y-1">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <Eye className="h-5 w-5 text-violet-400" />
              Manage Active Topics
            </h3>
            <p className="text-xs text-slate-400">
              Toggle topics to hide them from the DSA Bank and Dashboard metrics. Progress is preserved.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {TOPICS.map(topic => {
              const isVisible = topicSettings[topic] !== false;
              return (
                <button
                  key={topic}
                  onClick={() => handleToggleTopic(topic)}
                  className={`
                    flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-all
                    ${isVisible 
                      ? 'bg-slate-900/50 border-slate-800 text-slate-200 hover:border-slate-700/60' 
                      : 'bg-slate-950/20 border-slate-900/60 text-slate-500 hover:text-slate-400'
                    }
                  `}
                >
                  <span>{topic}</span>
                  {isVisible ? (
                    <span className="flex items-center gap-1.5 text-xs text-violet-400 bg-violet-500/10 px-2 py-1 rounded-md border border-violet-500/20">
                      <Eye className="h-3.5 w-3.5" />
                      Visible
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-950 px-2 py-1 rounded-md border border-slate-900/80">
                      <EyeOff className="h-3.5 w-3.5" />
                      Hidden
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Settings Panel */}
        <div className="space-y-6">
          {/* Data Manager */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-md space-y-4">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-violet-400" />
              Storage Management
            </h3>

            <div className="space-y-3 pt-2">
              {/* Export Button */}
              <button
                onClick={handleExportData}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700/80 text-white rounded-xl text-sm font-semibold border border-slate-700/60 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export Progress (JSON)</span>
              </button>

              {/* Import Button */}
              <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700/80 text-white rounded-xl text-sm font-semibold border border-slate-700/60 cursor-pointer transition-colors">
                <Upload className="h-4 w-4" />
                <span>Import Backup</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>

              {/* Import Status Alert */}
              {importStatus.type && (
                <div className={`p-3 rounded-lg text-xs font-semibold ${
                  importStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {importStatus.msg}
                </div>
              )}

              <hr className="border-slate-800/80 my-4" />

              {/* Reset Database Button */}
              {showConfirmReset ? (
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/25 space-y-3">
                  <p className="text-xs text-red-400 font-semibold leading-relaxed flex items-start gap-1.5">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    Warning: This will clear all custom checkmarks and reload the default seeded database.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleResetData}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setShowConfirmReset(false)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowConfirmReset(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl text-sm font-semibold border border-red-500/20 transition-colors"
                >
                  <span>Reset All Progress</span>
                </button>
              )}
            </div>
          </div>

          {/* System Info */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-md space-y-3">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <Info className="h-5 w-5 text-violet-400" />
              System Information
            </h3>
            
            <div className="space-y-2.5 text-xs text-slate-400 pt-2 font-medium">
              <div className="flex justify-between border-b border-slate-800/40 pb-2">
                <span>Developer Time</span>
                <span className="text-slate-200">2026-06-05</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/40 pb-2">
                <span>Rollover Boundary</span>
                <span className="text-slate-200">5:00 AM IST</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/40 pb-2">
                <span>Storage Provider</span>
                <span className="text-slate-200 font-mono">localStorage</span>
              </div>
              <div className="flex justify-between">
                <span>Build Mode</span>
                <span className="text-emerald-400 flex items-center gap-0.5">
                  <CheckCircle className="h-3 w-3" />
                  Next.js App
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
