import React, { useState, useEffect } from 'react';

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
  team1Strikes?: number;
  team2Strikes?: number;
  team3Strikes?: number;
  team4Strikes?: number;
  team5Strikes?: number;
  strikes: number;
  currentQuestionIndex?: number;
  totalQuestions?: number;
  onRevealAnswer: (index: number) => void;
  showStrikeAnimation?: boolean;
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
  team1Strikes = 0,
  team2Strikes = 0,
  team3Strikes = 0,
  team4Strikes = 0,
  team5Strikes = 0,
  onRevealAnswer,
  showStrikeAnimation = false
}) => {
  // Debug logging for strikes
  useEffect(() => {
    console.log('GameBoard received strike data:', {
      team1Strikes,
      team2Strikes,
      team3Strikes,
      team4Strikes,
      team5Strikes
    });
  }, [team1Strikes, team2Strikes, team3Strikes, team4Strikes, team5Strikes]);

  // Track previous scores to detect changes
  const [prevScores, setPrevScores] = useState({
    team1: team1Score,
    team2: team2Score,
    team3: team3Score,
    team4: team4Score,
    team5: team5Score,
  });
  
  // Track which teams have score animations
  const [animatingTeams, setAnimatingTeams] = useState<Set<number>>(new Set());

  // Check for score changes and trigger animations
  useEffect(() => {
    const currentScores = {
      team1: team1Score,
      team2: team2Score,
      team3: team3Score,
      team4: team4Score,
      team5: team5Score,
    };

    const newAnimatingTeams = new Set<number>();

    Object.entries(currentScores).forEach(([teamKey, currentScore], index) => {
      const teamNumber = index + 1;
      const prevScore = prevScores[teamKey as keyof typeof prevScores];
      
      if (currentScore > prevScore) {
        newAnimatingTeams.add(teamNumber);
      }
    });

    if (newAnimatingTeams.size > 0) {
      setAnimatingTeams(newAnimatingTeams);
      
      // Clear animations after 2 seconds
      setTimeout(() => {
        setAnimatingTeams(new Set());
      }, 2000);
    }

    setPrevScores(currentScores);
  }, [team1Score, team2Score, team3Score, team4Score, team5Score]);

  const handleAnswerClick = (index: number) => {
    if (!answers[index].revealed) {
      onRevealAnswer(index);
    }
  };

  // Helper function to get team box classes with animation
  const getTeamBoxClasses = (teamNumber: number, baseClasses: string) => {
    const isAnimating = animatingTeams.has(teamNumber);
    return `${baseClasses} ${isAnimating ? 'animate-bounce shadow-yellow-400/50 shadow-2xl scale-110 border-yellow-300' : ''}`;
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
              <div className={getTeamBoxClasses(1, "bg-gradient-to-br from-red-700 to-red-800 border-2 sm:border-3 lg:border-4 border-yellow-400 rounded-xl lg:rounded-2xl w-20 sm:w-28 lg:w-36 xl:w-40 h-24 sm:h-32 lg:h-40 xl:h-44 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-500")}>
                <div className="absolute inset-1 sm:inset-2 border-2 border-dotted border-yellow-300 rounded-lg lg:rounded-xl"></div>
                
                {/* Team Name */}
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base xl:text-lg drop-shadow-lg z-10 mb-1 text-center px-1">
                  {team1Name || 'Team 1'}
                </div>
                
                {/* Main Score Display */}
                <div className="text-yellow-400 font-black text-lg sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-2xl z-10 mb-1">
                  {team1Score}
                </div>
                
                {/* Score Label */}
                <div className="text-white font-bold text-xs sm:text-sm drop-shadow-lg z-10 mb-1">
                  POINTS
                </div>
                
                {/* Strike Display */}
                <div className="flex gap-1 z-10">
                  {Array.from({ length: team1Strikes }, (_, index) => {
                    console.log(`Team 1 Strike ${index + 1} - total strikes: ${team1Strikes}`);
                    return (
                      <div
                        key={index}
                        className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold animate-pulse"
                      >
                        ✕
                      </div>
                    );
                  })}
                </div>
                
                {animatingTeams.has(1) && (
                  <div className="absolute inset-0 bg-yellow-400 opacity-30 rounded-xl lg:rounded-2xl animate-pulse"></div>
                )}
              </div>
              
              {/* Team 2 */}
              <div className={getTeamBoxClasses(2, "bg-gradient-to-br from-blue-700 to-blue-800 border-2 sm:border-3 lg:border-4 border-yellow-400 rounded-xl lg:rounded-2xl w-20 sm:w-28 lg:w-36 xl:w-40 h-24 sm:h-32 lg:h-40 xl:h-44 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-500")}>
                <div className="absolute inset-1 sm:inset-2 border-2 border-dotted border-yellow-300 rounded-lg lg:rounded-xl"></div>
                
                {/* Team Name */}
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base xl:text-lg drop-shadow-lg z-10 mb-1 text-center px-1">
                  {team2Name || 'Team 2'}
                </div>
                
                {/* Main Score Display */}
                <div className="text-yellow-400 font-black text-lg sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-2xl z-10 mb-1">
                  {team2Score}
                </div>
                
                {/* Score Label */}
                <div className="text-white font-bold text-xs sm:text-sm drop-shadow-lg z-10 mb-1">
                  POINTS
                </div>
                
                {/* Strike Display */}
                <div className="flex gap-1 z-10">
                  {Array.from({ length: team2Strikes }, (_, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold animate-pulse"
                    >
                      ✕
                    </div>
                  ))}
                </div>
                
                {animatingTeams.has(2) && (
                  <div className="absolute inset-0 bg-yellow-400 opacity-30 rounded-xl lg:rounded-2xl animate-pulse"></div>
                )}
              </div>
            </div>

            {/* Central Answer Board */}
            <div className="flex-1 max-w-2xl lg:max-w-3xl mx-6 sm:mx-8 lg:mx-10 ml-20 sm:ml-28 lg:ml-36">
              <div className="relative bg-gradient-to-br from-blue-700 to-blue-800 rounded-full border-4 sm:border-6 lg:border-8 border-yellow-400 shadow-2xl p-4 sm:p-6 lg:p-8" style={{ aspectRatio: '4/3', maxHeight: '55vh' }}>
                
                {/* Dotted pattern around the border */}
                <div className="absolute inset-3 sm:inset-4 lg:inset-6 border-2 sm:border-3 lg:border-4 border-dotted border-yellow-300 rounded-full"></div>
                
                {/* Inner content area */}
                <div className="relative z-10 h-full flex flex-col justify-center">
                  
                  {/* Answer Grid - Column Layout */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
                    
                    {/* Left Column - Answers 1-4 */}
                    <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                      {answers.slice(0, 4).map((answer, index) => (
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

                    {/* Right Column - Answers 5-8 */}
                    <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                      {answers.slice(4, 8).map((answer, index) => (
                        <div
                          key={index + 4}
                          className={`relative cursor-pointer transition-all duration-300 ${
                            answer.revealed ? 'transform scale-105' : 'hover:scale-102'
                          }`}
                          onClick={() => handleAnswerClick(index + 4)}
                        >
                          <div className={`flex items-center justify-between h-8 sm:h-10 lg:h-12 xl:h-14 px-3 sm:px-4 lg:px-5 rounded-lg border-2 ${
                            answer.revealed 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-white text-white shadow-xl' 
                              : 'bg-gradient-to-r from-blue-800 to-blue-900 border-blue-600 text-gray-300 hover:bg-blue-700'
                          }`}>
                            <div className="flex items-center flex-1">
                              <span className="font-bold text-sm sm:text-base lg:text-lg uppercase tracking-wide">
                                {answer.revealed ? answer.text : `${index + 5}`}
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
            </div>

            {/* Right Side - Teams 4 & 5 */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Team 4 */}
              <div className={getTeamBoxClasses(4, "bg-gradient-to-br from-purple-700 to-purple-800 border-2 sm:border-3 lg:border-4 border-yellow-400 rounded-xl lg:rounded-2xl w-20 sm:w-28 lg:w-36 xl:w-40 h-24 sm:h-32 lg:h-40 xl:h-44 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-500")}>
                <div className="absolute inset-1 sm:inset-2 border-2 border-dotted border-yellow-300 rounded-lg lg:rounded-xl"></div>
                
                {/* Team Name */}
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base xl:text-lg drop-shadow-lg z-10 mb-1 text-center px-1">
                  {team4Name || 'Team 4'}
                </div>
                
                {/* Main Score Display */}
                <div className="text-yellow-400 font-black text-lg sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-2xl z-10 mb-1">
                  {team4Score}
                </div>
                
                {/* Score Label */}
                <div className="text-white font-bold text-xs sm:text-sm drop-shadow-lg z-10 mb-1">
                  POINTS
                </div>
                
                {/* Strike Display */}
                <div className="flex gap-1 z-10">
                  {Array.from({ length: team4Strikes }, (_, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold animate-pulse"
                    >
                      ✕
                    </div>
                  ))}
                </div>
                
                {animatingTeams.has(4) && (
                  <div className="absolute inset-0 bg-yellow-400 opacity-30 rounded-xl lg:rounded-2xl animate-pulse"></div>
                )}
              </div>
              
              {/* Team 5 */}
              <div className={getTeamBoxClasses(5, "bg-gradient-to-br from-orange-700 to-orange-800 border-2 sm:border-3 lg:border-4 border-yellow-400 rounded-xl lg:rounded-2xl w-20 sm:w-28 lg:w-36 xl:w-40 h-24 sm:h-32 lg:h-40 xl:h-44 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-500")}>
                <div className="absolute inset-1 sm:inset-2 border-2 border-dotted border-yellow-300 rounded-lg lg:rounded-xl"></div>
                
                {/* Team Name */}
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base xl:text-lg drop-shadow-lg z-10 mb-1 text-center px-1">
                  {team5Name || 'Team 5'}
                </div>
                
                {/* Main Score Display */}
                <div className="text-yellow-400 font-black text-lg sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-2xl z-10 mb-1">
                  {team5Score}
                </div>
                
                {/* Score Label */}
                <div className="text-white font-bold text-xs sm:text-sm drop-shadow-lg z-10 mb-1">
                  POINTS
                </div>
                
                {/* Strike Display */}
                <div className="flex gap-1 z-10">
                  {Array.from({ length: team5Strikes }, (_, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold animate-pulse"
                    >
                      ✕
                    </div>
                  ))}
                </div>
                
                {animatingTeams.has(5) && (
                  <div className="absolute inset-0 bg-yellow-400 opacity-30 rounded-xl lg:rounded-2xl animate-pulse"></div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section - Team 3 */}
          <div className="flex justify-center mt-4 sm:mt-6">
            <div className={getTeamBoxClasses(3, "bg-gradient-to-br from-green-700 to-green-800 border-2 sm:border-3 lg:border-4 border-yellow-400 rounded-xl lg:rounded-2xl w-24 sm:w-32 lg:w-40 xl:w-44 h-20 sm:h-24 lg:h-28 xl:h-32 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-500")}>
              <div className="absolute inset-1 sm:inset-2 border-2 border-dotted border-yellow-300 rounded-lg lg:rounded-xl"></div>
              
              {/* Team Name */}
              <div className="text-white font-bold text-xs sm:text-sm lg:text-base xl:text-lg drop-shadow-lg z-10 mb-1 text-center px-1">
                {team3Name || 'Team 3'}
              </div>
              
              {/* Main Score Display */}
              <div className="text-yellow-400 font-black text-lg sm:text-2xl lg:text-3xl xl:text-4xl drop-shadow-2xl z-10 mb-1">
                {team3Score}
              </div>
              
              {/* Score Label */}
              <div className="text-white font-bold text-xs sm:text-sm drop-shadow-lg z-10 mb-1">
                POINTS
              </div>
              
              {/* Strike Display */}
              <div className="flex gap-1 z-10">
                {Array.from({ length: team3Strikes }, (_, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold animate-pulse"
                  >
                    ✕
                  </div>
                ))}
              </div>
              
              {animatingTeams.has(3) && (
                <div className="absolute inset-0 bg-yellow-400 opacity-30 rounded-xl lg:rounded-2xl animate-pulse"></div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section - Always visible */}
        <div className="flex-shrink-0 mt-3 sm:mt-4 lg:mt-6 flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
        </div>
      </div>

      {/* Large Strike Animation Overlay - Full Screen */}
      {showStrikeAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-red-600 bg-opacity-95 animate-pulse">
          {/* Flashing Red Background covering entire screen */}
          <div className="absolute inset-0 bg-red-700 animate-ping"></div>
          
          {/* Giant X centered on screen with scale animation */}
          <div className="relative z-10 text-white text-[25rem] font-black drop-shadow-2xl animate-bounce transform scale-110">
            ✕
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
