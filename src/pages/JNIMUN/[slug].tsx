import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { CouncilPageLayout } from '@/components/jnimun/council'
import { COMMITTEE_DATA, COUNCIL_SLUGS } from '@/data/jnimunCouncils'
import type { CouncilConfig } from '@/types/jnimunCouncil'
import styles from '@/styles/JNIMUNSubpage.module.scss'

interface CommitteeSubpageProps {
  council: CouncilConfig
}

const CommitteeSubpage: NextPage<CommitteeSubpageProps> = ({ council }) => {
  return <CouncilPageLayout council={council} />
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: COUNCIL_SLUGS.map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<CommitteeSubpageProps> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug.toLowerCase() : ''
  const council = COMMITTEE_DATA[slug as (typeof COUNCIL_SLUGS)[number]]

  if (!council) {
    return { notFound: true }
  }

  return { props: { council } }
}

export function CommitteeNotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <Head>
        <title>Committee Not Found | JNIMUN</title>
      </Head>
      <div className={styles.notFoundCard}>
        <div className={styles.notFoundBadge}>404</div>
        <h1 className={styles.notFoundTitle}>Committee Not Found</h1>
        <p className={styles.notFoundDesc}>The committee you are trying to view does not exist.</p>
        <Link href="/JNIMUN" className={styles.backBtn}>
          ← Back to Councils
        </Link>
      </div>
    </div>
  )
}

export default CommitteeSubpage
