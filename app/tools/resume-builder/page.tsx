import JobSearch from '@/app/components/job-search/JobSearch'
import ApiKeySettings from '@/app/components/job-search/ApiKeySettings'
import AuthGuard from '@/app/components/job-search/AuthGuard'

export const metadata = {
  title: 'Tools | Paulius Mikalainis',
}

export default function ResumeBuilderPage() {
  return (
    <AuthGuard>
      <main className="bg-slate-900 min-h-screen">
        {/* Page header */}
        <div className="max-w-4xl mx-auto px-4 pt-12 pb-2">
          <div className="mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Portfolio
            </a>
          </div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div>
              <p className="text-sky-400 text-xs font-bold tracking-widest uppercase mb-2">Tools</p>
              <h1 className="text-3xl font-bold text-slate-100">Career Tools</h1>
            </div>
            <a
              href="/tools/resume-builder.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-400 text-slate-900 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-sky-300 transition-all duration-200 hover:shadow-lg hover:shadow-sky-400/25 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Open Resume Builder
            </a>
          </div>
          <div className="w-12 h-0.5 bg-sky-400 mt-4" />
        </div>

        {/* AI Settings — shared key used by Job Search and Resume Builder */}
        <ApiKeySettings />

        {/* AI Job Search */}
        <JobSearch />
      </main>
    </AuthGuard>
  )
}

