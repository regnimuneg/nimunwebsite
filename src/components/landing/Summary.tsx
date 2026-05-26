import styles from '@/styles/landing/Summary.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const summaryPhotos = [
  {
    src: '/image/png/salama.jpg',
    alt: 'NIMUN delegate raising his hand during a committee session',
  },
  {
    src: '/image/png/homepage0.jpg',
    alt: 'NIMUN delegates celebrating during conference',
  },
  {
    src: '/image/png/homepage1.jpg',
    alt: 'NIMUN students during a conference moment',
  },
  {
    src: '/image/png/homepage2.jpg',
    alt: 'NIMUN delegates gathered together',
  },
  {
    src: '/image/png/homepage3.jpg',
    alt: 'NIMUN conference participants sharing a group moment',
  },
]

export default function Summary() {
  const [activePhoto, setActivePhoto] = useState(0)
  const [isFlying, setIsFlying] = useState(false)

  useEffect(() => {
    let settleTimer: number | undefined

    const shuffleTimer = window.setInterval(() => {
      setIsFlying(true)

      settleTimer = window.setTimeout(() => {
        setActivePhoto((currentPhoto) => (currentPhoto + 1) % summaryPhotos.length)
        setIsFlying(false)
      }, 820)
    }, 3400)

    return () => {
      window.clearInterval(shuffleTimer)

      if (settleTimer) {
        window.clearTimeout(settleTimer)
      }
    }
  }, [])

  const orderedPhotos = summaryPhotos.map((_, index) => {
    const photoIndex = (activePhoto + index) % summaryPhotos.length
    return summaryPhotos[photoIndex]!
  })

  return (
    <section className={styles.summarySection} aria-labelledby="life-changing-title">
      <div className={styles.pattern} aria-hidden="true" />
      <div className={styles.summaryInner}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Nile University Delegation</p>
          <h2 id="life-changing-title" className={styles.title}>
            A LIFE CHANGING EXPERIENCE
          </h2>
          <p className={styles.text}>
            Nile International Model United Nations is a vibrant, student-led club dedicated to
            inspiring global awareness, diplomacy, and leadership. NIMUN has grown into a
            prestigious platform that welcomes participants from around the world, hosting
            international conferences, bringing together students to engage in meaningful debates on
            pressing global issues.
          </p>
        </div>

        <div className={styles.imagePanel} aria-label="NIMUN photo highlights">
          {orderedPhotos.map((photo, index) => (
            <div
              className={`${styles.photoCard} ${styles[`photoCard${index}`]} ${
                index === 0 && isFlying ? styles.photoCardFlying : ''
              }`}
              key={photo.src}
              aria-hidden={index !== 0}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 860px) 92vw, 42vw"
                className={styles.summaryImage}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
