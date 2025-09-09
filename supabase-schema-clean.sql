-- Family Feud Database Schema for Supabase (Clean Version)
-- This script will drop existing tables and recreate them with consistent UUID types

-- Drop existing tables in correct order (reverse dependency order)
DROP TABLE IF EXISTS game_answers CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS game_sets CASCADE;
DROP TABLE IF EXISTS teams CASCADE;

-- Create teams table
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(50) DEFAULT 'blue',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_sets table (collection of questions for a game)
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

-- Create games table (active game sessions)
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
  current_question_index INTEGER DEFAULT 0,
  strikes INTEGER DEFAULT 0,
  game_status VARCHAR(20) DEFAULT 'waiting', -- waiting, playing, paused, finished
  started_at TIMESTAMP WITH TIME ZONE,
  finished_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_answers table (tracks revealed answers in active games)
CREATE TABLE game_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  answer_id UUID NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  revealed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  revealed_by_team INTEGER -- 1, 2, 3, 4, or 5
);

-- Create indexes for better performance
CREATE INDEX idx_game_sets_code ON game_sets(code);
CREATE INDEX idx_questions_game_set ON questions(game_set_id, order_index);
CREATE INDEX idx_answers_question ON answers(question_id, order_index);
CREATE INDEX idx_games_status ON games(game_status);
CREATE INDEX idx_game_answers_game ON game_answers(game_id);

-- Insert sample teams
INSERT INTO teams (name, color) VALUES 
  ('Team Red', 'red'),
  ('Team Blue', 'blue'),
  ('Team Green', 'green'),
  ('Team Yellow', 'yellow'),
  ('Team Purple', 'purple');

-- Insert sample game set
INSERT INTO game_sets (code, title, description) VALUES 
  ('DEMO001', 'Demo Family Feud Game', 'A demonstration game with sample questions');

-- Insert sample questions and answers
DO $$
DECLARE
    game_set_uuid UUID;
    question1_uuid UUID;
    question2_uuid UUID;
    question3_uuid UUID;
BEGIN
    -- Get the demo game set ID
    SELECT id INTO game_set_uuid FROM game_sets WHERE code = 'DEMO001';
    
    -- Insert sample questions and get their IDs
    INSERT INTO questions (game_set_id, question, order_index) VALUES 
      (game_set_uuid, 'Name something you might find in a kitchen', 1)
    RETURNING id INTO question1_uuid;
    
    INSERT INTO questions (game_set_id, question, order_index) VALUES 
      (game_set_uuid, 'Name a popular vacation destination', 2)
    RETURNING id INTO question2_uuid;
    
    INSERT INTO questions (game_set_id, question, order_index) VALUES 
      (game_set_uuid, 'Name something people do at the beach', 3)
    RETURNING id INTO question3_uuid;
    
    -- Insert answers for question 1 (Kitchen items)
    INSERT INTO answers (question_id, text, points, order_index) VALUES 
      (question1_uuid, 'Refrigerator', 32, 1),
      (question1_uuid, 'Stove', 28, 2),
      (question1_uuid, 'Sink', 15, 3),
      (question1_uuid, 'Microwave', 12, 4),
      (question1_uuid, 'Table', 8, 5),
      (question1_uuid, 'Dishes', 5, 6);
    
    -- Insert answers for question 2 (Vacation destinations)
    INSERT INTO answers (question_id, text, points, order_index) VALUES 
      (question2_uuid, 'Hawaii', 35, 1),
      (question2_uuid, 'Florida', 25, 2),
      (question2_uuid, 'California', 18, 3),
      (question2_uuid, 'New York', 12, 4),
      (question2_uuid, 'Las Vegas', 7, 5),
      (question2_uuid, 'Paris', 3, 6);
    
    -- Insert answers for question 3 (Beach activities)
    INSERT INTO answers (question_id, text, points, order_index) VALUES 
      (question3_uuid, 'Swim', 40, 1),
      (question3_uuid, 'Sunbathe', 22, 2),
      (question3_uuid, 'Build sandcastles', 15, 3),
      (question3_uuid, 'Play volleyball', 10, 4),
      (question3_uuid, 'Read a book', 8, 5),
      (question3_uuid, 'Collect shells', 5, 6);
END $$;

-- Enable Row Level Security (optional, for production)
-- ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE game_sets ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE games ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE game_answers ENABLE ROW LEVEL SECURITY;
