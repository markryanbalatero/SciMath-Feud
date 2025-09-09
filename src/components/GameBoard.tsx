import React from 'react';

interface GameBoardProps {
  currentQuestion: string;
  answers: Array<{
    text: string;
    points: number;
    revealed: boolean;
  }>;
  team1Score: number;
  team2Score: number;
  team3Score: number;
  team4Score: number;
  team5Score: number;
  team1Name?: string;
  team2Name?: string;
  team3Name?: string;
  team4Name?: string;
  team5Name?: string;
  strikes: number;
  currentQuestionIndex?: number;
  totalQuestions?: number;
  onRevealAnswer: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  currentQuestion,
  answers,
  team1Score,
  team2Score,
  team3Score,
  team4Score,
  team5Score,
  team1Name,
  team2Name,
  team3Name,
  team4Name,
  team5Name,
  strikes,
  onRevealAnswer
}) => {
  const handleAnswerClick = (index: number) => {
    if (!answers[index].revealed) {
      onRevealAnswer(index);
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 overflow-hidden bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center">
      {/* Background Pattern - Match Welcome Screen */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-radial from-blue-600/20 to-transparent"></div>
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: 'clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)'
          }}
        ></div>
      </div>

      {/* Enhanced Game Show Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Spotlight Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-yellow-300/20 via-yellow-400/10 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-orange-300/20 via-orange-400/10 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-radial from-red-300/15 via-red-400/8 to-transparent rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-radial from-blue-300/15 via-blue-400/8 to-transparent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Game Content Container - Better Layout for Visibility */}
      <div className="relative z-10 w-full h-full flex flex-col px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
        
        {/* Question Display at Top - Always visible */}
        <div className="flex-shrink-0 mb-3 sm:mb-4 lg:mb-6 w-full max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-md border-2 border-yellow-400/50 rounded-xl lg:rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 shadow-2xl">
            <div className="text-white text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-center drop-shadow-lg leading-tight">
              {currentQuestion}
            </div>
          </div>
        </div>

        {/* Main Game Area - 5 Team Layout */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 max-h-full p-2 sm:p-4">
          
          {/* Top Section - Teams 1 & 2 (Left) and Teams 4 & 5 (Right) */}
          <div className="w-full max-w-7xl flex justify-between items-center mb-4 sm:mb-6">
            
            {/* Left Side - Teams 1 & 2 */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Team 1 */}
              <div className="bg-gradient-to-br from-red-700 to-red-800 border-2 sm:border-3 lg:border-4 border-yellow-400 rounded-xl lg:rounded-2xl w-20 sm:w-28 lg:w-36 xl:w-40 h-24 sm:h-32 lg:h-40 xl:h-44 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-1 sm:inset-2 border-2 border-dotted border-yellow-300 rounded-lg lg:rounded-xl"></div>
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base xl:text-lg drop-shadow-lg z-10 mb-1 text-center px-1">
                  {team1Name || 'Team 1'}
                </div>
                <div className="text-white font-black text-lg sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-2xl z-10">{team1Score}</div>
              </div>
              
              {/* Team 2 */}
              <div className="bg-gradient-to-br from-blue-700 to-blue-800 border-2 sm:border-3 lg:border-4 border-yellow-400 rounded-xl lg:rounded-2xl w-20 sm:w-28 lg:w-36 xl:w-40 h-24 sm:h-32 lg:h-40 xl:h-44 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-1 sm:inset-2 border-2 border-dotted border-yellow-300 rounded-lg lg:rounded-xl"></div>
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base xl:text-lg drop-shadow-lg z-10 mb-1 text-center px-1">
                  {team2Name || 'Team 2'}
                </div>
                <div className="text-white font-black text-lg sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-2xl z-10">{team2Score}</div>
              </div>
            </div>

            {/* Central Answer Board */}
            <div className="flex-1 max-w-2xl lg:max-w-3xl mx-6 sm:mx-8 lg:mx-10 ml-20 sm:ml-28 lg:ml-36">
              <div className="relative bg-gradient-to-br from-blue-700 to-blue-800 rounded-full border-4 sm:border-6 lg:border-8 border-yellow-400 shadow-2xl p-4 sm:p-6 lg:p-8" style={{ aspectRatio: '4/3', maxHeight: '55vh' }}>
                
                {/* Dotted pattern around the border */}
                <div className="absolute inset-3 sm:inset-4 lg:inset-6 border-2 sm:border-3 lg:border-4 border-dotted border-yellow-300 rounded-full"></div>
                
                {/* Inner content area */}
                <div className="relative z-10 h-full flex flex-col justify-center">
                  
                  {/* Answer Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 w-full">
                    {answers.slice(0, 8).map((answer, index) => (
                      <div
                        key={index}
                        className={`relative cursor-pointer transition-all duration-300 ${
                          answer.revealed ? 'transform scale-105' : 'hover:scale-102'
                        }`}
                        onClick={() => handleAnswerClick(index)}
                      >
                        <div className={`flex items-center justify-between h-8 sm:h-10 lg:h-12 xl:h-14 px-3 sm:px-4 lg:px-5 rounded-lg border-2 ${
                          answer.revealed 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-white text-white shadow-xl' 
                            : 'bg-gradient-to-r from-blue-800 to-blue-900 border-blue-600 text-gray-300 hover:bg-blue-700'
                        }`}>
                          <div className="flex items-center flex-1">
                            <span className="font-bold text-sm sm:text-base lg:text-lg uppercase tracking-wide">
                              {answer.revealed ? answer.text : `${index + 1}`}
                            </span>
                          </div>
                          <div className="bg-blue-900 px-2 sm:px-3 lg:px-4 py-1 rounded border-l-2 border-blue-600 min-w-[30px] sm:min-w-[40px] lg:min-w-[50px] text-center">
                            <span className="font-black text-sm sm:text-base lg:text-lg">
                              {answer.revealed ? answer.points : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Teams 4 & 5 */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Team 4 */}
              <div className="bg-gradient-to-br from-purple-700 to-purple-800 border-2 sm:border-3 lg:border-4 border-yellow-400 rounded-xl lg:rounded-2xl w-20 sm:w-28 lg:w-36 xl:w-40 h-24 sm:h-32 lg:h-40 xl:h-44 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-1 sm:inset-2 border-2 border-dotted border-yellow-300 rounded-lg lg:rounded-xl"></div>
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base xl:text-lg drop-shadow-lg z-10 mb-1 text-center px-1">
                  {team4Name || 'Team 4'}
                </div>
                <div className="text-white font-black text-lg sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-2xl z-10">{team4Score}</div>
              </div>
              
              {/* Team 5 */}
              <div className="bg-gradient-to-br from-orange-700 to-orange-800 border-2 sm:border-3 lg:border-4 border-yellow-400 rounded-xl lg:rounded-2xl w-20 sm:w-28 lg:w-36 xl:w-40 h-24 sm:h-32 lg:h-40 xl:h-44 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-1 sm:inset-2 border-2 border-dotted border-yellow-300 rounded-lg lg:rounded-xl"></div>
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base xl:text-lg drop-shadow-lg z-10 mb-1 text-center px-1">
                  {team5Name || 'Team 5'}
                </div>
                <div className="text-white font-black text-lg sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-2xl z-10">{team5Score}</div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Team 3 */}
          <div className="flex justify-center mt-4 sm:mt-6">
            <div className="bg-gradient-to-br from-green-700 to-green-800 border-2 sm:border-3 lg:border-4 border-yellow-400 rounded-xl lg:rounded-2xl w-24 sm:w-32 lg:w-40 xl:w-44 h-20 sm:h-24 lg:h-28 xl:h-32 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-1 sm:inset-2 border-2 border-dotted border-yellow-300 rounded-lg lg:rounded-xl"></div>
              <div className="text-white font-bold text-xs sm:text-sm lg:text-base xl:text-lg drop-shadow-lg z-10 mb-1 text-center px-1">
                {team3Name || 'Team 3'}
              </div>
              <div className="text-white font-black text-lg sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-2xl z-10">{team3Score}</div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Always visible */}
        <div className="flex-shrink-0 mt-3 sm:mt-4 lg:mt-6 flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
          
          {/* Strikes Display - Compact */}
          <div className="flex space-x-2 sm:space-x-3 lg:space-x-4">
            {[1, 2, 3].map((strike) => (
              <div
                key={strike}
                className={`w-10 sm:w-12 lg:w-14 xl:w-16 h-10 sm:h-12 lg:h-14 xl:h-16 rounded-full flex items-center justify-center border-2 sm:border-3 transition-all duration-300 ${
                  strike <= strikes
                    ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-2xl'
                    : 'bg-gray-700 border-gray-600 text-gray-500'
                }`}
              >
                <span className="font-black text-sm sm:text-lg lg:text-xl xl:text-2xl">✕</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
