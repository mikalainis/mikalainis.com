'use client';

/**
 * FilterBar.jsx
 * 
 * Filter and sort controls shown above job results.
 */

import { useState, useMemo } from 'react';

const WORK_MODELS = ['All', 'Hybrid', 'Remote', 'On-site'];
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'company', label: 'Company A–Z' },
];
const PROXIMITY_OPTIONS = [
  { value: 'Any', label: 'Any distance' },
  { value: '25', label: 'Within 25 mi' },
  { value: '50', label: 'Within 50 mi' },
  { value: '100', label: 'Within 100 mi' },
];

const EXPERIENCE_LEVELS = ['Entry level', 'Mid level', 'Senior', 'Lead', 'Manager'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Education', 'Government', 'Retail', 'Manufacturing', 'Consulting', 'Startup'];
const DATE_POSTED_OPTIONS = [
  { value: 'all', label: 'Any time' },
  { value: '1', label: 'Last 24 hours' },
  { value: '3', label: 'Last 3 days' },
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
];
const COMPANY_SIZE_OPTIONS = [
  { value: 'Any', label: 'Any size' },
  { value: 'Startup', label: 'Startup (1–50)' },
  { value: 'SMB', label: 'SMB (51–500)' },
  { value: 'Enterprise', label: 'Enterprise (500+)' },
];

export default function FilterBar({ filters, onChange, resultCount }) {
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const handleToggle = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    handleChange(key, updated);
  };

  const activeMoreFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.experienceLevels?.length > 0) count++;
    if (filters.jobTypes?.length > 0) count++;
    if (filters.industries?.length > 0) count++;
    if (filters.maxDaysOld !== 'all') count++;
    if (filters.companySize !== 'Any') count++;
    return count;
  }, [filters]);

  const handleClearAll = () => {
    onChange({
      workModel: 'All',
      roleType: 'All',
      minMatchScore: 0,
      sortBy: 'relevance',
      proximity: '25',
      salaryMin: '',
      salaryMax: '',
      fullTime: false,
      permanent: false,
      experienceLevels: [],
      jobTypes: [],
      industries: [],
      maxDaysOld: 'all',
      companySize: 'Any',
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Result count */}
        <div className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
          {resultCount === 0
            ? 'No results'
            : `${resultCount.toLocaleString()} role${resultCount !== 1 ? 's' : ''} found`}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Clear all */}
          <button
            onClick={handleClearAll}
            className="text-xs font-medium text-slate-400 hover:text-blue-600 transition-colors"
          >
            Clear all
          </button>

          {/* Sort */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Sort by
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleChange('sortBy', e.target.value)}
              className="text-xs px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main filters */}
      <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">Work Model</span>
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            {WORK_MODELS.map((model) => (
              <button
                key={model}
                onClick={() => handleChange('workModel', model)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${filters.workModel === model ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">Radius</span>
          <select
            value={filters.proximity}
            onChange={(e) => handleChange('proximity', e.target.value)}
            className="text-xs px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            {PROXIMITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">Salary Min</span>
          <input
            type="number"
            value={filters.salaryMin}
            onChange={(e) => handleChange('salaryMin', e.target.value)}
            placeholder="Min"
            className="w-24 text-xs px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* More Filters Trigger */}
        <button
          onClick={() => setIsMoreFiltersOpen(!isMoreFiltersOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-150 ${isMoreFiltersOpen || activeMoreFiltersCount > 0 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
        >
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreFiltersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          More filters
          {activeMoreFiltersCount > 0 && (
            <span className="ml-1 w-4 h-4 flex items-center justify-center bg-blue-600 text-white text-[10px] rounded-full">
              {activeMoreFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Precision Filters */}
      {isMoreFiltersOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-5 border-t border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Experience level - 2 columns on desktop */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience level</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXPERIENCE_LEVELS.map(level => (
                <label key={level} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.experienceLevels?.includes(level)}
                    onChange={() => handleToggle('experienceLevels', level)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Job type - 2 columns on desktop */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job type</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {JOB_TYPES.map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.jobTypes?.includes(type)}
                    onChange={() => handleToggle('jobTypes', type)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Industry dropdown */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Industry</span>
            <select
              multiple
              value={filters.industries}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                handleChange('industries', values);
              }}
              className="text-xs p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 h-[100px]"
            >
              <option value="Any">Any industry</option>
              {INDUSTRIES.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400 italic">Hold Cmd/Ctrl to select multiple</p>
          </div>

          {/* Date & Company Size */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date posted</span>
              <select
                value={filters.maxDaysOld}
                onChange={(e) => handleChange('maxDaysOld', e.target.value)}
                className="text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                {DATE_POSTED_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company size</span>
              <select
                value={filters.companySize}
                onChange={(e) => handleChange('companySize', e.target.value)}
                className="text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                {COMPANY_SIZE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
