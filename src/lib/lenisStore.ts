import type Lenis from 'lenis'

/**
 * Module-level holder for the single Lenis instance created in App, so
 * navigation (zoom transitions) and the contact modal (scroll lock) can
 * reach it without prop-drilling through the tree.
 */
let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function getLenis() {
  return lenis
}
