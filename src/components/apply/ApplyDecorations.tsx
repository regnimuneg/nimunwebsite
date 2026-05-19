import { jnimun26Asset } from '@/lib/jnimun26Brand'
import styles from '@/styles/Apply.module.scss'

const DECORATIONS = [
  { src: 'bulb.png', className: styles.decoBulb },
  { src: 'megaphone.png', className: styles.decoMegaphone },
  { src: 'big_star.png', className: styles.decoBigStar },
  { src: 'stars.png', className: styles.decoStars },
  { src: 'pigeon.png', className: styles.decoPigeon },
  { src: 'brain.png', className: styles.decoBrain },
  { src: 'exclamation.png', className: styles.decoExclamation },
  { src: 'pencil.png', className: styles.decoPencil },
] as const

/**
 * Renders sticker decorations that are placed inside the form card.
 * They should be rendered as children of the .card element.
 */
export default function ApplyDecorations() {
  return (
    <>
      {DECORATIONS.map((item) => (
        <img
          key={item.src}
          src={jnimun26Asset(item.src)}
          alt=""
          className={`${styles.deco} ${item.className}`}
          loading="lazy"
          aria-hidden="true"
        />
      ))}
    </>
  )
}
