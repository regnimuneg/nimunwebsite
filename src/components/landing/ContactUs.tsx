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
      </div>
    </section>
  )
}
