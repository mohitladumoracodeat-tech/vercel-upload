import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';

export const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Pages that display sidebar layout for authenticated candidates
  const sidebarRoutes = ['/dashboard', '/my-results', '/profile', '/settings'];
  const showSidebar = isAuthenticated && sidebarRoutes.some((route) => location.pathname.startsWith(route));

  // The quiz attempt page will have an immersive focused header with no distractions
  const isQuizAttempt = location.pathname.startsWith('/quiz/');

  if (isQuizAttempt) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />
      {showSidebar ? (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex py-6 gap-8">
          <Sidebar />
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      ) : (
        <main className="flex-1">
          <Outlet />
        </main>
      )}
      <Footer />
    </div>
  );
};

export default AppLayout;
