import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from '@/styles/MissionHistory.module.scss' // Import SCSS module
import firstImage from '@public/image/png/Mission1.png'
import secondImage from '@public/image/png/Mission2.png'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'
import { milestones } from '../data/milestones' // Import milestones data

if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin)
}

const MilestonesSection = () => {
  const rightShapeRefM = useRef<HTMLImageElement>(null)
  useEffect(() => {
    // Floating animation for the right shape with a delay
    if (rightShapeRefM.current) {
      gsap.to(rightShapeRefM.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.8, // Add a delay of 0.5 seconds
      })
    }
  }, [])
  return (
    <div className={styles.milestonesContainer}>
      <img
        ref={rightShapeRefM}
        src="/image/png/37.png"
        alt="Floating 3D Shape Left"
        className={styles.floatingShapeRightM}
      />
      <h2 className={styles.milestonesHeading}>Milestones</h2>
      <div className={`${styles.decorativeLine} ${styles.animateLine}`}></div>

      <div className={styles.timeline}>
        {milestones.map((milestone, index) => (
          <div key={index} className={styles.milestone}>
            <h3 className={styles.milestoneYear}>{milestone.year}</h3>
            <div className={styles.verticalLine}></div>
            <p className={styles.milestoneText}>{milestone.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const MissionHistory = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const leftShapeRef = useRef<HTMLImageElement>(null)
  const rightShapeRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Floating animation for the left shape
    if (leftShapeRef.current) {
      gsap.to(leftShapeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
      })
    }

    // Floating animation for the right shape with a delay
    if (rightShapeRef.current) {
      gsap.to(rightShapeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.8, // Add a delay of 0.5 seconds
      })
    }
  }, [])

  return (
    <div className={styles.container}>
      <img
        ref={leftShapeRef}
        src="/image/png/31.png"
        alt="Floating 3D Shape Left"
        className={styles.floatingShape}
      />
      <img
        ref={rightShapeRef}
        src="/image/png/3dshape3.avif"
        alt="Floating 3D Shape Right"
        className={styles.floatingShapeRight}
      />
      <h1 className={styles.heading}>Mission & History</h1>
      
      <div className={styles.contentGrid}>
        {/* Top-left: Image */}
        <div className={styles.imageContainer}>
          <Image
            src={firstImage}
            alt="Mission Image"
            fill
            className={styles.missionImage}
          />
        </div>

        {/* Top-right: Text (Mission) */}
        <div className={styles.missionTextBlock}>
          <div className={styles.MissionHead}>Our Mission</div>
          <div className={styles.MissionTxt}>
            Our mission is to empower students by providing an immersive and engaging platform for learning diplomacy, leadership, and negotiation through Model United Nations simulations.
            By hosting international conferences and fostering a diverse community, we aim to cultivate critical thinking, cross-cultural understanding, and collaboration among participants as they tackle the world's most pressing challenges.
          </div>
        </div>

        {/* Bottom-left: Text (Vision) */}
        <div className={styles.visionTextBlock}>
          <div className={styles.VisionHead}>Our Vision</div>
          <div className={styles.VisionTxt}>
            To provide NIMUN members and participants with a life-changing experience that leaves a lasting impact on each individual, empowering them to become globally minded leaders and changemakers dedicated to building a more compassionate and cooperative world.
          </div>
        </div>

        {/* Bottom-right: Image */}
        <div className={styles.imageContainer}>
          <Image
            src={secondImage}
            alt="Vision Image"
            fill
            className={styles.visionImage}
          />
        </div>
      </div>
      
      {/* New Milestones Section */}
      <MilestonesSection />
    </div>
  )
}

export default MissionHistory
