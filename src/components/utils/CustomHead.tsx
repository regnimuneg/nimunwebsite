import Head from 'next/head'
import { useRouter } from 'next/router'

// Site-wide default meta tags, rendered by MainLayout. A page that needs its own
// title, description or share image renders <CustomHead ...props /> itself and is
// skipped in MainLayout (see src/pages/IC27.tsx).

const SITE_URL = 'https://nimuneg.org'

interface CustomHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player'
  keywords?: string[]
}

export default function CustomHead(props: CustomHeadProps) {
  const router = useRouter()
  const path = router.asPath.split(/[?#]/)[0]

  const seo = {
    title: 'NIMUN Egypt',
    description:
      'NIMUN is a simulation of the United Nations in which students can learn about Politics, Diplomacy, international relations, and boost their soft skills and more.',
    url: `${SITE_URL}${path}`,
    image: `${SITE_URL}/image/png/logobig.png`,
    twitterCardType: 'summary',
    keywords: [
      'NIMUN',
      'Nile International Model United Nations',
      'MUN',
      'United Nations',
      'Egypt',
      'Delegates',
      'International Delegates',
      'JNIMUN',
    ],
    ...props,
  } satisfies CustomHeadProps

  return (
    <Head>
      {/* Primary Meta Tags */}
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=0.5, user-scalable=yes"
      />
      <title key="title">{seo.title}</title>
      <meta key="meta-title" name="title" content={seo.title} />
      <meta key="description" name="description" content={seo.description} />
      <meta key="keywords" name="keywords" content={seo.keywords.join(', ')} />
      <meta key="author" name="author" content="Nile International Model United Nations" />
      <link key="canonical" rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content="NIMUN" />
      <meta key="og:url" property="og:url" content={seo.url} />
      <meta key="og:title" property="og:title" content={seo.title} />
      <meta key="og:description" property="og:description" content={seo.description} />
      <meta key="og:image" property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content={seo.twitterCardType} />
      <meta key="twitter:url" name="twitter:url" content={seo.url} />
      <meta key="twitter:title" name="twitter:title" content={seo.title} />
      <meta key="twitter:description" name="twitter:description" content={seo.description} />
      <meta key="twitter:image" name="twitter:image" content={seo.image} />
    </Head>
  )
}
