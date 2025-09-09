-- Step 1: Check existing tables and their types
-- Run this first to see what already exists:

SELECT 
    table_name, 
    column_name, 
    data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('teams', 'game_sets', 'questions', 'answers', 'games', 'game_answers')
ORDER BY table_name, ordinal_position;
