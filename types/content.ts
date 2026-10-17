export type ContentPillar = 'Tech Building (60%)' | 'Personal Journal (40%)';

export type VideoStatus = 'Idea' | 'Scripting' | 'Storyboarded' | 'Recorded' | 'Ready to Post' | 'Published';

export interface ScriptToken {
  id: string;
  text: string;
  type: 'word' | 'pause-short' | 'pause-long' | 'pitch-up' | 'pitch-down' | 'stress';
  rawAnnotation?: string;
  durationMs: number;
}

export interface ScriptSegment {
  id: string;
  startTimeSec: number;
  durationSec: number;
  speaker: string;
  tokens: ScriptToken[];
  plainText: string;
  shotRef?: number;
}

export interface MultiShotItem {
  shotNumber: number;
  shotType: 'Extreme Close-Up' | 'Close-Up' | 'Medium Close-Up' | 'Medium Shot' | 'Over-the-shoulder' | 'POV / Screen';
  cameraAngle: string;
  framingAction: string;
  durationSec: number;
  visualCue: string;
  r2AssetKey?: string;
  accentColor?: string;
}

export interface ContinuousMovementCue {
  timeSec: number;
  cue: string;
  gesture: string;
  position: string;
  vocalTransition: string;
}

export interface ContinuousBlocking {
  framing: string;
  cameraPosition: string;
  lightingNotes: string;
  audioGear: string;
  movementCues: ContinuousMovementCue[];
}

export interface HookPsychology {
  text: string;
  visualOpening: string;
  retentionAngle: string;
  curiosityGap: string;
  emotionalResonance: string;
  estimatedFailureRisk: number; // e.g. 18%
  riskAnalysis: string;
  riskRemedy: string;
  audienceRetentionEstimate: string;
}

export interface R2StorageMetadata {
  r2Bucket: string;
  videoObjectKey?: string;
  audioObjectKey?: string;
  storyboardKeys: string[];
  lastSyncTimestamp: string;
  syncStatus: 'Synced' | 'Pending' | 'Local Draft';
  fileSizeBytes?: number;
}

export interface VideoItem {
  id: string;
  videoNumber: number;
  title: string;
  pillar: ContentPillar;
  status: VideoStatus;
  postDate: string;
  targetPlatform: 'Instagram Reels' | 'YouTube Shorts' | 'Both';
  hook: HookPsychology;
  storyboardMode: 'multi-shot' | 'continuous';
  multiShotBreakdown: MultiShotItem[];
  continuousBlocking: ContinuousBlocking;
  scriptSegments: ScriptSegment[];
  storage: R2StorageMetadata;
  notes: string;
}
