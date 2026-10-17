'use client';

import React, { useState } from 'react';
import { INSTAGRAM_BENCHMARKS, CreatorBenchmark } from '@/types/benchmarks';
import { 
  Users, 
  ExternalLink, 
  Mic2, 
  Activity, 
  Camera, 
  Clock, 
  ShieldCheck, 
  Target
} from 'lucide-react';

export const BenchmarksView: React.FC = () => {
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('BENCH-01');

  const selectedCreator: CreatorBenchmark = 
    INSTAGRAM_BENCHMARKS.find((c) => c.id === selectedCreatorId) || INSTAGRAM_BENCHMARKS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-studio-900 border border-studio-800">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded bg-studio-800 text-white font-bold border border-studio-700">
                Verified Instagram Creators
              </span>
              <span className="text-xs text-studio-500">
                Vocal Cadence Benchmarking
              </span>
            </div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
              <Users className="w-4 h-4 text-white" />
              Creator Vocal Cadence & Physical Shadowing
            </h2>
            <p className="mt-1 text-xs text-studio-400 font-sans">
              Deconstructed cadence metrics, timing pauses, pitch curves, and physical blocking patterns to mirror across your 60% Tech / 40% Journal reels.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-studio-950 border border-studio-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="text-white">5 Verified Creators</span>
          </div>
        </div>
      </div>

      {/* Creator Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono">
        {INSTAGRAM_BENCHMARKS.map((creator) => {
          const isSelected = creator.id === selectedCreator.id;
          return (
            <button
              key={creator.id}
              onClick={() => setSelectedCreatorId(creator.id)}
              className={`p-3.5 rounded-xl text-left transition-all border ${
                isSelected
                  ? 'bg-studio-850 border-white text-white shadow-lg'
                  : 'bg-studio-900 hover:bg-studio-850 border-studio-800 text-studio-400'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-xs truncate text-white">{creator.name}</span>
                <span className="text-[10px] text-studio-500">{creator.vocalCadence.avgWPM} WPM</span>
              </div>
              <div className="text-[11px] text-studio-500 mb-1.5 truncate">
                {creator.instagramHandle}
              </div>
              <div className="text-[10px] px-1.5 py-0.5 rounded bg-studio-950 border border-studio-800 text-studio-400 truncate">
                {creator.nichePillar}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Creator Deconstruction Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Vocal Cadence Profile */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-xl bg-studio-900 border border-studio-800 space-y-5">
            <div className="flex items-center justify-between border-b border-studio-800 pb-3 font-mono">
              <div className="flex items-center gap-2">
                <Mic2 className="w-4 h-4 text-white" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Vocal Cadence & Speech Architecture
                </h3>
              </div>
              <a
                href={`https://instagram.com/${selectedCreator.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-studio-400 hover:text-white"
              >
                <span>Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Cadence Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 rounded-lg bg-studio-950 border border-studio-800">
                <div className="text-[10px] text-studio-500 uppercase">Speed / WPM</div>
                <div className="text-xl font-bold text-white mt-1">
                  {selectedCreator.vocalCadence.avgWPM}
                </div>
                <div className="text-[10px] text-studio-500 mt-0.5">Words/Min</div>
              </div>

              <div className="p-3 rounded-lg bg-studio-950 border border-studio-800">
                <div className="text-[10px] text-studio-500 uppercase">Micro-Pause</div>
                <div className="text-xl font-bold text-white mt-1">
                  {selectedCreator.vocalCadence.pauseIntervalMs}
                </div>
                <div className="text-[10px] text-studio-500 mt-0.5">Milliseconds</div>
              </div>

              <div className="p-3 rounded-lg bg-studio-950 border border-studio-800">
                <div className="text-[10px] text-studio-500 uppercase">Tone Register</div>
                <div className="text-xs font-bold text-white mt-2 truncate">
                  {selectedCreator.vocalCadence.pitchContour.split(' ')[0]}
                </div>
                <div className="text-[10px] text-studio-500 mt-0.5">Register</div>
              </div>
            </div>

            {/* Vocal Breakdown Details */}
            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <div className="text-studio-500 uppercase">Pitch & Tone Contour</div>
                <div className="p-3 rounded bg-studio-950 border border-studio-800 font-sans text-studio-200 leading-relaxed">
                  {selectedCreator.vocalCadence.pitchContour}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-studio-500 uppercase">Emphasis & Syllable Dynamics</div>
                <div className="p-3 rounded bg-studio-950 border border-studio-800 font-sans text-studio-200 leading-relaxed">
                  {selectedCreator.vocalCadence.emphasisPattern}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-studio-500 uppercase">Breathing & Silent Micro-Pauses</div>
                <div className="p-3 rounded bg-studio-950 border border-studio-800 font-sans text-studio-200 leading-relaxed">
                  {selectedCreator.vocalCadence.breathingCues}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical & Visual Blocking Patterns */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-xl bg-studio-900 border border-studio-800 space-y-5">
            <div className="flex items-center justify-between border-b border-studio-800 pb-3 font-mono">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-white" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Physical Blocking & Framing
                </h3>
              </div>
              <span className="text-xs text-studio-500 font-mono">Camera Language</span>
            </div>

            {/* Physical Blocking Details */}
            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <div className="text-studio-500 uppercase">Camera Rigging & Lens Angle</div>
                <div className="p-3 rounded bg-studio-950 border border-studio-800 font-sans text-studio-200 leading-relaxed">
                  {selectedCreator.physicalBlocking.cameraFraming}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-studio-500 uppercase">Eye-Line & Gaze Dynamics</div>
                <div className="p-3 rounded bg-studio-950 border border-studio-800 font-sans text-studio-200 leading-relaxed">
                  {selectedCreator.physicalBlocking.eyeLine}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-studio-500 uppercase">Hand Gestures & Pacing Movement</div>
                <div className="p-3 rounded bg-studio-950 border border-studio-800 font-sans text-studio-200 leading-relaxed">
                  {selectedCreator.physicalBlocking.handGestures}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-studio-500 uppercase">Cut Pacing & Screen B-Roll Frequency</div>
                <div className="p-3 rounded bg-studio-950 border border-studio-800 font-sans text-studio-200 leading-relaxed">
                  {selectedCreator.physicalBlocking.cutFrequency}
                </div>
              </div>
            </div>

            {/* Actionable Shadowing Rule */}
            <div className="p-4 rounded-lg bg-studio-950 border border-studio-800 space-y-1 font-mono">
              <div className="text-xs text-white font-bold flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Actionable Shadowing Rule for Mohan
              </div>
              <p className="text-xs text-studio-300 font-sans leading-relaxed">
                {selectedCreator.shadowingTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
