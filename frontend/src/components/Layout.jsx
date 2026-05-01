// Layout Component with Outlet for child routes
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = ({ user, onLogout, children }) => {
  return (
    <div className="min-h-screen bg-bg font-sans text-text transition-colors duration-300">
      <Navigation user={user} onLogout={onLogout} />
      <main>
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;
