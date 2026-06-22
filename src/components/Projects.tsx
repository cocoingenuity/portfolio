import type { CSSProperties } from 'react'
import './Projects.css'

export default function Projects() {
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

          <div className="browser-mockup" role="img" aria-label="HireTrack web app screenshot">
            <div className="browser-mockup__bar" aria-hidden="true">
              <span className="browser-mockup__dot" />
              <span className="browser-mockup__dot" />
              <span className="browser-mockup__dot" />
            </div>
            <img
              src="/projects/hiretrack-match.png"
              alt="HireTrack dashboard showing job match scores and application pipeline"
              loading="lazy"
              className="browser-mockup__img"
            />
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
