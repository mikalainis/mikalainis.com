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
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;
    onSearch(trimmed);
  };

  const handleQuickSearch = (suggestion) => {
    if (isLoading) return;
    setQuery(suggestion);
    onSearch(suggestion);
  };

  return (
    <div className="w-full">
      {/* Main search form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-3">
          {/* Search icon */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Principal Data Scientist hybrid in NYC, or Senior ML Engineer with GCP..."
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
            disabled={!query.trim() || isLoading}
            className="
              flex items-center gap-2 px-6 py-4
              bg-blue-600 hover:bg-blue-700
              disabled:bg-slate-300 dark:disabled:bg-slate-700
              text-white disabled:text-slate-500
              font-medium rounded-xl
              shadow-sm hover:shadow-md
              transition-all duration-200
              whitespace-nowrap
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Searching...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Search with AI
              </>
            )}
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
