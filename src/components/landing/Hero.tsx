import styles from '@/styles/landing/Hero.module.scss'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const leftShapeRef = useRef<HTMLImageElement>(null)
  const topRightShapeRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (leftShapeRef.current) {
      gsap.to(leftShapeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.2,
      })
    }
    if (topRightShapeRef.current) {
      gsap.to(topRightShapeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0,
      })
    }
  }, [])

  return (
    <>
      {/* Top right behind the navbar: 37.png */}
      <img
        ref={topRightShapeRef}
        src="/image/png/37.png"
        alt="Decorative 3D Element"
        className={styles.topRightShape}
      />
      <div className={styles.heroWrapper}>
        <div className={styles.heroBanner}>
          <div className={styles.heroOverlay} />

          {/* To the left of the blue card: 31.png */}
          <img
            ref={leftShapeRef}
            src="/image/png/31.png"
            alt="Decorative 3D Element"
            className={styles.leftOfCardShape}
          />

          <div className={styles.heroContent}>
            <div className={styles.heroTitleBlock}>
              <p className={styles.heroSubtitle}>NILE INTERNATIONAL</p>
              <p className={styles.heroSubtitle}>MODEL UNITED NATIONS</p>
              <div className={styles.heroUnderline} />
            </div>

            <div className={styles.heroCard}>
              <p className={styles.heroCardTitle}>IC'26</p>
              <p className={styles.heroCardSubtitle}>IS OFFICALLY HERE!!</p>
              <div className={styles.learnMoreWrapper}>
                <a href="/apply" className={styles.learnMoreBtn}>
                  <span className={styles.learnMoreText}>APPLY NOW!</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
