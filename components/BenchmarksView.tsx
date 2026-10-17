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
  TrendingUp, 
  Volume2, 
  ChevronUp, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles,
  Target
} from 'lucide-react';

export const BenchmarksView: React.FC = () => {
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('BENCH-01');

  const selectedCreator: CreatorBenchmark = 
    INSTAGRAM_BENCHMARKS.find((c) => c.id === selectedCreatorId) || INSTAGRAM_BENCHMARKS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-studio-850 border border-studio-700/80 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 font-bold flex items-center gap-1">
                Verified Instagram Creators
              </span>
              <span className="text-xs text-studio-400 font-mono">
                Peer Benchmarking & Vocal Shadowing Engine
              </span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-accent-cyan" />
              Creator Vocal Cadence & Physical Shadowing Benchmarks
            </h2>
            <p className="mt-1 text-xs text-studio-400">
              Deconstructed cadence metrics, timing pauses, pitch curves, and physical blocking patterns to study and mirror across your 60% Tech / 40% Journal reels.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-studio-900 border border-studio-700 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
            <span className="text-studio-200">5 Verified Creators Analyzed</span>
          </div>
        </div>
      </div>

      {/* Creator Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {INSTAGRAM_BENCHMARKS.map((creator) => {
          const isSelected = creator.id === selectedCreator.id;
          return (
            <button
              key={creator.id}
              onClick={() => setSelectedCreatorId(creator.id)}
              className={`p-3.5 rounded-xl text-left transition-all border ${
                isSelected
                  ? 'bg-studio-800 border-accent-cyan shadow-md shadow-cyan-500/10 ring-1 ring-accent-cyan/40'
                  : 'bg-studio-850 hover:bg-studio-800/60 border-studio-700/60'
              }`}
            >
              <div className="text-xs font-bold text-white">{creator.name}</div>
              <div className="text-[11px] font-mono text-accent-cyan mt-0.5">{creator.instagramHandle}</div>
              <div className="mt-2 text-[10px] font-mono text-studio-400 flex items-center justify-between">
                <span>{creator.metrics.wpm} WPM</span>
                <span>{creator.metrics.averagePauseMs}ms pause</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Creator Deep Dive Breakdown */}
      <div className="p-6 rounded-2xl bg-studio-850 border border-studio-700/80 shadow-lg space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-studio-700/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white">{selectedCreator.name}</h3>
              <a
                href={`https://www.instagram.com/${selectedCreator.instagramHandle.replace('@', '')}/`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-pink-400 hover:text-pink-300 flex items-center gap-1 bg-pink-950/40 px-2 py-0.5 rounded border border-pink-800/40"
              >
                {selectedCreator.instagramHandle}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="mt-1 text-xs text-studio-300">
              Niche Focus: <span className="text-white font-medium">{selectedCreator.niche}</span> • Primary Style: <span className="text-accent-cyan font-mono">{selectedCreator.primaryFormat}</span>
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-2 bg-studio-900 p-1.5 rounded-xl border border-studio-700 text-xs font-mono">
            <div className="px-3 py-1 rounded-lg bg-studio-800 text-center">
              <span className="block text-[10px] text-studio-400">Tempo</span>
              <span className="text-accent-emerald font-bold">{selectedCreator.metrics.wpm} WPM</span>
            </div>
            <div className="px-3 py-1 rounded-lg bg-studio-800 text-center">
              <span className="block text-[10px] text-studio-400">Micro-Pause</span>
              <span className="text-accent-amber font-bold">{selectedCreator.metrics.averagePauseMs}ms</span>
            </div>
            <div className="px-3 py-1 rounded-lg bg-studio-800 text-center">
              <span className="block text-[10px] text-studio-400">Hook Window</span>
              <span className="text-accent-cyan font-bold">{selectedCreator.metrics.hookDeliverySpeedSec}s</span>
            </div>
          </div>
        </div>

        {/* 2-Column Cadence & Physical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Vocal Cadence Anatomy */}
          <div className="p-5 rounded-xl bg-studio-900/90 border border-studio-700/60 space-y-4">
            <h4 className="text-xs font-bold text-accent-cyan font-mono uppercase tracking-wider flex items-center gap-2">
              <Mic2 className="w-4 h-4" /> Vocal Cadence Anatomy
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-studio-850 border border-studio-700/40">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Opening Hook Pattern</span>
                <p className="text-studio-200">{selectedCreator.vocalCadenceDeconstruction.openingPattern}</p>
              </div>

              <div className="p-3 rounded-lg bg-studio-850 border border-studio-700/40">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Strategic Silence & Pauses</span>
                <p className="text-studio-200">{selectedCreator.vocalCadenceDeconstruction.pauseStrategy}</p>
              </div>

              <div className="p-3 rounded-lg bg-studio-850 border border-studio-700/40">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Word Stress Accent Rule</span>
                <p className="text-studio-200">{selectedCreator.vocalCadenceDeconstruction.stressPattern}</p>
              </div>

              <div className="p-3 rounded-lg bg-studio-850 border border-studio-700/40">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Cadence Pitch Fall (Downward Inflection)</span>
                <p className="text-studio-200">{selectedCreator.vocalCadenceDeconstruction.endingDrop}</p>
              </div>
            </div>
          </div>

          {/* Column 2: Physical Blocking & Studio Rigging */}
          <div className="p-5 rounded-xl bg-studio-900/90 border border-studio-700/60 space-y-4">
            <h4 className="text-xs font-bold text-accent-violet font-mono uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4" /> Physical Blocking & Body Language
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-studio-850 border border-studio-700/40">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Camera Distance & Optics</span>
                <p className="text-studio-200">{selectedCreator.physicalBlockingCues.cameraSetup}</p>
              </div>

              <div className="p-3 rounded-lg bg-studio-850 border border-studio-700/40">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Gaze & Eye Contact Management</span>
                <p className="text-studio-200">{selectedCreator.physicalBlockingCues.gazeAngle}</p>
              </div>

              <div className="p-3 rounded-lg bg-studio-850 border border-studio-700/40">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Hand & Spatial Gestures</span>
                <p className="text-studio-200">{selectedCreator.physicalBlockingCues.handGestures}</p>
              </div>

              <div className="p-3 rounded-lg bg-studio-850 border border-studio-700/40">
                <span className="text-[10px] font-mono text-studio-400 uppercase block mb-1">Psychological Energy Transfer</span>
                <p className="text-studio-200">{selectedCreator.physicalBlockingCues.energyTransfer}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Superego Tactical Application Card for Mohan */}
        <div className="p-4 rounded-xl bg-studio-900 border border-studio-700/90 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent-emerald uppercase">
            <Target className="w-4 h-4" /> Tactical Application For Mohan Aditya Sadhanala
          </div>
          <p className="text-xs text-studio-200 leading-relaxed font-sans">
            {selectedCreator.tacticalApplicationForMohan}
          </p>
        </div>
      </div>
    </div>
  );
};
