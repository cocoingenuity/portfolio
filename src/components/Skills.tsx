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
      <p className="section-label">about &amp; skills</p>

      <div className="about__layout">
        <div className="about__bio">
          <h2 className="about__heading">
            I build things<br />
            <span className="accent">for the web.</span>
          </h2>
          <p className="about__text">
            Fullstack developer with a focus on the frontend, the place where
            design and code meet users. I care about performance, accessibility,
            and the kind of polish that makes people notice without knowing why.
          </p>
          <p className="about__text">
            When I'm not shipping features I'm experimenting with AI tooling,
            exploring new rendering patterns, and helping teams move faster
            without cutting corners.
          </p>
        </div>

        <div className="skills__grid">
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
