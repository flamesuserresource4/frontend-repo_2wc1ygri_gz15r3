import { useEffect, useRef, useState } from 'react'

function useTypewriter(text, speed = 40, start = true) {
  const [output, setOutput] = useState('')
  const iRef = useRef(0)
  useEffect(() => {
    if (!start) return
    setOutput('')
    iRef.current = 0
    const id = setInterval(() => {
      setOutput((prev) => prev + text.charAt(iRef.current))
      iRef.current++
      if (iRef.current >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, start])
  return output
}

export default function Hero({ onViewProjects, onContact }) {
  const [start, setStart] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setStart(true), 400)
    return () => clearTimeout(t)
  }, [])
  const typed = useTypewriter("Hi, I’m Bruna — developer & designer.", 28, start)

  return (
    <section id="home" className="relative">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--pink)] to-[var(--green)] p-6 md:p-10 shadow-xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex items-center justify-center md:justify-start">
            <div className="w-44 h-44 md:w-64 md:h-64 rounded-full bg-white/80 shadow-lg flex items-center justify-center">
              <span className="text-6xl md:text-7xl" aria-hidden>💐</span>
            </div>
          </div>
          <div className="text-slate-800">
            <h1 className="text-3xl md:text-5xl font-serif leading-tight">
              {typed}
              <span className="align-bottom animate-pulse">▌</span>
            </h1>
            <p className="mt-4 text-slate-700">
              I build human-centered experiences with a soft, elegant aesthetic.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={onViewProjects} className="px-5 py-2.5 rounded-full bg-white text-slate-900 shadow hover:shadow-md">
                View Projects
              </button>
              <button onClick={onContact} className="px-5 py-2.5 rounded-full bg-slate-900 text-white shadow hover:shadow-md">
                Contact Me
              </button>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/50"></div>
      </div>
    </section>
  )
}
