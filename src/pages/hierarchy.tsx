import styles from '@/styles/Hierarchy.module.scss'
import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'

// High Board imports from 26 folder
import CM from '@public/image/People/HB/26/CM.png'
import DSG from '@public/image/People/HB/26/DSG.png'
import FarahHB from '@public/image/People/HB/26/Farah.png'
import Rawya from '@public/image/People/HB/26/Rawya.png'

// Organizing Committee imports from NIMUN26 folder
import Adham from '@public/image/People/OC/NIMUN26/Adham.png'
import Amina from '@public/image/People/OC/NIMUN26/Amina.png'
import Asmar from '@public/image/People/OC/NIMUN26/Asmar.png'
import Engy from '@public/image/People/OC/NIMUN26/Engy.png'
import FC from '@public/image/People/OC/NIMUN26/FC.png'
import Fallal from '@public/image/People/OC/NIMUN26/Fallal.png'
import Hossam from '@public/image/People/OC/NIMUN26/Hossam.png'
import Kabbani from '@public/image/People/OC/NIMUN26/Kabbani.png'
import Lina from '@public/image/People/OC/NIMUN26/Lina.png'
import MalakK from '@public/image/People/OC/NIMUN26/Malak K.png'
import Omar from '@public/image/People/OC/NIMUN26/Omar.png'
import Rana from '@public/image/People/OC/NIMUN26/Rana.png'
import Wafa from '@public/image/People/OC/NIMUN26/Wafa.png'
import Yassine from '@public/image/People/OC/NIMUN26/Yassine.png'
import Tifa from '@public/image/People/OC/NIMUN25/Mostafa.png'

interface Person {
  name: string
  position?: string
  head?: string
  viceHead?: string
  viceHead2?: string
  image?: StaticImageData
  headImage?: StaticImageData
  viceHeadImage?: StaticImageData
  viceHead2Image?: StaticImageData
  isCoordinator?: boolean
  imagePosition?: string
  headImagePosition?: string
  viceHeadImagePosition?: string
  viceHead2ImagePosition?: string
}

interface CommitteeMember {
  name: string
  title: string
  image: StaticImageData
  imagePosition?: string
}

const HighBoard: Person[] = [
  {
    name: 'Farah Ghaly',
    position: 'Secretary General',
    image: FarahHB,
    imagePosition: 'center 30%',
  },
  {
    name: 'Nizar Amer',
    position: 'Deputy Secretary General',
    image: DSG,
    imagePosition: 'center 30%',
  },
  { name: 'Seif Elnahas', position: 'Conference Manager', image: CM },
  { name: 'Rawya Nabil', position: 'Academic Director', image: Rawya, imagePosition: 'center 10%' },
]

const OrganizingCommittee: Person[] = [
  {
    name: 'Registration Affairs',
    head: 'Adham Abdelaal',
    viceHead: 'Omar Sherif',
    viceHead2: 'Rana Shafik',
    headImage: Adham,
    headImagePosition: 'center 10%',
    viceHeadImage: Omar,
    viceHeadImagePosition: 'center top',
    viceHead2Image: Rana,
    viceHead2ImagePosition: 'center 10%',
  },
  {
    name: 'Operations & Logistics',
    head: 'Mohamed Abuelwafa',
    viceHead: 'Yassine Mohamed',
    viceHead2: 'Hana Elfallal',
    headImage: Wafa,
    headImagePosition: 'center 40%',
    viceHeadImage: Yassine,
    viceHeadImagePosition: 'center 10%',
    viceHead2Image: Fallal,
    viceHead2ImagePosition: 'center 50%',
  },
  {
    name: 'Public Relations',
    head: 'Ali Kabbani',
    viceHead: 'Amina Kamal',
    viceHead2: 'Malak Khaled',
    headImage: Kabbani,
    headImagePosition: 'center 30%',
    viceHeadImage: Amina,
    viceHeadImagePosition: 'center 20%',
    viceHead2Image: MalakK,
    viceHead2ImagePosition: 'center 40%',
  },
  {
    name: 'Media & Design',
    head: 'Hossam Aqeel',
    viceHead: 'Seif alasmar',
    viceHead2: 'Engy Lutfi',
    headImage: Hossam,
    headImagePosition: 'center 17%',
    viceHeadImage: Asmar,
    viceHeadImagePosition: 'center 20%',
    viceHead2Image: Engy,
    viceHead2ImagePosition: 'center 30%',
  },
  {
    name: 'Socials & Events',
    head: 'Mostafa Salama',
    viceHead: 'Lina Amr',
    headImage: Tifa,
    headImagePosition: 'center 30%',
    viceHeadImage: Lina,
    viceHeadImagePosition: 'center 25%',
  },
  {
    name: 'Financial Coordinator',
    head: 'Belal Amer',
    headImage: FC,
    headImagePosition: 'center 30%',
    isCoordinator: true,
  },
]

