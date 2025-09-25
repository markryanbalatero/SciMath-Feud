-- Add show_strike_animation_at field to games table for strike animation trigger
-- This field will be used to trigger the strike animation from host control

ALTER TABLE games 
ADD COLUMN IF NOT EXISTS show_strike_animation_at TIMESTAMP WITH TIME ZONE;

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_games_show_strike_animation_at ON games(show_strike_animation_at);

-- Show the updated table structure
\d games;