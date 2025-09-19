import React, { useState } from 'react';
import HostControl from './HostControl';
import { getGameSetByCode, createGameWithCustomNames, updateGameScore, revealAnswerInGame, updateGameStatus } from '../lib/supabase';
import type { GameState, Game, GameSet } from '../lib/supabase';

interface HostControlScreenProps {
  onBackToWelcome: () => void;
}

const HostControlScreen: React.FC<HostControlScreenProps> = ({ onBackToWelcome }) => {
  const [gameCode, setGameCode] = useState('');
  const [gameSet, setGameSet] = useState<GameSet | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    team1Score: 0,
    team2Score: 0,
    team3Score: 0,
    team4Score: 0,
    team5Score: 0,
    strikes: 0,
    gameStarted: false
  });
  const [revealedAnswerIds, setRevealedAnswerIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStatus, setGameStatus] = useState<'waiting' | 'playing' | 'paused' | 'finished'>('waiting');

  const loadGame = async () => {
    if (!gameCode.trim()) {
      setError('Please enter a game code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Load game set
      const { gameSet: gameSetData, success, error: gameSetError } = await getGameSetByCode(gameCode.trim());
      
      if (!success || !gameSetData) {
        setError(gameSetError || 'Game set not found');
        return;
      }

      setGameSet(gameSetData);

      // Create a new game session for host control
      const { game: gameData, success: gameSuccess, error: gameError } = await createGameWithCustomNames(
        gameSetData.id,
        'Team 1',
        'Team 2', 
        'Team 3',
        'Team 4',
        'Team 5'
      );

      if (!gameSuccess || !gameData) {
        setError(gameError || 'Failed to create game');
        return;
      }

      setGame(gameData);
      setGameStarted(true);
      setError(null);
    } catch (error) {
      console.error('Failed to load game:', error);
      setError('Failed to load game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const revealAnswer = async (answerIndex: number, teamId?: number) => {
    const teamIndex = teamId || 1; // Default to team 1 if no team specified
    
    if (!gameSet?.questions || !game) return;

    const currentQuestion = gameSet.questions[gameState.currentQuestionIndex];
    if (!currentQuestion || answerIndex >= currentQuestion.answers.length) return;

    const answer = currentQuestion.answers[answerIndex];
    if (revealedAnswerIds.includes(answer.id)) return;

    try {
      // Add to revealed answers in database
      const success = await revealAnswerInGame(game.id, answer.id, teamIndex);

      if (success) {
        // Update local state
        setRevealedAnswerIds(prev => [...prev, answer.id]);

        // Add points to the correct team
        setGameState(prev => {
          const updatedScores = [prev.team1Score, prev.team2Score, prev.team3Score, prev.team4Score, prev.team5Score];
          if (teamIndex >= 1 && teamIndex <= 5) {
            updatedScores[teamIndex - 1] += answer.points;
          }
          return {
            ...prev,
            team1Score: updatedScores[0],
            team2Score: updatedScores[1],
            team3Score: updatedScores[2],
            team4Score: updatedScores[3],
            team5Score: updatedScores[4]
          };
        });

        // Update game score in database
        await updateGameScore(
          game.id,
          teamIndex === 1 ? gameState.team1Score + answer.points : gameState.team1Score,
          teamIndex === 2 ? gameState.team2Score + answer.points : gameState.team2Score,
          teamIndex === 3 ? gameState.team3Score + answer.points : gameState.team3Score,
          teamIndex === 4 ? gameState.team4Score + answer.points : gameState.team4Score,
          teamIndex === 5 ? gameState.team5Score + answer.points : gameState.team5Score,
          gameState.strikes,
          gameState.currentQuestionIndex
        );
      }
    } catch (error) {
      console.error('Failed to reveal answer:', error);
    }
  };

  const nextQuestion = () => {
    if (!gameSet?.questions) return;
    
    const nextIndex = gameState.currentQuestionIndex + 1;
    if (nextIndex < gameSet.questions.length) {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        strikes: 0 // Reset strikes for new question
      }));
      setRevealedAnswerIds([]); // Reset revealed answers for new question
    }
  };

  const addStrike = async () => {
    if (!game || gameState.strikes >= 3) return;

    const newStrikes = gameState.strikes + 1;
    setGameState(prev => ({
      ...prev,
      strikes: newStrikes
    }));

    // Update game score in database
    await updateGameScore(
      game.id,
      gameState.team1Score,
      gameState.team2Score,
      gameState.team3Score,
      gameState.team4Score,
      gameState.team5Score,
      newStrikes,
      gameState.currentQuestionIndex
    );
  };

  const startGame = async () => {
    if (!game) return;
    
    try {
      await updateGameStatus(game.id, 'playing');
      setGameStatus('playing');
      // Game status updated - players can now see the game board
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  const pauseGame = async () => {
    if (!game) return;
    
    try {
      await updateGameStatus(game.id, 'paused');
      setGameStatus('paused');
    } catch (error) {
      console.error('Failed to pause game:', error);
    }
  };

  const endGame = async () => {
    if (!game) return;
    
    try {
      await updateGameStatus(game.id, 'finished');
      setGameStatus('finished');
    } catch (error) {
      console.error('Failed to end game:', error);
    }
  };

  if (!gameStarted) {
    return (
      <div className="w-screen h-screen fixed inset-0 overflow-hidden bg-[#1f225d] flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-[#2a2e6b] rounded-xl shadow-2xl p-8 border border-purple-400/30">
            <h1 className="text-3xl font-black text-center mb-8 text-white">
              🎛️ HOST CONTROL
            </h1>

            {/* Game Code Input */}
            <div className="mb-6">
              <label className="block text-purple-300 font-bold mb-2 text-lg">
                Enter Game Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={gameCode}
                  onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                  placeholder="Enter game code (e.g., DEMO001)"
                  className="flex-1 px-4 py-3 text-lg font-mono border-2 border-purple-400 rounded-xl focus:border-pink-400 focus:outline-none bg-[#1f225d] text-white"
                  maxLength={20}
                />
                <button
                  onClick={loadGame}
                  disabled={loading}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold rounded-xl transition-all duration-200"
                >
                  {loading ? 'Loading...' : 'Load'}
                </button>
              </div>
            </div>

            {/* Game Set Info */}
            {gameSet && (
              <div className="mb-6 p-4 bg-green-600/20 border border-green-400/50 rounded-xl">
                <h3 className="text-lg font-bold text-green-300 mb-2">{gameSet.title}</h3>
                {gameSet.description && (
                  <p className="text-green-200 mb-2">{gameSet.description}</p>
                )}
                <p className="text-sm text-green-100">
                  {gameSet.questions?.length || 0} questions available
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-400/50 rounded-xl">
                <p className="text-red-300 font-medium">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={onBackToWelcome}
                className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl transition-all duration-200"
              >
                ← Back to Welcome
              </button>
              
              {gameSet && (
                <button
                  onClick={() => setGameStarted(true)}
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all duration-200"
                >
                  Start Host Control
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gameSet?.questions || gameSet.questions.length === 0) {
    return (
      <div className="w-screen h-screen fixed inset-0 bg-[#1f225d] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl font-bold mb-4">No questions found in this game set</div>
          <button
            onClick={onBackToWelcome}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Welcome
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = gameSet.questions[gameState.currentQuestionIndex];
  const answersWithRevealState = currentQuestion.answers.map(answer => ({
    ...answer,
    revealed: revealedAnswerIds.includes(answer.id)
  }));

  return (
    <HostControl
      currentQuestion={currentQuestion.question}
      currentQuestionIndex={gameState.currentQuestionIndex}
      totalQuestions={gameSet.questions.length}
      answers={answersWithRevealState}
      team1Name="TEAM NAME (1)"
      team2Name="TEAM NAME (2)"
      team3Name="TEAM NAME (3)"
      team4Name="TEAM NAME (4)"
      team5Name="TEAM NAME (5)"
      team1Score={gameState.team1Score}
      team2Score={gameState.team2Score}
      team3Score={gameState.team3Score}
      team4Score={gameState.team4Score}
      team5Score={gameState.team5Score}
      strikes={gameState.strikes}
      gameStatus={gameStatus}
      onRevealAnswer={revealAnswer}
      onNextQuestion={nextQuestion}
      onAddStrike={addStrike}
      onStartGame={startGame}
      onPauseGame={pauseGame}
      onEndGame={endGame}
      onBackToWelcome={onBackToWelcome}
    />
  );
};

export default HostControlScreen;
