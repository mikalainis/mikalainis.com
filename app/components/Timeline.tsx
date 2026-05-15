const EXPERIENCE = [
  {
    company: 'Verizon',
    location: 'Basking Ridge, NJ',
    role: 'Principal Data Scientist / BI Manager',
    subtitle: 'Reporting & Planning Process Automation',
    period: 'Dec 2025 – Present',
    current: true,
    highlights: [
      'Led design of scalable ML systems for financial planning, reducing process complexity by 83% and accelerating EPM completion by 50%.',
      'Established data governance and validation protocols within critical financial data platforms for robust ML model training and inference.',
      'Engineered Python data pipelines integrating distributed computing for large-scale enterprise finance workflows.',
    ],
  },
  {
    company: 'Verizon',
    location: 'Basking Ridge, NJ',
    role: 'BI Manager',
    subtitle: 'Oracle EPM Support — Corporate Finance',
    period: 'Dec 2023 – Dec 2025',
    current: false,
    highlights: [
      'Translated complex financial requirements into enterprise planning applications, enhancing ML-driven insights and accelerating corporate target planning.',
      'Mentored data analysts in Python scripting for automated reporting and advanced analytics.',
      'Deployed automated Python solutions for hands-on data engineering, streamlining corporate consolidation processes.',
    ],
  },
  {
    company: 'Verizon',
    location: 'Basking Ridge, NJ',
    role: 'BI Manager',
    subtitle: 'Customer Profitability — VCG Commercial Finance',
    period: 'May 2021 – Dec 2023',
    current: false,
    highlights: [
      'Migrated and re-architected a legacy customer profitability model to a scalable Python-based ML platform, enhancing analytical accuracy.',
      'Designed and deployed an enterprise decision intelligence solution with predictive ML models to drive C-suite marketing and retention strategy.',
      'Integrated new data sources into the enterprise data warehouse, enhancing quality critical for scalable ML model training.',
    ],
  },
  {
    company: 'Verizon',
    location: 'Basking Ridge, NJ',
    role: 'BI Manager',
    subtitle: 'Service Pricing — VCG Commercial Finance',
    period: 'Feb 2019 – Apr 2021',
    current: false,
    highlights: [
      'Designed a predictive ML regression model for optimizing customer promotional offerings, implementing a data-driven retention strategy.',
      'Translated ML findings into actionable recommendations resulting in a documented $14M monthly promotional cost avoidance.',
      'Mentored financial analysts in Python for ML model development, fostering a data-driven culture.',
    ],
  },
  {
    company: 'Verizon',
    location: 'Basking Ridge, NJ',
    role: 'Data Scientist',
    subtitle: 'Internal Audit',
    period: 'Nov 2016 – Jan 2019',
    current: false,
    highlights: [
      'Developed and deployed Python-based ML solutions including NLP models to optimize risk survey classification for enterprise audit.',
      'Significantly reduced manual effort and delivered actionable insights in a financial risk management context.',
    ],
  },
  {
    company: 'Horizon BCBS of New Jersey',
    location: 'Newark, NJ',
    role: 'BI Analyst',
    subtitle: 'Healthcare Analytics',
    period: 'Sep 2006 – Oct 2016',
    current: false,
    highlights: [
      'Performed data analysis and reporting for healthcare analytics, contributing insights on patient outcomes and operational efficiency.',
      'Built data manipulation and visualization capabilities that laid the groundwork for future ML applications.',
    ],
  },
]

export default function Timeline() {
  return (
    <section id="experience" className="bg-slate-900/50 py-24 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-14">
          <p className="text-sky-400 text-xs font-bold tracking-widest uppercase mb-3">9+ Years of Impact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">Career Journey</h2>
          <div className="w-12 h-0.5 bg-sky-400 mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-slate-800" />

          <div className="space-y-8">
            {EXPERIENCE.map((job, i) => (
              <div key={i} className="relative flex gap-6 md:gap-10">
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10 mt-1">
                  <div
                    className={`w-8 md:w-12 h-8 md:h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                      job.current
                        ? 'border-sky-400 bg-sky-400/20 text-sky-400'
                        : 'border-slate-700 bg-slate-900 text-slate-500'
                    }`}
                  >
                    {job.current ? (
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                    )}
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`flex-1 rounded-2xl p-5 md:p-6 border transition-all duration-300 hover:border-sky-400/20 mb-2 ${
                    job.current
                      ? 'bg-sky-400/5 border-sky-400/20'
                      : 'bg-slate-800/30 border-slate-700/40 hover:bg-slate-800/50'
                  }`}
                >
                  {/* Card top row */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-slate-100 font-semibold text-base">{job.role}</h3>
                        {job.current && (
                          <span className="text-xs font-bold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sky-400/80 text-sm font-medium mt-0.5">{job.subtitle}</p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="text-slate-500 text-xs font-medium whitespace-nowrap bg-slate-800 border border-slate-700/50 px-2.5 py-1 rounded-lg">
                      {job.period}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {job.highlights.map((point, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                        <span className="text-sky-500 mt-1.5 flex-shrink-0">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 6 6">
                            <circle cx="3" cy="3" r="3" />
                          </svg>
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
