import type { NextPage } from 'next'
import styles from '@/styles/JNIMUN.module.scss'
import Image from 'next/image'
import { useEffect } from 'react'
import Packages from '@/components/landing/Packages'

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
    <main className={styles.main}>
      <div className={styles.heroSection}>
        <Image
          src="/image/png/JNIMUN_Hero.jpg" // Make sure this path is correct in your project
          alt="JNIMUN Hero"
          fill
          className={styles.heroImage}
          priority
          objectFit="cover"
        />

        {/* LEARN MORE Button with decorative icons */}
        <div className={styles.learnMoreWrapper}>
          <img src="/image/png/A+.png" alt="A+" className={styles.iconAPlus} />
          <img src="/image/png/coin.png" alt="Coin" className={styles.iconCoin} />
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScrVEKoYhayW42Sk2j4MNnKyIOpCqOzEj0B60fikL3KTigArQ/viewform"
            className={styles.learnMoreBtn}
          >
            <span className={styles.learnMoreText}>APPLY NOW!</span>
          </a>
          <img src="/image/png/bubble.png" alt="Bubble" className={styles.iconBubble} />
          <img src="/image/png/nefertiti.png" alt="Nefertiti" className={styles.iconNefertiti} />
        </div>
      </div>

      {/* --- What is JNIMUN Section --- */}
      <section className={styles.whatIsSection}>
        <div className={styles.titleContainer}>
          <div className={styles.titleLineLeft}></div>
          <h2 className={styles.titleText}>WHAT IS JNIMUN?</h2>
          <div className={styles.titleLineRight}></div>
        </div>
        <div className={styles.cardBackground}>
          <div className={styles.divider}></div>
          <div className={styles.contentBox}>
            <div className={styles.textBox}>
              <p>
                JNIMUN is dedicated to empowering high school students from over 20 schools. JNIMUN
                provides young participants with a unique opportunity to develop their public
                speaking, negotiation, and leadership skills.
              </p>
            </div>
            <div className={styles.imageBox}>
              <Image
                className={styles.Image} // This class now just adds border-radius via parent
                src="/image/png/what_jnimun.jpg"
                alt="JNIMUN Conference"
                layout="fill"
                objectFit="cover"
              />
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
  )
}

export default JNIMUN
