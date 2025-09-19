import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import { getQuestions } from '../lib/supabase';
import type { Question, GameState } from '../lib/supabase';

interface Answer {
  text: string;
  points: number;
  revealed: boolean;
}

interface GameData {
  team1Name: string;
  team2Name: string;
  question: string;
  answers: Answer[];
}

interface GameScreenProps {
  onBackToWelcome: () => void;
  gameData?: GameData | null;
}

const GameScreen: React.FC<GameScreenProps> = ({ onBackToWelcome, gameData }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customGame, setCustomGame] = useState<GameData | null>(gameData || null);

  useEffect(() => {
    if (gameData) {
      // Using custom game data from admin panel
      setCustomGame(gameData);
      setLoading(false);
    } else {
      // Using default questions from Supabase
      initializeGame();
    }
  }, [gameData]);

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

  // Determine current question and answers based on data source
  const getCurrentQuestionData = () => {
    if (customGame) {
      // Using custom game data from admin panel
      return {
        question: customGame.question,
        answers: customGame.answers
      };
    } else {
      // Using database questions
      const currentQuestion = questions[gameState.currentQuestionIndex];
      if (!currentQuestion) return null;
      return {
        question: currentQuestion.question,
        answers: currentQuestion.answers
      };
    }
  };

  const questionData = getCurrentQuestionData();
  if (!questionData) {
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

  // Ensure answers always have revealed: boolean
  const safeAnswers = questionData.answers.map(a => ({
    ...a,
    revealed: a.revealed === true ? true : false
  }));

  return (
    <div className="game-screen">
      <GameBoard
        currentQuestion={questionData.question}
        answers={safeAnswers}
        team1Score={gameState.team1Score}
        team2Score={gameState.team2Score}
        team3Score={gameState.team3Score}
        team4Score={gameState.team4Score}
        team5Score={gameState.team5Score}
        strikes={gameState.strikes}
        currentQuestionIndex={gameState.currentQuestionIndex + 1}
        totalQuestions={customGame ? 1 : questions.length}
        onRevealAnswer={revealAnswer}
      />
    </div>
  );
};

export default GameScreen;
