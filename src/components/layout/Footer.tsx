import { footer } from '@/data/footer'
import styles from '@/styles/layout/Footer.module.scss'
import { Icon } from '@iconify-icon/react'

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.copyrights}>
          <span className={styles.name}>
            {/* <Image quality={40} placeholder="blur" alt="logo" src={logo} className={styles.logo} /> */}
          </span>
          <span className={styles.container}>
            {footer.text}
            {/* <a href={footer.link} target="_blank" className={styles.link}>
              <Icon icon={footer.icon} className={styles.icon} />
              {footer.name}
            </a> */}
          </span>
        </div>
      </div>
    </>
  )
}
