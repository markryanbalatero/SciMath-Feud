import React, { useCallback, useEffect, useRef, useState } from 'react';
import GameBoard from './GameBoard';
import { getGameSetByCode, createGameWithCustomNames, updateGameScore, revealAnswerInGame, getGameStatus, getRevealedAnswers, supabase } from '../lib/supabase';
import type { GameState, Game, GameSet } from '../lib/supabase';
import { useArduino } from '../hooks/useArduino';

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
  const [hostGameStatus, setHostGameStatus] = useState<'waiting' | 'playing' | 'paused' | 'finished'>('waiting');
  // Host gating temporarily disabled
  const { connected, connecting, error: arduinoError, buttonStates, lastPressedIndex, connect, disconnect, serialLog, clearLog } = useArduino({ baudRate: 9600, numButtons: 5 });
  const [buzzWinnerIndex, setBuzzWinnerIndex] = useState<number | null>(null);
  const lastButtonSnapshot = useRef<boolean[]>([false, false, false, false, false]);

  // First-buzz lock-in detection
  useEffect(() => {
    if (!connected) {
      setBuzzWinnerIndex(null);
      lastButtonSnapshot.current = [false, false, false, false, false];
      return;
    }
    if (buzzWinnerIndex !== null) {
      lastButtonSnapshot.current = [...buttonStates];
      return;
    }
    const prev = lastButtonSnapshot.current;
    for (let i = 0; i < buttonStates.length; i++) {
      if (!prev[i] && buttonStates[i]) {
        setBuzzWinnerIndex(i);
        break;
      }
    }
    lastButtonSnapshot.current = [...buttonStates];
  }, [buttonStates, connected, buzzWinnerIndex]);

  const resetBuzz = useCallback(() => setBuzzWinnerIndex(null), []);

  useEffect(() => {
    initializeGame();
  }, [gameCode]);

  // Poll game status and scores every 2 seconds
  useEffect(() => {
    if (!game) return;
    const pollGameData = async () => {
      try {
        // Fetch both status and game data
        const { data: gameData, error: gameError } = await supabase
          .from('games')
          .select('*')
          .eq('id', game.id)
          .single();

        if (gameError || !gameData) {
          console.error('Error fetching game data:', gameError);
          return;
        }

        // Update status
        const newStatus = gameData.game_status as 'waiting' | 'playing' | 'paused' | 'finished';
        setHostGameStatus(newStatus);

        // Update game state with latest scores and data
        setGameState(prev => ({
          ...prev,
          team1Score: gameData.team1_score || 0,
          team2Score: gameData.team2_score || 0,
          team3Score: gameData.team3_score || 0,
          team4Score: gameData.team4_score || 0,
          team5Score: gameData.team5_score || 0,
          strikes: gameData.strikes || 0,
          currentQuestionIndex: gameData.current_question_index || 0,
          gameStarted: newStatus === 'playing'
        }));

        // If game status changed to playing and we're not already started, start the game
        if (newStatus === 'playing' && !gameState.gameStarted) {
          setError(null); // Clear any waiting error message
        }

        // Fetch revealed answers for current question
        if (newStatus === 'playing') {
          const revealedAnswers = await getRevealedAnswers(game.id);
          setRevealedAnswerIds(revealedAnswers);
        }

      } catch (error) {
        console.error('Error polling game data:', error);
      }
    };

    pollGameData();
    const interval = setInterval(pollGameData, 2000); // Poll every 2 seconds for real-time updates
    return () => clearInterval(interval);
  }, [game, gameState.gameStarted]);
  // Host status polling removed (temporary bypass)

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
        
        // Find the latest game for this code
        const { data: latestGame, error: gameError } = await supabase
          .from('games')
          .select('*')
          .eq('game_set_id', gameSetData.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (gameError || !latestGame) {
          setError('No game found for this code. Please wait for the host to start the game.');
          return;
        }
        
        // Check if the game is playing
        if (latestGame.game_status !== 'playing') {
           setGame(latestGame); // Set the game so polling can work
           setHostGameStatus(latestGame.game_status);
           return;
         }
        
        // Game is playing, join it
        setGame(latestGame);
        setHostGameStatus(latestGame.game_status);
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

  // Show waiting screen if host hasn't started the game yet
  if (hostGameStatus === 'waiting') {
    return (
      <div className="w-screen h-screen fixed inset-0 bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-3xl font-bold mb-6">🎮 Family Feud</div>
          <div className="text-yellow-400 text-2xl font-bold mb-4">Waiting for Host to Start Game...</div>
          <div className="text-gray-300 text-lg mb-8">Game Code: {gameCode}</div>
          
          {/* Team Scores Display */}
          <div className="mb-8">
            <div className="text-white text-xl font-bold mb-4">Current Scores</div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {game?.team1_custom_name && (
                <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4">
                  <div className="text-white font-bold text-lg">{game.team1_custom_name}</div>
                  <div className="text-yellow-400 text-2xl font-bold">{gameState.team1Score}</div>
                </div>
              )}
              {game?.team2_custom_name && (
                <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4">
                  <div className="text-white font-bold text-lg">{game.team2_custom_name}</div>
                  <div className="text-yellow-400 text-2xl font-bold">{gameState.team2Score}</div>
                </div>
              )}
              {game?.team3_custom_name && (
                <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4">
                  <div className="text-white font-bold text-lg">{game.team3_custom_name}</div>
                  <div className="text-yellow-400 text-2xl font-bold">{gameState.team3Score}</div>
                </div>
              )}
              {game?.team4_custom_name && (
                <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4">
                  <div className="text-white font-bold text-lg">{game.team4_custom_name}</div>
                  <div className="text-yellow-400 text-2xl font-bold">{gameState.team4Score}</div>
                </div>
              )}
              {game?.team5_custom_name && (
                <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4">
                  <div className="text-white font-bold text-lg">{game.team5_custom_name}</div>
                  <div className="text-yellow-400 text-2xl font-bold">{gameState.team5Score}</div>
                </div>
              )}
            </div>
          </div>

          <div className="animate-pulse">
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
          <button
            onClick={onBackToWelcome}
            className="mt-8 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Welcome
          </button>
        </div>
      </div>
    );
  }

  // Show paused screen if host has paused the game
  if (hostGameStatus === 'paused') {
    return (
      <div className="w-screen h-screen fixed inset-0 bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-3xl font-bold mb-6">🎮 Family Feud</div>
          <div className="text-orange-400 text-2xl font-bold mb-4">Game Paused</div>
          <div className="text-gray-300 text-lg mb-8">Waiting for host to resume...</div>
          
          {/* Team Scores Display */}
          <div className="mb-8">
            <div className="text-white text-xl font-bold mb-4">Current Scores</div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {game?.team1_custom_name && (
                <div className="bg-orange-700 bg-opacity-50 rounded-lg p-4">
                  <div className="text-white font-bold text-lg">{game.team1_custom_name}</div>
                  <div className="text-yellow-400 text-2xl font-bold">{gameState.team1Score}</div>
                </div>
              )}
              {game?.team2_custom_name && (
                <div className="bg-orange-700 bg-opacity-50 rounded-lg p-4">
                  <div className="text-white font-bold text-lg">{game.team2_custom_name}</div>
                  <div className="text-yellow-400 text-2xl font-bold">{gameState.team2Score}</div>
                </div>
              )}
              {game?.team3_custom_name && (
                <div className="bg-orange-700 bg-opacity-50 rounded-lg p-4">
                  <div className="text-white font-bold text-lg">{game.team3_custom_name}</div>
                  <div className="text-yellow-400 text-2xl font-bold">{gameState.team3Score}</div>
                </div>
              )}
              {game?.team4_custom_name && (
                <div className="bg-orange-700 bg-opacity-50 rounded-lg p-4">
                  <div className="text-white font-bold text-lg">{game.team4_custom_name}</div>
                  <div className="text-yellow-400 text-2xl font-bold">{gameState.team4Score}</div>
                </div>
              )}
              {game?.team5_custom_name && (
                <div className="bg-orange-700 bg-opacity-50 rounded-lg p-4">
                  <div className="text-white font-bold text-lg">{game.team5_custom_name}</div>
                  <div className="text-yellow-400 text-2xl font-bold">{gameState.team5Score}</div>
                </div>
              )}
            </div>
          </div>

          <div className="animate-pulse">
            <div className="w-16 h-16 bg-orange-400 rounded-full mx-auto"></div>
          </div>
          <button
            onClick={onBackToWelcome}
            className="mt-8 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Welcome
          </button>
        </div>
      </div>
    );
  }
  // Waiting/paused screens disabled (temporary bypass)

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
      {/* Arduino Controls - top-left */}
      <div className="fixed top-2 left-2 z-50 flex flex-col gap-2">
        <button
          onClick={() => connected ? disconnect() : connect()}
          className={`px-4 py-2 rounded-md text-sm font-semibold shadow-md transition-colors ${connected ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
          disabled={connecting}
        >
          {connecting ? 'Connecting...' : connected ? 'Disconnect Buzzers' : 'Connect Buzzers'}
        </button>
        {connected && (
          <div className="flex gap-2">
            <button onClick={resetBuzz} className="px-3 py-1 rounded-md text-xs font-semibold shadow bg-yellow-600 hover:bg-yellow-700 text-white">Reset Buzz</button>
            <button onClick={clearLog} className="px-3 py-1 rounded-md text-xs font-semibold shadow bg-gray-600 hover:bg-gray-700 text-white">Clear Log</button>
          </div>
        )}
        {arduinoError && <div className="text-xs text-red-300 max-w-[200px]">{arduinoError}</div>}
        {connected && (
          <div className="flex items-center gap-1">
            {buttonStates.map((b, i) => (
              <div key={i} className={`w-4 h-4 rounded-full ${b ? 'bg-yellow-300 animate-pulse' : 'bg-gray-600'}`} title={`B${i+1}`}></div>
            ))}
          </div>
        )}
      </div>

      {/* Serial Log - bottom-left */}
      <div className="fixed bottom-2 left-2 z-50 w-72 max-h-48 overflow-auto bg-black/60 text-green-200 text-xs p-2 rounded-md border border-white/10">
        <div className="font-semibold text-white/80 mb-1">Serial Log</div>
        {serialLog.length === 0 && <div className="text-white/50">(no data)</div>}
        {serialLog.slice(-50).map((entry, idx) => (
          <div key={idx} className="whitespace-pre">{new Date(entry.t).toLocaleTimeString()} - {entry.line}</div>
        ))}
      </div>
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
        arduinoConnected={connected}
        buttonStates={buttonStates}
        lastPressedIndex={lastPressedIndex}
        buzzWinnerIndex={buzzWinnerIndex}
      />
    </div>
  );
};

export default DatabaseGameScreen;
