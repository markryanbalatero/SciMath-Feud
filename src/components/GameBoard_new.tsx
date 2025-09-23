// import React, { useState, useEffect } from 'react';

// interface GameBoardProps {
//   currentQuestion: string;
//   answers: Array<{
//     text: string;
//     points: number;
//     revealed: boolean;
//   }>;
//   team1Score: number;
//   team2Score: number;
//   strikes: number;
//   currentQuestionIndex?: number;
//   totalQuestions?: number;
//   onRevealAnswer: (index: number) => void;
//   onBackToWelcome: () => void;
// }

// const GameBoard: React.FC<GameBoardProps> = ({
//   currentQuestion,
//   answers,
//   team1Score,
//   team2Score,
//   strikes,
//   currentQuestionIndex: _currentQuestionIndex = 1,
//   totalQuestions: _totalQuestions = 1,
//   onRevealAnswer,
//   onBackToWelcome
// }) => {
//   const [timer, setTimer] = useState(100);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => prev > 0 ? prev - 1 : 0);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleAnswerClick = (index: number) => {
//     if (!answers[index].revealed) {
//       onRevealAnswer(index);
//     }
//   };

//   return (
//     <div className="w-screen h-screen fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 relative">
//       {/* Background lighting effects */}
//       <div className="absolute inset-0">
//         {/* Main background gradient with lighting */}
//         <div className="absolute inset-0 bg-gradient-radial from-blue-600/30 via-blue-800/50 to-blue-900/70"></div>
        
//         {/* Animated light streaks */}
//         <div className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-cyan-400/40 via-blue-400/20 to-transparent transform -skew-x-12 animate-pulse"></div>
//         <div className="absolute top-0 right-1/4 w-2 h-full bg-gradient-to-b from-cyan-400/40 via-blue-400/20 to-transparent transform skew-x-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
//         {/* Corner lighting */}
//         <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-cyan-400/20 to-transparent"></div>
//         <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-cyan-400/20 to-transparent"></div>
//       </div>

//       {/* Question Display at Top */}
//       <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
//         <div className="bg-gray-800/90 backdrop-blur-md border-2 border-gray-600 rounded-2xl px-8 py-4 max-w-4xl">
//           <div className="text-white text-xl font-semibold text-center">
//             {currentQuestion}
//           </div>
//         </div>
//       </div>

//       {/* Timer Display */}
//       <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20">
//         <div className="bg-yellow-500 text-black font-black text-3xl px-6 py-2 rounded-xl border-4 border-yellow-400 shadow-2xl">
//           {timer.toString().padStart(1, '0')}:00
//         </div>
//       </div>

//       {/* Player Avatars and Names */}
//       <div className="absolute top-8 left-8 z-20">
//         <div className="flex flex-col items-center">
//           <div className="w-24 h-24 bg-blue-600 rounded-2xl border-4 border-yellow-400 flex items-center justify-center mb-2 shadow-xl">
//             <div className="w-16 h-16 bg-gray-300 rounded-xl flex items-center justify-center">
//               <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//               </svg>
//             </div>
//           </div>
//           <div className="text-white font-bold text-lg">Team 1</div>
//         </div>
//       </div>

//       <div className="absolute top-8 right-8 z-20">
//         <div className="flex flex-col items-center">
//           <div className="w-24 h-24 bg-blue-600 rounded-2xl border-4 border-yellow-400 flex items-center justify-center mb-2 shadow-xl">
//             <div className="w-16 h-16 bg-gray-300 rounded-xl flex items-center justify-center">
//               <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//               </svg>
//             </div>
//           </div>
//           <div className="text-white font-bold text-lg">Team 2</div>
//         </div>
//       </div>

//       {/* Main Game Board Container */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="relative w-full max-w-6xl mx-8">
          
