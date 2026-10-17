'use client';

import React, { useState } from 'react';
import { VideoItem, ContentPillar } from '@/types/content';
import { X, Sparkles, BrainCircuit } from 'lucide-react';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newVideo: Partial<VideoItem>) => void;
  nextNumber: number;
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  nextNumber
}) => {
  const [title, setTitle] = useState('');
  const [pillar, setPillar] = useState<ContentPillar>('Tech Building (60%)');
  const [hookText, setHookText] = useState('');
  const [visualOpening, setVisualOpening] = useState('');
  const [postDate, setPostDate] = useState('2026-10-25');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !hookText) return;

    onSave({
      title,
      pillar,
      postDate,
      hook: {
        text: hookText,
        visualOpening: visualOpening || 'Eye level, direct address into Samsung S26 Ultra.',
        retentionAngle: 'Direct technical disclosure',
        curiosityGap: 'What happened behind closed doors?',
        emotionalResonance: 'Relatable builder perseverance',
        estimatedFailureRisk: 19,
        riskAnalysis: 'Risk of opening too slowly without clear visual payoff.',
        riskRemedy: 'Deliver hook under 3.0s, cut directly to demonstration code.',
        audienceRetentionEstimate: '80% through 3s, 60% through 15s.'
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-studio-850 border border-studio-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-studio-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              Propose New Video #{nextNumber}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-studio-400 hover:text-white hover:bg-studio-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-studio-300 font-medium mb-1">Working Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Building an AI Memory System in 7 Days"
              className="w-full px-3 py-2 rounded-lg bg-studio-900 border border-studio-700 text-white placeholder-studio-500 focus:outline-none focus:border-accent-cyan"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-studio-300 font-medium mb-1">Content Pillar</label>
              <select
                value={pillar}
                onChange={(e) => setPillar(e.target.value as ContentPillar)}
                className="w-full px-3 py-2 rounded-lg bg-studio-900 border border-studio-700 text-white focus:outline-none focus:border-accent-cyan"
              >
                <option value="Tech Building (60%)">Tech Building (60%)</option>
                <option value="Personal Journal (40%)">Personal Journal (40%)</option>
              </select>
            </div>

            <div>
              <label className="block text-studio-300 font-medium mb-1">Post Target Date</label>
              <input
                type="date"
                value={postDate}
                onChange={(e) => setPostDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-studio-900 border border-studio-700 text-white focus:outline-none focus:border-accent-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-studio-300 font-medium mb-1">
              Spoken Hook Text (First 3s - High Impact)
            </label>
            <textarea
              required
              rows={2}
              value={hookText}
              onChange={(e) => setHookText(e.target.value)}
              placeholder="e.g. Most people think AI agents fail because of models. They're wrong."
              className="w-full px-3 py-2 rounded-lg bg-studio-900 border border-studio-700 text-white placeholder-studio-500 focus:outline-none focus:border-accent-cyan"
            />
          </div>

          <div>
            <label className="block text-studio-300 font-medium mb-1">Visual Opening Blocking</label>
            <input
              type="text"
              value={visualOpening}
              onChange={(e) => setVisualOpening(e.target.value)}
              placeholder="e.g. Eye level 50mm, terminal glowing in dark studio"
              className="w-full px-3 py-2 rounded-lg bg-studio-900 border border-studio-700 text-white placeholder-studio-500 focus:outline-none focus:border-accent-cyan"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-studio-700/60">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-studio-800 text-studio-300 font-medium hover:bg-studio-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-accent-cyan text-studio-950 font-bold hover:bg-cyan-400 transition-colors shadow-md"
            >
              Add Video to Studio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
