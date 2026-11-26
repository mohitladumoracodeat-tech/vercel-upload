// LocalStorage persistence utility for Quiz Application

const STORAGE_PREFIX = 'quizify_';

export const STORAGE_KEYS = {
  USERS: `${STORAGE_PREFIX}users`,
  CURRENT_USER: `${STORAGE_PREFIX}auth_user`,
  RESULTS: `${STORAGE_PREFIX}results`,
  SETTINGS: `${STORAGE_PREFIX}settings`,
  ACTIVE_QUIZ: `${STORAGE_PREFIX}active_quiz_`,
};

// Default seed user
const DEFAULT_DEMO_USER = {
  id: 'usr-demo-1',
  name: 'Alex Johnson',
  email: 'demo@example.com',
  password: 'password123',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  title: 'Full Stack Developer',
  createdAt: new Date('2026-01-15T00:00:00.000Z').toISOString(),
};

// Seed sample historical results for instant rich demo analytics
const DEFAULT_SAMPLE_RESULTS = [
  {
    id: 'res-sample-1',
    testId: 'test-react-core',
    testTitle: 'React 19 & Core Concepts',
    category: 'frontend',
    categoryName: 'Frontend & React',
    userId: 'usr-demo-1',
    userEmail: 'demo@example.com',
    totalQuestions: 5,
    attemptedCount: 5,
    unansweredCount: 0,
    correctCount: 4,
    wrongCount: 1,
    totalMarks: 20,
    obtainedMarks: 16,
    percentage: 80,
    isPassed: true,
    timeTakenSeconds: 320,
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    answers: { 'q-react-1': 1, 'q-react-2': 1, 'q-react-3': 1, 'q-react-4': 1, 'q-react-5': 0 },
  },
  {
    id: 'res-sample-2',
    testId: 'test-js-modern',
    testTitle: 'Modern JavaScript (ES6+)',
    category: 'javascript',
    categoryName: 'JavaScript Mastery',
    userId: 'usr-demo-1',
    userEmail: 'demo@example.com',
    totalQuestions: 5,
    attemptedCount: 5,
    unansweredCount: 0,
    correctCount: 5,
    wrongCount: 0,
    totalMarks: 20,
    obtainedMarks: 20,
    percentage: 100,
    isPassed: true,
    timeTakenSeconds: 285,
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    answers: { 'q-js-1': 2, 'q-js-2': 1, 'q-js-3': 1, 'q-js-4': 0, 'q-js-5': 1 },
  },
  {
    id: 'res-sample-3',
    testId: 'test-dsa-essentials',
    testTitle: 'Data Structures & Algorithms',
    category: 'dsa',
    categoryName: 'Data Structures & CS',
    userId: 'usr-demo-1',
    userEmail: 'demo@example.com',
    totalQuestions: 5,
    attemptedCount: 4,
    unansweredCount: 1,
    correctCount: 3,
    wrongCount: 1,
    totalMarks: 20,
    obtainedMarks: 12,
    percentage: 60,
    isPassed: true,
    timeTakenSeconds: 460,
    completedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    answers: { 'q-dsa-1': 1, 'q-dsa-2': 1, 'q-dsa-3': 0, 'q-dsa-5': 0 },
  }
];

export const getStoredUsers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!data) {
      const initial = [DEFAULT_DEMO_USER];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users from localStorage', err);
    return [DEFAULT_DEMO_USER];
  }
};

export const saveUser = (newUser) => {
  const users = getStoredUsers();
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return newUser;
};

export const updateUserInStorage = (updatedUser) => {
  const users = getStoredUsers().map((u) => (u.id === updatedUser.id ? updatedUser : u));
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  setCurrentAuthUser(updatedUser);
  return updatedUser;
};

export const getCurrentAuthUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading current auth user', err);
    return null;
  }
};

export const setCurrentAuthUser = (user) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const getStoredResults = (userId = null) => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
    let results = [];
    if (!data) {
      results = DEFAULT_SAMPLE_RESULTS;
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
    } else {
      results = JSON.parse(data);
    }
    if (userId) {
      return results.filter((r) => r.userId === userId || !r.userId);
    }
    return results;
  } catch (err) {
    console.error('Error reading results from localStorage', err);
    return DEFAULT_SAMPLE_RESULTS;
  }
};

export const saveTestResult = (result) => {
  const results = getStoredResults();
  const updated = [result, ...results];
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(updated));
  return updated;
};

export const deleteTestResult = (resultId) => {
  const results = getStoredResults();
  const updated = results.filter((r) => r.id !== resultId);
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(updated));
  return updated;
};

export const clearAllTestResults = (userId = null) => {
  if (userId) {
    const results = getStoredResults();
    const updated = results.filter((r) => r.userId !== userId);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(updated));
    return updated;
  }
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify([]));
  return [];
};

// Settings
export const getStoredSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) {
      const defaultSettings = {
        theme: 'light',
        sound: true,
        autoAdvance: false,
        showTimerWarning: true,
      };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(data);
  } catch {
    return { theme: 'light', sound: true, autoAdvance: false, showTimerWarning: true };
  }
};

export const saveStoredSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

// Active Quiz draft persistence
export const getActiveQuizDraft = (testId) => {
  try {
    const data = localStorage.getItem(`${STORAGE_KEYS.ACTIVE_QUIZ}${testId}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveActiveQuizDraft = (testId, data) => {
  try {
    localStorage.setItem(`${STORAGE_KEYS.ACTIVE_QUIZ}${testId}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save quiz draft', e);
  }
};

export const clearActiveQuizDraft = (testId) => {
  localStorage.removeItem(`${STORAGE_KEYS.ACTIVE_QUIZ}${testId}`);
};

// Reset all application data
export const resetApplicationData = () => {
  localStorage.clear();
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([DEFAULT_DEMO_USER]));
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(DEFAULT_SAMPLE_RESULTS));
};
