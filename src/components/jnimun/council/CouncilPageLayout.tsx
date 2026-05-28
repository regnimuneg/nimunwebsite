import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useLenis } from '@/lib/lenis'
import type { CouncilConfig } from '@/types/jnimunCouncil'
import ApplyNavbar from '@/components/apply/ApplyNavbar'
import CouncilHero from './CouncilHero'
import CouncilChairs from './CouncilChairs'
import CouncilFocus from './CouncilFocus'
import CouncilCTA from './CouncilCTA'
import JNIMUNFooter from '@/components/jnimun/JNIMUNFooter'
import styles from '@/styles/JNIMUNSubpage.module.scss'

interface CouncilPageLayoutProps {
  council: CouncilConfig
}

export default function CouncilPageLayout({ council }: CouncilPageLayoutProps) {
  const { lenis } = useLenis()

  useEffect(() => {
    // 1. Scroll native window and Lenis immediately
    window.scrollTo(0, 0)
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }

    // 2. Perform a delayed scroll to ensure Next.js route transition and 
    // any automatic scroll-restoration/layout paints have completed.
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [council.slug, lenis])

  return (
    <>
      <Head>
        <title>{`${council.title} | JNIMUN'26`}</title>
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
        <ApplyNavbar />

        <main className={styles.councilMain}>
          <CouncilHero council={council} />
          <CouncilChairs council={council} />
          <CouncilCTA council={council} />
        </main>

        <JNIMUNFooter />

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
