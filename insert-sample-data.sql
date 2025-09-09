-- Step 4: Insert sample data
-- Run this AFTER creating the fresh tables

-- Insert sample teams
INSERT INTO teams (name, color) VALUES 
  ('Team Red', 'red'),
  ('Team Blue', 'blue'),
  ('Team Green', 'green'),
  ('Team Yellow', 'yellow');

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
    
    -- Insert questions and get their IDs
    INSERT INTO questions (game_set_id, question, order_index) VALUES 
      (game_set_uuid, 'Name something you might find in a kitchen', 1)
    RETURNING id INTO question1_uuid;
    
    INSERT INTO questions (game_set_id, question, order_index) VALUES 
      (game_set_uuid, 'Name a popular vacation destination', 2)
    RETURNING id INTO question2_uuid;
    
    INSERT INTO questions (game_set_id, question, order_index) VALUES 
      (game_set_uuid, 'Name something people do at the beach', 3)
    RETURNING id INTO question3_uuid;
    
    -- Insert answers for question 1 (Kitchen)
    INSERT INTO answers (question_id, text, points, order_index) VALUES 
      (question1_uuid, 'Refrigerator', 32, 1),
      (question1_uuid, 'Stove', 28, 2),
      (question1_uuid, 'Sink', 15, 3),
      (question1_uuid, 'Microwave', 12, 4),
      (question1_uuid, 'Table', 8, 5),
      (question1_uuid, 'Dishes', 5, 6);
    
    -- Insert answers for question 2 (Vacation)
    INSERT INTO answers (question_id, text, points, order_index) VALUES 
      (question2_uuid, 'Hawaii', 35, 1),
      (question2_uuid, 'Florida', 25, 2),
      (question2_uuid, 'California', 18, 3),
      (question2_uuid, 'New York', 12, 4),
      (question2_uuid, 'Las Vegas', 7, 5),
      (question2_uuid, 'Paris', 3, 6);
    
    -- Insert answers for question 3 (Beach)
    INSERT INTO answers (question_id, text, points, order_index) VALUES 
      (question3_uuid, 'Swim', 40, 1),
      (question3_uuid, 'Sunbathe', 22, 2),
      (question3_uuid, 'Build sandcastles', 15, 3),
      (question3_uuid, 'Play volleyball', 10, 4),
      (question3_uuid, 'Read a book', 8, 5),
      (question3_uuid, 'Collect shells', 5, 6);
END $$;
