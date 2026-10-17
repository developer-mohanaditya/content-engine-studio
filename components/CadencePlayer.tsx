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
  Sparkles, 
  Clock, 
  ChevronUp, 
  ChevronDown, 
  Zap,
  Info,
  Edit3,
  Check
} from 'lucide-react';

interface CadencePlayerProps {
  video: VideoItem;
}

export const CadencePlayer: React.FC<CadencePlayerProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentSegmentIdx, setCurrentSegmentIdx] = useState<number>(0);
  const [currentTokenId, setCurrentTokenId] = useState<string | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [totalElapsedTimeMs, setTotalElapsedTimeMs] = useState<number>(0);

  // Flatten all tokens across all segments for sequential playback
  const allTokens = React.useMemo(() => {
    const list: { segmentIdx: number; token: ScriptToken; cumulativeMs: number }[] = [];
    let cum = 0;
    video.scriptSegments.forEach((seg, sIdx) => {
      seg.tokens.forEach((tok) => {
        list.push({ segmentIdx: sIdx, token: tok, cumulativeMs: cum });
        cum += tok.durationMs;
      });
    });
    return list;
  }, [video.scriptSegments]);

  const totalDurationMs = allTokens.length > 0 
    ? allTokens[allTokens.length - 1].cumulativeMs + (allTokens[allTokens.length - 1].token.durationMs || 300)
    : 10000;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Playback engine
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalStepMs = 40; // 25 fps update
    timerRef.current = setInterval(() => {
      setTotalElapsedTimeMs((prev) => {
        const nextTime = prev + (intervalStepMs * playbackSpeed);
        if (nextTime >= totalDurationMs) {
          setIsPlaying(false);
          return 0;
        }

        // Find active token
        const match = allTokens.find(
          (item) => nextTime >= item.cumulativeMs && nextTime < (item.cumulativeMs + item.token.durationMs)
        );

        if (match) {
          setCurrentTokenId(match.token.id);
          setCurrentSegmentIdx(match.segmentIdx);
        }

        return nextTime;
      });
    }, intervalStepMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, allTokens, totalDurationMs]);

  // Audio speech synthesis helper for natural auditioning
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);
      if (speechEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        // Generate speech without technical notation
        const cleanScript = video.scriptSegments
          .map((s) => s.plainText.replace(/\[pause:[a-z]+\]/g, '... ').replace(/[▲▼]/g, ''))
          .join('. ');

        const utterance = new SpeechSynthesisUtterance(cleanScript);
        utterance.rate = 0.95 * playbackSpeed;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTotalElapsedTimeMs(0);
    setCurrentTokenId(allTokens[0]?.token.id || null);
    setCurrentSegmentIdx(0);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const progressPercent = Math.min(100, (totalElapsedTimeMs / totalDurationMs) * 100);

  return (
    <div className="space-y-6">
      {/* Player Header & Controls */}
      <div className="p-5 rounded-2xl bg-studio-850 border border-studio-700/80 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
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
              <Mic2 className="w-5 h-5 text-accent-emerald" />
              Interactive Live Lyrics & Cadence Studio
            </h2>
          </div>

          {/* Notation Legend */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              [pause:short] 0.3s
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
              [pause:long] 0.8s
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-accent-cyan border border-cyan-500/30 flex items-center gap-0.5">
              <ChevronUp className="w-3 h-3" /> ▲ Pitch Rise
            </span>
            <span className="px-2 py-0.5 rounded bg-violet-500/10 text-accent-violet border border-violet-500/30 flex items-center gap-0.5">
              <ChevronDown className="w-3 h-3" /> ▼ Cadence Drop
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-accent-emerald border border-emerald-500/30 font-bold">
              *Stress Accent*
            </span>
          </div>
        </div>

        {/* Playback Transport Bar */}
        <div className="mt-5 p-4 rounded-xl bg-studio-900 border border-studio-700/80 flex flex-wrap items-center justify-between gap-4">
          {/* Main Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                isPlaying
                  ? 'bg-amber-400 text-studio-950 hover:bg-amber-300'
                  : 'bg-accent-emerald text-studio-950 hover:bg-emerald-400 shadow-emerald-500/10'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" /> Pause Audition
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Play Live Cadence
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-studio-800 hover:bg-studio-700 text-studio-300 border border-studio-700 transition-colors"
              title="Reset to Beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Time & Progress Info */}
          <div className="flex items-center gap-4 text-xs font-mono text-studio-300">
            <div>
              <span className="text-white font-bold">{(totalElapsedTimeMs / 1000).toFixed(1)}s</span>
              <span className="text-studio-500"> / </span>
              <span>{(totalDurationMs / 1000).toFixed(1)}s</span>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-studio-800 p-0.5 rounded-lg border border-studio-700">
              {[0.75, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    playbackSpeed === speed
                      ? 'bg-accent-cyan text-studio-950'
                      : 'text-studio-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Voice Audition Toggle */}
            <button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                speechEnabled
                  ? 'bg-studio-800 text-accent-cyan border-studio-600'
                  : 'bg-studio-900 text-studio-500 border-studio-800'
              }`}
              title="Toggle Browser Voice Audio"
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">Voice Synth</span>
            </button>
          </div>
        </div>

        {/* Scrubbable Progress Bar */}
        <div className="mt-3 relative w-full h-2 bg-studio-800 rounded-full overflow-hidden cursor-pointer"
             onClick={(e) => {
               const rect = e.currentTarget.getBoundingClientRect();
               const clickX = e.clientX - rect.left;
               const ratio = Math.max(0, Math.min(1, clickX / rect.width));
               setTotalElapsedTimeMs(ratio * totalDurationMs);
             }}>
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-accent-cyan via-accent-emerald to-accent-violet transition-all duration-75"
          ></div>
        </div>
      </div>

      {/* Script Lyrics Synchronized Karaoke / Teleprompter Display */}
      <div className="p-6 sm:p-8 rounded-2xl bg-studio-850 border border-studio-700/80 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-studio-700/60 pb-3">
          <span className="text-xs font-mono uppercase text-studio-400 tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-accent-amber" /> Teleprompter Cadence Highlighting
          </span>
          <span className="text-xs font-mono text-studio-400">
            Segment {currentSegmentIdx + 1} of {video.scriptSegments.length}
          </span>
        </div>

        <div className="space-y-6">
          {video.scriptSegments.map((segment, sIdx) => {
            const isSegmentActive = currentSegmentIdx === sIdx;
            return (
              <div
                key={segment.id}
                className={`p-5 rounded-xl transition-all border ${
                  isSegmentActive
                    ? 'bg-studio-800/80 border-accent-emerald/60 shadow-lg shadow-emerald-500/5 ring-1 ring-accent-emerald/30'
                    : 'bg-studio-900/60 border-studio-700/40 opacity-70 hover:opacity-90'
                }`}
              >
                {/* Segment Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-studio-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{segment.speaker}</span>
                    <span>•</span>
                    <span>{segment.startTimeSec.toFixed(1)}s - {(segment.startTimeSec + segment.durationSec).toFixed(1)}s</span>
                  </div>
                  {segment.shotRef && (
                    <span className="px-2 py-0.5 rounded bg-studio-800 text-studio-300 text-[10px]">
                      Maps to Shot #{segment.shotRef}
                    </span>
                  )}
                </div>

                {/* Token-by-Token Visual Teleprompter Flow */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-lg sm:text-xl font-sans leading-relaxed">
                  {segment.tokens.map((token) => {
                    const isActive = currentTokenId === token.id && isPlaying;

                    // Token Rendering by Type
                    if (token.type === 'pause-short') {
                      return (
                        <span
                          key={token.id}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-amber-400 text-studio-950 scale-110 shadow-md shadow-amber-400/20'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          <Clock className="w-3 h-3" /> [pause: 0.3s]
                        </span>
                      );
                    }

                    if (token.type === 'pause-long') {
                      return (
                        <span
                          key={token.id}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-mono text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-amber-400 text-studio-950 scale-110 shadow-md shadow-amber-400/20'
                              : 'bg-amber-500/25 text-amber-200 border border-amber-500/50'
                          }`}
                        >
                          <Clock className="w-3 h-3" /> [HOLD: 0.8s]
                        </span>
                      );
                    }

                    if (token.type === 'pitch-up') {
                      return (
                        <span
                          key={token.id}
                          className={`inline-flex items-center gap-0.5 font-bold transition-all ${
                            isActive
                              ? 'text-accent-cyan bg-cyan-950/80 px-2 py-0.5 rounded ring-2 ring-accent-cyan scale-105'
                              : 'text-cyan-300'
                          }`}
                        >
                          <ChevronUp className="w-4 h-4 text-accent-cyan inline" />
                          {token.text}
                        </span>
                      );
                    }

                    if (token.type === 'pitch-down') {
                      return (
                        <span
                          key={token.id}
                          className={`inline-flex items-center gap-0.5 font-semibold transition-all ${
                            isActive
                              ? 'text-accent-violet bg-violet-950/80 px-2 py-0.5 rounded ring-2 ring-accent-violet scale-105'
                              : 'text-violet-300'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4 text-accent-violet inline" />
                          {token.text}
                        </span>
                      );
                    }

                    if (token.type === 'stress') {
                      return (
                        <span
                          key={token.id}
                          className={`font-black tracking-wide underline decoration-accent-emerald decoration-2 underline-offset-4 transition-all ${
                            isActive
                              ? 'text-accent-emerald bg-emerald-950/80 px-2 py-0.5 rounded ring-2 ring-accent-emerald scale-105'
                              : 'text-white'
                          }`}
                        >
                          {token.text}
                        </span>
                      );
                    }

                    // Normal word
                    return (
                      <span
                        key={token.id}
                        className={`transition-all ${
                          isActive
                            ? 'text-white bg-studio-700 px-1.5 py-0.5 rounded font-bold ring-1 ring-white/40 scale-105'
                            : 'text-studio-200'
                        }`}
                      >
                        {token.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Vocal Delivery Director Notes */}
        <div className="p-4 rounded-xl bg-studio-900/90 border border-studio-700/60 text-xs">
          <div className="flex items-center gap-2 font-mono font-bold text-accent-cyan uppercase mb-1">
            <Info className="w-4 h-4" /> Vocal Shadowing Protocol
          </div>
          <p className="text-studio-300 leading-relaxed">
            Record in one breath per segment. Do not speed through the <code>[pause]</code> markers — silence commands attention on vertical feeds. Drop pitch on the final word of each segment to sound grounded, not searching for validation.
          </p>
        </div>
      </div>
    </div>
  );
};
