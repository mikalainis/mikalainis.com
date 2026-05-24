'use client';

/**
 * JobCard.jsx
 * 
 * Displays a single job listing with match score, skills, salary,
 * work model badge, and action buttons (Save, Apply, Cover Letter).
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Work model badge colors
const WORK_MODEL_STYLES = {
  Remote: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  Hybrid: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  'On-site': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
};

// Job tracker status options with colors
const STATUS_OPTIONS = ['Saved', 'Applied', 'Interviewing', 'Offer', 'Declined'];
const STATUS_STYLES = {
  Saved: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  Applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  Interviewing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  Offer: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  Declined: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
};

// Match score color thresholds
function getScoreColor(score) {
  if (score >= 90) return 'text-green-600 dark:text-green-400';
  if (score >= 75) return 'text-blue-600 dark:text-blue-400';
  if (score >= 60) return 'text-amber-600 dark:text-amber-400';
  return 'text-slate-500';
}

function getScoreBarColor(score) {
  if (score >= 90) return 'bg-green-500';
  if (score >= 75) return 'bg-blue-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-slate-400';
}

function formatSalary(min, max) {
  if (!min && !max) return null;
  const fmt = (n) => `$${(n / 1000).toFixed(0)}k`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return null;
  }
}

export default function JobCard({ job, onSave }) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const router = useRouter();

  const handleTailor = () => {
    localStorage.setItem('tailor_job', JSON.stringify(job));
    router.push('/tools/resume-builder');
  };

  const salary = formatSalary(job.salaryMin, job.salaryMax);
  const postedLabel = formatDate(job.postedDate);

  return (
    <article
      className="
        relative group
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        hover:border-blue-300 dark:hover:border-blue-600
        rounded-xl shadow-sm hover:shadow-md
        transition-all duration-200
        overflow-hidden
      "
    >
      {/* Top accent line — color based on match score */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 ${getScoreBarColor(job.matchScore)}`}
      />

      <div className="p-5">
        {/* Header row: Title + Company + Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug truncate">
              {job.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              {job.company}
            </p>
          </div>

          {/* Match Score badge */}
          <div className="flex-shrink-0 text-right">
            <div className={`text-xl font-bold tabular-nums ${getScoreColor(job.matchScore)}`}>
              {job.matchScore}%
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500">match</div>
          </div>
        </div>

        {/* Match score bar */}
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full mb-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getScoreBarColor(job.matchScore)}`}
            style={{ width: `${job.matchScore}%` }}
          />
        </div>

        {/* Meta row: Location + Work Model + Salary + Date */}
        <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
          {/* Location */}
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </span>

          {/* Work model badge */}
          <span className={`
            px-2 py-0.5 text-xs font-medium rounded-full
            ${WORK_MODEL_STYLES[job.workModel] || WORK_MODEL_STYLES['Hybrid']}
          `}>
            {job.workModel}
          </span>

          {/* Salary */}
          {salary && (
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {salary}
            </span>
          )}

          {/* Distance from Basking Ridge */}
          {job.workModel !== 'Remote' && job.distanceMiles !== null && job.distanceMiles !== undefined && (
            <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ~{job.distanceMiles} mi
            </span>
          )}

          {/* Posted date */}
          {postedLabel && (
            <span className="text-slate-400 dark:text-slate-500 text-xs ml-auto">
              {postedLabel}
            </span>
          )}
        </div>

        {/* Description */}
        {job.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
            {job.description}
          </p>
        )}

        {/* Matched skills tags */}
        {job.matchedSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {job.matchedSkills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="
                  px-2 py-0.5 text-xs
                  bg-blue-50 dark:bg-blue-900/20
                  text-blue-700 dark:text-blue-400
                  border border-blue-100 dark:border-blue-800
                  rounded-md font-medium
                "
              >
                {skill}
              </span>
            ))}
            {job.matchedSkills.length > 6 && (
              <span className="px-2 py-0.5 text-xs text-slate-400 dark:text-slate-500">
                +{job.matchedSkills.length - 6} more
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">

          {/* Save / Status button */}
          <div className="relative">
            {job.savedStatus ? (
              <button
                onClick={() => setStatusMenuOpen(!statusMenuOpen)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
                  border transition-all duration-150
                  ${STATUS_STYLES[job.savedStatus]}
                  border-current/20
                `}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                {job.savedStatus}
                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => onSave(job.id, 'Saved')}
                className="
                  flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
                  border border-slate-200 dark:border-slate-700
                  text-slate-600 dark:text-slate-400
                  hover:border-blue-300 dark:hover:border-blue-600
                  hover:text-blue-600 dark:hover:text-blue-400
                  hover:bg-blue-50 dark:hover:bg-blue-900/20
                  transition-all duration-150
                "
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Save
              </button>
            )}

            {/* Status dropdown */}
            {statusMenuOpen && (
              <div className="
                absolute top-full left-0 mt-1 z-20
                bg-white dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
                rounded-lg shadow-lg overflow-hidden
                min-w-[130px]
              ">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      onSave(job.id, status);
                      setStatusMenuOpen(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2 text-xs font-medium
                      hover:bg-slate-50 dark:hover:bg-slate-700
                      transition-colors duration-100
                      ${job.savedStatus === status ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-300'}
                    `}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tailor Resume button */}
          <button
            onClick={handleTailor}
            className="
              flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
              border border-slate-200 dark:border-slate-700
              text-slate-600 dark:text-slate-400
              hover:border-purple-300 dark:hover:border-purple-600
              hover:text-purple-600 dark:hover:text-purple-400
              hover:bg-purple-50 dark:hover:bg-purple-900/20
              transition-all duration-150
            "
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Tailor Resume
          </button>

          {/* Job source */}
          {job.jobSource && (
            <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
              via {job.jobSource}
            </span>
          )}

          {/* Apply button — pushes to the right */}
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              ml-auto flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg
              bg-blue-600 hover:bg-blue-700
              text-white
              shadow-sm hover:shadow-md
              transition-all duration-150
            "
          >
            Apply
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
