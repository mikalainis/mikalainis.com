'use client';

import { useState, useEffect } from 'react';

export default function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('tools_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Get stored credentials or default to admin
    const storedPassword = localStorage.getItem('tools_password') || 'admin';

    if (password === storedPassword) {
      localStorage.setItem('tools_authenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 text-center mb-2">Private Access</h2>
          <p className="text-slate-400 text-center text-sm mb-8">
            Please enter your password to access the Career Tools. <br />
            <span className="text-sky-500 font-medium mt-2 block italic">Contact me if you need the password.</span>
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-sky-500/20 mt-2"
            >
              Unlock Tools
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <a href="/" className="text-slate-500 hover:text-slate-300 text-sm flex items-center justify-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

