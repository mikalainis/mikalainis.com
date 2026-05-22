const PROJECTS = [
  {
    title: 'AI-Powered Resume Builder',
    tech: 'JavaScript · Tailwind · Gemini AI',
    link: '/resume-builder.html',
    outcomes: 'Gemini AI integration, PDF export, Job match scoring',
  },
  {
    title: 'Enterprise Analytics Automation — Verizon EPM',
    tech: 'Oracle EPM · Python · ETL',
    outcomes: '83% complexity reduction, 50% faster delivery, Enterprise-scale',
  },
  {
    title: 'Customer Profitability Intelligence Platform',
    tech: 'Qlik · ML',
    outcomes: 'C-suite dashboards, Python migration, Retention strategy',
  },
  {
    title: 'Predictive Promotional Pricing Model',
    tech: 'Predictive Modeling · Python ML',
    outcomes: '$14M/mo cost avoidance, Regression modeling, Upsell strategy',
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
