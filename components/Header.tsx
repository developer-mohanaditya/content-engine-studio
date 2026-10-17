'use client';

import React from 'react';
import { 
  Clapperboard, 
  Calendar, 
  Film, 
  Mic2, 
  Cloud, 
  Users,
  ShieldCheck, 
  Sparkles,
  Layers
} from 'lucide-react';

export type StudioTab = 'calendar' | 'storyboard' | 'cadence' | 'benchmarks' | 'storage';

interface HeaderProps {
  activeTab: StudioTab;
  setActiveTab: (tab: StudioTab) => void;
  selectedVideoNumber: number;
  totalVideos: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedVideoNumber,
  totalVideos
}) => {
  return (
    <header className="border-b border-studio-700/60 bg-studio-850/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Domain */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-cyan via-studio-600 to-accent-violet p-[1px] flex items-center justify-center shadow-lg shadow-accent-cyan/10">
              <div className="w-full h-full bg-studio-900 rounded-[11px] flex items-center justify-center">
                <Clapperboard className="w-5 h-5 text-accent-cyan" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">Content Engine Studio</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-studio-700/80 text-accent-cyan border border-studio-600 font-semibold">v1.0 Pro</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-studio-400 font-mono">
                <span className="text-accent-cyan font-medium">content.aweditya.com</span>
                <span>•</span>
                <span className="text-studio-400">Mohan Aditya Sadhanala</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-studio-900/80 p-1 rounded-xl border border-studio-700/50">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'calendar'
                  ? 'bg-studio-700 text-white shadow-sm'
                  : 'text-studio-400 hover:text-studio-200 hover:bg-studio-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-accent-amber" />
              Pipeline
            </button>

            <button
              onClick={() => setActiveTab('storyboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'storyboard'
                  ? 'bg-studio-700 text-white shadow-sm'
                  : 'text-studio-400 hover:text-studio-200 hover:bg-studio-800'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-accent-cyan" />
              Storyboard #{selectedVideoNumber}
            </button>

            <button
              onClick={() => setActiveTab('cadence')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'cadence'
                  ? 'bg-studio-700 text-white shadow-sm'
                  : 'text-studio-400 hover:text-studio-200 hover:bg-studio-800'
              }`}
            >
              <Mic2 className="w-3.5 h-3.5 text-accent-emerald" />
              Lyrics Player
            </button>

            <button
              onClick={() => setActiveTab('benchmarks')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'benchmarks'
                  ? 'bg-studio-700 text-white shadow-sm'
                  : 'text-studio-400 hover:text-studio-200 hover:bg-studio-800'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-pink-400" />
              Benchmarks
            </button>

            <button
              onClick={() => setActiveTab('storage')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'storage'
                  ? 'bg-studio-700 text-white shadow-sm'
                  : 'text-studio-400 hover:text-studio-200 hover:bg-studio-800'
              }`}
            >
              <Cloud className="w-3.5 h-3.5 text-accent-violet" />
              R2 Storage
            </button>
          </nav>

          {/* Right Status / Indicators */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-studio-900 border border-studio-700 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
              <span className="text-studio-300">R2: Synced</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-studio-400 font-mono bg-studio-800/80 px-2.5 py-1 rounded-lg border border-studio-700/60">
              <span className="text-studio-300 font-bold">60%</span> Tech / <span className="text-studio-300 font-bold">40%</span> Journal
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-studio-700/40 bg-studio-900 px-2 py-2">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-2 py-1 text-xs rounded-md ${activeTab === 'calendar' ? 'bg-studio-700 text-white' : 'text-studio-400'}`}
        >
          Pipeline
        </button>
        <button
          onClick={() => setActiveTab('storyboard')}
          className={`px-2 py-1 text-xs rounded-md ${activeTab === 'storyboard' ? 'bg-studio-700 text-white' : 'text-studio-400'}`}
        >
          Storyboard
        </button>
        <button
          onClick={() => setActiveTab('cadence')}
          className={`px-2 py-1 text-xs rounded-md ${activeTab === 'cadence' ? 'bg-studio-700 text-white' : 'text-studio-400'}`}
        >
          Cadence
        </button>
        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`px-2 py-1 text-xs rounded-md ${activeTab === 'benchmarks' ? 'bg-studio-700 text-white' : 'text-studio-400'}`}
        >
          Benchmarks
        </button>
        <button
          onClick={() => setActiveTab('storage')}
          className={`px-2 py-1 text-xs rounded-md ${activeTab === 'storage' ? 'bg-studio-700 text-white' : 'text-studio-400'}`}
        >
          R2
        </button>
      </div>
    </header>
  );
};
