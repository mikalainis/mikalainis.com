import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
export default function Home() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <Navigation />
      <Hero />
      <Skills />
      <Timeline />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
