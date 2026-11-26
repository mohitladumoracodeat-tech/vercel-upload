import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import Badge from '../components/common/Badge';
import DynamicIcon from '../components/common/DynamicIcon';
import { sounds } from '../utils/sound';

export const TestInstructions = () => {
  const { testId } = useParams();
  const { getTestById } = useQuiz();
  const navigate = useNavigate();

  const [acknowledged, setAcknowledged] = useState(false);

  const test = getTestById(testId);

  if (!test) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Assessment Not Found</h2>
        <p className="text-sm text-slate-500">The requested test ID does not exist in the catalog.</p>
        <Link
          to="/tests"
          className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
        >
          Return to Test Catalog
        </Link>
      </div>
    );
  }

  const handleStartQuiz = () => {
    if (!acknowledged) return;
    sounds.playClick();
    navigate(`/quiz/${test.id}`);
  };

  const rules = [
    {
      title: 'Multiple Choice Format',
      desc: 'Each question contains 4 options with exactly one correct answer. Select your preferred choice by clicking on the option card.',
    },
    {
      title: 'Countdown Timer & Auto-Submit',
      desc: `You have ${test.duration} minutes to complete all ${test.totalQuestions} questions. When the timer hits 00:00, your test will automatically submit.`,
    },
    {
      title: 'Question Palette & Review Flags',
      desc: 'You can flag tricky questions as "Mark for Review" to revisit them later using the right-side question navigator palette.',
    },
    {
      title: 'Marking & Passing Benchmark',
      desc: `Total marks: ${test.totalMarks}. Passing threshold is ${test.passingScore}%. There is no negative marking penalty.`,
    },
    {
      title: 'Uninterrupted Session',
      desc: 'Do not close or reload your browser window during the test. Your progress is continuously saved to your browser session.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <Link
        to="/tests"
        onClick={() => sounds.playClick()}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Tests</span>
      </Link>

      {/* Test Overview Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md"
            style={{ backgroundColor: test.color }}
          >
            <DynamicIcon name={test.icon} className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant={test.difficulty.toLowerCase()}>{test.difficulty}</Badge>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {test.categoryName}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {test.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              {test.description}
            </p>
          </div>
        </div>

        {/* Quick specs */}
        <div className="grid grid-cols-3 md:flex md:flex-col gap-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs shrink-0 font-medium">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>{test.duration} Minutes</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>{test.totalQuestions} Questions</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{test.totalMarks} Total Marks</span>
          </div>
        </div>
      </div>

      {/* Syllabus Topics */}
      {test.syllabus && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Syllabus & Core Topics Covered
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {test.syllabus.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Guidelines and Rules */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          Test Rules & Assessment Instructions
        </h2>

        <div className="space-y-4">
          {rules.map((r, i) => (
            <div key={i} className="flex items-start gap-3 text-xs leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">{r.title}</p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Checkbox */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => {
                sounds.playClick();
                setAcknowledged(e.target.checked);
              }}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              I have read, understood, and agreed to follow all the test instructions and guidelines.
            </span>
          </label>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <Link
          to="/tests"
          onClick={() => sounds.playClick()}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:underline"
        >
          Cancel and return
        </Link>

        <button
          onClick={handleStartQuiz}
          disabled={!acknowledged}
          className={`px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
            acknowledged
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-[1.02]'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>I Am Ready to Begin</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TestInstructions;
