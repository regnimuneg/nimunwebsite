import { type PackageInterface } from '@/data/packages' // Assuming updated data file path
import styles from '@/styles/landing/Packages.module.scss'
import clsx from 'clsx'

interface Props {
  item: PackageInterface
  // Removed index and className as they weren't used in the updated Packages.tsx logic
}

export default function Package({ item }: Props) {
  return (
    <div className={clsx(styles.packageCard, item.isPopular && styles.popular)}>
      {' '}
      {/* Renamed from projectCard */}
      {item.isPopular && <div className={styles.popularBadge}>MOST POPULAR</div>}
      <div className={styles.cardHeader}>
        {' '}
        {/* New container for title and price */}
        <div className={styles.title} style={{ color: item.titleColor }}>
          {item.title}
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.priceValue}>${item.price}</span>
        </div>
        {item.groupInfo && <div className={styles.groupInfo}>{item.groupInfo}</div>}
      </div>
      <div className={styles.descriptionContainer}>
        <ul className={styles.descriptionList}>
          {' '}
          {/* Use ul directly */}
          {item.description.map((feature, idx) => (
            <li key={idx} className={styles.descriptionItem}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <a
        href="https://forms.gle/4Q63CVL8C8eCdFVg9"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.applyButton}
      >
        APPLY
      </a>
    </div>
  )
}
