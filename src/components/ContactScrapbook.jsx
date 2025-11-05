import { useState } from 'react'

function Toast({ kind = 'success', text }) {
  if (!text) return null
  return (
    <div
      role="status"
      className={
        'fixed bottom-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm ' +
        (kind === 'success' ? 'bg-green-100 text-slate-900' : 'bg-pink-100 text-slate-900')
      }
    >
      {text}
    </div>
  )
}

export default function ContactScrapbook() {
  const [toast, setToast] = useState({ kind: 'success', text: '' })

  function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      setToast({ kind: 'error', text: 'Please complete the required fields.' })
      setTimeout(() => setToast({ kind: 'error', text: '' }), 2500)
      return
    }
    setToast({ kind: 'success', text: 'Sending your message…' })
    setTimeout(() => {
      setToast({ kind: 'success', text: 'Message sent! I will get back to you soon.' })
      form.reset()
      setTimeout(() => setToast({ kind: 'success', text: '' }), 2500)
    }, 1200)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="mt-16">
      <h2 id="contact-title" className="font-serif text-3xl text-slate-900 mb-6">Contact — Scrapbook</h2>

      <div className="relative p-6 rounded-3xl bg-white shadow-[0_10px_30px_var(--shadow)] border border-pink-100 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -rotate-2 top-6 left-6 bg-[var(--pink)]/40 w-24 h-5 rounded"></div>
        <div aria-hidden className="pointer-events-none absolute rotate-1 bottom-6 right-10 bg-[var(--green)]/50 w-28 h-6 rounded"></div>
        <div aria-hidden className="pointer-events-none absolute -bottom-6 left-10 w-40 h-40 border-4 border-dashed border-pink-200 rounded-full"></div>

        <form onSubmit={onSubmit} className="relative grid md:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <input required type="text" className="mt-1 w-full px-3 py-2 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input required type="email" className="mt-1 w-full px-3 py-2 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone</label>
                <input required type="tel" className="mt-1 w-full px-3 py-2 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Reason</label>
              <select required className="mt-1 w-full px-3 py-2 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300">
                <option value="">Select…</option>
                <option>Project Inquiry</option>
                <option>Collaboration</option>
                <option>Speaking</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Preferred Contact</label>
              <div className="mt-1 flex items-center gap-4">
                <label className="inline-flex items-center gap-2"><input required name="pref" type="radio" /> <span>Email</span></label>
                <label className="inline-flex items-center gap-2"><input name="pref" type="radio" /> <span>Phone</span></label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Message</label>
              <textarea required rows={6} className="mt-1 w-full px-3 py-2 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"></textarea>
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="inline-flex items-center gap-2"><input type="checkbox" /> <span className="text-sm">Subscribe to updates</span></label>
              <input type="file" accept=".pdf,.png,.jpg" className="text-sm" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-5 py-2.5 rounded-full bg-slate-900 text-white shadow hover:shadow-md">Submit</button>
              <button type="reset" className="px-5 py-2.5 rounded-full bg-white border">Reset</button>
            </div>
          </div>
        </form>
      </div>

      <Toast kind={toast.kind} text={toast.text} />
    </section>
  )
}
