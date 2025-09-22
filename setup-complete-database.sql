-- Complete Family Feud Database Setup
-- This script ensures all necessary tables and columns exist

-- First check if we need to create tables or just add missing columns
DO $$
BEGIN
    -- Create teams table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'teams') THEN
        CREATE TABLE teams (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            color VARCHAR(50) DEFAULT 'blue',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;

    -- Create game_sets table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'game_sets') THEN
        CREATE TABLE game_sets (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            code VARCHAR(20) UNIQUE NOT NULL,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            created_by VARCHAR(100),
            is_active BOOLEAN DEFAULT true
        );
    END IF;

    -- Create questions table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'questions') THEN
        CREATE TABLE questions (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            game_set_id UUID NOT NULL REFERENCES game_sets(id) ON DELETE CASCADE,
            question TEXT NOT NULL,
            order_index INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;

    -- Create answers table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'answers') THEN
        CREATE TABLE answers (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
            text VARCHAR(200) NOT NULL,
            points INTEGER NOT NULL DEFAULT 0,
            order_index INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;

    -- Create games table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'games') THEN
        CREATE TABLE games (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            game_set_id UUID NOT NULL REFERENCES game_sets(id) ON DELETE CASCADE,
            team1_id UUID REFERENCES teams(id),
            team2_id UUID REFERENCES teams(id),
            team3_id UUID REFERENCES teams(id),
            team4_id UUID REFERENCES teams(id),
            team5_id UUID REFERENCES teams(id),
            team1_score INTEGER DEFAULT 0,
            team2_score INTEGER DEFAULT 0,
            team3_score INTEGER DEFAULT 0,
            team4_score INTEGER DEFAULT 0,
            team5_score INTEGER DEFAULT 0,
            team1_custom_name VARCHAR(100),
            team2_custom_name VARCHAR(100),
            team3_custom_name VARCHAR(100),
            team4_custom_name VARCHAR(100),
            team5_custom_name VARCHAR(100),
            team1_strikes INTEGER DEFAULT 0,
            team2_strikes INTEGER DEFAULT 0,
            team3_strikes INTEGER DEFAULT 0,
            team4_strikes INTEGER DEFAULT 0,
            team5_strikes INTEGER DEFAULT 0,
            current_question_index INTEGER DEFAULT 0,
            strikes INTEGER DEFAULT 0,
            game_status VARCHAR(20) DEFAULT 'waiting',
            started_at TIMESTAMP WITH TIME ZONE,
            finished_at TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;

    -- Create game_answers table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'game_answers') THEN
        CREATE TABLE game_answers (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
            answer_id UUID NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
            revealed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            revealed_by_team INTEGER
        );
    END IF;
END $$;

-- Now add any missing columns to existing tables
DO $$
BEGIN
    -- Add missing team score columns
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team3_score') THEN
        ALTER TABLE games ADD COLUMN team3_score INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team4_score') THEN
        ALTER TABLE games ADD COLUMN team4_score INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team5_score') THEN
        ALTER TABLE games ADD COLUMN team5_score INTEGER DEFAULT 0;
    END IF;

    -- Add missing team ID columns
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team3_id') THEN
        ALTER TABLE games ADD COLUMN team3_id UUID REFERENCES teams(id);
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team4_id') THEN
        ALTER TABLE games ADD COLUMN team4_id UUID REFERENCES teams(id);
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team5_id') THEN
        ALTER TABLE games ADD COLUMN team5_id UUID REFERENCES teams(id);
    END IF;

    -- Add missing custom team name columns
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team1_custom_name') THEN
        ALTER TABLE games ADD COLUMN team1_custom_name VARCHAR(100);
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team2_custom_name') THEN
        ALTER TABLE games ADD COLUMN team2_custom_name VARCHAR(100);
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team3_custom_name') THEN
        ALTER TABLE games ADD COLUMN team3_custom_name VARCHAR(100);
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team4_custom_name') THEN
        ALTER TABLE games ADD COLUMN team4_custom_name VARCHAR(100);
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team5_custom_name') THEN
        ALTER TABLE games ADD COLUMN team5_custom_name VARCHAR(100);
    END IF;

    -- Add missing team strike columns
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team1_strikes') THEN
        ALTER TABLE games ADD COLUMN team1_strikes INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team2_strikes') THEN
        ALTER TABLE games ADD COLUMN team2_strikes INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team3_strikes') THEN
        ALTER TABLE games ADD COLUMN team3_strikes INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team4_strikes') THEN
        ALTER TABLE games ADD COLUMN team4_strikes INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='games' AND column_name='team5_strikes') THEN
        ALTER TABLE games ADD COLUMN team5_strikes INTEGER DEFAULT 0;
    END IF;

    -- Add revealed_by_team column if missing
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='game_answers' AND column_name='revealed_by_team') THEN
        ALTER TABLE game_answers ADD COLUMN revealed_by_team INTEGER;
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_games_game_set_id ON games(game_set_id);
CREATE INDEX IF NOT EXISTS idx_games_game_status ON games(game_status);
CREATE INDEX IF NOT EXISTS idx_game_answers_game_id ON game_answers(game_id);
CREATE INDEX IF NOT EXISTS idx_questions_game_set_id ON questions(game_set_id);
CREATE INDEX IF NOT EXISTS idx_answers_question_id ON answers(question_id);

COMMIT;
