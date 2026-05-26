import Hero from '@/components/landing/Hero'
import Video from '@/components/landing/Video'
import Summary from '@/components/landing/Summary'
import ContactUs from '@/components/landing/ContactUs'
import styles from '@/styles/landing/HomeDecorations.module.scss'
import Image from 'next/image'

const metalDecorations = [
  {
    src: '/image/png/31.png',
    alt: 'Decorative metal element 31',
    className: styles.decorTopLeft,
  },
  {
    src: '/image/png/35.png',
    alt: 'Decorative metal element 35',
    className: styles.decorTopRight,
  },
  {
    src: '/image/png/37.png',
    alt: 'Decorative metal element 37',
    className: styles.decorMidLeft,
  },
  {
    src: '/image/png/39.png',
    alt: 'Decorative metal element 39',
    className: styles.decorMidRight,
  },
  {
    src: '/image/png/40.png',
    alt: 'Decorative metal element 40',
    className: styles.decorBottomLeft,
  },
  {
    src: '/image/png/44.png',
    alt: 'Decorative metal element 44',
    className: styles.decorBottomRight,
  },
]

export default function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.decorLayer} aria-hidden="true">
        {metalDecorations.map((decoration) => (
          <Image
            key={decoration.src}
            src={decoration.src}
            alt={decoration.alt}
            width={360}
            height={360}
            className={`${styles.decor} ${decoration.className}`}
          />
        ))}
      </div>
      <Hero />
      <Summary />
      <Video />
      <ContactUs />
    </div>
  )
}
