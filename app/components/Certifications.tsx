const CERTIFICATIONS = [
  {
    title: '5-Day AI Agents Intensive',
    issuer: 'Google',
    date: 'Nov 2025',
    badge: 'G',
    color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  },
  {
    title: 'Data Science Specialization',
    issuer: 'Johns Hopkins University',
    date: 'Coursera',
    badge: 'JHU',
    color: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  },
  {
    title: 'Certificate of Big Data Essentials',
    issuer: 'New Jersey Institute of Technology',
    date: 'NJIT',
    badge: 'NJIT',
    color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
]

const EDUCATION = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'New Jersey Institute of Technology',
    abbr: 'NJIT',
    location: 'Newark, NJ',
    badge: 'MS',
  },
  {
    degree: 'Bachelor of Science in Operations Research & Computer Analysis',
    school: 'United States Coast Guard Academy',
    abbr: 'USCGA',
    location: 'New London, CT',
    badge: 'BS',
    note: 'Military service academy — competitive federal appointment required.',
  },
]

export default function Certifications() {
  return (
    <section id="credentials" className="bg-slate-900 py-24 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-14">
          <p className="text-sky-400 text-xs font-bold tracking-widest uppercase mb-3">Credentials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">Education & Certifications</h2>
          <div className="w-12 h-0.5 bg-sky-400 mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Certifications */}
          <div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Certifications
            </h3>
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="flex items-start gap-4 p-4 bg-slate-800/40 border border-slate-700/40 rounded-xl hover:border-sky-400/20 hover:bg-slate-800/60 transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold flex-shrink-0 ${cert.color}`}>
                    {cert.badge}
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium text-sm leading-tight">{cert.title}</p>
                    <p className="text-slate-500 text-xs mt-1">
                      {cert.issuer} · <span className="text-slate-600">{cert.date}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              Education
            </h3>
            <div className="space-y-4">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.degree}
                  className="flex items-start gap-4 p-4 bg-slate-800/40 border border-slate-700/40 rounded-xl hover:border-sky-400/20 hover:bg-slate-800/60 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 text-xs font-bold flex-shrink-0">
                    {edu.badge}
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium text-sm leading-tight">{edu.degree}</p>
                    <p className="text-slate-500 text-xs mt-1">
                      {edu.school} · <span className="text-slate-600">{edu.location}</span>
                    </p>
                    {edu.note && (
                      <p className="text-slate-600 text-xs mt-1.5 italic leading-relaxed">{edu.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hobbies */}
            <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Outside the Data</p>
              <div className="flex flex-wrap gap-2">
                {['Swimming', 'Biking', 'Running', 'Gardening', 'Volunteering'].map((hobby) => (
                  <span key={hobby} className="text-xs text-slate-400 bg-slate-800 border border-slate-700/50 px-3 py-1 rounded-full">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
