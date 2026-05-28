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
    const canManageScrollRestoration = 'scrollRestoration' in window.history
    const previousScrollRestoration = canManageScrollRestoration
      ? window.history.scrollRestoration
      : 'auto'

    if (canManageScrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }

    const previousHtmlOverflowAnchor = document.documentElement.style.overflowAnchor
    const previousBodyOverflowAnchor = document.body.style.overflowAnchor
    document.documentElement.style.overflowAnchor = 'none'
    document.body.style.overflowAnchor = 'none'

    const scrollToTop = () => {
      document.scrollingElement?.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo(0, 0)
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      }
    }

    scrollToTop()

    let nestedFrame = 0
    const frame = window.requestAnimationFrame(() => {
      scrollToTop()
      nestedFrame = window.requestAnimationFrame(scrollToTop)
    })
    const timers = [80, 180, 360, 700, 1100, 1600, 2200].map((delay) =>
      window.setTimeout(scrollToTop, delay)
    )

    return () => {
      window.cancelAnimationFrame(frame)
      window.cancelAnimationFrame(nestedFrame)
      timers.forEach((timer) => window.clearTimeout(timer))
      document.documentElement.style.overflowAnchor = previousHtmlOverflowAnchor
      document.body.style.overflowAnchor = previousBodyOverflowAnchor
      if (canManageScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration
      }
    }
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
