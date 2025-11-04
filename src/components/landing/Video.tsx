import styles from '@/styles/landing/Video.module.scss'

export default function Languages() {
  return (
    <div>
      <div id="languages" className={`animated-container ${styles.container}`}>
        <div className={styles.summaryTitleRow}>
          <div className={styles.line}></div>
          <h2 className={styles.summaryTitle}>OUR 2ND JUNIORS’ CONFERENCE</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.videoWrapper}>
          <iframe
            width="560"
            height="315"
            src="https://drive.google.com/file/d/11wQRQaQjWCjaFtTqjAJsoJMpQhcuOKdm/preview"
            title="Google Drive video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}
