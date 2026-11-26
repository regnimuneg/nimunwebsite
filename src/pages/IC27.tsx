import type { NextPage } from 'next'
import CustomHead from '@/components/utils/CustomHead'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { IconType } from 'react-icons'
import {
  FaEnvelope,
  FaFacebook,
  FaGlobeAfrica,
  FaInstagram,
  FaLightbulb,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUsers,
} from 'react-icons/fa'
import styles from '@/styles/IC27.module.scss'
import { TBA, ic27Contact, ic27Councils, ic27Details, ic27Faqs } from '@/data/ic27'

const SITE_URL = 'https://nimuneg.org'
const PAGE_DESCRIPTION =
  "Join NIMUN'27, the Nile International Model United Nations conference in Egypt. Explore the councils and international delegate packages, and apply now."
const SHARE_IMAGE = `${SITE_URL}/image/png/IC%2727/images/IMG_5494.JPG`

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/MissionHistory', label: 'ABOUT US' },
  { href: '#details', label: 'CONFERENCE' },
  { href: '#contact', label: 'CONTACT US' },
  { href: '/merch', label: 'MERCH' },
  { href: 'https://portal.nimuneg.org', label: 'PORTAL', external: true },
]

const features: {
  icon: IconType
  number: string
  topTitle: string
  bottomTitle: string
  copy: string
}[] = [
  {
    icon: FaGlobeAfrica,
    number: '01',
    topTitle: 'LEARN',
    bottomTitle: 'DIPLOMACY',
    copy: 'GAIN A DEEPER UNDERSTANDING OF GLOBAL ISSUES AND HOW TO APPROACH THEM COLLABORATIVELY.',
  },
  {
    icon: FaUsers,
    number: '02',
    topTitle: 'FIND YOUR',
    bottomTitle: 'VOICE',
    copy: 'DEVELOP CRITICAL THINKING, PUBLIC SPEAKING, AND NEGOTIATION SKILLS IN A SUPPORTIVE ENVIRONMENT.',
  },
  {
    icon: FaLightbulb,
    number: '03',
    topTitle: 'LEAD WITH',
    bottomTitle: 'PURPOSE',
    copy: 'BE PART OF A COMMUNITY COMMITTED TO CREATING POSITIVE CHANGE BEYOND THE CONFERENCE.',
  },
]

