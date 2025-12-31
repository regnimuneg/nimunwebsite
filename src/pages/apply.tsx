import Head from 'next/head'
import styles from '@/styles/Apply.module.scss'

export default function Apply() {
  return (
    <>
      <Head>
        <title>Application Closed | NIMUN</title>
      </Head>
      <div className={`${styles.container} ${styles.successContainer}`}>
        <div className={styles.card}>
          <h1 className={styles.title}>Application Closed</h1>
          <p className={styles.subtitle}>
            Thank you for your interest! The application period has now closed.
          </p>
          <p className={styles.subtitle} style={{ marginTop: '16px', fontSize: '1.1rem', fontWeight: 600 }}>
            Stay tuned for our next conferences!
          </p>
        </div>
      </div>
    </>
  )
}
