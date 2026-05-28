import type { NextPage } from 'next'
import styles from '@/styles/JNIMUN.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ApplyNavbar from '@/components/apply/ApplyNavbar'
import JNIMUNFooter from '@/components/jnimun/JNIMUNFooter'
import { useLenis } from '@/lib/lenis'

const PaperAirplaneIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardDoodleSvg}>
    <path d="M15 50 L85 15 L50 85 L40 60 L15 50 Z" />
    <path d="M85 15 L40 60 L50 60 Z" />
  </svg>
)

const PaintPaletteIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardDoodleSvg}>
    <path d="M50 15 C25 15 15 35 15 55 C15 75 35 85 55 85 C75 85 85 70 85 50 C85 30 75 15 50 15 Z" />
    <circle cx="35" cy="35" r="5" fill="#ffffff" />
    <circle cx="55" cy="30" r="5" fill="#ffffff" />
    <circle cx="70" cy="45" r="5" fill="#ffffff" />
    <circle cx="35" cy="60" r="8" fill="none" />
    <path d="M60 65 L85 90 M80 85 L85 90" strokeWidth="6.5" />
  </svg>
)

const BeetleIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardDoodleSvg}>
    <ellipse cx="50" cy="55" rx="20" ry="25" />
    <path d="M50 30 C50 20 40 20 50 15 C50 20 60 20 50 15" />
    <circle cx="50" cy="27" r="8" />
    <line x1="50" y1="35" x2="50" y2="80" />
    <path d="M30 45 L15 40 M30 55 L12 55 M30 65 L15 70" />
    <path d="M70 45 L85 40 M70 55 L88 55 M70 65 L85 70" />
  </svg>
)

type PackageRoomOption = {
  roomType: string
  price: string
  priceNote?: string
  description: string[]
}

type JNIMUNPackageData = {
  packageName: string
  tagline: string
  colorClass: string
  hasRoomTypes: boolean
  roomOptions?: PackageRoomOption[]
  price?: string
  priceNote?: string
  roomType?: string
  description?: string[]
}

type PackageDisplayCard = {
  packageName: string
  tagline: string
  colorClass: string
  roomType?: string
  price: string
  priceNote?: string
  description: string[]
}

const PACKAGES_DATA: JNIMUNPackageData[] = [
  {
    packageName: 'SILVER',
    tagline: 'Essential Conference Package',
    colorClass: 'packageSilver',
    hasRoomTypes: true,
    roomOptions: [
      { roomType: 'Single Room', price: '450', description: ['Accommodation', 'Conference fees', 'Transportation'] },
      { roomType: 'Double Room', price: '360', priceNote: '($720 Total)', description: ['Accommodation', 'Conference fees', 'Transportation'] }
    ]
  },
  {
    packageName: 'GOLD',
    tagline: 'Full Experience Package',
    colorClass: 'packageGold',
    hasRoomTypes: true,
    roomOptions: [
      { roomType: 'Single Room', price: '565', description: ['Accommodation', 'Conference fees', 'Transportation', 'Outings', 'Outings Transportation'] },
      { roomType: 'Double Room', price: '475', priceNote: '($950 Total)', description: ['Accommodation', 'Conference fees', 'Transportation', 'Outings', 'Outings Transportation'] }
    ]
  },
  {
    packageName: 'GROUP OF 4',
    tagline: 'Best for Small Groups',
    colorClass: 'packageGroup4',
    hasRoomTypes: false,
    price: '450',
    priceNote: 'per person ($1,799 Total)',
    roomType: 'Double Room',
    description: ['Accommodation', 'Conference fees', 'Transportation', 'Outings', 'Outings Transportation']
  },
  {
    packageName: 'GROUP OF 8',
    tagline: 'Vibrant Group Experience',
    colorClass: 'packageGroup8',
    hasRoomTypes: false,
    price: '425',
    priceNote: 'per person ($3,400 Total)',
    roomType: 'Double Room',
    description: ['Accommodation', 'Conference fees', 'Transportation', 'Outings', 'Outings Transportation']
  },
  {
    packageName: 'GROUP OF 8 + SUPERVISOR',
    tagline: 'For Delegations & Leaders',
    colorClass: 'packageGroupSuper',
    hasRoomTypes: true,
    roomOptions: [
      { roomType: 'Double Rooms', price: '480', priceNote: 'per person (for 8 delegates)', description: ['Accommodation', 'Conference fees', 'Transportation', 'Outings', 'Outings Transportation'] },
      { roomType: 'Single Rooms', price: '485', priceNote: '($3,840 Total)', description: ['Accommodation', 'Conference fees', 'Transportation', 'Outings', 'Outings Transportation'] }
    ]
  }
]

