'use client';

import React, { useState } from 'react';
import { VideoItem, MultiShotItem, ContinuousMovementCue } from '@/types/content';
import { 
  Film, 
  Layers, 
  Maximize2, 
  Video, 
  Camera, 
  Clock, 
  Sliders, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  Zap, 
  Smartphone,
  Eye,
  Activity
} from 'lucide-react';

interface StoryboardViewProps {
  video: VideoItem;
  onNavigateToCadence: () => void;
}

export const StoryboardView: React.FC<StoryboardViewProps> = ({
  video,
  onNavigateToCadence
}) => {
  const [viewMode, setViewMode] = useState<'multi-shot' | 'continuous'>(
    video.storyboardMode || 'multi-shot'
  );
  const [selectedShotIndex, setSelectedShotIndex] = useState<number>(0);

  const currentMultiShot: MultiShotItem | undefined = 
    video.multiShotBreakdown && video.multiShotBreakdown.length > 0 
      ? video.multiShotBreakdown[selectedShotIndex] || video.multiShotBreakdown[0]
      : undefined;

  return (
    <div className="space-y-6">
      {/* Header & Mode Switcher */}
      <div className="p-4 sm:p-5 rounded-2xl bg-studio-850 border border-studio-700/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-studio-700 text-white font-bold">
              REEL #{video.videoNumber}
            </span>
            <span className="text-xs text-studio-400 font-mono">
              {video.title}
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-accent-cyan" />
            Visual Storyboard & Blocking Director
          </h2>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex items-center bg-studio-900 p-1 rounded-xl border border-studio-700">
          <button
            onClick={() => setViewMode('multi-shot')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'multi-shot'
                ? 'bg-accent-cyan text-studio-950 shadow-md shadow-cyan-500/10'
                : 'text-studio-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Multi-Shot Cut Breakdown ({video.multiShotBreakdown.length})
          </button>

          <button
            onClick={() => setViewMode('continuous')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'continuous'
                ? 'bg-accent-violet text-white shadow-md shadow-violet-500/10'
                : 'text-studio-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            1-Take Continuous Blocking
          </button>
        </div>
      </div>

      {/* Mode A: Multi-Shot Cut Breakdown */}
      {viewMode === 'multi-shot' && (
        <div className="space-y-6">
          {video.multiShotBreakdown.length === 0 ? (
            <div className="p-8 text-center bg-studio-850 rounded-2xl border border-studio-700 text-studio-400">
              <Layers className="w-8 h-8 mx-auto text-studio-600 mb-2" />
              <p>No multi-shot cuts configured for this video. Switching to continuous blocking mode.</p>
              <button 
                onClick={() => setViewMode('continuous')} 
                className="mt-3 px-3 py-1.5 rounded-lg bg-studio-700 text-white text-xs"
              >
                View Continuous Blocking
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: 9:16 Vertical Viewport Mock Simulator */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[300px] aspect-[9/16] rounded-3xl bg-studio-900 border-4 border-studio-700 relative overflow-hidden shadow-2xl flex flex-col justify-between p-4">
                  {/* Overlay Instagram Safe Zone Grid */}
                  <div className="absolute inset-0 pointer-events-none border border-dashed border-white/10 m-2 rounded-2xl"></div>

                  {/* Top Bar Simulator */}
                  <div className="flex items-center justify-between text-[10px] text-white/60 font-mono z-10">
                    <span className="bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      SHOT #{currentMultiShot?.shotNumber} / {video.multiShotBreakdown.length}
                    </span>
                    <span className="bg-accent-cyan/20 text-accent-cyan px-2 py-0.5 rounded backdrop-blur-sm font-bold">
                      {currentMultiShot?.durationSec}s
                    </span>
                  </div>

                  {/* Center Mock Visual Cue Canvas */}
                  <div className="my-auto text-center p-4 rounded-xl bg-studio-850/80 border border-studio-700/60 backdrop-blur-sm z-10">
                    <div className="w-12 h-12 mx-auto rounded-full bg-studio-800 border border-studio-600 flex items-center justify-center text-accent-cyan mb-2">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      {currentMultiShot?.shotType}
                    </div>
                    <p className="text-[11px] text-studio-300 mt-2 line-clamp-3">
                      {currentMultiShot?.visualCue}
                    </p>
                  </div>

                  {/* Bottom Instagram Reels Interface Overlay Simulator */}
                  <div className="space-y-2 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent-cyan/30 border border-accent-cyan flex items-center justify-center text-[10px] font-bold text-white">
                        M
                      </div>
                      <span className="text-xs font-bold text-white drop-shadow">developer-mohanaditya</span>
                    </div>
                    <div className="text-[11px] text-white/90 line-clamp-2 drop-shadow bg-black/30 p-1.5 rounded backdrop-blur-xs">
                      {video.hook.text}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center text-xs text-studio-400 font-mono">
                  9:16 Mobile Viewport Safe-Zone Preview
                </div>
              </div>

              {/* Right Column: Shot Sequencing Cards */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-studio-400 mb-1">
                  <span>Shot Timeline Sequence</span>
                  <span>Total Visual Duration: {video.multiShotBreakdown.reduce((acc, s) => acc + s.durationSec, 0).toFixed(1)}s</span>
                </div>

                {video.multiShotBreakdown.map((shot, idx) => {
                  const isActive = selectedShotIndex === idx;
                  return (
                    <div
                      key={shot.shotNumber}
                      onClick={() => setSelectedShotIndex(idx)}
                      className={`p-4 rounded-xl cursor-pointer transition-all border ${
                        isActive
                          ? 'bg-studio-800 border-accent-cyan/70 shadow-md ring-1 ring-accent-cyan/30'
                          : 'bg-studio-850 hover:bg-studio-800/60 border-studio-700/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                            isActive ? 'bg-accent-cyan text-studio-950' : 'bg-studio-700 text-white'
                          }`}>
                            {shot.shotNumber}
                          </span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-studio-750 text-studio-200 border border-studio-650">
                            {shot.shotType}
                          </span>
                          <span className="text-xs text-studio-400 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {shot.durationSec}s
                          </span>
                        </div>
                        {shot.r2AssetKey && (
                          <span className="text-[10px] font-mono text-studio-400 bg-studio-900 px-2 py-0.5 rounded">
                            R2 Asset Mapped
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-[10px] font-mono text-studio-400 uppercase">Camera Angle / Rig:</div>
                          <div className="text-studio-200 font-medium">{shot.cameraAngle}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-studio-400 uppercase">Framing & Action:</div>
                          <div className="text-studio-200">{shot.framingAction}</div>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-studio-700/40 text-[11px] text-accent-cyan/90 font-mono">
                        Visual Cue: {shot.visualCue}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode B: One Continuous Take Blocking */}
      {viewMode === 'continuous' && (
        <div className="space-y-6">
          {/* Setup Specifications Card */}
          <div className="p-5 rounded-2xl bg-studio-850 border border-studio-700/80 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2 mb-4">
              <Camera className="w-4 h-4 text-accent-violet" /> Physical Studio Setup & Rigging
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-studio-900/90 border border-studio-700/60">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Framing Strategy</span>
                <span className="text-studio-200 font-medium">{video.continuousBlocking.framing}</span>
              </div>

              <div className="p-3 rounded-xl bg-studio-900/90 border border-studio-700/60">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Camera Distance / Height</span>
                <span className="text-studio-200 font-medium">{video.continuousBlocking.cameraPosition}</span>
              </div>

              <div className="p-3 rounded-xl bg-studio-900/90 border border-studio-700/60">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Lighting Cues</span>
                <span className="text-studio-200 font-medium">{video.continuousBlocking.lightingNotes}</span>
              </div>

              <div className="p-3 rounded-xl bg-studio-900/90 border border-studio-700/60">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Audio Gear Setup</span>
                <span className="text-studio-200 font-medium">{video.continuousBlocking.audioGear}</span>
              </div>
            </div>
          </div>

          {/* Movement & Gesture Timeline */}
          <div className="p-5 rounded-2xl bg-studio-850 border border-studio-700/80 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-cyan" /> Movement, Gesture & Gaze Timeline
              </h3>
              <span className="text-xs text-studio-400 font-mono">
                {video.continuousBlocking.movementCues.length} Cue Points
              </span>
            </div>

            <div className="relative pl-6 border-l-2 border-studio-700 space-y-6 my-2">
              {video.continuousBlocking.movementCues.map((cue, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-studio-900 border-2 border-accent-cyan group-hover:scale-125 transition-transform"></div>

                  <div className="p-4 rounded-xl bg-studio-900/90 border border-studio-700/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-studio-750 text-accent-cyan font-bold">
                        {cue.timeSec.toFixed(1)}s Mark
                      </span>
                      <span className="text-xs text-studio-300 font-semibold">{cue.cue}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-2">
                      <div>
                        <span className="text-[10px] font-mono text-studio-400 uppercase block">Physical Gesture:</span>
                        <p className="text-studio-200">{cue.gesture}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-studio-400 uppercase block">Spatial Framing:</span>
                        <p className="text-studio-200">{cue.position}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-studio-400 uppercase block">Vocal Delivery Shift:</span>
                        <p className="text-accent-emerald font-mono">{cue.vocalTransition}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