//           {/* Team Score Boxes */}
//           <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
//             <div className="bg-blue-700 border-4 border-yellow-400 rounded-3xl w-32 h-40 flex items-center justify-center shadow-2xl relative overflow-hidden">
//               {/* Dotted pattern border */}
//               <div className="absolute inset-2 border-2 border-dotted border-yellow-300 rounded-2xl"></div>
//               <div className="text-white font-black text-5xl drop-shadow-2xl z-10">{team1Score}</div>
//             </div>
//           </div>

//           <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
//             <div className="bg-blue-700 border-4 border-yellow-400 rounded-3xl w-32 h-40 flex items-center justify-center shadow-2xl relative overflow-hidden">
//               {/* Dotted pattern border */}
//               <div className="absolute inset-2 border-2 border-dotted border-yellow-300 rounded-2xl"></div>
//               <div className="text-white font-black text-5xl drop-shadow-2xl z-10">{team2Score}</div>
//             </div>
//           </div>

//           {/* Main Answer Board - Oval Shape */}
//           <div className="relative mx-40">
//             {/* Outer oval with yellow dotted border */}
//             <div className="relative bg-blue-700 rounded-full border-8 border-yellow-400 shadow-2xl p-8" style={{ aspectRatio: '3/2' }}>
              
//               {/* Dotted pattern around the border */}
//               <div className="absolute inset-4 border-4 border-dotted border-yellow-300 rounded-full"></div>
              
//               {/* Inner content area */}
//               <div className="relative z-10 h-full flex flex-col justify-center">
                
//                 {/* Answer Grid */}
//                 <div className="grid grid-cols-2 gap-1 max-w-3xl mx-auto">
//                   {answers.slice(0, 8).map((answer, index) => (
//                     <div
//                       key={index}
//                       className={`relative cursor-pointer transition-all duration-300 ${
//                         answer.revealed ? 'transform scale-105' : 'hover:scale-102'
//                       }`}
//                       onClick={() => handleAnswerClick(index)}
//                     >
//                       <div className={`flex items-center justify-between h-12 px-4 rounded-lg border-2 ${
//                         answer.revealed 
//                           ? 'bg-blue-500 border-white text-white shadow-xl' 
//                           : 'bg-blue-800 border-blue-600 text-gray-300 hover:bg-blue-700'
//                       }`}>
//                         <div className="flex items-center flex-1">
//                           <span className="font-bold text-sm uppercase tracking-wide">
//                             {answer.revealed ? answer.text : `${index + 1}`}
//                           </span>
//                         </div>
//                         <div className="bg-blue-900 px-3 py-1 rounded border-l-2 border-blue-600">
//                           <span className="font-black text-sm">
//                             {answer.revealed ? answer.points : ''}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Family Feud Logo */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
//         <div className="relative">
//           {/* Logo background */}
//           <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-yellow-100 font-black text-4xl px-8 py-4 rounded-2xl border-4 border-yellow-400 shadow-2xl transform -rotate-1">
//             <div className="relative z-10">
//               <div className="text-center">
//                 <div className="text-5xl leading-tight">FAMILY</div>
//                 <div className="text-5xl leading-tight">FEUD</div>
//               </div>
//             </div>
//             {/* Inner glow */}
//             <div className="absolute inset-2 bg-gradient-to-r from-red-400/30 to-orange-400/30 rounded-xl"></div>
//           </div>
//         </div>
//       </div>

//       {/* Strikes Display */}
//       <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-20">
//         <div className="flex space-x-4">
//           {[1, 2, 3].map((strike) => (
//             <div
//               key={strike}
//               className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
//                 strike <= strikes
//                   ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-2xl'
//                   : 'bg-gray-700 border-gray-600 text-gray-500'
//               }`}
//             >
//               <span className="font-black text-2xl">✕</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Control Button */}
//       <button
//         onClick={onBackToWelcome}
//         className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 backdrop-blur-md border border-white/30 z-30"
//       >
//         ← Menu
//       </button>
//     </div>
//   );
// };

// export default GameBoard;
