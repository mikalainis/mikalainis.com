# Paulius Mikalainis Portfolio & Career Tools

A professional portfolio and AI-powered career toolkit for **Paulius Mikalainis**, Principal Data Scientist at Verizon. This project showcases his experience in Data Science, Machine Learning, and AI Engineering while providing advanced tools for job searching and resume optimization.

## 🚀 Live Site Features

### 👤 Portfolio (`/`)
A modern, high-performance landing page featuring:
- **Experience Timeline:** Detailed career history at Verizon and beyond.
- **Project Showcase:** Highlights of key data science and ML initiatives.
- **Skills Matrix:** Core competencies in Python, SQL, GCP, and AI/ML.
- **Certifications:** Professional credentials and continuous learning.

### 💼 Mikalogix LLC Consultancy (`/consultancy.html`)
A standalone, self-contained landing page for **Mikalogix LLC**, Paulius's professional consultancy.
- **Services:** AI Agent Development, Workflow Automation, and Legacy Modernization.
- **Project Highlights:** Focused on business impact and systems engineering.
- **Interactive Stepper:** A guided look at the consultancy engagement process.
- **Availability Tracking:** Real-time availability badge for new engagements.

### 🛠 Career Tools (`/tools/resume-builder`)
A sophisticated AI-driven suite to streamline the job application process:

#### **AI Job Search**
- **Google Search Grounding:** Uses Gemini's live search capabilities to find real, currently open job postings.
- **Intelligent Matching:** Automatically scores jobs against Paulius's profile based on skills, seniority, and location.
- **Smart Filters:** Filter by work model (Remote/Hybrid/On-site), role type, match score, and proximity to Basking Ridge, NJ.
- **System-Prompt Driven:** Matches are informed by a detailed candidate profile defined in `lib/systemPrompt.js`.

#### **Resume & Application Tools**
- **Resume Tailoring:** Generates specific, actionable suggestions to align the resume with a specific job description.
- **Cover Letter Generation:** Produces professional, achievements-focused cover letters tailored to the role.
- **Standalone Resume Builder:** A self-contained tool (`/tools/resume-builder.html`) featuring AI resume generation, PDF export, and an integrated **Job Tracker** with Gmail/Drive automation.

## 🛠 Tech Stack

- **Framework:** [Next.js 13](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Google Gemini API](https://ai.google.dev/) (with Google Search tool integration)
- **Deployment:** Vercel (recommended)

## 📦 Project Structure

```text
app/
  page.tsx                        # Portfolio landing page
  layout.tsx                      # Metadata, fonts, and global layout
  api/
    job-search/route.js           # Gemini API with Google Search grounding
    cover-letter/route.js         # AI cover letter generation
    tailor-resume/route.js        # AI resume tailoring suggestions
  components/
    job-search/                   # Interactive Job Search UI components
    Navigation.tsx                # Sticky navigation and anchor links
    Hero.tsx / Skills.tsx / ...   # Portfolio section components
  tools/resume-builder/page.tsx   # Career tools dashboard
lib/
  claudeApi.js                    # Client-side fetch helpers (uses Gemini)
  systemPrompt.js                 # Centralized AI personality and candidate profile
public/
  tools/resume-builder.html       # Standalone static AI Resume Builder
  consultancy.html                # Mikalogix LLC consultancy landing page
```

## 🛠 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure AI Settings:**
   - Run the app: `npm run dev`
   - Navigate to `/tools/resume-builder`
   - Open the **AI Settings** panel and enter your **Gemini API Key**.
   - Keys are stored securely in `localStorage` and never sent to our servers except via the API route.

3. **Development:**
   ```bash
   npm run dev      # Opens at http://localhost:3000
   npm run build    # Production build
   npm run lint     # Linting
   ```

## 🔑 Environment & API Keys

- **Gemini API Key:** Required for all AI features. Obtain one from [Google AI Studio](https://aistudio.google.com/).
- **Model:** Default is set to `gemini-2.5-flash` for speed and grounding support.
- **Legacy:** The project previously used Claude; legacy `ANTHROPIC_API_KEY` references in `.env.local` are no longer required for current functionality.
