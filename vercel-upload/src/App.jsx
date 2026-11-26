import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { QuizProvider } from './context/QuizContext';

import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Lazy loaded page views
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AllTests = lazy(() => import('./pages/AllTests'));
const TestInstructions = lazy(() => import('./pages/TestInstructions'));
const QuizAttempt = lazy(() => import('./pages/QuizAttempt'));
const TestResult = lazy(() => import('./pages/TestResult'));
const MyResults = lazy(() => import('./pages/MyResults'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
    <div className="w-9 h-9 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Loading assessment module...</p>
  </div>
);

export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QuizProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Main Application Routes inside Layout */}
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/tests" element={<AllTests />} />
                  <Route path="/instructions/:testId" element={<TestInstructions />} />
                  <Route path="/result" element={<TestResult />} />

                  {/* Protected Candidate Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-results"
                    element={
                      <ProtectedRoute>
                        <MyResults />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Catch-All */}
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Immersive Fullscreen Quiz Attempt Route */}
                <Route
                  path="/quiz/:testId"
                  element={
                    <ProtectedRoute>
                      <QuizAttempt />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
