import { useState } from 'react'
import type { CSSProperties } from 'react'
import CharReveal from './CharReveal'
import ContactModal from './ContactModal'
import './Contact.css'

const EMAIL = 'ningyi.wang.ca@gmail.com'

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="section contact" id="contact">
      <p className="section-label" data-reveal>
        <span className="glitch" data-text="get in touch">get in touch</span>
      </p>

      <div className="contact__panel">
        <div className="contact__inner">
          <h2 className="contact__heading" data-char-reveal>
            <CharReveal text="Let's build" /><br />
            <CharReveal text="something great." className="accent" startIndex={11} />
          </h2>
          <p className="contact__sub" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
            Open to new opportunities, freelance projects, and interesting
            conversations. Drop me a line and I'll get back within 24 hours.
          </p>

          <div className="contact__methods" data-reveal style={{ '--reveal-i': 2 } as CSSProperties}>
            <button
              type="button"
              className="btn btn--solid btn--lg"
              onClick={() => setModalOpen(true)}
            >
              <span className="btn__label">send a message</span>
            </button>

            <a href={`mailto:${EMAIL}`} className="contact__method">
              <span className="contact__method-label mono accent">email</span>
              <span className="contact__method-value">{EMAIL}</span>
            </a>

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

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
