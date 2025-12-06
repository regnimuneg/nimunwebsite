import React, { useRef, useEffect, useState } from 'react'
import { singlePackagesData, doublePackagesData } from '@/data/packages'
import Package from '@/components/landing/Package'
import styles from '@/styles/landing/Packages.module.scss'
import clsx from 'clsx'

export default function Packages() {
  const [packageType, setPackageType] = useState<'Single' | 'Double'>('Double')

  const displayedPackages = packageType === 'Single' ? singlePackagesData : doublePackagesData

  return (
    <div id="packages" className={styles.container}>
      <h3 className={styles.subHeading}>PICK THE PACKAGE TAILORED FOR YOU</h3>
      <h2 className={styles.mainTitle}>INTERNATIONAL DELEGATES’</h2>
      <div className={styles.titleRow}>
        {' '}
        {/* Renamed from summaryTitleRow for clarity */}
        <div className={styles.line}></div>
        <h2 className={styles.mainTitle}>PACKAGES</h2>
        <div className={styles.line}></div>
      </div>

      {/* Toggle Buttons */}
      <div className={styles.toggleContainer}>
        <button
          className={clsx(styles.toggleButton, packageType === 'Single' && styles.activeToggle)}
          onClick={() => setPackageType('Single')}
        >
          Single
        </button>
        <button
          className={clsx(styles.toggleButton, packageType === 'Double' && styles.activeToggle)}
          onClick={() => setPackageType('Double')}
        >
          Double
        </button>
      </div>

      <div 
        className={`${styles.packageGrid} ${displayedPackages.length === 4 ? styles.fourCards : styles.twoCards}`}
      >
        {displayedPackages.map((item, index) => (
          <Package key={index} item={item} isLast={index === displayedPackages.length - 1} />
        ))}
      </div>
    </div>
  )
}
