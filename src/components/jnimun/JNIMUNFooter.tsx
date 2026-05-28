import React from 'react'
import Link from 'next/link'
import styles from '@/styles/jnimun/JNIMUNFooter.module.scss'

export default function JNIMUNFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.tornEdge} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.brandTitle}>
            JNIMUN<span className={styles.brandYear}>&apos;26</span>
          </span>
        </div>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/JNIMUN" className={styles.link}>
            JNIMUN
          </Link>
          <Link href="/hierarchy" className={styles.link}>
            Our Team
          </Link>
          <Link href="/#contact" className={styles.link}>
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  )
}
