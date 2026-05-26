import Image from 'next/image'
import type { CouncilConfig } from '@/types/jnimunCouncil'
import styles from '@/styles/JNIMUNSubpage.module.scss'

interface CouncilFocusProps {
  council: CouncilConfig
}

export default function CouncilFocus({ council }: CouncilFocusProps) {
  return (
    <section className={styles.gallerySection} aria-labelledby="focus-heading">
      <div className={styles.sectionRibbonYellow}>
        <h2 id="focus-heading" className={styles.sectionRibbonTitleDark}>
          COMMITTEE IN FOCUS
        </h2>
      </div>

      <svg className={styles.galleryArrow} viewBox="0 0 120 40" aria-hidden>
        <path
          d="M8 28 C40 8, 70 32, 108 14"
          fill="none"
          stroke="#2E90CF"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M98 10 L112 16 L100 24" fill="none" stroke="#2E90CF" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <Image
        src="/image/png/JNIMUN%2726/thumbs_up.png"
        alt=""
        width={56}
        height={56}
        className={styles.smileyDoodle}
        aria-hidden
      />

      <div
        className={`${styles.photoGallery} ${!council.groupPhoto2 ? styles.singlePhotoGallery : ''}`}
      >
        <div
          className={styles.galleryPhotoWrapper}
          style={{ '--rotation': '-2deg' } as React.CSSProperties}
        >
          <div className={`${styles.washiTapePink} ${styles.washiTapeDots}`} aria-hidden />
          <Image
            src={council.groupPhoto}
            alt={`${council.title} in session`}
            width={800}
            height={500}
            className={styles.galleryPhoto}
          />
        </div>

        {council.groupPhoto2 ? (
          <div
            className={`${styles.galleryPhotoWrapper} ${styles.galleryPhotoOverlap}`}
            style={{ '--rotation': '2.5deg' } as React.CSSProperties}
          >
            <div className={styles.washiTapeBlue} aria-hidden />
            <Image
              src={council.groupPhoto2}
              alt={`${council.title} candid`}
              width={800}
              height={500}
              className={styles.galleryPhoto}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
