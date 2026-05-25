import styles from '@/styles/landing/Summary.module.scss'
import Image from 'next/image'

export default function Summary() {
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

        <div className={styles.imagePanel}>
          <Image
            src="/image/png/salama.jpg"
            alt="NIMUN delegate raising his hand during a committee session"
            fill
            sizes="(max-width: 860px) 92vw, 42vw"
            className={styles.summaryImage}
          />
        </div>
      </div>
    </section>
  )
}
