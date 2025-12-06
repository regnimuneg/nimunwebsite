import { type PackageInterface } from '@/data/packages' // Assuming updated data file path
import styles from '@/styles/landing/Packages.module.scss'
import clsx from 'clsx'

interface Props {
  item: PackageInterface
  isLast?: boolean
}

export default function Package({ item, isLast = false }: Props) {
  // Only show badge for Platinum (last card with isPopular)
  const showBadge = item.isPopular && isLast && item.title === 'Platinum'
  
  return (
    <div className={clsx(styles.packageCard, item.isPopular && styles.popular, isLast && styles.lastCard)}>
      {showBadge && <div className={styles.popularBadge}>MOST POPULAR</div>}
      <div className={styles.cardHeader}>
        <div className={styles.titleRow}>
          <div className={styles.titleLine} style={{ backgroundColor: item.titleColor }}></div>
          <div className={styles.title} style={{ color: item.titleColor }}>
            {item.title}
          </div>
          <div className={styles.titleLine} style={{ backgroundColor: item.titleColor }}></div>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.priceValue}>Price ${item.price}</span>
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
