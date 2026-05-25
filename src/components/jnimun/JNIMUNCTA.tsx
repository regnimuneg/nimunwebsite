import styles from '@/styles/jnimun/JNIMUNCTA.module.scss'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function JNIMUNCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.from(sectionRef.current.querySelector(`.${styles.ctaContent}`), {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <section className={styles.ctaSection} ref={sectionRef}>
      <div className={styles.doodleOverlay} />
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaBadge}>🚀 Applications Open</div>
          <h2 className={styles.ctaTitle}>
            Ready to<br />
            <span className={styles.ctaAccent}>Change the World?</span>
          </h2>
          <p className={styles.ctaDescription}>
            Join 185+ delegates from 25+ schools in the most exciting junior MUN conference in Egypt.
            Whether you&apos;re a first-timer or seasoned debater, JNIMUN &apos;26 has a place for you.
          </p>
          <div className={styles.ctaButtons}>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScrVEKoYhayW42Sk2j4MNnKyIOpCqOzEj0B60fikL3KTigArQ/viewform"
              className={styles.primaryBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now — It&apos;s Free!
            </a>
            <a href="/#contact" className={styles.secondaryBtn}>
              Contact Us
            </a>
          </div>
          <div className={styles.ctaFooter}>
            <div className={styles.ctaStat}>
              <span className={styles.ctaStatIcon}>📅</span>
              <span>Dates TBA</span>
            </div>
            <div className={styles.ctaStat}>
              <span className={styles.ctaStatIcon}>📍</span>
              <span>Nile University, Cairo</span>
            </div>
            <div className={styles.ctaStat}>
              <span className={styles.ctaStatIcon}>🎯</span>
              <span>Ages 11–17</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
