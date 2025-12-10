import React, { useState } from 'react'
import { packagesData } from '@/data/packages'
import Package from '@/components/landing/Package'
import styles from '@/styles/landing/Packages.module.scss'
import clsx from 'clsx'

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string>('Regular')

  const currentPackage = packagesData.find(pkg => pkg.packageName === selectedPackage)
  const activeColor = currentPackage?.titleColor || '#0036bf'
  
  // Get cards to display based on selected package
  const getDisplayCards = () => {
    if (!currentPackage) return []
    
    if (currentPackage.hasRoomTypes && currentPackage.roomOptions) {
      // For Regular and Silver, show both Single and Double cards
      return currentPackage.roomOptions.map(option => ({
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
      return [{
        title: currentPackage.packageName,
        price: currentPackage.price || '',
        description: currentPackage.description || [],
        titleColor: currentPackage.titleColor,
        isPopular: currentPackage.isPopular,
        groupInfo: currentPackage.priceNote,
        roomType: undefined, // No room type for Gold/Platinum
      }]
    }
  }

  const displayCards = getDisplayCards()

  return (
    <div id="packages" className={styles.container}>
      <h3 className={styles.subHeading}>PICK THE PACKAGE TAILORED FOR YOU</h3>
      <h2 className={styles.mainTitle}>INTERNATIONAL DELEGATES'</h2>
      <div className={styles.titleRow}>
        <div className={styles.line}></div>
        <h2 className={styles.mainTitle}>PACKAGES</h2>
        <div className={styles.line}></div>
      </div>

      {/* Single Package Type Pill - Changes color based on selection */}
      <div className={styles.packagePillContainer}>
        <div
          className={styles.packagePillWrapper}
          style={{ ['--pill-color' as any]: activeColor }}
        >
          {/* Sliding indicator pill */}
          <div 
            className={styles.slidingPill}
            style={{
              // Use the active color for the pill background
              transform: `translateX(${packagesData.findIndex(pkg => pkg.packageName === selectedPackage) * 100}%)`,
            }}
          />
          {/* Package buttons */}
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

      {/* Package Cards */}
      {displayCards.length > 0 && (
        <div className={clsx(
          styles.packageGrid,
          displayCards.length === 2 ? styles.twoCards : styles.oneCard
        )}>
          {displayCards.map((item, index) => (
            <Package 
              key={index}
              item={item} 
              isLast={index === displayCards.length - 1} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
