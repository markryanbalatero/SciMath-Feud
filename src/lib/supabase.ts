import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable. Please check your .env.local file.');
}

if (!supabaseKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types
export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  points: number;
  revealed: boolean;
}

export interface GameState {
  currentQuestionIndex: number;
  team1Score: number;
  team2Score: number;
  strikes: number;
  gameStarted: boolean;
}

export interface GameSet {
  id?: number;
  code: string;
  title: string;
  description?: string;
  questions: GameSetQuestion[];
  created_at?: string;
  created_by?: string;
}

export interface GameSetQuestion {
  id?: number;
  question: string;
  answers: GameSetAnswer[];
  order_index: number;
}

export interface GameSetAnswer {
  text: string;
  points: number;
  revealed?: boolean;
}

// Sample data for testing (replace with Supabase queries later)
export const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "Name something you might find in a kitchen",
    answers: [
      { text: "Refrigerator", points: 32, revealed: false },
      { text: "Stove", points: 28, revealed: false },
      { text: "Sink", points: 15, revealed: false },
      { text: "Microwave", points: 12, revealed: false },
      { text: "Table", points: 8, revealed: false },
      { text: "Dishes", points: 5, revealed: false }
    ]
  },
  {
    id: 2,
    question: "Name a popular vacation destination",
    answers: [
      { text: "Hawaii", points: 35, revealed: false },
      { text: "Florida", points: 25, revealed: false },
      { text: "California", points: 18, revealed: false },
      { text: "New York", points: 12, revealed: false },
      { text: "Las Vegas", points: 7, revealed: false },
      { text: "Paris", points: 3, revealed: false }
    ]
  },
  {
    id: 3,
    question: "Name something people do at the beach",
    answers: [
      { text: "Swim", points: 40, revealed: false },
      { text: "Sunbathe", points: 22, revealed: false },
      { text: "Build sandcastles", points: 15, revealed: false },
      { text: "Play volleyball", points: 10, revealed: false },
      { text: "Read a book", points: 8, revealed: false },
      { text: "Collect shells", points: 5, revealed: false }
    ]
  }
];

// Database functions (to implement with Supabase later)
export const getQuestions = async (): Promise<Question[]> => {
  // TODO: Implement Supabase query
  // const { data, error } = await supabase
  //   .from('questions')
  //   .select('*, answers(*)')
  //   .order('id');
  
  // For now, return sample data
  return sampleQuestions;
};

export const saveGameState = async (gameState: GameState): Promise<void> => {
  // TODO: Implement Supabase save
  // const { error } = await supabase
  //   .from('game_states')
  //   .upsert(gameState);
  
  // For now, just log
  console.log('Saving game state:', gameState);
};

export const getHighScores = async () => {
  // TODO: Implement Supabase query
  // const { data, error } = await supabase
  //   .from('high_scores')
  //   .select('*')
  //   .order('score', { ascending: false })
  //   .limit(10);
  
  return [];
};

// Game Set Management Functions
export const generateGameCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking chars
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const saveGameSet = async (gameSet: Omit<GameSet, 'id' | 'created_at'>): Promise<{ code: string; success: boolean; error?: string }> => {
  try {
    // TODO: Implement actual Supabase save when database is ready
    // const { data, error } = await supabase
    //   .from('game_sets')
    //   .insert({
    //     code: gameSet.code,
    //     title: gameSet.title,
    //     description: gameSet.description,
    //     questions: gameSet.questions
    //   })
    //   .select()
    //   .single();
    
    // if (error) throw error;
    
    // For now, simulate success and store in localStorage for testing
    const existingGameSets = JSON.parse(localStorage.getItem('familyFeudGameSets') || '[]');
    const newGameSet = {
      ...gameSet,
      id: Date.now(),
      created_at: new Date().toISOString()
    };
    existingGameSets.push(newGameSet);
    localStorage.setItem('familyFeudGameSets', JSON.stringify(existingGameSets));
    
    console.log('Game set saved successfully:', newGameSet);
    return { code: gameSet.code, success: true };
  } catch (error) {
    console.error('Error saving game set:', error);
    return { code: gameSet.code, success: false, error: 'Failed to save game set' };
  }
};

export const getGameSetByCode = async (code: string): Promise<{ gameSet: GameSet | null; success: boolean; error?: string }> => {
  try {
    // TODO: Implement actual Supabase query when database is ready
    // const { data, error } = await supabase
    //   .from('game_sets')
    //   .select('*')
    //   .eq('code', code.toUpperCase())
    //   .single();
    
    // if (error) throw error;
    
    // For now, get from localStorage for testing
    const existingGameSets = JSON.parse(localStorage.getItem('familyFeudGameSets') || '[]');
    const gameSet = existingGameSets.find((set: GameSet) => set.code === code.toUpperCase());
    
    if (!gameSet) {
      return { gameSet: null, success: false, error: 'Game set not found' };
    }
    
    return { gameSet, success: true };
  } catch (error) {
    console.error('Error fetching game set:', error);
    return { gameSet: null, success: false, error: 'Failed to fetch game set' };
  }
};

export const getAllGameSets = async (): Promise<{ gameSets: GameSet[]; success: boolean; error?: string }> => {
  try {
    // TODO: Implement actual Supabase query when database is ready
    // const { data, error } = await supabase
    //   .from('game_sets')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    
    // if (error) throw error;
    
    // For now, get from localStorage for testing
    const existingGameSets = JSON.parse(localStorage.getItem('familyFeudGameSets') || '[]');
    
    return { gameSets: existingGameSets, success: true };
  } catch (error) {
    console.error('Error fetching game sets:', error);
    return { gameSets: [], success: false, error: 'Failed to fetch game sets' };
  }
};
