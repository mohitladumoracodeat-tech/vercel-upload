import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileQuestion,
  CheckCircle,
  Percent,
  Trophy,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/common/Badge';
import { sounds } from '../utils/sound';

export const Dashboard = () => {
  const { user } = useAuth();
  const { dashboardStats, tests } = useQuiz();

  const {
    totalAvailableTests,
    testsAttempted,
    averageScore,
    bestScore,
    passedCount,
    failedCount,
    totalTimeSpentMinutes,
    recentHistory,
    categoryBreakdown,
  } = dashboardStats;

  const attemptedTestIds = recentHistory.map((r) => r.testId);
  const recommendedTests = tests
    .filter((t) => !attemptedTestIds.includes(t.id))
    .slice(0, 3);
  const fallbackRecommended = recommendedTests.length > 0 ? recommendedTests : tests.slice(0, 3);

  const statCards = [
    {
      label: 'Available Tests',
      value: totalAvailableTests,
      subtext: 'Across 6 tech domains',
      icon: FileQuestion,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60',
      border: 'border-indigo-100 dark:border-indigo-900/50',
    },
    {
      label: 'Tests Attempted',
      value: testsAttempted,
      subtext: `${passedCount} Passed · ${failedCount} Retake`,
      icon: CheckCircle,
      color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/60',
      border: 'border-violet-100 dark:border-violet-900/50',
    },
    {
      label: 'Average Score',
      value: `${averageScore}%`,
      subtext: averageScore >= 70 ? 'Above Benchmark' : 'Room to Improve',
      icon: Percent,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60',
      border: 'border-emerald-100 dark:border-emerald-900/50',
    },
    {
      label: 'Best Performance',
      value: `${bestScore}%`,
      subtext: bestScore >= 90 ? 'Exceptional Mastery' : 'Good Progress',
      icon: Trophy,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60',
      border: 'border-amber-100 dark:border-amber-900/50',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Candidate Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Developer'}! 👋
          </h1>
          <p className="text-sm text-indigo-200 mt-2 leading-relaxed">
            Ready to test your knowledge today? Choose a recommended assessment or review your past attempts below.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              to="/tests"
              onClick={() => sounds.playClick()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
            >
              <span>Explore Tests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/my-results"
              onClick={() => sounds.playClick()}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5"
            >
              <span>View Full History</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border ${card.border} shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {card.label}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {card.value}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {card.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* 2-Column Section: Performance Overview & Recommended Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Performance Breakdown */}
        <div className="lg:col-span-1 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Performance by Domain
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Average score achieved across tested technical domains.
            </p>

            {Object.keys(categoryBreakdown).length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No domain assessments attempted yet. Complete a test to see metrics.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(categoryBreakdown).map(([catName, data]) => (
                  <div key={catName} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
                        {catName}
                      </span>
                      <span className="text-slate-900 dark:text-white font-bold">
                        {data.avgScore}% ({data.count} {data.count === 1 ? 'test' : 'tests'})
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          data.avgScore >= 80
                            ? 'bg-emerald-500'
                            : data.avgScore >= 60
                            ? 'bg-indigo-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, data.avgScore)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total practice time</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              ~{totalTimeSpentMinutes} minutes
            </span>
          </div>
        </div>

        {/* Recommended Tests */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Recommended For You
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Targeted tests to strengthen your skills.
              </p>
            </div>
            <Link
              to="/tests"
              onClick={() => sounds.playClick()}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {fallbackRecommended.slice(0, 2).map((test) => (
              <div
                key={test.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 bg-slate-50/50 dark:bg-slate-800/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={test.difficulty.toLowerCase()}>{test.difficulty}</Badge>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {test.duration}m
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                    {test.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {test.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {test.totalQuestions} Questions · {test.totalMarks} Marks
                  </span>
                  <Link
                    to={`/instructions/${test.id}`}
                    onClick={() => sounds.playClick()}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    Start <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Test History Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Recent Test History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Your latest attempted assessments and evaluations.
            </p>
          </div>
          <Link
            to="/my-results"
            onClick={() => sounds.playClick()}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            All Results ({recentHistory.length})
          </Link>
        </div>

        {recentHistory.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No tests attempted yet
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Take your first test now to start building your record!
            </p>
            <Link
              to="/tests"
              onClick={() => sounds.playClick()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
            >
              Browse Assessments
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-3">Test Title</th>
                  <th className="pb-3 px-3">Domain</th>
                  <th className="pb-3 px-3">Score</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3">Date</th>
                  <th className="pb-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {recentHistory.map((res) => (
                  <tr
                    key={res.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                      {res.testTitle}
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                      {res.categoryName}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {res.percentage}%
                      </span>
                      <span className="text-slate-400 text-[11px] ml-1">
                        ({res.obtainedMarks}/{res.totalMarks})
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={res.isPassed ? 'success' : 'danger'} size="sm">
                        {res.isPassed ? 'Passed' : 'Failed'}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                      {new Date(res.completedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to="/result"
                        state={{ result: res }}
                        onClick={() => sounds.playClick()}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Review</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
