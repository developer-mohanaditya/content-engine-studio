'use client';

import React, { useState } from 'react';
import { VideoItem, MultiShotItem, ContinuousMovementCue } from '@/types/content';
import { 
  Film, 
  Layers, 
  Video, 
  Camera, 
  Clock, 
  Play, 
  Eye,
  Activity,
  Smartphone
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
      <div className="p-4 sm:p-5 rounded-xl bg-studio-900 border border-studio-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-studio-800 text-white font-bold border border-studio-700">
              REEL #{video.videoNumber}
            </span>
            <span className="text-xs text-studio-400 font-mono">
              {video.title}
            </span>
          </div>
          <h2 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <Film className="w-4 h-4 text-white" />
            Visual Storyboard & Camera Blocking
          </h2>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex items-center bg-studio-950 p-1 rounded-lg border border-studio-800">
          <button
            onClick={() => setViewMode('multi-shot')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all ${
              viewMode === 'multi-shot'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-studio-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Multi-Shot ({video.multiShotBreakdown.length})
          </button>

          <button
            onClick={() => setViewMode('continuous')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all ${
              viewMode === 'continuous'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-studio-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            1-Take Continuous
          </button>
        </div>
      </div>

      {/* Mode A: Multi-Shot Cut Breakdown */}
      {viewMode === 'multi-shot' && (
        <div className="space-y-6">
          {/* Shot Sequence Bar */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b border-studio-800">
            {video.multiShotBreakdown.map((shot, idx) => {
              const isCurrent = idx === selectedShotIndex;
              return (
                <button
                  key={shot.shotNumber}
                  onClick={() => setSelectedShotIndex(idx)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-lg border text-left transition-all font-mono ${
                    isCurrent
                      ? 'bg-studio-850 border-white text-white'
                      : 'bg-studio-900 border-studio-800 text-studio-400 hover:border-studio-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-xs mb-1">
                    <span className="font-bold">Shot #{shot.shotNumber}</span>
                    <span className="text-[10px] text-studio-500">{shot.durationSec}s</span>
                  </div>
                  <div className="text-xs truncate max-w-[140px] text-studio-300">
                    {shot.cameraFraming}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Shot Detail */}
          {currentMultiShot && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: 9:16 Mock Viewport */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[280px] aspect-[9/16] rounded-2xl bg-studio-950 border border-studio-700 p-5 flex flex-col justify-between relative shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none border border-studio-800/40 m-4 rounded-xl flex items-center justify-center">
                    <div className="w-full h-[1px] bg-studio-800/20"></div>
                    <div className="absolute h-full w-[1px] bg-studio-800/20"></div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-studio-400">
                    <span className="px-2 py-0.5 rounded bg-studio-800 text-white font-bold">
                      SHOT #{currentMultiShot.shotNumber}
                    </span>
                    <span>{currentMultiShot.durationSec}s</span>
                  </div>

                  <div className="relative z-10 text-center space-y-2 my-auto">
                    <div className="w-12 h-12 mx-auto rounded-full bg-studio-850 border border-studio-700 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs font-mono font-bold text-white uppercase">
                      {currentMultiShot.cameraFraming}
                    </div>
                    <p className="text-[11px] text-studio-300 px-3 leading-snug">
                      {currentMultiShot.visualAction}
                    </p>
                  </div>

                  <div className="relative z-10 pt-2 border-t border-studio-800 text-center">
                    <span className="text-[10px] font-mono text-studio-500">
                      Safe 9:16 Feed Safe-Zone
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Execution Specifications */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 rounded-xl bg-studio-900 border border-studio-800 space-y-4 font-mono">
                  <div className="flex items-center justify-between border-b border-studio-800 pb-3">
                    <div className="text-xs uppercase text-studio-500">Camera Setup</div>
                    <div className="text-xs text-white font-bold">{currentMultiShot.cameraFraming}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs uppercase text-studio-500">Visual Action / Motion</div>
                    <div className="text-sm font-sans text-studio-200 leading-relaxed">
                      {currentMultiShot.visualAction}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs uppercase text-studio-500">Vocal Guide & Shadowing Cue</div>
                    <div className="p-3.5 rounded bg-studio-950 border border-studio-800 text-xs font-sans text-studio-300 italic leading-relaxed">
                      "{currentMultiShot.vocalCue}"
                    </div>
                  </div>

                  {currentMultiShot.onScreenText && (
                    <div className="space-y-1">
                      <div className="text-xs uppercase text-studio-500">On-Screen Graphic / Text</div>
                      <div className="p-2.5 rounded bg-studio-800 text-xs text-white">
                        {currentMultiShot.onScreenText}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={onNavigateToCadence}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-studio-200 text-black text-xs font-bold transition-all"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Audition Cadence for Shot #{currentMultiShot.shotNumber}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode B: 1-Take Continuous Blocking */}
      {viewMode === 'continuous' && video.continuousBlocking && (
        <div className="p-6 rounded-xl bg-studio-900 border border-studio-800 space-y-6 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-studio-800">
            <div>
              <div className="text-xs text-studio-500 uppercase">Camera Setup & Rig</div>
              <div className="text-sm text-white font-bold mt-1 font-sans">
                {video.continuousBlocking.cameraSetup}
              </div>
            </div>
            <div>
              <div className="text-xs text-studio-500 uppercase">Lighting & Physical Environment</div>
              <div className="text-sm text-white font-bold mt-1 font-sans">
                {video.continuousBlocking.lighting}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-studio-500 uppercase mb-3">Continuous Gaze & Gesture Timeline</div>
            <div className="space-y-3">
              {video.continuousBlocking.movementTimeline.map((cue, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-studio-950 border border-studio-800 flex items-start gap-4"
                >
                  <span className="px-2 py-0.5 rounded bg-studio-800 text-white font-bold text-xs">
                    {cue.timestampSec}s
                  </span>
                  <div className="space-y-1">
                    <div className="text-xs text-white font-bold font-sans">
                      {cue.action}
                    </div>
                    <div className="text-xs text-studio-400 font-sans">
                      Gaze Target: <strong className="text-studio-200">{cue.gazeDirection}</strong>
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
