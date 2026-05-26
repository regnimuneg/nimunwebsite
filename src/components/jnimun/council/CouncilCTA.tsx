import Image from 'next/image'
import Link from 'next/link'
import type { CouncilConfig } from '@/types/jnimunCouncil'
import styles from '@/styles/JNIMUNSubpage.module.scss'

interface CouncilCTAProps {
  council: CouncilConfig
}

export default function CouncilCTA({ council }: CouncilCTAProps) {
  const ctaStickerLeft = council.stickers[0] ?? '/image/png/JNIMUN%2726/lens.png'
  const ctaStickerRight = council.stickers.find((s) => s.includes('bulb')) ?? '/image/png/JNIMUN%2726/bulb.png'

  return (
    <section className={styles.ctaSection} aria-labelledby="cta-heading">
      <div className={styles.ctaBlueBand} aria-hidden />

      <Image
        src={ctaStickerLeft}
        alt=""
        width={120}
        height={120}
        className={styles.ctaStickerLeft}
        aria-hidden
      />
      <Image
        src={ctaStickerRight}
        alt=""
        width={100}
        height={100}
        className={styles.ctaStickerRight}
        aria-hidden
      />

      <div className={styles.ctaInner}>
        <p className={styles.ctaScript}>Ready to join</p>
        <h2 id="cta-heading" className={styles.ctaTitle}>
          <span className={styles.ctaTitleWhite}>{council.ctaShortName}</span>
          <span className={styles.ctaTitleAccent}>?</span>
        </h2>
        <p className={styles.ctaDesc}>
          Become a delegate, debate global issues, and create real diplomatic solutions.
        </p>

        <div className={styles.ctaButtons}>
          <Link href="/JNIMUN" className={styles.ctaBackBtn}>
            <span className={styles.ctaBtnIcon} aria-hidden>
              🏛️
            </span>
            Back to Councils
          </Link>
          <Link href="/apply" className={styles.ctaApplyBtn}>
            <span className={styles.ctaBtnIcon} aria-hidden>
              🚀
            </span>
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  )
}
