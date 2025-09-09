-- Add custom team name columns to the games table
ALTER TABLE games ADD COLUMN team1_custom_name VARCHAR(100);
ALTER TABLE games ADD COLUMN team2_custom_name VARCHAR(100);
ALTER TABLE games ADD COLUMN team3_custom_name VARCHAR(100);
ALTER TABLE games ADD COLUMN team4_custom_name VARCHAR(100);
ALTER TABLE games ADD COLUMN team5_custom_name VARCHAR(100);
