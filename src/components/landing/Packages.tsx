import Package from '@/components/landing/Package'
import { packagesData } from '@/data/packages'
import styles from '@/styles/landing/Packages.module.scss'

export default function Packages() {
  return (
    <section id="packages" className={styles.container} aria-labelledby="packages-title">
      <div className={styles.header}>
        <h2 id="packages-title" className={styles.title}>
          PICK THE PACKAGE TAILORED FOR YOU
        </h2>
        <p className={styles.subtitle}>INTERNATIONAL DELEGATES&apos; PACKAGES</p>
      </div>

      <div className={styles.packageGrid}>
        {packagesData.map((item) => {
          const packageCard = {
            title: item.packageName,
            price: item.price || '',
            priceUnit: item.priceUnit,
            groupInfo: item.priceNote,
            description: item.description || [],
            isPopular: item.isPopular,
          }

          return <Package key={item.packageName} item={packageCard} />
        })}
      </div>
    </section>
  )
}
