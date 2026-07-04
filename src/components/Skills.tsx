import type { CSSProperties } from 'react'
import CharReveal from './CharReveal'
import './Skills.css'

const categories = [
  {
    label: 'languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'PHP', 'SQL', 'HTML/CSS'],
  },
  {
    label: 'frameworks & web',
    items: ['React', 'React Native', 'Node.js', 'Express.js', 'Playwright', 'REST API', 'Responsive Design'],
  },
  {
    label: 'databases',
    items: ['PostgreSQL (Supabase)', 'MongoDB', 'MySQL', 'SQL Server', 'SQLite', 'Oracle'],
  },
  {
    label: 'tools',
    items: ['Git', 'npm', 'Bash/Shell', 'PowerShell', 'Power BI'],
  },
  {
    label: 'os',
    items: ['Linux', 'Windows', 'macOS', 'Android', 'iOS'],
  },
]

export default function Skills() {
  return (
    <section className="section" id="about">
      <p className="section-label" data-reveal>
        <span className="glitch" data-text="about & skills">about &amp; skills</span>
      </p>

      <div className="about__layout">
        <div className="about__bio" data-reveal style={{ '--reveal-i': 0 } as CSSProperties}>
          <h2 className="about__heading" data-char-reveal>
            <CharReveal text="I turn ideas into" /><br />
            <CharReveal text="products." className="accent" startIndex={17} />
          </h2>
          <p className="about__text">
            Full-stack developer building across web and mobile, from React and
            React Native interfaces down to the APIs and databases behind them. I
            care about performance, accessibility, and the kind of polish that
            makes people notice without knowing why.
          </p>
          <p className="about__text">
            When I'm not shipping features I'm experimenting with AI tooling,
            exploring new rendering patterns, and helping teams move faster
            without cutting corners.
          </p>
        </div>

        <div className="skills__grid" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
          {categories.map(cat => (
            <div className="skills__category" key={cat.label}>
              <span className="skills__cat-label mono accent">{cat.label}</span>
              <ul className="skills__list">
                {cat.items.map(item => (
                  <li key={item} className="skills__item">
                    <span className="skills__dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
