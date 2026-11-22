import styles from '@/styles/Hierarchy.module.scss'
import Image, { type StaticImageData } from 'next/image'
import { useEffect, type ReactNode } from 'react'
import { useLenis } from '@/lib/lenis'

// High Board imports from NIMUN27
import AdhamAbdelaal from '@public/image/People/HB/27/Adham_Abdelaal_SG.png'
import MostafaSalama from '@public/image/People/HB/27/Mostafa_Salama_CM.png'
import NourHabbak from '@public/image/People/HB/27/Nour_Habbak_AD.png'

// Organizing Committee imports from NIMUN27 (with cropped offwhite studio backgrounds)
import BelalAmer from '@public/image/People/OC/NIMUN27/Belal_Amer_Head_clean.jpg'
import AhmedHisham from '@public/image/People/OC/NIMUN27/Ahmed_Hisham_Vice_Head_clean.jpg'
import NourElkhouly from '@public/image/People/OC/NIMUN27/Nour_Elkhouly_Vice_Head_clean.jpg'

import YassineMohamed from '@public/image/People/OC/NIMUN27/Yassine_Mohamed_Head_clean.jpg'
import NourRefaat from '@public/image/People/OC/NIMUN27/Nour_Refaat_Vice_Head_clean.jpg'
import YoussefAmgad from '@public/image/People/OC/NIMUN27/Youssef_Amgad_Vice_Head_clean.jpg'

import MalakKhaled from '@public/image/People/OC/NIMUN27/Malak_Khaled_Head_clean.jpg'
import KenzyRoshdy from '@public/image/People/OC/NIMUN27/Kenzy_Roshdy_Vice_Head_clean.jpg'
import NourDoha from '@public/image/People/OC/NIMUN27/Nour_Doha_Vice_Head_clean.jpg'

import EngyLutfi from '@public/image/People/OC/NIMUN27/Engy_Lutfi_Head_clean.jpg'
import JanaEzzat from '@public/image/People/OC/NIMUN27/Jana_Ezzat_Vice_Head_clean.jpg'
import TeyaMohamed from '@public/image/People/OC/NIMUN27/Teya_Mohamed_Vice_Head_clean.jpg'

import SalmaSoliman from '@public/image/People/OC/NIMUN27/Salma_Soliman_Vice_Head_clean.jpg'
import ToqaMamdouh from '@public/image/People/OC/NIMUN27/Toqa_Mamdouh_Vice_Head_clean.jpg'

import AliKabbani from '@public/image/People/OC/NIMUN27/Ali_Kabbani_clean.jpg'

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
  imageStyle?: React.CSSProperties
  headImageStyle?: React.CSSProperties
  viceHeadImageStyle?: React.CSSProperties
  viceHead2ImageStyle?: React.CSSProperties
}

interface CommitteeMember {
  name: string
  title: string
  image: StaticImageData
  imagePosition?: string
  imageStyle?: React.CSSProperties
}

const HighBoard: Person[] = [
  {
    name: 'Nour Habbak',
    position: 'Academic Director',
    image: NourHabbak,
    imagePosition: 'center 15%',
    imageStyle: { transform: 'scale(1.05)' },
  },
  {
    name: 'Adham Abdelaal',
    position: 'Secretary General',
    image: AdhamAbdelaal,
    imagePosition: 'center 15%',
    imageStyle: { transform: 'scale(1.05)' },
  },
  {
    name: 'Mostafa Salama',
    position: 'Conference Manager',
    image: MostafaSalama,
    imagePosition: 'center 15%',
    imageStyle: { transform: 'scale(1.05)' },
  },
]

