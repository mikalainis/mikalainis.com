const SKILL_GROUPS = [
  {
    category: 'AI Agent Development',
    description: 'Custom intelligent agents that automate research, triage, and decision-making',
    icon: (
      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    skills: ['LLM Orchestration', 'RAG Systems', 'Multi-agent Workflows', 'Prompt Engineering', 'Gemini / Claude API'],
  },
  {
    category: 'Workflow Automation',
    description: 'End-to-end automation of repetitive business processes',
    icon: (
      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    skills: ['Python Automation', 'API Integration', 'Data Pipelines', 'ETL', 'Error Handling', 'Scalable Systems'],
  },
  {
    category: 'Legacy Modernization',
    description: 'Audit and incremental migration of aging enterprise systems',
    icon: (
      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    skills: ['System Audits', 'Cloud Migration', 'SQL Optimization', 'Oracle EPM', 'Architecture Redesign'],
  },
]

export default function Skills() {
  return (
    <section id="services" className="bg-slate-900 py-24 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-14">
          <p className="text-sky-400 text-xs font-bold tracking-widest uppercase mb-3">Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">Strategic AI & Systems Engineering</h2>
          <div className="w-12 h-0.5 bg-sky-400 mt-4" />
        </div>

        {/* Skill groups */}
        <div className="grid sm:grid-cols-2 gap-5">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-sky-400/25 hover:bg-slate-800/70 transition-all duration-300 group"
            >
              {/* Card header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-400/15 transition-colors">
                  {group.icon}
                </div>
                <div>
                  <h3 className="text-slate-100 font-semibold text-sm leading-tight">{group.category}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{group.description}</p>
                </div>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-sky-300/90 bg-sky-400/8 border border-sky-400/15 px-3 py-1 rounded-full hover:bg-sky-400/15 hover:text-sky-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
