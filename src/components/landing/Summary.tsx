import { useEffect, useState, useRef } from 'react'
import styles from '@/styles/landing/Summary.module.scss'
import Image from 'next/image'
import { summary } from '@/data/summary'
import gsap from 'gsap'

export default function Summary() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const rightShapeRef = useRef<HTMLImageElement>(null)
  const leftShapeRef = useRef<HTMLImageElement>(null)
  const lastTapRef = useRef(0)
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

  // Disabled zoom functionality - no zoom on images
  const handleDoubleTap = (e: React.TouchEvent | React.MouseEvent) => {
    // Do nothing - zoom disabled
  }

  // Disabled zoom functionality - no zoom on images
  const handleDoubleClick = (e: React.MouseEvent) => {
    // Do nothing - zoom disabled
  }

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
    if (startXRef.current === null || hasSwipedRef.current || isZoomed) return
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

  // Close zoom when clicking outside or pressing Escape
  useEffect(() => {
    if (!isZoomed) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false)
      }
    }

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (imageWrapperRef.current && !imageWrapperRef.current.contains(e.target as Node)) {
        setIsZoomed(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isZoomed])

  return (
    <section className={styles.summarySection}>
      {/* To the right, between summary and images: 39.png */}
      <img
        ref={rightShapeRef}
        src="/image/png/39.png"
        alt="Decorative 3D Element"
        className={styles.rightBetweenSummary}
      />
      
      <div className={styles.summaryTitleRow}>
        <h2 className={styles.summaryTitle}>A LIFE CHANGING EXPERIENCE</h2>
      </div>
      <div className={styles.footerLine}></div>
      <div className={styles.imageSection}>
        {/* Backdrop overlay when zoomed */}
        {isZoomed && (
          <div 
            className={styles.zoomBackdrop}
            onClick={() => setIsZoomed(false)}
          />
        )}
        <div 
          ref={imageWrapperRef}
          className={`${styles.summaryImageWrapper} ${isZoomed ? styles.zoomed : ''}`}
          onTouchStart={handleDoubleTap}
          onDoubleClick={handleDoubleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          data-no-double-tap-zoom
        >
          {/* Display current image */}
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
          {/* Preload all images in background for instant transitions */}
          {summary.images.map((img, idx) => 
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
                  zIndex: -1 
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
          {/* Zoom indicator */}
          {isZoomed && (
            <div className={styles.zoomIndicator}>
              Double tap/click to zoom out
            </div>
          )}
        </div>
        <div className={styles.paginationDots}>
          {summary.images.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${currentImageIndex === idx ? styles.active : ''}`}
              onClick={() => setCurrentImageIndex(idx)}
            />
          ))}
        </div>
      </div>
      <div className={styles.summaryTextBlock}>
        <p className={styles.summaryText}>
          Nile International Model United Nations is a vibrant, student-led club dedicated to
          inspiring global awareness, diplomacy, and leadership. NIMUN has grown into a prestigious
          platform that welcomes participants from around the world, hosting international
          conferences, bringing together students to engage in meaningful debates on pressing global
          issues.
        </p>
      </div>
      <div className={styles.footerLine}></div>
      <div className={styles.summaryFooter}>
        {/* To the left, just above IC'26: 40.png */}
        <img
          ref={leftShapeRef}
          src="/image/png/40.png"
          alt="Decorative 3D Element"
          className={styles.leftAboveIC26}
        />
        <div className={styles.footerLeft}>
          <span className={styles.footerLabel}>IC'26</span>
        </div>
        <div className={styles.footerCenter}>
          <span className={styles.nimunLogo}>NIMUN</span>
        </div>
        <div className={styles.footerRight}>
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
