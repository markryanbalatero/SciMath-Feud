# Family Feud Game - Supabase Integration Guide

## 📋 Setup Instructions

### 1. Database Setup

Run the following SQL in your Supabase SQL Editor:

```sql
-- Copy the contents of supabase-schema.sql and run it in your Supabase SQL editor
```

This will create all the necessary tables:
- `teams` - Store team information
- `game_sets` - Store game collections
- `questions` - Store questions for each game set
- `answers` - Store answers for each question
- `games` - Track active game sessions
- `game_answers` - Track revealed answers during games

### 2. Environment Configuration

1. Copy `.env.example` to `.env.local`
2. Update the values with your Supabase project details:
   - Get your Supabase URL and anon key from your Supabase project dashboard > Settings > API

### 3. How to Use the Database-Connected Game

#### For Game Hosts (Admin Panel):
1. Click "Host Control" on the welcome screen
2. Create a new game set with multiple questions and answers
3. Save the game set - you'll get a unique code (e.g., "DEMO001")
4. Share this code with players

#### For Players:
1. Click "Start Game" on the welcome screen
2. Enter the game code provided by the host
3. Select Team 1 and Team 2 from the available teams
4. Start playing!

### 4. Game Features

#### Real-time Database Integration:
- ✅ Questions and answers loaded from Supabase
- ✅ Team names displayed from database
- ✅ Game scores saved in real-time
- ✅ Answer reveals tracked in database
- ✅ Game state persistence

#### Game Controls:
- Click answers to reveal them
- Navigate between questions with Previous/Next buttons
- Add strikes with the Strike button
- Game scores update automatically

### 5. Sample Data

The database schema includes sample data:
- **Demo Game Code**: `DEMO001`
- **Sample Teams**: Team Red, Team Blue, Team Green, Team Yellow
- **Sample Questions**: Kitchen items, vacation destinations, beach activities

### 6. Database Structure

```
game_sets (id, code, title, description)
├── questions (id, game_set_id, question, order_index)
    └── answers (id, question_id, text, points, order_index)

teams (id, name, color)

games (id, game_set_id, team1_id, team2_id, scores, status)
├── game_answers (id, game_id, answer_id, revealed_by_team)
```

### 7. API Functions Available

#### Game Setup:
- `getTeams()` - Get all available teams
- `getGameSetByCode(code)` - Load game set by code
- `createGame(gameSetId, team1Id, team2Id)` - Create new game session

#### Game Play:
- `revealAnswerInGame(gameId, answerId, team)` - Reveal an answer
- `updateGameScore(gameId, team1Score, team2Score, strikes, questionIndex)` - Update game state
- `getRevealedAnswers(gameId)` - Get already revealed answers

#### Admin Functions:
- `saveGameSet(gameSet)` - Save new game set with questions
- `getAllGameSets()` - Get all game sets

### 8. Components

- **GameSetup**: Select teams and enter game code
- **DatabaseGameScreen**: Main game interface with database integration
- **AdminPanel**: Create and manage game sets
- **GameBoard**: Display game interface (unchanged)

### 9. Next Steps

1. Run the SQL schema in your Supabase project
2. Update your `.env.local` file
3. Try the demo game with code "DEMO001"
4. Create your own game sets in the Admin Panel
5. Share game codes with friends and family!

The game now fully integrates with Supabase for persistent data storage and real-time gameplay!
