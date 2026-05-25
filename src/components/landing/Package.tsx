import { type PackageInterface } from '@/data/packages'
import styles from '@/styles/landing/Packages.module.scss'
import clsx from 'clsx'

interface Props {
  item: PackageInterface
}

export default function Package({ item }: Props) {
  return (
    <article className={clsx(styles.packageCard, item.isPopular && styles.popular)}>
      {item.isPopular && <div className={styles.popularBadge}>Most Popular</div>}
      <div className={styles.cardHeader}>
        <span className={styles.packageName}>{item.title}</span>
        <div className={styles.priceRow}>
          <span className={styles.currency}>$</span>
          <span className={styles.price}>{item.price}</span>
          {item.priceUnit && <span className={styles.unit}>/ {item.priceUnit}</span>}
        </div>
        {item.groupInfo && <p className={styles.groupInfo}>{item.groupInfo}</p>}
      </div>

      <ul className={styles.descriptionList}>
        {item.description.map((feature) => (
          <li key={feature} className={styles.descriptionItem}>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="https://forms.gle/gHozmUdgzG9z6XdG9"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.applyButton}
      >
        CHOOSE PLAN
      </a>
    </article>
  )
}
