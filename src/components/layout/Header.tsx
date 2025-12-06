import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import Menu from '@/components/layout/Menu' // Updated Menu component
import { useLenis } from '@/lib/lenis'
import { useRouter } from 'next/router'
import useWindowSize from '@/lib/useWindowSize'
import styles from '@/styles/layout/Header.module.scss'
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link' // Import Link for Apply button if it's a link

export default function Header(): JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isMobile = useWindowSize(1050) // Tablet and mobile breakpoint
  // Keep track of scroll state for potential minor adjustments (e.g., shadow), even if background stays transparent
  const [isScrolling, setIsScrolling] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()
  const [isHomePage, setIsHomePage] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY
      if (scroll > 10) {
        setIsScrolling(true)
      } else {
        setIsScrolling(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  React.useEffect(() => {
    setIsHomePage(router.pathname === '/')
  }, [router.pathname])

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Right side elements component
  const RightSideElements = () => (
    <div className={styles.rightSideContainer}>
      <a
        href="https://forms.gle/D4hFPj934aVtpemw5"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.applyButton}
      >
        APPLY
      </a>
    </div>
  )

  return (
    <>
      {/* Apply stick class based on scroll, but SCSS will control appearance */}
      <header className={`${styles.header} ${isScrolling ? styles.stick : ''}`} ref={containerRef}>
        <div className={styles.fix}>
          {/* Left side container: Logo + Main Nav */}
          <div className={styles.leftSideContainer}>
            <a
              href={isHomePage ? '#top' : '/'}
              onClick={handleLogoClick}
              className={styles.logoWrapper}
              aria-label="Nile International Model United Nations Home"
            >
              <img
                src="/image/png/logo24.png"
                alt="NIMUN Logo"
                className={styles.logo}
                width={80}
                height={36}
              />
            </a>
            {/* Render Menu component only on desktop, directly after logo */}
            {!isMobile && <Menu />}
          </div>

          {/* Right side elements / Mobile hamburger */}
          {isMobile ? (
            <>
              <IconButton
                onClick={toggleDrawer(true)}
                className={styles.hamburgerButton}
                aria-label="Open menu"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                classes={{ paper: styles.drawerPaper }}
                ModalProps={{ keepMounted: true }}
              >
                {/* Drawer content: includes Menu and RightSideElements */}
                <div className={styles.drawerContent}>
                  <Menu onNavigate={() => setDrawerOpen(false)} />
                  <RightSideElements />
                </div>
              </Drawer>
            </>
          ) : (
            // Render RightSideElements directly on desktop
            <RightSideElements />
          )}
        </div>
      </header>
    </>
  )
}
