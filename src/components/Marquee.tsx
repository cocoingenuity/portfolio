import './Marquee.css'

interface MarqueeProps {
  words: string[]
  reverse?: boolean
}

/**
 * Seamless infinite marquee. The word list is duplicated so a -50% translate
 * loops without a visible seam. Alternating words render solid / outline.
 * Pauses on hover (see CSS).
 */
export default function Marquee({ words, reverse = false }: MarqueeProps) {
  const sequence = [...words, ...words]

  return (
    <div
      className={`marquee${reverse ? ' marquee--reverse' : ''}`}
      aria-hidden="true"
    >
      <div className="marquee__track">
        {sequence.map((word, i) => (
          <span
            key={i}
            className={`marquee__word${
              i % 2 ? ' marquee__word--outline' : ''
            }`}
          >
            {word}
            <span className="marquee__sep">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
