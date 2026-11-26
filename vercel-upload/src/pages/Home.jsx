import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Trophy,
  Users,
  Timer,
  BookOpen,
  Star,
  ChevronRight,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import DynamicIcon from '../components/common/DynamicIcon';
import Badge from '../components/common/Badge';
import { sounds } from '../utils/sound';

export const Home = () => {
  const { tests, categories } = useQuiz();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const featuredTests = tests.slice(0, 3);

  const stats = [
    { label: 'Verified Questions', value: '30+', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60' },
    { label: 'Active Candidates', value: '12,500+', icon: Users, color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/60' },
    { label: 'Timed Assessments', value: '100%', icon: Timer, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60' },
    { label: 'Success Benchmark', value: '85%', icon: Trophy, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Pick a Domain & Test',
      desc: 'Choose from frontend, JavaScript, web standards, CS algorithms, and aptitude assessments.',
    },
    {
      step: '02',
      title: 'Take the Timed Assessment',
      desc: 'Answer MCQs with countdown timer, flag questions for review, and navigate seamlessly.',
    },
    {
      step: '03',
      title: 'Get In-Depth Evaluation',
      desc: 'Review correct answers with detailed explanations, scoring breakdown, and performance analytics.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-pink-500/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Interactive Frontend & Coding Assessments</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Master Technical Skills with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              Precision Quiz & Test Benchmarks
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Take curated, timed multiple-choice tests designed to assess your real-world coding acumen. Track your progress, review detailed answers, and build interview confidence.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/tests"
              onClick={() => sounds.playClick()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore All Tests</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => sounds.playClick()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-base border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Go to Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/register"
                onClick={() => sounds.playClick()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-base border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Create Free Account</span>
              </Link>
            )}
          </div>

          {/* Social Proof Mini Pills */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Real-time countdown timer
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Instant score calculation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              LocalStorage persistence
            </span>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {s.value}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Available Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="primary" size="md" className="mb-2">
              Browse Topics
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Curated Assessment Categories
            </h2>
          </div>
          <Link
            to="/tests"
            onClick={() => sounds.playClick()}
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View all tests</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                navigate(`/tests?category=${cat.id}`);
              }}
              className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  <DynamicIcon name={cat.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">
                  {cat.testCount} Practice Tests
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tests Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="warning" size="md" className="mb-2">
              Popular Assessments
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Challenges
            </h2>
          </div>
          <Link
            to="/tests"
            onClick={() => sounds.playClick()}
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Explore full catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTests.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={t.difficulty.toLowerCase()}>{t.difficulty}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {t.rating}
                  </span>
                </div>

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 text-white"
                  style={{ backgroundColor: t.color }}
                >
                  <DynamicIcon name={t.icon} className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {t.description}
                </p>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 mb-5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Timer className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.duration} Mins</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.totalQuestions} Questions</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/instructions/${t.id}`}
                  onClick={() => sounds.playClick()}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Start Test</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">
              Streamlined Evaluation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              How the QuizPulse Assessment Works
            </h2>
            <p className="text-sm text-indigo-200 mt-2">
              A frictionless test-taking experience built from ground up to measure your real engineering skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowSteps.map((ws, i) => (
              <div key={i} className="relative space-y-3">
                <span className="text-3xl font-black text-indigo-400/40">{ws.step}</span>
                <h3 className="text-lg font-bold">{ws.title}</h3>
                <p className="text-xs text-indigo-200/80 leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
