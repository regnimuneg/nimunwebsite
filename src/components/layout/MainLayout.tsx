import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import CustomHead from '@/components/utils/CustomHead'
// Removed WebGLParticles import since it's not used
import useWindowSize from '@/lib/useWindowSize'
import { useDoubleTapZoom } from '@/lib/useDoubleTapZoom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Montserrat } from 'next/font/google'
import { useRouter } from 'next/router'
import { useRef, useEffect } from 'react'
import { useLenis } from '@/lib/lenis'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const font = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-family',
})

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const main = useRef<HTMLDivElement>(null)
  const isMobile = useWindowSize()
  const router = useRouter()
  const isIC26Page = router.pathname === '/IC26'
  const isApplyPage = router.pathname === '/apply'
  const isJNIMUNPage = router.pathname === '/JNIMUN' || router.pathname.startsWith('/JNIMUN/') || router.pathname === '/merch'
  
  const hideHeader = isIC26Page || isApplyPage || isJNIMUNPage
  const hideFooter = isIC26Page || isApplyPage || isJNIMUNPage
  
  // Enable double-tap zoom on all pages (but not on images)
  useDoubleTapZoom()

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

    let frame = 0
    let nestedFrame = 0
    let timers: number[] = []

    const interactionEvents = ['touchstart', 'touchmove', 'wheel', 'keydown', 'mousedown']

    const cancelScrollToTop = () => {
      window.cancelAnimationFrame(frame)
      window.cancelAnimationFrame(nestedFrame)
      timers.forEach((timer) => window.clearTimeout(timer))
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, cancelScrollToTop)
      })
    }

    const executeScroll = (url: string) => {
      if (url.includes('#')) {
        return
      }

      cancelScrollToTop()

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

      frame = window.requestAnimationFrame(() => {
        scrollToTop()
        nestedFrame = window.requestAnimationFrame(scrollToTop)
      })
      timers = [80, 180, 360, 700, 1100, 1600, 2200].map((delay) =>
        window.setTimeout(scrollToTop, delay)
      )

      interactionEvents.forEach((event) => {
        window.addEventListener(event, cancelScrollToTop, { passive: true })
      })
    }

    // Run on initial mount
    executeScroll(router.asPath)

    // Run on subsequent client-side navigations
    const handleRouteChange = (url: string) => {
      executeScroll(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      cancelScrollToTop()
      router.events.off('routeChangeComplete', handleRouteChange)
      document.documentElement.style.overflowAnchor = previousHtmlOverflowAnchor
      document.body.style.overflowAnchor = previousBodyOverflowAnchor
      if (canManageScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration
      }
    }
  }, [router, lenis])

  useGSAP(
    () => {
      // Type assertion to ensure each element is an HTMLElement
      const titles = gsap.utils.toArray('.animated-title') as HTMLElement[]
      const boxes = gsap.utils.toArray('.animated-container') as HTMLElement[]
      const reverseboxes = gsap.utils.toArray('.animated-container-reverse') as HTMLElement[]

      titles.forEach((box) => {
        gsap.set(box, { x: -100, opacity: 0 })

        gsap.to(box, {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: box,
            start: isMobile ? '300px bottom' : '100px bottom',
            end: isMobile ? '650px bottom' : '450px bottom',
            scrub: true,
          },
        })
      })

      boxes.forEach((box, index: number) => {
        gsap.set(box, { x: -100, opacity: 0 })

        gsap.to(box, {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: box,
            start: isMobile ? '350px bottom' : '150px bottom',
            end:
              boxes.length - 1 === index
                ? 'bottom bottom'
                : isMobile
                  ? '700px bottom'
                  : '500px bottom',
            scrub: true,
          },
        })
      })

      reverseboxes.forEach((box, index: number) => {
        gsap.set(box, { x: 100, opacity: 0 })

        gsap.to(box, {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: box,
            start: isMobile ? '350px bottom' : '150px bottom',
            end:
              boxes.length - 1 === index
                ? 'bottom bottom'
                : isMobile
                  ? '700px bottom'
                  : '500px bottom',
            scrub: true,
          },
        })
      })
    },
    { scope: main }
  )

  useEffect(() => {
    if (font.variable) {
      document.documentElement.style.setProperty('--font-family', font.variable)
    }
  }, [])

  return (
    <>
      <CustomHead />
      {/* <WebGLParticles size={isMobile ? 260 : 200} /> */}
      <main className={font.className}>
        <div id="full-size-image-slider"></div>
        {!hideHeader && <Header />}
        <div className="width-fix" ref={main}>
          {children}
          {!hideFooter && <Footer />}
        </div>
      </main>
    </>
  )
}
