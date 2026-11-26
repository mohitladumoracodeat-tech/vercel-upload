import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredSettings, saveStoredSettings } from '../utils/storage';
import { sounds } from '../utils/sound';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => getStoredSettings());

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    sounds.setEnabled(settings.sound);
  }, [settings]);

  const toggleTheme = () => {
    setSettings((prev) => {
      const nextTheme = prev.theme === 'dark' ? 'light' : 'dark';
      const updated = { ...prev, theme: nextTheme };
      saveStoredSettings(updated);
      return updated;
    });
  };

  const toggleSound = () => {
    setSettings((prev) => {
      const updated = { ...prev, sound: !prev.sound };
      saveStoredSettings(updated);
      sounds.setEnabled(updated.sound);
      return updated;
    });
  };

  const updateSettings = (partial) => {
    setSettings((prev) => {
      const updated = { ...prev, ...partial };
      saveStoredSettings(updated);
      return updated;
    });
  };

  const value = {
    theme: settings.theme,
    isDark: settings.theme === 'dark',
    sound: settings.sound,
    settings,
    toggleTheme,
    toggleSound,
    updateSettings,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
