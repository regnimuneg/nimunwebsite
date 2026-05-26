import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import Menu from '@/components/layout/Menu' // Updated Menu component
import { useRouter } from 'next/router'
import useWindowSize from '@/lib/useWindowSize'
import styles from '@/styles/layout/Header.module.scss'
import React, { useState } from 'react'
import Link from 'next/link' // Import Link for Apply button if it's a link

function RightSideElements() {
  return (
    <div className={styles.rightSideContainer}>
      <Link href="/apply" className={styles.applyButton}>
        APPLY NOW
      </Link>
    </div>
  )
}

export default function Header(): JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isMobile = useWindowSize(1050) // Tablet and mobile breakpoint
  // Keep track of scroll state for potential minor adjustments (e.g., shadow), even if background stays transparent
  const [isScrolling, setIsScrolling] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()
  const [isHomePage, setIsHomePage] = useState(false)

  React.useEffect(() => {
    setIsHomePage(router.pathname === '/')
  }, [router.pathname])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const toggleDrawer = (open: boolean) => (e: React.KeyboardEvent | React.MouseEvent) => {
    if (e.type === 'keydown' && ((e as React.KeyboardEvent).key === 'Tab' || (e as React.KeyboardEvent).key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }

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
              <Image
                src="/image/png/logo_white.png"
                alt="NIMUN Logo"
                width={100}
                height={100}
                className={styles.headerLogo}
                priority
              />
              <div className={styles.logoTextWrapper}>
                <span className={styles.brandTitle}>NIMUN</span>
                <span className={styles.brandSubtitle}>Nile International Model United Nations</span>
              </div>
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
                  <button className={styles.backButton} onClick={toggleDrawer(false)}>
                    ← Back
                  </button>
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
