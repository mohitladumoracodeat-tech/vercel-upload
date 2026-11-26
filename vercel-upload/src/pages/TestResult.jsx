import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  LayoutDashboard,
  Check,
  X,
  Share2,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatTime } from '../utils/calculations';
import Badge from '../components/common/Badge';
import { sounds } from '../utils/sound';
import Swal from 'sweetalert2';

export const TestResult = () => {
  const location = useLocation();
  const result = location.state?.result;

  // Trigger celebration confetti if user passed!
  useEffect(() => {
    if (result?.isPassed) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback gracefully
      }
    }
  }, [result]);

  if (!result) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold">No Result to Display</h2>
        <p className="text-xs text-slate-500">
          Take a test or select a historical assessment to view detailed scores.
        </p>
        <Link
          to="/tests"
          className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
        >
          Browse Available Tests
        </Link>
      </div>
    );
  }

  const {
    testTitle,
    categoryName,
    difficulty,
    percentage,
    isPassed,
    grade,
    obtainedMarks,
    totalMarks,
    correctCount,
    wrongCount,
    unansweredCount,
    totalQuestions,
    timeTakenSeconds,
    detailedQuestions = [],
  } = result;

  const handleShare = () => {
    sounds.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `I scored ${percentage}% (${grade}) on the "${testTitle}" test on QuizPulse!`
      );
      Swal.fire({
        title: 'Copied to Clipboard!',
        text: 'Your achievement summary was copied to your clipboard.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-lg text-center relative overflow-hidden transition-colors ${
          isPassed
            ? 'bg-gradient-to-b from-emerald-500/10 via-white to-white dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 border-emerald-200 dark:border-emerald-800/60'
            : 'bg-gradient-to-b from-rose-500/10 via-white to-white dark:from-rose-950/30 dark:via-slate-900 dark:to-slate-900 border-rose-200 dark:border-rose-800/60'
        }`}
      >
        <div className="max-w-md mx-auto space-y-4">
          <div
            className={`inline-flex w-16 h-16 rounded-3xl items-center justify-center text-white shadow-md mx-auto ${
              isPassed ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-rose-500 shadow-rose-500/30'
            }`}
          >
            {isPassed ? <Trophy className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
          </div>

          <div>
            <Badge variant={isPassed ? 'success' : 'danger'} size="lg" className="mb-2">
              {isPassed ? 'Assessment Passed' : 'Needs Practice (Failed)'}
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {testTitle}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {categoryName} · {difficulty} Difficulty
            </p>
          </div>

          {/* Score Hero */}
          <div className="py-2">
            <span className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              {percentage}%
            </span>
            <span className="text-lg font-bold text-slate-400 ml-2">Grade: {grade}</span>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Scored {obtainedMarks} out of {totalMarks} Total Marks
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to={`/instructions/${result.testId}`}
              onClick={() => sounds.playClick()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </Link>

            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Score</span>
            </button>

            <Link
              to="/dashboard"
              onClick={() => sounds.playClick()}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
            {correctCount}
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Correct Answers
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-2">
            <XCircle className="w-4 h-4" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
            {wrongCount}
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Incorrect Answers
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-2">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
            {unansweredCount}
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Unanswered
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
            {formatTime(timeTakenSeconds)}
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Time Taken
          </span>
        </div>
      </div>

      {/* Detailed Question Review List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Question-by-Question Review
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Review your selected choices, correct answers, and comprehensive explanations.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {totalQuestions} Questions
          </span>
        </div>

        <div className="space-y-4">
          {detailedQuestions.map((q, idx) => {
            const isAnswered = q.isAnswered;
            const isCorrect = q.isCorrect;

            return (
              <div
                key={q.id || idx}
                className={`p-6 rounded-3xl border bg-white dark:bg-slate-900 transition-all ${
                  !isAnswered
                    ? 'border-slate-200 dark:border-slate-800'
                    : isCorrect
                    ? 'border-emerald-200 dark:border-emerald-900/60'
                    : 'border-rose-200 dark:border-rose-900/60'
                }`}
              >
                {/* Question Top Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-400">
                      #{idx + 1}
                    </span>
                    <Badge
                      variant={!isAnswered ? 'secondary' : isCorrect ? 'success' : 'danger'}
                      size="sm"
                    >
                      {!isAnswered ? 'Skipped' : isCorrect ? 'Correct (+4)' : 'Incorrect (0)'}
                    </Badge>
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    Difficulty: {q.difficulty}
                  </span>
                </div>

                {/* Question title */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-4 leading-snug">
                  {q.question}
                </h3>

                {/* Options List */}
                <div className="space-y-2 mb-4">
                  {q.options.map((option, optIdx) => {
                    const isUserChoice = Number(q.selectedAnswer) === optIdx;
                    const isRightAnswer = Number(q.correctAnswer) === optIdx;
                    const optionLetter = String.fromCharCode(65 + optIdx);

                    let cardClass =
                      'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300';

                    if (isRightAnswer) {
                      cardClass =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 font-semibold';
                    } else if (isUserChoice && !isRightAnswer) {
                      cardClass =
                        'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100 font-semibold';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${cardClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                              isRightAnswer
                                ? 'bg-emerald-600 text-white'
                                : isUserChoice
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {optionLetter}
                          </span>
                          <span>{option}</span>
                        </div>

                        <div className="shrink-0 flex items-center gap-2 font-bold text-xs">
                          {isRightAnswer && (
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Correct Answer
                            </span>
                          )}
                          {isUserChoice && !isRightAnswer && (
                            <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <X className="w-3.5 h-3.5" /> Your Choice
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {q.explanation && (
                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs">
                    <span className="font-bold text-indigo-900 dark:text-indigo-300 block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      Detailed Explanation:
                    </span>
                    <p className="text-indigo-950/80 dark:text-indigo-200 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestResult;
