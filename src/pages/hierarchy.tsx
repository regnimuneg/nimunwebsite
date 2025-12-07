import React, { useEffect, useRef } from 'react'
import styles from '@/styles/Hierarchy.module.scss' // Import SCSS module
import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import gsap from 'gsap'

// High Board imports from 26 folder
import FarahHB from '@public/image/People/HB/26/Farah.png'
import Rawya from '@public/image/People/HB/26/Rawya.png'
import DSG from '@public/image/People/HB/26/DSG.png'
import CM from '@public/image/People/HB/26/CM.png'

// Organizing Committee imports from NIMUN26 folder
import Adham from '@public/image/People/OC/NIMUN26/Adham.png'
import Omar from '@public/image/People/OC/NIMUN26/Omar.png'
import Asmar from '@public/image/People/OC/NIMUN26/Asmar.png'
import Tifa from '@public/image/People/OC/NIMUN26/Tifa.png'
import Rana from '@public/image/People/OC/NIMUN26/Rana.png'
import Yassine from '@public/image/People/OC/NIMUN26/Yassine.png'
import Kabbani from '@public/image/People/OC/NIMUN26/Kabbani.png'
import Lina from '@public/image/People/OC/NIMUN26/Lina.png'
import FC from '@public/image/People/OC/NIMUN26/FC.png'
import Hossam from '@public/image/People/OC/NIMUN26/Hossam.png'
import Fallal from '@public/image/People/OC/NIMUN26/Fallal.png'
import Amina from '@public/image/People/OC/NIMUN26/Amina.png'
import Wafa from '@public/image/People/OC/NIMUN26/Wafa.png'
import Engy from '@public/image/People/OC/NIMUN26/Engy.png'
import MalakK from '@public/image/People/OC/NIMUN26/Malak K.png'


interface Person {
  name: string
  position?: string
  head?: string
  viceHead?: string
  viceHead2?: string
  image?: string | StaticImageData | undefined // Include undefined as a type
  headImage?: string | StaticImageData | undefined // Include undefined as a type
  viceHeadImage?: string | StaticImageData | undefined // Include undefined as a type
  viceHead2Image?: string | StaticImageData | undefined // Include undefined as a type
  isCoordinator?: boolean // Flag for coordinator positions
  // Custom image positioning (e.g., 'center top', 'center 30%', 'center bottom')
  imagePosition?: string
  headImagePosition?: string
  viceHeadImagePosition?: string
  viceHead2ImagePosition?: string
}

const HighBoard: Person[] = [
  { name: 'Rawya Nabil', position: 'Academic Director', image: Rawya, imagePosition: "center 10%" },
  { name: 'Farah Ghaly', position: 'Secretary General', image: FarahHB, imagePosition: "center 30%" },
  { name: 'Nizar Amer', position: 'Deputy Secretary General', image: DSG, imagePosition: "center 30%" },
  { name: 'Seif Elnahas', position: 'Conference Manager', image: CM }
]

const OrganizingCommittee: Person[] = [
  {
    name: 'Registration Affairs',
    head: 'Adham Abdelaal',
    viceHead: 'Omar Sherif',
    viceHead2: 'Rana Shafik',
    headImage: Adham,
    headImagePosition: "center 10%",
    viceHeadImage: Omar,
    viceHeadImagePosition: "center top",
    viceHead2Image: Rana,
    viceHead2ImagePosition: "center 10%",
  },
  {
    name: 'Operations & Logistics',
    head: 'Mohamed Abuelwafa',
    viceHead: 'Yassine Mohamed',
    viceHead2: 'Hana Elfallal',
    headImage: Wafa,
    headImagePosition: "center 40%",
    viceHeadImage: Yassine,
    viceHead2Image: Fallal,
    viceHeadImagePosition: "center 10%",
    viceHead2ImagePosition: "center 50%",
  },
  {
    name: 'Public Relations',
    head: 'Ali Kabbani',
    viceHead: 'Amina Kamal',
    viceHead2: 'Malak Khaled',
    headImage: Kabbani,
    headImagePosition: "center 30%",
    viceHeadImage: Amina,
    viceHead2Image: MalakK,
    viceHeadImagePosition: "center 20%",
    viceHead2ImagePosition: "center 40%",
  },
  {
    name: 'Media & Design',
    head: 'Hossam Aqeel',
    viceHead: 'Seif alasmar',
    viceHead2: 'Engy Lutfi',
    headImage: Hossam,
    headImagePosition: "center 17%",
    viceHeadImage: Asmar, 
    viceHeadImagePosition: "center 20%",
    viceHead2Image: Engy,
    viceHead2ImagePosition: "center 30%",
  },
  {
    name: 'Socials & Events',
    head: 'Mostafa Salama',
    viceHead: 'Lina Amr',
    headImage: Tifa,
    headImagePosition: "center 30%",
    viceHeadImage: Lina,
    viceHeadImagePosition: "center 25%",
  },
  {
    name: 'Financial Coordinator',
    head: 'Belal Amer',
    headImage: FC,
    headImagePosition: "center 30%",
    isCoordinator: true, // Flag to indicate this is a coordinator, not a head
  },
]

