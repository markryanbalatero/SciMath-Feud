import React, { useState } from 'react';
import { saveGameSet, generateGameCode, type GameSetQuestion, type GameSetAnswer } from '../lib/supabase';

interface AdminPanelProps {
  onBackToWelcome: () => void;
}

// Local interface for admin panel state (before saving to database)
interface AdminQuestion {
  question: string;
  answers: GameSetAnswer[];
  order_index: number;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToWelcome }) => {
  const [gameTitle, setGameTitle] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [questions, setQuestions] = useState<AdminQuestion[]>([
    {
      question: '',
      answers: [
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 }
      ],
      order_index: 0
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedGameCode, setSavedGameCode] = useState<string | null>(null);

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      answers: [
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 },
        { text: '', points: 0 }
      ],
      order_index: questions.length + 1
    }]);
  };

  const removeQuestion = (questionIndex: number) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, index) => index !== questionIndex);
      // Update order_index for remaining questions
      newQuestions.forEach((q, index) => {
        q.order_index = index;
      });
      setQuestions(newQuestions);
    }
  };

  const handleQuestionChange = (questionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, field: 'text' | 'points', value: string | number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = {
      ...newQuestions[questionIndex].answers[answerIndex],
      [field]: value
    };
    setQuestions(newQuestions);
  };

  const handleSaveGameSet = async () => {
    // Validate input
    if (gameTitle.trim() === '') {
      alert('Please enter a game title.');
      return;
    }

    // Validate questions
    const validQuestions = questions.filter(q => {
      const validAnswers = q.answers.filter(answer => answer.text.trim() !== '');
      return q.question.trim() !== '' && validAnswers.length > 0;
    });

    if (validQuestions.length === 0) {
      alert('Please add at least one complete question with answers.');
      return;
    }

    setIsLoading(true);
    
    try {
      const gameCode = generateGameCode();
      
      // Clean up questions - only include questions with valid answers
      const cleanedQuestions: GameSetQuestion[] = validQuestions.map((q, index) => ({
        question: q.question,
        order_index: index + 1,
        answers: q.answers.filter(answer => answer.text.trim() !== '')
      }));

      const gameSetData = {
        code: gameCode,
        title: gameTitle,
        description: gameDescription || undefined,
        questions: cleanedQuestions
      };

      const result = await saveGameSet(gameSetData);
      
      if (result.success) {
        setSavedGameCode(gameCode);
        alert(`Game set saved successfully!\n\nGame Code: ${gameCode}\n\nShare this code with players to access your game.`);
      } else {
        alert(`Failed to save game set: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving game set:', error);
      alert('An error occurred while saving the game set.');
    } finally {
      setIsLoading(false);
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

      {/* Admin Panel Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 max-h-screen overflow-y-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-2xl mb-2">
            HOST CONTROL PANEL
          </h1>
          <p className="text-lg text-blue-200">Create and save your Family Feud game set</p>
          {savedGameCode && (
            <div className="mt-4 p-4 bg-green-600/80 rounded-lg border border-green-400">
              <p className="text-white font-bold">✅ Game Set Saved!</p>
              <p className="text-green-100">Game Code: <span className="font-mono text-xl">{savedGameCode}</span></p>
            </div>
          )}
        </div>

        {/* Admin Form */}
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-xl border-2 border-yellow-400/40 p-6 shadow-2xl">
          
          {/* Game Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg">Game Title *</label>
              <input
                type="text"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                className="w-full px-4 py-3 bg-blue-900/80 border-2 border-blue-600 rounded-lg text-white text-lg font-semibold focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="Enter game title (e.g., 'Office Party Quiz')"
              />
            </div>
            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg">Description (Optional)</label>
              <input
                type="text"
                value={gameDescription}
                onChange={(e) => setGameDescription(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border-2 border-gray-600 rounded-lg text-white text-lg font-semibold focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="Brief description of your game"
              />
            </div>
          </div>

          {/* Questions Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-yellow-300 font-bold text-lg">Questions ({questions.length})</label>
              <button
                onClick={addQuestion}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg transition-colors"
              >
                + Add Question
              </button>
            </div>

            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-8 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-bold text-lg">Question {questionIndex + 1}</h3>
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(questionIndex)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Question Text */}
                <div className="mb-4">
                  <label className="block text-yellow-300 font-bold mb-2">Question Text *</label>
                  <textarea
                    value={question.question}
                    onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/80 border-2 border-gray-600 rounded-lg text-white text-lg font-semibold focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                    placeholder="Enter your survey question (e.g., 'Name something you might find in a kitchen')"
                  />
                </div>

                {/* Answers */}
                <div>
                  <label className="block text-yellow-300 font-bold mb-4">Answers (Top 8)</label>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {question.answers.map((answer, answerIndex) => (
                      <div key={answerIndex} className="flex gap-3 items-center">
                        <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black font-black rounded-full flex items-center justify-center text-sm">
                          {answerIndex + 1}
                        </div>
                        <input
                          type="text"
                          value={answer.text}
                          onChange={(e) => handleAnswerChange(questionIndex, answerIndex, 'text', e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-800/80 border border-gray-500 rounded-lg text-white font-medium focus:border-yellow-400 focus:outline-none transition-colors"
                          placeholder={`Answer ${answerIndex + 1}`}
                        />
                        <input
                          type="number"
                          value={answer.points || ''}
                          onChange={(e) => handleAnswerChange(questionIndex, answerIndex, 'points', parseInt(e.target.value) || 0)}
                          className="w-20 px-3 py-2 bg-orange-800/80 border border-orange-600 rounded-lg text-white font-bold text-center focus:border-yellow-400 focus:outline-none transition-colors"
                          placeholder="Pts"
                          min="0"
                          max="100"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBackToWelcome}
              className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-gray-500 hover:border-gray-400"
            >
              ← Back to Menu
            </button>
            <button
              onClick={handleSaveGameSet}
              disabled={isLoading}
              className={`px-12 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-black text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-green-500 hover:border-green-400 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? '💾 Saving...' : '💾 SAVE GAME SET'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
