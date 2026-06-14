import React, { useState, useEffect } from 'react';
import Login from './Login';
import Loading from './Loading';
import Dashboard from './Dashboard';

const ADMIN_EMAIL = 'admin@guzmaningenieria.com';

export default function AdminPage() {
  const [view, setView] = useState('login'); // login | loading | dashboard

  // Compensar el padding-top del body (para páginas sin navbar)
  useEffect(() => {
    document.body.style.paddingTop = '0';
    return () => { document.body.style.paddingTop = ''; };
  }, []);

  const handleLogin = () => {
    setView('loading');
    setTimeout(() => setView('dashboard'), 1300);
  };

  const handleSignOut = () => setView('login');

  if (view === 'login')     return <Login onLogin={handleLogin} />;
  if (view === 'loading')   return <Loading adminEmail={ADMIN_EMAIL} />;
  if (view === 'dashboard') return <Dashboard onSignOut={handleSignOut} />;
  return null;
}
