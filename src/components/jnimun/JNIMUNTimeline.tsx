import styles from '@/styles/jnimun/JNIMUNTimeline.module.scss'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function JNIMUNTimeline() {
  const sectionRef = useRef<HTMLElement>(null)

  const timelineEvents = [
    {
      step: '01',
      title: 'Registration Opens',
      description: 'Apply online and select your preferred committee. Early bird discounts available for the first 50 delegates!',
      icon: '📋',
      date: 'Coming Soon',
    },
    {
      step: '02',
      title: 'Delegate Preparation',
      description: 'Receive your country assignment, research your topics, and prepare your position papers with our guidance materials.',
      icon: '📖',
      date: 'TBA',
    },
    {
      step: '03',
      title: 'Training Sessions',
      description: 'Attend workshops on public speaking, resolution writing, and parliamentary procedure led by experienced MUNers.',
      icon: '🎓',
      date: 'TBA',
    },
    {
      step: '04',
      title: 'Conference Day',
      description: 'Two days of intense committee sessions, lobbying, and debate. Present your country\'s position and negotiate resolutions.',
      icon: '🏛️',
      date: 'TBA',
    },
    {
      step: '05',
      title: 'Awards & Closing',
      description: 'Celebrate achievements with awards for Best Delegate, Outstanding Delegate, and Honorable Mentions across all committees.',
      icon: '🏆',
      date: 'TBA',
    },
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const items = sectionRef.current.querySelectorAll(`.${styles.timelineItem}`)
    items.forEach((item, index) => {
      gsap.from(item, {
        x: index % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  return (
    <section className={styles.timelineSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>HOW IT WORKS</span>
          <h2 className={styles.sectionTitle}>
            Your Journey to <span className={styles.titleAccent}>JNIMUN &apos;26</span>
          </h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              <div className={styles.timelineDot}>
                <span className={styles.dotIcon}>{event.icon}</span>
              </div>
              <div className={styles.timelineCard}>
                <div className={styles.cardStep}>{event.step}</div>
                <h3 className={styles.cardTitle}>{event.title}</h3>
                <p className={styles.cardDescription}>{event.description}</p>
                <span className={styles.cardDate}>{event.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