const getCommitteeMembers = (committee: Person): CommitteeMember[] => {
  const members: CommitteeMember[] = []

  if (committee.head && committee.headImage) {
    members.push({
      name: committee.head,
      title: committee.isCoordinator ? 'Coordinator' : 'Head',
      image: committee.headImage,
      imagePosition: committee.headImagePosition,
    })
  }

  if (committee.viceHead && committee.viceHeadImage) {
    members.push({
      name: committee.viceHead,
      title: 'Vice Head',
      image: committee.viceHeadImage,
      imagePosition: committee.viceHeadImagePosition,
    })
  }

  if (committee.viceHead2 && committee.viceHead2Image) {
    members.push({
      name: committee.viceHead2,
      title: 'Vice Head',
      image: committee.viceHead2Image,
      imagePosition: committee.viceHead2ImagePosition,
    })
  }

  return members
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function MemberImage({
  image,
  name,
  imagePosition,
  sizes,
  priority = false,
}: {
  image: StaticImageData
  name: string
  imagePosition?: string
  sizes: string
  priority?: boolean
}) {
  return (
    <Image
      src={image}
      alt={`${name}, NIMUN team member`}
      fill
      sizes={sizes}
      quality={60}
      placeholder="blur"
      loading={priority ? undefined : 'lazy'}
      priority={priority}
      className={styles.memberImage}
      style={{ objectPosition: imagePosition || 'center top' }}
    />
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className={styles.sectionHeading}>
      <span aria-hidden />
      <h2>{children}</h2>
      <span aria-hidden />
    </div>
  )
}

function HighBoardCard({ person }: { person: Person }) {
  if (!person.image || !person.position) return null

  return (
    <article className={styles.highBoardCard}>
      <div className={styles.highBoardRoleHeader}>{person.position}</div>
      <div className={styles.highBoardPhoto}>
        <MemberImage
          image={person.image}
          name={person.name}
          imagePosition={person.imagePosition}
          sizes="(max-width: 430px) 92vw, (max-width: 760px) 70vw, (max-width: 1100px) 42vw, 285px"
          priority
        />
      </div>
      <div className={styles.highBoardInfo}>
        <h3>{person.name}</h3>
      </div>
    </article>
  )
}

function CommitteeMemberCard({ member }: { member: CommitteeMember }) {
  return (
    <div className={styles.committeeMember}>
      <div className={styles.committeePhoto}>
        <MemberImage
          image={member.image}
          name={member.name}
          imagePosition={member.imagePosition}
          sizes="(max-width: 600px) 260px, (max-width: 760px) 34vw, (max-width: 1100px) 22vw, 175px"
        />
      </div>
      <div className={styles.committeeMemberInfo}>
        <h3>{member.name}</h3>
        <p>{member.title}</p>
      </div>
    </div>
  )
}

function CommitteeCard({ committee }: { committee: Person }) {
  const members = getCommitteeMembers(committee)
  const [headMember, ...viceMembers] = members

  return (
    <article className={styles.committeeCard} id={slugify(committee.name)}>
      <div className={styles.committeeLabel}>{committee.name}</div>
      <div className={styles.committeeMembers}>
        {headMember && (
          <div className={styles.committeeHead}>
            <CommitteeMemberCard member={headMember} />
          </div>
        )}
        {viceMembers.length > 0 && (
          <div className={styles.committeeVices}>
            {viceMembers.map((member) => (
              <CommitteeMemberCard member={member} key={`${committee.name}-${member.name}`} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Hierarchy() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="team-page-title">
        <Image
          src="/image/png/31.png"
          alt=""
          width={360}
          height={360}
          quality={40}
          sizes="(max-width: 760px) 0px, 360px"
          className={`${styles.heroDecor} ${styles.heroDecorLeft}`}
          aria-hidden="true"
          loading="lazy"
        />
        <Image
          src="/image/png/35.png"
          alt=""
          width={380}
          height={380}
          quality={40}
          sizes="(max-width: 760px) 0px, 380px"
          className={`${styles.heroDecor} ${styles.heroDecorRight}`}
          aria-hidden="true"
          loading="lazy"
        />
        <div className={styles.heroContent}>
          <Image
            src="/image/png/logo_white.png"
            alt=""
            width={92}
            height={76}
            className={styles.heroLogo}
            aria-hidden="true"
          />
          <h1 id="team-page-title">MEET OUR TEAM</h1>
          <p>The people behind the diplomacy, leadership, and impact of NIMUN.</p>
        </div>
      </section>

      <section className={styles.teamShell} aria-labelledby="high-board-title">
        <SectionHeading>
          <span id="high-board-title">HIGH BOARD</span>
        </SectionHeading>
        <div className={styles.highBoardGrid}>
          {HighBoard.map((person) => (
            <HighBoardCard person={person} key={person.name} />
          ))}
        </div>

        <SectionHeading>
          <span id="organizing-committee">ORGANIZING COMMITTEE</span>
        </SectionHeading>
        <div className={styles.committeeGrid}>
          {OrganizingCommittee.map((committee) => (
            <CommitteeCard committee={committee} key={committee.name} />
          ))}
        </div>
      </section>
    </main>
  )
}
