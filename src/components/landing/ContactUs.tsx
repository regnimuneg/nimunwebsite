import styles from '@/styles/landing/ContactUs.module.scss'
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ContactUs() {
  const topLeftShapeRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (topLeftShapeRef.current) {
      gsap.to(topLeftShapeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.5,
      })
    }
  }, [])

  return (
    <section id="contact" className={`${styles.container} animated-container-reverse`}>
      <img
        ref={topLeftShapeRef}
        src="/image/png/35.png"
        alt="Decorative 3D Element"
        className={styles.topLeftContact}
      />
      <div className={styles.card}>
        <div className={styles.introBlock}>
          <span className={styles.kicker}>Contact</span>
          <h2 className={styles.title}>Let&apos;s talk about IC&apos;26.</h2>
          <p className={styles.description}>
            For packages, registration, or conference logistics, reach out through the channels
            below and the team will guide you.
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.gps}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.8595392178445!2d30.98428627500921!3d30.01218932009921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585754b9cba23f%3A0xdfbc09a0a87f3e86!2sNile%20University!5e0!3m2!1sen!2seg!4v1717270609235!5m2!1sen!2seg"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>

          <div className={styles.contactDetails}>
            <div className={styles.quickFacts}>
              <div className={styles.quickFact}>
                <span className={styles.quickFactLabel}>Email</span>
                <span>nimun.nu@gmail.com</span>
              </div>
              <div className={styles.quickFact}>
                <span className={styles.quickFactLabel}>Phone</span>
                <span>+20 100 986 3946</span>
              </div>
              <div className={styles.quickFact}>
                <span className={styles.quickFactLabel}>Location</span>
                <span>Nile University, Juhayna Square</span>
              </div>
            </div>
            <div className={styles.contactIcons}>
              <a
                href="mailto:nimun.nu@gmail.com"
                className={styles.iconLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://www.instagram.com/nimuneg/"
                className={styles.iconLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/nile-international-model-united-nations/"
                className={styles.iconLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.facebook.com/NIMUNeg/"
                className={styles.iconLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
            </div>
            <div className={styles.contactText}>
              <div className={styles.contactItem}>
                <FaWhatsapp className={styles.icon} />
                <span>
                  <strong>Phone:</strong> +20 100 986 3946
                </span>
              </div>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>
                  <strong>Address:</strong> 26th of July Axis, Juhayna Square, Nile University
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