const PACKAGE_FEATURES = Array.from(
  new Set(
    PACKAGES_DATA.flatMap((pkg) =>
      pkg.hasRoomTypes
        ? pkg.roomOptions?.flatMap((option) => option.description) ?? []
        : pkg.description ?? []
    )
  )
)

const PACKAGE_LABEL_OVERRIDES: Record<string, string> = {
  'GROUP OF 8 + SUPERVISOR': 'Group of 8 - Supervisor',
}

const formatPackageLabel = (packageName: string) =>
  PACKAGE_LABEL_OVERRIDES[packageName] ??
  packageName
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bOf\b/g, 'of')

const JNIMUN: NextPage = () => {
  const { lenis } = useLenis()

  useEffect(() => {
    // Only scroll to top if we are NOT navigating specifically to the councils section
    if (typeof window !== 'undefined' && window.location.hash.includes('#councils')) {
      return
    }

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

    const interactionEvents = ['touchstart', 'touchmove', 'wheel', 'keydown', 'mousedown']
    let nestedFrame = 0
    let frame = 0
    let timers: number[] = []

    const cancelScrollToTop = () => {
      window.cancelAnimationFrame(frame)
      window.cancelAnimationFrame(nestedFrame)
      timers.forEach((timer) => window.clearTimeout(timer))
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, cancelScrollToTop)
      })
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

    return () => {
      cancelScrollToTop()
      document.documentElement.style.overflowAnchor = previousHtmlOverflowAnchor
      document.body.style.overflowAnchor = previousBodyOverflowAnchor
      if (canManageScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration
      }
    }
  }, [lenis])

  useEffect(() => {
    // Check if device supports hover (not touch-only)
    const supportsHover = window.matchMedia('(hover: hover)').matches

    if (!supportsHover) {
      // For touch devices, don't add mouse-based glow effect
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Get all bento items (assuming this class is used elsewhere or on the cards)
      const bentoItems = document.querySelectorAll(
        `.${styles.bentoItem}, .${styles.conferenceCardLeft}, .${styles.conferenceCardRightItem}`
      ) // Apply to relevant items

      bentoItems.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Check if mouse is within the item bounds (with some padding for smoother effect)
        const padding = 150
        const isNear =
          x >= -padding && x <= rect.width + padding && y >= -padding && y <= rect.height + padding

        if (isNear) {
          // Set CSS custom properties for the gradient position
          ; (item as HTMLElement).style.setProperty('--x', `${x}px`)
            ; (item as HTMLElement).style.setProperty('--y', `${y}px`)
          // Add the glow class
          if (styles.cursorGlow) {
            item.classList.add(styles.cursorGlow)
          }
        } else {
          if (styles.cursorGlow) {
            item.classList.remove(styles.cursorGlow)
          }
        }
      })
    }

    // Add event listener
    document.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const [selectedPackage, setSelectedPackage] = useState<string>('SILVER')

  const currentPackage = PACKAGES_DATA.find(pkg => pkg.packageName === selectedPackage)

  const getDisplayCards = (): PackageDisplayCard[] => {
    if (!currentPackage) return []

    if (currentPackage.hasRoomTypes && currentPackage.roomOptions) {
      return currentPackage.roomOptions.map(option => ({
        packageName: currentPackage.packageName,
        tagline: currentPackage.tagline,
        colorClass: currentPackage.colorClass,
        roomType: option.roomType,
        price: option.price,
        priceNote: option.priceNote,
        description: option.description
      }))
    } else {
      return [{
        packageName: currentPackage.packageName,
        tagline: currentPackage.tagline,
        colorClass: currentPackage.colorClass,
        roomType: currentPackage.roomType,
        price: currentPackage.price || '',
        priceNote: currentPackage.priceNote,
        description: currentPackage.description || []
      }]
    }
  }

  const displayCards = getDisplayCards()

  return (
    <>
      <ApplyNavbar />
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              JNIMUN<span>&apos;26</span>
            </h1>
            <p className={styles.heroLead}>
              JNIMUN turns students into future diplomats, where they debate world issues, defend
              their countries, and create real solutions.
            </p>
          </div>

          {/* APPLY NOW Button - positioned near bottom of hero */}
          <div className={styles.learnMoreWrapper}>
            <Link href="/apply" className={styles.learnMoreBtn}>
              <span className={styles.learnMoreText}>APPLY NOW</span>
            </Link>
          </div>

          <div className={styles.stickerCluster} aria-hidden="true">
            <Image
              src="/image/png/monochrome_globe_sticker_illustration.png"
              alt=""
              width={430}
              height={430}
              className={`${styles.heroSticker} ${styles.stickerGlobe}`}
              priority
            />
          </div>

          <Image
            src="/image/png/JNIMUN%2726/big_star.png"
            alt=""
            width={300}
            height={300}
            className={styles.cornerStar}
            aria-hidden="true"
            priority
          />
          <Image
            src="/image/png/JNIMUN%2726/basic/megaphone.png"
            alt=""
            width={120}
            height={120}
            className={styles.cornerMegaphone}
            aria-hidden="true"
            priority
          />
          <Image
            src="/image/png/JNIMUN%2726/rays.png"
            alt=""
            width={140}
            height={90}
            className={styles.cornerRays}
            aria-hidden="true"
            priority
          />
        </div>

        <div className={styles.doodleSectionWrapper}>
          {/* --- What is JNIMUN? Section --- */}
          <section className={styles.whatIsSection}>
            <div className={styles.whatIsInner}>
              <div className={styles.whatIsTitleBlock}>
                <h2 className={styles.whatIsTitle}>
                  WHAT IS<br />JNIMUN?
                </h2>
                <svg className={styles.whatIsSwoosh} viewBox="0 0 220 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 20C40 6 100 2 140 8C180 14 200 22 216 16" stroke="#ff639b" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              <div className={styles.whatIsCards}>
                {/* Card 01 */}
                <div className={`${styles.whatIsCard} ${styles.whatIsCardGreen}`}>
                  <div className={styles.whatIsCardTop}>
                    <h3 className={styles.whatIsCardTitle}>
                      LEARN DIPLOMACY THROUGH FUN SIMULATIONS.
                    </h3>
                    <span className={styles.whatIsCardNumber}>01</span>
                  </div>
                  <p className={styles.whatIsCardDesc}>
                    Experience real-world topics in a safe and friendly environment.
                  </p>
                  <div className={styles.whatIsCardIcons}>
                    <Image
                      src="/image/png/JNIMUN%2726/lens.png"
                      alt=""
                      width={100}
                      height={100}
                      className={styles.whatIsIcon}
                    />
                  </div>
                </div>

                {/* Card 02 */}
                <div className={`${styles.whatIsCard} ${styles.whatIsCardYellow}`}>
                  <div className={styles.whatIsCardTop}>
                    <h3 className={styles.whatIsCardTitle}>
                      BUILD CONFIDENCE IN SPEAKING AND TEAM WORK.
                    </h3>
                    <span className={styles.whatIsCardNumber}>02</span>
                  </div>
                  <p className={styles.whatIsCardDesc}>
                    Grow your voice, make friends, and lead with confidence.
                  </p>
                  <div className={styles.whatIsCardIcons}>
                    <Image
                      src="/image/png/JNIMUN%2726/megaphone.png"
                      alt=""
                      width={100}
                      height={100}
                      className={styles.whatIsIcon}
                    />
                  </div>
                </div>

                {/* Card 03 */}
                <div className={`${styles.whatIsCard} ${styles.whatIsCardPink}`}>
                  <div className={styles.whatIsCardTop}>
                    <h3 className={styles.whatIsCardTitle}>
                      DESIGNED FOR JUNIORS WITH GUIDANCE AND SUPPORT.
                    </h3>
                    <span className={styles.whatIsCardNumber}>03</span>
                  </div>
                  <p className={styles.whatIsCardDesc}>
                    Trained chairs and members to support you in every step.
                  </p>
                  <div className={styles.whatIsCardIcons}>
                    <Image
                      src="/image/png/JNIMUN%2726/thumbs_up.png"
                      alt=""
                      width={100}
                      height={100}
                      className={styles.whatIsIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Our Councils Section --- */}
          <section id="councils" className={styles.ourCouncilsSection}>
            <div className={styles.councilsHeader}>
              <div className={styles.councilsTitleWrapper}>
                <h2 className={styles.councilsTitle}>
                  <span className={styles.titleOur}>OUR</span>{' '}
                  <span className={styles.titleCouncils}>COUNCILS</span>
                </h2>
                {/* Lines under the title */}
                <div className={styles.titleDecorations}>
                  <div className={styles.yellowLines}>
                    <div className={styles.yellowLine1}></div>
                    <div className={styles.yellowLine2}></div>
                  </div>
                  <div className={styles.blueLine}></div>
                </div>
              </div>
              <div className={styles.councilsSubtitleBox}>
                <div className={styles.councilsSubtitleBg}></div>
                <p className={styles.councilsSubtitleText}>
                  Explore our <span className={styles.textBlue}>councils</span> and the <span className={styles.textBlue}>leaders</span> who will guide the debate.
                </p>
              </div>
            </div>

            <div className={styles.councilsGrid}>
              {/* Card 1: UNSC */}
              <div className={`${styles.councilCard} ${styles.cardPink}`}>
                <Image src="/image/png/JNIMUN%2726/pigeon.png" alt="" width={60} height={75} className={styles.sC1_1} />
                <Image src="/image/png/JNIMUN%2726/stars.png" alt="" width={60} height={60} className={styles.sC1_2} />
                <div className={styles.cardInner}>
                  <div className={styles.councilHeader}>
                    <div className={styles.councilLogo}>
                      <Image src="/image/png/security.png" alt="Security Council" width={94} height={94} className={styles.logoImg} />
                    </div>
                    <div className={styles.councilTitleDesc}>
                      <span className={styles.levelBadge}>Advanced</span>
                      <h3>SECURITY COUNCIL — UNSC</h3>
                    </div>
                  </div>
                  <div className={styles.ecstaticBtnWrapper}>
                    <Link href="/JNIMUN/sc" className={`${styles.ecstaticMeetChairBtn} ${styles.btnTextPink}`}>
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2: UNHRC */}
              <div className={`${styles.councilCard} ${styles.cardBlue}`}>
                <Image src="/image/png/JNIMUN%2726/megaphone.png" alt="" width={65} height={70} className={styles.sC2_1} />
                <Image src="/image/png/JNIMUN%2726/pencil.png" alt="" width={35} height={75} className={styles.sC2_2} />
                <div className={styles.cardInner}>
                  <div className={styles.councilHeader}>
                    <div className={styles.councilLogo}>
                      <Image src="/image/png/crisis.png" alt="Crisis Committee" width={94} height={94} className={styles.logoImg} />
                    </div>
                    <div className={styles.councilTitleDesc}>
                      <span className={styles.levelBadge}>Advanced</span>
                      <h3>CRISIS COMMITTEE</h3>
                    </div>
                  </div>
                  <div className={styles.ecstaticBtnWrapper}>
                    <Link href="/JNIMUN/crisis" className={`${styles.ecstaticMeetChairBtn} ${styles.btnTextBlue}`}>
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 3: DISEC */}
              <div className={`${styles.councilCard} ${styles.cardYellow}`}>
                <Image src="/image/png/JNIMUN%2726/lens.png" alt="" width={50} height={77} className={styles.sC3_1} />
                <Image src="/image/png/JNIMUN%2726/handwriting.png" alt="" width={75} height={60} className={styles.sC3_2} />
                <div className={styles.cardInner}>
                  <div className={styles.councilHeader}>
                    <div className={styles.councilLogo}>
                      <Image src="/image/png/odc.png" alt="UNODC" width={94} height={94} className={styles.logoImg} />
                    </div>
                    <div className={styles.councilTitleDesc}>
                      <span className={styles.levelBadge}>Intermediate</span>
                      <h3>UNITED NATIONS OFFICE ON DRUGS AND CRIME — UNODC</h3>
                    </div>
                  </div>
                  <div className={styles.ecstaticBtnWrapper}>
                    <Link href="/JNIMUN/unodc" className={`${styles.ecstaticMeetChairBtn} ${styles.btnTextYellow}`}>
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 4: ECOSOC */}
              <div className={`${styles.councilCard} ${styles.cardGreen}`}>
                <Image src="/image/png/JNIMUN%2726/bulb.png" alt="" width={45} height={68} className={styles.sC4_1} />
                <Image src="/image/png/JNIMUN%2726/clip.png" alt="" width={55} height={63} className={styles.sC4_2} />
                <div className={styles.cardInner}>
                  <div className={styles.councilHeader}>
                    <div className={styles.councilLogo}>
                      <Image src="/image/png/imo.png" alt="IMO" width={94} height={94} className={styles.logoImg} />
                    </div>
                    <div className={styles.councilTitleDesc}>
                      <span className={styles.levelBadge}>Intermediate</span>
                      <h3>INTERNATIONAL MARITIME ORGANIZATION — IMO</h3>
                    </div>
                  </div>
                  <div className={styles.ecstaticBtnWrapper}>
                    <Link href="/JNIMUN/imo" className={`${styles.ecstaticMeetChairBtn} ${styles.btnTextGreen}`}>
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 5: WHO */}
              <div className={`${styles.councilCard} ${styles.cardOrange}`}>
                <Image src="/image/png/JNIMUN%2726/sand_clock.png" alt="" width={65} height={78} className={styles.sC5_1} />
                <Image src="/image/png/JNIMUN%2726/moon.png" alt="" width={50} height={85} className={styles.sC5_2} />
                <div className={styles.cardInner}>
                  <div className={styles.councilHeader}>
                    <div className={styles.councilLogo}>
                      <Image src="/image/png/hcr.png" alt="UNHCR" width={94} height={94} className={styles.logoImg} />
                    </div>
                    <div className={styles.councilTitleDesc}>
                      <span className={styles.levelBadge}>Beginner</span>
                      <h3>UNITED NATIONS HIGH COMMISSIONER FOR REFUGEES — UNHCR</h3>
                    </div>
                  </div>
                  <div className={styles.ecstaticBtnWrapper}>
                    <Link href="/JNIMUN/unhcr" className={`${styles.ecstaticMeetChairBtn} ${styles.btnTextOrange}`}>
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 6: Arab League */}
              <div className={`${styles.councilCard} ${styles.cardTeal}`}>
                <Image src="/image/png/JNIMUN%2726/laptop.png" alt="" width={65} height={64} className={styles.sC6_1} />
                <Image src="/image/png/JNIMUN%2726/brain.png" alt="" width={75} height={62} className={styles.sC6_2} />
                <div className={styles.cardInner}>
                  <div className={styles.councilHeader}>
                    <div className={styles.councilLogo}>
                      <Image src="/image/png/press-new.png" alt="International Press" width={94} height={94} className={styles.logoImg} />
                    </div>
                    <div className={styles.councilTitleDesc}>
                      <span className={styles.levelBadge}>Beginner</span>
                      <h3>INTERNATIONAL PRESS</h3>
                    </div>
                  </div>
                  <div className={styles.ecstaticBtnWrapper}>
                    <Link href="/JNIMUN/press" className={`${styles.ecstaticMeetChairBtn} ${styles.btnTextTeal}`}>
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- International Packages Section --- */}
          <section className={styles.packagesSection}>
            <Image src="/image/png/globe-sticker.png" alt="" width={150} height={150} className={`${styles.packageSticker} ${styles.packageStickerGlobe}`} aria-hidden />
            <Image src="/image/png/JNIMUN%2726/clip.png" alt="" width={86} height={86} className={`${styles.packageSticker} ${styles.packageStickerClip}`} aria-hidden />
            <Image src="/image/png/sticker-hourglass.png" alt="" width={124} height={124} className={`${styles.packageSticker} ${styles.packageStickerHourglass}`} aria-hidden />

            <div className={styles.packagesHeader}>
              <span className={styles.packagesEyebrow}>Choose Your Experience</span>
              <h2 className={styles.packagesTitle}>
                International Packages
              </h2>
              <p className={styles.packagesSubtitle}>
                Join JNIMUN&apos;26 from anywhere in the world. Choose the package that fits your delegation and be part of a global impact.
              </p>
            </div>

            {/* Package Type Tab Selector */}
            <div className={styles.packagePillContainer}>
              <div className={styles.packagePillWrapper} role="tablist" aria-label="International package categories">
                {PACKAGES_DATA.map((pkg, index) => (
                  <button
                    key={pkg.packageName}
                    type="button"
                    role="tab"
                    aria-selected={selectedPackage === pkg.packageName}
                    className={`${styles.packagePillButton} ${selectedPackage === pkg.packageName ? styles.activePillButton : ''}`}
                    onClick={() => setSelectedPackage(pkg.packageName)}
                  >
                    <span className={styles.packagePillIcon}>{index + 1}</span>
                    <span>{formatPackageLabel(pkg.packageName)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.packagesGrid}>
              {displayCards.map((card, index) => (
                <div key={`${card.packageName}-${card.roomType ?? index}`} className={`${styles.packageCard} ${styles[card.colorClass as keyof typeof styles]}`}>
                  <div className={styles.packageCardBadge}>{card.roomType || 'Package'}</div>
                  <div className={styles.packageCardInner}>
                    <h3 className={styles.packageCardTitle}>
                      {formatPackageLabel(card.packageName)}
                    </h3>
                    <p className={styles.packageCardTagline}>{card.tagline}</p>
                    <div className={styles.packagePrices}>
                      <div className={styles.packagePriceRow}>
                        <span className={styles.priceLabel}>{card.roomType || 'USD'}</span>
                        <div className={styles.priceValueWrap}>
                          <span className={styles.priceValue}>${card.price}</span>
                          {card.priceNote && <span className={styles.priceNote}>{card.priceNote}</span>}
                        </div>
                      </div>
                    </div>
                    <ul className={styles.packageFeatures}>
                      {PACKAGE_FEATURES.map((featName) => {
                        const included = card.description.includes(featName)
                        return (
                          <li key={featName} className={`${styles.packageFeature} ${included ? styles.featIncluded : styles.featExcluded}`}>
                            <span className={styles.featIcon}>{included ? '✓' : '✗'}</span>
                            <span className={styles.featName}>{featName}</span>
                          </li>
                        )
                      })}
                    </ul>
                    <Link href="https://docs.google.com/forms/d/e/1FAIpQLSc4YAorOpKZRZcJWXmUr0SYO-4Pr7-H_Fz3CLq3G4LYeabmwQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className={styles.packageApplyBtn}>
                      <span>Apply Now</span>
                      <span className={styles.packageApplyIcon}>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </section>
        </div>
      </main>
      <JNIMUNFooter />
    </>
  )
}

export default JNIMUN
