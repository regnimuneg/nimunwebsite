import Image from 'next/image'
import type { CouncilConfig } from '@/types/jnimunCouncil'
import { HandDrawnNameOval } from '@/components/jnimun/CouncilSubpageParts'
import styles from '@/styles/JNIMUNSubpage.module.scss'

interface CouncilChairsProps {
  council: CouncilConfig
}

export default function CouncilChairs({ council }: CouncilChairsProps) {
  return (
    <section className={styles.chairsSection} aria-labelledby="chairs-heading">
      <div className={styles.sectionRibbonPink}>
        <h2 id="chairs-heading" className={styles.sectionRibbonTitle}>
          THE COUNCIL CHAIRS
        </h2>
      </div>

      <Image
        src="/image/png/JNIMUN%2726/stars.png"
        alt=""
        width={72}
        height={72}
        className={styles.crownDoodle}
        aria-hidden
      />

      <div
        className={`${styles.chairsGrid} ${council.chairs.length === 1 ? styles.singleChairGrid : ''}`}
      >
        {council.chairs.map((chair, idx) => {
          const backing = council.chairBackings[idx] ?? council.chairBackings[0]
          const bannerColor = idx === 0 ? '#2e90cf' : '#ff639b'
          const clipColor = idx === 0 ? 'blue' : 'pink'

          return (
            <article
              key={`${chair.name}-${idx}`}
              className={styles.chairCard}
              style={{ '--rotation': idx === 0 ? '-2.5deg' : '2.5deg' } as React.CSSProperties}
            >
              <div
                className={`${styles.paperClip} ${
                  clipColor === 'blue' ? styles.paperClipBlue : styles.paperClipPink
                }`}
                aria-hidden
              />
              <div
                className={styles.polaroidFrame}
                style={{ '--chair-backing': backing } as React.CSSProperties}
              >
                <div className={styles.polaroidInner}>
                  <Image
                    src={chair.image}
                    alt={chair.name}
                    width={380}
                    height={440}
                    className={styles.chairImage}
                    priority={idx === 0}
                  />
                </div>
              </div>
              <div className={styles.chairCaption}>
                <div
                  className={styles.nameBrush}
                  style={{ '--brush-color': bannerColor } as React.CSSProperties}
                >
                  <HandDrawnNameOval>{chair.name}</HandDrawnNameOval>
                </div>
                <p className={styles.chairRole}>{chair.role}</p>
              </div>
            </article>
          )
        })}
      </div>

      <Image
        src="/image/png/heart.png"
        alt=""
        width={64}
        height={64}
        className={styles.heartDoodle}
        aria-hidden
      />
    </section>
  )
}
