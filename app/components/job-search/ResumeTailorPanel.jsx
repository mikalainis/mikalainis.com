'use client';

const SECTION_COLORS = {
  'Keywords to Add':         'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800',
  'Skills to Emphasize':     'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800',
  'Bullet Point Improvements': 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800',
  'What to De-emphasize':    'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800',
};

const DEFAULT_COLOR = 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/30 border-slate-100 dark:border-slate-700';

export default function ResumeTailorPanel({ suggestions, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 border-2 border-purple-300 dark:border-purple-700 border-t-purple-500 rounded-full animate-spin" />
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Analyzing job description…
          </span>
        </div>
        <div className="space-y-2">
          {[70, 90, 55, 80].map((w, i) => (
            <div key={i} className={`h-3 bg-slate-100 dark:bg-slate-700 rounded animate-pulse`}
              style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!suggestions) return null;

  return (
    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          Resume Tailoring Suggestions
        </span>
      </div>

      {/* Positioning summary */}
      {suggestions.positioningSummary && (
        <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-3 leading-relaxed">
          {suggestions.positioningSummary}
        </p>
      )}

      {/* Sections */}
      <div className="space-y-3">
        {suggestions.sections.map((section) => {
          const colorClass = SECTION_COLORS[section.title] || DEFAULT_COLOR;
          return (
            <div key={section.title} className={`rounded-lg border p-3 ${colorClass}`}>
              <p className="text-xs font-semibold mb-2">{section.title}</p>
              <ul className="space-y-1.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="mt-1 flex-shrink-0 w-1 h-1 rounded-full bg-current opacity-60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
