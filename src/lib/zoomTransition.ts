import { getLenis } from './lenisStore'

/** Durations must match the view-zoom-out / view-zoom-in keyframes in global.css. */
const OUT_MS = 380
const IN_MS = 480

let navigating = false

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Restarts the staggered per-character headline reveal inside `root`,
 * so the heading plays again when a section is re-entered via a zoom
 * transition. No-op under reduced motion (headings stay settled).
 */
export function replayCharReveal(root: HTMLElement | null) {
  if (!root || prefersReducedMotion()) return
  root.querySelectorAll<HTMLElement>('[data-char-reveal].is-visible').forEach(el => {
    el.classList.remove('is-visible')
    void el.offsetWidth // flush so the animation restarts
    el.classList.add('is-visible')
  })
}

/**
 * Zoom-blur section switch: the current view scales up and blurs out,
 * we jump straight to the target section, then the new view settles in
 * from a slightly zoomed-out, blurred state.
 */
export function zoomNavigateTo(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  const lenis = getLenis()
  const jump = () => {
    if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
    else target.scrollIntoView()
  }

  const stage = document.querySelector<HTMLElement>('main')
  if (prefersReducedMotion() || !stage) {
    jump()
    return
  }

  if (navigating) return
  navigating = true
  lenis?.stop()

  // scale/blur around the middle of what's currently on screen, not the
  // middle of the whole scrollable page
  const viewportCenter = () => `50% ${window.scrollY + window.innerHeight / 2}px`

  stage.style.transformOrigin = viewportCenter()
  stage.classList.add('zoom-out')

  window.setTimeout(() => {
    jump()
    stage.style.transformOrigin = viewportCenter()
    stage.classList.remove('zoom-out')
    void stage.offsetWidth // restart animations cleanly between out and in
    stage.classList.add('zoom-in')
    replayCharReveal(target)

    window.setTimeout(() => {
      stage.classList.remove('zoom-in')
      stage.style.transformOrigin = ''
      lenis?.start()
      navigating = false
    }, IN_MS)
  }, OUT_MS)
}
