import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import useWindowSize from '@/lib/useWindowSize'
import { jnimun26Asset } from '@/lib/jnimun26Brand'
import styles from '@/styles/JNIMUNSubpage.module.scss'

const aboutLinks = [
  { href: '/hierarchy', label: 'Our team' },
  { href: '/MissionHistory', label: 'Mission and History' },
  { href: '/Numbers', label: 'By the numbers' },
  { href: '/Archives', label: 'Conference Archives' },
]

export default function CouncilHeader() {
  const isMobile = useWindowSize(900)
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const aboutTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scheduleCloseAbout = () => {
    if (aboutTimeout.current) clearTimeout(aboutTimeout.current)
    aboutTimeout.current = setTimeout(() => setAboutOpen(false), 160)
  }

  return (
    <header className={styles.councilHeader}>
      <div className={styles.councilHeaderInner}>
        <Link href="/JNIMUN" className={styles.councilBrand} aria-label="JNIMUN home">
          <Image
            src={jnimun26Asset('JNIMUN logo.png')}
            alt=""
            width={72}
            height={56}
            className={styles.councilBrandLogo}
          />
          <span className={styles.councilBrandTitle}>
            JNIMUN<span className={styles.councilBrandYear}>&apos;26</span>
          </span>
        </Link>

        {!isMobile ? (
          <nav className={styles.councilNav} aria-label="Main navigation">
            <div
              className={styles.councilNavItem}
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={scheduleCloseAbout}
            >
              <button
                type="button"
                className={`${styles.councilNavLink} ${styles.councilNavAbout}`}
                aria-haspopup="true"
                aria-expanded={aboutOpen}
              >
                ABOUT US
                <span className={styles.navDoodleYellow} aria-hidden />
              </button>
              {aboutOpen && (
                <div className={styles.councilDropdown}>
                  {aboutLinks.map((link) => (
                    <Link key={link.href} href={link.href} className={styles.councilDropdownLink}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/#contact" className={styles.councilNavLink}>
              CONTACT US
              <span className={styles.navDoodlePink} aria-hidden />
            </Link>
            <a
              href="https://portal.nimuneg.org"
              className={`${styles.councilNavLink} ${styles.councilNavPortal}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              PORTAL
              <span className={styles.navDoodleSparkle} aria-hidden />
            </a>
          </nav>
        ) : (
          <button
            type="button"
            className={styles.councilMenuBtn}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div className={styles.councilMobileMenu} role="dialog" aria-modal="true">
          <button
            type="button"
            className={styles.councilMobileBackdrop}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <div className={styles.councilMobilePanel}>
            <button type="button" className={styles.councilMobileClose} onClick={() => setMenuOpen(false)}>
              ×
            </button>
            <nav className={styles.councilMobileNav}>
              <p className={styles.councilMobileLabel}>About Us</p>
              {aboutLinks.map((link) => (
                <Link key={link.href} href={link.href} className={styles.councilMobileLink} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href="/#contact" className={styles.councilMobileLink} onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
              <a
                href="https://portal.nimuneg.org"
                className={styles.councilMobileLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Portal
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
