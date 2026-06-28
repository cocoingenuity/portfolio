import { useEffect, useRef, type CSSProperties } from 'react'
import './Projects.css'

const DEMO_W = 1280

export default function Projects() {
  const demoWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = demoWrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      el.style.setProperty('--scale', String(entry.contentRect.width / DEMO_W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="section" id="projects">
      <p className="section-label" data-reveal>
        <span className="glitch" data-text="selected work">selected work</span>
      </p>

      <div className="projects__list">

        {/* ── OttaWay ── */}
        <article className="project-card" data-reveal style={{ '--reveal-i': 0 } as CSSProperties}>
          <div className="project-card__body">
            <div className="project-card__header">
              <span className="mono project-card__num accent">01</span>
              <span className="project-card__badge mono">wip</span>
            </div>
            <h3 className="project-card__title">OttaWay</h3>
            <p className="project-card__desc">
              A smart travel companion app that helps users discover and plan
              itineraries for Ottawa. Powered by DeepSeek AI for personalised
              recommendations, with real-time sync via Supabase.
            </p>
            <ul className="project-card__stack" aria-label="tech stack">
              {['React Native', 'Supabase', 'DeepSeek', 'TypeScript'].map(t => (
                <li key={t} className="project-card__tag mono">{t}</li>
              ))}
            </ul>
          </div>

          <div className="phones-row" role="img" aria-label="OttaWay app screenshots">
            <div className="phone-wrap">
              <img
                src="/projects/ottaway-scenery.png"
                alt="OttaWay scenery discovery screen showing Rideau Canal"
                loading="lazy"
                className="phone-img"
              />
            </div>
            <div className="phone-wrap">
              <img
                src="/projects/ottaway-dining.png"
                alt="OttaWay dining screen listing top Ottawa restaurants"
                loading="lazy"
                className="phone-img"
              />
            </div>
            <div className="phone-wrap">
              <img
                src="/projects/ottaway-events.png"
                alt="OttaWay events screen showing upcoming Ottawa events"
                loading="lazy"
                className="phone-img"
              />
            </div>
          </div>
        </article>

        {/* ── HireTrack ── */}
        <article className="project-card" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
          <div className="project-card__body">
            <div className="project-card__header">
              <span className="mono project-card__num accent">02</span>
            </div>
            <h3 className="project-card__title">HireTrack</h3>
            <p className="project-card__desc">
              Automated job-application tracking tool. Scrapes job boards with
              Playwright, enriches listings with LLM analysis, and stores
              everything in a queryable Node.js + PostgreSQL pipeline.
            </p>
            <ul className="project-card__stack" aria-label="tech stack">
              {['Node.js', 'Playwright', 'LLM', 'PostgreSQL'].map(t => (
                <li key={t} className="project-card__tag mono">{t}</li>
              ))}
            </ul>
          </div>

          <div className="browser-mockup">
            <div className="browser-mockup__bar" aria-hidden="true">
              <span className="browser-mockup__dot" />
              <span className="browser-mockup__dot" />
              <span className="browser-mockup__dot" />
              <span className="browser-mockup__bar-spacer" />
              <span className="browser-mockup__live-badge">interactive</span>
              <a
                href="/HireTrack-demo.html"
                target="_blank"
                rel="noopener noreferrer"
                className="browser-mockup__fullscreen-link"
                aria-label="Open HireTrack demo fullscreen"
              >↗</a>
            </div>
            <div className="browser-mockup__scale-wrap" ref={demoWrapRef}>
              <iframe
                src="/HireTrack-demo.html"
                title="HireTrack interactive demo"
                loading="lazy"
                className="browser-mockup__iframe"
                tabIndex={-1}
              />
            </div>
          </div>
        </article>

      </div>

      <div className="project-card project-card--ghost" data-reveal style={{ '--reveal-i': 2 } as CSSProperties} aria-hidden="true">
        <span className="mono accent" style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          more coming soon
        </span>
      </div>
    </section>
  )
}
