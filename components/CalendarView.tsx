'use client';

import React, { useState } from 'react';
import { VideoItem, ContentPillar, VideoStatus } from '@/types/content';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Play, 
  Film, 
  ChevronRight,
  TrendingUp,
  AlertTriangle
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
  const [filterPillar, setFilterPillar] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredVideos = videos.filter((v) => {
    if (filterPillar !== 'all' && v.pillar !== filterPillar) return false;
    if (filterStatus !== 'all' && v.status !== filterStatus) return false;
    return true;
  });

  const techCount = videos.filter((v) => v.pillar === 'Tech Building (60%)').length;
  const journalCount = videos.filter((v) => v.pillar === 'Personal Journal (40%)').length;
  const total = videos.length || 1;
  const techRatio = Math.round((techCount / total) * 100);
  const journalRatio = Math.round((journalCount / total) * 100);

  return (
    <div className="space-y-6">
      {/* Top Metric Strip (Cinema Slate) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-studio-900 border border-studio-800">
          <div className="text-xs text-studio-500 font-mono uppercase tracking-wider mb-1">
            Pillar Distribution
          </div>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-2xl font-bold text-white">{techRatio}%</span>
            <span className="text-xs text-studio-400">Tech</span>
            <span className="text-studio-600">/</span>
            <span className="text-2xl font-bold text-white">{journalRatio}%</span>
            <span className="text-xs text-studio-400">Journal</span>
          </div>
          <div className="mt-2 w-full bg-studio-800 h-1 rounded-full overflow-hidden flex">
            <div className="bg-white h-full" style={{ width: `${techRatio}%` }}></div>
            <div className="bg-studio-600 h-full" style={{ width: `${journalRatio}%` }}></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-studio-900 border border-studio-800">
          <div className="text-xs text-studio-500 font-mono uppercase tracking-wider mb-1">
            Production Pipeline
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {videos.length} <span className="text-sm font-normal text-studio-400">Planned Reels</span>
          </div>
          <p className="mt-1 text-xs text-studio-400 font-mono">
            Next Shoot: Reel #1 (Oct 18, 2026)
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-studio-900 border border-studio-800">
          <div className="text-xs text-studio-500 font-mono uppercase tracking-wider mb-1">
            Hook Risk Benchmark
          </div>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-2xl font-bold text-white">18.5%</span>
            <span className="text-xs text-studio-400">Avg Residual Risk</span>
          </div>
          <p className="mt-1 text-xs text-studio-500 font-mono">
            Protocol Passed (&lt;40% ceiling verified)
          </p>
        </div>
      </div>

      {/* Filter and Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-studio-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-studio-500 uppercase tracking-wider">Filter:</span>
          <button
            onClick={() => setFilterPillar('all')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              filterPillar === 'all' ? 'bg-white text-black font-bold' : 'text-studio-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterPillar('Tech Building (60%)')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              filterPillar === 'Tech Building (60%)' ? 'bg-white text-black font-bold' : 'text-studio-400 hover:text-white'
            }`}
          >
            Tech (60%)
          </button>
          <button
            onClick={() => setFilterPillar('Personal Journal (40%)')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              filterPillar === 'Personal Journal (40%)' ? 'bg-white text-black font-bold' : 'text-studio-400 hover:text-white'
            }`}
          >
            Journal (40%)
          </button>
        </div>

        <button
          onClick={onAddNewVideo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-studio-200 text-black text-xs font-mono font-bold transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Propose Video
        </button>
      </div>

      {/* Reel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVideos.map((video) => {
          const isSelected = video.id === selectedVideo.id;

          return (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-studio-850 border-white shadow-xl'
                  : 'bg-studio-900 border-studio-800 hover:border-studio-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-studio-800 text-white font-bold border border-studio-700">
                    Reel #{video.videoNumber}
                  </span>
                  <span className="text-xs font-mono text-studio-400">
                    {video.pillar === 'Tech Building (60%)' ? 'Tech' : 'Journal'}
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded border border-studio-700 text-studio-300">
                  {video.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                {video.title}
              </h3>

              <div className="p-3 rounded bg-studio-950 border border-studio-800/80 mb-3 text-xs text-studio-300 italic font-sans leading-relaxed">
                "{video.hook.text}"
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-studio-800 text-xs font-mono">
                <span className="text-studio-500">{video.postDate}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVideo(video);
                      onNavigateToCadence(video);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-studio-800 hover:bg-white hover:text-black text-white transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    Teleprompter
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVideo(video);
                      onNavigateToStoryboard(video);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-studio-800 hover:bg-white hover:text-black text-white transition-colors"
                  >
                    <Film className="w-3 h-3" />
                    Storyboard
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
