import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Send,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { calculateQuizResults, formatTime } from '../utils/calculations';
import { sounds } from '../utils/sound';
import Badge from '../components/common/Badge';
import Swal from 'sweetalert2';

export const QuizAttempt = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { sound, toggleSound, settings } = useTheme();
  const {
    getTestById,
    getQuestionsForTest,
    addResult,
    getActiveQuizDraft,
    saveActiveQuizDraft,
    clearActiveQuizDraft,
  } = useQuiz();

  const test = getTestById(testId);
  const questions = useMemo(() => (test ? getQuestionsForTest(test.id) : []), [test, getQuestionsForTest]);

  const initialDuration = test ? test.duration * 60 : 600;

  // Initialize state directly from saved draft if available
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (!test) return 0;
    const draft = getActiveQuizDraft(test.id);
    return draft && draft.currentIndex !== undefined ? draft.currentIndex : 0;
  });

  const [answers, setAnswers] = useState(() => {
    if (!test) return {};
    const draft = getActiveQuizDraft(test.id);
    return draft && draft.answers ? draft.answers : {};
  });

  const [markedForReview, setMarkedForReview] = useState(() => {
    if (!test) return {};
    const draft = getActiveQuizDraft(test.id);
    return draft && draft.markedForReview ? draft.markedForReview : {};
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!test) return 600;
    const draft = getActiveQuizDraft(test.id);
    return draft && draft.timeLeft && draft.timeLeft > 0 ? draft.timeLeft : initialDuration;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittedRef = useRef(false);

  // Persist draft on answer or question index change
  useEffect(() => {
    if (test && !isSubmittedRef.current) {
      saveActiveQuizDraft(test.id, {
        answers,
        markedForReview,
        currentIndex,
        timeLeft,
      });
    }
  }, [answers, markedForReview, currentIndex, timeLeft, test, saveActiveQuizDraft]);

  // Submit test calculation and handler
  const submitQuiz = useCallback(
    async (isAutoSubmit = false) => {
      if (isSubmittedRef.current || isSubmitting) return;
      isSubmittedRef.current = true;
      setIsSubmitting(true);

      const timeSpent = initialDuration - timeLeft;

      const resultData = calculateQuizResults({
        test,
        questions,
        userAnswers: answers,
        timeTakenSeconds: timeSpent,
        userId: user?.id,
        userEmail: user?.email,
      });

      // Save to storage
      addResult(resultData);
      clearActiveQuizDraft(test.id);
      sounds.playSubmitSuccess();

      if (isAutoSubmit) {
        await Swal.fire({
          title: 'Time Expired!',
          text: 'The test timer reached 00:00. Your answers were automatically submitted.',
          icon: 'warning',
          confirmButtonColor: '#4F46E5',
          confirmButtonText: 'View My Results',
        });
      }

      navigate('/result', { state: { result: resultData }, replace: true });
    },
    [answers, initialDuration, navigate, questions, test, timeLeft, user, addResult, clearActiveQuizDraft, isSubmitting]
  );

  // Timer countdown loop
  useEffect(() => {
    if (isSubmitting || isSubmittedRef.current) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz(true);
          return 0;
        }

        // Sound warning on 2 minutes remaining
        if (prev === 120 && settings.showTimerWarning) {
          sounds.playTimerWarning();
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitting, settings.showTimerWarning, submitQuiz]);

  if (!test || questions.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold">Assessment Not Found</h2>
        <p className="text-xs text-slate-500">Could not find test questions for this session.</p>
        <button
          onClick={() => navigate('/tests')}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
        >
          Return to Test Catalog
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentQuestion.id];
  const isCurrentMarked = Boolean(markedForReview[currentQuestion.id]);

  // Counts
  const answeredCount = Object.keys(answers).length;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  // Handle Option Select
  const handleSelectOption = (optionIndex) => {
    sounds.playOptionSelect();
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));

    if (settings.autoAdvance && currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
      }, 250);
    }
  };

  // Clear Option
  const handleClearOption = () => {
    sounds.playClick();
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  // Toggle Mark for Review
  const handleToggleMark = () => {
    sounds.playClick();
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  // Navigation
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      sounds.playQuestionNav();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sounds.playQuestionNav();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Exit Confirmation
  const handleExit = async () => {
    sounds.playClick();
    const result = await Swal.fire({
      title: 'Exit Assessment?',
      text: 'Are you sure you want to exit? Your progress is saved, but the timer will continue when you return.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: 'Yes, Exit Test',
      cancelButtonText: 'Continue Test',
    });

    if (result.isConfirmed) {
      navigate('/tests');
    }
  };

  // Submit Confirmation Modal
  const handleSubmitConfirmation = async () => {
    sounds.playClick();
    const result = await Swal.fire({
      title: 'Submit Assessment?',
      html: `
        <div style="text-align: left; font-size: 13px; line-height: 1.6; margin-top: 10px;">
          <p><strong>Total Questions:</strong> ${questions.length}</p>
          <p style="color: #10B981;"><strong>Answered:</strong> ${answeredCount}</p>
          <p style="color: #F59E0B;"><strong>Marked for Review:</strong> ${markedCount}</p>
          <p style="color: #EF4444;"><strong>Unanswered:</strong> ${unansweredCount}</p>
          <hr style="margin: 10px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #64748b;">Once submitted, your responses will be scored immediately.</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4F46E5',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: 'Yes, Submit Test',
      cancelButtonText: 'Back to Review',
    });

    if (result.isConfirmed) {
      submitQuiz(false);
    }
  };

  // Timer warning state (< 2 minutes)
  const isTimeCritical = timeLeft < 120;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* Top Test Header Bar */}
      <header className="sticky top-0 z-30 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between shadow-xs">
        {/* Left: Test Title & Exit */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExit}
            title="Exit assessment"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-none truncate max-w-[200px] sm:max-w-md">
              {test.title}
            </h1>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {test.categoryName} · {questions.length} Questions
            </span>
          </div>
        </div>

        {/* Right: Sound & Countdown Timer */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              toggleSound();
              sounds.playClick();
            }}
            title={sound ? 'Mute audio' : 'Enable audio'}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Countdown Timer Pill */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border transition-colors ${
              isTimeCritical
                ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-900 animate-pulse'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={handleSubmitConfirmation}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
      </header>

      {/* Progress Bar under header */}
      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Assessment Body (Left Question View, Right Navigation Palette) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left: Active Question Area */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div>
            {/* Question Header Meta */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <Badge variant={currentQuestion.difficulty?.toLowerCase() || 'medium'} size="sm">
                  {currentQuestion.difficulty || 'Medium'}
                </Badge>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  +{currentQuestion.marks || 4} Marks
                </span>
              </div>

              {/* Mark for Review Button */}
              <button
                onClick={handleToggleMark}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isCurrentMarked
                    ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isCurrentMarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{isCurrentMarked ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* 4 MCQ Option Cards */}
            <div className="space-y-3.5">
              {currentQuestion.options.map((optionText, optIndex) => {
                const isSelected = selectedOption === optIndex;
                const optionLetter = String.fromCharCode(65 + optIndex);

                return (
                  <div
                    key={optIndex}
                    onClick={() => handleSelectOption(optIndex)}
                    className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-150 flex items-start gap-4 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 dark:border-indigo-500 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/30'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 group-hover:border-indigo-400'
                      }`}
                    >
                      {optionLetter}
                    </div>
                    <span
                      className={`text-sm sm:text-base leading-snug pt-0.5 font-medium ${
                        isSelected
                          ? 'text-indigo-950 dark:text-indigo-100 font-semibold'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {optionText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              {selectedOption !== undefined && (
                <button
                  onClick={handleClearOption}
                  className="text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Selection</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitConfirmation}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Review & Submit</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Question Navigation Palette */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Question Navigator
            </h3>

            {/* Summary counters */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                <span className="font-extrabold text-emerald-700 dark:text-emerald-400 block text-base leading-none">
                  {answeredCount}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-semibold">Answered</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                <span className="font-extrabold text-amber-700 dark:text-amber-400 block text-base leading-none">
                  {markedCount}
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-500 font-semibold">Review</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-extrabold text-slate-700 dark:text-slate-300 block text-base leading-none">
                  {unansweredCount}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">Pending</span>
              </div>
            </div>

            {/* Questions Grid Palette */}
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">Jump to Question:</p>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isMarked = Boolean(markedForReview[q.id]);
                  const isCurrent = idx === currentIndex;

                  let colorStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';

                  if (isMarked) {
                    colorStyle = 'bg-amber-500 text-white border-amber-600 font-bold';
                  } else if (isAnswered) {
                    colorStyle = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        sounds.playQuestionNav();
                        setCurrentIndex(idx);
                      }}
                      className={`h-10 rounded-xl border text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer ${colorStyle} ${
                        isCurrent
                          ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 scale-105'
                          : 'hover:scale-102'
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isMarked && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Legend */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-600"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-amber-500"></span>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-700"></span>
                <span>Not Attempted</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md border-2 border-indigo-500"></span>
                <span>Current Question</span>
              </div>
            </div>

            {/* Mobile Submit Button */}
            <button
              onClick={handleSubmitConfirmation}
              className="w-full sm:hidden py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Finish & Submit Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
