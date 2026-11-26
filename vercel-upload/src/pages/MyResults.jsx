import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Search,
  Trash2,
  ExternalLink,
  Calendar,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { formatTime } from '../utils/calculations';
import Badge from '../components/common/Badge';
import { sounds } from '../utils/sound';
import Swal from 'sweetalert2';

export const MyResults = () => {
  const { results, removeResult, clearHistory } = useQuiz();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, passed, failed
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, highest, lowest

  const filteredResults = useMemo(() => {
    return results
      .filter((r) => {
        const matchSearch =
          !searchTerm ||
          r.testTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.categoryName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchStatus =
          statusFilter === 'all' ||
          (statusFilter === 'passed' && r.isPassed) ||
          (statusFilter === 'failed' && !r.isPassed);

        return matchSearch && matchStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.completedAt) - new Date(a.completedAt);
        if (sortBy === 'oldest') return new Date(a.completedAt) - new Date(b.completedAt);
        if (sortBy === 'highest') return (b.percentage || 0) - (a.percentage || 0);
        if (sortBy === 'lowest') return (a.percentage || 0) - (b.percentage || 0);
        return 0;
      });
  }, [results, searchTerm, statusFilter, sortBy]);

  const handleDelete = async (resultId, title) => {
    sounds.playClick();
    const confirm = await Swal.fire({
      title: 'Delete this record?',
      text: `Are you sure you want to delete the attempt record for "${title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    });

    if (confirm.isConfirmed) {
      removeResult(resultId);
      Swal.fire({
        title: 'Deleted!',
        text: 'The test attempt record was removed.',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  const handleClearAll = async () => {
    sounds.playClick();
    const confirm = await Swal.fire({
      title: 'Clear Entire Test History?',
      text: 'This action will delete all your past assessment records permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: 'Yes, Clear All',
      cancelButtonText: 'Cancel',
    });

    if (confirm.isConfirmed) {
      clearHistory();
      Swal.fire({
        title: 'Cleared!',
        text: 'All test history has been reset.',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  const handleReview = (res) => {
    sounds.playClick();
    navigate('/result', { state: { result: res } });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Assessment Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your past test performances, verify answer keys, and monitor your score evolution.
          </p>
        </div>

        {results.length > 0 && (
          <button
            onClick={handleClearAll}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold border border-rose-200 dark:border-rose-900/60 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search completed tests by name or domain..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              sounds.playClick();
              setStatusFilter(e.target.value);
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Outcomes</option>
            <option value="passed">Passed Tests Only</option>
            <option value="failed">Failed Tests Only</option>
          </select>

          {/* Sort order */}
          <select
            value={sortBy}
            onChange={(e) => {
              sounds.playClick();
              setSortBy(e.target.value);
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="newest">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Score</option>
            <option value="lowest">Lowest Score</option>
          </select>
        </div>
      </div>

      {/* Results List */}
      {filteredResults.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <Award className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No result records found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            Try adjusting your search criteria or take an assessment.
          </p>
          <button
            onClick={() => navigate('/tests')}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
          >
            Browse Tests
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((res) => (
            <div
              key={res.id}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={res.isPassed ? 'success' : 'danger'} size="sm">
                    {res.isPassed ? 'Passed' : 'Failed'}
                  </Badge>
                  <span className="text-xs font-bold text-slate-400">
                    {res.categoryName}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(res.completedAt).toLocaleDateString()} at{' '}
                    {new Date(res.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {res.testTitle}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1 font-medium">
                  <span>Score: <strong className="text-slate-800 dark:text-slate-200">{res.obtainedMarks}/{res.totalMarks}</strong></span>
                  <span>Correct: <strong className="text-emerald-600">{res.correctCount}</strong></span>
                  <span>Incorrect: <strong className="text-rose-500">{res.wrongCount}</strong></span>
                  <span>Time: <strong>{formatTime(res.timeTakenSeconds)}</strong></span>
                </div>
              </div>

              {/* Right Side: Score Pill & Actions */}
              <div className="flex items-center gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 justify-between md:justify-end">
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900 dark:text-white block leading-none">
                    {res.percentage}%
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Grade {res.grade || 'N/A'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReview(res)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Review</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(res.id, res.testTitle)}
                    title="Delete record"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyResults;