// const AcademicCommittees: { council: string; members: Person[] }[] = [
//   {
//     council: 'ICJ',
//     members: [
//       { name: 'Zein Raafat', position: 'President', image: ZeinRaafat },
//       { name: 'Omar Awad', position: 'Vice President', image: OmarAkl },
//     ],
//   },
//   {
//     council: 'SPECPOL',
//     members: [
//       { name: 'Farah Ghaly', position: 'President', image: FarahGhaly },
//       { name: 'Adham Ahmed', position: 'Director', image: AdhamAhmed },
//       { name: 'Ameena Yehia', position: 'Rapporteur', image: AmeenaYahya },
//     ],
//   },
//   {
//     council: 'UNFCCC COP',
//     members: [
//       { name: 'Rana Aboelhassan', position: 'Chair', image: RanaAboElHassan },
//       { name: 'Rawya Nabil', position: 'Co-chair', image: RawyaNabil },
//     ],
//   },
//   {
//     council: 'UNESCO',
//     members: [
//       { name: 'Mohab Hegazy', position: 'Chair', image: MohabHegazy },
//       { name: 'Alia Nafea', position: 'Co-chair', image: AliaNafea },
//     ],
//   },
//   {
//     council: 'UNHRC',
//     members: [
//       { name: 'Nizar Amer', position: 'President', image: NizarAmer },
//       { name: 'Kareem Tantawy', position: 'Director', image: KareemTantawi },
//       { name: 'Mariam Kabbany', position: 'Rapporteur', image: MariamKabbany },
//     ],
//   },
//   {
//     council: 'Press Head',
//     members: [{ name: 'Karen Effat', image: KarenEffat }],
//   },
// ]

