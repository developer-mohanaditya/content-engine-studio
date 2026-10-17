'use client';

import React, { useState, useEffect, useRef } from 'react';
import { VideoItem, ScriptToken } from '@/types/content';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sun, 
  Moon, 
  Grid, 
  Maximize2, 
  Layers, 
  Sparkles, 
  ChevronRight,
  ChevronLeft,
  Volume2,
  Mic2,
  Compass,
  ArrowRight
} from 'lucide-react';

interface LiteStudioViewProps {
  videos: VideoItem[];
  currentVideo: VideoItem;
  onSelectVideo: (video: VideoItem) => void;
  onExitLiteMode: () => void;
}

export const LiteStudioView: React.FC<LiteStudioViewProps> = ({
  videos,
  currentVideo,
  onSelectVideo,
  onExitLiteMode,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentSegmentIdx, setCurrentSegmentIdx] = useState<number>(0);
  const [currentTokenId, setCurrentTokenId] = useState<string | null>(null);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [durationSec, setDurationSec] = useState<number>(18.5);
  const [showSafeGrid, setShowSafeGrid] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'cinema'>('cinema');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Flatten all tokens across segments
  const allTokens = React.useMemo(() => {
    const list: { segmentIdx: number; token: ScriptToken; startSec: number; endSec: number }[] = [];
    let cumulativeSec = 0;

    currentVideo.scriptSegments.forEach((seg, sIdx) => {
      seg.tokens.forEach((tok) => {
        const tokenDuration = tok.durationMs / 1000;
        list.push({
          segmentIdx: sIdx,
          token: tok,
          startSec: cumulativeSec,
          endSec: cumulativeSec + tokenDuration,
        });
        cumulativeSec += tokenDuration;
      });
    });

    return list;
  }, [currentVideo.scriptSegments]);

  // Adjust audio playback speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    setCurrentTimeSec(cur);

    const active = allTokens.find((item) => cur >= item.startSec && cur < item.endSec);
    if (active) {
      setCurrentTokenId(active.token.id);
      setCurrentSegmentIdx(active.segmentIdx);
    }
  };

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDurationSec(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTimeSec(0);
    setCurrentTokenId(null);
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play error:', err);
        setIsPlaying(true);
      });
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTimeSec(0);
    setCurrentTokenId(null);
    setCurrentSegmentIdx(0);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTimeSec(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentIndex = videos.findIndex((v) => v.id === currentVideo.id);
  const handlePrevVideo = () => {
    if (currentIndex > 0) {
      handleReset();
      onSelectVideo(videos[currentIndex - 1]);
    }
  };
  const handleNextVideo = () => {
    if (currentIndex < videos.length - 1) {
      handleReset();
      onSelectVideo(videos[currentIndex + 1]);
    }
  };

  // Color variables depending on theme mode
  const bgMain = isDarkMode ? 'bg-[#000000]' : 'bg-[#FFFFFF]';
  const textPrimary = isDarkMode ? 'text-[#FFFFFF]' : 'text-[#111827]';
  const textMuted = isDarkMode ? 'text-[#71717A]' : 'text-[#6B7280]';
  const borderSubtle = isDarkMode ? 'border-[#1F1F23]' : 'border-[#E5E7EB]';
  const cardBg = isDarkMode ? 'bg-[#09090B]' : 'bg-[#F9FAFB]';
  const activeWordColor = isDarkMode ? 'text-[#FFFFFF] underline decoration-[#FFFFFF]' : 'text-[#000000] underline decoration-[#000000]';
  const inactiveWordColor = isDarkMode ? 'text-[#3F3F46]' : 'text-[#9CA3AF]';

  return (
    <div className={`min-h-screen ${bgMain} ${textPrimary} flex flex-col font-sans transition-colors duration-200 select-none`}>
      {/* Hidden real audio */}
      <audio
        ref={audioRef}
        src={currentVideo.videoNumber === 1 ? '/audio/reels/reel_001_cadence.mp3' : '/audio/reels/reel_001_cadence.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleAudioLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Top Minimalist Bar */}
      <header className={`px-6 py-3.5 border-b ${borderSubtle} flex items-center justify-between font-mono text-xs`}>
        {/* Left: Branding & Reel Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider uppercase text-sm">Studio Lite</span>
            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${isDarkMode ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
              Rehearsal Mode
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <button
              onClick={handlePrevVideo}
              disabled={currentIndex === 0}
              className={`p-1 rounded ${borderSubtle} border disabled:opacity-30`}
              title="Previous Reel"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold px-2 py-0.5">
              Reel #{currentVideo.videoNumber} / {videos.length}
            </span>
            <button
              onClick={handleNextVideo}
              disabled={currentIndex === videos.length - 1}
              className={`p-1 rounded ${borderSubtle} border disabled:opacity-30`}
              title="Next Reel"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center: Title */}
        <div className="hidden md:block truncate max-w-md text-center font-sans font-medium text-xs">
          {currentVideo.title}
        </div>

        {/* Right Controls: Theme Toggle, Safe Zone, Exit */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border ${borderSubtle} transition-all ${
              isDarkMode ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            title="Toggle Light / Dark Theme"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>

          {/* Safe Zone Grid Toggle */}
          <button
            onClick={() => setShowSafeGrid(!showSafeGrid)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border ${borderSubtle} transition-all ${
              showSafeGrid 
                ? (isDarkMode ? 'bg-zinc-800 text-white' : 'bg-gray-200 text-gray-900 font-bold')
                : `${textMuted} opacity-60`
            }`}
            title="Toggle 9:16 Camera Guidelines"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Safe Zone</span>
          </button>

          {/* Switch to Full Studio */}
          <button
            onClick={onExitLiteMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-bold transition-all border ${
              isDarkMode 
                ? 'bg-white hover:bg-zinc-200 text-black border-white' 
                : 'bg-black hover:bg-gray-800 text-white border-black'
            }`}
          >
            <span>Full Studio</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* Main Distraction-Free Teleprompter Stage */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-10 relative overflow-hidden">
        {/* Subtle 9:16 Camera Safe Zone Box */}
        {showSafeGrid && (
          <div className={`absolute inset-y-6 w-full max-w-2xl pointer-events-none border ${isDarkMode ? 'border-zinc-800/60' : 'border-gray-200'} rounded-3xl flex items-center justify-center`}>
            <div className={`w-full h-[1px] ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-200/60'}`}></div>
            <div className={`absolute h-full w-[1px] ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-200/60'}`}></div>
            <div className={`absolute top-4 left-5 text-[10px] font-mono ${textMuted} uppercase tracking-widest`}>
              9:16 Center Eye-Line Target
            </div>
          </div>
        )}

        {/* Script Lyrics Stream */}
        <div className="relative z-10 w-full max-w-3xl space-y-10 my-auto">
          {currentVideo.scriptSegments.map((segment, sIdx) => {
            const isCurrentSegment = currentSegmentIdx === sIdx;

            return (
              <div
                key={segment.id}
                className={`transition-all duration-300 ${
                  isCurrentSegment ? 'opacity-100 scale-100' : 'opacity-25 hover:opacity-60 scale-95'
                }`}
              >
                <div className={`flex items-center gap-2 mb-3 text-xs font-mono ${textMuted}`}>
                  <span className={`font-bold ${textPrimary}`}>TAKE #{sIdx + 1}</span>
                  <span>•</span>
                  <span>{segment.startTimeSec.toFixed(1)}s</span>
                  {segment.shotRef && <span>• Shot #{segment.shotRef}</span>}
                </div>

                <div
                  className={`leading-relaxed flex flex-wrap items-baseline gap-x-3.5 gap-y-3.5 font-sans ${
                    fontSize === 'normal' 
                      ? 'text-2xl' 
                      : fontSize === 'large' 
                      ? 'text-3xl md:text-4xl' 
                      : 'text-3xl md:text-5xl font-medium tracking-tight'
                  }`}
                >
                  {segment.tokens.map((tok) => {
                    const isTokenActive = currentTokenId === tok.id;

                    if (tok.type === 'pause') {
                      return (
                        <span
                          key={tok.id}
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono transition-all ${
                            isTokenActive
                              ? (isDarkMode ? 'bg-white text-black font-bold scale-110' : 'bg-black text-white font-bold scale-110')
                              : (isDarkMode ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-gray-100 text-gray-500 border border-gray-200')
                          }`}
                        >
                          ⏸ {tok.text} ({tok.durationMs / 1000}s)
                        </span>
                      );
                    }

                    return (
                      <span
                        key={tok.id}
                        className={`transition-all duration-150 inline-block ${
                          isTokenActive
                            ? `${activeWordColor} font-bold decoration-4 underline-offset-8 scale-105`
                            : isCurrentSegment
                            ? textPrimary
                            : inactiveWordColor
                        }`}
                      >
                        {tok.text}
                        {tok.type === 'pitch-up' && (
                          <span className="text-xs text-zinc-500 ml-0.5 align-super font-mono">▲</span>
                        )}
                        {tok.type === 'pitch-down' && (
                          <span className="text-xs text-zinc-500 ml-0.5 align-sub font-mono">▼</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Transport Bar */}
      <footer className={`px-6 py-4 border-t ${borderSubtle} ${cardBg} font-mono text-xs space-y-3`}>
        {/* Scrubber Range */}
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <span className="font-bold w-12 text-left">{formatTime(currentTimeSec)}</span>
          <input
            type="range"
            min={0}
            max={durationSec}
            step={0.05}
            value={currentTimeSec}
            onChange={handleScrub}
            className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${
              isDarkMode ? 'bg-zinc-800 accent-white' : 'bg-gray-300 accent-black'
            }`}
          />
          <span className={`${textMuted} w-12 text-right`}>{formatTime(durationSec)}</span>
        </div>

        {/* Master Buttons */}
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Play / Reset */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all shadow-md ${
                isPlaying
                  ? 'bg-red-600 hover:bg-red-500 text-white'
                  : isDarkMode
                  ? 'bg-white hover:bg-zinc-200 text-black'
                  : 'bg-black hover:bg-gray-800 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Shadowing</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className={`p-2.5 rounded-xl border ${borderSubtle} transition-colors ${
                isDarkMode ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300' : 'bg-white hover:bg-gray-100 text-gray-700'
              }`}
              title="Reset Timeline to 0:00"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Font Size & Speed Presets */}
          <div className="flex items-center gap-3">
            {/* Speed Presets */}
            <div className={`flex items-center rounded border ${borderSubtle} p-0.5 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}>
              {[0.75, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                    playbackSpeed === speed
                      ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white')
                      : textMuted
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Font Size Selector */}
            <div className={`flex items-center rounded border ${borderSubtle} p-0.5 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}>
              {(['normal', 'large', 'cinema'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-2 py-1 rounded text-[11px] capitalize ${
                    fontSize === size
                      ? (isDarkMode ? 'bg-white text-black font-bold' : 'bg-black text-white font-bold')
                      : textMuted
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Audio Source Info */}
          <div className={`hidden sm:flex items-center gap-2 text-[11px] ${textMuted}`}>
            <Mic2 className="w-3.5 h-3.5" />
            <span>Cadence: 145 WPM (Shadowing Mode)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
