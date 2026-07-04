import type { CSSProperties } from 'react'

interface CharRevealProps {
  text: string
  /** Continues the stagger count when a heading is built from several parts. */
  startIndex?: number
  className?: string
}

/**
 * Splits text into per-character spans for the staggered headline reveal
 * (translateY 110% -> 0, driven by CSS on `[data-char-reveal].is-visible`).
 * Words stay in inline-block wrappers so line wrapping is unaffected, and
 * the split copy is aria-hidden with a screen-reader-only duplicate.
 */
export default function CharReveal({ text, startIndex = 0, className }: CharRevealProps) {
  const words = text.split(' ')
  let charIndex = startIndex

  return (
    <>
      <span className={className} aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            <span className="char-word">
              {Array.from(word).map((char, c) => (
                <span
                  key={c}
                  className="char"
                  style={{ '--char-i': charIndex++ } as CSSProperties}
                >
                  {char}
                </span>
              ))}
            </span>
            {w < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </>
  )
}
