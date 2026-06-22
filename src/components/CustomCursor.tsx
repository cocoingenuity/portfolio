import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './CustomCursor.css'

const INTERACTIVE = 'a, button, .contact__method'

/**
 * Custom cursor: an instant solid dot plus a ring that eases behind it.
 * The ring grows and turns neon-green over interactive elements. The OS cursor
 * is kept on touch devices and when reduced motion is requested.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine =
      window.matchMedia('(pointer: fine)').matches &&
      window.matchMedia('(hover: hover)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('has-custom-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      place(dot, mx, my)
    }
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest(INTERACTIVE)
      ring.classList.toggle('cursor-ring--hover', !!hit)
    }
    const onEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    let raf = 0
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      place(ring, rx, ry)
      raf = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return createPortal(
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>,
    document.body
  )
}
