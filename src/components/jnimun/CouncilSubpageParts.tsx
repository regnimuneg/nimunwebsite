import type { ReactNode } from 'react'
import type { CouncilPillar } from '@/types/jnimunCouncil'
import styles from '@/styles/JNIMUNSubpage.module.scss'

export type TitlePartColor = 'black' | 'pink' | 'blue' | 'yellow'

export const titleColorClass = {
  black: styles.titleBlack ?? '',
  pink: styles.titlePink ?? '',
  blue: styles.titleBlue ?? '',
  yellow: styles.titleYellow ?? '',
} satisfies Record<TitlePartColor, string>

interface DescriptionWithHighlightsProps {
  text: string
  highlights: string[]
}

export function DescriptionWithHighlights({ text, highlights }: DescriptionWithHighlightsProps) {
  if (!highlights.length) return <>{text}</>

  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join('|')})`, 'gi')
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = highlights.some((h) => h.toLowerCase() === part.toLowerCase())
        if (isHighlight) {
          return (
            <mark key={`${part}-${i}`} className={styles.descHighlight}>
              {part}
            </mark>
          )
        }
        return <span key={`${part}-${i}`}>{part}</span>
      })}
    </>
  )
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

interface HandDrawnNameOvalProps {
  children: ReactNode
}

export function HandDrawnNameOval({ children }: HandDrawnNameOvalProps) {
  return (
    <span className={styles.nameOvalWrap}>
      <svg className={styles.nameOvalSvg} viewBox="0 0 200 56" preserveAspectRatio="none" aria-hidden>
        <ellipse cx="100" cy="28" rx="94" ry="24" fill="none" stroke="currentColor" strokeWidth="3.5" />
      </svg>
      <span className={styles.nameOvalText}>{children}</span>
    </span>
  )
}

interface CouncilPillarsNoteProps {
  pillars: CouncilPillar[]
}

export function CouncilPillarsNote({ pillars }: CouncilPillarsNoteProps) {
  return (
    <div className={styles.pillarsNote}>
      <ul className={styles.pillarsList}>
        {pillars.map((pillar) => (
          <li key={pillar.label} className={styles.pillarItem}>
            <span className={styles.pillarIcon} aria-hidden>
              {pillar.icon}
            </span>
            <span className={styles.pillarLabel}>{pillar.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
