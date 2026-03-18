import { type PackageInterface } from '@/data/packages' // Assuming updated data file path
import styles from '@/styles/landing/Packages.module.scss'
import clsx from 'clsx'

interface Props {
  item: PackageInterface
  isLast?: boolean
}

export default function Package({ item, isLast = false }: Props) {
  const showBadge = item.isPopular && isLast && item.title === 'Platinum'

  return (
    <div
      className={clsx(
        styles.packageCard,
        item.isPopular && styles.popular,
        isLast && styles.lastCard
      )}
      style={{ ['--card-accent' as string]: item.titleColor }}
    >
      {showBadge && <div className={styles.popularBadge}>MOST POPULAR</div>}
      <div className={styles.cardGlow}></div>
      <div className={styles.cardHeader}>
        <span className={styles.cardEyebrow}>Package</span>
        <div className={styles.titleRow}>
          <div className={styles.title}>
            {item.title}
            {item.roomType && <span className={styles.roomTypeLabel}>{item.roomType}</span>}
          </div>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>Price</span>
          <span className={styles.priceValue}>${item.price}</span>
        </div>
        {item.groupInfo && <div className={styles.groupInfo}>{item.groupInfo}</div>}
      </div>
      <div className={styles.descriptionContainer}>
        <ul className={styles.descriptionList}>
          {item.description.map((feature, idx) => (
            <li key={idx} className={styles.descriptionItem}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.cardFooter}>
        <a
          href="https://forms.gle/gHozmUdgzG9z6XdG9"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.applyButton}
        >
          Apply For This Tier
        </a>
      </div>
    </div>
  )
}
