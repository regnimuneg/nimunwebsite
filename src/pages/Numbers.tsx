import React, { useEffect, useRef } from 'react'
import { Grid, Typography, Box, Divider } from '@mui/material'
import Image from 'next/image'
import styles from '@/styles/Numbers.module.scss' // Import SCSS module
import firstImage from '@public/image/png/Mission1.png'
import secondImage from '@public/image/png/Mission2.png'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'
import { milestones } from '../data/milestones' // Import milestones data

const Numbers = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/image/png/NumbersGroup.png" // Correct image path
        alt="NIMUN Group"
        layout="responsive"
        width={720}
        height={360}
      />
      <Typography
        variant="h4"
        component="h1"
        className={styles.heading}
        align="center"
        gutterBottom
      >
        By the Numbers
      </Typography>

      {/* ///////////////////////////////// */}
      <div className={styles.descriptionContainer}>
        <Image src="/image/png/logobig.png" alt="NIMUN Logo" width={300} height={300} />
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <Typography variant="body1" component="p" className={styles.heading} align="center">
          NIMUN is a premier platform for diplomacy and international dialogue, bringing together
          students from across the globe to engage in meaningful discussions on pressing global
          issues. By fostering collaboration and cultural exchange, NIMUN equips the next generation
          of leaders with the skills and perspectives needed to navigate a complex world.
        </Typography>
      </div>

      {/* ///////////////////////////////// */}
      <div className={styles.annualConferencesContainer}>
        <Divider className={styles.sideDivider} />
        <Typography variant="h3">NIMUN holds 2 annual conferences</Typography>
        <Divider className={styles.sideDivider} />
      </div>
      <div className={styles.boxesContainer}>
        <div className={styles.box}>JUNIORS CONFERENCE</div>
        <div className={styles.box}>INTERNATIONAL CONFERENCE</div>
      </div>

      <div className={styles.detailsContainer}>
        <Typography variant="h3"> With Participants From</Typography>
        <div className={`${styles.decorativeLine} ${styles.animateLine}`}></div>
        <br></br>

        <div className={styles.Statistics}>
          <Divider className={styles.StatDivider}></Divider>
          <Typography className={styles.StatText}>
            NIMUN’s annual international conference is a celebration of diversity and diplomacy,
            welcoming participants from over 25 universities and 12 countries, including the UK,
            France, and Morocco. With delegates representing five continents, the conference offers
            a truly global experience, providing a space for young leaders to collaborate, debate,
            and propose innovative solutions to today’s challenges.{' '}
          </Typography>
          <div className={styles.StatItem}>
            <Typography className={styles.StatNumber}>12</Typography>
            <Typography className={styles.StatLabel}>Countries</Typography>
          </div>
          <img src="/image/png/earth.png" alt="world" width={200} height={180} />
        </div>
        <div className={styles.Statistics}>
          <img src="/image/png/building.png" alt="buil" width={200} height={180} />
          <div className={styles.StatItem}>
            <Typography className={styles.StatNumber}>25+</Typography>
            <Typography className={styles.StatLabel}>Universities</Typography>
          </div>
          <Divider className={styles.StatDivider}></Divider>
          <Typography className={styles.StatText}>
            JNIMUN, our junior Model United Nations conference, is dedicated to empowering high
            school students from over 20 schools. Designed as an introduction to the world of
            diplomacy and global affairs, JNIMUN provides young participants with a unique
            opportunity to develop their public speaking, negotiation, and leadership skills in a
            dynamic and supportive environment.
          </Typography>
        </div>
      </div>
      {/* ///////////////////////////////// */}
      <img src="/image/png/EgySkyl.png" alt="Skyline" className={styles.skyline} />
    </div>
  )
}

export default Numbers
