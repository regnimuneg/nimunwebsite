import useWindowSize from '@/lib/useWindowSize'
import { jnimun26Asset } from '@/lib/jnimun26Brand'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/apply/ApplyNavbar.module.scss'

const aboutSubmenu = [
  { id: 'team', text: 'Our team', href: '/hierarchy' },
  { id: 'mission', text: 'Mission and History', href: '/MissionHistory' },
  { id: 'numbers', text: 'By the numbers', href: '/Numbers' },
  { id: 'archives', text: 'Conference Archives', href: '/Archives' },
]

export default function ApplyNavbar(): JSX.Element {
  const router = useRouter()
  const isMobile = useWindowSize(900)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const aboutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setDrawerOpen(false)
    setAboutOpen(false)
  }, [router.asPath])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  useEffect(() => {
    return () => {
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
    }
  }, [])

  const closeMenus = () => {
    setAboutOpen(false)
    setDrawerOpen(false)
  }

  const openAbout = () => {
    if (aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current)
      aboutTimeoutRef.current = null
    }
    setAboutOpen(true)
  }

  const scheduleCloseAbout = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
    aboutTimeoutRef.current = setTimeout(() => setAboutOpen(false), 160)
  }

  const handleAboutEnter = () => {
    if (!isMobile) openAbout()
  }

  const handleAboutLeave = () => {
    if (!isMobile) scheduleCloseAbout()
  }

  const handleAboutClick = () => {
    if (isMobile) setAboutOpen((prev) => !prev)
  }

  const aboutDropdown = (mobile = false) => (
    <div
      className={`${styles.dropdown} ${mobile ? styles.dropdownMobile : ''}`}
      onMouseEnter={!mobile ? openAbout : undefined}
      onMouseLeave={!mobile ? scheduleCloseAbout : undefined}
    >
      {aboutSubmenu.map((item) => (
        <Link key={item.id} href={item.href} className={styles.dropdownLink} onClick={closeMenus}>
          {item.text}
        </Link>
      ))}
    </div>
  )

  return (
    <>
      <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/JNIMUN" className={styles.brandCluster} aria-label="JNIMUN home">
          <img
            src={jnimun26Asset('JNIMUN logo.png')}
            alt=""
            className={styles.logo}
            width={160}
            height={72}
          />
          <span className={styles.brandTitle}>
            JNIMUN<span className={styles.brandYear}>&apos;26</span>
          </span>
        </Link>

        {!isMobile && (
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <div
              className={styles.navItem}
              onMouseEnter={handleAboutEnter}
              onMouseLeave={handleAboutLeave}
            >
              <button
                type="button"
                className={styles.navLink}
                aria-haspopup="true"
                aria-expanded={aboutOpen}
                onClick={handleAboutClick}
              >
                About Us
              </button>
              {aboutOpen && aboutDropdown()}
            </div>
            <Link href="/JNIMUN" className={styles.navLink}>
              JNIMUN
            </Link>
            <Link href="/#contact" className={styles.navLink}>
              Contact Us
            </Link>
            <a href="https://portal.nimuneg.org" className={styles.navLink} target="_blank" rel="noopener noreferrer">
              Portal
            </a>
          </nav>
        )}

        {isMobile && (
          <IconButton className={styles.menuBtn} onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </IconButton>
        )}
      </div>
    </header>

    {isMobile && drawerOpen && (
        <div className={styles.drawerRoot} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button type="button" className={styles.backdrop} onClick={() => setDrawerOpen(false)} aria-label="Close menu" />
          <div className={styles.drawer}>
            <div className={styles.drawerHeader}>
              <img src={jnimun26Asset('JNIMUN logo.png')} alt="" className={styles.drawerLogo} />
              <IconButton className={styles.closeBtn} onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                <CloseIcon />
              </IconButton>
            </div>
            <nav className={styles.drawerNav}>
              <Link href="/" className={styles.drawerLink} onClick={closeMenus}>
                Home
              </Link>
              <div className={styles.drawerAbout}>
                <button
                  type="button"
                  className={styles.drawerLink}
                  onClick={handleAboutClick}
                  aria-expanded={aboutOpen}
                >
                  About Us
                  <span className={styles.chevron} aria-hidden />
                </button>
                {aboutOpen && aboutDropdown(true)}
              </div>
              <Link href="/JNIMUN" className={styles.drawerLink} onClick={closeMenus}>
                JNIMUN
              </Link>
              <Link href="/#contact" className={styles.drawerLink} onClick={closeMenus}>
                Contact Us
              </Link>
              <a
                href="https://portal.nimuneg.org"
                className={styles.drawerLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenus}
              >
                Portal
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
