import styles from '@/styles/jnimun/JNIMUNAbout.module.scss'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import adham from '@public/image/png/Adham.jpg'
import ccpCJ26 from "@public/image/png/CCPCJ'26.jpg"
import group from '@public/image/png/Group.jpg'
import henry from '@public/image/png/henry.jpg'
import plac from '@public/image/png/plac.jpg'
import plac2 from '@public/image/png/plac2.jpg'
import press26 from "@public/image/png/Press'26.jpg"
import pr from '@public/image/png/pr.jpg'
import salama from '@public/image/png/salama.jpg'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const galleryImages = [
  { src: adham, alt: 'Adham speaking', rotation: -4.2 },
  { src: ccpCJ26, alt: "CCPCJ '26 committee", rotation: 2.7 },
  { src: group, alt: 'Group photo', rotation: 5.1 },
  { src: henry, alt: 'Henry at podium', rotation: -1.8 },
  { src: plac, alt: 'Plenary session', rotation: -6.3 },
  { src: plac2, alt: 'Delegate speaking', rotation: 3.4 },
  { src: press26, alt: "Press '26 coverage", rotation: 1.5 },
  { src: pr, alt: 'PR moment', rotation: -2.9 },
  { src: salama, alt: 'Salama presenting', rotation: 4.6 },
]

export default function JNIMUNAbout() {
  const sectionRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !galleryRef.current) return

    const cards = galleryRef.current.querySelectorAll(`.${styles.stickyCard}`)
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <section className={styles.aboutSection} ref={sectionRef} id="about">
      {/* Chalkboard doodle decorations */}
      <div className={styles.doodleTopLeft}>✦</div>
      <div className={styles.doodleBottomRight}>✧</div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>A LIFE CHANGING EXPERIENCE</span>
          <h2 className={styles.sectionTitle}>
            Our <span className={styles.titleAccent}>Moments</span>
          </h2>
        </div>

        {/* Sticky note photo gallery */}
        <div className={styles.stickyGallery} ref={galleryRef}>
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={styles.stickyCard}
              style={{ '--rotation': `${img.rotation}deg` } as React.CSSProperties}
            >
              <div className={styles.tapeStrip} />
              <div className={styles.cardImageWrapper}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  className={styles.cardImage}
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 45vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
