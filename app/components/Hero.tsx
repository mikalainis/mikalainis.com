const TAGS = ['AI/ML Leader', 'GenAI / LLM Expert', 'Data Engineer', 'BI Strategist']

const STATS = [
  { value: '9+', label: 'Years in Data Science' },
  { value: '$14M', label: 'Monthly Cost Avoidance' },
  { value: '83%', label: 'Process Complexity Cut' },
  { value: '50%', label: 'Faster EPM Delivery' },
]

export default function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col bg-slate-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-blue-700/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-sky-400/3 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 py-32 md:py-28">
          <div className="grid md:grid-cols-5 gap-12 lg:gap-20 items-center">

            {/* Left: Text */}
            <div className="md:col-span-3">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 bg-sky-400/10 border border-sky-400/20 text-sky-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-7 tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse flex-shrink-0" />
                Principal Data Scientist · Verizon · NJ
              </div>

              {/* Name */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 leading-[1.05] tracking-tight mb-4">
                Paulius<br />
                <span className="text-sky-400">Mikalainis</span>
              </h1>

              {/* Role tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-slate-400 bg-slate-800 border border-slate-700/70 px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                9+ years designing and deploying{' '}
                <span className="text-slate-300">scalable ML systems</span> and{' '}
                <span className="text-slate-300">GenAI / LLM applications</span> that
                translate enterprise data into strategic business outcomes — with a
                documented{' '}
                <span className="text-sky-400 font-semibold">$14M monthly impact</span>.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="mailto:pmikalainis@gmail.com"
                  className="inline-flex items-center gap-2 bg-sky-400 text-slate-900 px-6 py-3 rounded-lg font-bold text-sm hover:bg-sky-300 transition-all duration-200 hover:shadow-xl hover:shadow-sky-400/25 hover:-translate-y-0.5"
                >
                  Get In Touch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#experience"
                  className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 px-6 py-3 rounded-lg font-medium text-sm hover:border-sky-400/50 hover:text-sky-400 hover:bg-sky-400/5 transition-all duration-200"
                >
                  View Experience
                </a>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="mailto:pmikalainis@gmail.com"
                  className="flex items-center gap-2 text-slate-500 hover:text-sky-400 transition-colors text-sm"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">pmikalainis@gmail.com</span>
                  <span className="sm:hidden">Email</span>
                </a>
                <a
                  href="https://linkedin.com/in/pmikalainis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-500 hover:text-sky-400 transition-colors text-sm"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/mikalainis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-500 hover:text-sky-400 transition-colors text-sm"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Right: Avatar */}
            <div className="hidden md:flex md:col-span-2 justify-center items-center">
              <div className="relative">
                <div className="absolute -inset-8 rounded-full border border-sky-400/8 animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute -inset-16 rounded-full border border-sky-400/4" />
                <div className="absolute -inset-3 rounded-full bg-sky-400/8 blur-2xl" />
                <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-slate-800 to-slate-750 border-2 border-sky-400/25 flex flex-col items-center justify-center overflow-hidden shadow-2xl shadow-sky-400/10">
                  {/*
                    TO ADD YOUR PHOTO:
                    1. Copy your photo to public/photo.jpg
                    2. Replace this block with:
                       <Image src="/photo.jpg" alt="Paulius Mikalainis" fill className="object-cover" />
                  */}
                  <div className="text-6xl font-extrabold text-sky-400 tracking-tight select-none">PM</div>
                  <div className="text-slate-600 text-xs mt-2 text-center px-6 leading-relaxed">
                    Add photo to<br />
                    <code className="text-slate-500 text-xs">public/photo.jpg</code>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-slate-800 bg-slate-900/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center px-4 py-1">
              <div className="text-2xl md:text-3xl font-extrabold text-sky-400 tabular-nums">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
