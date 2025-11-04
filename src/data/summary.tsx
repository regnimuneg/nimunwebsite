import { type ColorType } from '@/lib/types'
import styles from '@/styles/landing/Summary.module.scss'
import image1 from '@public/image/png/image1.png'
import image2 from '@public/image/png/image2.png'
import image3 from '@public/image/png/image4.png'
import image4 from '@public/image/png/image5.png'
import image5 from '@public/image/png/image6.png'

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
  images: [image1, image2, image3, image4, image5], // Array of images
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
