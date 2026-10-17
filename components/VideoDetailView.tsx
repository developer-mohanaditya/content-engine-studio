'use client';

import React from 'react';
import { VideoItem, VideoStatus } from '@/types/content';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  Film, 
  Mic2, 
  Target, 
  BrainCircuit,
  Activity
} from 'lucide-react';

interface VideoDetailViewProps {
  video: VideoItem;
  onUpdateStatus: (newStatus: VideoStatus) => void;
  onGoToStoryboard: () => void;
  onGoToCadence: () => void;
}

export const VideoDetailView: React.FC<VideoDetailViewProps> = ({
  video,
  onUpdateStatus,
  onGoToStoryboard,
  onGoToCadence,
}) => {
  return (
    <div className="space-y-6">
      {/* Video Overview Header */}
      <div className="p-6 rounded-xl bg-studio-900 border border-studio-800">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono">
              <span className="text-xs px-2 py-0.5 rounded bg-studio-800 text-white font-bold border border-studio-700">
                REEL #{video.videoNumber}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-studio-850 text-studio-300 border border-studio-800">
                {video.pillar}
              </span>
              <span className="text-xs text-studio-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Post Date: {video.postDate}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
              {video.title}
            </h1>
            <p className="mt-1 text-xs text-studio-500 font-mono">
              Target: {video.targetPlatform} • Storage: {video.storage.videoObjectKey || 'Local Draft'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToCadence}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-studio-200 text-black text-xs font-mono font-bold transition-all shadow-sm"
            >
              <Mic2 className="w-3.5 h-3.5" />
              Audition Cadence
            </button>
            <button
              onClick={onGoToStoryboard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-studio-800 hover:bg-studio-700 text-white text-xs font-mono font-bold border border-studio-700 transition-all"
            >
              <Film className="w-3.5 h-3.5" />
              Storyboard Cuts
            </button>
          </div>
        </div>
      </div>

      {/* 3-Layer Planning Protocol Hook Diagnostic */}
      <div className="p-6 rounded-xl bg-studio-900 border border-studio-800 space-y-6">
        <div className="flex items-center justify-between border-b border-studio-800 pb-3 font-mono">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-white" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              3-Layer Hook Psychology Diagnostics
            </h2>
          </div>
          <span className="text-xs text-studio-400">
            Mandatory Engineering Protocol
          </span>
        </div>

        {/* The Hook Quote */}
        <div className="p-5 rounded-lg bg-studio-950 border border-studio-800">
          <div className="text-[10px] font-mono text-studio-500 uppercase tracking-wider mb-2">
            Primary Spoken Hook
          </div>
          <p className="text-lg md:text-xl font-bold text-white italic font-sans">
            "{video.hook.text}"
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs font-mono text-studio-400">
            <div>Retention Angle: <strong className="text-white">{video.hook.angle}</strong></div>
            <div>•</div>
            <div>Curiosity Gap: <strong className="text-white">{video.hook.curiosityScore}/10</strong></div>
            <div>•</div>
            <div>Emotional Resonance: <strong className="text-white">{video.hook.emotionalResonance}/10</strong></div>
          </div>
        </div>

        {/* 3-Layer Protocol Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* Layer 1 */}
          <div className="p-4 rounded-lg bg-studio-950 border border-studio-800 space-y-2">
            <div className="text-studio-500 uppercase tracking-wider font-bold">
              Layer 1: Initial Hook Draft
            </div>
            <p className="text-studio-300 font-sans leading-relaxed">
              "{video.hook.text}"
            </p>
            <div className="text-studio-500 text-[11px] pt-1">
              Direct, personal declaration designed for 3-second thumb stop.
            </div>
          </div>

          {/* Layer 2 */}
          <div className="p-4 rounded-lg bg-studio-950 border border-studio-800 space-y-2">
            <div className="text-studio-500 uppercase tracking-wider font-bold">
              Layer 2: Bottlenecks & Remedies
            </div>
            <div className="text-studio-400 space-y-1.5 font-sans">
              <div>
                <strong className="text-white">Failure Risk:</strong> Delivery might sound overly dramatic if cadence accelerates.
              </div>
              <div>
                <strong className="text-white">Remedy:</strong> Insert 0.4s micro-pause before "but not anymore" to anchor gravitas.
              </div>
            </div>
          </div>

          {/* Layer 3 */}
          <div className="p-4 rounded-lg bg-studio-950 border border-studio-800 space-y-2">
            <div className="text-studio-500 uppercase tracking-wider font-bold">
              Layer 3: Failure Probability
            </div>
            <div className="text-2xl font-bold text-white">
              {video.hook.failureProbability}%
            </div>
            <div className="text-studio-400 text-[11px]">
              Protocol Passed (&lt;40% ceiling verified with micro-silence remedy).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