const OrganizingCommittee: Person[] = [
  {
    name: 'Registration Affairs',
    head: 'Belal Amer',
    viceHead: 'Ahmed Hisham',
    viceHead2: 'Nour Elkhouly',
    headImage: BelalAmer,
    headImagePosition: 'center 15%',
    headImageStyle: { transform: 'scale(1.05)' },
    viceHeadImage: AhmedHisham,
    viceHeadImagePosition: 'center 15%',
    viceHeadImageStyle: { transform: 'scale(1.05)' },
    viceHead2Image: NourElkhouly,
    viceHead2ImagePosition: 'center 15%',
    viceHead2ImageStyle: { transform: 'scale(1.05)' },
  },
  {
    name: 'Operations & Logistics',
    head: 'Yassine Mohamed',
    viceHead: 'Nour Refaat',
    viceHead2: 'Youssef Amgad',
    headImage: YassineMohamed,
    headImagePosition: 'center 15%',
    headImageStyle: { transform: 'scale(1.05)' },
    viceHeadImage: NourRefaat,
    viceHeadImagePosition: 'center 15%',
    viceHeadImageStyle: { transform: 'scale(1.05)' },
    viceHead2Image: YoussefAmgad,
    viceHead2ImagePosition: 'center 15%',
    viceHead2ImageStyle: { transform: 'scale(1.05)' },
  },
  {
    name: 'Public Relations',
    head: 'Malak Khaled',
    viceHead: 'Kenzy Roshdy',
    viceHead2: 'Nour Doha',
    headImage: MalakKhaled,
    headImagePosition: 'center 15%',
    headImageStyle: { transform: 'scale(1.05)' },
    viceHeadImage: KenzyRoshdy,
    viceHeadImagePosition: 'center 15%',
    viceHeadImageStyle: { transform: 'scale(1.05)' },
    viceHead2Image: NourDoha,
    viceHead2ImagePosition: 'center 15%',
    viceHead2ImageStyle: { transform: 'scale(1.05)' },
  },
  {
    name: 'Media & Design',
    head: 'Engy Lutfi',
    viceHead: 'Jana Ezzat',
    viceHead2: 'Teya Mohamed',
    headImage: EngyLutfi,
    headImagePosition: 'center 15%',
    headImageStyle: { transform: 'scale(1.05)' },
    viceHeadImage: JanaEzzat,
    viceHeadImagePosition: 'center 15%',
    viceHeadImageStyle: { transform: 'scale(1.05)' },
    viceHead2Image: TeyaMohamed,
    viceHead2ImagePosition: 'center 15%',
    viceHead2ImageStyle: { transform: 'scale(1.05)' },
  },
  {
    name: 'Socials & Events',
    head: 'Toqa Mamdouh',
    viceHead: 'Salma Soliman',
    headImage: ToqaMamdouh,
    headImagePosition: 'center 15%',
    headImageStyle: { transform: 'scale(1.05)' },
    viceHeadImage: SalmaSoliman,
    viceHeadImagePosition: 'center 15%',
    viceHeadImageStyle: { transform: 'scale(1.05)' },
  },
  {
    name: 'Financial Coordinator',
    head: 'Ali Kabbani',
    headImage: AliKabbani,
    headImagePosition: 'center 20%',
    headImageStyle: { transform: 'scale(1.05)' },
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
      imageStyle: committee.headImageStyle,
    })
  }

  if (committee.viceHead && committee.viceHeadImage) {
    members.push({
      name: committee.viceHead,
      title: 'Vice Head',
      image: committee.viceHeadImage,
      imagePosition: committee.viceHeadImagePosition,
      imageStyle: committee.viceHeadImageStyle,
    })
  }

  if (committee.viceHead2 && committee.viceHead2Image) {
    members.push({
      name: committee.viceHead2,
      title: 'Vice Head',
      image: committee.viceHead2Image,
      imagePosition: committee.viceHead2ImagePosition,
      imageStyle: committee.viceHead2ImageStyle,
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
  priority = true,
  style,
}: {
  image: StaticImageData
  name: string
  imagePosition?: string
  sizes: string
  priority?: boolean
  style?: React.CSSProperties
}) {
  return (
    <Image
      src={image}
      alt={`${name}, NIMUN team member`}
      fill
      sizes={sizes}
      quality={60}
      placeholder="empty"
      loading={priority ? undefined : 'lazy'}
      priority={priority}
      className={styles.memberImage}
      style={{
        objectPosition: imagePosition || 'center top',
        ...style,
      }}
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
          style={person.imageStyle}
          sizes="(max-width: 760px) 46vw, (max-width: 1100px) 46vw, 285px"
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
          style={member.imageStyle}
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
          <div className={viceMembers.length === 1 ? styles.committeeVicesSingle : styles.committeeVices}>
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
  const { lenis } = useLenis()

  useEffect(() => {
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
          priority
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
          priority
        />
        <div className={styles.heroContent}>
          <Image
            src="/image/png/logo_white.png"
            alt=""
            width={92}
            height={76}
            className={styles.heroLogo}
            aria-hidden="true"
            priority
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
