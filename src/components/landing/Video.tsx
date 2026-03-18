import styles from '@/styles/landing/Video.module.scss'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Video() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomLeftShapeRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { x: 0, opacity: 1, clearProps: 'all' })
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
    <section ref={containerRef} id="languages" className={`${styles.container} no-animation`}>
      <div className={styles.sectionIntro}>
        <span className={styles.sectionKicker}>Conference Spotlight</span>
        <h2 className={styles.summaryTitle}>The same energy, now framed with a cleaner stage.</h2>
        <p className={styles.sectionCopy}>
          A quick look at the pace, atmosphere, and production behind the NIMUN international
          conference experience.
        </p>
      </div>
      <div className={styles.videoShell}>
        <div className={styles.videoWrapper}>
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
        <div className={styles.videoNotes}>
          <span>Closing highlights</span>
          <span>Immersive recap</span>
          <span>Built for international delegates</span>
        </div>
      </div>
    </section>
  )
}
