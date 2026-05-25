import styles from '@/styles/jnimun/JNIMUNStats.module.scss'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatItem {
  number: string
  label: string
  suffix?: string
  color: string
}

export default function JNIMUNStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const stats: StatItem[] = [
    { number: '185', label: 'Total Delegates', suffix: '+', color: '#FF6B9D' },
    { number: '25', label: 'Schools Participated', suffix: '+', color: '#45B7D1' },
    { number: '6', label: 'UN Councils', color: '#FFD93D' },
    { number: '85', label: 'Confidence Boost', suffix: '%', color: '#6BCB77' },
    { number: '23', label: 'Hours of Debate', suffix: '+', color: '#4D96FF' },
    { number: '120', label: 'Student Organizers', suffix: '+', color: '#FF6B6B' },
  ]

  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => {
        if (hasAnimated) return
        setHasAnimated(true)

        // Animate each counter
        const counters = sectionRef.current!.querySelectorAll(`.${styles.statNumber}`)
        counters.forEach((counter, index) => {
          const target = parseInt(stats[index]!.number)
          const obj = { value: 0 }
          gsap.to(obj, {
            value: target,
            duration: 2,
            delay: index * 0.15,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = Math.floor(obj.value).toString() + (stats[index]!.suffix || '')
            },
          })
        })

        // Animate cards
        const cards = sectionRef.current!.querySelectorAll(`.${styles.statCard}`)
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        })
      },
    })
  }, [hasAnimated])

  return (
    <section className={styles.statsSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>BY THE NUMBERS</span>
          <h2 className={styles.sectionTitle}>
            JNIMUN: Making a <span className={styles.titleAccent}>Difference</span>
          </h2>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={styles.statCard}
              style={{ '--stat-color': stat.color } as React.CSSProperties}
            >
              <div className={styles.statGlow} />
              <div className={styles.statNumber}>0</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statBar}>
                <div className={styles.statBarFill} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
