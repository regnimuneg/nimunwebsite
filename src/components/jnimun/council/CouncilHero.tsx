import Image from 'next/image'
import type { CouncilConfig } from '@/types/jnimunCouncil'
import {
  CouncilPillarsNote,
  DescriptionWithHighlights,
  titleColorClass,
} from '@/components/jnimun/CouncilSubpageParts'
import styles from '@/styles/JNIMUNSubpage.module.scss'

interface CouncilHeroProps {
  council: CouncilConfig
}

export default function CouncilHero({ council }: CouncilHeroProps) {
  const backdropClass =
    council.theme.heroBackdrop === 'yellow'
      ? styles.heroBackdropYellow
      : council.theme.heroBackdrop === 'blue'
        ? styles.heroBackdropBlue
        : styles.heroBackdropPink

  if (council.heroImage) {
    return (
      <section className={styles.heroSection} aria-labelledby="council-title">
        <div className={styles.heroContent}>
          <div className={`${styles.heroMain} ${styles.heroMainWithPortrait}`}>
            <div className={styles.heroCopy}>
              <div className={styles.levelBadgeTorn}>
                <span>{council.badge}</span>
              </div>

              <h1 id="council-title" className={styles.councilTitle}>
                {council.titleParts.map((part, i) => (
                  <span key={`${part.text}-${i}`} className={titleColorClass[part.color]}>
                    {part.text}
                  </span>
                ))}
              </h1>

              <p
                className={styles.heroDescription}
                style={{
                  '--desc-font-multiplier': council.desc.length < 240 ? 1.18 : council.desc.length < 270 ? 1.08 : 0.94
                } as React.CSSProperties}
              >
                {council.desc}
              </p>
            </div>

            <aside className={styles.heroPortraitPanel} aria-label={`${council.ctaShortName} chairs`}>
              <span className={`${styles.drawnStar} ${styles.drawnStarPink}`} aria-hidden />
              <span className={`${styles.drawnArrow} ${styles.drawnArrowYellow}`} aria-hidden />
              <span className={`${styles.drawnStrokes} ${styles.drawnStrokesBlue}`} aria-hidden />
              <span className={`${styles.drawnLoop} ${styles.drawnLoopYellow}`} aria-hidden />

              <Image
                src={council.heroImage}
                alt={`${council.ctaShortName} secretariat`}
                width={760}
                height={600}
                className={styles.heroPortraitImage}
                priority
              />

              {council.pillars && council.pillars.length > 0 ? (
                <CouncilPillarsNote pillars={council.pillars} />
              ) : null}
            </aside>
          </div>
        </div>

        {council.stickers.slice(0, 3).map((sticker, idx) => (
          <Image
            key={sticker}
            src={sticker}
            alt=""
            width={110}
            height={110}
            className={`${styles.heroFloatingSticker} ${styles[`heroSticker_${idx}`]}`}
            aria-hidden
            priority
          />
        ))}
      </section>
    )
  }

  return (
    <section className={styles.heroSection} aria-labelledby="council-title">
      <div className={`${styles.heroBackdrop} ${backdropClass}`} aria-hidden />
      <div className={styles.heroContent}>
        <div className={styles.heroMain}>
          <div className={styles.levelBadgeTorn}>
            <span>{council.badge}</span>
          </div>

          <h1 id="council-title" className={styles.councilTitle}>
            {council.titleParts.map((part, i) => (
              <span key={`${part.text}-${i}`} className={titleColorClass[part.color]}>
                {part.text}
              </span>
            ))}
          </h1>

          <div className={styles.heroBody}>
            <div className={styles.notebookWrap}>
              <div className={styles.washiTapePink} aria-hidden />
              <div className={styles.notebookPaper}>
                <p className={styles.notebookText}>
                  {council.desc}
                </p>
              </div>
            </div>

            <aside className={styles.councilAside}>
              <Image
                src={council.heroAccent}
                alt=""
                width={200}
                height={220}
                className={styles.heroCutout}
                aria-hidden
                priority
              />

              <div className={styles.logoTaped}>
                <div className={styles.washiTapeLogo} aria-hidden />
                <div className={styles.logoCircle}>
                  <Image src={council.logo} alt="" width={110} height={110} className={styles.logoImg} />
                </div>
              </div>

              {council.pillars && council.pillars.length > 0 ? (
                <CouncilPillarsNote pillars={council.pillars} />
              ) : null}
            </aside>
          </div>
        </div>
      </div>

      {council.stickers.slice(0, 3).map((sticker, idx) => (
        <Image
          key={sticker}
          src={sticker}
          alt=""
          width={110}
          height={110}
          className={`${styles.heroFloatingSticker} ${styles[`heroSticker_${idx}`]}`}
          aria-hidden
          priority
        />
      ))}
    </section>
  )
}
