'use client';

/**
 * FilterBar.jsx
 * 
 * Filter and sort controls shown above job results.
 * Filters: Work Model, Role Type, Minimum Match Score
 * Sort: Match Score, Most Recent, Company A–Z
 */

const WORK_MODELS = ['All', 'Hybrid', 'Remote', 'On-site'];
const ROLE_TYPES = ['All', 'Data Scientist', 'Data Engineer', 'AI Engineer', 'BI Manager'];
const SORT_OPTIONS = [
  { value: 'matchScore', label: 'Match Score' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'company', label: 'Company A–Z' },
];
const PROXIMITY_OPTIONS = [
  { value: 'Any', label: 'Any distance' },
  { value: '25', label: 'Within 25 mi' },
  { value: '50', label: 'Within 50 mi' },
  { value: '100', label: 'Within 100 mi' },
];

export default function FilterBar({ filters, onChange, resultCount }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="
      flex flex-col sm:flex-row sm:items-center gap-3
      p-4 bg-white dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
      rounded-xl shadow-sm
    ">
      {/* Result count */}
      <div className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap mr-auto">
        {resultCount === 0
          ? 'No results'
          : `${resultCount} role${resultCount !== 1 ? 's' : ''} found`}
      </div>

      {/* Filter controls row */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Work Model filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Work Model
          </span>
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            {WORK_MODELS.map((model) => (
              <button
                key={model}
                onClick={() => handleChange('workModel', model)}
                className={`
                  px-3 py-1.5 text-xs font-medium transition-colors duration-150
                  ${filters.workModel === model
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }
                `}
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        {/* Role Type filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Role
          </span>
          <select
            value={filters.roleType}
            onChange={(e) => handleChange('roleType', e.target.value)}
            className="
              text-xs px-3 py-1.5
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              text-slate-700 dark:text-slate-300
              rounded-lg
              focus:outline-none focus:ring-1 focus:ring-blue-500
              cursor-pointer
            "
          >
            {ROLE_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Min Match Score slider */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Min Match
          </span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.minMatchScore}
              onChange={(e) => handleChange('minMatchScore', Number(e.target.value))}
              className="w-20 accent-blue-600 cursor-pointer"
            />
            <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 w-8">
              {filters.minMatchScore}%
            </span>
          </div>
        </div>

        {/* Proximity filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Distance
          </span>
          <select
            value={filters.proximity}
            onChange={(e) => handleChange('proximity', e.target.value)}
            className="
              text-xs px-3 py-1.5
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              text-slate-700 dark:text-slate-300
              rounded-lg
              focus:outline-none focus:ring-1 focus:ring-blue-500
              cursor-pointer
            "
          >
            {PROXIMITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-5 w-px bg-slate-200 dark:bg-slate-700" />

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Sort by
          </span>
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="
              text-xs px-3 py-1.5
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              text-slate-700 dark:text-slate-300
              rounded-lg
              focus:outline-none focus:ring-1 focus:ring-blue-500
              cursor-pointer
            "
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}
