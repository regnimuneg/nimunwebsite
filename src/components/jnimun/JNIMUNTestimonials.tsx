import styles from '@/styles/jnimun/JNIMUNTestimonials.module.scss'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function JNIMUNTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      quote: 'JNIMUN was the most transformative experience of my school life. I walked in shy and walked out a confident speaker.',
      name: 'Sarah M.',
      role: 'Delegate, UNSC',
      school: 'Cairo American College',
    },
    {
      quote: 'The training sessions prepared me for real debates. I made friends from 15 different schools and learned so much about global issues.',
      name: 'Ahmed K.',
      role: 'Best Delegate, UNHRC',
      school: 'Nile International School',
    },
    {
      quote: 'As a parent, I was amazed by the organization and how much my daughter grew in just two days. Highly recommended!',
      name: 'Mrs. Fatima R.',
      role: 'Parent',
      school: '',
    },
    {
      quote: 'JNIMUN taught me that even young voices can make a real impact. The resolution I co-wrote was adopted by the entire committee!',
      name: 'Omar H.',
      role: 'Outstanding Delegate, SPECPOL',
      school: 'British International School',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.to(sliderRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          })
        },
      })
    }
  }, [activeIndex])

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>WHAT THEY SAY</span>
          <h2 className={styles.sectionTitle}>
            Voices from <span className={styles.titleAccent}>Our Delegates</span>
          </h2>
        </div>

        <div className={styles.testimonialSlider}>
          <div ref={sliderRef} className={styles.testimonialCard}>
            <div className={styles.quoteIcon}>&ldquo;</div>
            <blockquote className={styles.quote}>
              {testimonials[activeIndex]?.quote}
            </blockquote>
            <div className={styles.authorInfo}>
              <div className={styles.authorAvatar}>
                {testimonials[activeIndex]?.name.charAt(0)}
              </div>
              <div className={styles.authorDetails}>
                <span className={styles.authorName}>{testimonials[activeIndex]?.name}</span>
                <span className={styles.authorRole}>{testimonials[activeIndex]?.role}</span>
                {testimonials[activeIndex]?.school && (
                  <span className={styles.authorSchool}>{testimonials[activeIndex]?.school}</span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.sliderDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${activeIndex === index ? styles.active : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
