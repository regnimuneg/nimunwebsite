import styles from '@/styles/landing/Video.module.scss'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Languages() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomLeftShapeRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Explicitly prevent GSAP from animating this element
    if (containerRef.current) {
      gsap.set(containerRef.current, { x: 0, opacity: 1, clearProps: 'all' })
      // Kill any existing animations on this element
      gsap.killTweensOf(containerRef.current)
    }
    if (bottomLeftShapeRef.current) {
      gsap.to(bottomLeftShapeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.3,
      })
    }
  }, [])

  return (
    <div>
      <div ref={containerRef} id="languages" className={`${styles.container} no-animation`}>
        <div className={styles.summaryTitleRow}>
          <div className={styles.line}></div>
          <h2 className={styles.summaryTitle}>6TH INTERNATIONAL CONFERENCE</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.videoWrapper}>
          {/* At the bottom left of the video: 44.png */}
          <img
            ref={bottomLeftShapeRef}
            src="/image/png/44.png"
            alt="Decorative 3D Element"
            className={styles.bottomLeftVideo}
          />
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/6hSenuOj4V8?vq=hd720"
          title="Closing IC6"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        </div>
      </div>
    </div>
  )
}
