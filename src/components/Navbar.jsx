import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Twitter, Sparkles } from 'lucide-react'

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About Me', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Photo Album', id: 'album' },
  { label: 'CV', id: 'cv' },
  { label: 'Blog/Multimedia', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar({ current, onNavigate }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  function handleNavigate(id) {
    onNavigate?.(id)
    setOpen(false)
    try {
      const key = 'navTyped'
      if (!localStorage.getItem(key)) localStorage.setItem(key, '1')
    } catch {}
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 shadow-sm" aria-label="Site header">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-pink-400">🌸</span>
            <button onClick={() => handleNavigate('home')} className="font-semibold tracking-wide text-slate-800">
              Bruna
            </button>
          </div>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNavigate(l.id)}
                className={
                  'relative px-3 py-2 rounded-full text-sm transition focus:outline-none focus:ring-2 focus:ring-pink-300/60 ' +
                  (current === l.id
                    ? 'bg-pink-200 text-slate-900 shadow-sm'
                    : 'hover:bg-pink-50 text-slate-700')
                }
              >
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200">💐</span>
                <span className="inline-flex items-center gap-1">
                  <Sparkles size={14} className="text-pink-300 mr-1 opacity-80" />
                  {l.label}
                </span>
              </button>
            ))}

            <div className="relative" ref={menuRef}>
              <button
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((s) => !s)}
                className="ml-2 px-3 py-2 rounded-full text-sm bg-green-100 text-slate-800 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-green-300/60"
              >
                Explore
              </button>
              {open && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-pink-100 bg-white shadow-xl overflow-hidden"
                >
                  {links.map((l) => (
                    <button
                      role="menuitem"
                      key={l.id}
                      onClick={() => handleNavigate(l.id)}
                      className={
                        'w-full text-left px-4 py-2 text-sm transition ' +
                        (current === l.id
                          ? 'bg-pink-200 text-slate-900'
                          : 'hover:bg-pink-50')
                      }
                      style={{ boxShadow: current === l.id ? '0 0 12px var(--pink)' : 'none' }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <a className="p-2 rounded-full hover:bg-pink-50" href="#" aria-label="GitHub"><Github size={18} /></a>
            <a className="p-2 rounded-full hover:bg-pink-50" href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a className="p-2 rounded-full hover:bg-pink-50" href="#" aria-label="Twitter"><Twitter size={18} /></a>
            <button
              className="md:hidden ml-1 px-3 py-2 rounded-full text-sm bg-green-100 text-slate-800"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
      {/* mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-pink-100" ref={menuRef}>
          <div className="max-w-6xl mx-auto px-4 py-2 grid grid-cols-2 gap-2">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNavigate(l.id)}
                className={
                  'px-3 py-2 rounded-xl text-sm border ' +
                  (current === l.id
                    ? 'bg-pink-200 border-pink-200'
                    : 'hover:bg-pink-50 border-pink-100')
                }
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
