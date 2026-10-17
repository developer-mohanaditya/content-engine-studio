import { VideoItem } from '@/types/content';

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'VID-001',
    videoNumber: 1,
    title: 'The Silent Builder: Why I am Shipping in Public Now',
    pillar: 'Tech Building (60%)',
    status: 'Ready to Post',
    postDate: '2026-10-18',
    targetPlatform: 'Instagram Reels',
    notes: 'Inaugural reel defining the brand tone. Pure raw honesty, zero AI clichés.',
    hook: {
      text: "I've been building for years in silence, but not anymore.",
      visualOpening: 'Direct eye contact, lens at forehead level angled 5° down. Ambient Paris desk light in background, terminal cursor blinking on laptop.',
      retentionAngle: 'Immediate high-stakes disruption of typical "overnight tech founder" illusions.',
      curiosityGap: 'What forced the shift from silent engineering to radical public transparency?',
      emotionalResonance: 'Speaks directly to technical builders who hide behind perfectionism instead of shipping.',
      estimatedFailureRisk: 18,
      riskAnalysis: 'Generic founder vulnerability trap if delivered too slowly or with melodramatic pauses.',
      riskRemedy: 'Cut first sentence cadence to under 2.8 seconds, drop pitch sharply on "not anymore", instantly cut to code diff.',
      audienceRetentionEstimate: '82% through 3s, 64% through 15s, 51% full watch-through.'
    },
    storyboardMode: 'multi-shot',
    multiShotBreakdown: [
      {
        shotNumber: 1,
        shotType: 'Close-Up',
        cameraAngle: 'Eye-level 50mm, slight high angle (5°)',
        framingAction: 'Holding Samsung S26 Ultra steady. Mohan looking dead into lens. Zero smile, steady gaze.',
        durationSec: 3.2,
        visualCue: 'Cold ambient lighting, sharp focus on eyes, studio dark behind.',
        r2AssetKey: 'storyboards/vid001/shot_01_closeup_hook.jpg',
        accentColor: '#00F2FE'
      },
      {
        shotNumber: 2,
        shotType: 'POV / Screen',
        cameraAngle: 'Top-down 45° over shoulder onto MacBook Pro display',
        framingAction: 'Finger hits Enter on git push. Terminal stdout scrolling green commits.',
        durationSec: 2.8,
        visualCue: 'Motion blur on terminal scroll, screen glow reflecting on keyboard.',
        r2AssetKey: 'storyboards/vid001/shot_02_screen_commit.jpg',
        accentColor: '#10B981'
      },
      {
        shotNumber: 3,
        shotType: 'Medium Shot',
        cameraAngle: '35mm wide, side profile desk view',
        framingAction: 'Leaning back in chair, turning head toward camera: "Building a lean product every single week."',
        durationSec: 4.5,
        visualCue: 'Warm desk lamp contrast against cool monitor light.',
        r2AssetKey: 'storyboards/vid001/shot_03_medium_desk.jpg',
        accentColor: '#F59E0B'
      },
      {
        shotNumber: 4,
        shotType: 'Extreme Close-Up',
        cameraAngle: 'Macro lens or 3x optical crop on notebook diagram',
        framingAction: 'Hand underlines "Day 7: Launch & Validate or Kill".',
        durationSec: 2.5,
        visualCue: 'Pencil graphite sheen, tactile sound design synchronization.',
        r2AssetKey: 'storyboards/vid001/shot_04_macro_journal.jpg',
        accentColor: '#7F00FF'
      },
      {
        shotNumber: 5,
        shotType: 'Close-Up',
        cameraAngle: 'Straight eye-level',
        framingAction: 'Final hook payoff and call to follow the weekly build logs.',
        durationSec: 3.0,
        visualCue: 'Definitive nod, screen blackout precisely at final syllable.',
        r2AssetKey: 'storyboards/vid001/shot_05_closeup_outro.jpg',
        accentColor: '#F43F5E'
      }
    ],
    continuousBlocking: {
      framing: 'Continuous vertical 9:16 frame. Camera mounted stationary on desk mount at 1.4m height.',
      cameraPosition: 'Desk center, 65cm distance from chest.',
      lightingNotes: 'Single key light 45° camera left, ambient window diffuse light on right.',
      audioGear: 'Samsung S26 Ultra onboard array with directional focus mode + local lapel mic backup.',
      movementCues: [
        {
          timeSec: 0,
          cue: 'Static locked posture',
          gesture: 'Hands on keyboard, looking directly into lens',
          position: 'Center frame',
          vocalTransition: 'Low, resonant opening tone'
        },
        {
          timeSec: 3.2,
          cue: 'Slight lean forward',
          gesture: 'Index finger taps desk rhythmically on cadence beat',
          position: 'Framing tightens organically by leaning 8cm forward',
          vocalTransition: 'Pitch rising on "building", dropping on "silence"'
        },
        {
          timeSec: 7.5,
          cue: 'Turn to screen and back',
          gesture: 'Glance right at monitor, then snap back to lens',
          position: 'Dynamic gaze redirection',
          vocalTransition: 'Accelerated technical delivery'
        },
        {
          timeSec: 12.0,
          cue: 'Lean back with resolved posture',
          gesture: 'Open palm gesture toward viewer',
          position: 'Original center framing restored',
          vocalTransition: 'Decisive down-cadence finish'
        }
      ]
    },
    scriptSegments: [
      {
        id: 'seg-1',
        startTimeSec: 0,
        durationSec: 3.2,
        speaker: 'Mohan',
        plainText: "I've been building for years in silence, [pause:short] but not anymore.",
        shotRef: 1,
        tokens: [
          { id: 't-1', text: "I've", type: 'word', durationMs: 250 },
          { id: 't-2', text: 'been', type: 'word', durationMs: 200 },
          { id: 't-3', text: 'building', type: 'stress', durationMs: 450 },
          { id: 't-4', text: 'for', type: 'word', durationMs: 150 },
          { id: 't-5', text: 'years', type: 'word', durationMs: 350 },
          { id: 't-6', text: 'in', type: 'word', durationMs: 150 },
          { id: 't-7', text: 'silence,', type: 'pitch-down', durationMs: 500 },
          { id: 't-8', text: '[pause:short]', type: 'pause-short', rawAnnotation: '[pause:short]', durationMs: 300 },
          { id: 't-9', text: 'but', type: 'word', durationMs: 200 },
          { id: 't-10', text: 'not', type: 'stress', durationMs: 300 },
          { id: 't-11', text: 'anymore.', type: 'pitch-down', durationMs: 550 },
        ]
      },
      {
        id: 'seg-2',
        startTimeSec: 3.2,
        durationSec: 3.5,
        speaker: 'Mohan',
        plainText: "Most people spend ▲ six months on a slide deck. [pause:long] I give myself ▼ seven days.",
        shotRef: 2,
        tokens: [
          { id: 't-12', text: 'Most', type: 'word', durationMs: 250 },
          { id: 't-13', text: 'people', type: 'word', durationMs: 300 },
          { id: 't-14', text: 'spend', type: 'word', durationMs: 250 },
          { id: 't-15', text: 'six months', type: 'pitch-up', durationMs: 600 },
          { id: 't-16', text: 'on', type: 'word', durationMs: 150 },
          { id: 't-17', text: 'a', type: 'word', durationMs: 100 },
          { id: 't-18', text: 'slide deck.', type: 'word', durationMs: 450 },
          { id: 't-19', text: '[pause:long]', type: 'pause-long', rawAnnotation: '[pause:long]', durationMs: 800 },
          { id: 't-20', text: 'I', type: 'word', durationMs: 150 },
          { id: 't-21', text: 'give', type: 'word', durationMs: 200 },
          { id: 't-22', text: 'myself', type: 'word', durationMs: 250 },
          { id: 't-23', text: 'seven days.', type: 'pitch-down', durationMs: 650 },
        ]
      },
      {
        id: 'seg-3',
        startTimeSec: 6.7,
        durationSec: 4.8,
        speaker: 'Mohan',
        plainText: "One lean AI tool every weekend. [pause:short] Real code, ▲ real users, ▼ zero fluff.",
        shotRef: 3,
        tokens: [
          { id: 't-24', text: 'One', type: 'stress', durationMs: 280 },
          { id: 't-25', text: 'lean', type: 'word', durationMs: 250 },
          { id: 't-26', text: 'AI', type: 'stress', durationMs: 300 },
          { id: 't-27', text: 'tool', type: 'word', durationMs: 300 },
          { id: 't-28', text: 'every', type: 'word', durationMs: 250 },
          { id: 't-29', text: 'weekend.', type: 'pitch-down', durationMs: 500 },
          { id: 't-30', text: '[pause:short]', type: 'pause-short', rawAnnotation: '[pause:short]', durationMs: 300 },
          { id: 't-31', text: 'Real', type: 'stress', durationMs: 280 },
          { id: 't-32', text: 'code,', type: 'pitch-up', durationMs: 400 },
          { id: 't-33', text: 'real', type: 'stress', durationMs: 280 },
          { id: 't-34', text: 'users,', type: 'pitch-up', durationMs: 400 },
          { id: 't-35', text: 'zero', type: 'stress', durationMs: 320 },
          { id: 't-36', text: 'fluff.', type: 'pitch-down', durationMs: 550 },
        ]
      },
      {
        id: 'seg-4',
        startTimeSec: 11.5,
        durationSec: 4.5,
        speaker: 'Mohan',
        plainText: "If it fails, [pause:short] I learn. If it works, ▲ we scale. Follow along.",
        shotRef: 5,
        tokens: [
          { id: 't-37', text: 'If', type: 'word', durationMs: 180 },
          { id: 't-38', text: 'it', type: 'word', durationMs: 150 },
          { id: 't-39', text: 'fails,', type: 'word', durationMs: 350 },
          { id: 't-40', text: '[pause:short]', type: 'pause-short', rawAnnotation: '[pause:short]', durationMs: 300 },
          { id: 't-41', text: 'I', type: 'word', durationMs: 200 },
          { id: 't-42', text: 'learn.', type: 'pitch-down', durationMs: 500 },
          { id: 't-43', text: 'If', type: 'word', durationMs: 180 },
          { id: 't-44', text: 'it', type: 'word', durationMs: 150 },
          { id: 't-45', text: 'works,', type: 'word', durationMs: 350 },
          { id: 't-46', text: 'we', type: 'word', durationMs: 150 },
          { id: 't-47', text: 'scale.', type: 'pitch-up', durationMs: 450 },
          { id: 't-48', text: 'Follow', type: 'stress', durationMs: 320 },
          { id: 't-49', text: 'along.', type: 'pitch-down', durationMs: 550 },
        ]
      }
    ],
    storage: {
      r2Bucket: 'content-aweditya-media',
      videoObjectKey: 'reels/2026/10/reel_001_master_4k.mp4',
      audioObjectKey: 'reels/2026/10/reel_001_voice_cadence_v3.wav',
      storyboardKeys: [
        'storyboards/vid001/shot_01_closeup_hook.jpg',
        'storyboards/vid001/shot_02_screen_commit.jpg',
        'storyboards/vid001/shot_03_medium_desk.jpg',
        'storyboards/vid001/shot_04_macro_journal.jpg',
        'storyboards/vid001/shot_05_closeup_outro.jpg'
      ],
      lastSyncTimestamp: '2026-10-17T03:45:00Z',
      syncStatus: 'Synced',
      fileSizeBytes: 48920150
    }
  },
  {
    id: 'VID-002',
    videoNumber: 2,
    title: 'How I Built Freebuff Focus Mode in 48 Hours',
    pillar: 'Tech Building (60%)',
    status: 'Storyboarded',
    postDate: '2026-10-21',
    targetPlatform: 'Both',
    notes: 'Technical breakdown of building a custom distraction blocker. Emphasize self-reliance.',
    hook: {
      text: "I was wasting 90 minutes every day on feeds, so I coded my own blocker.",
      visualOpening: 'Screen recording showing an aggressive custom popup killing social media feeds instantly.',
      retentionAngle: 'Action-oriented problem solving over passive consumption.',
      curiosityGap: 'Why code a custom blocker instead of downloading an existing Chrome extension?',
      emotionalResonance: 'Directly hits frustration with modern manipulative algorithmic feeds.',
      estimatedFailureRisk: 15,
      riskAnalysis: 'Risk of coming across as just another productivity tip.',
      riskRemedy: 'Show the raw TypeScript codebase and memory footprint immediately within 4 seconds.',
      audienceRetentionEstimate: '79% through 3s, 59% through 15s.'
    },
    storyboardMode: 'multi-shot',
    multiShotBreakdown: [
      {
        shotNumber: 1,
        shotType: 'POV / Screen',
        cameraAngle: 'Direct screen capture with picture-in-picture circle of Mohan',
        framingAction: 'Opening browser, feed blocked instantly with clean terminal message: "GET BACK TO WORK".',
        durationSec: 3.5,
        visualCue: 'High contrast black and white terminal UI overlay.',
        accentColor: '#00F2FE'
      },
      {
        shotNumber: 2,
        shotType: 'Close-Up',
        cameraAngle: '45mm eye level',
        framingAction: 'Explaining why commercial extensions fail: privacy leakage and easy bypass buttons.',
        durationSec: 4.2,
        visualCue: 'Sharp direct address, high vocal energy.',
        accentColor: '#10B981'
      },
      {
        shotNumber: 3,
        shotType: 'POV / Screen',
        cameraAngle: 'Code walkthrough on VS Code',
        framingAction: 'Highlighting 40 lines of core blocking logic and local storage key verification.',
        durationSec: 5.0,
        visualCue: 'Synthesized typing audio and syntax highlight glow.',
        accentColor: '#F59E0B'
      }
    ],
    continuousBlocking: {
      framing: 'Continuous desk take with laptop tilted at 45° angle beside presenter.',
      cameraPosition: 'Left desk mount, 75cm distance.',
      lightingNotes: 'Backlit LED strip, soft overhead.',
      audioGear: 'Directional USB boundary microphone.',
      movementCues: [
        {
          timeSec: 0,
          cue: 'Screen point',
          gesture: 'Points to laptop screen without looking away from lens',
          position: 'Center left',
          vocalTransition: 'Fast tempo setup'
        },
        {
          timeSec: 5.0,
          cue: 'Dual hand open gesture',
          gesture: 'Both hands explain architectural logic',
          position: 'Center',
          vocalTransition: 'Firm mid-range authority'
        }
      ]
    },
    scriptSegments: [
      {
        id: 'seg-201',
        startTimeSec: 0,
        durationSec: 4.0,
        speaker: 'Mohan',
        plainText: "I was wasting 90 minutes a day on feeds. [pause:short] So I coded my own blocker.",
        tokens: [
          { id: 't-201', text: 'I', type: 'word', durationMs: 150 },
          { id: 't-202', text: 'was', type: 'word', durationMs: 150 },
          { id: 't-203', text: 'wasting', type: 'stress', durationMs: 350 },
          { id: 't-204', text: '90 minutes', type: 'pitch-up', durationMs: 600 },
          { id: 't-205', text: 'a day on feeds.', type: 'word', durationMs: 500 },
          { id: 't-206', text: '[pause:short]', type: 'pause-short', rawAnnotation: '[pause:short]', durationMs: 300 },
          { id: 't-207', text: 'So', type: 'word', durationMs: 200 },
          { id: 't-208', text: 'I', type: 'word', durationMs: 150 },
          { id: 't-209', text: 'coded', type: 'stress', durationMs: 350 },
          { id: 't-210', text: 'my', type: 'word', durationMs: 150 },
          { id: 't-211', text: 'own blocker.', type: 'pitch-down', durationMs: 600 },
        ]
      }
    ],
    storage: {
      r2Bucket: 'content-aweditya-media',
      videoObjectKey: 'reels/2026/10/reel_002_draft.mp4',
      audioObjectKey: 'reels/2026/10/reel_002_voice.wav',
      storyboardKeys: ['storyboards/vid002/shot_01.jpg', 'storyboards/vid002/shot_02.jpg'],
      lastSyncTimestamp: '2026-10-17T02:10:00Z',
      syncStatus: 'Pending',
      fileSizeBytes: 22100000
    }
  },
  {
    id: 'VID-003',
    videoNumber: 3,
    title: 'Paris Midnight Run: Reflections of a Solo Tech Founder',
    pillar: 'Personal Journal (40%)',
    status: 'Scripting',
    postDate: '2026-10-24',
    targetPlatform: 'Instagram Reels',
    notes: 'Atmospheric evening walk/run in Paris. Pure mood, unvarnished thoughts on discipline.',
    hook: {
      text: "Midnight in Paris. The streets are empty, and my code just compiled.",
      visualOpening: 'Handheld walking shot along Seine river lamp reflection, wet cobblestones, breathing mist.',
      retentionAngle: 'Atmospheric cinematic contrast between tech grind and historic city solitude.',
      curiosityGap: 'What is it actually like to navigate rigorous graduate school while building products non-stop?',
      emotionalResonance: 'Raw founder solitude, late-night discipline without theatrical melodrama.',
      estimatedFailureRisk: 22,
      riskAnalysis: 'Risk of romanticizing burnout or feeling like an aimless vlog.',
      riskRemedy: 'Ground each philosophical thought into an exact product decision made 2 hours earlier.',
      audienceRetentionEstimate: '75% through 3s, 54% through 15s.'
    },
    storyboardMode: 'continuous',
    multiShotBreakdown: [],
    continuousBlocking: {
      framing: 'Handheld Samsung S26 Ultra on ultra-steady gimbal or steady grip. Wide angle 24mm.',
      cameraPosition: 'Arm extended slightly above face level, walking pace.',
      lightingNotes: 'Parisian streetlights (amber sodium vapor + LED reflections on pavement).',
      audioGear: 'Lapel mic with deadcat wind protection clipped inside coat collar.',
      movementCues: [
        {
          timeSec: 0,
          cue: 'Walking into street lamp halo',
          gesture: 'Glance left at Seine bridge, turn back to camera',
          position: 'Mobile walking tracking shot',
          vocalTransition: 'Quiet, conversational, intimate tone'
        },
        {
          timeSec: 6.0,
          cue: 'Stop by bridge stone balustrade',
          gesture: 'Rest free hand on stone, turn camera slightly toward Eiffel tower in far background',
          position: 'Stationary framing with city depth',
          vocalTransition: 'Deliberate cadence with measured pauses'
        }
      ]
    },
    scriptSegments: [
      {
        id: 'seg-301',
        startTimeSec: 0,
        durationSec: 4.5,
        speaker: 'Mohan',
        plainText: "Midnight in Paris. [pause:short] The streets are dead quiet, [pause:short] and my build just passed.",
        tokens: [
          { id: 't-301', text: 'Midnight', type: 'stress', durationMs: 400 },
          { id: 't-302', text: 'in', type: 'word', durationMs: 150 },
          { id: 't-303', text: 'Paris.', type: 'pitch-down', durationMs: 500 },
          { id: 't-304', text: '[pause:short]', type: 'pause-short', rawAnnotation: '[pause:short]', durationMs: 300 },
          { id: 't-305', text: 'The', type: 'word', durationMs: 150 },
          { id: 't-306', text: 'streets', type: 'word', durationMs: 300 },
          { id: 't-307', text: 'are', type: 'word', durationMs: 150 },
          { id: 't-308', text: 'dead', type: 'stress', durationMs: 300 },
          { id: 't-309', text: 'quiet,', type: 'pitch-down', durationMs: 500 },
          { id: 't-310', text: '[pause:short]', type: 'pause-short', rawAnnotation: '[pause:short]', durationMs: 300 },
          { id: 't-311', text: 'and', type: 'word', durationMs: 150 },
          { id: 't-312', text: 'my', type: 'word', durationMs: 150 },
          { id: 't-313', text: 'build', type: 'stress', durationMs: 350 },
          { id: 't-314', text: 'just', type: 'word', durationMs: 200 },
          { id: 't-315', text: 'passed.', type: 'pitch-up', durationMs: 550 },
        ]
      }
    ],
    storage: {
      r2Bucket: 'content-aweditya-media',
      videoObjectKey: '',
      audioObjectKey: '',
      storyboardKeys: [],
      lastSyncTimestamp: '2026-10-17T01:15:00Z',
      syncStatus: 'Local Draft',
      fileSizeBytes: 0
    }
  },
  {
    id: 'VID-004',
    videoNumber: 4,
    title: 'Why RAG Systems Fail in Production (And the Fix)',
    pillar: 'Tech Building (60%)',
    status: 'Idea',
    postDate: '2026-10-28',
    targetPlatform: 'Instagram Reels',
    notes: 'Technical architectural truth on chunking traps and retrieval dilution.',
    hook: {
      text: "90% of AI startups are building RAG completely wrong.",
      visualOpening: 'Rapid diagram sketching with red marker crossing out naive cosine similarity vectors.',
      retentionAngle: 'Direct technical challenge to widespread bad tutorial advice.',
      curiosityGap: 'What is the exact chunking and re-ranking flaw causing production hallucinations?',
      emotionalResonance: 'Validates engineers frustrated by demo AI that collapses on real messy data.',
      estimatedFailureRisk: 19,
      riskAnalysis: 'Risk of alienating non-technical viewers if too jargon-heavy in first 5 seconds.',
      riskRemedy: 'Use an everyday analogy (finding a passport in a messy room vs a catalog) before dropping embedding details.',
      audienceRetentionEstimate: '84% through 3s, 67% through 15s.'
    },
    storyboardMode: 'multi-shot',
    multiShotBreakdown: [
      {
        shotNumber: 1,
        shotType: 'Close-Up',
        cameraAngle: 'Direct eye level',
        framingAction: 'Holding red marker: "90% of AI teams are building RAG wrong."',
        durationSec: 3.0,
        visualCue: 'High contrast studio lighting, stark background.',
        accentColor: '#F43F5E'
      }
    ],
    continuousBlocking: {
      framing: 'Whiteboard framing.',
      cameraPosition: 'Center 1.5m away.',
      lightingNotes: 'Even non-reflective whiteboard light.',
      audioGear: 'Lapel mic.',
      movementCues: []
    },
    scriptSegments: [
      {
        id: 'seg-401',
        startTimeSec: 0,
        durationSec: 3.5,
        speaker: 'Mohan',
        plainText: "90% of AI teams are building RAG [pause:short] completely wrong.",
        tokens: [
          { id: 't-401', text: '90%', type: 'stress', durationMs: 400 },
          { id: 't-402', text: 'of', type: 'word', durationMs: 150 },
          { id: 't-403', text: 'AI', type: 'stress', durationMs: 300 },
          { id: 't-404', text: 'teams', type: 'word', durationMs: 250 },
          { id: 't-405', text: 'are', type: 'word', durationMs: 150 },
          { id: 't-406', text: 'building', type: 'word', durationMs: 250 },
          { id: 't-407', text: 'RAG', type: 'stress', durationMs: 350 },
          { id: 't-408', text: '[pause:short]', type: 'pause-short', rawAnnotation: '[pause:short]', durationMs: 300 },
          { id: 't-409', text: 'completely', type: 'pitch-up', durationMs: 450 },
          { id: 't-410', text: 'wrong.', type: 'pitch-down', durationMs: 600 }
        ]
      }
    ],
    storage: {
      r2Bucket: 'content-aweditya-media',
      videoObjectKey: '',
      audioObjectKey: '',
      storyboardKeys: [],
      lastSyncTimestamp: '2026-10-17T00:50:00Z',
      syncStatus: 'Local Draft',
      fileSizeBytes: 0
    }
  }
];
