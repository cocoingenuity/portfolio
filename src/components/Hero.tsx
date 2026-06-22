import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__inner">
        <div className="hero__eyebrow mono">
          <span className="accent">▶</span> frontend &amp; fullstack developer
        </div>

        <h1 className="hero__name">
          Ningyi<span className="accent">.</span>
        </h1>

        <p className="hero__tagline">
Building fast, clean digital experiences<br />
          that feel as good as they look.
        </p>

        <div className="hero__slogan">
          <span className="hero__slogan-line hero__slogan-line--solid">FAST.</span>
          <span className="hero__slogan-line hero__slogan-line--light">CLEAN.</span>
          <span className="hero__slogan-line hero__slogan-line--outline">SHARP.</span>
        </div>

        <div className="hero__actions">
          <button
            className="btn btn--solid btn--lg"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            see my work
          </button>
          <button
            className="btn btn--outline btn--lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            get in touch
          </button>
        </div>

        <div className="hero__scroll-hint" aria-hidden="true">
          <span className="hero__scroll-line" />
          <span className="mono" style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}>scroll</span>
        </div>
      </div>

      {/* original floating wireframe cube, built from our grid + green motif */}
      <div className="hero__cube" aria-hidden="true">
        <div className="cube">
          <span className="cube__face cube__face--front" />
          <span className="cube__face cube__face--back" />
          <span className="cube__face cube__face--right" />
          <span className="cube__face cube__face--left" />
          <span className="cube__face cube__face--top" />
          <span className="cube__face cube__face--bottom" />
        </div>
      </div>
    </section>
  )
}
