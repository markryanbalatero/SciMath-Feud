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
  strikes: number;
  gameStatus?: 'waiting' | 'playing' | 'paused' | 'finished';
  onRevealAnswer: (index: number) => void;
  onNextQuestion: () => void;
  onAddStrike: () => void;
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
    { id: 1, name: team1Name, score: team1Score },
    { id: 2, name: team2Name, score: team2Score },
    { id: 3, name: team3Name, score: team3Score },
    { id: 4, name: team4Name, score: team4Score },
    { id: 5, name: team5Name, score: team5Score }
  ];

  const handleAnswerClick = (answerIndex: number) => {
    onRevealAnswer(answerIndex);
  };

  const handleBuzzer = () => {
    onAddStrike();
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
    <div className="w-screen h-screen fixed inset-0 overflow-auto bg-[#1f225d] p-6">
      
      {/* Header with Game Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToWelcome}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded"
          >
            ← Back
          </button>
          <h1 className="text-white text-2xl font-bold">
            #{currentQuestionIndex + 1} {currentQuestion}
          </h1>
          
          {/* Game Status Indicator */}
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
            gameStatus === 'waiting' ? 'bg-yellow-600 text-yellow-100' :
            gameStatus === 'playing' ? 'bg-green-600 text-green-100' :
            gameStatus === 'paused' ? 'bg-orange-600 text-orange-100' :
            'bg-red-600 text-red-100'
          }`}>
            {gameStatus.toUpperCase()}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Game Control Buttons */}
          {gameStatus === 'waiting' && onStartGame && (
            <button
              onClick={onStartGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg"
            >
              ▶️ START GAME
            </button>
          )}
          
          {gameStatus === 'playing' && onPauseGame && (
            <button
              onClick={onPauseGame}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-3 rounded-lg"
            >
              ⏸️ PAUSE
            </button>
          )}
          
          {gameStatus === 'paused' && onStartGame && (
            <button
              onClick={onStartGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-3 rounded-lg"
            >
              ▶️ RESUME
            </button>
          )}
          
          {(gameStatus === 'playing' || gameStatus === 'paused') && (
            <button
              onClick={onNextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg"
            >
              NEXT QUESTION
            </button>
          )}
          
          {onEndGame && gameStatus !== 'finished' && (
            <button
              onClick={onEndGame}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-3 rounded-lg"
            >
              🏁 END GAME
            </button>
          )}
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {teams.map((team) => (
          <div key={team.id} className="bg-[#2a2e6b] rounded-lg p-6">
            
            {/* Team Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-bold">
                {team.name}
              </h2>
              <div className="flex gap-1">
                {[1, 2, 3].map((strike) => (
                  <div
                    key={strike}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      strike <= strikes ? 'bg-red-600' : 'bg-gray-600'
                    }`}
                  >
                    ✕
                  </div>
                ))}
              </div>
            </div>

            {/* Answer Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {paddedAnswers.slice(0, 8).map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={answer.revealed || !answer.text}
                  className={`h-12 rounded text-white font-bold text-sm flex items-center justify-between px-3 transition-all ${
                    answer.revealed
                      ? 'bg-blue-600 cursor-default'
                      : answer.text
                      ? 'bg-blue-500 hover:bg-blue-400 cursor-pointer'
                      : 'bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  <span>
                    {answer.revealed ? answer.text : `ANSWER ${index + 1}`}
                  </span>
                  <span className="bg-blue-800 px-2 py-1 rounded text-xs min-w-[30px] text-center">
                    {answer.revealed || !answer.text ? answer.points : ''}
                  </span>
                </button>
              ))}
            </div>

            {/* Buzzer Button */}
            <button
              onClick={handleBuzzer}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg"
            >
              ✕ BUZZER
            </button>

            {/* Team Score Display */}
            <div className="mt-4 text-center">
              <div className="text-white text-lg">
                Score: <span className="font-bold text-yellow-300">{team.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Game Stats */}
      <div className="mt-8 bg-[#2a2e6b] rounded-lg p-4">
        <div className="flex justify-between items-center text-white">
          <div>
            <span className="font-bold">Question:</span> {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <div>
            <span className="font-bold">Strikes:</span> {strikes}/3
          </div>
          <div>
            <span className="font-bold">Revealed:</span> {answers.filter(a => a.revealed).length}/{answers.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostControl;
