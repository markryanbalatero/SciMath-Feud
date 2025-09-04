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
  currentQuestionIndex = 1,
  totalQuestions = 1,
  onRevealAnswer,
  onBackToWelcome
}) => {

  const handleAnswerClick = (index: number) => {
    if (!answers[index].revealed) {
      onRevealAnswer(index);
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative flex items-center justify-center">
      {/* Enhanced Game Show Background Effects - Responsive */}
      <div className="absolute inset-0">
        {/* Animated Spotlight Effects - Responsive Sizing */}
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-radial from-yellow-300/20 via-yellow-400/10 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-radial from-orange-300/20 via-orange-400/10 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-radial from-red-300/15 via-red-400/8 to-transparent rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 right-1/3 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-radial from-blue-300/15 via-blue-400/8 to-transparent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* TV Studio Grid Pattern - Responsive */}
        <div className="absolute inset-0 opacity-3 sm:opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '25px 25px'
          }}></div>
        </div>
        
        {/* Stage Curtain Effect - Responsive */}
        <div className="absolute top-0 left-0 w-8 sm:w-12 md:w-16 lg:w-20 h-full bg-gradient-to-r from-red-900/40 via-red-800/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-8 sm:w-12 md:w-16 lg:w-20 h-full bg-gradient-to-l from-red-900/40 via-red-800/20 to-transparent"></div>
        
        {/* Floating TV Show Elements - Responsive Sizing */}
        <div className="absolute top-1/4 left-4 sm:left-6 md:left-8 lg:left-10 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-6 sm:right-8 md:right-10 lg:right-12 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-orange-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-6 sm:left-8 md:left-12 lg:left-16 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-red-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-1/3 right-4 sm:right-6 md:right-8 lg:right-8 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
        
        {/* TV Studio Lighting Bars - Responsive */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 sm:h-1.5 md:h-2 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 sm:h-1.5 md:h-2 bg-gradient-to-r from-transparent via-orange-300/30 to-transparent"></div>
      </div>

      {/* Enhanced Stage Design with TV Show Elements */}
      <div className="absolute inset-0">
        {/* Main Stage Circle - Responsive Design */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer Stage Ring with Spotlights - Responsive */}
          <div className="w-[70vw] h-[50vh] sm:w-[75vw] sm:h-[55vh] md:w-[80vw] md:h-[60vh] lg:w-[70vw] lg:h-[65vh] max-w-[500px] max-h-[350px] sm:max-w-[600px] sm:max-h-[400px] md:max-w-[700px] md:max-h-[450px] lg:max-w-[800px] lg:max-h-[500px] relative">
            {/* Stage Spotlight Ring - Responsive */}
            <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-radial from-yellow-200/20 via-orange-200/10 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-radial from-yellow-300/15 via-orange-300/8 to-transparent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            
            {/* Main Stage Platform - Responsive */}
            <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-full shadow-2xl border-4 sm:border-5 md:border-6 lg:border-8 border-gradient-to-r from-yellow-400 via-orange-400 to-red-400 relative overflow-hidden">
              {/* Stage Lighting Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 via-transparent to-orange-100/30 rounded-full"></div>
              
              {/* Inner gradient ring - Responsive */}
              <div className="absolute inset-1.5 sm:inset-2 md:inset-3 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-full shadow-inner"></div>
              
              {/* Decorative inner circles - Responsive */}
              <div className="absolute inset-3 sm:inset-4 md:inset-5 lg:inset-6 bg-gradient-to-br from-blue-50 via-white to-gray-100 rounded-full border-2 sm:border-3 md:border-4 border-yellow-300 shadow-lg">
                {/* Inner Stage Spotlights */}
                <div className="absolute inset-1 sm:inset-2 bg-gradient-radial from-white/50 via-transparent to-transparent rounded-full"></div>
              </div>
              
              {/* TV Show Logo/Brand Circles - Responsive */}
              <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content Container - Properly Centered */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
        
        {/* Top Score Display - Centered */}
        <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6 flex-shrink-0">
          <div className="bg-gradient-to-b from-blue-800 to-blue-900 border-2 sm:border-3 md:border-4 lg:border-5 xl:border-6 2xl:border-7 border-gradient-to-r from-orange-400 to-yellow-400 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-1.5 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 shadow-2xl relative overflow-hidden">
            {/* Glow effect behind score */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl blur-sm"></div>
            
            <div className="relative text-white font-black text-center drop-shadow-2xl" style={{ fontSize: 'clamp(1.2rem, 4vw, 3rem)' }}>
              {team1Score + team2Score}
            </div>
            
            {/* Decorative border glow */}
            <div className="absolute inset-0 border-2 border-yellow-300/50 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl animate-pulse"></div>
          </div>
        </div>

        {/* Main Answer Board - Centered and Contained */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 sm:border-3 md:border-4 lg:border-5 xl:border-6 2xl:border-7 border-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-2xl w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] max-w-6xl relative overflow-hidden flex-shrink-0">
          {/* Enhanced Background Effects for TV Show Feel */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-orange-500/10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-yellow-400/5 to-transparent"></div>
          
          {/* TV Show Stage Lighting Effects on Answer Board */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"></div>
          
          {/* Enhanced Corner Lights - Responsive Sizing */}
          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-lg border border-yellow-200"></div>
          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-orange-400 to-red-400 rounded-full animate-pulse shadow-lg border border-orange-200" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-red-400 to-pink-400 rounded-full animate-pulse shadow-lg border border-red-200" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg border border-blue-200" style={{ animationDelay: '1.5s' }}></div>
          
          {/* TV Show Brand Corner Accents - Responsive */}
          <div className="absolute -top-0.5 sm:-top-1 left-1/4 w-4 sm:w-6 md:w-8 h-1 sm:h-1.5 md:h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80"></div>
          <div className="absolute -top-0.5 sm:-top-1 right-1/4 w-4 sm:w-6 md:w-8 h-1 sm:h-1.5 md:h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-80"></div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`flex items-center justify-between border-1 sm:border-2 md:border-3 border-white rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  answer.revealed
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-xl transform scale-105 border-yellow-300'
                    : 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 opacity-90 hover:opacity-100'
                }`}
                style={{ minHeight: 'clamp(35px, 4vh, 60px)' }}
                onClick={() => handleAnswerClick(index)}
              >
                {/* Glow effect for revealed answers */}
                {answer.revealed && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl animate-pulse"></div>
                )}
                
                <div className="flex items-center flex-1 relative z-10">
                  <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold uppercase tracking-wide drop-shadow-lg break-words">
                    {answer.revealed ? answer.text : `ANSWER ${index + 1}`}
                  </span>
                </div>
                <div className="bg-gradient-to-b from-blue-800 to-blue-900 border-l-1 sm:border-l-2 md:border-l-3 border-white px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 ml-2 sm:ml-3 rounded-r-md sm:rounded-r-lg md:rounded-r-xl relative z-10">
                  <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-black drop-shadow-lg">
                    {answer.revealed ? answer.points : '0'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Team Scores Contained */}
        <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 w-full max-w-5xl px-2 sm:px-4 flex-shrink-0">
          <div className="grid grid-cols-3 items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            
            {/* Left Team Score - Responsive */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 border-2 sm:border-3 md:border-4 lg:border-5 xl:border-6 border-gradient-to-r from-yellow-400 to-orange-400 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 shadow-2xl relative overflow-hidden group transform hover:scale-105 transition-transform duration-300">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/15 to-orange-400/15 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl"></div>
              
              {/* Corner accent lights - Responsive */}
              <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-0.5 sm:bottom-1 right-0.5 sm:right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="text-center relative z-10">
                <div className="text-yellow-300 font-bold mb-1 sm:mb-1.5 md:mb-2 drop-shadow-lg" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 1.2rem)' }}>TEAM 1</div>
                <div className="text-white font-black drop-shadow-2xl" style={{ fontSize: 'clamp(1rem, 2.5vw, 2.5rem)' }}>{team1Score}</div>
              </div>
            </div>

            {/* Center Strikes Display - Responsive */}
            <div className="flex justify-center space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-3 xl:space-x-4">
              {[1, 2, 3].map((strike) => (
                <div
                  key={strike}
                  className={`rounded-full flex items-center justify-center border-2 sm:border-3 md:border-4 lg:border-5 transition-all duration-300 relative overflow-hidden ${
                    strike <= strikes
                      ? 'bg-gradient-to-br from-red-500 to-red-600 border-red-700 text-white shadow-2xl animate-pulse'
                      : 'bg-gradient-to-br from-gray-600 to-gray-700 border-gray-800 text-gray-400'
                  }`}
                  style={{ 
                    width: 'clamp(1.8rem, 3.5vw, 4rem)', 
                    height: 'clamp(1.8rem, 3.5vw, 4rem)' 
                  }}
                >
                  {/* Strike glow effect */}
                  {strike <= strikes && (
                    <div className="absolute inset-0 bg-red-400/30 rounded-full animate-ping"></div>
                  )}
                  
                  <span className="font-bold relative z-10 drop-shadow-lg" style={{ fontSize: 'clamp(0.7rem, 1.8vw, 1.8rem)' }}>❌</span>
                </div>
              ))}
            </div>

            {/* Right Team Score - Responsive */}
            <div className="bg-gradient-to-br from-green-800 to-green-900 border-2 sm:border-3 md:border-4 lg:border-5 xl:border-6 border-gradient-to-r from-yellow-400 to-orange-400 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 shadow-2xl relative overflow-hidden group transform hover:scale-105 transition-transform duration-300">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/15 to-orange-400/15 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl"></div>
              
              {/* Corner accent lights - Responsive */}
              <div className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-0.5 sm:bottom-1 left-0.5 sm:left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="text-center relative z-10">
                <div className="text-yellow-300 font-bold mb-1 sm:mb-1.5 md:mb-2 drop-shadow-lg" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 1.2rem)' }}>TEAM 2</div>
                <div className="text-white font-black drop-shadow-2xl" style={{ fontSize: 'clamp(1rem, 2.5vw, 2.5rem)' }}>{team2Score}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Display - Positioned Above Content */}
        <div className="absolute top-2 sm:top-3 md:top-4 lg:top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-black/85 via-black/75 to-black/85 backdrop-blur-md rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 lg:py-4 w-[92vw] sm:w-[85vw] md:w-[80vw] lg:w-[75vw] max-w-4xl shadow-2xl border border-yellow-400/40 z-30">
          <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-center drop-shadow-lg leading-tight break-words">
            {currentQuestion}
          </div>
        </div>

        {/* Control Buttons - Fixed Position */}
        <button
          onClick={onBackToWelcome}
          className="absolute top-0.5 sm:top-1 md:top-1.5 lg:top-2 right-1 sm:right-2 md:right-3 lg:right-4 bg-gradient-to-r from-black/70 to-black/85 hover:from-black/85 hover:to-black/95 backdrop-blur-md text-white/85 hover:text-white font-medium py-0.5 sm:py-1 md:py-1.5 px-1.5 sm:px-2 md:px-2.5 lg:px-3 rounded-sm sm:rounded-md transition-all duration-300 text-xs sm:text-sm shadow-xl border border-white/25 hover:border-white/50 z-40"
        >
          ← Menu
        </button>

        <div className="absolute top-0.5 sm:top-1 md:top-1.5 lg:top-2 left-1 sm:left-2 md:left-3 lg:left-4 bg-gradient-to-r from-black/70 to-black/85 backdrop-blur-md text-white/85 font-medium py-0.5 sm:py-1 md:py-1.5 px-1.5 sm:px-2 md:px-2.5 lg:px-3 rounded-sm sm:rounded-md text-xs sm:text-sm shadow-xl border border-white/25 z-40">
          Question {currentQuestionIndex} of {totalQuestions}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
