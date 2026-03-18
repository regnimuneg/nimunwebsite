import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import Menu from '@/components/layout/Menu'
import { useRouter } from 'next/router'
import useWindowSize from '@/lib/useWindowSize'
import styles from '@/styles/layout/Header.module.scss'
import React, { useState } from 'react'
import Link from 'next/link'

export default function Header(): JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isMobile = useWindowSize(1050) // Tablet and mobile breakpoint
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

  const rightSideElements = (
    <div className={styles.rightSideContainer}>
      <Link href="/apply" className={styles.applyButton}>
        APPLY
      </Link>
    </div>
  )

  return (
    <>
      <header className={`${styles.header} ${isScrolling ? styles.stick : ''}`} ref={containerRef}>
        <div className={styles.fix}>
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
              <div className={styles.textWrapper}>
                <span className={styles.mainText}>Nile International</span>
                <span className={styles.subText}>Model United Nations</span>
              </div>
            </a>
            {!isMobile && <Menu />}
          </div>

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
                <div className={styles.drawerContent}>
                  <button className={styles.backButton} onClick={toggleDrawer(false)}>
                    ← Back
                  </button>
                  <Menu onNavigate={() => setDrawerOpen(false)} />
                  {rightSideElements}
                </div>
              </Drawer>
            </>
          ) : (
            rightSideElements
          )}
        </div>
      </header>
    </>
  )
}
