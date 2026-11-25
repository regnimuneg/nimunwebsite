import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from '@/styles/IC27.module.scss'

const councils = [
  {
    number: '01',
    topLine: 'SECURITY',
    bottomLine: 'COUNCIL',
    highlightBottom: true,
  },
  {
    number: '02',
    prefix: 'UN',
    topLine: 'WOMEN',
  },
  {
    number: '03',
    topLine: 'UNESCO',
  },
  {
    number: '04',
    topLine: 'UNICEF',
  },
  {
    number: '05',
    topLine: 'DISEC',
  },
]

const features = [
  {
    icon: "/image/png/IC'27/elements/Blue Globe, People, and Light Bulb Icons.png",
    number: '01',
    topTitle: 'LEARN',
    bottomTitle: 'DIPLOMACY',
    copy: 'GAIN A DEEPER UNDERSTANDING OF GLOBAL ISSUES AND HOW TO APPROACH THEM COLLABORATIVELY.',
  },
  {
    icon: "/image/png/IC'27/elements/Blue Globe, People, and Light Bulb Icons.png",
    number: '02',
    topTitle: 'FIND YOUR',
    bottomTitle: 'VOICE',
    copy: 'DEVELOP CRITICAL THINKING, PUBLIC SPEAKING, AND NEGOTIATION SKILLS IN A SUPPORTIVE ENVIRONMENT.',
  },
  {
    icon: "/image/png/IC'27/elements/Blue Globe, People, and Light Bulb Icons.png",
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
      <Head>
        <title>IC27 | Nile International Model United Nations</title>
      </Head>

      <main className={styles.page}>
        {/* Top Navigation Bar */}
        <header className={styles.header}>
          <Link href="/" className={styles.brand} aria-label="NIMUN home">
            <span className={styles.brandCorner} aria-hidden="true" />
            <span>NIMUN</span>
            <b>27</b>
          </Link>

          <div className={styles.brandLine} aria-hidden="true" />

          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/">HOME</Link>
            <Link href="/MissionHistory">ABOUT US</Link>
            <Link href="/Archives">CONFERENCE</Link>
            <Link href="/hierarchy">CONTACT US</Link>
            <Link href="/merch">MERCH</Link>
            <Link href="/apply">PORTAL</Link>
          </nav>

          <Link href="/apply" className={styles.applyTop}>
            APPLY NOW
          </Link>
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
                  <Image src={feature.icon} alt="" width={54} height={54} />
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
            {councils.map((council) => (
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
                <div className={styles.councilMark}>
                  <Image
                    src="/image/png/IC'27/elements/blue stamp.png"
                    alt={`${council.topLine} emblem`}
                    fill
                    className={styles.councilEmblem}
                  />
                </div>
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
      </main>
    </>
  )
}

export default IC27