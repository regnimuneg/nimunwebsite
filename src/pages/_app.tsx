import MainLayout from '@/components/layout/MainLayout'
import { LenisProvider } from '@/lib/lenis'
import '@/styles/index.scss'
import raf from '@studio-freight/tempus'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.defaults({})

  gsap.ticker.lagSmoothing(0)
  gsap.ticker.remove(gsap.updateRoot)
  raf.add((time: number) => {
    gsap.updateRoot(time / 1000)
  }, 0)
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Any other initialization logic can go here
  }, [])

  return (
    <LenisProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </LenisProvider>
  )
}
