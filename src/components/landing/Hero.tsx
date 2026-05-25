import styles from '@/styles/landing/Hero.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const JNIMUN_TARGET_DATE = new Date('2026-06-27T09:00:00+03:00').getTime()

const getCountdown = () => {
  const distance = Math.max(JNIMUN_TARGET_DATE - Date.now(), 0)

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  }
}

export default function Hero() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const updateCountdown = () => setCountdown(getCountdown())
    const countdownTimer = window.setInterval(updateCountdown, 1000)
    updateCountdown()

    return () => window.clearInterval(countdownTimer)
  }, [])

  const countdownItems = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ]

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>International Conference</p>
          <h1 className={styles.wordmark}>NIMUN</h1>
          <p className={styles.subtitle}>Nile International Model United Nations</p>
          <p className={styles.intro}>
            Nile International Model United Nations is a vibrant, student-led club dedicated to
            inspiring global awareness, diplomacy, and leadership.
          </p>
          <div className={styles.actions}>
            <Link href="/apply" className={styles.primaryButton}>
              APPLY NOW
            </Link>
            <Link href="/JNIMUN" className={styles.secondaryButton}>
              JNIMUN
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.photoFrame}>
            <Image
              src="/image/png/homepage0.jpg"
              alt="NIMUN delegates celebrating during conference"
              fill
              sizes="(max-width: 900px) 92vw, 48vw"
              priority
              className={styles.heroImage}
            />
          </div>
          <div className={styles.badge}>
            <span>NU</span>
            <strong>Global debate</strong>
          </div>
        </div>
      </div>

      <div className={styles.countdownBar} aria-label="Countdown to JNIMUN 2026">
        <div className={styles.timerIcon} aria-hidden="true">
          <span />
        </div>
        {countdownItems.map((item) => (
          <div className={styles.countdownItem} key={item.label}>
            <span className={styles.countdownValue}>{item.value.toString().padStart(2, '0')}</span>
            <span className={styles.countdownLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
