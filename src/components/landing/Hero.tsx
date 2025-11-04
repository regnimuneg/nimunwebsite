import { useEffect, useState } from 'react'
import styles from '@/styles/landing/Hero.module.scss'
import Image from 'next/image'

const HERO_IMAGES = [
  '/image/png/homepage0.jpg',
  '/image/png/homepage1.jpg',
  '/image/png/homepage2.jpg',
  '/image/png/homepage3.jpg',
  '/image/png/homepage4.jpg',
]

const EVENT_DATE = new Date('2025-06-28T14:00:00') // Set your event date here

function getTimeLeft() {
  const now = new Date()
  const diff = EVENT_DATE.getTime() - now.getTime()
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24))
  const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60))
  return { days, hours, minutes }
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [currentImage, setCurrentImage] = useState(0)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000 * 10)
    return () => clearInterval(timer)
  }, [])

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(imageInterval)
  }, [])

  return (
    <div className={styles.heroWrapper}>
      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <Image
          key={currentImage}
          src={HERO_IMAGES[currentImage] as string}
          alt="Group Photo"
          layout="fill"
          objectFit="cover"
          quality={90}
          className={styles.bgImage}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.countdownSection}>
          <div className={styles.countdownNumbers}>
            {hasMounted ? (
              <>
                <span className={styles.count}>{String(timeLeft.days).padStart(2, '0')}</span>
                <span className={styles.colon}>:</span>
                <span className={styles.count}>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className={styles.colon}>:</span>
                <span className={styles.count}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className={styles.colon}></span>
              </>
            ) : (
              <>
                <span className={styles.count}>--</span>
                <span className={styles.colon}>:</span>
                <span className={styles.count}>--</span>
                <span className={styles.colon}>:</span>
                <span className={styles.count}>--</span>
                <span className={styles.colon}>:</span>
                <span className={styles.count}>--</span>
              </>
            )}
          </div>
          <div className={styles.countdownLabels}>
            <span>DAYS</span>
            <span>HOURS</span>
            <span>MINUTES</span>
          </div>
          {/* LEARN MORE Button with decorative icons */}

          <div className={styles.learnMoreWrapper}>
            <img src="/image/png/A+.png" alt="A+" className={styles.iconAPlus} />
            <img src="/image/png/coin.png" alt="Coin" className={styles.iconCoin} />
            <a href="/JNIMUN/" className={styles.learnMoreBtn}>
              <span className={styles.learnMoreText}>LEARN MORE!</span>
            </a>
            <img src="/image/png/bubble.png" alt="Bubble" className={styles.iconBubble} />
            <img src="/image/png/nefertiti.png" alt="Nefertiti" className={styles.iconNefertiti} />
          </div>
          {/* Pagination dots */}
          <div className={styles.paginationDots}>
            {HERO_IMAGES.map((_, idx) => (
              <span
                key={idx}
                className={`${styles.dot} ${currentImage === idx ? styles.active : ''}`}
                onClick={() => setCurrentImage(idx)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
        <div className={styles.heroBannerAfter} />
      </div>
    </div>
  )
}
