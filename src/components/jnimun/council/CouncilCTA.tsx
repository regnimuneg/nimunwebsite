import Image from 'next/image'
import Link from 'next/link'
import type { CouncilConfig } from '@/types/jnimunCouncil'
import styles from '@/styles/JNIMUNSubpage.module.scss'

interface CouncilCTAProps {
  council: CouncilConfig
}

export default function CouncilCTA({ council }: CouncilCTAProps) {
  const ctaStickerLeft = council.stickers.find((s) => s.includes('bulb')) ?? '/image/png/JNIMUN%2726/bulb.png'
  const ctaStickerRight = council.stickers.find((s) => s.includes('lens')) ?? '/image/png/JNIMUN%2726/lens.png'
  const ctaTitle = council.ctaTitle ?? council.ctaShortName
  const ctaAccent = council.ctaShortName
  const ctaBaseTitle = council.ctaTitle?.endsWith(ctaAccent)
    ? council.ctaTitle.slice(0, -ctaAccent.length)
    : ''

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
          {ctaBaseTitle ? (
            <>
              <span className={styles.ctaTitleWhite}>{ctaBaseTitle}</span>
              <span className={styles.ctaTitleAccent}>{ctaAccent}</span>
            </>
          ) : (
            <span className={styles.ctaTitleWhite}>{ctaTitle}</span>
          )}
          <span className={styles.ctaTitleAccent}>?</span>
        </h2>
        <p className={styles.ctaDesc}>
          Become a delegate, debate global issues, and create real diplomatic solutions.
        </p>

        <div className={styles.ctaButtons}>
          <Link href="/JNIMUN#councils" className={styles.ctaBackBtn}>
            Back to Councils
          </Link>
          <Link href="/apply" className={styles.ctaApplyBtn}>
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  )
}
