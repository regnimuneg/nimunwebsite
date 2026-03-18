import React, { useState } from 'react'
import { packagesData } from '@/data/packages'
import Package from '@/components/landing/Package'
import styles from '@/styles/landing/Packages.module.scss'
import clsx from 'clsx'

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string>('Regular')

  const currentPackage = packagesData.find((pkg) => pkg.packageName === selectedPackage)
  const activeColor = currentPackage?.titleColor || '#0036bf'

  // Get cards to display based on selected package
  const getDisplayCards = () => {
    if (!currentPackage) return []

    if (currentPackage.hasRoomTypes && currentPackage.roomOptions) {
      // For Regular and Silver, show both Single and Double cards
      return currentPackage.roomOptions.map((option) => ({
        title: currentPackage.packageName,
        price: option.price,
        description: option.description,
        titleColor: currentPackage.titleColor,
        isPopular: currentPackage.isPopular,
        groupInfo: option.priceNote, // Use priceNote from room option if available
        roomType: option.roomType, // Add room type label
      }))
    } else {
      // For Gold and Platinum, show single card
      return [
        {
          title: currentPackage.packageName,
          price: currentPackage.price || '',
          description: currentPackage.description || [],
          titleColor: currentPackage.titleColor,
          isPopular: currentPackage.isPopular,
          groupInfo: currentPackage.priceNote,
          roomType: undefined, // No room type for Gold/Platinum
        },
      ]
    }
  }

  const displayCards = getDisplayCards()

  return (
    <section id="packages" className={`${styles.container} animated-container`}>
      <div className={styles.headingBlock}>
        <span className={styles.subHeading}>International Delegates</span>
        <h2 className={styles.mainTitle}>
          Packages tailored for how you want to experience IC&apos;26.
        </h2>
        <p className={styles.supportingText}>
          The pricing stays the same. The way it is presented now feels clearer, faster, and more
          premium.
        </p>
      </div>

      <div className={styles.packagePillContainer}>
        <div className={styles.packagePillWrapper} style={{ ['--pill-color' as any]: activeColor }}>
          <div
            className={styles.slidingPill}
            style={{
              transform: `translateX(${packagesData.findIndex((pkg) => pkg.packageName === selectedPackage) * 100}%)`,
            }}
          />
          {packagesData.map((pkg) => (
            <button
              key={pkg.packageName}
              className={clsx(
                styles.packagePillButton,
                selectedPackage === pkg.packageName && styles.activePillButton
              )}
              style={{ ['--btn-color' as any]: pkg.titleColor }}
              onClick={() => setSelectedPackage(pkg.packageName)}
            >
              {pkg.packageName}
            </button>
          ))}
        </div>
      </div>

      {displayCards.length > 0 && (
        <div
          className={clsx(
            styles.packageGrid,
            displayCards.length === 2 ? styles.twoCards : styles.oneCard
          )}
        >
          {displayCards.map((item, index) => (
            <Package key={index} item={item} isLast={index === displayCards.length - 1} />
          ))}
        </div>
      )}
    </section>
  )
}
