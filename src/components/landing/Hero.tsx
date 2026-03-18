import styles from '@/styles/landing/Hero.module.scss'
import Link from 'next/link'
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
      <img
        ref={topRightShapeRef}
        src="/image/png/37.png"
        alt="Decorative 3D Element"
        className={styles.topRightShape}
      />
      <section className={styles.heroWrapper}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroGrid}>
          <div className={`${styles.heroIntro} animated-container`}>
            <div className={styles.eyebrowRow}>
              <p className={styles.kicker}>NILE INTERNATIONAL MODEL UNITED NATIONS</p>
              <span className={styles.seasonTag}>IC&apos;26</span>
            </div>
            <h1 className={styles.heroTitle}>A sharper, more immersive conference experience.</h1>
            <p className={styles.heroDescription}>
              The same NIMUN energy, redesigned with a sleeker digital front door for delegates,
              chairs, and internationals preparing for IC&apos;26.
            </p>
            <div className={styles.heroActions}>
              <Link href="/apply" className={styles.primaryAction}>
                Apply Now
              </Link>
              <a href="#packages" className={styles.secondaryAction}>
                Explore Packages
              </a>
            </div>
            <div className={styles.heroStats}>
              <span className={styles.statChip}>Student-led diplomacy</span>
              <span className={styles.statChip}>International delegates</span>
              <span className={styles.statChip}>Cairo, Egypt</span>
            </div>
          </div>

          <div className={`${styles.heroCardShell} animated-container-reverse`}>
            <img
              ref={leftShapeRef}
              src="/image/png/31.png"
              alt="Decorative 3D Element"
              className={styles.leftOfCardShape}
            />
            <div className={styles.heroCard}>
              <div className={styles.heroCardTop}>
                <p className={styles.heroCardLabel}>6TH INTERNATIONAL CONFERENCE</p>
                <span className={styles.heroCardBadge}>Open For Applications</span>
              </div>
              <p className={styles.heroCardTitle}>IC&apos;26</p>
              <p className={styles.heroCardSubtitle}>IS OFFICIALLY HERE</p>
              <div className={styles.heroUnderline} />
              <p className={styles.heroCardCopy}>
                Built for delegates who want a conference experience that feels polished before the
                event even starts.
              </p>
              <div className={styles.learnMoreWrapper}>
                <Link href="/apply" className={styles.learnMoreBtn}>
                  <span className={styles.learnMoreText}>START YOUR APPLICATION</span>
                </Link>
              </div>
              <div className={styles.heroCardMeta}>
                <span>Modern structure</span>
                <span>Same NIMUN momentum</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
