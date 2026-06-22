import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './CursorGlow.css'

/**
 * Soft radial neon glow that trails the pointer. Lives behind the page content
 * (portaled to body, below #root). Disabled on touch and reduced-motion.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const el = ref.current
    if (!el) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`)
        el.style.setProperty('--my', `${e.clientY}px`)
        el.style.opacity = '1'
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return createPortal(
    <div ref={ref} className="cursor-glow" aria-hidden="true" />,
    document.body
  )
}
