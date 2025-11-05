import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'

const sampleProjects = [
  {
    id: 'ai-reader',
    title: 'AI Reader',
    tags: ['Python', 'AI/ML'],
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    desc: 'An intelligent document parser with summarization and Q&A.',
    links: { github: '#', live: '#', figma: '#' },
  },
  {
    id: 'flutter-garden',
    title: 'Flutter Garden',
    tags: ['Flutter', 'Mobile'],
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    desc: 'A plant care tracker with reminders and AR plant placement.',
    links: { github: '#', live: '#', figma: '#' },
  },
  {
    id: 'cover-designs',
    title: 'Book Cover Designs',
    tags: ['Book Cover Design', 'Branding'],
    img: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?q=80&w=1200&auto=format&fit=crop',
    desc: 'A set of minimalist literary cover designs inspired by florals.',
    links: { github: '#', live: '#', figma: '#' },
  },
  {
    id: 'cpp-visualizer',
    title: 'C++ Visualizer',
    tags: ['C++', 'Visualization'],
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
    desc: 'Interactive visualizer for STL containers and algorithms.',
    links: { github: '#', live: '#', figma: '#' },
  },
  {
    id: 'studio-portfolio',
    title: 'Studio Portfolio',
    tags: ['Web', 'Design'],
    img: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200&auto=format&fit=crop',
    desc: 'Responsive portfolio with a “magic book” showcase.',
    links: { github: '#', live: '#', figma: '#' },
  },
]

export default function MagicBook() {
  const [active, setActive] = useState(null)
  const [pageTurn, setPageTurn] = useState('') // '', 'next', 'prev'

  const currentIndex = useMemo(() =>
    active ? sampleProjects.findIndex(p => p.id === active) : -1
  , [active])

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace('#', ''))
    if (hash) setActive(hash)
  }, [])

  function openProject(id) {
    setActive(id)
    window.location.hash = id
  }
  function next() {
    if (currentIndex < sampleProjects.length - 1) {
      setPageTurn('next')
      setTimeout(() => openProject(sampleProjects[currentIndex + 1].id), 200)
      setTimeout(() => setPageTurn(''), 400)
    }
  }
  function prev() {
    if (currentIndex > 0) {
      setPageTurn('prev')
      setTimeout(() => openProject(sampleProjects[currentIndex - 1].id), 200)
      setTimeout(() => setPageTurn(''), 400)
    }
  }

  const project = active ? sampleProjects.find(p => p.id === active) : null

  return (
    <section id="projects" aria-labelledby="projects-title" className="mt-16">
      <h2 id="projects-title" className="font-serif text-3xl text-slate-900 mb-6">Projects — Magic Book</h2>

      <div className="relative grid md:grid-cols-2 gap-6">
        {/* Left page: TOC */}
        <div className="bg-white rounded-2xl shadow-[0_10px_30px_var(--shadow)] p-5 border border-pink-100">
          <h3 className="font-serif text-xl mb-3">Table of Contents</h3>
          <ul role="list" className="space-y-2" aria-label="Chapters">
            {sampleProjects.map((p, idx) => (
              <li key={p.id}>
                <button
                  onClick={() => openProject(p.id)}
                  className={
                    'w-full text-left px-3 py-2 rounded-lg transition border ' +
                    (active === p.id
                      ? 'bg-pink-100/70 border-pink-200 shadow-sm'
                      : 'hover:bg-pink-50 border-pink-100')
                  }
                  aria-current={active === p.id ? 'true' : undefined}
                >
                  <span className="text-slate-700">{idx + 1}. {p.title}</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {p.tags.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-slate-700"
                      >{t}</span>
                    ))}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right page: Project viewer */}
        <div className="relative">
          <div
            className={
              'bg-white rounded-2xl shadow-[0_10px_30px_var(--shadow)] p-5 border border-green-100 transform transition-transform duration-300 origin-left ' +
              (pageTurn === 'next' ? 'rotate-y-12' : pageTurn === 'prev' ? '-rotate-y-12' : '')
            }
            style={{ perspective: '1000px' }}
            aria-live="polite"
          >
            {!project ? (
              <div className="text-center py-16">
                <p className="text-slate-600">Select a chapter to view the project.</p>
              </div>
            ) : (
              <div>
                <div className="aspect-video w-full overflow-hidden rounded-lg ring-1 ring-pink-100">
                  <img src={project.img} alt="Project preview" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="mt-4 font-serif text-2xl text-slate-900">{project.title}</h3>
                <p className="mt-2 text-slate-700">{project.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-pink-100 text-slate-800">{t}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <a className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900 text-white text-sm" href={project.links.github}><Github size={16}/>Code</a>
                  <a className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border text-sm" href={project.links.live}><ExternalLink size={16}/>Live</a>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button onClick={() => setActive(null)} className="text-sm underline text-slate-600 hover:text-slate-900">Back to TOC</button>
            <div className="flex gap-2">
              <button onClick={prev} disabled={currentIndex <= 0} className="px-3 py-2 rounded-full bg-white border disabled:opacity-40"><ChevronLeft size={18}/></button>
              <button onClick={next} disabled={currentIndex === sampleProjects.length - 1} className="px-3 py-2 rounded-full bg-white border disabled:opacity-40"><ChevronRight size={18}/></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
