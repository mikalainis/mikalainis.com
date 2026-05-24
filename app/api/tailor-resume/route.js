/**
 * app/api/tailor-resume/route.js
 *
 * POST /api/tailor-resume
 * Body: { job, apiKey, model }
 * Returns: { suggestions: { positioningSummary, sections } }
 */

import { TAILOR_RESUME_SYSTEM_PROMPT } from '@/lib/systemPrompt';

export async function POST(request) {
  try {
    const { job, jobDescription, apiKey, model = 'gemini-2.5-flash' } = await request.json();

    if (!job && !jobDescription) {
      return Response.json({ message: 'Missing job or jobDescription' }, { status: 400 });
    }
    if (!apiKey) {
      return Response.json(
        { message: 'Gemini API key not configured. Add it in the AI Settings panel.' },
        { status: 401 }
      );
    }

    const userMessage = job
      ? `
Tailor my resume for this job posting:

Job Title: ${job.title}
Company: ${job.company}
Location: ${job.location} (${job.workModel})
Job Type: ${job.jobType}
${job.description ? `Role Description: ${job.description}` : ''}
${job.matchedSkills?.length ? `Skills already matched: ${job.matchedSkills.join(', ')}` : ''}

Return ONLY the JSON object with positioningSummary and sections — no markdown, no commentary.
      `.trim()
      : `
Tailor my resume for this job posting:

${jobDescription}

Return ONLY the JSON object with positioningSummary and sections — no markdown, no commentary.
      `.trim();

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: TAILOR_RESUME_SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: userMessage }] }],
          generationConfig: { maxOutputTokens: 1024 },
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
      .join('')
      .trim();

    if (!textContent) {
      return Response.json({ message: 'No response from Gemini' }, { status: 502 });
    }

    let suggestions;
    try {
      const cleaned = textContent
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();
      suggestions = JSON.parse(cleaned);
      if (!suggestions.sections || !Array.isArray(suggestions.sections)) {
        throw new Error('Invalid suggestions structure');
      }
    } catch {
      console.error('Failed to parse Gemini tailor response:', textContent);
      return Response.json(
        { message: 'Failed to parse suggestions. Please try again.' },
        { status: 502 }
      );
    }

    return Response.json({ suggestions });
  } catch (error) {
    console.error('Tailor resume API error:', error);
    return Response.json({ message: error.message || 'Internal server error' }, { status: 500 });
  }
}
