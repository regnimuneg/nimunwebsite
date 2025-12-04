import styles from '@/styles/landing/Hero.module.scss'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroBanner}>
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroTitleBlock}>
            <p className={styles.heroSubtitle}>NILE INTERNATIONAL</p>
            <p className={styles.heroSubtitle}>MODEL UNITED NATIONS</p>
            <div className={styles.heroUnderline} />
          </div>

          <div className={styles.heroCard}>
            <p className={styles.heroCardTitle}>IC’26</p>
            <p className={styles.heroCardSubtitle}>IS OFFICALLY HERE!!</p>
            <div className={styles.learnMoreWrapper}>
              <a href="/JNIMUN" className={styles.learnMoreBtn}>
                <span className={styles.learnMoreText}>LEARN MORE!</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
