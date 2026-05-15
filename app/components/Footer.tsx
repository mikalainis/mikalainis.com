export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-sky-400 flex items-center justify-center text-slate-900 font-bold text-xs">
            PM
          </div>
          <span className="text-slate-500 text-sm">Paulius Mikalainis</span>
        </div>
        <p className="text-slate-600 text-xs">
          © {year} · Built with Next.js & Tailwind CSS · Deployed on Vercel
        </p>
        <div className="flex gap-4">
          <a href="https://linkedin.com/in/pmikalainis" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-sky-400 transition-colors text-xs">
            LinkedIn
          </a>
          <a href="https://github.com/mikalainis" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-sky-400 transition-colors text-xs">
            GitHub
          </a>
          <a href="mailto:pmikalainis@gmail.com" className="text-slate-600 hover:text-sky-400 transition-colors text-xs">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
