import { useEffect, useRef, useState } from 'react'
import './GeoIntro.css'

interface Props {
  /** true once first-load initializing has finished */
  ready: boolean
  /** called the moment the overlay starts fading, so the site can ease in */
  onReveal?: () => void
  /** called after the reveal completes so the parent can unmount this overlay */
  onDone: () => void
}

/**
 * Builds the arrow-triangle tessellation tile as an encoded SVG data URI.
 * Encoding rule: the `#` colors are written once and encoded a single time by
 * encodeURIComponent (no hand-written %23), per the verified generator.
 */
function buildTile(L: number): { url: string; HT: number } {
  const H3 = (L * Math.sqrt(3)) / 2
  const HT = 2 * H3

  let g = ''
  let a = ''

  const cell = (cx: number, cy: number, up: boolean) => {
    const s = L
    const th = (s * Math.sqrt(3)) / 2
    let ax, ay, bx, by, c2x, c2y
    if (up) {
      ax = cx; ay = cy - (2 * th) / 3
      bx = cx + s / 2; by = cy + th / 3
      c2x = cx - s / 2; c2y = cy + th / 3
    } else {
      ax = cx; ay = cy + (2 * th) / 3
      bx = cx + s / 2; by = cy - th / 3
      c2x = cx - s / 2; c2y = cy - th / 3
    }
    g += `M${ax.toFixed(1)},${ay.toFixed(1)} L${bx.toFixed(1)},${by.toFixed(1)} L${c2x.toFixed(1)},${c2y.toFixed(1)} Z`

    const f = 0.46
    const jx = cx + (bx - cx) * f, jy = cy + (by - cy) * f
    const kx = cx + (c2x - cx) * f, ky = cy + (c2y - cy) * f
    const px = cx + (ax - cx) * f, py = cy + (ay - cy) * f
    a += `M${jx.toFixed(1)},${jy.toFixed(1)} L${px.toFixed(1)},${py.toFixed(1)} L${kx.toFixed(1)},${ky.toFixed(1)}`
  }

  let row = -2
  let y = -2 * H3
  while (y < HT + 2 * H3) {
    let col = -2
    let x = -2 * L
    while (x < L + 2 * L) {
      cell(x, y, (row + col) % 2 === 0)
      x += L / 2
      col++
    }
    y += H3
    row++
  }

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${L}' height='${HT.toFixed(1)}' viewBox='0 0 ${L} ${HT.toFixed(1)}'>` +
    `<rect width='${L}' height='${HT.toFixed(1)}' fill='#171717'/>` +
    `<path d='${g}' fill='none' stroke='#1d5e16' stroke-width='1.4' stroke-linejoin='round'/>` +
    `<path d='${a}' fill='none' stroke='#17f700' stroke-width='3' stroke-linejoin='round' stroke-linecap='round'/>` +
    `</svg>`

  return { url: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`, HT }
}

const baseL = () => (window.innerWidth < 640 ? 90 : 130)

export default function GeoIntro({ ready, onReveal, onDone }: Props) {
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const htRef = useRef(225.17)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const onRevealRef = useRef(onReveal)
  onRevealRef.current = onReveal

  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [fading, setFading] = useState(false)

  // paint the pattern + keep the two halves continuous; reapplied on resize
  useEffect(() => {
    const applyPattern = () => {
      const L = baseL()
      const { url, HT } = buildTile(L)
      htRef.current = HT
      const vh = window.innerHeight
      const top = topRef.current
      const bottom = bottomRef.current
      for (const el of [top, bottom]) {
        if (!el) continue
        el.style.backgroundImage = url
        el.style.backgroundSize = `${L}px ${HT.toFixed(2)}px`
      }
      if (top) top.style.backgroundPosition = '0px 0px'
      if (bottom) bottom.style.backgroundPosition = `0px ${(-vh / 2).toFixed(2)}px`
    }

    applyPattern()
    window.addEventListener('resize', applyPattern)

    // slow diagonal drift while covering (skipped under reduced motion)
    if (!reduced) {
      let drift = 0
      const loop = () => {
        drift = (drift + 0.16) % htRef.current
        const x = drift * 0.6
        const vh = window.innerHeight
        if (topRef.current) {
          topRef.current.style.backgroundPosition = `${x.toFixed(2)}px ${drift.toFixed(2)}px`
        }
        if (bottomRef.current) {
          bottomRef.current.style.backgroundPosition = `${x.toFixed(2)}px ${(drift - vh / 2).toFixed(2)}px`
        }
        rafRef.current = requestAnimationFrame(loop)
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', applyPattern)
    }
  }, [reduced])

  // once initializing is done: pause briefly (drift keeps running), then fade out
  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => {
      setFading(true)
      onRevealRef.current?.() // tell the site to begin easing in (cross-fade)
      setTimeout(() => onDoneRef.current(), 700)
    }, 900)
    return () => clearTimeout(t)
  }, [ready])

  return (
    <div
      className={'geo-intro' + (fading ? ' is-fading' : '')}
      aria-hidden="true"
    >
      <div ref={topRef} className="geo-half geo-half--top" />
      <div ref={bottomRef} className="geo-half geo-half--bottom" />
    </div>
  )
}
