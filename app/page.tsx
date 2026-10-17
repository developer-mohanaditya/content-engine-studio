'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { CalendarView } from '@/components/CalendarView';
import { VideoDetailView } from '@/components/VideoDetailView';
import { StoryboardView } from '@/components/StoryboardView';
import { CadencePlayer } from '@/components/CadencePlayer';
import { R2StorageView } from '@/components/R2StorageView';
import { AddVideoModal } from '@/components/AddVideoModal';
import { INITIAL_VIDEOS } from '@/lib/sample-data';
import { VideoItem, VideoStatus } from '@/types/content';

export default function ContentEngineStudioPage() {
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [selectedVideoId, setSelectedVideoId] = useState<string>('VID-001');
  const [activeTab, setActiveTab] = useState<'calendar' | 'storyboard' | 'cadence' | 'storage'>('calendar');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const selectedVideo = videos.find((v) => v.id === selectedVideoId) || videos[0];

  const handleUpdateStatus = (newStatus: VideoStatus) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === selectedVideo.id ? { ...v, status: newStatus } : v))
    );
  };

  const handleAddNewVideo = (data: Partial<VideoItem>) => {
    const nextNum = videos.length + 1;
    const newVid: VideoItem = {
      id: `VID-00${nextNum}`,
      videoNumber: nextNum,
      title: data.title || `Video #${nextNum}`,
      pillar: data.pillar || 'Tech Building (60%)',
      status: 'Idea',
      postDate: data.postDate || '2026-10-30',
      targetPlatform: 'Instagram Reels',
      hook: data.hook || {
        text: 'New hook text',
        visualOpening: 'Direct camera address',
        retentionAngle: 'Actionable insight',
        curiosityGap: 'What is inside?',
        emotionalResonance: 'Builder grit',
        estimatedFailureRisk: 19,
        riskAnalysis: 'Risk of low contrast',
        riskRemedy: 'Speed up opening cadence',
        audienceRetentionEstimate: '78% through 3s'
      },
      storyboardMode: 'multi-shot',
      multiShotBreakdown: [
        {
          shotNumber: 1,
          shotType: 'Close-Up',
          cameraAngle: 'Eye-level 50mm',
          framingAction: 'Subject looks into camera to deliver hook',
          durationSec: 3.0,
          visualCue: 'Cold ambient lighting with screen reflection.',
          accentColor: '#00F2FE'
        }
      ],
      continuousBlocking: {
        framing: 'Vertical 9:16 stationary take',
        cameraPosition: 'Desk mount 60cm distance',
        lightingNotes: 'Single soft key light',
        audioGear: 'Directional USB mic',
        movementCues: []
      },
      scriptSegments: [
        {
          id: `seg-${nextNum}-1`,
          startTimeSec: 0,
          durationSec: 3.5,
          speaker: 'Mohan',
          plainText: data.hook?.text || 'Opening line of script.',
          tokens: [
            { id: 't-new-1', text: data.hook?.text || 'Opening line', type: 'stress', durationMs: 600 }
          ]
        }
      ],
      storage: {
        r2Bucket: 'content-aweditya-media',
        videoObjectKey: '',
        audioObjectKey: '',
        storyboardKeys: [],
        lastSyncTimestamp: new Date().toISOString(),
        syncStatus: 'Local Draft',
        fileSizeBytes: 0
      },
      notes: 'Proposed in studio dashboard'
    };

    setVideos([newVid, ...videos]);
    setSelectedVideoId(newVid.id);
  };

  return (
    <div className="min-h-screen bg-studio-900 text-studio-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedVideoNumber={selectedVideo.videoNumber}
        totalVideos={videos.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <CalendarView
              videos={videos}
              selectedVideo={selectedVideo}
              onSelectVideo={(v) => setSelectedVideoId(v.id)}
              onNavigateToStoryboard={(v) => {
                setSelectedVideoId(v.id);
                setActiveTab('storyboard');
              }}
              onNavigateToCadence={(v) => {
                setSelectedVideoId(v.id);
                setActiveTab('cadence');
              }}
              onAddNewVideo={() => setIsAddModalOpen(true)}
            />

            {/* Video Detail & Superego Hook Analysis below Calendar */}
            <VideoDetailView
              video={selectedVideo}
              onUpdateStatus={handleUpdateStatus}
              onGoToStoryboard={() => setActiveTab('storyboard')}
              onGoToCadence={() => setActiveTab('cadence')}
            />
          </div>
        )}

        {activeTab === 'storyboard' && (
          <StoryboardView
            video={selectedVideo}
            onNavigateToCadence={() => setActiveTab('cadence')}
          />
        )}

        {activeTab === 'cadence' && (
          <CadencePlayer
            video={selectedVideo}
          />
        )}

        {activeTab === 'storage' && (
          <R2StorageView
            videos={videos}
          />
        )}
      </main>

      {/* Modal */}
      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddNewVideo}
        nextNumber={videos.length + 1}
      />

      {/* Footer */}
      <footer className="border-t border-studio-800/80 bg-studio-900 py-4 text-center text-xs font-mono text-studio-500">
        Content Engine Studio • Target: content.aweditya.com • Designed for Mohan Aditya Sadhanala (@developer-mohanaditya)
      </footer>
    </div>
  );
}
