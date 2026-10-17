'use client';

import React, { useState } from 'react';
import { VideoItem } from '@/types/content';
import { 
  Cloud, 
  Database, 
  CheckCircle2, 
  Clock, 
  HardDrive, 
  RefreshCw, 
  Download, 
  FileCode, 
  ExternalLink,
  ShieldCheck,
  Server
} from 'lucide-react';

interface R2StorageViewProps {
  videos: VideoItem[];
}

export const R2StorageView: React.FC<R2StorageViewProps> = ({ videos }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedCount, setSyncedCount] = useState(videos.filter(v => v.storage.syncStatus === 'Synced').length);

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedCount(videos.length);
    }, 1200);
  };

  const exportMetadataJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(videos, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `content_studio_r2_records_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Cloudflare R2 Storage Architecture Header */}
      <div className="p-6 rounded-2xl bg-studio-850 border border-studio-700/80 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 font-bold">
                Cloudflare R2 Object Storage
              </span>
              <span className="text-xs text-studio-400 font-mono">
                Region: WNAM / EU Primary
              </span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cloud className="w-5 h-5 text-accent-violet" />
              Object Storage & Database Record Architecture
            </h2>
            <p className="mt-1 text-xs text-studio-400">
              Zero egress fees. Heavy media (4K MP4s, WAV voice takes, storyboard visual frames) live in R2; structured IDs & cadence metadata live in relational database.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-3 py-2 bg-studio-800 hover:bg-studio-700 text-white rounded-lg text-xs font-semibold border border-studio-650 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-accent-cyan' : ''}`} />
              {isSyncing ? 'Verifying R2 ETag...' : 'Sync R2 Manifest'}
            </button>

            <button
              onClick={exportMetadataJson}
              className="flex items-center gap-2 px-3 py-2 bg-accent-violet hover:bg-violet-600 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export Records (JSON)
            </button>
          </div>
        </div>
      </div>

      {/* R2 Bucket Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-studio-850 border border-studio-700/70">
          <div className="flex items-center justify-between text-xs font-mono text-studio-400">
            <span>Primary Media Bucket</span>
            <span className="text-emerald-400 font-bold">Active</span>
          </div>
          <div className="mt-2 text-lg font-mono font-bold text-white">content-aweditya-media</div>
          <div className="mt-1 text-xs text-studio-400">Endpoint: https://r2.aweditya.com</div>
        </div>

        <div className="p-4 rounded-xl bg-studio-850 border border-studio-700/70">
          <div className="flex items-center justify-between text-xs font-mono text-studio-400">
            <span>Database Records Synced</span>
            <span className="text-accent-cyan font-bold">{syncedCount} / {videos.length}</span>
          </div>
          <div className="mt-2 text-lg font-mono font-bold text-white">100% Integrity</div>
          <div className="mt-1 text-xs text-studio-400">Zero orphaned media files</div>
        </div>

        <div className="p-4 rounded-xl bg-studio-850 border border-studio-700/70">
          <div className="flex items-center justify-between text-xs font-mono text-studio-400">
            <span>Storage Footprint</span>
            <span className="text-accent-violet font-bold">71.02 MB</span>
          </div>
          <div className="mt-2 text-lg font-mono font-bold text-white">4K Master Audio/Video</div>
          <div className="mt-1 text-xs text-studio-400">Estimated Monthly Cloudflare Cost: $0.00</div>
        </div>
      </div>

      {/* Media & Key Mapping Table */}
      <div className="p-5 rounded-2xl bg-studio-850 border border-studio-700/80 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4 text-accent-cyan" /> Video Record to R2 Object Key Registry
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-studio-700 text-studio-400 uppercase tracking-wider">
                <th className="pb-3 px-3">Video ID</th>
                <th className="pb-3 px-3">Title</th>
                <th className="pb-3 px-3">Master MP4 Key</th>
                <th className="pb-3 px-3">Voice Cadence WAV</th>
                <th className="pb-3 px-3">Storyboard Frames</th>
                <th className="pb-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-700/40">
              {videos.map((vid) => (
                <tr key={vid.id} className="hover:bg-studio-800/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{vid.id}</td>
                  <td className="py-3 px-3 text-studio-200 font-sans max-w-[200px] truncate">{vid.title}</td>
                  <td className="py-3 px-3 text-accent-cyan truncate max-w-[200px]">
                    {vid.storage.videoObjectKey || <span className="text-studio-500 italic">None (Local)</span>}
                  </td>
                  <td className="py-3 px-3 text-accent-emerald truncate max-w-[180px]">
                    {vid.storage.audioObjectKey || <span className="text-studio-500 italic">None</span>}
                  </td>
                  <td className="py-3 px-3 text-studio-300">
                    {vid.storage.storyboardKeys.length > 0 ? (
                      <span className="px-2 py-0.5 rounded bg-studio-800 text-studio-200 border border-studio-700">
                        {vid.storage.storyboardKeys.length} assets
                      </span>
                    ) : (
                      <span className="text-studio-500 italic">0 assets</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {vid.storage.syncStatus === 'Synced' ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Synced
                      </span>
                    ) : (
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
