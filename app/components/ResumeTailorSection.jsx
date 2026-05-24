'use client';

import { useState, useEffect } from 'react';
import { tailorResume } from '@/lib/claudeApi';
import ResumeTailorPanel from '@/app/components/job-search/ResumeTailorPanel';

export default function ResumeTailorSection() {
  const [sourceJob, setSourceJob] = useState(null);       // job object from search
  const [description, setDescription] = useState('');     // manual paste
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // On mount, check for a job passed from the search results page
  useEffect(() => {
    const stored = localStorage.getItem('tailor_job');
    if (stored) {
      try {
        const job = JSON.parse(stored);
        localStorage.removeItem('tailor_job');
        setSourceJob(job);
        run(job);
      } catch {
        localStorage.removeItem('tailor_job');
      }
    }
  }, []);

  const run = async (input) => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await tailorResume(input);
      setSuggestions(result);
    } catch (err) {
      setError(err.message || 'Failed to generate suggestions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualTailor = () => {
    if (!description.trim()) return;
    setSourceJob(null);
    run(description.trim());
  };

  const handleClear = () => {
    setSuggestions(null);
    setSourceJob(null);
    setDescription('');
    setError(null);
  };

  const hasResult = isLoading || suggestions || error;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tailor Resume with AI</span>
          </div>
          {hasResult && (
            <button
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <div className="p-5">
          {/* Source job badge — shown when navigated from search */}
          {sourceJob && (
            <div className="flex items-center gap-2 mb-4 text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg px-3 py-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Tailoring for: <span className="font-semibold">{sourceJob.title}</span> @ {sourceJob.company}
            </div>
          )}

          {/* Manual input — shown when no job was passed, or after clearing */}
          {!sourceJob && !hasResult && (
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                Paste a job description to tailor your resume
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Paste the full job description here..."
                rows={6}
                className="
                  w-full px-4 py-3 text-sm
                  bg-slate-50 dark:bg-slate-900
                  border border-slate-200 dark:border-slate-600
                  text-slate-900 dark:text-slate-100
                  placeholder-slate-400
                  rounded-xl resize-none
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                "
              />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleManualTailor}
                  disabled={!description.trim()}
                  className="
                    flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg
                    bg-purple-600 hover:bg-purple-700
                    disabled:bg-slate-200 dark:disabled:bg-slate-700
                    disabled:text-slate-400 dark:disabled:text-slate-500
                    text-white transition-all duration-150
                  "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Tailor Resume
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {hasResult && (
            <ResumeTailorPanel
              suggestions={suggestions}
              isLoading={isLoading}
              error={error}
            />
          )}

          {/* Paste another button after showing results */}
          {!isLoading && (suggestions || error) && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={handleClear}
                className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline"
              >
                ← Tailor for a different job
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
