import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import LoadingScreen from './components/LoadingScreen'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Marquee from './components/Marquee'
import CursorGlow from './components/CursorGlow'
import CustomCursor from './components/CustomCursor'
import GeoIntro from './components/GeoIntro'
import { useScrollReveal } from './hooks/useScrollReveal'

const MARQUEE_WORDS = [
  'React',
  'Node',
  'TypeScript',
  'Playwright',
  'PostgreSQL',
  'React Native',
  'Supabase',
  'REST',
]

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const [revealing, setRevealing] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  useScrollReveal()

  return (
    <>
      {/* triangle overlay covers from the first paint; loader stacks above it */}
      {!introDone && (
        <GeoIntro
          ready={loaded}
          onReveal={() => setRevealing(true)}
          onDone={() => setIntroDone(true)}
        />
      )}
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <CursorGlow />
      <CustomCursor />
      <div className={'reveal-stage' + (revealing ? ' is-in' : '')}>
        <Nav />
        <main>
          <Hero />
          <Projects />
          <Marquee words={MARQUEE_WORDS} />
          <Skills />
          <Marquee words={MARQUEE_WORDS} reverse />
          <Contact />
        </main>
      </div>
    </>
  )
}
