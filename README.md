# mikalainis.com

Personal portfolio and career tools site for Paulius Mikalainis — Principal Data Scientist at Verizon.

Built with **Next.js 13 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Pages

| Route | Description |
|---|---|
| `/` | Portfolio — About, Skills, Experience, Projects, Certifications, Contact |
| `/tools/resume-builder` | Career tools — AI Job Search, Resume Builder link |
| `/tools/resume-builder.html` | Standalone AI Resume Builder (static HTML, Gemini-powered) |

## Career Tools (`/tools/resume-builder`)

### AI Job Search
- Natural-language job search powered by **Gemini API** with Google Search grounding
- Filters: work model, role type, match score, proximity from Basking Ridge NJ
- Cards show match score, matched skills, salary, distance, and job source
- Profile and preferences hardcoded in `lib/systemPrompt.js`

### Resume Builder
- Standalone HTML tool at `public/tools/resume-builder.html`
- Features: AI resume generation, PDF export, job match scoring, Gmail-based application tracker
- No build step — edit the file directly

### Shared API Key
Both tools read `gemini_api_key` and `gemini_model` from `localStorage`. Set once in the **AI Settings** panel on the tools page.

## Project Structure

```
app/
  page.tsx                        # Portfolio landing page
  layout.tsx                      # Metadata, fonts
  components/
    job-search/                   # Job search UI components
      JobSearch.jsx               # Main orchestrator (search, filter, sort)
      SearchBar.jsx               # Query input + quick-search chips
      JobCard.jsx                 # Individual result card
      FilterBar.jsx               # Work model, role type, score, proximity filters
      ApiKeySettings.jsx          # Gemini API key/model panel (localStorage)
      ResumeTailorPanel.jsx       # Inline tailoring suggestions display
    ResumeTailorSection.jsx       # Resume tailor section for tools page
    Navigation.tsx                # Fixed top nav
    Hero.tsx / Skills.tsx / ...   # Portfolio sections
  api/
    job-search/route.js           # Gemini job search (Google Search grounding)
    cover-letter/route.js         # Gemini cover letter generation
    tailor-resume/route.js        # Gemini resume tailoring suggestions
  tools/resume-builder/page.tsx   # Career tools page
lib/
  claudeApi.js                    # Client-side fetch helpers (reads key from localStorage)
  systemPrompt.js                 # Candidate profile + all AI system prompts
public/
  tools/resume-builder.html       # Standalone resume builder
  photo.jpg                       # Profile photo
```

## Environment

```bash
# .env.local — only needed for server-side API calls if overriding the client-supplied key
ANTHROPIC_API_KEY=...   # Legacy — routes now use Gemini via client-supplied key
```
