import styles from '@/styles/jnimun/JNIMUNCommittees.module.scss'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Committee {
  name: string
  fullName: string
  description: string
  topics: string[]
  color: string
  icon: string
}

export default function JNIMUNCommittees() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCommittee, setActiveCommittee] = useState<number>(0)

  const committees: Committee[] = [
    {
      name: 'UNSC',
      fullName: 'United Nations Security Council',
      description: 'The primary body responsible for international peace and security. Delegates tackle the world\'s most pressing conflicts and crises.',
      topics: ['International Conflicts', 'Peacekeeping Operations', 'Sanctions & Diplomacy'],
      color: '#FF6B6B',
      icon: '🛡️',
    },
    {
      name: 'UNHRC',
      fullName: 'United Nations Human Rights Council',
      description: 'Promoting and protecting human rights globally. Delegates address violations and advocate for fundamental freedoms.',
      topics: ['Human Rights Violations', 'Refugee Protection', 'Civil Liberties'],
      color: '#4ECDC4',
      icon: '⚖️',
    },
    {
      name: 'UNESCO',
      fullName: 'UN Educational, Scientific and Cultural Organization',
      description: 'Building peace through education, science, and culture. Delegates work to preserve heritage and advance knowledge.',
      topics: ['Education Access', 'Cultural Heritage', 'Scientific Cooperation'],
      color: '#45B7D1',
      icon: '📚',
    },
    {
      name: 'SPECPOL',
      fullName: 'Special Political and Decolonization Committee',
      description: 'Addressing special political issues and decolonization matters. Delegates explore sovereignty and self-determination.',
      topics: ['Peacekeeping', 'Decolonization', 'Political Affairs'],
      color: '#96CEB4',
      icon: '🌐',
    },
    {
      name: 'UNFCCC',
      fullName: 'UN Framework Convention on Climate Change',
      description: 'The global response to climate change. Delegates negotiate environmental policies and sustainable development goals.',
      topics: ['Climate Action', 'Sustainability', 'Green Technology'],
      color: '#2ECC71',
      icon: '🌱',
    },
    {
      name: 'Press',
      fullName: 'International Press Corps',
      description: 'The voice of the conference. Journalists cover proceedings, conduct interviews, and publish articles and media.',
      topics: ['Journalism Ethics', 'Media Coverage', 'Investigative Reporting'],
      color: '#E74C3C',
      icon: '📰',
    },
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.from(sectionRef.current.querySelector(`.${styles.sectionHeader}`), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  const active = committees[activeCommittee]

  return (
    <section className={styles.committeesSection} ref={sectionRef} id="committees">
      {/* Background doodle decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.doodleBg} />
      </div>

      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>OUR COMMITTEES</span>
          <h2 className={styles.sectionTitle}>
            Explore the <span className={styles.titleAccent}>Councils</span>
          </h2>
          <p className={styles.sectionDescription}>
            JNIMUN features 6 diverse committees covering global security, human rights,
            education, environment, and more. Find the perfect council for your interests.
          </p>
        </div>

        {/* Committee tabs */}
        <div className={styles.committeeTabs}>
          {committees.map((committee, index) => (
            <button
              key={index}
              className={`${styles.committeeTab} ${activeCommittee === index ? styles.active : ''}`}
              onClick={() => setActiveCommittee(index)}
              style={{ '--tab-color': committee.color } as React.CSSProperties}
            >
              <span className={styles.tabIcon}>{committee.icon}</span>
              <span className={styles.tabName}>{committee.name}</span>
            </button>
          ))}
        </div>

        {/* Active committee detail */}
        {active && (
          <div className={styles.committeeDetail} style={{ '--committee-color': active.color } as React.CSSProperties}>
            <div className={styles.detailLeft}>
              <div className={styles.committeeIcon}>{active.icon}</div>
              <h3 className={styles.committeeName}>{active.name}</h3>
              <p className={styles.committeeFullName}>{active.fullName}</p>
            </div>
            <div className={styles.detailRight}>
              <p className={styles.committeeDescription}>{active.description}</p>
              <div className={styles.topicsList}>
                <span className={styles.topicsLabel}>Key Topics:</span>
                <div className={styles.topicTags}>
                  {active.topics.map((topic, idx) => (
                    <span key={idx} className={styles.topicTag}>{topic}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
