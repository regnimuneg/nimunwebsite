import React, { useState } from 'react'
import { Tabs, Tab, Typography, Box, Container } from '@mui/material'
import styles from '@/styles/Archives.module.scss'
import Image from 'next/image'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`conference-tabpanel-${index}`}
      aria-labelledby={`conference-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const ConferenceArchives = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  return (
    <Container maxWidth="lg" className={styles.container} id="Archives">
      {/* Header */}
      <Box className={styles.header}>
        <Typography variant="h3" component="h1" className={styles.title}>
          Conference Archives
        </Typography>
        <div className={styles.mainPicContainer}>
          <Image
            src="/image/png/mainPic.png"
            alt="mainPic"
            width={1100}
            height={500}
            className={styles.mainPic}
          />
        </div>
      </Box>

      {/* Tabs */}
      <Box className={styles.tabsContainer}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="conference archives tabs"
          className={styles.tabs}
        >
          <Tab label="IC4" />
          <Tab label="IC5" />
          <Tab label="IC6" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={selectedTab} index={0}>
        <div className={styles.conferenceContent}>
          <div className={styles.gridContainer}>
            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo1.jpg"
                alt="ICJ"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>ICJ</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> Application of the International Convention on the Elimination
                    of All Forms of Racial Discrimination (Armenia v. Azerbaijan)
                  </li>
                </ol>
              </div>
            </div>

            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo2.png"
                alt="UNSC"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>UNSC</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> The Russian threats to the administrative-Territorial Units of
                    the Left Bank of the Dniester
                  </li>
                  <li>
                    <b>Topic B:</b> Advancing towards complete nucleardisarmament
                  </li>
                </ol>
              </div>
            </div>

            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo3.jpg"
                alt="The Commission on Crime Prevention and Criminal Justice"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>CCPCJ</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> Prevention of Cybercrimes and Illicit Uses of The Internet
                  </li>
                  <li>
                    <b>Topic B:</b> Criminal Justice System Reform
                  </li>
                </ol>
              </div>
            </div>

            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo4.png"
                alt="SOCHUM"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>SOCHUM</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> state repression and political order
                  </li>
                  <li>
                    <b>Topic B:</b> the departure of human capital from developing countries
                  </li>
                </ol>
              </div>
            </div>
            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo5.jpg"
                alt="The Commission on Crime Prevention and Criminal Justice"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>WHO</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> Bettering Medical Services in Combat Areas
                  </li>
                  <li>
                    <b>Topic B:</b> Boosting Global Mental Health Care
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <div className={styles.conferenceContent}>
          <div className={styles.gridContainer}>
            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo6.jpg"
                alt="UNSC"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>UNSC</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> Preventing Further Atrocities through International Intervention
                    in the Congolese Genocide.
                  </li>
                  <li>
                    <b>Topic B:</b> Addressing Israeli Operations in the Occupied Palestenian
                    Territories Amidst Escalating Tensions in the Gaza Strip and the West Bank.
                  </li>
                </ol>
                <div className={styles.links}>
                  <a
                    href="https://drive.google.com/file/d/1xBCSoMHRBiMizJZThmbAzqkzylsN0Ci0/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Background Guide{' '}
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo7.jpg"
                alt="UNPFII"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>UNPFII</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> The Role of States in the Enrichment, Preservation, and Social
                    Inclusivity of Indigenous People and Their Culture
                  </li>
                  <li>
                    <b>Topic B:</b> Examining the Effects of State Policies on Indigenous People's
                    Rights to Self-Determination in Cameroon
                  </li>
                </ol>
                <div className={styles.links}>
                  <a
                    href="https://drive.google.com/file/d/1nKbKLcx-6dvZCSQns-Fbmc5S30HVRHFJ/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Background Guide{' '}
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo8.png"
                alt="UNHCR"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>UNHCR</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> Addressing the Multifaceted Challenges of the Global Refugee
                    Crisis and Safeguarding Refugee Rights
                  </li>
                  <li>
                    <b>Topic B:</b> Protection of Internally Displaced Persons Within the African
                    region
                  </li>
                </ol>
                <div className={styles.links}>
                  <a
                    href="http://drive.google.com/file/d/1GVOOdo-b5pHwrc2GVNjk9IHI1WSdQIro/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Background Guide{' '}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <div className={styles.conferenceContent}>
          <div className={styles.gridContainer}>
            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo9.jpg"
                alt="UNSC"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>UNSC</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> The Threat of Terrorism and Secessionism to Somalia's
                    Sovereignty and Stability
                  </li>
                  <li>
                    <b>Topic B:</b> Reviewing the Role of UN Peacekeeping Operations (PKOs)
                  </li>
                </ol>
                <div className={styles.links}>
                  <a
                    href="https://drive.google.com/file/d/1yJKfyQge-1Nl2HTYhMDmwdAeqZ8rZpV7/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Background Guide{' '}
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo10.jpg"
                alt="ITU"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>ITU</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> Addressing the rising Threats of the Cyber arms Industry
                  </li>
                  <li>
                    <b>Topic B:</b> Advancing Global Internet Neutrality During times of Political
                    Turmoil
                  </li>
                </ol>
                <div className={styles.links}>
                  <a
                    href="https://drive.google.com/file/d/1vAikM9jl1NwE3IPxSs3ZnXz3tlzq5GE3/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Background Guide{' '}
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.imageCard}>
              <Image
                src="/image/png/photo11.jpg"
                alt="OHCHR"
                width={500}
                height={300}
                className={styles.conferenceImage}
              />
              <div className={styles.cardContent}>
                <h3>OHCHR</h3>
                <ol>
                  <li>
                    <b>Topic A:</b> Addressing Humanitarian Emergencies in times of Conflict and the
                    Well-Being of Affected Populations
                  </li>
                  <li>
                    <b>Topic B:</b> The Evolving Landscape of State Surveillance and Privacy Rights
                  </li>
                </ol>
                <div className={styles.links}>
                  <a
                    href="https://drive.google.com/file/d/1My7Sw_HYNKNp0By_edMA7rZpnqvjZQLC/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Background Guide{' '}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
    </Container>
  )
}

export default ConferenceArchives
