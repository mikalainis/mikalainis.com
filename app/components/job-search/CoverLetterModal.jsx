'use client';

/**
 * CoverLetterModal.jsx
 * 
 * Full-screen modal for viewing, editing, and copying
 * an AI-generated cover letter for a specific job.
 */

import { useState, useEffect, useRef } from 'react';
import { generateCoverLetter } from '@/lib/claudeApi';

export default function CoverLetterModal({ job, onClose }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  // Generate cover letter on mount
  useEffect(() => {
    if (!job) return;

    const generate = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const letter = await generateCoverLetter(job);
        setCoverLetter(letter);
      } catch (err) {
        setError(err.message || 'Failed to generate cover letter. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    generate();
  }, [job]);

  // Focus textarea when editing starts
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  // Trap focus inside modal and close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = coverLetter;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    setError(null);
    setIsEditing(false);
    try {
      const letter = await generateCoverLetter(job);
      setCoverLetter(letter);
    } catch (err) {
      setError(err.message || 'Failed to regenerate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal panel */}
      <div className="
        relative w-full sm:max-w-2xl
        bg-white dark:bg-slate-900
        rounded-t-2xl sm:rounded-2xl
        shadow-2xl
        flex flex-col
        max-h-[90vh] sm:max-h-[85vh]
        overflow-hidden
      ">
        {/* Header */}
        <div className="flex items-start gap-3 p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Cover Letter
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
              {job.title} @ {job.company}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="
              flex-shrink-0 p-2 rounded-lg
              text-slate-400 hover:text-slate-600 dark:hover:text-slate-300
              hover:bg-slate-100 dark:hover:bg-slate-800
              transition-colors duration-150
            "
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="relative">
                <div className="w-10 h-10 border-4 border-purple-200 dark:border-purple-900 rounded-full animate-spin" />
                <div className="absolute inset-0 w-10 h-10 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Crafting your cover letter...
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Tailoring to {job.company}'s specific role
                </p>
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center max-w-sm">{error}</p>
              <button
                onClick={handleRegenerate}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && coverLetter && (
            isEditing ? (
              <textarea
                ref={textareaRef}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="
                  w-full min-h-[400px] p-4
                  bg-slate-50 dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                  rounded-xl
                  text-sm text-slate-800 dark:text-slate-200
                  leading-relaxed
                  resize-none
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  font-serif
                "
                spellCheck
              />
            ) : (
              <div className="
                prose prose-sm dark:prose-invert max-w-none
                text-slate-800 dark:text-slate-200
                leading-relaxed
                font-serif
              ">
                {coverLetter.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            )
          )}
        </div>

        {/* Footer actions */}
        {!isLoading && !error && coverLetter && (
          <div className="flex items-center gap-2 p-4 border-t border-slate-100 dark:border-slate-800">
            {/* Regenerate */}
            <button
              onClick={handleRegenerate}
              className="
                flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg
                text-slate-500 dark:text-slate-400
                hover:text-slate-700 dark:hover:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition-colors duration-150
              "
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Regenerate
            </button>

            {/* Edit / Done editing */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="
                flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg
                text-slate-500 dark:text-slate-400
                hover:text-slate-700 dark:hover:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition-colors duration-150
              "
            >
              {isEditing ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Done Editing
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </>
              )}
            </button>

            {/* Copy to clipboard */}
            <button
              onClick={handleCopy}
              className="
                ml-auto flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg
                bg-purple-600 hover:bg-purple-700
                text-white
                shadow-sm hover:shadow-md
                transition-all duration-150
              "
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy to Clipboard
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
