import { useState } from 'react'
import './Contact.css'

const EMAIL = 'ningyi.wang.ca@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      // fallback for contexts without the async clipboard API
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* ignore */ }
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="section contact" id="contact">
      <p className="section-label">get in touch</p>

      <div className="contact__panel">
        <div className="contact__inner">
          <h2 className="contact__heading">
            Let's build<br />
            <span className="accent">something great.</span>
          </h2>
          <p className="contact__sub">
            Open to new opportunities, freelance projects, and interesting
            conversations. Drop me a line and I'll get back within 24 hours.
          </p>

          <div className="contact__methods">
            <button
              type="button"
              className="contact__method"
              onClick={copyEmail}
              aria-label={`Copy email address ${EMAIL} to clipboard`}
            >
              <span className="contact__method-label mono accent">email</span>
              <span
                className={
                  'contact__method-value' +
                  (copied ? ' contact__method-value--copied' : '')
                }
              >
                {copied ? 'copied ✓' : EMAIL}
              </span>
            </button>

            <a
              href="https://github.com/cocoingenuity"
              className="contact__method"
              target="_blank"
              rel="noopener"
            >
              <span className="contact__method-label mono accent">github</span>
              <span className="contact__method-value">github.com/cocoingenuity</span>
            </a>
          </div>
        </div>

        <div className="contact__decoration" aria-hidden="true">
          <div className="contact__grid-box" />
        </div>
      </div>

      <footer className="contact__footer">
        <span className="mono" style={{ fontSize: '0.75rem', opacity: 0.35 }}>
          © {new Date().getFullYear()} cocoingenuity
        </span>
      </footer>
    </section>
  )
}
