import React, { useState } from 'react';

interface Answer {
  id: string;
  text: string;
  points: number;
  revealed: boolean;
}

interface HostControlProps {
  currentQuestion: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  answers: Answer[];
  team1Name?: string;
  team2Name?: string;
  team3Name?: string;
  team4Name?: string;
  team5Name?: string;
  team1Score: number;
  team2Score: number;
  team3Score: number;
  team4Score: number;
  team5Score: number;
  team1Strikes?: number;
  team2Strikes?: number;
  team3Strikes?: number;
  team4Strikes?: number;
  team5Strikes?: number;
  strikes: number;
  gameStatus?: 'waiting' | 'playing' | 'paused' | 'finished';
  onRevealAnswer: (index: number, teamId?: number) => void;
  onNextQuestion: () => void;
  onAddStrike: (teamId?: number) => void;
  onStartGame?: () => void;
  onPauseGame?: () => void;
  onEndGame?: () => void;
  onBackToWelcome: () => void;
}

const HostControl: React.FC<HostControlProps> = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  answers,
  team1Name = 'TEAM NAME (1)',
  team2Name = 'TEAM NAME (2)',
  team3Name = 'TEAM NAME (3)',
  team4Name = 'TEAM NAME (4)',
  team5Name = 'TEAM NAME (5)',
  team1Score,
  team2Score,
  team3Score,
  team4Score,
  team5Score,
  team1Strikes = 0,
  team2Strikes = 0,
  team3Strikes = 0,
  team4Strikes = 0,
  team5Strikes = 0,
  strikes,
  gameStatus = 'waiting',
  onRevealAnswer,
  onNextQuestion,
  onAddStrike,
  onStartGame,
  onPauseGame,
  onEndGame,
  onBackToWelcome
}) => {
  const [selectedTeam, setSelectedTeam] = useState<number>(1);

  const teams = [
    { id: 1, name: team1Name, score: team1Score, strikes: team1Strikes },
    { id: 2, name: team2Name, score: team2Score, strikes: team2Strikes },
    { id: 3, name: team3Name, score: team3Score, strikes: team3Strikes },
    { id: 4, name: team4Name, score: team4Score, strikes: team4Strikes },
    { id: 5, name: team5Name, score: team5Score, strikes: team5Strikes }
  ];

  const handleAnswerClick = (answerIndex: number) => {
  onRevealAnswer(answerIndex, selectedTeam);
  };

  // Ensure we have 8 answers, padding with empty ones if needed
  const paddedAnswers = [...answers];
  while (paddedAnswers.length < 8) {
    paddedAnswers.push({
      id: `empty-${paddedAnswers.length}`,
      text: '',
      points: 0,
      revealed: false
    });
  }

  return (
    <div className="w-screen h-screen fixed inset-0 overflow-auto bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToWelcome}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-lg transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-white text-2xl font-bold">
            Host Control Panel
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
            gameStatus === 'waiting' ? 'bg-yellow-600 text-yellow-100' :
            gameStatus === 'playing' ? 'bg-green-600 text-green-100' :
            gameStatus === 'paused' ? 'bg-orange-600 text-orange-100' :
            'bg-red-600 text-red-100'
          }`}>
            {gameStatus.toUpperCase()}
          </div>
          
          {gameStatus === 'waiting' && onStartGame && (
            <button
              onClick={onStartGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              ▶️ START GAME
            </button>
          )}
          
          {gameStatus === 'playing' && onPauseGame && (
            <button
              onClick={onPauseGame}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-3 rounded-lg transition-colors"
            >
              ⏸️ PAUSE
            </button>
          )}
          
          {gameStatus === 'paused' && onStartGame && (
            <button
              onClick={onStartGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-3 rounded-lg transition-colors"
            >
              ▶️ RESUME
            </button>
          )}
        </div>
      </div>

      {/* Main Control Panel */}
      <div className="max-w-6xl mx-auto">
        
        {/* Question Display */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="text-center">
            <div className="text-white/80 text-lg mb-2">Question {currentQuestionIndex + 1} of {totalQuestions}</div>
            <div className="text-white text-2xl font-bold">{currentQuestion}</div>
          </div>
        </div>

        {/* Team Selection */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="text-white text-xl font-bold mb-4 text-center">Select Team to Award Points</div>
          <div className="flex justify-center gap-3 flex-wrap">
            {teams.map(team => (
              <button
                key={team.id}
                onClick={() => setSelectedTeam(team.id)}
                className={`px-6 py-4 rounded-lg font-bold border-2 transition-all duration-200 min-w-[180px] ${
                  selectedTeam === team.id
                    ? 'bg-yellow-400 text-blue-900 border-yellow-500 shadow-lg scale-105'
                    : 'bg-blue-700/50 text-white border-blue-500/50 hover:bg-blue-600/70 hover:border-blue-400'
                }`}
              >
                <div className="text-lg">{team.name}</div>
                <div className="text-sm opacity-80">{team.score} points</div>
                <div className="flex justify-center gap-1 mt-1">
                  {[1, 2, 3].map((strike) => (
                    <div
                      key={strike}
                      className={`w-3 h-3 rounded-full ${
                        strike <= team.strikes 
                          ? 'bg-red-600' 
                          : 'bg-gray-400/50'
                      }`}
                    >
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Strike Control */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="text-white text-xl font-bold mb-4 text-center">
            Add Strike to <span className="text-red-400">{teams.find(t => t.id === selectedTeam)?.name}</span>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => onAddStrike(selectedTeam)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg flex items-center gap-2"
            >
              🚫 ADD STRIKE
            </button>
          </div>
        </div>

        {/* Answer Board */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="text-white text-xl font-bold mb-4 text-center">
            Click Answer to Award to <span className="text-yellow-400">{teams.find(t => t.id === selectedTeam)?.name}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Left Column - Answers 1-4 */}
            <div className="flex flex-col gap-4">
              {paddedAnswers.slice(0, 4).map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={answer.revealed || !answer.text}
                  className={`h-16 rounded-lg font-bold text-lg flex items-center justify-between px-4 transition-all duration-200 ${
                    answer.revealed
                      ? 'bg-green-600/80 cursor-default border-2 border-green-400 text-green-100'
                      : answer.text
                      ? 'bg-blue-600/80 hover:bg-blue-500 cursor-pointer border-2 border-blue-400/50 hover:border-blue-300 hover:scale-105 text-white'
                      : 'bg-gray-600/50 cursor-not-allowed border-2 border-gray-500/50 text-gray-300'
                  }`}
                >
                  <span className="flex-1 text-left">
                    {answer.text ? answer.text : `—`}
                  </span>
                  <span className="bg-black/40 px-3 py-1 rounded-full text-yellow-400 font-black min-w-[60px] text-center">
                    {answer.text ? answer.points : '—'}
                  </span>
                  {answer.revealed && (
                    <span className="ml-2 text-green-300 text-sm">
                      ✓ REVEALED
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Right Column - Answers 5-8 */}
            <div className="flex flex-col gap-4">
              {paddedAnswers.slice(4, 8).map((answer, index) => (
                <button
                  key={index + 4}
                  onClick={() => handleAnswerClick(index + 4)}
                  disabled={answer.revealed || !answer.text}
                  className={`h-16 rounded-lg font-bold text-lg flex items-center justify-between px-4 transition-all duration-200 ${
                    answer.revealed
                      ? 'bg-green-600/80 cursor-default border-2 border-green-400 text-green-100'
                      : answer.text
                      ? 'bg-blue-600/80 hover:bg-blue-500 cursor-pointer border-2 border-blue-400/50 hover:border-blue-300 hover:scale-105 text-white'
                      : 'bg-gray-600/50 cursor-not-allowed border-2 border-gray-500/50 text-gray-300'
                  }`}
                >
                  <span className="flex-1 text-left">
                    {answer.text ? answer.text : `—`}
                  </span>
                  <span className="bg-black/40 px-3 py-1 rounded-full text-yellow-400 font-black min-w-[60px] text-center">
                    {answer.text ? answer.points : '—'}
                  </span>
                  {answer.revealed && (
                    <span className="ml-2 text-green-300 text-sm">
                      ✓ REVEALED
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Game Progress */}
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="text-white text-lg font-bold mb-4 text-center">Progress</div>
            <div className="space-y-3 text-white text-center">
              <div>
                <span className="text-white/80">Question:</span>
                <div className="text-2xl font-bold text-yellow-400">{currentQuestionIndex + 1}/{totalQuestions}</div>
              </div>
              <div>
                <span className="text-white/80">Revealed:</span>
                <div className="text-lg font-bold">{answers.filter(a => a.revealed).length}/{answers.length}</div>
              </div>
              <div>
                <span className="text-white/80">Global Strikes:</span>
                <div className="text-lg font-bold text-red-400">{strikes}/3</div>
              </div>
            </div>
          </div>

          {/* Next Question */}
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="text-white text-lg font-bold mb-4 text-center">Controls</div>
            <div className="space-y-3">
              <button
                onClick={onNextQuestion}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                ➡️ NEXT QUESTION
              </button>
              {onEndGame && gameStatus !== 'finished' && (
                <button
                  onClick={onEndGame}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors"
                >
                  🏁 END GAME
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostControl;
