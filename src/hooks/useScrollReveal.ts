import { useEffect } from 'react'

/**
 * Observes every [data-reveal] element and adds `is-visible` when it enters
 * the viewport, driving the fade + translate-up reveal defined in CSS.
 * Honors prefers-reduced-motion by revealing everything immediately.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    )
    if (els.length === 0) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      els.forEach(el => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )

    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}
