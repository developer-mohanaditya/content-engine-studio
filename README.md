# Content Engine Studio (`content.aweditya.com`)

> Standalone vertical video production studio, teleprompter, and content calendar built for **Mohan Aditya Sadhanala** ([@developer-mohanaditya](https://github.com/developer-mohanaditya)).
> Designed for rapid daily Instagram Reels execution with zero-budget cloud infrastructure (**$0.00 / month**).

---

## 🎯 Architecture & Pillars

Content Engine Studio automates and streamlines the end-to-end production of vertical short-form video (Instagram Reels / YouTube Shorts):

1. **60 / 40 Pillar Balance Tracker:**
   - **60% Tech Building:** Weekly lean AI apps, custom tools, RAG architectures, local models.
   - **40% Personal Journal:** Paris founder life, reflections along the Seine, unfiltered solopreneur discipline.
2. **3-Layer Hook Psychology & Superego Protocol:**
   - Evaluates curiosity gaps, retention angles, emotional resonance, and calculated failure risks (<40% threshold) with explicit technical remedies before shooting.
3. **Dual Storyboard Director:**
   - **Multi-Shot Cut Breakdown:** 9:16 vertical viewport preview, camera optics, shot transitions, and visual cues.
   - **1-Take Continuous Blocking:** Spatial framing, stationary desk rigging, lighting notes, and gesture/gaze timeline.
4. **Interactive Live Lyrics Cadence Player:**
   - Teleprompter with synchronized speech playback and explicit vocal delivery notation:
     - `[pause:short]` (0.3s) & `[pause:long]` (0.8s) micro-silence cues
     - `▲ Pitch Rise` (curiosity gap inflections)
     - `▼ Cadence Drop` (grounded terminal authority)
     - `*Stress Accent*` (heavy technical noun emphasis)
     - Rehearsal speed controller (`0.75x`, `1.0x`, `1.25x`) and synthetic voice audition.
5. **Verified Instagram Creator Benchmarks:**
   - Deconstructed vocal cadence and physical blocking models from verified creators:
     - **Nick Saraev** (`@nick_saraev`) — 145 WPM, 400ms pause, low-frequency authority.
     - **Liam Johnston** (`@liamjohnston.ai`) — 170 WPM, 250ms pause, high-energy rapid demo.
     - **Riley Brown** (`@realrileybrown`) — 155 WPM, 320ms pause, conversational vibe coding.
     - **Liam Ottley** (`@liamottley`) — 140 WPM, 450ms pause, strategic founder presence.
     - **Marc Lou** (`@marc_louvion`) — 135 WPM, 500ms pause, deadpan unvarnished founder reality.

---

## 💰 Zero-Budget Storage Architecture ($0.00 / Month)

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT ENGINE STUDIO                    │
│                  (content.aweditya.com)                     │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
     Heavy Media Streaming            Structured Metadata
               │                              │
               ▼                              ▼
    ┌──────────────────────┐       ┌──────────────────────┐
    │    Cloudflare R2     │       │  Supabase Postgres   │
    │  (10 GB Free Tier)   │       │  (500 MB Free Tier)  │
    │  Zero Egress ($0.00) │       │   SQL Schema ($0.00) │
    └──────────────────────┘       └──────────────────────┘
```

- **Cloudflare R2:** Master 4K MP4s, WAV vocal takes, storyboard frame assets. 10 GB free monthly storage, **zero bandwidth/egress fees**.
- **Supabase PostgreSQL:** Video status, hooks, shot timelines, script cadence tokens. Full migration schema in `supabase/schema.sql`.

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/developer-mohanaditya/content-engine-studio.git
cd content-engine-studio
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=content-aweditya-media
NEXT_PUBLIC_R2_PUBLIC_DOMAIN=https://r2.aweditya.com
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3005](http://localhost:3005) in your browser.

---

## 📄 License
MIT License. Built by Mohan Aditya Sadhanala ([@developer-mohanaditya](https://github.com/developer-mohanaditya)).
