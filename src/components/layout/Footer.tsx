import { footer } from '@/data/footer'
import styles from '@/styles/layout/Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brandBlock}>
          <span className={styles.eyebrow}>Nile University, Cairo</span>
          <span className={styles.name}>{footer.text}</span>
        </div>
        <div className={styles.copyrights}>
          <span>International Conference&apos;26</span>
          <span>Designed for a cleaner delegate experience</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
