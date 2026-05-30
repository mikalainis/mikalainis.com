const PROJECTS = [
  {
    title: 'Predictive Planning',
    tech: 'Google Sheets API · Machine Learning · Next.js',
    link: '/predictive-planning.html',
    outcomes: 'AI-powered Google Sheets add-on for forecasting future trends and analyzing historical data directly within spreadsheets.',
    category: 'AI-powered'
  },
  {
    title: 'Job Application Tracker',
    tech: 'Python · Gmail API · NLP · SQLite',
    link: '/tools/resume-builder.html',
    outcomes: 'Email-parsing agent that monitors inboxes, extracts application data, deduplicates records, and tracks status changes.',
    category: 'Automation'
  },
  {
    title: 'Intelligent Workflow Engine',
    tech: 'Claude API · Webhooks · Node.js',
    outcomes: 'LLM-backed routing system that classifies inbound requests and dispatches to the right handler, cutting response time by 60%.',
    category: 'AI-powered'
  },
  {
    title: 'Oracle EPM Modernization',
    tech: 'Oracle EPM · ETL · Power BI · SQL',
    outcomes: 'Audit and redesign of a legacy Oracle EPM reporting stack with modern ETL pipelines and BI layer.',
    category: 'Legacy modernization'
  },
  {
    title: 'SMB Operations Assistant',
    tech: 'RAG · Slack · Google Drive',
    outcomes: 'AI agent integrated with Slack and Google Workspace for operational Q&A, report summaries, and drafting.',
    category: 'AI-powered'
  },
]

export default function Projects() {
  return (
    <section id="projects" className="bg-slate-900/50 py-24 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-sky-400 text-xs font-bold tracking-widest uppercase mb-3">Projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">Selected data and analytics work.</h2>
          <div className="w-12 h-0.5 bg-sky-400 mt-4" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.title} className="rounded-3xl border border-slate-800 bg-slate-800/50 p-6 transition hover:border-sky-400/20 hover:bg-slate-800/70">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-slate-50">{project.title}</h3>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 text-sm font-medium hover:text-sky-300"
                  >
                    View
                  </a>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-slate-400">{project.tech}</p>
              <p className="mt-5 text-slate-200 leading-7">{project.outcomes}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
