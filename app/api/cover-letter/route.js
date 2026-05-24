/**
 * app/api/cover-letter/route.js
 *
 * POST /api/cover-letter
 * Body: { job, apiKey, model }
 * Returns: { coverLetter: string }
 */

import { COVER_LETTER_SYSTEM_PROMPT } from '@/lib/systemPrompt';

export async function POST(request) {
  try {
    const { job, apiKey, model = 'gemini-2.5-flash' } = await request.json();

    if (!job || typeof job !== 'object') {
      return Response.json({ message: 'Missing or invalid job object' }, { status: 400 });
    }
    if (!apiKey) {
      return Response.json(
        { message: 'Gemini API key not configured. Add it in the AI Settings panel.' },
        { status: 401 }
      );
    }

    const userMessage = `
Write a cover letter for this position:

Job Title: ${job.title}
Company: ${job.company}
Location: ${job.location} (${job.workModel})
${job.description ? `Role Summary: ${job.description}` : ''}
${job.matchedSkills?.length ? `Matched Skills: ${job.matchedSkills.join(', ')}` : ''}

Output only the cover letter text — no subject line, no date, no address block.
    `.trim();

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: COVER_LETTER_SYSTEM_PROMPT }] },
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
    const coverLetter = (geminiData.candidates?.[0]?.content?.parts ?? [])
      .filter((p) => p.text)
      .map((p) => p.text)
      .join('')
      .trim();

    if (!coverLetter) {
      return Response.json({ message: 'No cover letter generated' }, { status: 502 });
    }

    return Response.json({ coverLetter });
  } catch (error) {
    console.error('Cover letter API error:', error);
    return Response.json({ message: error.message || 'Internal server error' }, { status: 500 });
  }
}
