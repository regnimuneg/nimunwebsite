import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/JNIMUNSubpage.module.scss'
import type { NextPage } from 'next'

const COMMITTEE_DATA: Record<string, { title: string; desc: string; badge: string; color: string; colorLight: string }> = {
  sc: {
    title: "Security Council — SC",
    desc: "Address global peace, security, conflict resolution, and international crises.",
    badge: "Advanced",
    color: "#F94F7F", // Pink
    colorLight: "rgba(249, 79, 127, 0.1)",
  },
  crisis: {
    title: "Crisis Committee",
    desc: "Respond to fast-moving emergencies through strategy, negotiation, and quick decision-making.",
    badge: "Advanced",
    color: "#3C8BDB", // Blue
    colorLight: "rgba(60, 139, 219, 0.1)",
  },
  unodc: {
    title: "United Nations Office on Drugs and Crime — UNODC",
    desc: "Combat crime, corruption, drug trafficking, and threats to justice worldwide.",
    badge: "Intermediate",
    color: "#F8C33D", // Yellow
    colorLight: "rgba(248, 195, 61, 0.1)",
  },
  imo: {
    title: "International Maritime Organization — IMO",
    desc: "Promote safe, secure, and sustainable international shipping.",
    badge: "Intermediate",
    color: "#7BC765", // Green
    colorLight: "rgba(123, 199, 101, 0.1)",
  },
  unhcr: {
    title: "United Nations High Commissioner for Refugees — UNHCR",
    desc: "Protect refugees, support displaced people, and promote humanitarian solutions.",
    badge: "Beginner",
    color: "#F28E2B", // Orange
    colorLight: "rgba(242, 142, 43, 0.1)",
  },
  press: {
    title: "International Press",
    desc: "Report, question, and document global events with accuracy and impact.",
    badge: "Beginner",
    color: "#1BA1A6", // Teal
    colorLight: "rgba(27, 161, 166, 0.1)",
  },
};

const CommitteeSubpage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Wait for slug to be ready or handle invalid slug
  const activeSlug = typeof slug === 'string' ? slug.toLowerCase() : null;
  const committee = activeSlug ? COMMITTEE_DATA[activeSlug] : null;

  if (router.isReady && !committee) {
    return (
      <div className={styles.container} style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <Head>
          <title>Committee Not Found | JNIMUN</title>
        </Head>
        <div className={styles.card}>
          <div className={styles.badge}>404</div>
          <h1 className={styles.title}>Committee Not Found</h1>
          <p className={styles.desc}>The committee you are trying to view does not exist.</p>
          <div className={styles.divider} />
          <Link href="/JNIMUN" className={styles.backBtn}>
            ← Back to JNIMUN
          </Link>
        </div>
      </div>
    );
  }

  // Render loading state if router is not ready
  if (!committee) {
    return (
      <div className={styles.container} style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <h2 className={styles.title}>Loading...</h2>
      </div>
    );
  }

  return (
    <div 
      className={styles.container} 
      style={{ 
        paddingTop: '160px', 
        paddingBottom: '80px',
        '--theme-color': committee.color,
        '--theme-color-light': committee.colorLight,
      } as React.CSSProperties}
    >
      <Head>
        <title>{committee.title} | JNIMUN</title>
      </Head>
      <div className={styles.card}>
        <div className={styles.badge}>{committee.badge}</div>
        <h1 className={styles.title}>{committee.title}</h1>
        <p className={styles.desc}>{committee.desc}</p>
        
        <div className={styles.divider} />
        
        <div className={styles.placeholderText}>
          <h3>Committee Content Coming Soon</h3>
          <p>The specific background guides, rules of procedure, and topics of debate for {committee.title} are currently being finalized by our chairs and academic team. They will be published here very soon!</p>
        </div>

        <Link href="/JNIMUN" className={styles.backBtn}>
          ← Back to JNIMUN
        </Link>
      </div>
    </div>
  );
};

export default CommitteeSubpage
