import Head from 'next/head'
import Image from 'next/image'
import type { CouncilConfig } from '@/types/jnimunCouncil'
import CouncilHeader from './CouncilHeader'
import CouncilHero from './CouncilHero'
import CouncilChairs from './CouncilChairs'
import CouncilFocus from './CouncilFocus'
import CouncilCTA from './CouncilCTA'
import styles from '@/styles/JNIMUNSubpage.module.scss'

interface CouncilPageLayoutProps {
  council: CouncilConfig
}

export default function CouncilPageLayout({ council }: CouncilPageLayoutProps) {
  return (
    <>
      <Head>
        <title>{council.title} | JNIMUN&apos;26</title>
        <meta name="description" content={council.desc} />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        className={styles.subpageWrapper}
        data-council={council.slug}
        data-emphasis={council.theme.emphasis}
        style={
          {
            '--council-accent': council.theme.accentPrimary,
            '--council-accent-alt': council.theme.accentSecondary,
          } as React.CSSProperties
        }
      >
        <CouncilHeader />

        <main className={styles.councilMain}>
          <CouncilHero council={council} />
          <CouncilChairs council={council} />
          <CouncilFocus council={council} />
          <CouncilCTA council={council} />
        </main>

        {council.stickers.slice(3, 5).map((sticker, idx) => (
          <Image
            key={sticker}
            src={sticker}
            alt=""
            width={100}
            height={100}
            className={`${styles.pageFloatingSticker} ${styles[`pageSticker_${idx}`]}`}
            aria-hidden
          />
        ))}
      </div>
    </>
  )
}
