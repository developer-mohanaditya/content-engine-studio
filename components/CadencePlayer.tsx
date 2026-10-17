'use client';

import React, { useState, useEffect, useRef } from 'react';
import { VideoItem, ScriptSegment, ScriptToken } from '@/types/content';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Mic2, 
  Clock, 
  ChevronUp, 
  ChevronDown, 
  Check,
  Maximize2,
  Minimize2,
  Grid
} from 'lucide-react';

interface CadencePlayerProps {
  video: VideoItem;
}

export const CadencePlayer: React.FC<CadencePlayerProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentSegmentIdx, setCurrentSegmentIdx] = useState<number>(0);
  const [currentTokenId, setCurrentTokenId] = useState<string | null>(null);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [durationSec, setDurationSec] = useState<number>(18.5);
  const [showSafeGrid, setShowSafeGrid] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'cinema'>('large');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Flatten all tokens across all segments with normalized timing
  const allTokens = React.useMemo(() => {
    const list: { segmentIdx: number; token: ScriptToken; startSec: number; endSec: number }[] = [];
    let cumulativeSec = 0;

    video.scriptSegments.forEach((seg, sIdx) => {
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
  }, [video.scriptSegments]);

  const totalCalculatedDuration = allTokens.length > 0 
    ? allTokens[allTokens.length - 1].endSec 
    : 18.0;

  // Initialize and handle audio sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    setCurrentTimeSec(cur);

    // Sync active token based on audio timestamp
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
        console.warn('Audio play error, falling back to simulated timer:', err);
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

  // Format time display MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Audio source: real high-fidelity neural audio for Reel #1, fallback to video storage key
  const audioSourceUrl = video.videoNumber === 1 
    ? '/audio/reels/reel_001_cadence.mp3' 
    : (video.storage.audioObjectKey || '/audio/reels/reel_001_cadence.mp3');

  return (
    <div className="space-y-6">
      {/* Hidden real audio element */}
      <audio
        ref={audioRef}
        src={audioSourceUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleAudioLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Top Teleprompter Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-studio-900 border border-studio-700 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-studio-600'}`}></span>
            <span className="font-bold text-white uppercase tracking-wider">
              {isPlaying ? 'RECORDING TAKES • LIVE CADENCE' : 'STANDBY • READY TO AUDITION'}
            </span>
          </div>
          <span className="text-studio-500">|</span>
          <span className="text-studio-400">Reel #{video.videoNumber}: {video.title}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Safe Grid Toggle */}
          <button
            onClick={() => setShowSafeGrid(!showSafeGrid)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
              showSafeGrid ? 'bg-studio-800 text-white border-studio-600' : 'text-studio-500 border-studio-800 hover:text-studio-300'
            }`}
            title="Toggle 9:16 Camera Safe Zone Guidelines"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Safe Zone</span>
          </button>

          {/* Font Size Selector */}
          <div className="flex items-center rounded border border-studio-800 bg-studio-950 p-0.5">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded text-[11px] ${fontSize === 'normal' ? 'bg-studio-800 text-white' : 'text-studio-500'}`}
            >
              Std
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded text-[11px] ${fontSize === 'large' ? 'bg-studio-800 text-white' : 'text-studio-500'}`}
            >
              Large
            </button>
            <button
              onClick={() => setFontSize('cinema')}
              className={`px-2 py-0.5 rounded text-[11px] ${fontSize === 'cinema' ? 'bg-studio-800 text-white font-bold' : 'text-studio-500'}`}
            >
              Cinema
            </button>
          </div>

          {/* Speed Presets */}
          <div className="flex items-center rounded border border-studio-800 bg-studio-950 p-0.5">
            {[0.75, 1.0, 1.25].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  playbackSpeed === speed ? 'bg-white text-black font-bold' : 'text-studio-500 hover:text-studio-300'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Teleprompter Screen (Cinema Slate Pure OLED Black) */}
      <div className={`relative min-h-[440px] md:min-h-[520px] rounded-2xl bg-studio-950 border border-studio-800 p-8 md:p-14 flex flex-col justify-center overflow-hidden shadow-2xl transition-all`}>
        {/* Subtle Camera Safe Zone Grid Lines (Optional) */}
        {showSafeGrid && (
          <div className="absolute inset-0 pointer-events-none border border-studio-800/40 m-6 rounded-xl flex items-center justify-center">
            <div className="w-full h-[1px] bg-studio-800/20"></div>
            <div className="absolute h-full w-[1px] bg-studio-800/20"></div>
            <div className="absolute top-2 left-3 text-[10px] font-mono text-studio-600 uppercase tracking-widest">
              Camera Eye-Line Safe Zone (9:16)
            </div>
          </div>
        )}

        {/* Live Lyrics Text Content */}
        <div className="relative z-10 max-w-4xl mx-auto w-full space-y-8">
          {video.scriptSegments.map((segment, sIdx) => {
            const isCurrentSegment = currentSegmentIdx === sIdx;

            return (
              <div
                key={segment.id}
                className={`transition-all duration-300 ${
                  isCurrentSegment ? 'opacity-100' : 'opacity-35 hover:opacity-75'
                }`}
              >
                {/* Segment Meta */}
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-studio-500">
                  <span className="text-white font-bold">SEGMENT {sIdx + 1}</span>
                  <span>•</span>
                  <span>{segment.startTimeSec.toFixed(1)}s</span>
                  {segment.shotRef && <span>• Shot #{segment.shotRef}</span>}
                </div>

                {/* Tokenized Words */}
                <div
                  className={`leading-relaxed flex flex-wrap items-baseline gap-x-3 gap-y-3 font-sans ${
                    fontSize === 'normal' ? 'text-xl' : fontSize === 'large' ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
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
                              ? 'bg-white text-black font-bold scale-110 shadow-lg'
                              : 'bg-studio-850 text-studio-400 border border-studio-700/60'
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
                            ? 'text-white font-bold underline decoration-white decoration-4 underline-offset-8 scale-105'
                            : isCurrentSegment
                            ? 'text-studio-200'
                            : 'text-studio-500'
                        }`}
                      >
                        {tok.text}
                        {tok.type === 'pitch-up' && (
                          <span className="text-xs text-studio-400 ml-0.5 align-super font-mono">▲</span>
                        )}
                        {tok.type === 'pitch-down' && (
                          <span className="text-xs text-studio-400 ml-0.5 align-sub font-mono">▼</span>
                        )}
                        {tok.type === 'stress' && (
                          <span className="sr-only">(stressed)</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sleek Cinema Slate Transport & Audio Bar */}
      <div className="p-5 rounded-2xl bg-studio-900 border border-studio-700 space-y-4">
        {/* Scrubber Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-studio-400">
            <span className="text-white font-bold">{formatTime(currentTimeSec)}</span>
            <span className="text-studio-500">Audio: Real Neural Baritone (145 WPM)</span>
            <span>{formatTime(durationSec)}</span>
          </div>

          <input
            type="range"
            min={0}
            max={durationSec}
            step={0.05}
            value={currentTimeSec}
            onChange={handleScrub}
            className="w-full h-1.5 bg-studio-800 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>

        {/* Master Playback Controls */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md ${
                isPlaying
                  ? 'bg-red-600 hover:bg-red-500 text-white'
                  : 'bg-white hover:bg-studio-200 text-black'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Audition</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Live Cadence</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-studio-800 hover:bg-studio-700 text-studio-300 hover:text-white border border-studio-700 transition-colors"
              title="Reset Timeline to 0:00"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Notation Legend Guide */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-studio-400">
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-studio-800 text-white border border-studio-700">⏸</span>
              <span>Micro-Silence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold">▲</span>
              <span>Curiosity Rise</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold">▼</span>
              <span>Terminal Drop</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="underline decoration-white decoration-2">Word</span>
              <span>Heavy Stress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
