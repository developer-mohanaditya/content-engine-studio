'use client';

import React, { useState } from 'react';
import { VideoItem, VideoStatus, ContentPillar } from '@/types/content';
import { 
  Calendar, 
  Filter, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  Layers, 
  Play, 
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface CalendarViewProps {
  videos: VideoItem[];
  selectedVideo: VideoItem;
  onSelectVideo: (video: VideoItem) => void;
  onNavigateToStoryboard: (video: VideoItem) => void;
  onNavigateToCadence: (video: VideoItem) => void;
  onAddNewVideo: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  videos,
  selectedVideo,
  onSelectVideo,
  onNavigateToStoryboard,
  onNavigateToCadence,
  onAddNewVideo,
}) => {
  const [filterPillar, setFilterPillar] = useState<'all' | ContentPillar>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | VideoStatus>('all');

  const filteredVideos = videos.filter((v) => {
    const matchesPillar = filterPillar === 'all' || v.pillar === filterPillar;
    const matchesStatus = filterStatus === 'all' || v.status === filterStatus;
    return matchesPillar && matchesStatus;
  });

  // Calculate actual ratio
  const techCount = videos.filter((v) => v.pillar === 'Tech Building (60%)').length;
  const journalCount = videos.filter((v) => v.pillar === 'Personal Journal (40%)').length;
  const totalCount = videos.length;
  const techPercent = totalCount > 0 ? Math.round((techCount / totalCount) * 100) : 60;
  const journalPercent = 100 - techPercent;

  const getStatusBadge = (status: VideoStatus) => {
    switch (status) {
      case 'Ready to Post':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ready to Post</span>;
      case 'Recorded':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1"><Clock className="w-3 h-3" /> Recorded</span>;
      case 'Storyboarded':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1"><Layers className="w-3 h-3" /> Storyboarded</span>;
      case 'Scripting':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1"><FileText className="w-3 h-3" /> Scripting</span>;
      case 'Idea':
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/30 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Idea Stage</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Superego Metric Balance (60% Tech / 40% Journal) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-studio-850 p-4 rounded-xl border border-studio-700/70 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-studio-400 uppercase tracking-wider">Content Pillar Balance</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-studio-700 text-studio-200">Superego Target: 60/40</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="text-2xl font-bold font-mono text-white">{techPercent}% <span className="text-xs font-normal text-studio-400">Tech</span></div>
            <div className="text-studio-500">/</div>
            <div className="text-2xl font-bold font-mono text-accent-violet">{journalPercent}% <span className="text-xs font-normal text-studio-400">Journal</span></div>
          </div>
          <div className="mt-3 w-full bg-studio-800 rounded-full h-2 overflow-hidden flex">
            <div style={{ width: `${techPercent}%` }} className="bg-accent-cyan h-full"></div>
            <div style={{ width: `${journalPercent}%` }} className="bg-accent-violet h-full"></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-studio-850 p-4 rounded-xl border border-studio-700/70 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-studio-400 uppercase tracking-wider">Planned Releases</span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Oct 2026</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <div className="text-2xl font-bold font-mono text-white">{videos.length}</div>
            <div className="text-xs text-studio-400">Active Pipeline Reels</div>
          </div>
          <div className="mt-3 text-xs text-studio-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Next Shoot: <strong className="text-studio-200">Reel #1 (Tomorrow 10:00)</strong></span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-studio-850 p-4 rounded-xl border border-studio-700/70 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-studio-400 uppercase tracking-wider">Avg Hook Failure Risk</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Protocol Passed (&lt;40%)</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <div className="text-2xl font-bold font-mono text-accent-emerald">18.5%</div>
            <div className="text-xs text-studio-400">Residual Risk (Remedies applied)</div>
          </div>
          <div className="mt-3 text-xs text-studio-400">
            Estimated 3-second retention threshold: <strong className="text-studio-200">80%+</strong>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-studio-850/80 rounded-xl border border-studio-700/50">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-studio-400 font-mono mr-2">
            <Filter className="w-3.5 h-3.5 text-studio-400" /> Filter:
          </div>

          {/* Pillar Filters */}
          <div className="flex items-center bg-studio-900 rounded-lg p-0.5 border border-studio-700">
            <button
              onClick={() => setFilterPillar('all')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                filterPillar === 'all' ? 'bg-studio-700 text-white' : 'text-studio-400 hover:text-white'
              }`}
            >
              All Pillars
            </button>
            <button
              onClick={() => setFilterPillar('Tech Building (60%)')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                filterPillar === 'Tech Building (60%)' ? 'bg-accent-cyan/20 text-accent-cyan' : 'text-studio-400 hover:text-white'
              }`}
            >
              Tech (60%)
            </button>
            <button
              onClick={() => setFilterPillar('Personal Journal (40%)')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                filterPillar === 'Personal Journal (40%)' ? 'bg-accent-violet/20 text-accent-violet' : 'text-studio-400 hover:text-white'
              }`}
            >
              Journal (40%)
            </button>
          </div>

          {/* Status Filters */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-studio-900 border border-studio-700 text-studio-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-accent-cyan"
          >
            <option value="all">All Statuses</option>
            <option value="Idea">Idea</option>
            <option value="Scripting">Scripting</option>
            <option value="Storyboarded">Storyboarded</option>
            <option value="Recorded">Recorded</option>
            <option value="Ready to Post">Ready to Post</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <button
          onClick={onAddNewVideo}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-cyan text-studio-900 font-semibold text-xs rounded-lg hover:bg-cyan-400 transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Propose Video
        </button>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredVideos.map((video) => {
          const isSelected = selectedVideo.id === video.id;
          return (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className={`group cursor-pointer rounded-xl p-5 transition-all border ${
                isSelected
                  ? 'bg-studio-800/90 border-accent-cyan/60 shadow-lg shadow-accent-cyan/5 ring-1 ring-accent-cyan/30'
                  : 'bg-studio-850 hover:bg-studio-800/60 border-studio-700/60 hover:border-studio-600'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-studio-700 font-mono font-bold text-xs text-white flex items-center justify-center">
                    #{video.videoNumber}
                  </span>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    video.pillar.includes('Tech')
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                  }`}>
                    {video.pillar}
                  </span>
                </div>
                <div>{getStatusBadge(video.status)}</div>
              </div>

              {/* Title & Post Date */}
              <div className="mt-3">
                <h3 className="text-base font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {video.title}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-studio-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {video.postDate}
                  </span>
                  <span>•</span>
                  <span>{video.targetPlatform}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{video.hook.estimatedFailureRisk}% Risk</span>
                </div>
              </div>

              {/* Hook Quote Box */}
              <div className="mt-3.5 p-3 rounded-lg bg-studio-900/90 border border-studio-700/40 text-xs">
                <div className="text-[10px] font-mono text-studio-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-accent-amber" /> Opening Hook (First 3 Seconds)
                </div>
                <p className="text-studio-200 italic font-medium">
                  &ldquo;{video.hook.text}&rdquo;
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-studio-700/40 flex items-center justify-between">
                <div className="text-[11px] text-studio-400 font-mono flex items-center gap-2">
                  <span>{video.scriptSegments.length} Segments</span>
                  <span>•</span>
                  <span>{video.multiShotBreakdown.length > 0 ? `${video.multiShotBreakdown.length} Multi-shots` : '1-Take Continuous'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVideo(video);
                      onNavigateToCadence(video);
                    }}
                    className="p-1.5 rounded-lg bg-studio-700/60 hover:bg-accent-emerald hover:text-studio-950 text-studio-300 transition-colors"
                    title="Play Cadence Script"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVideo(video);
                      onNavigateToStoryboard(video);
                    }}
                    className="p-1.5 rounded-lg bg-studio-700/60 hover:bg-accent-cyan hover:text-studio-950 text-studio-300 transition-colors"
                    title="View Storyboards"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
