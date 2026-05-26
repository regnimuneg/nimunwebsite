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
          <h1 className={styles.wordmark}>NIMUN</h1>
          <p className={styles.subtitle}>Nile International Model United Nations</p>
          <p className={styles.intro}>
            Nile International Model United Nations is a vibrant, student-led club dedicated to
            inspiring global awareness, diplomacy, and leadership.
          </p>
          <div className={styles.actions}>
            <Link href="/apply" className={styles.primaryButton}>
              <span>APPLY</span>
              <Image
                src="/image/png/JNIMUN'26/laptop.png"
                alt=""
                width={74}
                height={74}
                className={styles.applySticker}
                aria-hidden="true"
              />
            </Link>
            <Link href="/JNIMUN" className={styles.secondaryButton}>
              JNIMUN
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.photoFrame}>
            <Image
              src="/image/png/IMG_4323.png"
              alt="NIMUN delegates celebrating with placards during conference"
              fill
              sizes="(max-width: 900px) 92vw, 48vw"
              priority
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>

      <div className={styles.countdownHeading}>
        <span>JNIMUN&apos;26</span>
        <h2>Countdown</h2>
      </div>

      <div className={styles.countdownBar} aria-label="Countdown to JNIMUN 2026">
        <div className={styles.timerIcon} aria-hidden="true">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 2V6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 2V6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 10H21"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 14H8.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14H12.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 14H16.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 18H8.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18H12.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 18H16.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {countdownItems.map((item) => (
          <div className={styles.countdownItem} key={item.label}>
            <span className={styles.countdownValue}>{item.value.toString().padStart(2, '0')}</span>
            <span className={styles.countdownLabel}>{item.label}</span>
            <div className={styles.divider} />
          </div>
        ))}
      </div>
    </section>
  )
}
