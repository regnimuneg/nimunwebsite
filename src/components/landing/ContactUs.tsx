import styles from '@/styles/landing/ContactUs.module.scss'
import Image from 'next/image'
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from 'react-icons/fa'

export default function ContactUs() {
  return (
    <section id="contact" className={styles.container} aria-labelledby="contact-title">
      <div className={styles.card}>
        <div className={styles.brand}>
          <Image
            src="/image/png/logo24.png"
            alt="NIMUN logo"
            width={82}
            height={68}
            className={styles.logo}
          />
          <div>
            <h2 id="contact-title" className={styles.title}>
              CONTACT US
            </h2>
            <p className={styles.subtitle}>Nile International Model United Nations</p>
          </div>
        </div>

        <div className={styles.content}>
          <address className={styles.contactDetails}>
            <a href="tel:+201009863946" className={styles.contactItem}>
              <FaPhoneAlt className={styles.icon} />
              <span>
                <strong>Phone</strong>
                +20 100 986 3946
              </span>
            </a>
            <a href="mailto:nimun.nu@gmail.com" className={styles.contactItem}>
              <FaEnvelope className={styles.icon} />
              <span>
                <strong>Email</strong>
                nimun.nu@gmail.com
              </span>
            </a>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.icon} />
              <span>
                <strong>Address</strong>
                26th of July Axis, Juhayna Square, Nile University
              </span>
            </div>
          </address>

          <div className={styles.socials} aria-label="NIMUN social links">
            <a
              href="https://www.instagram.com/nimuneg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NIMUN Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/nile-international-model-united-nations/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NIMUN LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/NIMUNeg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NIMUN Facebook"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className={styles.mapPanel}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.8595392178445!2d30.98428627500921!3d30.01218932009921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585754b9cba23f%3A0xdfbc09a0a87f3e86!2sNile%20University!5e0!3m2!1sen!2seg!4v1717270609235!5m2!1sen!2seg"
            title="Nile University location map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.mapFrame}
          />
        </div>
      </div>
    </section>
  )
}
