'use client';

import { useState, useEffect } from 'react';

const MODELS = [
  { value: 'gemini-2.5-flash', label: 'gemini-2.5-flash — recommended' },
  { value: 'gemini-2.5-pro', label: 'gemini-2.5-pro — most capable' },
  { value: 'gemini-2.5-flash-lite', label: 'gemini-2.5-flash-lite — budget' },
  { value: 'gemini-2.0-flash', label: 'gemini-2.0-flash — fast' },
];

export default function ApiKeySettings() {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key') || '';
    const storedModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';
    setApiKey(storedKey);
    setModel(storedModel);
    // Auto-open if no key is set
    if (!storedKey) setOpen(true);
  }, []);

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    localStorage.setItem('gemini_model', model);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    if (apiKey.trim()) setOpen(false);
  };

  const hasKey = apiKey.trim().length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        {/* Header row */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">AI Settings</span>
            {hasKey ? (
              <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Key saved · {model}
              </span>
            ) : (
              <span className="text-xs text-amber-500 font-medium">API key required</span>
            )}
          </div>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded panel */}
        {open && (
          <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row gap-4 mt-3">
              {/* API Key input */}
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  Gemini API Key
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    placeholder="AIza..."
                    className="
                      w-full pr-10 pl-3 py-2 text-sm
                      bg-slate-50 dark:bg-slate-900
                      border border-slate-200 dark:border-slate-600
                      text-slate-900 dark:text-slate-100
                      placeholder-slate-400
                      rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showKey ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                  Stored only in your browser.{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 underline"
                  >
                    Get a free key →
                  </a>
                </p>
              </div>

              {/* Model selector */}
              <div className="sm:w-64">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="
                    w-full px-3 py-2 text-sm
                    bg-slate-50 dark:bg-slate-900
                    border border-slate-200 dark:border-slate-600
                    text-slate-900 dark:text-slate-100
                    rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    cursor-pointer
                  "
                >
                  {MODELS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Save button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSave}
                className="
                  flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                  bg-blue-600 hover:bg-blue-700 text-white
                  transition-all duration-150
                "
              >
                {saved ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved
                  </>
                ) : (
                  'Save Settings'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
