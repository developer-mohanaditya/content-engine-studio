-- ==============================================================================
-- CONTENT ENGINE STUDIO: SUPABASE POSTGRESQL SCHEMA (ZERO-BUDGET ARCHITECTURE)
-- Media files stored in Cloudflare R2 (10GB Free, 0 Egress)
-- Metadata, Scripts, Blocking, and Benchmarks stored in Supabase Postgres (500MB Free)
-- ==============================================================================

-- 1. VIDEOS TABLE
CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,                       -- e.g. 'VID-001'
    video_number INT NOT NULL UNIQUE,          -- Reel #1, Reel #2, etc.
    title TEXT NOT NULL,
    pillar TEXT NOT NULL CHECK (pillar IN ('Tech Building (60%)', 'Personal Journal (40%)')),
    status TEXT NOT NULL DEFAULT 'Idea' CHECK (status IN ('Idea', 'Scripting', 'Storyboarded', 'Recorded', 'Ready to Post', 'Published')),
    post_date DATE NOT NULL,
    target_platform TEXT NOT NULL DEFAULT 'Instagram Reels',
    storyboard_mode TEXT NOT NULL DEFAULT 'multi-shot' CHECK (storyboard_mode IN ('multi-shot', 'continuous')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. HOOK PSYCHOLOGY & SUPEREGO RISK TABLE
CREATE TABLE IF NOT EXISTS hooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id TEXT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    hook_text TEXT NOT NULL,
    visual_opening TEXT NOT NULL,
    retention_angle TEXT NOT NULL,
    curiosity_gap TEXT NOT NULL,
    emotional_resonance TEXT NOT NULL,
    estimated_failure_risk NUMERIC NOT NULL CHECK (estimated_failure_risk >= 0 AND estimated_failure_risk <= 100),
    risk_analysis TEXT NOT NULL,
    risk_remedy TEXT NOT NULL,
    audience_retention_estimate TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. MULTI-SHOT STORYBOARD TABLE
CREATE TABLE IF NOT EXISTS storyboard_shots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id TEXT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    shot_number INT NOT NULL,
    shot_type TEXT NOT NULL,                   -- 'Close-Up', 'Medium Shot', 'Screen / POV', etc.
    camera_angle TEXT NOT NULL,
    framing_action TEXT NOT NULL,
    duration_sec NUMERIC NOT NULL,
    visual_cue TEXT,
    accent_color TEXT DEFAULT '#00F2FE',
    r2_asset_key TEXT,                         -- Cloudflare R2 object key
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (video_id, shot_number)
);

-- 4. 1-TAKE CONTINUOUS BLOCKING TABLE
CREATE TABLE IF NOT EXISTS continuous_blocking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id TEXT NOT NULL UNIQUE REFERENCES videos(id) ON DELETE CASCADE,
    framing TEXT NOT NULL,
    camera_position TEXT NOT NULL,
    lighting_notes TEXT,
    audio_gear TEXT,
    movement_cues JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of timeline cues
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. SCRIPT SEGMENTS & LIVE LYRICS CADENCE TOKENS TABLE
CREATE TABLE IF NOT EXISTS script_segments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id TEXT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    segment_order INT NOT NULL,
    speaker TEXT NOT NULL DEFAULT 'Mohan',
    start_time_sec NUMERIC NOT NULL DEFAULT 0,
    duration_sec NUMERIC NOT NULL,
    plain_text TEXT NOT NULL,
    tokens JSONB NOT NULL DEFAULT '[]'::jsonb,         -- Array of ScriptToken objects (pauses, pitch, stress)
    shot_ref INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (video_id, segment_order)
);

-- 6. CLOUDFLARE R2 MEDIA ASSET REGISTRY TABLE
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id TEXT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    r2_bucket TEXT NOT NULL DEFAULT 'content-aweditya-media',
    r2_object_key TEXT NOT NULL UNIQUE,                -- e.g. 'reels/VID-001/master_4k.mp4'
    asset_type TEXT NOT NULL CHECK (asset_type IN ('master_video', 'audio_wav', 'storyboard_frame', 'thumbnail')),
    file_size_bytes BIGINT NOT NULL DEFAULT 0,
    etag TEXT,
    sync_status TEXT NOT NULL DEFAULT 'Synced' CHECK (sync_status IN ('Local Draft', 'Uploading', 'Synced', 'Failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for lightning-fast queries
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_post_date ON videos(post_date);
CREATE INDEX IF NOT EXISTS idx_shots_video_id ON storyboard_shots(video_id);
CREATE INDEX IF NOT EXISTS idx_segments_video_id ON script_segments(video_id);
CREATE INDEX IF NOT EXISTS idx_media_video_id ON media_assets(video_id);
