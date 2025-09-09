-- Step 3: Create fresh tables with consistent UUID types
-- Run this AFTER dropping existing tables

-- Create teams table
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(50) DEFAULT 'blue',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_sets table
CREATE TABLE game_sets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(100),
  is_active BOOLEAN DEFAULT true
);

-- Create questions table
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_set_id UUID NOT NULL REFERENCES game_sets(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create answers table
CREATE TABLE answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  text VARCHAR(200) NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_set_id UUID NOT NULL REFERENCES game_sets(id) ON DELETE CASCADE,
  team1_id UUID REFERENCES teams(id),
  team2_id UUID REFERENCES teams(id),
  team1_score INTEGER DEFAULT 0,
  team2_score INTEGER DEFAULT 0,
  current_question_index INTEGER DEFAULT 0,
  strikes INTEGER DEFAULT 0,
  game_status VARCHAR(20) DEFAULT 'waiting',
  started_at TIMESTAMP WITH TIME ZONE,
  finished_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_answers table
CREATE TABLE game_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  answer_id UUID NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  revealed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  revealed_by_team INTEGER
);

-- Create indexes
CREATE INDEX idx_game_sets_code ON game_sets(code);
CREATE INDEX idx_questions_game_set ON questions(game_set_id, order_index);
CREATE INDEX idx_answers_question ON answers(question_id, order_index);
CREATE INDEX idx_games_status ON games(game_status);
CREATE INDEX idx_game_answers_game ON game_answers(game_id);
