import { useState, useEffect } from 'react'
import { zoomNavigateTo } from '../lib/zoomTransition'
import './Nav.css'

const links = ['projects', 'about', 'contact']

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (id: string) => {
    setOpen(false)
    zoomNavigateTo(id)
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="/" className="nav__logo" aria-label="home">
          <span className="nav__logo-text">cocoingenuity</span>
        </a>

        <nav className="nav__links" aria-label="primary">
          {links.map(l => (
            <button key={l} className="nav__link" onClick={() => handleLink(l)}>
              <span className="mono nav__link-num">0{links.indexOf(l) + 1}.</span>
              <span className="glitch" data-text={l}>{l}</span>
            </button>
          ))}
        </nav>

        <button
          className={`hamburger ${open ? 'hamburger--open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'close menu' : 'open menu'}
          aria-expanded={open}
        >
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
        </button>
      </div>

      <div className={`nav__mobile ${open ? 'nav__mobile--open' : ''}`} aria-hidden={!open}>
        {links.map((l, i) => (
          <button
            key={l}
            className="nav__mobile-link"
            onClick={() => handleLink(l)}
            style={{ transitionDelay: `${i * 0.06}s` }}
          >
            <span className="mono accent">0{i + 1}.</span> {l}
          </button>
        ))}
      </div>
    </header>
  )
}
