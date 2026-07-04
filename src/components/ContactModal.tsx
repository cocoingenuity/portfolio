import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { getLenis } from '../lib/lenisStore'
import './ContactModal.css'

const PURPOSES = ['Hiring', 'Freelance project', 'Collaboration', 'Other']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'loading' | 'success' | 'error'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // keep field values across a failed submit so "try again" doesn't wipe them
  const [form, setForm] = useState({
    name: '',
    email: '',
    purpose: '',
    message: '',
    botcheck: false,
  })

  // focus trap + esc + scroll lock while open
  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'button, input, select, textarea, a[href]'
        ) ?? []
      ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null)

    focusables()[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const els = focusables()
      if (els.length === 0) return
      const first = els[0]
      const last = els[els.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !panel?.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !panel?.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    const lenis = getLenis()
    lenis?.stop()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      lenis?.start()
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  // fresh form state every time the modal reopens
  useEffect(() => {
    if (open) {
      setStatus('idle')
      setErrorMsg('')
      setFieldErrors({})
      setForm({ name: '', email: '', purpose: '', message: '', botcheck: false })
    }
  }, [open])

  if (!open) return null

  const set = (key: keyof typeof form) => (value: string | boolean) =>
    setForm(f => ({ ...f, [key]: value }))

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!form.name.trim()) errors.name = 'Please enter your name.'
    if (!form.email.trim()) errors.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(form.email.trim()))
      errors.email = 'That email address doesn’t look valid.'
    if (!form.message.trim()) errors.message = 'Please write a message.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    if (!validate()) return

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
    if (!accessKey) {
      setStatus('error')
      setErrorMsg('The contact form isn’t configured yet (missing VITE_WEB3FORMS_KEY).')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio contact${form.purpose ? ` — ${form.purpose}` : ''}`,
          name: form.name.trim(),
          email: form.email.trim(),
          purpose: form.purpose || 'Not specified',
          message: form.message.trim(),
          botcheck: form.botcheck,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.message || 'Something went wrong on the server.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error — check your connection and try again.')
    }
  }

  const modal = (
    <div
      className="cmodal__overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="cmodal__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cmodal-title"
      >
        <button className="cmodal__close" onClick={onClose} aria-label="close contact form">
          ✕
        </button>

        {status === 'success' ? (
          <div className="cmodal__success" role="status">
            <span className="cmodal__success-mark accent" aria-hidden="true">✓</span>
            <h2 className="cmodal__title" id="cmodal-title">
              Message sent<span className="accent">.</span>
            </h2>
            <p className="cmodal__success-text">
              Message sent, I&apos;ll get back to you soon.
            </p>
            <button className="btn btn--solid" onClick={onClose}>
              <span className="btn__label">close</span>
            </button>
          </div>
        ) : (
          <>
            <p className="cmodal__label mono accent">get in touch</p>
            <h2 className="cmodal__title" id="cmodal-title">
              Send me a message<span className="accent">.</span>
            </h2>

            <form className="cmodal__form" onSubmit={submit} noValidate>
              {/* honeypot — hidden from humans, bots tend to tick it */}
              <input
                type="checkbox"
                name="botcheck"
                className="cmodal__botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                checked={form.botcheck}
                onChange={e => set('botcheck')(e.target.checked)}
              />

              <div className="cmodal__row">
                <div className="cmodal__field">
                  <label className="mono" htmlFor="cmodal-name">name *</label>
                  <input
                    id="cmodal-name"
                    type="text"
                    value={form.name}
                    onChange={e => set('name')(e.target.value)}
                    autoComplete="name"
                    aria-invalid={!!fieldErrors.name}
                  />
                  {fieldErrors.name && <span className="cmodal__error-text">{fieldErrors.name}</span>}
                </div>

                <div className="cmodal__field">
                  <label className="mono" htmlFor="cmodal-email">email *</label>
                  <input
                    id="cmodal-email"
                    type="email"
                    value={form.email}
                    onChange={e => set('email')(e.target.value)}
                    autoComplete="email"
                    aria-invalid={!!fieldErrors.email}
                  />
                  {fieldErrors.email && <span className="cmodal__error-text">{fieldErrors.email}</span>}
                </div>
              </div>

              <div className="cmodal__field">
                <label className="mono" htmlFor="cmodal-purpose">purpose</label>
                <select
                  id="cmodal-purpose"
                  value={form.purpose}
                  onChange={e => set('purpose')(e.target.value)}
                >
                  <option value="">— select —</option>
                  {PURPOSES.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="cmodal__field">
                <label className="mono" htmlFor="cmodal-message">message *</label>
                <textarea
                  id="cmodal-message"
                  rows={5}
                  value={form.message}
                  onChange={e => set('message')(e.target.value)}
                  aria-invalid={!!fieldErrors.message}
                />
                {fieldErrors.message && <span className="cmodal__error-text">{fieldErrors.message}</span>}
              </div>

              {status === 'error' && (
                <div className="cmodal__error" role="alert">
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn--solid btn--lg cmodal__submit"
                disabled={status === 'loading'}
              >
                <span className="btn__label">
                  {status === 'loading' ? (
                    <span className="cmodal__spinner-wrap">
                      <span className="cmodal__spinner" aria-hidden="true" />
                      sending…
                    </span>
                  ) : status === 'error' ? (
                    'try again'
                  ) : (
                    'send message'
                  )}
                </span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
