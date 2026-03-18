import { useEffect, useState, useRef } from 'react'
import styles from '@/styles/landing/Summary.module.scss'
import Image from 'next/image'
import { summary } from '@/data/summary'
import gsap from 'gsap'

export default function Summary() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const rightShapeRef = useRef<HTMLImageElement>(null)
  const leftShapeRef = useRef<HTMLImageElement>(null)
  const startXRef = useRef<number | null>(null)
  const hasSwipedRef = useRef(false)
  const [swipeDirection, setSwipeDirection] = useState<'next' | 'prev' | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % summary.images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (rightShapeRef.current) {
      gsap.to(rightShapeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.4,
      })
    }
    if (leftShapeRef.current) {
      gsap.to(leftShapeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.6,
      })
    }
  }, [])

  const swipeTo = (direction: 'next' | 'prev') => {
    setSwipeDirection(direction)
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = direction === 'next' ? prevIndex + 1 : prevIndex - 1
      return (nextIndex + summary.images.length) % summary.images.length
    })
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX
    hasSwipedRef.current = false
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startXRef.current === null || hasSwipedRef.current) return
    const deltaX = e.clientX - startXRef.current
    const threshold = 40

    if (Math.abs(deltaX) > threshold) {
      swipeTo(deltaX > 0 ? 'prev' : 'next')
      hasSwipedRef.current = true
    }
  }

  const handlePointerUp = () => {
    startXRef.current = null
    hasSwipedRef.current = false
  }

  useEffect(() => {
    if (!swipeDirection) return
    const timer = setTimeout(() => setSwipeDirection(null), 400)
    return () => clearTimeout(timer)
  }, [swipeDirection])

  return (
    <section className={`${styles.summarySection} animated-container`}>
      <img
        ref={rightShapeRef}
        src="/image/png/39.png"
        alt="Decorative 3D Element"
        className={styles.rightBetweenSummary}
      />

      <div className={styles.sectionInner}>
        <div className={styles.summaryLead}>
          <span className={styles.sectionKicker}>Why NIMUN</span>
          <div className={styles.summaryTitleRow}>
            <h2 className={styles.summaryTitle}>A life-changing experience with real presence.</h2>
          </div>
          <div className={styles.summaryCopy}>{summary.content}</div>
          <div className={styles.detailGrid}>
            <div className={styles.detailCard}>
              <span className={styles.detailLabel}>Atmosphere</span>
              <p>High-energy sessions, stronger delegate focus, and a cleaner visual experience.</p>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailLabel}>Community</span>
              <p>
                Built by students, shaped by collaboration, and designed to feel genuinely global.
              </p>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailLabel}>Momentum</span>
              <p>Every touchpoint now feels more intentional, modern, and easier to navigate.</p>
            </div>
          </div>
        </div>

        <div className={styles.imageSection}>
          <div
            className={styles.summaryImageWrapper}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {summary.images[currentImageIndex] && (
              <div
                key={currentImageIndex}
                className={`${styles.summaryImageInner} ${
                  swipeDirection === 'next'
                    ? styles.swipeNext
                    : swipeDirection === 'prev'
                      ? styles.swipePrev
                      : ''
                }`}
              >
                <Image
                  src={summary.images[currentImageIndex]!}
                  alt="Summary photo"
                  className={styles.summaryImage}
                  fill
                  priority={currentImageIndex === 0}
                  quality={85}
                  fetchPriority={currentImageIndex === 0 ? 'high' : 'auto'}
                />
              </div>
            )}
            {summary.images.map(
              (img, idx) =>
                idx !== currentImageIndex && (
                  <Image
                    key={`preload-${idx}`}
                    src={img}
                    alt=""
                    fill
                    className={styles.summaryImage}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      opacity: 0,
                      pointerEvents: 'none',
                      zIndex: -1,
                    }}
                    loading="eager"
                    quality={85}
                  />
                )
            )}
            <button
              className={`${styles.navButton} ${styles.left}`}
              aria-label="Previous image"
              onClick={() => swipeTo('prev')}
              type="button"
            >
              ‹
            </button>
            <button
              className={`${styles.navButton} ${styles.right}`}
              aria-label="Next image"
              onClick={() => swipeTo('next')}
              type="button"
            >
              ›
            </button>
          </div>

          <div className={styles.paginationRow}>
            <div className={styles.paginationDots}>
              {summary.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`${styles.dot} ${currentImageIndex === idx ? styles.active : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
            <span className={styles.paginationCount}>
              {String(currentImageIndex + 1).padStart(2, '0')} /{' '}
              {String(summary.images.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.summaryFooter}>
        <img
          ref={leftShapeRef}
          src="/image/png/40.png"
          alt="Decorative 3D Element"
          className={styles.leftAboveIC26}
        />
        <div className={styles.footerPill}>IC&apos;26</div>
        <div className={styles.footerCenter}>
          <span className={styles.nimunLogo}>NIMUN</span>
        </div>
        <div className={styles.footerBadge}>
          <Image
            src="/image/png/NU.png"
            alt="Nile University"
            className={styles.nuLogo}
            width={58}
            height={58}
            priority
          />
        </div>
      </div>
    </section>
  )
}
