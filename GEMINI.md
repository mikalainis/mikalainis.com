# Mikalogix — Project Gem Instructions

## Project Overview
This is the personal and consultancy website for Paulius Mikalainis, operating
as Mikalogix LLC — an AI agent development, digital workflow automation, and
legacy system modernization consultancy based in Basking Ridge, NJ.

The site is hosted at mikalainis.com and lives in a GitHub Codespace at
/workspaces/mikalainis.com. It is a vanilla HTML/CSS/JS project with no
framework — no React, no Vue, no build step.

## Business Identity
- Legal name: Mikalogix LLC
- Public brand: Mikalogix
- Owner: Paulius Mikalainis
- Location: Basking Ridge, NJ
- Services: AI agent development, digital workflow automation,
  legacy system modernization for small to mid-size businesses
- Website: mikalainis.com

## Project Structure
Before any task, scan the project directory and identify:
- consultancy.html — main consultancy landing page
- job-search.html (or similar) — AI job search application
- job-tracker.html (or similar) — job application tracker
- resume-builder.html (or similar) — AI resume builder
- public/ — static assets (images, icons, etc.)
- GEMINI.md — standing instructions (this file)
- git-commit.sh — git helper script (never run git directly)
- .gemini/settings.local.json — Gemini CLI config
- .vscode/settings.json — VS Code config

## Tech Stack
- Vanilla HTML, CSS, JavaScript only — no frameworks, no build tools
- Inline CSS and JS preferred — keep files self-contained
- External fonts via Google Fonts only
- No npm, no webpack, no bundlers
- API integrations via fetch() calls in vanilla JS

## Active API Integrations
- Adzuna Jobs API
  App ID: b1df80f6
  App Key: 07ea9cfa7e534bf270bf22af538c5142
  Base URL: https://api.adzuna.com/v1/api/jobs/us/search/
  Free tier: 1,000 requests/month — always use caching
- Google Analytics 4
  Measurement ID: G-7WRR3BEPZ3
  Must be present in <head> of every page

## Design System
Always read the existing consultancy.html before making any UI changes.
Extract and match:
- All CSS variables defined in :root {}
- Color palette (background, surface, text, accent, muted, border)
- Typography (font families, sizes, weights, line heights)
- Component styles (cards, buttons, tags, inputs, nav, footer)
- Spacing rhythm (section padding, card padding, gap values)
- Border radius and shadow values
- Dark/light theme
Never invent new design tokens — always derive from the existing file.

## Coding Standards
- Use CSS variables for all colors and spacing — never hardcode hex values
- Use semantic HTML — section, nav, main, article, footer, etc.
- All external links must have target="_blank" rel="noopener"
- All interactive elements must have aria-labels where text is absent
- localStorage keys must be namespaced:
    adzuna_ for job search data
    tracker_ for job tracker data
    resume_ for resume builder data
    mikalogix_ for site-wide preferences
- Never expose credentials in comments, console.log, or UI output
- Always handle loading, error, and empty states for any async operation
- Mobile responsive — must work at 768px, 1024px, and 1280px widths

## Pages and Navigation
The site uses vanilla JS show/hide for page navigation — no page reloads.
Active nav link must have aria-current="page" set.
Pages currently in the site:
- Home (default)
- How It Works (engagement framework stepper)
- Use Cases
- Projects
- Résumé
- Privacy Policy

When adding a new page:
1. Add a nav link wired to the JS show/hide pattern
2. Add the page div with a unique id
3. Set aria-current on the active nav link
4. Add a footer consistent with existing pages

## Consultancy Page Sections (in order)
1. Navigation
2. Hero — availability badge, headline, CTA buttons
3. Services — 3 cards (AI Agents, Workflow Automation, Legacy Modernization)
4. Stats row — 8+ years, 15+ systems, 40% time reduction
5. How It Works — 5-phase interactive stepper
6. Use Cases — 3 cards (Workflow Engine, SMB Assistant, EPM Modernization)
7. Projects — grid of all projects
8. Contact / CTA strip
9. Footer — "Mikalogix LLC · Basking Ridge, NJ"
10. Cookie consent banner
11. Privacy Policy page

## Projects in the Grid
1. Web Design & Development (y-swim.com, mikalainis.com, kofc2393.org)
2. AI Job Search Assistant (internal link)
3. Job Application Tracker (internal link)
4. Resume Builder (internal link)
5. St. James Men of Charity — Fundraiser Design (sjmoc.org)

## Use Cases (separate page, Problem → Solution → Outcome format)
1. Intelligent Workflow Engine — AI-powered
2. SMB Operations Assistant — AI-powered
3. Oracle EPM Modernization — Legacy modernization

## Engagement Framework Stepper (5 phases)
01 Discover — Week 1–2 — Free consultation
02 Design   — Week 2–3 — Architecture
03 Build    — Week 3–8 — Core phase
04 Deploy   — Week 8–9 — Go-live
05 Optimize — Ongoing  — Continuous

## Git Workflow — CRITICAL
NEVER run git add, git commit, git push, or any git command.
After completing all file changes:
1. Write a specific one-line commit message to gemini-commit.txt
   in the project root — e.g. "Add Adzuna API integration to job-search.html"
2. Be descriptive — list the main files changed and what changed
3. No quotes, no markdown, no bullet points — plain text one line only
4. Tell me which files were modified and that gemini-commit.txt is ready
5. Then stop — I will run ./git-commit.sh to push the changes

## Terminal Safety
- Never run commands that trigger PTY resize events
- Prefer file writes over shell commands wherever possible
- Never run interactive commands that wait for user input
- If a shell command is absolutely necessary, keep it short and non-interactive

## Privacy & Security
- Never display EIN (42-2786857) anywhere on the site
- Never display Entity ID (0451470871) anywhere on the site
- Never log or expose API keys in UI, console, or HTML comments
  beyond the credentials constants block at the top of each file
- Always store credentials as named constants at the top of the file
  with a comment: // TODO: move to environment variables

## Analytics
GA4 snippet must be present in <head> of every HTML page:
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7WRR3BEPZ3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-7WRR3BEPZ3');
</script>

When adding a new page or new CTA button, also add the appropriate
gtag event tracking call matching the existing event naming convention.

## Self-Maintenance
At the end of every session where new pages, APIs, integrations, projects,
or structural changes were made, update this GEMINI.md file to reflect
those changes before writing gemini-commit.txt. Specifically update:
- Project Structure (new files)
- Active API Integrations (new APIs or credentials)
- Pages and Navigation (new pages)
- Projects in the Grid (new projects)
- Any new sections or features added to the consultancy page