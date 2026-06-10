/**
 * app/api/job-search/route.js
 *
 * POST /api/job-search
 * Body: { query, proximity, apiKey, model }
 * Returns: { jobs: JobObject[] }
 */

import { JOB_SEARCH_SYSTEM_PROMPT } from '@/lib/systemPrompt';

const GENERIC_PATTERNS = [
  /\b(my\s+)?resume\b/i,
  /\bjobs?\s+for\s+me\b/i,
  /\bmatch\s+(my|me)\b/i,
  /\bwhat\s+should\s+i\s+apply\b/i,
  /^(find\s+)?(me\s+)?something\b/i,
];

export async function POST(request) {
  try {
    const { query, proximity, apiKey, model = 'gemini-2.5-flash' } = await request.json();
    const zipCode = '07920'; // Default for Basking Ridge, NJ

    if (!query || typeof query !== 'string') {
      return Response.json({ message: 'Missing or invalid query' }, { status: 400 });
    }
    if (!apiKey) {
      return Response.json(
        { message: 'Gemini API key not configured. Add it in the AI Settings panel.' },
        { status: 401 }
      );
    }

    const normalizedQuery = GENERIC_PATTERNS.some((re) => re.test(query))
      ? 'Find the best overall job matches for my full candidate profile'
      : query;

    const proximityNote = proximity && proximity !== 'Any'
      ? `\nProximity filter: only include On-site and Hybrid roles within ${proximity} miles of zip code ${zipCode}. Remote roles are always fine regardless of distance.`
      : '';

    const userMessage = `
User query: "${normalizedQuery}"
${proximityNote}
Base location for distance calculation: Zip code ${zipCode}.
Please search for real, currently open job postings that match my profile.
Search multiple times with different queries to find the best 4–8 matches.
Return ONLY a valid JSON array of job objects — no markdown, no commentary.
    `.trim();

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: JOB_SEARCH_SYSTEM_PROMPT }] },
          tools: [{ googleSearch: {} }],
          contents: [{ role: 'user', parts: [{ text: userMessage }] }],
          generationConfig: { maxOutputTokens: 8192 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.json().catch(() => ({}));
      const msg = err?.error?.message || `Gemini API error (${geminiRes.status})`;
      return Response.json({ message: msg }, { status: 502 });
    }

    const geminiData = await geminiRes.json();
    const textContent = (geminiData.candidates?.[0]?.content?.parts ?? [])
      .filter((p) => p.text)
      .map((p) => p.text)
      .join('');

    if (!textContent) {
      return Response.json({ message: 'No response from Gemini' }, { status: 502 });
    }

    let jobs;
    try {
      const cleaned = textContent
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();
      jobs = JSON.parse(cleaned);
      if (!Array.isArray(jobs)) throw new Error('Response is not an array');
    } catch {
      console.error('Failed to parse Gemini response as JSON:', textContent);
      return Response.json(
        { message: 'Failed to parse job results. Please try again.' },
        { status: 502 }
      );
    }

    const normalizedJobs = jobs.map((job, index) => ({
      id: job.id || `job-${Date.now()}-${index}`,
      title: job.title || 'Unknown Title',
      company: job.company || 'Unknown Company',
      location: job.location || 'Location TBD',
      workModel: ['Remote', 'Hybrid', 'On-site'].includes(job.workModel) ? job.workModel : 'Hybrid',
      salaryMin: typeof job.salaryMin === 'number' ? job.salaryMin : null,
      salaryMax: typeof job.salaryMax === 'number' ? job.salaryMax : null,
      matchScore: typeof job.matchScore === 'number' ? Math.min(100, Math.max(0, job.matchScore)) : 75,
      matchedSkills: Array.isArray(job.matchedSkills) ? job.matchedSkills : [],
      description: job.description || '',
      applyUrl: job.applyUrl || '#',
      postedDate: job.postedDate || null,
      jobType: job.jobType || 'Other',
      distanceMiles: typeof job.distanceMiles === 'number' ? Math.round(job.distanceMiles) : null,
      jobSource: typeof job.jobSource === 'string' ? job.jobSource : null,
      savedStatus: null,
    }));

    return Response.json({ jobs: normalizedJobs });
  } catch (error) {
    console.error('Job search API error:', error);
    return Response.json({ message: error.message || 'Internal server error' }, { status: 500 });
  }
}
