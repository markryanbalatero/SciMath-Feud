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
  strikes: number;
  currentQuestionIndex?: number;
  totalQuestions?: number;
  onRevealAnswer: (index: number) => void;
  onBackToWelcome: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  currentQuestion,
  answers,
  team1Score,
  team2Score,
  strikes,
  onRevealAnswer,
  onBackToWelcome
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

      {/* Game Content Container - Centered Layout */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        
        {/* Question Display at Top */}
        <div className="mb-6 sm:mb-8 w-full max-w-5xl">
          <div className="bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-md border-2 border-yellow-400/50 rounded-2xl px-6 sm:px-8 py-4 sm:py-6 shadow-2xl">
            <div className="text-white text-xl sm:text-2xl lg:text-3xl font-bold text-center drop-shadow-lg leading-tight">
              {currentQuestion}
            </div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="flex items-center justify-center w-full max-w-7xl gap-4 sm:gap-6 lg:gap-8">
          
          {/* Left Team Score */}
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 border-4 sm:border-6 border-yellow-400 rounded-3xl w-32 sm:w-40 lg:w-48 h-40 sm:h-48 lg:h-56 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-2 sm:inset-3 border-2 sm:border-3 border-dotted border-yellow-300 rounded-2xl"></div>
              <div className="text-yellow-300 font-bold text-sm sm:text-lg lg:text-xl mb-1 sm:mb-2 z-10">TEAM 1</div>
              <div className="text-white font-black text-3xl sm:text-5xl lg:text-6xl drop-shadow-2xl z-10">{team1Score}</div>
            </div>
          </div>

          {/* Central Answer Board - Oval Shape */}
          <div className="flex-1 max-w-4xl">
            <div className="relative bg-gradient-to-br from-blue-700 to-blue-800 rounded-full border-6 sm:border-8 border-yellow-400 shadow-2xl p-6 sm:p-8 lg:p-12" style={{ aspectRatio: '4/3' }}>
              
              {/* Dotted pattern around the border */}
              <div className="absolute inset-4 sm:inset-6 border-4 sm:border-6 border-dotted border-yellow-300 rounded-full"></div>
              
              {/* Inner content area */}
              <div className="relative z-10 h-full flex flex-col justify-center">
                
                {/* Answer Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-4xl mx-auto">
                  {answers.slice(0, 8).map((answer, index) => (
                    <div
                      key={index}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        answer.revealed ? 'transform scale-105' : 'hover:scale-102'
                      }`}
                      onClick={() => handleAnswerClick(index)}
                    >
                      <div className={`flex items-center justify-between h-12 sm:h-14 lg:h-16 px-3 sm:px-4 lg:px-6 rounded-lg sm:rounded-xl border-2 sm:border-3 ${
                        answer.revealed 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-white text-white shadow-xl' 
                          : 'bg-gradient-to-r from-blue-800 to-blue-900 border-blue-600 text-gray-300 hover:bg-blue-700'
                      }`}>
                        <div className="flex items-center flex-1">
                          <span className="font-bold text-sm sm:text-base lg:text-lg uppercase tracking-wide">
                            {answer.revealed ? answer.text : `${index + 1}`}
                          </span>
                        </div>
                        <div className="bg-blue-900 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg border-l-2 sm:border-l-3 border-blue-600 min-w-[40px] sm:min-w-[50px] lg:min-w-[60px] text-center">
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

          {/* Right Team Score */}
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-br from-green-700 to-green-800 border-4 sm:border-6 border-yellow-400 rounded-3xl w-32 sm:w-40 lg:w-48 h-40 sm:h-48 lg:h-56 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-2 sm:inset-3 border-2 sm:border-3 border-dotted border-yellow-300 rounded-2xl"></div>
              <div className="text-yellow-300 font-bold text-sm sm:text-lg lg:text-xl mb-1 sm:mb-2 z-10">TEAM 2</div>
              <div className="text-white font-black text-3xl sm:text-5xl lg:text-6xl drop-shadow-2xl z-10">{team2Score}</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-4 sm:gap-6">
          
          {/* Strikes Display */}
          <div className="flex space-x-4 sm:space-x-6">
            {[1, 2, 3].map((strike) => (
              <div
                key={strike}
                className={`w-16 sm:w-18 lg:w-20 h-16 sm:h-18 lg:h-20 rounded-full flex items-center justify-center border-3 sm:border-4 transition-all duration-300 ${
                  strike <= strikes
                    ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-2xl'
                    : 'bg-gray-700 border-gray-600 text-gray-500'
                }`}
              >
                <span className="font-black text-2xl sm:text-3xl">✕</span>
              </div>
            ))}
          </div>

          {/* Family Feud Logo */}
          <div className="relative">
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-yellow-100 font-black px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-2xl border-4 border-yellow-400 shadow-2xl transform -rotate-1">
              <div className="relative z-10">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl leading-tight">FAMILY</div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl leading-tight">FEUD</div>
                </div>
              </div>
              {/* Inner glow */}
              <div className="absolute inset-2 bg-gradient-to-r from-red-400/30 to-orange-400/30 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Button */}
      <button
        onClick={onBackToWelcome}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-gradient-to-r from-black/70 to-black/85 hover:from-black/85 hover:to-black/95 backdrop-blur-md text-white/85 hover:text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-xl border border-white/25 hover:border-white/50 z-50"
      >
        ← Menu
      </button>
    </div>
  );
};

export default GameBoard;
