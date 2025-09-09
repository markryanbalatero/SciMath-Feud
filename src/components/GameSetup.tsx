import React, { useState } from 'react';
import { getGameSetByCode } from '../lib/supabase';
import type { GameSet } from '../lib/supabase';
import DatabaseGameScreen from './DatabaseGameScreen';

interface GameSetupProps {
  onBackToWelcome: () => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onBackToWelcome }) => {
  const [gameCode, setGameCode] = useState('');
  const [customTeam1Name, setCustomTeam1Name] = useState<string>('');
  const [customTeam2Name, setCustomTeam2Name] = useState<string>('');
  const [customTeam3Name, setCustomTeam3Name] = useState<string>('');
  const [customTeam4Name, setCustomTeam4Name] = useState<string>('');
  const [customTeam5Name, setCustomTeam5Name] = useState<string>('');
  const [gameSet, setGameSet] = useState<GameSet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const validateGameCode = async () => {
    if (!gameCode.trim()) {
      setError('Please enter a game code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { gameSet: gameSetData, success, error: gameSetError } = await getGameSetByCode(gameCode.trim());
      
      if (!success || !gameSetData) {
        setError(gameSetError || 'Game set not found');
        setGameSet(null);
        return;
      }

      setGameSet(gameSetData);
      setError(null);
    } catch (error) {
      setError('Failed to validate game code');
      setGameSet(null);
    } finally {
      setLoading(false);
    }
  };

  const startGame = () => {
    if (!gameSet) {
      setError('Please enter a valid game code first');
      return;
    }

    // Get team names from custom inputs
    const teamNames = [
      customTeam1Name.trim(),
      customTeam2Name.trim(),
      customTeam3Name.trim(),
      customTeam4Name.trim(),
      customTeam5Name.trim()
    ].filter(name => name !== '');

    // Check if at least 2 teams are named
    if (teamNames.length < 2) {
      setError('Please enter names for at least 2 teams');
      return;
    }

    // Check for duplicate team names
    const uniqueTeams = new Set(teamNames);
    if (uniqueTeams.size !== teamNames.length) {
      setError('Please use different names for each team');
      return;
    }

    setGameStarted(true);
  };

  if (gameStarted) {
    return (
      <DatabaseGameScreen
        onBackToWelcome={onBackToWelcome}
        gameCode={gameCode}
        customTeam1Name={customTeam1Name.trim()}
        customTeam2Name={customTeam2Name.trim()}
        customTeam3Name={customTeam3Name.trim()}
        customTeam4Name={customTeam4Name.trim()}
        customTeam5Name={customTeam5Name.trim()}
      />
    );
  }

  return (
    <div className="w-screen h-screen fixed inset-0 overflow-hidden bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-radial from-blue-600/20 to-transparent"></div>
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-4">
        <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          <h1 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Game Setup
          </h1>

          {/* Game Code Input */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-700 mb-2">
              Game Code
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                placeholder="Enter game code (e.g., DEMO001)"
                className="flex-1 px-4 py-3 text-lg font-mono border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                maxLength={20}
              />
              <button
                onClick={validateGameCode}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-all duration-200"
              >
                {loading ? 'Checking...' : 'Validate'}
              </button>
            </div>
          </div>

          {/* Game Set Info */}
          {gameSet && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="text-lg font-bold text-green-800 mb-2">{gameSet.title}</h3>
              {gameSet.description && (
                <p className="text-green-700 mb-2">{gameSet.description}</p>
              )}
              <p className="text-sm text-green-600">
                {gameSet.questions?.length || 0} questions available
              </p>
            </div>
          )}

          {/* Team Names */}
          {gameSet && (
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Enter Team Names (minimum 2 required)</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Team 1 */}
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2">
                    Team 1 (Left Top)
                  </label>
                  <input
                    type="text"
                    value={customTeam1Name}
                    onChange={(e) => setCustomTeam1Name(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Team 2 */}
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2">
                    Team 2 (Left Bottom)
                  </label>
                  <input
                    type="text"
                    value={customTeam2Name}
                    onChange={(e) => setCustomTeam2Name(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Team 3 */}
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2">
                    Team 3 (Bottom)
                  </label>
                  <input
                    type="text"
                    value={customTeam3Name}
                    onChange={(e) => setCustomTeam3Name(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Team 4 */}
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2">
                    Team 4 (Right Top)
                  </label>
                  <input
                    type="text"
                    value={customTeam4Name}
                    onChange={(e) => setCustomTeam4Name(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Team 5 */}
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2">
                    Team 5 (Right Bottom)
                  </label>
                  <input
                    type="text"
                    value={customTeam5Name}
                    onChange={(e) => setCustomTeam5Name(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onBackToWelcome}
              className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl transition-all duration-200"
            >
              Back to Welcome
            </button>
            <button
              onClick={startGame}
              disabled={!gameSet || (!customTeam1Name.trim() && !customTeam2Name.trim() && !customTeam3Name.trim() && !customTeam4Name.trim() && !customTeam5Name.trim())}
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all duration-200"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
