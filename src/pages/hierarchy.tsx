import React, { useEffect, useRef } from 'react'
import styles from '@/styles/Hierarchy.module.scss' // Import SCSS module
import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import gsap from 'gsap'

import Zein from '@public/image/People/HB/NIMUN25/Zein.png'
import Ali from '@public/image/People/HB/NIMUN25/AliKamal.png'
import Haneen from '@public/image/People/HB/NIMUN25/Haneen.png'

import Adham from '@public/image/People/OC/NIMUN25/Adham.png'
import Farah from '@public/image/People/OC/NIMUN25/Farah.png'
import Malak from '@public/image/People/OC/NIMUN25/Malak.png'
import Seif from '@public/image/People/OC/NIMUN25/Seif.png'
import Zeina from '@public/image/People/OC/NIMUN25/Zeina.png'
import Maram from '@public/image/People/OC/NIMUN25/Maram.png'
import Moaz from '@public/image/People/OC/NIMUN25/Moaz.png'
import Mostafa from '@public/image/People/OC/NIMUN25/Mostafa.png'
import Yasmina from '@public/image/People/OC/NIMUN25/Yasmina.png'
import Nour from '@public/image/People/OC/NIMUN25/Nour.png'
import Abdallah from '@public/image/People/OC/NIMUN25/Abdallah.png'

import ZeinRaafat from '@public/image/People/AC/ZeinRaafat.png'
import KarenEffat from '@public/image/People/AC/KarenEffat.png'
import MariamKabbany from '@public/image/People/AC/MariamKabbany.png'
import AliaNafea from '@public/image/People/AC/AliaNafea.png'
import MohabHegazy from '@public/image/People/AC/MohabHegazy.png'
import NizarAmer from '@public/image/People/AC/NizarAmer.png'
import KareemTantawi from '@public/image/People/AC/KareemTantawi.png'
import RawyaNabil from '@public/image/People/AC/RawyaNabil.png'
import RanaAboElHassan from '@public/image/People/AC/RanaAboElHassan.png'
import FarahGhaly from '@public/image/People/AC/FarahGhaly.png'
import AdhamAhmed from '@public/image/People/AC/AdhamAhmed.png'
import AmeenaYahya from '@public/image/People/AC/AmeenaYehia.png'
import OmarAkl from '@public/image/People/AC/OmarAkl.png'

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
}

const HighBoard: Person[] = [{ name: 'Zein Raafat', position: 'Secretary General', image: Zein }]

const OrganizingCommittee: Person[] = [
  {
    name: 'Operations & Logistics',
    head: 'Moaz El Shahed',
    headImage: Moaz,
  },
  {
    name: 'Registration Affairs',
    head: 'Farah Abdullah',
    viceHead: 'Adham Abdelaal',
    headImage: Farah,
    viceHeadImage: Adham,
  },
  {
    name: 'Public Relations',
    head: 'Seif EL Nahas',
    viceHead: 'Zeina Youssef',
    headImage: Seif,
    viceHeadImage: Zeina,
  },
  {
    name: 'Media & Design',
    head: 'Abdallah Emam',
    headImage: Abdallah,
  },
  {
    name: 'Socials & Events',
    head: 'Mostafa Salama',
    headImage: Mostafa,
  },
]

const AcademicCommittees: { council: string; members: Person[] }[] = [
  {
    council: 'ICJ',
    members: [
      { name: 'Zein Raafat', position: 'President', image: ZeinRaafat },
      { name: 'Omar Awad', position: 'Vice President', image: OmarAkl },
    ],
  },
  {
    council: 'SPECPOL',
    members: [
      { name: 'Farah Ghaly', position: 'President', image: FarahGhaly },
      { name: 'Adham Ahmed', position: 'Director', image: AdhamAhmed },
      { name: 'Ameena Yehia', position: 'Rapporteur', image: AmeenaYahya },
    ],
  },
  {
    council: 'UNFCCC COP',
    members: [
      { name: 'Rana Aboelhassan', position: 'Chair', image: RanaAboElHassan },
      { name: 'Rawya Nabil', position: 'Co-chair', image: RawyaNabil },
    ],
  },
  {
    council: 'UNESCO',
    members: [
      { name: 'Mohab Hegazy', position: 'Chair', image: MohabHegazy },
      { name: 'Alia Nafea', position: 'Co-chair', image: AliaNafea },
    ],
  },
  {
    council: 'UNHRC',
    members: [
      { name: 'Nizar Amer', position: 'President', image: NizarAmer },
      { name: 'Kareem Tantawy', position: 'Director', image: KareemTantawi },
      { name: 'Mariam Kabbany', position: 'Rapporteur', image: MariamKabbany },
    ],
  },
  {
    council: 'Press Head',
    members: [{ name: 'Karen Effat', image: KarenEffat }],
  },
]

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
          src="/image/png/3dshape5.avif"
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
                        style={{ objectFit: 'cover' }}
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
                {/* Render Head */}
                {committee.head && (
                  <div className={styles.personCircle}>
                    <div className={styles.blueCircle}>
                      <div className={styles.whiteCircle}>
                        {/* Display head image if available */}
                        {committee.headImage && (
                          <Image
                            src={committee.headImage}
                            alt={committee.head}
                            className={styles.personImage}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                      </div>
                    </div>
                    {/* Display head name and position */}
                    <div className={styles.personDetails}>
                      <p className={styles.personName}>{committee.head}</p>
                      <p className={styles.personPosition}>Head</p>
                    </div>
                  </div>
                )}

                {/* Render Vice Head */}
                {committee.viceHead && (
                  <div className={styles.personCircle}>
                    <div className={styles.blueCircle}>
                      <div className={styles.whiteCircle}>
                        {/* Display vice head image if available */}
                        {committee.viceHeadImage && (
                          <Image
                            src={committee.viceHeadImage}
                            alt={committee.viceHead}
                            className={styles.personImage}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                      </div>
                    </div>
                    {/* Display vice head name and position */}
                    <div className={styles.personDetails}>
                      <p className={styles.personName}>{committee.viceHead}</p>
                      <p className={styles.personPosition}>Vice Head</p>
                    </div>
                  </div>
                )}

                {/* Render Vice Head 2 (ADDED THIS PART) */}
                {committee.viceHead2 && (
                  <div className={styles.personCircle}>
                    <div className={styles.blueCircle}>
                      <div className={styles.whiteCircle}>
                        {/* Display second vice head image if available */}
                        {committee.viceHead2Image && (
                          <Image
                            src={committee.viceHead2Image}
                            alt={committee.viceHead2}
                            className={styles.personImage}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                      </div>
                    </div>
                    {/* Display second vice head name and position */}
                    <div className={styles.personDetails}>
                      <p className={styles.personName}>{committee.viceHead2}</p>
                      <p className={styles.personPosition}>Vice Head</p>
                    </div>
                  </div>
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
          src="/image/png/3dshape5.avif"
          alt="Floating 3D Shape Right"
          className={styles.floatingShapeRight}
        />
      </div>
    </div>
  )
}

export default Hierarchy
