import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { TESTS } from '../data/tests';
import { CATEGORIES } from '../data/categories';
import { QUESTIONS } from '../data/questions';
import {
  getStoredResults,
  saveTestResult,
  deleteTestResult,
  clearAllTestResults,
  getActiveQuizDraft,
  saveActiveQuizDraft,
  clearActiveQuizDraft,
} from '../utils/storage';
import { calculateDashboardStats } from '../utils/calculations';
import { useAuth } from './AuthContext';

export const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const { user } = useAuth();
  const [tests] = useState(TESTS);
  const [categories] = useState(CATEGORIES);
  const [questions] = useState(QUESTIONS);

  const [results, setResults] = useState(() => getStoredResults(user?.id));

  const getTestById = useCallback((id) => {
    return tests.find((t) => t.id === id || t.slug === id);
  }, [tests]);

  const getQuestionsForTest = useCallback((testId) => {
    return questions.filter((q) => q.testId === testId);
  }, [questions]);

  const getCategoryById = useCallback((catId) => {
    return categories.find((c) => c.id === catId || c.slug === catId);
  }, [categories]);

  const addResult = useCallback((resultData) => {
    const updated = saveTestResult(resultData);
    if (user?.id) {
      setResults(updated.filter((r) => r.userId === user.id || !r.userId));
    } else {
      setResults(updated);
    }
  }, [user]);

  const removeResult = useCallback((resultId) => {
    const updated = deleteTestResult(resultId);
    if (user?.id) {
      setResults(updated.filter((r) => r.userId === user.id || !r.userId));
    } else {
      setResults(updated);
    }
  }, [user]);

  const clearHistory = useCallback(() => {
    const updated = clearAllTestResults(user?.id);
    setResults(updated);
  }, [user]);

  const dashboardStats = useMemo(() => {
    return calculateDashboardStats(results, tests);
  }, [results, tests]);

  const value = {
    tests,
    categories,
    questions,
    results,
    dashboardStats,
    getTestById,
    getQuestionsForTest,
    getCategoryById,
    addResult,
    removeResult,
    clearHistory,
    getActiveQuizDraft,
    saveActiveQuizDraft,
    clearActiveQuizDraft,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
