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
          const highlightKey = part.toLowerCase().replace(/[^a-z0-9]+/g, '_')
          const highlightClass = styles[`descHighlight_${highlightKey}` as keyof typeof styles] ?? ''
          return (
            <mark key={`${part}-${i}`} className={`${styles.descHighlight} ${highlightClass}`}>
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
              <PillarIcon icon={pillar.icon} />
            </span>
            <span className={styles.pillarLabel}>{pillar.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PillarIcon({ icon }: { icon: string }) {
  if (icon === 'shield') {
    return (
      <svg viewBox="0 0 48 48" focusable="false">
        <path d="M24 5 38 10v12c0 9.5-5.6 16.4-14 20-8.4-3.6-14-10.5-14-20V10l14-5Z" />
        <path d="m19 24 3.2 3.3L30 18.5" />
      </svg>
    )
  }

  if (icon === 'scales') {
    return (
      <svg viewBox="0 0 48 48" focusable="false">
        <path d="M24 8v30M14 14h20M14 14 8 28h12l-6-14Zm20 0-6 14h12l-6-14ZM18 38h12" />
      </svg>
    )
  }

  if (icon === 'heart') {
    return (
      <svg viewBox="0 0 48 48" focusable="false">
        <path d="M24 39S9 30 9 18.5C9 12.8 12.7 10 16.8 10c3.1 0 5.6 1.8 7.2 4.2C25.6 11.8 28.1 10 31.2 10 35.3 10 39 12.8 39 18.5 39 30 24 39 24 39Z" />
        <path d="M14 25h6l2.3-5 4.1 10 2.6-5h5" />
      </svg>
    )
  }

  return <>{icon}</>
}
