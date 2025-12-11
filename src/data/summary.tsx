import { type ColorType } from '@/lib/types'
import styles from '@/styles/landing/Summary.module.scss'
import adham from '@public/image/png/Adham.jpg'
import ccpCJ26 from '@public/image/png/CCPCJ\'26.jpg'
import group from '@public/image/png/Group.jpg'
import henry from '@public/image/png/henry.jpg'
import plac from '@public/image/png/plac.jpg'
import plac2 from '@public/image/png/plac2.jpg'
import press26 from '@public/image/png/Press\'26.jpg'
import pr from '@public/image/png/pr.jpg'
import salama from '@public/image/png/salama.jpg'

import type { StaticImageData } from 'next/image'

export interface SummaryInterface {
  images: StaticImageData[] // Correctly typed as an array of StaticImageData
  content: React.ReactNode
  extra?: React.ReactNode
  links: SummaryLinkInterface[]
}

export interface SummaryLinkInterface {
  link: string
  color: ColorType
  text: string
  icon: string
}

export const summary: SummaryInterface = {
  images: [adham, ccpCJ26, group, henry, plac, plac2, press26, pr, salama], // Array of new images
  content: (
    <>
      <span className={styles.bold}>
        Nile International Model United Nations (NIMUN) is a vibrant, student-led club dedicated to
        inspiring global awareness, diplomacy, and leadership. NIMUN has grown into a prestigious
        platform that welcomes participants from around the world, hosting international
        conferences, bringing together students, academics, and professionals to engage in
        meaningful debates on pressing global issues. 
      </span>
    </>
  ),
  links: [],
}
