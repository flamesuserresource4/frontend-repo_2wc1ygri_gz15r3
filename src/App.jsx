import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MagicBook from './components/MagicBook'
import ContactScrapbook from './components/ContactScrapbook'

// Soft pastel variables via Tailwind inline style hook
const rootVars = {
  '--pink': '#ffdce8',
  '--green': '#d9f4e2',
  '--white': '#ffffff',
  '--ink': '#2a2a2a',
  '--shadow': 'rgba(0,0,0,.08)'
}

export default function App() {
  const [current, setCurrent] = useState('home')

  useEffect(() => {
    const handler = () => {
      const sections = ['home','about','projects','album','cv','blog','contact']
      let at = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) { at = id; break }
      }
      setCurrent(at)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navigateTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={rootVars as React.CSSProperties} className="min-h-screen bg-[var(--white)] text-[var(--ink)]">
      <Navbar current={current} onNavigate={navigateTo} />

      <main className="max-w-6xl mx-auto px-4 py-8" aria-label="Main content">
        <Hero onViewProjects={() => navigateTo('projects')} onContact={() => navigateTo('contact')} />

        {/* About */}
        <section id="about" aria-labelledby="about-title" className="mt-16">
          <h2 id="about-title" className="font-serif text-3xl text-slate-900 mb-6">About Me</h2>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="bg-white rounded-3xl shadow-[0_10px_30px_var(--shadow)] p-6 border border-pink-100">
              <p className="text-slate-700">I’m Bruna, a developer & designer crafting delightful experiences. I enjoy creating interfaces that feel soft, calm, and friendly while staying accessible and performant.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Flutter','Python','C++','AI/ML','Figma','Accessibility'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-sm bg-green-100 text-slate-800">{tag}</span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[var(--pink)]/50 to-[var(--green)]/50 rounded-3xl p-6 border border-pink-100">
              <div className="aspect-[3/4] rounded-[2rem] bg-white shadow-[0_10px_30px_var(--shadow)] flex items-center justify-center">
                <span className="text-6xl" aria-hidden>🌷</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">Portrait placeholder with oval frame.</p>
            </div>
          </div>
        </section>

        <MagicBook />

        {/* Album */}
        <section id="album" aria-labelledby="album-title" className="mt-16">
          <h2 id="album-title" className="font-serif text-3xl text-slate-900 mb-6">Photo Album</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <figure key={i} className="overflow-hidden rounded-2xl shadow-[0_10px_30px_var(--shadow)] ring-1 ring-pink-100">
                <img
                  src={`https://picsum.photos/seed/pastel-${i}/600/400`}
                  alt="Album item"
                  className="w-full h-40 md:h-44 object-cover hover:scale-105 transition"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>

        {/* CV */}
        <section id="cv" aria-labelledby="cv-title" className="mt-16">
          <h2 id="cv-title" className="font-serif text-3xl text-slate-900 mb-6">CV</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[{t:'Experience',d:'Frontend Developer — 2022–Present'},{t:'Education',d:'B.Sc. in Design & CS'},{t:'Skills',d:'React, Flutter, Python, C++, Figma'}].map((c) => (
              <div key={c.t} className="bg-white rounded-2xl p-5 border border-pink-100 shadow-[0_10px_30px_var(--shadow)]">
                <h3 className="font-semibold">{c.t}</h3>
                <p className="text-slate-700 mt-2 text-sm">{c.d}</p>
                <button className="mt-3 text-sm px-3 py-1.5 rounded-full bg-pink-100">View</button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900 text-white" href="#">Download PDF</a>
          </div>
        </section>

        {/* Blog */}
        <section id="blog" aria-labelledby="blog-title" className="mt-16">
          <h2 id="blog-title" className="font-serif text-3xl text-slate-900 mb-6">Blog / Multimedia</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[1,2,3].map(i => (
              <article key={i} className="bg-white rounded-2xl p-5 border border-pink-100 shadow-[0_10px_30px_var(--shadow)]">
                <h3 className="font-semibold">Post {i}</h3>
                <p className="text-slate-700 mt-2 text-sm">Short thoughts on design, code, and calm interfaces.</p>
                <a href="#" className="mt-3 inline-block text-sm underline">Read more</a>
              </article>
            ))}
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            <div className="aspect-video rounded-2xl overflow-hidden ring-1 ring-pink-100">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden ring-1 ring-pink-100">
              <iframe className="w-full h-full" loading="lazy" title="Map" src="https://www.google.com/maps?q=Seoul&output=embed"></iframe>
            </div>
            <div className="rounded-2xl overflow-hidden ring-1 ring-pink-100 p-4 bg-white">
              <p className="text-slate-700 text-sm">Schedule</p>
              <ul className="mt-2 text-sm list-disc pl-5 text-slate-700">
                <li>Mon: Design sprint</li>
                <li>Wed: Dev stream</li>
                <li>Fri: Photo walk</li>
              </ul>
            </div>
          </div>
        </section>

        <ContactScrapbook />
      </main>

      <footer className="mt-20 border-t border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Bruna. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#projects" className="underline">Projects</a>
            <a href="#album" className="underline">Album</a>
            <a href="#contact" className="underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
