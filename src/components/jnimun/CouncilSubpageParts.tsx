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
  const icons: Record<string, string[]> = {
    anchor: ['M24 7v28', 'M15 16h18', 'M18 35c-6-2.5-10-7-10-13h8', 'M30 35c6-2.5 10-7 10-13h-8', 'M18 35h12'],
    bolt: ['M27 4 12 27h10l-2 17 16-25H25l2-15Z'],
    box: ['M9 16 24 8l15 8-15 8-15-8Z', 'M9 16v17l15 8 15-8V16', 'M24 24v17'],
    camera: ['M9 16h7l3-4h10l3 4h7v22H9V16Z', 'M24 22a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z'],
    clipboard: ['M16 10h16v6H16z', 'M12 13H9v29h30V13h-3', 'M16 24h16M16 31h16'],
    dove: ['M8 27c9-1 15-6 19-16 2 7 7 11 13 14-6 2-12 2-18-1-3 6-8 10-14 12 3-3 4-6 0-9Z', 'M23 23c-4-4-8-6-13-7'],
    globe: ['M24 6a18 18 0 1 0 0 36 18 18 0 0 0 0-36Z', 'M6 24h36', 'M24 6c5 5 7 11 7 18s-2 13-7 18', 'M24 6c-5 5-7 11-7 18s2 13 7 18'],
    hands: ['M9 26 19 16c2-2 5 1 3 3l-5 5', 'M39 26 29 16c-2-2-5 1-3 3l5 5', 'M15 28l7 7c2 2 5 2 7 0l4-4', 'M11 34l6 6M37 34l-6 6'],
    heart: ['M24 39S9 30 9 18.5C9 12.8 12.7 10 16.8 10c3.1 0 5.6 1.8 7.2 4.2C25.6 11.8 28.1 10 31.2 10 35.3 10 39 12.8 39 18.5 39 30 24 39 24 39Z', 'M14 25h6l2.3-5 4.1 10 2.6-5h5'],
    home: ['M8 23 24 10l16 13', 'M13 21v19h22V21', 'M20 40V29h8v11'],
    newspaper: ['M10 12h25v27H10z', 'M35 18h4v21h-4', 'M15 19h14M15 26h14M15 33h8'],
    pen: ['M10 38 13 28 31 10c2-2 5-2 7 0s2 5 0 7L20 35l-10 3Z', 'M27 14l7 7'],
    scales: ['M24 8v30M14 14h20M14 14 8 28h12l-6-14Zm20 0-6 14h12l-6-14ZM18 38h12'],
    shield: ['M24 5 38 10v12c0 9.5-5.6 16.4-14 20-8.4-3.6-14-10.5-14-20V10l14-5Z', 'm19 24 3.2 3.3L30 18.5'],
    target: ['M24 6a18 18 0 1 0 0 36 18 18 0 0 0 0-36Z', 'M24 14a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z', 'M24 21a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z'],
    waves: ['M6 18c4-3 8-3 12 0s8 3 12 0 8-3 12 0', 'M6 28c4-3 8-3 12 0s8 3 12 0 8-3 12 0'],
  }

  const paths = icons[icon]
  if (!paths) return <>{icon}</>

  return (
    <svg viewBox="0 0 48 48" focusable="false">
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  )
}
