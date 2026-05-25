import styles from '@/styles/landing/Video.module.scss'
import Link from 'next/link'

export default function JuniorsFeature() {
  return (
    <section className={styles.featureSection} aria-labelledby="juniors-title">
      <div className={styles.featureBand}>
        <div className={styles.iconMark} aria-hidden="true">
          <span />
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Juniors Conference</p>
          <h2 id="juniors-title" className={styles.title}>
            OUR 2ND JUNIORS&apos; CONFERENCE
          </h2>
          <p className={styles.text}>
            JNIMUN turns students into future diplomats, where they debate world issues, defend
            their countries, and create real solutions.
          </p>
        </div>
        <Link href="/JNIMUN" className={styles.link}>
          DISCOVER JNIMUN
        </Link>
      </div>
    </section>
  )
}
