/**
 * claudeApi.js
 *
 * Client-side utility functions for calling the Next.js API routes.
 * Reads the Gemini API key and model from localStorage (set via ApiKeySettings).
 * Never calls the AI API directly from the browser — always routes through /api/.
 */

function getGeminiConfig() {
  const apiKey = localStorage.getItem('gemini_api_key') || '';
  const model = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';
  const zipCode = localStorage.getItem('user_zip_code') || '07920';
  return { apiKey, model, zipCode };
}

/**
 * Searches for jobs matching a natural-language query.
 * @param {string} query
 * @param {{ signal?: AbortSignal, proximity?: string }} options
 * @returns {Promise<Array>}
 */
export async function searchJobs(query, { signal, proximity } = {}) {
  const { apiKey, model, zipCode } = getGeminiConfig();

  if (!apiKey) {
    throw new Error('Gemini API key not configured. Open AI Settings above and add your key.');
  }

  const response = await fetch('/api/job-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, proximity, apiKey, model, zipCode }),
    signal,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Job search failed (${response.status})`);
  }

  const data = await response.json();
  return data.jobs;
}

/**
 * Generates a tailored cover letter for a specific job.
 * @param {Object} job
 * @returns {Promise<string>}
 */
export async function generateCoverLetter(job) {
  const { apiKey, model } = getGeminiConfig();

  if (!apiKey) {
    throw new Error('Gemini API key not configured. Open AI Settings above and add your key.');
  }

  const response = await fetch('/api/cover-letter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ job, apiKey, model }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Cover letter generation failed (${response.status})`);
  }

  const data = await response.json();
  return data.coverLetter;
}

/**
 * Generates resume tailoring suggestions for a job.
 * @param {Object|string} jobOrDescription - job object from search results, or raw job description text
 * @returns {Promise<{ positioningSummary: string, sections: Array }>}
 */
export async function tailorResume(jobOrDescription) {
  const { apiKey, model } = getGeminiConfig();

  if (!apiKey) {
    throw new Error('Gemini API key not configured. Open AI Settings and add your key.');
  }

  const body = typeof jobOrDescription === 'string'
    ? { jobDescription: jobOrDescription, apiKey, model }
    : { job: jobOrDescription, apiKey, model };

  const response = await fetch('/api/tailor-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Resume tailoring failed (${response.status})`);
  }

  const data = await response.json();
  return data.suggestions;
}
