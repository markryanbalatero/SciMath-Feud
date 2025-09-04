# Family Feud Game

A modern web-based Family Feud game built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Interactive Welcome Screen** with animated title and menu options
- **Game Board** with answer reveals, scoring system, and strike tracking
- **Responsive Design** optimized for desktop and mobile devices
- **Real-time Scoring** for two teams
- **Modern UI** with Family Feud-style colors and animations
- **Supabase Integration** ready for backend data management

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` to play the game!

2. **Build for Production**
   ```bash
   npm run build
   ```

## Game Components

### Welcome Screen
- Animated title with "FAMILY FEUD" 
- Game start button
- Settings and high scores (coming soon)

### Game Board
- Question display area
- 6 answer slots with point values
- Team scoring system
- Strike counter (X marks)
- Answer reveal animations

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Backend**: Supabase (PostgreSQL)

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Survey Says...** Have fun! 🎮🏆

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
