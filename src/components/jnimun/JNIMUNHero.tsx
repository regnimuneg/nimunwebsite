import styles from '@/styles/jnimun/JNIMUNHero.module.scss'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function JNIMUNHero() {
  const heroContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero content entrance animation
    if (heroContentRef.current) {
      const tl = gsap.timeline()
      tl.from(heroContentRef.current.querySelectorAll('.jnimun-animate'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }
  }, [])

  return (
    <section className={styles.heroSection} id="jnimun-hero">
      {/* Doodle background pattern */}
      <div className={styles.doodleOverlay} />

      {/* Main hero content */}
      <div className={styles.heroContainer} ref={heroContentRef}>
        {/* Left side: text content */}
        <div className={styles.heroLeft}>
          <h1 className={`${styles.heroTitle} jnimun-animate`}>
            <span className={styles.jnimunText}>JNIMUN</span>
            <span className={styles.yearText}>&apos;26</span>
          </h1>
          <p className={`${styles.heroSubtitle} jnimun-animate`}>
            The junior edition of Nile International<br />
            Model United Nations — where young voices<br />
            learn leadership, diplomacy, and debate.
          </p>
          <div className={`${styles.heroCTAs} jnimun-animate`}>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScrVEKoYhayW42Sk2j4MNnKyIOpCqOzEj0B60fikL3KTigArQ/viewform"
              className={styles.applyBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now <span className={styles.arrow}>→</span>
            </a>
            <a href="#committees" className={styles.exploreBtn}>
              Explore Committees
            </a>
          </div>
        </div>

        {/* Right side: globe with surrounding stickers */}
        <div className={styles.heroRight}>
          {/* Globe - center piece */}
          <img
            src="/image/png/globe-sticker.png"
            alt="Globe"
            className={styles.globeSticker}
          />

          {/* Surrounding stickers — positioned symmetrically */}
          <img
            src="/image/png/sticker-dove.png"
            alt="Dove"
            className={`${styles.stickerElement} ${styles.stickerTopLeft}`}
          />
          <img
            src="/image/png/sticker-gavel.png"
            alt="Gavel"
            className={`${styles.stickerElement} ${styles.stickerTopRight}`}
          />
          <img
            src="/image/png/sticker-megaphone.png"
            alt="Megaphone"
            className={`${styles.stickerElement} ${styles.stickerLeft}`}
          />
          <img
            src="/image/png/sticker-microphone.png"
            alt="Microphone"
            className={`${styles.stickerElement} ${styles.stickerRight}`}
          />
          <img
            src="/image/png/sticker-handshake.png"
            alt="Handshake"
            className={`${styles.stickerElement} ${styles.stickerBottomLeft}`}
          />
          <img
            src="/image/png/sticker-hourglass.png"
            alt="Hourglass"
            className={`${styles.stickerElement} ${styles.stickerBottomRight}`}
          />
        </div>
      </div>

      {/* Wave divider at bottom */}
      <div className={styles.waveDivider}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,64 C360,120 1080,0 1440,64 L1440,120 L0,120 Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  )
}
