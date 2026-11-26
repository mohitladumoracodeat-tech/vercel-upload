import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileQuestion,
  Award,
  User,
  Settings,
  Flame,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { sounds } from '../../utils/sound';

export const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/tests', label: 'Available Tests', icon: FileQuestion },
    { to: '/my-results', label: 'My Results', icon: Award },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 min-h-[calc(100vh-4rem)] p-4 justify-between">
      <div className="space-y-6">
        {/* User Mini Card */}
        {user && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/20 border border-indigo-100/80 dark:border-indigo-900/40 flex items-center gap-3">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                {user.name}
              </p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium truncate">
                {user.title || 'Candidate'}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => sounds.playClick()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Pro Badge Card */}
      <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl"></div>
        <div className="flex items-center gap-2 mb-2 text-indigo-400">
          <Flame className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Skill Assessment</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Level up your interview readiness with verified timed tests and instant scoring.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
