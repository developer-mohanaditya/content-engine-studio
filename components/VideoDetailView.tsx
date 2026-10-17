'use client';

import React from 'react';
import { VideoItem, VideoStatus } from '@/types/content';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Zap, 
  Calendar, 
  Film, 
  Mic2, 
  Layers, 
  Eye, 
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
      <div className="p-6 rounded-2xl bg-studio-850 border border-studio-700/80 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-studio-700 text-white font-bold">
                REEL #{video.videoNumber}
              </span>
              <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full ${
                video.pillar.includes('Tech')
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
              }`}>
                {video.pillar}
              </span>
              <span className="text-xs text-studio-400 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Post Date: {video.postDate}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {video.title}
            </h1>
            <p className="mt-1 text-xs text-studio-400 font-mono">
              Target: {video.targetPlatform} • Storage Key: <span className="text-studio-300">{video.storage.videoObjectKey || 'Local Draft'}</span>
            </p>
          </div>

          {/* Status Selector */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] font-mono text-studio-400 uppercase">Workflow State</div>
              <select
                value={video.status}
                onChange={(e) => onUpdateStatus(e.target.value as VideoStatus)}
                className="mt-1 bg-studio-900 border border-studio-600 text-white text-xs rounded-lg px-3 py-1.5 font-medium focus:ring-1 focus:ring-accent-cyan"
              >
                <option value="Idea">Idea</option>
                <option value="Scripting">Scripting</option>
                <option value="Storyboarded">Storyboarded</option>
                <option value="Recorded">Recorded</option>
                <option value="Ready to Post">Ready to Post</option>
                <option value="Published">Published</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onGoToStoryboard}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-studio-700/80 hover:bg-studio-700 text-white text-xs font-semibold border border-studio-600 transition-colors"
              >
                <Film className="w-3.5 h-3.5 text-accent-cyan" />
                Storyboard
              </button>
              <button
                onClick={onGoToCadence}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent-cyan text-studio-950 text-xs font-bold hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/10"
              >
                <Mic2 className="w-3.5 h-3.5" />
                Live Cadence
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Layer Hook Psychology & Superego Analysis */}
      <div className="p-6 rounded-2xl bg-studio-850 border border-studio-700/80 shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-studio-700/60 pb-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-accent-cyan" />
            <h2 className="text-base font-bold text-white tracking-wide">3-Layer Hook Psychology & Risk Protocol</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-studio-400">Calculated Failure Risk:</span>
            <span className="px-2.5 py-0.5 rounded-full font-mono text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {video.hook.estimatedFailureRisk}% (Safe &lt;40%)
            </span>
          </div>
        </div>

        {/* Layer 1: The Hook & Opening Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-studio-900/90 border border-studio-700/60">
            <div className="text-[11px] font-mono uppercase tracking-wider text-accent-cyan flex items-center gap-1.5 mb-2 font-semibold">
              <Zap className="w-3.5 h-3.5 text-accent-cyan" /> Spoken Hook (First 3 Seconds)
            </div>
            <div className="text-lg font-bold text-white tracking-tight italic">
              &ldquo;{video.hook.text}&rdquo;
            </div>
            <div className="mt-3 text-xs text-studio-400">
              <span className="text-studio-300 font-semibold">Cadence Rule:</span> No intro slides. No greetings. High vocal conviction on first 5 syllables.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-studio-900/90 border border-studio-700/60">
            <div className="text-[11px] font-mono uppercase tracking-wider text-accent-amber flex items-center gap-1.5 mb-2 font-semibold">
              <Eye className="w-3.5 h-3.5 text-accent-amber" /> Opening Visual Blocking
            </div>
            <p className="text-sm text-studio-200 leading-relaxed">
              {video.hook.visualOpening}
            </p>
            <div className="mt-3 text-xs text-studio-400">
              <span className="text-studio-300 font-semibold">Visual Trigger:</span> High-contrast motion in first 0.8s to halt thumb scrolling.
            </div>
          </div>
        </div>

        {/* Layer 2: Psychological Drivers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-studio-900/60 border border-studio-700/40">
            <div className="text-[11px] font-mono uppercase text-studio-400 mb-1 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-accent-cyan" /> Retention Angle
            </div>
            <p className="text-xs text-studio-200 font-medium">
              {video.hook.retentionAngle}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-studio-900/60 border border-studio-700/40">
            <div className="text-[11px] font-mono uppercase text-studio-400 mb-1 flex items-center gap-1">
              <BrainCircuit className="w-3.5 h-3.5 text-accent-violet" /> Curiosity Gap
            </div>
            <p className="text-xs text-studio-200 font-medium">
              {video.hook.curiosityGap}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-studio-900/60 border border-studio-700/40">
            <div className="text-[11px] font-mono uppercase text-studio-400 mb-1 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-accent-emerald" /> Emotional Resonance
            </div>
            <p className="text-xs text-studio-200 font-medium">
              {video.hook.emotionalResonance}
            </p>
          </div>
        </div>

        {/* Layer 3: Superego Failure Analysis & Engineered Remedy */}
        <div className="p-4 rounded-xl bg-studio-900 border border-studio-700/80">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
              Superego Bottleneck & Failure Mode Analysis
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/30">
              <div className="text-[10px] font-mono text-red-400 uppercase font-semibold mb-1">Identified Failure Risk:</div>
              <p className="text-xs text-red-200/90 leading-relaxed">
                {video.hook.riskAnalysis}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold mb-1">Engineered Technical Remedy:</div>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {video.hook.riskRemedy}
              </p>
            </div>
          </div>

          {/* Retention Curve Projection */}
          <div className="mt-4 pt-3 border-t border-studio-800 flex items-center justify-between text-xs text-studio-400 font-mono">
            <span>Algorithmic Retention Model:</span>
            <span className="text-studio-200 font-medium">{video.hook.audienceRetentionEstimate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
