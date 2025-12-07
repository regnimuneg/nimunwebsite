import type { NextPage } from 'next'
import styles from '@/styles/IC7.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { singlePackagesData, doublePackagesData } from '@/data/packages'

const IC7: NextPage = () => {
  const [packageType, setPackageType] = useState<'Single' | 'Double'>('Double')
  const [openDropdown, setOpenDropdown] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const displayedPackages = packageType === 'Single' ? singlePackagesData : doublePackagesData

  const aboutSubmenu = [
    { id: 'team', text: 'Our team', href: '/hierarchy' },
    { id: 'mission', text: 'Mission and History', href: '/MissionHistory' },
    { id: 'numbers', text: 'By the numbers', href: '/Numbers' },
    { id: 'archives', text: 'Conference Archives', href: '/Archives' },
  ]

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpenDropdown(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(false)
    }, 200)
  }

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const handleDropdownMouseLeave = () => {
    handleMouseLeave()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <main className={styles.main}>
      {/* Hero Section with Neo-Brutalist Grid */}
      <section className={styles.heroSection}>
        {/* Navigation Bar */}
        <nav className={styles.navBar}>
          <Link href="/Archives" className={styles.navButton}>
            Conferences
          </Link>
          <div className={styles.starDivider}>
            <Image src="/image/png/NIMUN Star.png" alt="Star" width={80} height={80} className={styles.starImage} />
          </div>
          <div
            className={styles.navItemContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            <button className={styles.navButton} onClick={(e) => e.preventDefault()}>
              About us
              <span className={styles.dropdownIndicator}></span>
            </button>
            {openDropdown && (
              <div
                className={styles.dropdownMenu}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                {aboutSubmenu.map((item) => (
                  <Link key={item.id} href={item.href} className={styles.dropdownItem}>
                    {item.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/#contact" className={styles.navButton}>
            Contact us
          </Link>
        </nav>

        {/* Grid Title Area */}
        <div className={styles.titleGrid}>
          {/* Row A */}
          <div className={styles.gridRow}>
            <div className={styles.gridCellLeft}>
              <span className={styles.heroWord}>Nile</span>
            </div>
            <div className={styles.gridCellCenter}>
              <span className={styles.heroSubtext}>10 Years and the legacy continues</span>
            </div>
            <div className={styles.gridCellRight}>
              <a
                href="https://forms.gle/D4hFPj934aVtpemw5"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroApplyButton}
              >
                Apply here
              </a>
            </div>
          </div>

          {/* Row B */}
          <div className={styles.gridRow}>
            <div className={styles.gridCellLeft}>
              <span className={styles.heroSubtext}>Leading with vision</span>
            </div>
            <div className={styles.gridCellCenter}>
              <div className={styles.heroIcon}>
                <Image src="/image/png/globe 2.png" alt="Globe" width={60} height={60} />
              </div>
            </div>
            <div className={styles.gridCellRight}>
              <span className={styles.heroWord}>International</span>
            </div>
          </div>

          {/* Row C */}
          <div className={styles.gridRow}>
            <div className={styles.gridCellLeft}>
              <span className={styles.heroWord}>Model</span>
            </div>
            <div className={styles.gridCellCenter}>
              <span className={styles.heroSubtext}>Setting the standard</span>
            </div>
            <div className={styles.gridCellRight}>
              <span className={styles.heroWord}>United</span>
            </div>
          </div>

          {/* Row D */}
          <div className={styles.gridRow}>
            <div className={styles.gridCellLeft}>
              <div className={styles.heroIcon}>
                <Image src="/image/png/double arrow.png" alt="Arrow" width={60} height={60} />
              </div>
            </div>
            <div className={styles.gridCellCenter}>
              <span className={styles.heroWord}>Nations</span>
            </div>
            <div className={styles.gridCellRight}>
              <div className={styles.heroYearContainer}>
                <span className={styles.heroSubtext}>Leaving our Marks</span>
                <span className={styles.heroYear}>'26</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Strip */}
        <div className={styles.heroImageContainer}>
          <Image
            src="/image/png/IC7 Hero.png"
            alt="IC7 Hero"
            fill
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.mainContentSection}>
        {/* Left: Text Block */}
        <div className={styles.textBlock}>
          <p>
            Nile International Model United Nations (NIMUN) is a student-led club that aims to
            promote global awareness, diplomacy, and leadership through Model United Nations
            simulations. It provides a space where students can engage with international issues and
            practice the skills needed for effective negotiation and critical thinking.
          </p>
        </div>

        {/* Right: Logo Block */}
        <div className={styles.logoBlockWrapper}>
          <div className={styles.logoDotsBackground}></div>
          <div className={styles.logoBlock}>
            <Image
              src="/image/png/NIMUN-Logo-IC7.png"
              alt="NIMUN Logo IC7"
              fill
              className={styles.logoImage}
            />
          </div>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className={styles.gridSection}>
        <div className={styles.gridContainer}>
          {/* Top Left: Spanish Flag Photo */}
          <div className={styles.gridImageTopLeft}>
            <Image
              src="/image/png/Spain.png"
              alt="Spanish Delegates"
              fill
              className={styles.gridImage}
            />
          </div>

          {/* Top Right: Text Block */}
          <div className={styles.gridTextBlock}>
            <p>
              Over the years, NIMUN has developed into a respected platform that attracts
              participants from different countries. The club hosts international conferences where
              students, academics, and professionals come together to debate and discuss some of the
              world's most urgent challenges.
            </p>
          </div>

          {/* Bottom Left: Tunisian Flag Photo */}
          <div className={styles.gridImageBottomLeft}>
            <Image
              src="/image/png/Council2.png"
              alt="Tunisian Delegates"
              fill
              className={styles.gridImage}
            />
          </div>

          {/* Bottom Right: Conference Room Photo */}
          <div className={styles.gridImageBottomRight}>
            <Image
              src="/image/png/Council1.png"
              alt="Conference Room"
              fill
              className={styles.gridImage}
            />
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className={styles.bottomSection}>
        <div className={styles.bottomImageContainer}>
          <Image
            src="/image/png/IC7 Bottom.png"
            alt="IC7 Bottom"
            fill
            className={styles.bottomImage}
          />
        </div>
      </section>

      {/* International Delegates' Packages Section */}
      <section className={styles.packagesSection}>
        <h2 className={styles.packagesTitle}>International delegates' packages</h2>
        
        {/* Toggle Buttons */}
        <div className={styles.toggleContainer}>
          <button
            className={`${styles.toggleButton} ${packageType === 'Single' ? styles.activeToggle : ''}`}
            onClick={() => setPackageType('Single')}
          >
            Single
          </button>
          <button
            className={`${styles.toggleButton} ${packageType === 'Double' ? styles.activeToggle : ''}`}
            onClick={() => setPackageType('Double')}
          >
            Double
          </button>
        </div>

        {/* Package Cards */}
        <div className={styles.packagesGrid}>
          {displayedPackages.map((item, index) => (
            <div key={index} className={styles.packageCard}>
              <div className={styles.packagePrice}>${item.price}</div>
              <div className={styles.packageDescription}>
                {item.description.map((feature, idx) => (
                  <div key={idx} className={styles.packageFeature}>{feature}</div>
                ))}
              </div>
              <a
                href="https://forms.gle/4Q63CVL8C8eCdFVg9"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.packageButton}
              >
                APPLY
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.packagesFooter}>
          <span className={styles.nimunText}>NIMUN</span>
          <div className={styles.unLogo}>
            <Image
              src="/image/png/logobig.png"
              alt="NIMUN Logo"
              width={120}
              height={120}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default IC7

