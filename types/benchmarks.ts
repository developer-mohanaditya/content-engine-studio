export interface CreatorBenchmark {
  id: string;
  name: string;
  instagramHandle: string;
  niche: string;
  primaryFormat: 'Face-to-Camera + Code Screen' | 'Dynamic Kinetic Walk' | 'High-Energy Rapid Breakdown' | 'Deadpan Founder Skit';
  metrics: {
    wpm: number; // Words per minute
    averagePauseMs: number;
    hookDeliverySpeedSec: number;
    pitchModulationStyle: string;
  };
  vocalCadenceDeconstruction: {
    openingPattern: string;
    pauseStrategy: string;
    stressPattern: string;
    endingDrop: string;
  };
  physicalBlockingCues: {
    cameraSetup: string;
    gazeAngle: string;
    handGestures: string;
    energyTransfer: string;
  };
  tacticalApplicationForMohan: string;
}

export const INSTAGRAM_BENCHMARKS: CreatorBenchmark[] = [
  {
    id: 'BENCH-01',
    name: 'Nick Saraev',
    instagramHandle: '@nick_saraev',
    niche: 'Autonomous AI Agents, n8n Pipelines & Low-Code Workflows',
    primaryFormat: 'Face-to-Camera + Code Screen',
    metrics: {
      wpm: 145,
      averagePauseMs: 400,
      hookDeliverySpeedSec: 2.6,
      pitchModulationStyle: 'Low-frequency resonant baseline with subtle downward inflections on conclusions.'
    },
    vocalCadenceDeconstruction: {
      openingPattern: 'Unvarnished, zero-hype hook statement delivered without a greeting. Drops right into the architecture.',
      pauseStrategy: 'Inserts clean 0.4s micro-silences right after dropping a bold claim, letting technical weight settle.',
      stressPattern: 'Stresses technical nouns (e.g., "webhook", "autonomous", "JSON schema") rather than hyperbolic adjectives.',
      endingDrop: 'Sharp cadence drop on the last word of every sentence. Zero vocal fry, zero upward questioning lilt.'
    },
    physicalBlockingCues: {
      cameraSetup: 'Stationary eye-level 50mm framing, desk background with dark ambience and soft key light.',
      gazeAngle: 'Unwavering direct lens lock for the first 3 seconds, then naturally shifts focus to screen.',
      handGestures: 'Compact box gestures within frame boundaries; open palms to demonstrate system logic.',
      energyTransfer: 'Calculated, authoritative, engineering-focused composure.'
    },
    tacticalApplicationForMohan: 'Ideal template for Mohan\'s 60% Tech Building videos (e.g. Reel #1, Freebuff Focus Mode, RAG architectures). Grounded authority that cuts through social media noise.'
  },
  {
    id: 'BENCH-02',
    name: 'Liam Johnston',
    instagramHandle: '@liamjohnston.ai',
    niche: 'Practical AI Agents, Claude Code, MCP & Workflow Hacks',
    primaryFormat: 'High-Energy Rapid Breakdown',
    metrics: {
      wpm: 170,
      averagePauseMs: 250,
      hookDeliverySpeedSec: 2.2,
      pitchModulationStyle: 'Dynamic rises (▲) on curiosity gaps, followed by fast, rhythmic machine-gun syllable streams.'
    },
    vocalCadenceDeconstruction: {
      openingPattern: 'Immediate problem-inversion hook ("Stop doing X manually", "Most people have no idea this tool exists").',
      pauseStrategy: 'Ultra-tight micro-pauses (0.2s - 0.25s) designed to maximize algorithmic watch-time and prevent scroll-away.',
      stressPattern: 'Rapid-fire stress accents on contrast words ("Instead of this... do that").',
      endingDrop: 'Quick pitch fall immediately leading into visual screen proof.'
    },
    physicalBlockingCues: {
      cameraSetup: 'Slightly closer framing (chest-up), high contrast lighting, rapid snap-zooms on key words.',
      gazeAngle: 'High-intensity eye contact with rapid micro-movements to screen and back.',
      handGestures: 'Finger points at screen overlays and rhythmic hand chops to punctuate syllable cadence.',
      energyTransfer: 'High urgency, discovery-driven excitement without feeling artificial.'
    },
    tacticalApplicationForMohan: 'Use when demonstrating rapid tool builds or highlighting friction points. Best for keeping retention high on 30-45 second quick-hit reels.'
  },
  {
    id: 'BENCH-03',
    name: 'Riley Brown',
    instagramHandle: '@realrileybrown',
    niche: 'AI Prototyping, Vibe Coding, Models & AI Video Generation',
    primaryFormat: 'Face-to-Camera + Code Screen',
    metrics: {
      wpm: 155,
      averagePauseMs: 320,
      hookDeliverySpeedSec: 2.4,
      pitchModulationStyle: 'Conversational mid-to-high pitch curve with energetic pitch spikes on breakthrough moments.'
    },
    vocalCadenceDeconstruction: {
      openingPattern: 'Casual, high-affinity hook: "I just built X with zero lines of traditional boilerplate."',
      pauseStrategy: 'Natural conversational breathing pauses (0.3s) synchronized with screen transitions.',
      stressPattern: 'Heavy emphasis on velocity metrics ("in 10 minutes", "completely free", "live today").',
      endingDrop: 'Grounded resolution transitioning into a clear call-to-action.'
    },
    physicalBlockingCues: {
      cameraSetup: 'Casual desk studio setting, laptop visible, warm ambient background lighting.',
      gazeAngle: 'Relaxed, conversational eye contact as if chatting directly with a technical peer across coffee.',
      handGestures: 'Spontaneous shrugs, screen pointing, and hands-on-keyboard framing.',
      energyTransfer: 'Relatable builder curiosity; turns complex AI paradigms into accessible building blocks.'
    },
    tacticalApplicationForMohan: 'Apply for interactive product reveals and weekend prototype teardowns. Keeps the tone accessible without diminishing technical depth.'
  },
  {
    id: 'BENCH-04',
    name: 'Liam Ottley',
    instagramHandle: '@liamottley',
    niche: 'AI Automation Agencies, Agentic Architectures & Client Systems',
    primaryFormat: 'Face-to-Camera + Code Screen',
    metrics: {
      wpm: 140,
      averagePauseMs: 450,
      hookDeliverySpeedSec: 2.8,
      pitchModulationStyle: 'Controlled, steady baritone pacing with extended silence intervals between conceptual blocks.'
    },
    vocalCadenceDeconstruction: {
      openingPattern: 'Strategic macro insight ("The landscape of AI agencies is completely shifting this month").',
      pauseStrategy: 'Deliberate long pauses (0.5s - 0.7s) before revealing key architectural diagrams.',
      stressPattern: 'Stresses business and strategic value words ("retention", "infrastructure", "client deployment").',
      endingDrop: 'Very deliberate downward terminal cadence that leaves no room for doubt.'
    },
    physicalBlockingCues: {
      cameraSetup: 'Clean corporate/studio background, professional lighting, vertical 9:16 stationary rig.',
      gazeAngle: 'Laser-focused eye contact with subtle nods reinforcing conviction.',
      handGestures: 'Structured architectural hand movements: framing spatial dimensions with palms.',
      energyTransfer: 'Executive founder authority; calm confidence and systematic execution.'
    },
    tacticalApplicationForMohan: 'Shadow for long-term strategic reels regarding Profeshare AI and ClearRoute architecture, where executive credibility and high trust are paramount.'
  },
  {
    id: 'BENCH-05',
    name: 'Marc Lou',
    instagramHandle: '@marc_louvion',
    niche: 'Solo Founder, Micro-SaaS, Rapid Shipping & Build-in-Public',
    primaryFormat: 'Deadpan Founder Skit',
    metrics: {
      wpm: 135,
      averagePauseMs: 500,
      hookDeliverySpeedSec: 2.5,
      pitchModulationStyle: 'Deadpan, monotone-leaning baseline with sudden comedic pitch inflections on absurdity.'
    },
    vocalCadenceDeconstruction: {
      openingPattern: 'Brutally honest, self-deprecating hook ("I spent 3 weeks building something nobody wanted... so I deleted it").',
      pauseStrategy: 'Extended comedic and tension pauses (0.6s - 0.8s) right before showing unvarnished reality.',
      stressPattern: 'Heavy stress on stark numbers and brutal truths ("0 users", "48 hours", "1 line of code").',
      endingDrop: 'Flat, uninflected finish that invites the viewer to laugh or reflect.'
    },
    physicalBlockingCues: {
      cameraSetup: 'Raw environmental shots (apartment desk, coffee shop, outdoor walking), natural lighting.',
      gazeAngle: 'Deadpan stare directly into lens, breaking the fourth wall.',
      handGestures: 'Minimalist: deadpan shrugs, simple point to screen, or physical interactions with everyday objects.',
      energyTransfer: 'Raw authenticity and relatable founder reality. Zero corporate gloss.'
    },
    tacticalApplicationForMohan: 'Crucial benchmark for Mohan\'s 40% Personal Journal reels (Paris midnight walks, reflections on solo founder grit, honest post-mortems of failed features).'
  }
];
