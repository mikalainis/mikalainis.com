'use client';

/**
 * SearchBar.jsx
 * 
 * The top search input for the Job Search section.
 * Accepts natural-language queries like "find me senior data scientist roles"
 * and triggers the search via onSearch callback.
 */

import { useState } from 'react';

// Suggested quick-searches shown as chips below the input
const QUICK_SEARCHES = [
  'Principal Data Scientist roles hybrid or remote in NJ/NYC',
  'Senior AI Engineer roles using Python, GCP, and LLMs',
  'Data Science or ML Manager at a bank or financial firm',
  'Senior Data Engineer with GCP and BigQuery experience',
];

export default function SearchBar({ onSearch, isLoading }) {
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedWhat = what.trim();
    if (!trimmedWhat || isLoading) return;
    onSearch(trimmedWhat, where.trim());
  };

  const handleQuickSearch = (suggestion) => {
    if (isLoading) return;
    setWhat(suggestion);
    onSearch(suggestion, where.trim());
  };

  return (
    <div className="w-full">
      {/* Main search form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* "What" input */}
          <div className="relative flex-[2] w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={what}
              onChange={(e) => setWhat(e.target.value)}
              placeholder="Job title, keywords, or company..."
              disabled={isLoading}
              className="
                w-full pl-12 pr-4 py-4 
                bg-white dark:bg-slate-800 
                border border-slate-200 dark:border-slate-700 
                rounded-xl shadow-sm
                text-slate-900 dark:text-slate-100
                placeholder-slate-400 dark:placeholder-slate-500
                text-base
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200
              "
            />
          </div>

          {/* "Where" input */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
              placeholder="City, state, or 'Remote'"
              disabled={isLoading}
              className="
                w-full pl-12 pr-4 py-4 
                bg-white dark:bg-slate-800 
                border border-slate-200 dark:border-slate-700 
                rounded-xl shadow-sm
                text-slate-900 dark:text-slate-100
                placeholder-slate-400 dark:placeholder-slate-500
                text-base
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200
              "
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!what.trim() || isLoading}
            className="
              flex items-center justify-center gap-2 px-8 py-4 w-full md:w-auto
              bg-blue-600 hover:bg-blue-700
              disabled:bg-slate-300 dark:disabled:bg-slate-700
              text-white disabled:text-slate-500
              font-semibold rounded-xl
              shadow-sm hover:shadow-md
              transition-all duration-200
              whitespace-nowrap
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
          >
            {isLoading ? 'Searching...' : 'Find Jobs'}
          </button>
        </div>
      </form>

      {/* Quick-search suggestion chips */}
      {!isLoading && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-slate-400 dark:text-slate-500 self-center">Try:</span>
          {QUICK_SEARCHES.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleQuickSearch(suggestion)}
              className="
                px-3 py-1.5 text-xs
                bg-slate-100 dark:bg-slate-800
                hover:bg-blue-50 dark:hover:bg-blue-900/30
                text-slate-600 dark:text-slate-400
                hover:text-blue-600 dark:hover:text-blue-400
                border border-slate-200 dark:border-slate-700
                hover:border-blue-200 dark:hover:border-blue-800
                rounded-full
                transition-all duration-150
                cursor-pointer
              "
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
