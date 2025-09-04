import React from 'react';

interface WelcomeScreenProps {
  onStartGame: () => void;
  onSettings: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame, onSettings }) => {
  return (
    <div className="w-screen h-screen fixed inset-0 overflow-hidden bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-radial from-blue-600/20 to-transparent"></div>
        {/* Dotted pattern overlay - responsive sizing */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: 'clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)'
          }}
        ></div>
      </div>

      {/* Balanced Geometric Border Elements with Lighting Effects */}
      <div className="absolute inset-0">
        {/* Left side balanced geometric elements with glow */}
        <div className="absolute left-0 top-0 h-full w-1/4 max-w-xs">
          <svg viewBox="0 0 300 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {/* Glowing polygons with balanced design */}
            <polygon 
              points="0,100 120,180 120,280 0,360 0,100" 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="6"
              className="opacity-90 drop-shadow-lg"
              filter="url(#leftGlow1)"
            />
            <polygon 
              points="40,250 160,330 160,430 40,510 40,250" 
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="5"
              className="opacity-70 drop-shadow-md"
              filter="url(#leftGlow2)"
            />
            <polygon 
              points="80,400 200,480 200,580 80,660 80,400" 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="4"
              className="opacity-50 drop-shadow-sm"
              filter="url(#leftGlow3)"
            />
            
            {/* SVG filters for glowing effects */}
            <defs>
              <filter id="leftGlow1" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="leftGlow2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="leftGlow3" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Right side balanced geometric elements with glow (mirrored) */}
        <div className="absolute right-0 top-0 h-full w-1/4 max-w-xs">
          <svg viewBox="0 0 300 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {/* Mirror-balanced polygons with glow effects */}
            <polygon 
              points="300,100 180,180 180,280 300,360 300,100" 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="6"
              className="opacity-90 drop-shadow-lg"
              filter="url(#rightGlow1)"
            />
            <polygon 
              points="260,250 140,330 140,430 260,510 260,250" 
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="5"
              className="opacity-70 drop-shadow-md"
              filter="url(#rightGlow2)"
            />
            <polygon 
              points="220,400 100,480 100,580 220,660 220,400" 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="4"
              className="opacity-50 drop-shadow-sm"
              filter="url(#rightGlow3)"
            />
            
            {/* SVG filters for glowing effects */}
            <defs>
              <filter id="rightGlow1" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="rightGlow2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="rightGlow3" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Top and Bottom Corner Accent Elements for Balance */}
        <div className="absolute top-0 left-1/4 right-1/4 h-16">
          <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <polygon 
              points="200,20 160,60 240,60 200,20" 
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="3"
              className="opacity-60 animate-pulse"
            />
            <polygon 
              points="120,40 80,80 160,80 120,40" 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="2"
              className="opacity-40"
            />
            <polygon 
              points="280,40 320,80 240,80 280,40" 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="2"
              className="opacity-40"
            />
          </svg>
        </div>

        <div className="absolute bottom-0 left-1/4 right-1/4 h-16">
          <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <polygon 
              points="200,80 240,40 160,40 200,80" 
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="3"
              className="opacity-60 animate-pulse"
            />
            <polygon 
              points="120,60 160,20 80,20 120,60" 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="2"
              className="opacity-40"
            />
            <polygon 
              points="280,60 240,20 320,20 280,60" 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="2"
              className="opacity-40"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        
        {/* Central Logo Oval */}
        <div className="relative mb-16">
          {/* Outer glow effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-yellow-400/30 rounded-full blur-xl"></div>
          
          {/* Main oval container */}
          <div className="relative bg-gradient-to-b from-blue-800 to-blue-900 border-4 border-yellow-400 rounded-full px-20 py-12 shadow-2xl">
            {/* Inner border */}
            <div className="absolute inset-2 border-2 border-orange-400 rounded-full"></div>
            
            {/* Dotted background pattern inside oval */}
            <div 
              className="absolute inset-4 rounded-full opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
                backgroundSize: '20px 20px'
              }}
            ></div>
            
            {/* FAMILY FEUD Text */}
            <div className="relative z-10 text-center">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 tracking-wider drop-shadow-2xl">
                FAMILY FEUD
              </h1>
              {/* Text stroke effect */}
              <h1 className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black text-transparent tracking-wider"
                  style={{
                    WebkitTextStroke: '2px #dc2626',
                    zIndex: -1
                  }}>
                FAMILY FEUD
              </h1>
            </div>
          </div>
        </div>

        {/* START Button with Enhanced Game Show UI and Figma-style Selection Effect */}
        <div className="relative group mb-8">
          {/* Outer spotlight ring */}
          <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
          
          <button
            onClick={onStartGame}
            className="relative group focus:outline-none"
          >
            {/* Figma-style selection circle - appears on click/focus */}
            <div className="absolute -inset-6 rounded-full border-2 border-blue-400 opacity-0 group-focus:opacity-100 group-active:opacity-100 transition-all duration-200 scale-95 group-focus:scale-100 group-active:scale-100">
              {/* Selection circle dots (like Figma) */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
              
              {/* Corner resize handles */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-sm rotate-45"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-sm rotate-45"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-sm rotate-45"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-sm rotate-45"></div>
            </div>

            {/* Button glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur opacity-75 group-hover:opacity-100 group-active:opacity-100 transition duration-300"></div>
            
            {/* Ripple effect on click */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping transition-opacity duration-150"></div>
            
            {/* Main button with enhanced interaction states */}
            <div className="relative bg-gradient-to-b from-blue-700 to-blue-900 border-4 border-yellow-400 text-white font-black text-2xl md:text-3xl px-16 py-4 rounded-full shadow-2xl transform group-hover:scale-105 group-active:scale-95 transition-all duration-200 animate-bounce group-focus:animate-none group-active:animate-none" style={{ animationDuration: '2s' }}>
              <span className="text-yellow-300 drop-shadow-lg flex items-center justify-center space-x-2">
                <span className="transform group-active:rotate-12 transition-transform duration-150">⭐</span>
                <span className="transform group-active:scale-110 transition-transform duration-150">START</span>
                <span className="transform group-active:-rotate-12 transition-transform duration-150">⭐</span>
              </span>
              
              {/* Inner highlight effect */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Active state overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-600 to-blue-800 opacity-0 group-active:opacity-30 transition-opacity duration-75"></div>
            </div>
          </button>
        </div>

        {/* Enhanced Colorful Stage Lighting Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main center spotlight with rainbow colors */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-yellow-300/20 via-orange-300/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          
          {/* Multiple colored spotlights from above */}
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-gradient-radial from-pink-400/25 via-pink-300/15 to-transparent rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-0 right-1/4 w-40 h-40 bg-gradient-radial from-cyan-400/25 via-cyan-300/15 to-transparent rounded-full blur-2xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          
          {/* Side stage lights with vivid colors */}
          <div className="absolute top-1/3 left-8 w-32 h-32 bg-gradient-radial from-purple-500/30 via-purple-400/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDuration: '2s' }}></div>
          <div className="absolute top-1/3 right-8 w-32 h-32 bg-gradient-radial from-emerald-500/30 via-emerald-400/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.8s' }}></div>
          
          {/* Moving colorful stage lights */}
          <div className="absolute top-20 right-1/3 w-28 h-28 bg-gradient-radial from-red-400/25 via-red-300/15 to-transparent rounded-full blur-2xl animate-ping" style={{ animationDuration: '2.2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-radial from-indigo-400/25 via-indigo-300/15 to-transparent rounded-full blur-2xl animate-ping" style={{ animationDuration: '2.8s', animationDelay: '0.5s' }}></div>
          
          {/* Roaming colorful spotlights */}
          <div className="absolute top-1/3 left-16 w-44 h-44 bg-gradient-radial from-violet-400/20 via-violet-300/10 to-transparent rounded-full blur-3xl animate-bounce" style={{ animationDuration: '5s' }}></div>
          <div className="absolute top-1/2 right-16 w-40 h-40 bg-gradient-radial from-amber-400/20 via-amber-300/10 to-transparent rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-36 h-36 bg-gradient-radial from-teal-400/25 via-teal-300/15 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}></div>
          
          {/* Floor wash lighting with multiple colors */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-500/15 via-purple-500/10 to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-32 bg-gradient-to-t from-pink-500/10 to-transparent animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-32 bg-gradient-to-t from-green-500/10 to-transparent animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '2s' }}></div>
          
          {/* Additional atmospheric lighting beams */}
          <div className="absolute top-0 left-1/5 w-1 h-full bg-gradient-to-b from-yellow-300/30 via-yellow-400/15 to-transparent transform rotate-12 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-0 right-1/5 w-1 h-full bg-gradient-to-b from-pink-300/30 via-pink-400/15 to-transparent transform -rotate-12 animate-pulse" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-0 left-2/5 w-1 h-full bg-gradient-to-b from-cyan-300/30 via-cyan-400/15 to-transparent transform rotate-6 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Enhanced Colorful Stage Border Lights - All Sides */}
        
        {/* Top Border Lights */}
        <div className="absolute top-0 left-0 w-full h-3">
          <div className="flex w-full h-full">
            <div className="flex-1 bg-gradient-to-b from-red-500 to-red-400 animate-ping shadow-lg shadow-red-500/50" style={{ animationDelay: '0s', animationDuration: '1.5s' }}></div>
            <div className="flex-1 bg-gradient-to-b from-orange-500 to-orange-400 animate-ping shadow-lg shadow-orange-500/50" style={{ animationDelay: '0.15s', animationDuration: '1.5s' }}></div>
            <div className="flex-1 bg-gradient-to-b from-yellow-500 to-yellow-400 animate-ping shadow-lg shadow-yellow-500/50" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
            <div className="flex-1 bg-gradient-to-b from-green-500 to-green-400 animate-ping shadow-lg shadow-green-500/50" style={{ animationDelay: '0.45s', animationDuration: '1.5s' }}></div>
            <div className="flex-1 bg-gradient-to-b from-blue-500 to-blue-400 animate-ping shadow-lg shadow-blue-500/50" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}></div>
            <div className="flex-1 bg-gradient-to-b from-indigo-500 to-indigo-400 animate-ping shadow-lg shadow-indigo-500/50" style={{ animationDelay: '0.75s', animationDuration: '1.5s' }}></div>
            <div className="flex-1 bg-gradient-to-b from-purple-500 to-purple-400 animate-ping shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.9s', animationDuration: '1.5s' }}></div>
            <div className="flex-1 bg-gradient-to-b from-pink-500 to-pink-400 animate-ping shadow-lg shadow-pink-500/50" style={{ animationDelay: '1.05s', animationDuration: '1.5s' }}></div>
          </div>
        </div>

        {/* Bottom Border Lights */}
        <div className="absolute bottom-0 left-0 w-full h-3">
          <div className="flex w-full h-full">
            <div className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
            <div className="flex-1 bg-gradient-to-t from-teal-500 to-teal-400 animate-pulse shadow-lg shadow-teal-500/50" style={{ animationDelay: '0.2s', animationDuration: '2s' }}></div>
            <div className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50" style={{ animationDelay: '0.4s', animationDuration: '2s' }}></div>
            <div className="flex-1 bg-gradient-to-t from-lime-500 to-lime-400 animate-pulse shadow-lg shadow-lime-500/50" style={{ animationDelay: '0.6s', animationDuration: '2s' }}></div>
            <div className="flex-1 bg-gradient-to-t from-amber-500 to-amber-400 animate-pulse shadow-lg shadow-amber-500/50" style={{ animationDelay: '0.8s', animationDuration: '2s' }}></div>
            <div className="flex-1 bg-gradient-to-t from-rose-500 to-rose-400 animate-pulse shadow-lg shadow-rose-500/50" style={{ animationDelay: '1s', animationDuration: '2s' }}></div>
            <div className="flex-1 bg-gradient-to-t from-violet-500 to-violet-400 animate-pulse shadow-lg shadow-violet-500/50" style={{ animationDelay: '1.2s', animationDuration: '2s' }}></div>
            <div className="flex-1 bg-gradient-to-t from-fuchsia-500 to-fuchsia-400 animate-pulse shadow-lg shadow-fuchsia-500/50" style={{ animationDelay: '1.4s', animationDuration: '2s' }}></div>
          </div>
        </div>
      </div>

      {/* Additional Settings Button (hidden for now, can be revealed later) */}
      <button
        onClick={onSettings}
        className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors duration-200 opacity-0"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default WelcomeScreen;
