import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Heart, Mail, Globe, Share2, Code2 } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

const CURRENT_YEAR = 2026;

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                QuizPulse
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Modern frontend quiz and technical assessment engine. Real-time timer, comprehensive evaluations, and insightful analytics.
            </p>
            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
              <a href="#" className="p-2 rounded-lg hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Developer Source">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Global Network">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Share Platform">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Contact Us">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  All Practice Tests
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link to="/my-results" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Attempt History
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Featured Domains
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/tests?category=${cat.id}`}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards Card */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Assessment Standards
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500 dark:text-slate-400">Total Questions</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">30+ Verified MCQs</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500 dark:text-slate-400">Pass Percentage</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">50% - 60%</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500 dark:text-slate-400">Persistence</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">HTML5 LocalStorage</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {CURRENT_YEAR} QuizPulse. Built with React & Vite. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
