import styles from '@/styles/landing/Hero.module.scss'
import { jnimun26Asset } from '@/lib/jnimun26Brand'
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
    const initialCountdownTimer = window.setTimeout(updateCountdown, 0)
    const countdownTimer = window.setInterval(updateCountdown, 1000)

    return () => {
      window.clearTimeout(initialCountdownTimer)
      window.clearInterval(countdownTimer)
    }
  }, [])

  const countdownItems = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ]

  return (
    <>
      <div className={styles.heroWrapper}>
        <div className={styles.heroBanner}>
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <div className={styles.countdownCard}>
              {/* Stickers scattered around the card */}
              <img src={jnimun26Asset('rays.png')} alt="" className={`${styles.sticker} ${styles.stickerRays}`} aria-hidden="true" />
              <img src={jnimun26Asset('stars.png')} alt="" className={`${styles.sticker} ${styles.stickerStars}`} aria-hidden="true" />
              <img src={jnimun26Asset('megaphone.png')} alt="" className={`${styles.sticker} ${styles.stickerMegaphone}`} aria-hidden="true" />
              <img src={jnimun26Asset('sand_clock.png')} alt="" className={`${styles.sticker} ${styles.stickerHourglass}`} aria-hidden="true" />
              <img src={jnimun26Asset('big_star.png')} alt="" className={`${styles.sticker} ${styles.stickerBigStar}`} aria-hidden="true" />
              <img src={jnimun26Asset('small_stars.png')} alt="" className={`${styles.sticker} ${styles.stickerSmallStars}`} aria-hidden="true" />
              <img src={jnimun26Asset('lens.png')} alt="" className={`${styles.sticker} ${styles.stickerLens}`} aria-hidden="true" />
              <img src={jnimun26Asset('pencil.png')} alt="" className={`${styles.sticker} ${styles.stickerPencil}`} aria-hidden="true" />
              <img src={jnimun26Asset('bulb.png')} alt="" className={`${styles.sticker} ${styles.stickerBulb}`} aria-hidden="true" />
              <img src={jnimun26Asset('exclamation.png')} alt="" className={`${styles.sticker} ${styles.stickerExclamation}`} aria-hidden="true" />
              <img src={jnimun26Asset('thumbs_up.png')} alt="" className={`${styles.sticker} ${styles.stickerThumbsUp}`} aria-hidden="true" />
              <img src={jnimun26Asset('clip.png')} alt="" className={`${styles.sticker} ${styles.stickerClip}`} aria-hidden="true" />

              <p className={styles.countdownEyebrow}>
                <span>JNIMUN</span>
                <span className={styles.countdownYear}>&apos;26</span>
                <span> is approaching</span>
              </p>
              <div className={styles.countdownGrid} aria-label="Countdown to JNIMUN'26">
                {countdownItems.map((item) => (
                  <div className={styles.countdownItem} key={item.label}>
                    <span className={styles.countdownValue}>
                      {item.value.toString().padStart(2, '0')}
                    </span>
                    <span className={styles.countdownLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.heroActions}>
                <Link href="/apply" className={styles.applyNowBtn}>
                  APPLY NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
