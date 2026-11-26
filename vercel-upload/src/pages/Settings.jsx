import React from 'react';
import {
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Sliders,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { resetApplicationData } from '../utils/storage';
import { sounds } from '../utils/sound';
import Swal from 'sweetalert2';

export const Settings = () => {
  const { isDark, toggleTheme, sound, toggleSound, settings, updateSettings } = useTheme();
  const { logout } = useAuth();

  const handleTestChime = () => {
    sounds.playOptionSelect();
    setTimeout(() => {
      sounds.playSubmitSuccess();
    }, 200);
  };

  const handleResetData = async () => {
    sounds.playClick();
    const result = await Swal.fire({
      title: 'Reset Application Data?',
      text: 'This will purge all custom user accounts, quiz drafts, and history from LocalStorage, restoring the initial demo state.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: 'Yes, Reset Everything',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      resetApplicationData();
      logout();
      await Swal.fire({
        title: 'Application Reset!',
        text: 'All data has been restored to factory demo state. Reloading...',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      window.location.href = '/';
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Application Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize UI appearance, audio feedback, and assessment behavior.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="space-y-6">
        {/* Appearance Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {isDark ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                Theme & Interface Appearance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Toggle between light and dark modes according to your preference.
              </p>
            </div>

            <button
              onClick={() => {
                toggleTheme();
                sounds.playClick();
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>
          </div>
        </div>

        {/* Audio Effects Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {sound ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                Audio Feedback & Chimes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Play subtle synthesizer cues when clicking options, navigating, and completing tests.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleTestChime}
                title="Preview sound effect"
                className="px-3 py-2 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors cursor-pointer"
              >
                Test Sound
              </button>

              <button
                onClick={() => {
                  toggleSound();
                  sounds.playClick();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  sound
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {sound ? 'Enabled' : 'Muted'}
              </button>
            </div>
          </div>
        </div>

        {/* Test Engine Preferences */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              Assessment Behavior Preferences
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Customize how questions behave during real-time test attempts.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Auto-advance setting */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Auto-Advance to Next Question
                </p>
                <p className="text-[11px] text-slate-500">
                  Automatically move to the next question when an option is selected.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.autoAdvance)}
                  onChange={(e) => {
                    sounds.playClick();
                    updateSettings({ autoAdvance: e.target.checked });
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Timer warning setting */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Timer Critical Warning Chime
                </p>
                <p className="text-[11px] text-slate-500">
                  Play an audible alert tone when less than 2 minutes remain in the assessment.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.showTimerWarning)}
                  onChange={(e) => {
                    sounds.playClick();
                    updateSettings({ showTimerWarning: e.target.checked });
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone: Data Reset */}
        <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Reset Application Data
              </h3>
              <p className="text-xs text-rose-600/80 dark:text-rose-400/70 mt-0.5">
                Clear all test results, customized profile data, and reseed initial demo state.
              </p>
            </div>

            <button
              onClick={handleResetData}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
