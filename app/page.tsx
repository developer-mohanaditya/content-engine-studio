'use client';

import React, { useState } from 'react';
import { Header, StudioTab } from '@/components/Header';
import { CalendarView } from '@/components/CalendarView';
import { VideoDetailView } from '@/components/VideoDetailView';
import { StoryboardView } from '@/components/StoryboardView';
import { CadencePlayer } from '@/components/CadencePlayer';
import { BenchmarksView } from '@/components/BenchmarksView';
import { R2StorageView } from '@/components/R2StorageView';
import { AddVideoModal } from '@/components/AddVideoModal';
import { LiteStudioView } from '@/components/LiteStudioView';
import { INITIAL_VIDEOS } from '@/lib/sample-data';
import { VideoItem, VideoStatus } from '@/types/content';

export default function ContentEngineStudioPage() {
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [selectedVideoId, setSelectedVideoId] = useState<string>('VID-001');
  const [activeTab, setActiveTab] = useState<StudioTab>('cadence');
  const [isLiteMode, setIsLiteMode] = useState<boolean>(true); // Default to distraction-free Lite Mode
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
          cameraFraming: 'Close-Up',
          visualAction: 'Subject looks into camera to deliver hook',
          durationSec: 3.0,
          vocalCue: data.hook?.text || 'Opening line',
          onScreenText: 'HOOK CUE'
        }
      ],
      continuousBlocking: {
        cameraSetup: 'Vertical 9:16 stationary take',
        lighting: 'Single soft key light',
        movementTimeline: [
          { timestampSec: 0, action: 'Direct gaze into lens', gazeDirection: 'Direct lens' }
        ]
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

  // If in Lite Mode, render the distraction-free single-screen prompter
  if (isLiteMode) {
    return (
      <LiteStudioView
        videos={videos}
        currentVideo={selectedVideo}
        onSelectVideo={(v) => setSelectedVideoId(v.id)}
        onExitLiteMode={() => setIsLiteMode(false)}
      />
    );
  }

  // Full Studio Mode
  return (
    <div className="min-h-screen bg-studio-950 text-white flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedVideoNumber={selectedVideo.videoNumber}
        totalVideos={videos.length}
        onEnterLiteMode={() => setIsLiteMode(true)}
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

        {activeTab === 'benchmarks' && (
          <BenchmarksView />
        )}

        {activeTab === 'storage' && (
          <R2StorageView
            videos={videos}
          />
        )}
      </main>

      {/* Propose Video Modal */}
      {isAddModalOpen && (
        <AddVideoModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddNewVideo}
        />
      )}
    </div>
  );
}
