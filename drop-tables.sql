-- Step 2: Clean slate - Drop all existing tables first
-- IMPORTANT: This will delete all existing data!
-- Only run this if you want to start fresh

DROP TABLE IF EXISTS game_answers CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS game_sets CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
