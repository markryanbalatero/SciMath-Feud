import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import { getGameSetByCode, createGameWithCustomNames, updateGameScore, revealAnswerInGame } from '../lib/supabase';
import type { GameState, Game, GameSet } from '../lib/supabase';

interface Answer {
  id: string;
  text: string;
  points: number;
  revealed: boolean;
}

interface DatabaseGameScreenProps {
  onBackToWelcome: () => void;
  gameCode?: string;
  customTeam1Name?: string;
  customTeam2Name?: string;
  customTeam3Name?: string;
  customTeam4Name?: string;
  customTeam5Name?: string;
}

const DatabaseGameScreen: React.FC<DatabaseGameScreenProps> = ({ 
  onBackToWelcome, 
  gameCode,
  customTeam1Name,
  customTeam2Name,
  customTeam3Name,
  customTeam4Name,
  customTeam5Name
}) => {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeGame();
  }, [gameCode]);

  const initializeGame = async () => {
    try {
      setLoading(true);
      setError(null);

      // If gameCode is provided, fetch the game set
      if (gameCode) {
        const { gameSet: gameSetData, success, error: gameSetError } = await getGameSetByCode(gameCode);
        
        if (!success || !gameSetData) {
          setError(gameSetError || 'Game set not found');
          return;
        }

        setGameSet(gameSetData);

        // Create a new game session
        const { game: gameData, success: gameSuccess, error: gameError } = await createGameWithCustomNames(
          gameSetData.id,
          customTeam1Name,
          customTeam2Name,
          customTeam3Name,
          customTeam4Name,
          customTeam5Name
        );

        if (!gameSuccess || !gameData) {
          setError(gameError || 'Failed to create game');
          return;
        }

        setGame(gameData);
        setGameState(prev => ({ ...prev, gameStarted: true }));
      }
    } catch (error) {
      console.error('Failed to initialize game:', error);
      setError('Failed to initialize game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const revealAnswer = async (answerIndex: number) => {
    if (!gameSet?.questions || !game) return;

    const currentQuestion = gameSet.questions[gameState.currentQuestionIndex];
    if (!currentQuestion || answerIndex >= currentQuestion.answers.length) return;

    const answer = currentQuestion.answers[answerIndex];
    if (revealedAnswerIds.includes(answer.id)) return;

    try {
      // Add to revealed answers in database
      const success = await revealAnswerInGame(game.id, answer.id, 1); // Assuming team 1 for now
      
      if (success) {
        // Update local state
        setRevealedAnswerIds(prev => [...prev, answer.id]);
        
        // Add points to team 1 score (you can modify this logic for team switching)
        const newTeam1Score = gameState.team1Score + answer.points;
        setGameState(prev => ({
          ...prev,
          team1Score: newTeam1Score
        }));

        // Update game score in database
        await updateGameScore(
          game.id,
          newTeam1Score,
          gameState.team2Score,
          gameState.team3Score,
          gameState.team4Score,
          gameState.team5Score,
          gameState.strikes,
          gameState.currentQuestionIndex
        );
      }
    } catch (error) {
      console.error('Failed to reveal answer:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen fixed inset-0 bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading game...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen fixed inset-0 bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl font-bold mb-4">{error}</div>
          <button
            onClick={onBackToWelcome}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Welcome
          </button>
        </div>
      </div>
    );
  }

  if (!gameSet?.questions || gameSet.questions.length === 0) {
    return (
      <div className="w-screen h-screen fixed inset-0 bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl font-bold mb-4">No questions found in this game set</div>
          <button
            onClick={onBackToWelcome}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
    <div className="relative">
      <GameBoard
        currentQuestion={currentQuestion.question}
        answers={answersWithRevealState}
        team1Score={gameState.team1Score}
        team2Score={gameState.team2Score}
        team3Score={gameState.team3Score}
        team4Score={gameState.team4Score}
        team5Score={gameState.team5Score}
        team1Name={game?.team1_custom_name || customTeam1Name || game?.team1?.name}
        team2Name={game?.team2_custom_name || customTeam2Name || game?.team2?.name}
        team3Name={game?.team3_custom_name || customTeam3Name || game?.team3?.name}
        team4Name={game?.team4_custom_name || customTeam4Name || game?.team4?.name}
        team5Name={game?.team5_custom_name || customTeam5Name || game?.team5?.name}
        strikes={gameState.strikes}
        currentQuestionIndex={gameState.currentQuestionIndex}
        totalQuestions={gameSet.questions.length}
        onRevealAnswer={revealAnswer}
      />
    </div>
  );
};

export default DatabaseGameScreen;
