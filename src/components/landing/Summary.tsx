import styles from '@/styles/landing/Summary.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const visiblePhotoCount = 3

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
    alt: 'NIMUN students dancing during a conference moment',
  },
  {
    src: '/image/png/homepage3.jpg',
    alt: 'NIMUN delegate speaking on microphone in an auditorium',
  },
  {
    src: '/image/png/homepage4.jpg',
    alt: 'NIMUN delegates taking notes during committee',
  },
  {
    src: '/image/png/Group.jpg',
    alt: 'NIMUN delegation group photo outside Nile University',
  },
  {
    src: '/image/png/_NU27875.jpg',
    alt: 'NIMUN delegate holding up a country placard',
  },
  {
    src: '/image/png/JNIMUN Conference.jpg',
    alt: 'JNIMUN delegates raising placards during a committee session',
  },
  {
    src: '/image/png/JNIMUN Sessions.jpg',
    alt: 'JNIMUN delegates listening attentively during a session',
  },
  {
    src: '/image/png/JNIMUN Closing.jpg',
    alt: 'JNIMUN closing celebration with delegates cheering',
  },
]

export default function Summary() {
  const [activePhoto, setActivePhoto] = useState(0)
  const [isFlying, setIsFlying] = useState(false)
  const [shouldShuffle, setShouldShuffle] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 700px)')
    const updateShufflePreference = () => setShouldShuffle(!motionQuery.matches)

    updateShufflePreference()
    motionQuery.addEventListener('change', updateShufflePreference)

    return () => motionQuery.removeEventListener('change', updateShufflePreference)
  }, [])

  useEffect(() => {
    if (!shouldShuffle) return

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
  }, [shouldShuffle])

  const orderedPhotos = Array.from({ length: visiblePhotoCount }, (_, index) => {
    const photoIndex = (activePhoto + index) % summaryPhotos.length
    return summaryPhotos[photoIndex]!
  })

  return (
    <section className={styles.summarySection} aria-labelledby="life-changing-title">
      <div className={styles.pattern} aria-hidden="true" />
      <div className={styles.summaryInner}>
        <div className={styles.copy}>
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
                index === 0 && isFlying && shouldShuffle ? styles.photoCardFlying : ''
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
                loading="lazy"
                quality={index === 0 ? 74 : 68}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