const Hierarchy: React.FC = () => {
  const leftShapeRef = useRef<HTMLImageElement>(null)
  const rightShapeRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    // Floating animation for the right shape with a delay
    if (leftShapeRef.current) {
      gsap.to(leftShapeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.8, // Add a delay of 0.5 seconds
      })
    }
    // Floating animation for the right shape with a delay
    if (rightShapeRef.current) {
      gsap.to(rightShapeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.8, // Add a delay of 0.5 seconds
      })
    }
  }, [])

  return (
    <div className={styles.page}>
      <div id="hierarchy" className={styles.container}>
        <img
          ref={leftShapeRef}
          src="/image/png/31.png"
          alt="Floating 3D Shape Left"
          className={styles.floatingShapeLeft}
        />
        {/* High Board */}
        <section>
          <div className={styles.PageTitle}>MEET OUR TEAM</div>
          <div className={styles.sectionTitle}>HIGH BOARD</div>
          <div className={styles.personCircleContainer}>
            {HighBoard.map((person, index) => (
              <div key={index} className={styles.personCircle}>
                <div className={styles.blueCircle}>
                  <div className={styles.whiteCircle}>
                    {person.image && (
                      <Image
                        src={person.image}
                        alt={person.name}
                        className={styles.personImage}
                        fill
                        style={{ 
                          objectFit: 'cover', 
                          objectPosition: person.imagePosition || 'center top' 
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.personDetails}>
                  <p className={styles.personName}>{person.name}</p>
                  <p className={styles.personPosition}>{person.position}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Organizing Committee */}
        <section>
          <div className={styles.divider}></div>
          <h2 className={styles.sectionTitle}>Organizing Committee</h2>
          {OrganizingCommittee.map((committee, index) => (
            <div key={index} className={styles.committeeSection}>
              <h3 className={styles.committeeTitle}>{committee.name}</h3>
              <div className={styles.personCircleContainer}>
                {/* If there are 2 vice heads: Render V1, H, V2 */}
                {committee.viceHead2 ? (
                  <>
                    {/* Render Vice Head 1 first */}
                    {committee.viceHead && (
                      <div className={styles.personCircle}>
                        <div className={styles.blueCircle}>
                          <div className={styles.whiteCircle}>
                            {committee.viceHeadImage && (
                              <Image
                                src={committee.viceHeadImage}
                                alt={committee.viceHead}
                                className={styles.personImage}
                                fill
                                style={{ 
                                  objectFit: 'cover', 
                                  objectPosition: committee.viceHeadImagePosition || 'center top' 
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className={styles.personDetails}>
                          <p className={styles.personName}>{committee.viceHead}</p>
                          <p className={styles.personPosition}>Vice Head</p>
                        </div>
                      </div>
                    )}

                    {/* Render Head in the middle */}
                    {committee.head && (
                      <div className={styles.personCircle}>
                        <div className={styles.blueCircle}>
                          <div className={styles.whiteCircle}>
                            {committee.headImage && (
                              <Image
                                src={committee.headImage}
                                alt={committee.head}
                                className={styles.personImage}
                                fill
                                style={{ 
                                  objectFit: 'cover', 
                                  objectPosition: committee.headImagePosition || 'center top' 
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className={styles.personDetails}>
                          <p className={styles.personName}>{committee.head}</p>
                          {/* Only show "Head" if not a coordinator */}
                          {!committee.isCoordinator && <p className={styles.personPosition}>Head</p>}
                        </div>
                      </div>
                    )}

                    {/* Render Vice Head 2 last */}
                    {committee.viceHead2 && (
                      <div className={styles.personCircle}>
                        <div className={styles.blueCircle}>
                          <div className={styles.whiteCircle}>
                            {committee.viceHead2Image && (
                              <Image
                                src={committee.viceHead2Image}
                                alt={committee.viceHead2}
                                className={styles.personImage}
                                fill
                                style={{ 
                                  objectFit: 'cover', 
                                  objectPosition: committee.viceHead2ImagePosition || 'center top' 
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className={styles.personDetails}>
                          <p className={styles.personName}>{committee.viceHead2}</p>
                          <p className={styles.personPosition}>Vice Head</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* If only 1 vice head or no vice head: Render H, V */
                  <>
                    {/* Render Head first */}
                    {committee.head && (
                      <div className={styles.personCircle}>
                        <div className={styles.blueCircle}>
                          <div className={styles.whiteCircle}>
                            {committee.headImage && (
                              <Image
                                src={committee.headImage}
                                alt={committee.head}
                                className={styles.personImage}
                                fill
                                style={{ 
                                  objectFit: 'cover', 
                                  objectPosition: committee.headImagePosition || 'center top' 
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className={styles.personDetails}>
                          <p className={styles.personName}>{committee.head}</p>
                          {/* Only show "Head" if not a coordinator */}
                          {!committee.isCoordinator && <p className={styles.personPosition}>Head</p>}
                        </div>
                      </div>
                    )}

                    {/* Render Vice Head second */}
                    {committee.viceHead && (
                      <div className={styles.personCircle}>
                        <div className={styles.blueCircle}>
                          <div className={styles.whiteCircle}>
                            {committee.viceHeadImage && (
                              <Image
                                src={committee.viceHeadImage}
                                alt={committee.viceHead}
                                className={styles.personImage}
                                fill
                                style={{ 
                                  objectFit: 'cover', 
                                  objectPosition: committee.viceHeadImagePosition || 'center top' 
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className={styles.personDetails}>
                          <p className={styles.personName}>{committee.viceHead}</p>
                          <p className={styles.personPosition}>Vice Head</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Academic Committees 
      <section>
        <div className={styles.divider}></div>
        <h2 className={styles.sectionTitle}>Academic Committees</h2>
        {AcademicCommittees.map((committee, index) => (
          <div key={index} className={styles.committeeSection}>
            <h3 className={styles.committeeTitle}>{committee.council}</h3>
            <div className={styles.personCircleContainer}>
              {committee.members.map((member, memberIndex) => (
                <div key={memberIndex} className={styles.personCircle}>
                  <div className={styles.blueCircle}>
                    <div className={styles.whiteCircle}>
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.name}
                          className={styles.personImage}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.personDetails}>
                    <p className={styles.personName}>{member.name}</p>
                    <p className={styles.personPosition}>{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section> */}
        <img
          ref={rightShapeRef}
          src="/image/png/37.png"
          alt="Floating 3D Shape Right"
          className={styles.floatingShapeRight}
        />
      </div>
    </div>
  )
}

export default Hierarchy
