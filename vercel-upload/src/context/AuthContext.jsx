import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  getCurrentAuthUser,
  setCurrentAuthUser,
  getStoredUsers,
  saveUser,
  updateUserInStorage,
} from '../utils/storage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getCurrentAuthUser());
  const [loading] = useState(false);

  const login = useCallback(async (email, password) => {
    const users = getStoredUsers();
    const cleanEmail = email.trim().toLowerCase();
    const matched = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!matched) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    const safeUser = { ...matched };
    delete safeUser.password;

    setUser(safeUser);
    setCurrentAuthUser(safeUser);
    return safeUser;
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    const users = getStoredUsers();
    const cleanEmail = email.trim().toLowerCase();
    const exists = users.some((u) => u.email.toLowerCase() === cleanEmail);

    if (exists) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password: password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`,
      title: 'Aspiring Developer',
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);

    const safeUser = { ...newUser };
    delete safeUser.password;

    setUser(safeUser);
    setCurrentAuthUser(safeUser);
    return safeUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentAuthUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    if (!user) return;
    const users = getStoredUsers();
    const original = users.find((u) => u.id === user.id);
    const updatedFull = { ...original, ...updates };

    updateUserInStorage(updatedFull);

    const safe = { ...updatedFull };
    delete safe.password;
    setUser(safe);
    return safe;
  }, [user]);

  const changePassword = useCallback((currentPassword, newPassword) => {
    if (!user) throw new Error('Not authenticated');
    const users = getStoredUsers();
    const original = users.find((u) => u.id === user.id);

    if (!original || original.password !== currentPassword) {
      throw new Error('Current password does not match.');
    }

    original.password = newPassword;
    updateUserInStorage(original);
    return true;
  }, [user]);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
