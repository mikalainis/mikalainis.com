# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint via next lint
```

There are no tests configured in this project.

## Architecture

This is a single-page personal portfolio site (Next.js 13 App Router, TypeScript, Tailwind CSS).

**Page composition:** `app/page.tsx` assembles the page by importing and stacking eight section components in order: `Navigation → Hero → Skills → Timeline → Projects → Certifications → Contact → Footer`. Each section uses a corresponding `id` attribute that the nav anchors to (`#about`, `#experience`, `#projects`, etc.).

**Content is co-located with components:** All portfolio data (job history, skills, projects, certifications) lives as hardcoded constants at the top of each component file — there is no CMS, API, or external data source. To update content, edit the relevant constant in the component.

**Key content files:**
- `app/components/Timeline.tsx` — `EXPERIENCE` array (job history)
- `app/components/Projects.tsx` — `PROJECTS` array
- `app/components/Skills.tsx` — skills list
- `app/components/Certifications.tsx` — certifications
- `app/layout.tsx` — page `<title>`, meta description, and OpenGraph tags

**Standalone tool:** `public/tools/resume-builder.html` is a fully self-contained HTML file with embedded CSS/JS and Gemini AI integration. It is served as a static asset and is independent of the Next.js app — edit it directly without any build step.

**Styling:** Dark slate theme (`bg-slate-900`) with `sky-400` as the accent color throughout. Tailwind utility classes only; `app/globals.css` adds scroll behavior and custom scrollbar styling. No custom Tailwind theme extensions beyond gradient utilities.
