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
export interface Team {
  id: string;
  name: string;
  color: string;
  created_at?: string;
}

export interface Question {
  id: string;
  game_set_id: string;
  question: string;
  order_index: number;
  answers: Answer[];
  created_at?: string;
}

export interface Answer {
  id: string;
  question_id: string;
  text: string;
  points: number;
  order_index: number;
  revealed?: boolean;
  created_at?: string;
}

export interface GameSet {
  id: string;
  code: string;
  title: string;
  description?: string;
  questions?: Question[];
  created_at?: string;
  created_by?: string;
  is_active?: boolean;
}

export interface Game {
  id: string;
  game_set_id: string;
  team1_id?: string;
  team2_id?: string;
  team1_score: number;
  team2_score: number;
  current_question_index: number;
  strikes: number;
  game_status: 'waiting' | 'playing' | 'paused' | 'finished';
  started_at?: string;
  finished_at?: string;
  created_at?: string;
  team1?: Team;
  team2?: Team;
  game_set?: GameSet;
}

export interface GameState {
  currentQuestionIndex: number;
  team1Score: number;
  team2Score: number;
  strikes: number;
  gameStarted: boolean;
}

// Legacy interfaces for backward compatibility
export interface GameSetQuestion {
  id?: string;
  question: string;
  answers: GameSetAnswer[];
  order_index: number;
}

export interface GameSetAnswer {
  text: string;
  points: number;
  revealed?: boolean;
}

// Database functions
export const getTeams = async (): Promise<Team[]> => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

export const getGameSetByCode = async (code: string): Promise<{ gameSet: GameSet | null; success: boolean; error?: string }> => {
  try {
    const { data: gameSetData, error: gameSetError } = await supabase
      .from('game_sets')
      .select(`
        *,
        questions (
          *,
          answers (*)
        )
      `)
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();
    
    if (gameSetError) {
      if (gameSetError.code === 'PGRST116') {
        return { gameSet: null, success: false, error: 'Game set not found' };
      }
      throw gameSetError;
    }

    // Transform the data to match our interface
    const gameSet: GameSet = {
      ...gameSetData,
      questions: gameSetData.questions?.map((q: any) => ({
        ...q,
        answers: q.answers?.sort((a: any, b: any) => a.order_index - b.order_index) || []
      })).sort((a: any, b: any) => a.order_index - b.order_index) || []
    };
    
    return { gameSet, success: true };
  } catch (error) {
    console.error('Error fetching game set:', error);
    return { gameSet: null, success: false, error: 'Failed to fetch game set' };
  }
};

export const createGame = async (gameSetId: string, team1Id?: string, team2Id?: string): Promise<{ game: Game | null; success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('games')
      .insert({
        game_set_id: gameSetId,
        team1_id: team1Id,
        team2_id: team2Id,
        game_status: 'waiting'
      })
      .select(`
        *,
        team1:team1_id(*),
        team2:team2_id(*),
        game_set:game_set_id(*)
      `)
      .single();
    
    if (error) throw error;
    return { game: data, success: true };
  } catch (error) {
    console.error('Error creating game:', error);
    return { game: null, success: false, error: 'Failed to create game' };
  }
};

export const updateGameScore = async (gameId: string, team1Score: number, team2Score: number, strikes: number, currentQuestionIndex: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('games')
      .update({
        team1_score: team1Score,
        team2_score: team2Score,
        strikes: strikes,
        current_question_index: currentQuestionIndex
      })
      .eq('id', gameId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating game score:', error);
    return false;
  }
};

export const revealAnswerInGame = async (gameId: string, answerId: string, revealedByTeam: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('game_answers')
      .insert({
        game_id: gameId,
        answer_id: answerId,
        revealed_by_team: revealedByTeam
      });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error revealing answer:', error);
    return false;
  }
};

export const getRevealedAnswers = async (gameId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('game_answers')
      .select('answer_id')
      .eq('game_id', gameId);
    
    if (error) throw error;
    return data?.map(item => item.answer_id) || [];
  } catch (error) {
    console.error('Error fetching revealed answers:', error);
    return [];
  }
};

// Legacy function for backward compatibility
export const getQuestions = async (): Promise<Question[]> => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        answers (*)
      `)
      .order('order_index');
    
    if (error) throw error;
    
    return data?.map((question: any) => ({
      ...question,
      answers: question.answers?.sort((a: any, b: any) => a.order_index - b.order_index) || []
    })) || [];
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

// Game Set Management Functions (for Admin Panel)
export const generateGameCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking chars
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const saveGameSet = async (gameSet: { code: string; title: string; description?: string; questions: GameSetQuestion[] }): Promise<{ code: string; success: boolean; error?: string }> => {
  try {
    // Save the game set
    const { data: gameSetData, error: gameSetError } = await supabase
      .from('game_sets')
      .insert({
        code: gameSet.code,
        title: gameSet.title,
        description: gameSet.description,
        is_active: true
      })
      .select()
      .single();
    
    if (gameSetError) throw gameSetError;

    // Save questions and answers
    for (let i = 0; i < gameSet.questions.length; i++) {
      const question = gameSet.questions[i];
      
      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .insert({
          game_set_id: gameSetData.id,
          question: question.question,
          order_index: i + 1
        })
        .select()
        .single();
      
      if (questionError) throw questionError;

      // Save answers
      const answersToInsert = question.answers.map((answer, answerIndex) => ({
        question_id: questionData.id,
        text: answer.text,
        points: answer.points,
        order_index: answerIndex + 1
      }));

      const { error: answersError } = await supabase
        .from('answers')
        .insert(answersToInsert);
      
      if (answersError) throw answersError;
    }
    
    return { code: gameSet.code, success: true };
  } catch (error) {
    console.error('Error saving game set:', error);
    return { code: gameSet.code, success: false, error: 'Failed to save game set' };
  }
};

export const getAllGameSets = async (): Promise<{ gameSets: GameSet[]; success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('game_sets')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return { gameSets: data || [], success: true };
  } catch (error) {
    console.error('Error fetching game sets:', error);
    return { gameSets: [], success: false, error: 'Failed to fetch game sets' };
  }
};
