import * as React from 'react'
import Image from 'next/image'
import press from '/public/image/png/Press2.png'
import UNSC from '/public/image/png/UNSC.png'
import ITU from '/public/image/png/ITU.png'
import OHCHR from '/public/image/png/OHCHR.png'


export interface ProjectInterface {
  title: string
  description: string | React.ReactNode
  icon: string | React.ReactNode
}

export const projects: ProjectInterface[] = [
  {
    title: 'UNSC',
    description: (
      <>
        The United Nations Security Council debates and resolves global issues related to international peace and security, including conflict prevention, sanctions, and military interventions.
      </>
    ),
    icon: <Image src={UNSC} alt="ICJ Logo" width={200}/>, // Use an appropriate icon
  },
  {
    title: 'ITU',
    description: (
      <>
      The International Telecommunication Union debates and resolves global issues in information and communication technologies (ICT), including spectrum allocation, digital connectivity, and global policies.
      </>
    ),
    icon: <Image src={ITU} alt="ICJ Logo" width={200}/>, // Use an appropriate icon
  },
  {
    title: 'OHCHR',
    description: (
      <>
The Office of the High Commissioner for Human Rights debates and resolves global human rights issues, addressing violations, promoting accountability, and strengthening international frameworks.     </>
    ),
    icon:<Image src={OHCHR} alt="ICJ Logo" width={200}/>, // Use an appropriate icon
  },
  {
    title: 'Press',
    description: (
      <>
Press represents the journalism present at the
conference. It covers, updates, reports, and
documents the whole conference through tweets,
articles, delegate interviews, crisis updates, and
finally the press conference.
      </>
    ),
    icon: <Image src={press} alt="ICJ Logo" width={233}/>, // Use an appropriate icon
  },
  
]

