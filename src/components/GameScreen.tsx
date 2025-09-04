import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import { getQuestions } from '../lib/supabase';
import type { Question, GameState } from '../lib/supabase';

interface GameScreenProps {
  onBackToWelcome: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onBackToWelcome }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    team1Score: 0,
    team2Score: 0,
    strikes: 0,
    gameStarted: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    try {
      setLoading(true);
      const questionsData = await getQuestions();
      setQuestions(questionsData);
      setGameState(prev => ({
        ...prev,
        gameStarted: true
      }));
      setError(null);
    } catch (error) {
      console.error('Failed to load questions:', error);
      setError('Failed to load game data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const revealAnswer = (answerIndex: number) => {
    if (questions.length > 0) {
      const currentQuestion = questions[gameState.currentQuestionIndex];
      if (currentQuestion && !currentQuestion.answers[answerIndex].revealed) {
        // Update the question's answers
        const updatedQuestions = [...questions];
        updatedQuestions[gameState.currentQuestionIndex].answers[answerIndex].revealed = true;
        setQuestions(updatedQuestions);

        // Add points to team 1 score (you can modify this logic for team switching)
        const points = currentQuestion.answers[answerIndex].points;
        setGameState(prev => ({
          ...prev,
          team1Score: prev.team1Score + points
        }));
      }
    }
  };

  const addStrike = () => {
    setGameState(prev => ({
      ...prev,
      strikes: prev.strikes < 3 ? prev.strikes + 1 : prev.strikes
    }));
  };

  const resetStrikes = () => {
    setGameState(prev => ({
      ...prev,
      strikes: 0
    }));
  };

  const updateTeamScore = (team: 1 | 2, points: number) => {
    setGameState(prev => ({
      ...prev,
      [team === 1 ? 'team1Score' : 'team2Score']: 
        prev[team === 1 ? 'team1Score' : 'team2Score'] + points
    }));
  };

  const nextQuestion = () => {
    if (gameState.currentQuestionIndex < questions.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        strikes: 0 // Reset strikes for new question
      }));
    } else {
      // End of game
      handleGameEnd();
    }
  };

  const handleGameEnd = () => {
    const winner = gameState.team1Score > gameState.team2Score ? 'Team 1' : 
                   gameState.team2Score > gameState.team1Score ? 'Team 2' : 'Tie';
    
    alert(`Game Over! ${winner === 'Tie' ? 'It\'s a tie!' : `${winner} wins!`}\n\nFinal Scores:\nTeam 1: ${gameState.team1Score}\nTeam 2: ${gameState.team2Score}`);
    onBackToWelcome();
  };

  const resetGame = () => {
    setGameState({
      currentQuestionIndex: 0,
      team1Score: 0,
      team2Score: 0,
      strikes: 0,
      gameStarted: true
    });
    // Reset all answers to hidden
    const resetQuestions = questions.map(q => ({
      ...q,
      answers: q.answers.map(a => ({ ...a, revealed: false }))
    }));
    setQuestions(resetQuestions);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen fixed inset-0 bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto mb-8"></div>
          <h2 className="text-4xl font-bold text-yellow-300 mb-4">Loading Game...</h2>
          <p className="text-white/70">Preparing Family Feud questions</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen fixed inset-0 bg-gradient-to-b from-red-800 via-red-900 to-red-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-8">
          <div className="text-8xl mb-8">❌</div>
          <h2 className="text-4xl font-bold text-red-300 mb-4">Game Error</h2>
          <p className="text-white mb-8">{error}</p>
          <div className="space-x-4">
            <button
              onClick={initializeGame}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onBackToWelcome}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[gameState.currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="w-screen h-screen fixed inset-0 bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-yellow-300 mb-4">No Questions Available</h2>
          <p className="text-white mb-8">Please check your game data.</p>
          <button
            onClick={onBackToWelcome}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen">
      <GameBoard
        currentQuestion={currentQuestion.question}
        answers={currentQuestion.answers}
        team1Score={gameState.team1Score}
        team2Score={gameState.team2Score}
        strikes={gameState.strikes}
        currentQuestionIndex={gameState.currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onRevealAnswer={revealAnswer}
        onBackToWelcome={onBackToWelcome}
      />
    </div>
  );
};

export default GameScreen;
