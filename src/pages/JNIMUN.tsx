import type { NextPage } from 'next'
import styles from '@/styles/JNIMUN.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Packages from '@/components/landing/Packages'
import ApplyNavbar from '@/components/apply/ApplyNavbar'

const JNIMUN: NextPage = () => {
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
          ;(item as HTMLElement).style.setProperty('--x', `${x}px`)
          ;(item as HTMLElement).style.setProperty('--y', `${y}px`)
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

        <div className={styles.stickerCluster} aria-hidden="true">
          <Image
            src="/image/png/monochrome_globe_sticker_illustration.png?v=2"
            alt=""
            width={430}
            height={430}
            className={`${styles.heroSticker} ${styles.stickerGlobe}`}
            priority
          />
        </div>

        {/* LEARN MORE Button with decorative icons */}
        <div className={styles.learnMoreWrapper}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScrVEKoYhayW42Sk2j4MNnKyIOpCqOzEj0B60fikL3KTigArQ/viewform"
            className={styles.learnMoreBtn}
          >
            <span className={styles.learnMoreText}>APPLY NOW</span>
          </a>
        </div>

        <Image
          src="/image/png/JNIMUN%2726/big_star.png"
          alt=""
          width={300}
          height={300}
          className={styles.cornerStar}
          aria-hidden="true"
        />
        <Image
          src="/image/png/JNIMUN%2726/basic/megaphone.png"
          alt=""
          width={120}
          height={120}
          className={styles.cornerMegaphone}
          aria-hidden="true"
        />
        <Image
          src="/image/png/JNIMUN%2726/rays.png"
          alt=""
          width={140}
          height={90}
          className={styles.cornerRays}
          aria-hidden="true"
        />
      </div>

      {/* --- Our Councils Section --- */}
      <section className={styles.ourCouncilsSection}>
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
            <Image src="/image/png/element_11_x731_y263_w149_h185.png" alt="" width={60} height={75} className={styles.sC1_1} />
            <Image src="/image/png/element_04_x733_y91_w150_h147.png" alt="" width={60} height={60} className={styles.sC1_2} />
            <div className={styles.cardInner}>
              <div className={styles.councilHeader}>
                <div className={styles.councilLogo}>
                  <Image src="/image/png/security.png" alt="Security Council" width={94} height={94} className={styles.logoImg} />
                </div>
                <div className={styles.councilTitleDesc}>
                  <span className={styles.levelBadge}>Advanced</span>
                  <h3>SECURITY COUNCIL — SC</h3>
                  <p>Address global peace, security,<br/>conflict resolution, and international crises.</p>
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
            <Image src="/image/png/element_15_x864_y394_w193_h210.png" alt="" width={65} height={70} className={styles.sC2_1} />
            <Image src="/image/png/element_06_x1361_y97_w85_h187.png" alt="" width={35} height={75} className={styles.sC2_2} />
            <div className={styles.cardInner}>
              <div className={styles.councilHeader}>
                <div className={styles.councilLogo}>
                  <Image src="/image/png/crisis.png" alt="Crisis Committee" width={94} height={94} className={styles.logoImg} />
                </div>
                <div className={styles.councilTitleDesc}>
                  <span className={styles.levelBadge}>Advanced</span>
                  <h3>CRISIS COMMITTEE</h3>
                  <p>Respond to fast-moving emergencies<br/>through strategy, negotiation, and quick decision-making.</p>
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
            <Image src="/image/png/element_08_x545_y129_w159_h247.png" alt="" width={50} height={77} className={styles.sC3_1} />
            <Image src="/image/png/element_07_x1472_y63_w230_h190.png" alt="" width={75} height={60} className={styles.sC3_2} />
            <div className={styles.cardInner}>
              <div className={styles.councilHeader}>
                <div className={styles.councilLogo}>
                  <Image src="/image/png/odc.png" alt="UNODC" width={94} height={94} className={styles.logoImg} />
                </div>
                <div className={styles.councilTitleDesc}>
                  <span className={styles.levelBadge}>Intermediate</span>
                  <h3>UNITED NATIONS OFFICE ON DRUGS AND CRIME — UNODC</h3>
                  <p>Combat crime, corruption, drug trafficking,<br/>and threats to justice worldwide.</p>
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
            <Image src="/image/png/element_05_x1163_y67_w148_h225.png" alt="" width={45} height={68} className={styles.sC4_1} />
            <Image src="/image/png/element_10_x329_y263_w159_h180.png" alt="" width={55} height={63} className={styles.sC4_2} />
            <div className={styles.cardInner}>
              <div className={styles.councilHeader}>
                <div className={styles.councilLogo}>
                  <Image src="/image/png/imo.png" alt="IMO" width={94} height={94} className={styles.logoImg} />
                </div>
                <div className={styles.councilTitleDesc}>
                  <span className={styles.levelBadge}>Intermediate</span>
                  <h3>INTERNATIONAL MARITIME ORGANIZATION — IMO</h3>
                  <p>Promote safe, secure, and sustainable<br/>international shipping.</p>
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
            <Image src="/image/png/element_09_x1061_y234_w205_h247.png" alt="" width={65} height={78} className={styles.sC5_1} />
            <Image src="/image/png/element_16_x186_y420_w156_h274.png" alt="" width={50} height={85} className={styles.sC5_2} />
            <div className={styles.cardInner}>
              <div className={styles.councilHeader}>
                <div className={styles.councilLogo}>
                  <Image src="/image/png/hcr.png" alt="UNHCR" width={94} height={94} className={styles.logoImg} />
                </div>
                <div className={styles.councilTitleDesc}>
                  <span className={styles.levelBadge}>Beginner</span>
                  <h3>UNITED NATIONS HIGH COMMISSIONER FOR REFUGEES — UNHCR</h3>
                  <p>Protect refugees, support displaced people,<br/>and promote humanitarian solutions.</p>
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
            <Image src="/image/png/element_14_x560_y415_w221_h216.png" alt="" width={65} height={64} className={styles.sC6_1} />
            <Image src="/image/png/element_01_x268_y31_w228_h189.png" alt="" width={75} height={62} className={styles.sC6_2} />
            <div className={styles.cardInner}>
              <div className={styles.councilHeader}>
                <div className={styles.councilLogo}>
                  <Image src="/image/png/press-new.png" alt="International Press" width={94} height={94} className={styles.logoImg} />
                </div>
                <div className={styles.councilTitleDesc}>
                  <span className={styles.levelBadge}>Beginner</span>
                  <h3>INTERNATIONAL PRESS</h3>
                  <p>Report, question, and document global events<br/>with accuracy and impact.</p>
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
      {/* JNIMUN: Making a Difference - Bento Grid */}
      <section className={styles.statsSection}>
        <div className={styles.bentoContainer}>
          <h2 className={styles.bentoTitle}>JNIMUN: Making a Difference</h2>

          <div className={styles.bentoGrid}>
            {/* Left Column - Delegate Growth */}
            <div className={`${styles.bentoItem} ${styles.delegateGrowth}`}>
              <div className={styles.statNumber}>185</div>
              <div className={styles.statLabel}>Total Delegates</div>
              <div className={styles.growthBadge}>+16% Growth</div>
            </div>

            {/* Left Column - Schools */}
            <div className={`${styles.bentoItem} ${styles.schoolsParticipated}`}>
              <div className={styles.statNumber}>25+</div>
              <div className={styles.statLabel}>Schools Participated</div>
              <div className={styles.schoolsList}>
                <div className={styles.schoolItem}>International Schools</div>
                <div className={styles.schoolItem}>Public Schools</div>
                <div className={styles.schoolItem}>Private Schools</div>
                <div className={styles.schoolItem}>Language Schools</div>
              </div>
            </div>

            {/* Left Column - UN Councils */}
            <div className={`${styles.bentoItem} ${styles.committees}`}>
              <div className={styles.statNumber}>6</div>
              <div className={styles.statLabel}>UN Councils</div>
              <div className={styles.councilGrid}>
                <div className={styles.councilDot}></div>
                <div className={styles.councilDot}></div>
                <div className={styles.councilDot}></div>
                <div className={styles.councilDot}></div>
                <div className={`${styles.councilDot} ${styles.newCouncil}`}></div>
                <div className={`${styles.councilDot} ${styles.newCouncil}`}></div>
              </div>
            </div>

            {/* Center - Main Image */}
            <div
              className={styles.statsImageContainer}
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLScrVEKoYhayW42Sk2j4MNnKyIOpCqOzEj0B60fikL3KTigArQ/viewform?usp=dialog',
                  '_blank'
                )
              }
            >
              <Image
                src="/image/png/IMG_Stats.png"
                alt="JNIMUN Students celebrating"
                fill
                className={styles.mainStatImage}
                priority
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayText}>JNIMUN: Making a Difference</div>
                <div className={styles.editionBadge}>3rd Edition Recruiting</div>
              </div>
            </div>

            {/* Right Top - Confidence Boost */}
            <div className={`${styles.bentoItem} ${styles.confidenceBoost}`}>
              <div className={styles.statNumber}>85%</div>
              <div className={styles.statLabel}>Confidence Boost</div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
              </div>
            </div>

            {/* Right - Skills Gained */}
            <div className={`${styles.bentoItem} ${styles.skillsGained}`}>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>Key Skills Developed</div>
              <div className={styles.skillsList}>
                <div className={styles.skillItem}>Public Speaking</div>
                <div className={styles.skillItem}>Negotiation</div>
                <div className={styles.skillItem}>Critical Thinking</div>
                <div className={styles.skillItem}>Global Awareness</div>
                <div className={styles.skillItem}>Leadership</div>
              </div>
            </div>

            {/* Right - Total Debate Time */}
            <div className={`${styles.bentoItem} ${styles.debateTime}`}>
              <div className={styles.statNumber}>23+</div>
              <div className={styles.statLabel}>Hours of Debate</div>
            </div>

            {/* Bottom Wide - Resolutions Passed */}
            <div className={`${styles.bentoItem} ${styles.resolutionsPassed}`}>
              <div className={styles.statNumber}>12</div>
              <div className={styles.statLabel}>Resolutions Passed</div>
              <div className={styles.resolutionProgressWrapper}>
                <div className={styles.resolutionCircle}>
                  <svg className={styles.resolutionSvg} viewBox="0 0 100 100">
                    <circle className={styles.resolutionBackground} cx="50" cy="50" r="40" />
                    <circle className={styles.resolutionForeground} cx="50" cy="50" r="40" />
                  </svg>
                  <div className={styles.resolutionInnerCircle}>
                    <span className={styles.resolutionNumber}>12</span>
                    <span className={styles.resolutionCircleLabel}>Passed</span>
                  </div>
                </div>
              </div>
              <div className={styles.resolutionBadgesAlt}>
                <div className={styles.resolutionBadgeAlt}>✓ Achieved Goals</div>
                <div className={styles.resolutionBadgeAlt}>🌍 Meaningful Impact</div>
              </div>
            </div>

            {/* Bottom Right - Performance Showcases */}
            <div className={`${styles.bentoItem} ${styles.performanceShowcases}`}>
              <div className={styles.statNumber}>13</div>
              <div className={styles.statLabel}>Performance Showcases</div>
              <div className={styles.performanceHighlights}>
                <div className={styles.performanceHighlightItem}>
                  <span className={styles.highlightIcon}>🎭</span>
                  <span className={styles.highlightText}>Solo Performances: </span>
                  <span className={styles.highlightNumber}>7</span>
                </div>
                <div className={styles.performanceHighlightItem}>
                  <span className={styles.highlightIcon}>🎤</span>
                  <span className={styles.highlightText}>Council Acts: </span>
                  <span className={styles.highlightNumber}>6</span>
                </div>
                <div className={styles.performanceHighlightItem}>
                  <span className={styles.highlightIcon}>🌟</span>
                  <span className={styles.highlightText}>Total Showcases: </span>
                  <span className={styles.highlightNumber}>13</span>
                </div>
              </div>
            </div>

            {/* Organizers - Split */}
            <div className={`${styles.bentoItem} ${styles.organizersBox}`}>
              <div className={styles.statNumber}>120+</div>
              <div className={styles.statLabel}>Student Organizers</div>
            </div>

            {/* Founded - Moved next to organizers */}
            <div className={`${styles.bentoItem} ${styles.conferenceImpact}`}>
              <div className={styles.statNumber}>2023</div>
              <div className={styles.statLabel}>Founded</div>
              <div className={styles.impactBadge}>Growing Strong 🚀</div>
            </div>
          </div>
        </div>
      </section>
      {/* --- Experience & Grid Sections --- */}
      <section className={styles.ExperienceSection}>
        <div className={styles.titleContainer}>
          <div className={styles.ExperienceLineLeft}></div>
          <h2 className={styles.titleText}>
            THE JNIMUN <br />
            EXPERIENCE
          </h2>
          <div className={styles.ExperienceLineRight}></div>
        </div>
        <br />
        <div className={styles.SessionsBox}>
          <div className={styles.SessionstextBox}>
            <p>
              JNIMUN is an enriching experience that enhances public speaking, diplomacy, and
              critical thinking skills. Delegates collaborate, negotiate, and resolve real-world
              issues, mirroring the complexities of international relations.
            </p>
          </div>
          <div className={styles.SessionsimageBox}>
            <Image
              className={styles.Image} // This class now just adds border-radius via parent
              src="/image/png/JNIMUN Sessions.jpg" // Assuming this is the correct image for the sessions box
              alt="JNIMUN Sessions"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      <section className={styles.conferenceLayoutSection}>
        <div className={styles.conferenceLayoutContainer}>
          {/* Left Vertical Card */}
          <div className={`${styles.conferenceCardLeft}`}>
            {' '}
            <div className={styles.conferenceLeftImageContainer}>
              <Image
                src="/image/png/JNIMUN Conference.jpg"
                alt="JNIMUN Conference Details"
                layout="fill" // Use fill layout
                objectFit="cover" // Cover the container
                className={styles.conferenceImageVertical} // Style the image itself if needed (e.g., border-radius)
              />
            </div>
            <div className={styles.conferenceLeftText}>
              <p>
                JNIMUN Conference immerses participants in a dynamic simulation of United Nations
                councils. Delegates represent countries, draft resolutions, and engage in formal
                debates on pressing global issues—experiencing diplomacy firsthand in a structured
                setting.
              </p>
            </div>
          </div>

          {/* Right Column for Horizontal Cards */}
          <div className={styles.conferenceCardsRight}>
            <div className={`${styles.conferenceCardRightItemOne} ${styles.bentoItem}`}>
              {' '}
              {/* Added bentoItem */}
              <Image
                src="/image/png/JNIMUN Opening.jpg"
                alt="JNIMUN Opening Ceremony"
                layout="fill"
                objectFit="cover"
                className={styles.conferenceImageOne}
              />
            </div>
            <div className={`${styles.conferenceCardRightItem} ${styles.bentoItem}`}>
              {' '}
              {/* Added bentoItem */}
              <Image
                src="/image/png/jnimun_pink.png"
                alt="JNIMUN 25 Logo"
                layout="fill"
                objectFit="cover" // Use cover, or contain if you don't want cropping
                className={styles.conferenceImage}
              />
            </div>
            <div className={`${styles.conferenceCardRightItemThree} ${styles.bentoItem}`}>
              {' '}
              {/* Added bentoItem */}
              <Image
                src="/image/png/JNIMUN Closing.jpg"
                alt="JNIMUN Closing Ceremony"
                layout="fill"
                objectFit="cover"
                className={styles.conferenceImageThree}
              />
            </div>
          </div>
        </div>

        {/* --- Experience Section --- */}
        <div className={styles.SessionsBox}>
          <div className={styles.SessionsimageBox}>
            <Image
              className={styles.Image} // This class now just adds border-radius via parent
              src="/image/png/JNIMUN Performance Day.jpg" // Assuming this is the correct image for the sessions box
              alt="JNIMUN Sessions"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.SessionstextBox}>
            <p>
              JNIMUN is where serious global issues meet the energy of passionate young minds,
              creating a whirlwind of debates, diplomacy, and new friendships. From late-night
              resolution writing to intense committee sessions, it’s a rollercoaster of learning and
              laughter.
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className={styles.Bluedivider}></div>
      </section>

      <section className={styles.History}>
        <div className={styles.titleContainer}>
          <div className={styles.titleLineLeft}></div>
          <h2 className={styles.titleText}>JNIMUN'S HISTORY</h2>
          <div className={styles.titleLineRight}></div>
        </div>
        <div className={styles.SessionsBox}>
          <div className={styles.SessionstextBox}>
            <p>
              Over the years, JNIMUN has grown into a recognized conference that attracts
              participants from various schools and countries, known for its commitment to
              meaningful debate, inclusivity, and fostering future global leaders.
            </p>
          </div>
          <div className={styles.SessionsimageBox}>
            <Image
              className={styles.Image} // This class now just adds border-radius via parent
              src="/image/png/JNIMUN History.jpg" // Assuming this is the correct image for the sessions box
              alt="JNIMUN Sessions"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div className={styles.divider}></div>
      </section>
      <Packages />
    </main>
    </>
  )
}

export default JNIMUN
