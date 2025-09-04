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
