import { useEffect, useState } from 'react'
import './LoadingScreen.css'

interface Props {
  onDone: () => void
}

export default function LoadingScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'typing' | 'reveal' | 'exit'>('typing')
  const label = 'initializing...'
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>

    const tick = (i: number) => {
      if (i <= label.length) {
        setTyped(i)
        t = setTimeout(() => tick(i + 1), 60)
      } else {
        t = setTimeout(() => setPhase('reveal'), 400)
      }
    }

    t = setTimeout(() => tick(0), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase === 'reveal') {
      const t = setTimeout(() => setPhase('exit'), 700)
      return () => clearTimeout(t)
    }
    if (phase === 'exit') {
      const t = setTimeout(onDone, 600)
      return () => clearTimeout(t)
    }
  }, [phase, onDone])

  return (
    <div className={`loader ${phase === 'exit' ? 'loader--exit' : ''}`}>
      <div className="loader__grid" aria-hidden="true" />
      <div className="loader__content">
        <span className="loader__mono mono">
          {label.slice(0, typed)}
          <span className="loader__cursor" />
        </span>
      </div>
    </div>
  )
}
