'use client';

import React from 'react';
import { 
  Clapperboard, 
  Calendar, 
  Film, 
  Mic2, 
  Cloud, 
  Users,
  Sparkles
} from 'lucide-react';

export type StudioTab = 'calendar' | 'storyboard' | 'cadence' | 'benchmarks' | 'storage';

interface HeaderProps {
  activeTab: StudioTab;
  setActiveTab: (tab: StudioTab) => void;
  selectedVideoNumber: number;
  totalVideos: number;
  onEnterLiteMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedVideoNumber,
  totalVideos,
  onEnterLiteMode,
}) => {
  return (
    <header className="border-b border-studio-800 bg-studio-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-studio-800 border border-studio-700 flex items-center justify-center">
              <Clapperboard className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white uppercase font-mono">Content Engine Studio</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-studio-800 text-studio-400 border border-studio-700">Slate v1.2</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-studio-500 font-mono">
                <span className="text-white font-medium">content.aweditya.com</span>
                <span>•</span>
                <span>Mohan Aditya Sadhanala</span>
              </div>
            </div>
          </div>

          {/* Minimalist Cinema Slate Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-studio-900 p-1 rounded-lg border border-studio-800">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                activeTab === 'calendar'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-studio-400 hover:text-white hover:bg-studio-850'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Pipeline
            </button>

            <button
              onClick={() => setActiveTab('storyboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                activeTab === 'storyboard'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-studio-400 hover:text-white hover:bg-studio-850'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              Storyboard #{selectedVideoNumber}
            </button>

            <button
              onClick={() => setActiveTab('cadence')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                activeTab === 'cadence'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-studio-400 hover:text-white hover:bg-studio-850'
              }`}
            >
              <Mic2 className="w-3.5 h-3.5" />
              Teleprompter
            </button>

            <button
              onClick={() => setActiveTab('benchmarks')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                activeTab === 'benchmarks'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-studio-400 hover:text-white hover:bg-studio-850'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Benchmarks
            </button>

            <button
              onClick={() => setActiveTab('storage')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                activeTab === 'storage'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-studio-400 hover:text-white hover:bg-studio-850'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              Storage & DB
            </button>
          </nav>

          {/* Right Action: Lite Mode Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={onEnterLiteMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-studio-800 hover:bg-white hover:text-black text-white text-xs font-mono font-bold border border-studio-700 transition-all shadow-sm"
              title="Open Distraction-Free Rehearsal Prompter with Light/Dark theme"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Lite</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-studio-800 bg-studio-950 px-2 py-2">
        <button
          onClick={onEnterLiteMode}
          className="px-2.5 py-1 text-xs font-mono rounded bg-white text-black font-bold"
        >
          Lite
        </button>
        {(['calendar', 'storyboard', 'cadence', 'benchmarks', 'storage'] as StudioTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 text-xs font-mono rounded capitalize ${
              activeTab === tab ? 'bg-white text-black font-bold' : 'text-studio-400'
            }`}
          >
            {tab === 'cadence' ? 'Prompter' : tab}
          </button>
        ))}
      </div>
    </header>
  );
};
