'use client'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-sky-400 flex items-center justify-center text-slate-900 font-bold text-sm group-hover:bg-sky-300 transition-colors">
            PM
          </div>
          <span className="text-slate-200 font-semibold hidden sm:block tracking-tight">
            Paulius Mikalainis
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-sky-400 transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/tools/resume-builder"
            className="bg-sky-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-sky-300 transition-all hover:shadow-lg hover:shadow-sky-400/20"
          >
            Resume Builder
          </a>
          <a
            href="mailto:pmikalainis@gmail.com"
            className="bg-slate-50 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 transition-all hover:shadow-lg hover:shadow-slate-400/20"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-slate-100 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-800">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-sky-400 transition-colors py-3 text-sm font-medium border-b border-slate-800/60 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/tools/resume-builder"
              target="_blank"
              rel="noreferrer"
              className="mt-3 bg-sky-400 text-slate-900 px-4 py-3 rounded-lg text-sm font-bold text-center hover:bg-sky-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Resume Builder
            </a>
            <a
              href="mailto:pmikalainis@gmail.com"
              className="mt-3 bg-slate-50 text-slate-900 px-4 py-3 rounded-lg text-sm font-bold text-center hover:bg-slate-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