const IC27: NextPage = () => {
  const packageTabs = [
    'SILVER',
    'GOLD',
    'GROUP OF 4',
    'GROUP OF 8',
    'GROUP OF 8-SUPERVISOR',
  ]
  const [selectedPackage, setSelectedPackage] = useState(packageTabs[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const packageCards =
    selectedPackage === 'GROUP OF 4'
      ? [{
          room: 'GROUP OF 4',
          price: '$1,899',
          perDelegate: '$474.75 PER DELEGATE',
          note: 'PER GROUP',
          benefits: ['Accommodation', 'Conference', 'Transportation', 'Outings'],
        }]
      : selectedPackage === 'GROUP OF 8'
        ? [{
            room: 'GROUP OF 8',
            price: '$3,699',
            perDelegate: '$462.38 PER DELEGATE',
            note: 'PER GROUP',
            benefits: ['Accommodation', 'Conference', 'Transportation', 'Outings'],
          }]
        : selectedPackage === 'GROUP OF 8-SUPERVISOR'
          ? [{
              room: 'GROUP OF 8 + SUPERVISOR',
              price: '$4,099',
              perDelegate: '$512.38 PER DELEGATE',
              note: 'PER GROUP',
              benefits: ['Accommodation', 'Conference', 'Transportation', 'Outings'],
            }]
          : selectedPackage === 'GOLD'
            ? [
                { room: 'SINGLE ROOM', price: '$565', note: 'PER DELEGATE', benefits: ['Accommodation', 'Conference', 'Transportation', 'Outings'] },
                { room: 'DOUBLE ROOM', price: '$999', perDelegate: '$499.50 PER DELEGATE', note: 'PER GROUP', benefits: ['Accommodation', 'Conference', 'Transportation', 'Outings'] },
                { room: 'TRIPLE ROOM', price: '$1,499', perDelegate: '$499.67 PER DELEGATE', note: 'PER GROUP', benefits: ['Accommodation', 'Conference', 'Transportation', 'Outings'] },
              ]
            : [
                { room: 'SINGLE ROOM', price: '$450', note: 'PER DELEGATE', benefits: ['Accommodation', 'Conference', 'Transportation'] },
                { room: 'DOUBLE ROOM', price: '$760', perDelegate: '$380 PER DELEGATE', note: 'PER GROUP', benefits: ['Accommodation', 'Conference', 'Transportation'] },
                { room: 'TRIPLE ROOM', price: '$1,199', perDelegate: '$399.67 PER DELEGATE', note: 'PER GROUP', benefits: ['Accommodation', 'Conference', 'Transportation'] },
              ]

  return (
    <>
      <CustomHead
        title="IC27 | Nile International Model United Nations"
        description={PAGE_DESCRIPTION}
        image={SHARE_IMAGE}
        twitterCardType="summary_large_image"
      />

      <main className={styles.page}>
        {/* Top Navigation Bar */}
        <header className={styles.header}>
          <Link href="/" className={styles.brand} aria-label="NIMUN home">
            <span className={styles.brandCorner} aria-hidden="true" />
            <span>NIMUN</span>
            <b>27</b>
          </Link>

          <div className={styles.brandLine} aria-hidden="true" />

          <nav
            id="ic27-nav"
            className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}
            aria-label="Main navigation"
          >
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <Link href="/apply" className={styles.applyTop}>
            APPLY NOW
          </Link>

          <button
            type="button"
            className={menuOpen ? `${styles.menuButton} ${styles.menuButtonOpen}` : styles.menuButton}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="ic27-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </header>

        {/* Hero Section */}
        <section className={styles.hero}>
          <span className={styles.heroCornerBL} aria-hidden="true" />
          <span className={styles.heroCornerBR} aria-hidden="true" />

          <div className={styles.heroCopy}>
            <h1>
              <span>NIMUN</span>
              <b>&apos;27</b>
            </h1>
            <h2>
              SETTING THE
              <br />
              STANDARD
            </h2>
            <p>
              WHERE DIPLOMACY MEETS
              <br />
              THE NEXT GENERATION OF
              <br />
              GLOBAL LEADERS.
            </p>
            <div className={styles.heroActions}>
              <Link href="/apply" className={styles.registerButton}>
                REGISTER NOW
              </Link>
              <span className={styles.blueSparkle} aria-hidden="true">
                <Image src="/image/png/IC'27/elements/star.png" alt="" fill />
              </span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <Image
              src="/image/png/IC'27/images/WhatsApp Image 2026-09-29 at 3.28.54 PM.jpeg"
              alt="NIMUN delegate participating in a conference"
              fill
              priority
              className={styles.heroImage}
            />
          </div>

          <div className={styles.heroLogo}>
            <Image
              src="/image/png/IC'27/elements/blue stamp.png"
              alt="Nile International Model United Nations"
              fill
              className={styles.roundLogo}
            />
          </div>

          <div className={styles.blueBurst} aria-hidden="true">
            <Image
              src="/image/png/IC'27/elements/Deep Blue Eight-Point Starburst.png"
              alt=""
              fill
            />
          </div>
        </section>

        {/* Key Conference Details */}
        <section id="details" className={styles.details} aria-labelledby="ic27-details-title">
          <h2 id="ic27-details-title" className={styles.visuallyHidden}>
            Conference details
          </h2>
          <dl className={styles.detailsGrid}>
            {ic27Details.map((detail) => (
              <div className={styles.detailItem} key={detail.label}>
                <dt>{detail.label}</dt>
                <dd className={detail.value === TBA ? styles.tba : undefined}>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* About & Overlapping Feature Cards Section */}
        <section className={styles.aboutSection}>
          <div className={styles.aboutTop}>
            <div className={styles.aboutPhoto}>
              <Image
                src="/image/png/IC'27/images/IMG_5101.JPG"
                alt="A NIMUN conference session"
                fill
                className={styles.aboutImage}
              />
            </div>

            <div className={styles.aboutRight}>
              <div className={styles.aboutHeaderRow}>
                <div className={styles.aboutTitleBlock}>
                  <div className={styles.sectionKicker}>
                    <span>ABOUT NIMUN</span>
                    <i aria-hidden="true" />
                  </div>
                  <h2>
                    MORE THAN
                    <br />A <b>CONFERENCE</b>
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Feature Cards Overlapping the About Photo */}
          <div className={styles.features} aria-label="What you can gain">
            <span className={styles.featuresSparkle} aria-hidden="true">
              <Image src="/image/png/IC'27/elements/star.png" alt="" fill />
            </span>
            {features.map((feature) => (
              <article className={styles.feature} key={feature.number}>
                <div className={styles.featureTop}>
                  <feature.icon className={styles.featureIcon} aria-hidden="true" />
                  <span>{feature.number}</span>
                </div>
                <h3>
                  {feature.topTitle}
                  <br />
                  <b>{feature.bottomTitle}</b>
                </h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Councils Section */}
        <section className={styles.councils}>
          <div className={styles.councilHeading}>
            <div className={styles.councilKicker}>
              <span>COUNCILS</span>
              <i aria-hidden="true" />
            </div>
            <div className={styles.councilTitleRow}>
              <span className={styles.councilLeftBar} aria-hidden="true" />
              <h2>
                EXPLORE THE <b>COUNCILS</b>
              </h2>
            </div>
            <span className={styles.councilCornerBR} aria-hidden="true" />
          </div>

          <div className={styles.councilGrid}>
            {ic27Councils.map((council) => (
              <article className={styles.councilCard} key={council.number}>
                <div className={styles.councilTitle}>
                  <b>{council.number}</b>
                  <h3>
                    {council.prefix && (
                      <span className={styles.blueInline}>{council.prefix}</span>
                    )}
                    <span>{council.topLine}</span>
                    {council.bottomLine && (
                      <>
                        <br />
                        <span
                          className={
                            council.highlightBottom ? styles.blueInline : undefined
                          }
                        >
                          {council.bottomLine}
                        </span>
                      </>
                    )}
                  </h3>
                </div>
                <div className={styles.councilMark} aria-hidden="true">
                  {/* PLACEHOLDER: swap in each council's own emblem once the design team provides them */}
                  <Image
                    src="/image/png/IC'27/elements/blue stamp.png"
                    alt=""
                    fill
                    className={styles.councilEmblem}
                  />
                </div>
                <dl className={styles.councilInfo}>
                  <div>
                    <dt>TOPIC</dt>
                    <dd className={council.topic === TBA ? styles.tba : undefined}>{council.topic}</dd>
                  </div>
                  <div>
                    <dt>CHAIRS</dt>
                    <dd className={council.chairs === TBA ? styles.tba : undefined}>{council.chairs}</dd>
                  </div>
                </dl>
                {council.studyGuideUrl ? (
                  <a
                    href={council.studyGuideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.councilGuide}
                  >
                    STUDY GUIDE
                  </a>
                ) : (
                  <span className={`${styles.councilGuide} ${styles.councilGuideDisabled}`}>
                    STUDY GUIDE SOON
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Bottom Impact CTA Section */}
        <section className={styles.impact}>
          <div className={styles.impactPhoto}>
            <Image
              src="/image/png/IC'27/images/IMG_5494.JPG"
              alt="Delegates sharing ideas at NIMUN"
              fill
              className={styles.impactImage}
            />
          </div>

          <div className={styles.impactSetting}>
            <span className={styles.whiteSparkle} aria-hidden="true">
              <Image src="/image/png/IC'27/elements/star.png" alt="" fill />
            </span>
            <div className={styles.settingTextBox}>
              <span className={styles.settingRule} aria-hidden="true" />
              <p>
                SETTING
                <br />
                THE
                <br />
                STANDARD
              </p>
              <span className={styles.settingRule} aria-hidden="true" />
            </div>
            <span className={styles.whiteSwish} aria-hidden="true">
              <Image
                src="/image/png/IC'27/elements/element_F3ECE4_transparent.png"
                alt=""
                fill
              />
            </span>
          </div>

          <div className={styles.impactCopy}>
            <p className={styles.impactKicker}>BE A PART OF NIMUN</p>
            <h2>
              READY TO MAKE
              <br />
              AN <b>IMPACT ?</b>
            </h2>
            <h3>
              JOIN A DIVERSE COMMUNITY OF STUDENTS, LEADERS,
              <br />
              CHANGE-MAKERS
            </h3>
            <Link href="/apply" className={styles.impactButton}>
              APPLY NOW
            </Link>
            <span className={styles.blueSwish} aria-hidden="true">
              <Image
                src="/image/png/IC'27/elements/Layer 25 copy.png"
                alt=""
                fill
              />
            </span>
          </div>
        </section>

        {/* International Packages Section */}
        <section className={styles.packages}>
          <span className={styles.packagesCornerTL} aria-hidden="true" />
          <span className={styles.packagesCornerTR} aria-hidden="true" />
          <span className={styles.packagesBlueSwish} aria-hidden="true">
            <Image
              src="/image/png/IC'27/elements/Layer 25 copy.png"
              alt=""
              fill
            />
          </span>
          <div className={styles.packagesHeading}>
            <span className={styles.packagesSparkleTop} aria-hidden="true">
              <Image src="/image/png/IC'27/elements/star.png" alt="" fill />
            </span>
            <span className={styles.packagesSparkleBottom} aria-hidden="true">
              <Image src="/image/png/IC'27/elements/star.png" alt="" fill />
            </span>
            <p>CHOOSE YOUR EXPERIENCE</p>
            <h2>
              INTERNATIONAL <b>PACKAGES</b>
            </h2>
          </div>

          <div className={styles.packageTabs} role="tablist" aria-label="International package type">
            {packageTabs.map((tab) => (
              <button
                type="button"
                role="tab"
                aria-selected={selectedPackage === tab}
                className={selectedPackage === tab ? styles.packageTabActive : styles.packageTab}
                key={tab}
                onClick={() => setSelectedPackage(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.packageCards}>
            {packageCards.map((card) => (
              <article className={styles.packageCard} key={card.room}>
                <div className={styles.packageCardLabel}>{card.room}</div>
                <div className={styles.packageCardContent}>
                  <p>{card.note}</p>
                  <strong>{card.price}</strong>
                  {card.perDelegate && (
                    <p className={styles.perDelegate}>{card.perDelegate}</p>
                  )}
                  <ul className={styles.packageBenefits}>
                    {card.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                  <Link href="/apply" className={styles.packageApply}>
                    APPLY
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.packageDecoration} aria-hidden="true">
            <Image
              src="/image/png/IC'27/elements/blue stamp.png"
              alt=""
              fill
              className={styles.packageEmblem}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faq} aria-labelledby="ic27-faq-title">
          <div className={styles.councilKicker}>
            <span>FAQ</span>
            <i aria-hidden="true" />
          </div>
          <h2 id="ic27-faq-title" className={styles.faqTitle}>
            GOOD TO <b>KNOW</b>
          </h2>
          <div className={styles.faqList}>
            {ic27Faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div className={styles.faqItem} key={faq.question}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`ic27-faq-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <b aria-hidden="true">{isOpen ? '−' : '+'}</b>
                    </button>
                  </h3>
                  <p id={`ic27-faq-${index}`} hidden={!isOpen}>
                    {faq.answer}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className={styles.footer}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo}>
              NIMUN<b>27</b>
            </Link>
            <p>Nile International Model United Nations</p>
          </div>

          <address className={styles.footerContact}>
            <a href={ic27Contact.phoneHref}>
              <FaPhoneAlt aria-hidden="true" />
              <span>{ic27Contact.phone}</span>
            </a>
            <a href={`mailto:${ic27Contact.email}`}>
              <FaEnvelope aria-hidden="true" />
              <span>{ic27Contact.email}</span>
            </a>
            <span>
              <FaMapMarkerAlt aria-hidden="true" />
              <span>{ic27Contact.address}</span>
            </span>
          </address>

          <div className={styles.footerSide}>
            <div className={styles.footerSocials}>
              <a href={ic27Contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="NIMUN Instagram">
                <FaInstagram />
              </a>
              <a href={ic27Contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="NIMUN LinkedIn">
                <FaLinkedin />
              </a>
              <a href={ic27Contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="NIMUN Facebook">
                <FaFacebook />
              </a>
            </div>
            <Link href="/apply" className={styles.footerApply}>
              APPLY NOW
            </Link>
          </div>

          <p className={styles.footerCopy}>© {new Date().getFullYear()} NIMUN. All rights reserved.</p>
        </footer>
      </main>
    </>
  )
}

export default IC27