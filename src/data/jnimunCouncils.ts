import { jnimun26Asset, JNIMUN26 } from '@/lib/jnimun26Brand'
import type { CouncilConfig } from '@/types/jnimunCouncil'

const asset = jnimun26Asset
const { blue, pink, yellow } = JNIMUN26.colors

const secsImage = (filename: string) => `/image/People/Secs%20Images/${encodeURIComponent(filename)}`

export const COUNCIL_SLUGS = ['sc', 'crisis', 'unodc', 'imo', 'unhcr', 'press'] as const

export const COMMITTEE_DATA: Record<(typeof COUNCIL_SLUGS)[number], CouncilConfig> = {
  unodc: {
    slug: 'unodc',
    title: 'United Nations Office on Drugs and Crime — UNODC',
    badge: 'INTERMEDIATE',
    titleParts: [
      { text: 'UNITED NATIONS', color: 'black' },
      { text: 'OFFICE ON', color: 'black' },
      { text: 'DRUGS AND CRIME —', color: 'black' },
      { text: 'UNODC', color: 'pink' },
    ],
    desc:
      'The United Nations Office on Drugs and Crime is a global leader in the fight against illicit drugs, transnational organized crime, terrorism, and corruption. It assists Member States with legislation, capacity-building, and research to promote security, justice, and health. We promote international cooperation between states to achieve our goal of preventing organized crime across borders.',
    highlightWords: ['security', 'justice', 'health'],
    logo: '/image/png/odc.png',
    heroImage: secsImage('UNODC 2.png'),
    pillars: [
      { icon: 'shield', label: 'SECURITY' },
      { icon: 'scales', label: 'JUSTICE' },
      { icon: 'heart', label: 'HEALTH' },
    ],
    stickers: [
      asset('megaphone.png'),
      asset('lens.png'),
      asset('stars.png'),
      asset('bulb.png'),
      asset('clip.png'),
    ],
    heroAccent: asset('megaphone.png'),
    theme: {
      emphasis: 'blue-pink',
      heroBackdrop: 'pink',
      accentPrimary: blue,
      accentSecondary: pink,
    },
    chairs: [
      { name: 'MALAK EHAB', role: 'UNODC CHAIR', image: secsImage('Malak Ehab - UNODC Chair.png') },
      { name: 'NOOR BADAWI', role: 'UNODC CO-CHAIR', image: secsImage('Noor Badawi - UNODC Co-Chair.png') },
    ],
    chairBackings: [blue, pink],
    groupPhoto: secsImage('UNODC.png'),
    groupPhoto2: secsImage('UNODC 2.png'),
    ctaShortName: 'UNODC',
    ctaTitle: 'UNITED NATIONS OFFICE ON DRUGS AND CRIME — UNODC',
  },

  sc: {
    slug: 'sc',
    title: 'Security Council — UNSC',
    badge: 'ADVANCED',
    titleParts: [
      { text: 'UNITED NATIONS', color: 'black' },
      { text: 'SECURITY COUNCIL —', color: 'black' },
      { text: 'UNSC', color: 'pink' },
    ],
    desc:
      'The Security Council has primary responsibility for maintaining international peace and security. Delegates tackle crises, draft resolutions, and navigate veto politics while balancing national interests with collective security for a more stable world.',
    highlightWords: ['peace and security'],
    logo: '/image/png/security.png',
    heroImage: secsImage('UNSC 2.png'),
    pillars: [
      { icon: 'dove', label: 'PEACE' },
      { icon: 'shield', label: 'SECURITY' },
      { icon: 'globe', label: 'GLOBAL' },
    ],
    stickers: [asset('pigeon.png'), asset('stars.png'), asset('megaphone.png'), asset('exclamation.png')],
    heroAccent: asset('pigeon.png'),
    theme: {
      emphasis: 'pink-blue',
      heroBackdrop: 'pink',
      accentPrimary: pink,
      accentSecondary: blue,
    },
    chairs: [
      { name: 'AMEENA GAMALELDIN', role: 'PRESIDENT OF UNSC', image: secsImage('Ameena Gamaleldin - President Of UNSC.png') },
      { name: 'FARAH ABDULLAH', role: 'VICE PRESIDENT OF UNSC', image: secsImage('Farah Abdullah - Vice President Of UNSC.png') },
    ],
    chairBackings: [pink, blue],
    groupPhoto: secsImage('UNSC.png'),
    groupPhoto2: secsImage('UNSC 2.png'),
    ctaShortName: 'UNSC',
    ctaTitle: 'UNITED NATIONS SECURITY COUNCIL — UNSC',
  },

  crisis: {
    slug: 'crisis',
    title: 'Crisis Committee',
    badge: 'ADVANCED',
    titleParts: [
      { text: 'CRISIS', color: 'black' },
      { text: 'COMMITTEE', color: 'pink' },
      // { text: 'CC', color: 'pink' },
    ],
    desc:
      'Crisis Committee simulates fast-moving global emergencies where delegates act as cabinet members, intelligence officers, and diplomats. Strategy, secrecy, and rapid decision-making define the room as crises unfold in real time.',
    highlightWords: ['rapid decision-making'],
    logo: '/image/png/crisis.png',
    heroImage: secsImage('Crisis 2.png'),
    pillars: [
      { icon: 'bolt', label: 'URGENCY' },
      { icon: 'target', label: 'STRATEGY' },
      { icon: 'clipboard', label: 'INTEL' },
    ],
    stickers: [asset('megaphone.png'), asset('pencil.png'), asset('exclamation.png'), asset('sand_clock.png')],
    heroAccent: asset('megaphone.png'),
    theme: {
      emphasis: 'yellow-blue',
      heroBackdrop: 'yellow',
      accentPrimary: yellow,
      accentSecondary: blue,
    },
    chairs: [
      { name: 'OMAR AKL', role: 'PRESIDENT OF CRISIS COMMITTEE', image: secsImage('Omar Akl - President Of Crisis Committee.png') },
      { name: 'JOUDI YOUSRI', role: 'VICE PRESIDENT OF CRISIS COMMITTEE', image: secsImage('Joudy Yousri - Vice President Of Crisis Committee.png') },
    ],
    chairBackings: [blue, pink],
    groupPhoto: secsImage('Crisis.png'),
    groupPhoto2: secsImage('Crisis 2.png'),
    ctaShortName: 'CC',
    ctaTitle: 'CRISIS COMMITTEE',
  },

  imo: {
    slug: 'imo',
    title: 'International Maritime Organization — IMO',
    badge: 'INTERMEDIATE',
    titleParts: [
      { text: 'INTERNATIONAL', color: 'black' },
      { text: 'MARITIME ORGANIZATION —', color: 'black' },
      { text: 'IMO', color: 'pink' },
    ],
    desc:
      'The International Maritime Organization sets global standards for safe, secure, and sustainable shipping. Delegates debate regulations on maritime safety, environmental protection, and international trade routes that connect economies worldwide.',
    highlightWords: ['safe, secure, and sustainable'],
    logo: '/image/png/imo.png',
    heroImage: secsImage('IMO 2.png'),
    pillars: [
      { icon: 'anchor', label: 'SHIPPING' },
      { icon: 'waves', label: 'OCEANS' },
      { icon: 'box', label: 'TRADE' },
    ],
    stickers: [asset('lens.png'), asset('clip.png'), asset('bulb.png'), asset('handwriting.png')],
    heroAccent: asset('lens.png'),
    theme: {
      emphasis: 'blue-yellow',
      heroBackdrop: 'blue',
      accentPrimary: blue,
      accentSecondary: yellow,
    },
    chairs: [
      { name: 'NOUR HABBAK', role: 'IMO CHAIR', image: secsImage('Nour Habbak - IMO Chair.png') },
      { name: 'NOUR HASSAN', role: 'IMO CO-CHAIR', image: secsImage('Nour Hassan - IMO Co-Chair.png') },
    ],
    chairBackings: [blue, pink],
    groupPhoto: secsImage('IMO.png'),
    groupPhoto2: secsImage('IMO 2.png'),
    ctaShortName: 'IMO',
    ctaTitle: 'INTERNATIONAL MARITIME ORGANIZATION — IMO',
  },

  unhcr: {
    slug: 'unhcr',
    title: 'United Nations High Commissioner for Refugees — UNHCR',
    badge: 'BEGINNER',
    titleParts: [
      { text: 'UNITED NATIONS HIGH', color: 'black' },
      { text: 'COMMISSIONER FOR REFUGEES —', color: 'black' },
      { text: 'UNHCR', color: 'pink' },
    ],
    desc:
      'UNHCR leads international action to protect refugees, forcibly displaced communities, and stateless people. Delegates craft humanitarian solutions, advocate for dignity, and coordinate protection for people forced to flee conflict and persecution.',
    highlightWords: ['protect refugees'],
    logo: '/image/png/hcr.png',
    heroImage: secsImage('UNHCR 2.png'),
    pillars: [
      { icon: 'hands', label: 'AID' },
      { icon: 'home', label: 'SHELTER' },
      { icon: 'heart', label: 'DIGNITY' },
    ],
    stickers: [asset('moon.png'), asset('sand_clock.png'), asset('thumbs_up.png'), asset('stars.png')],
    heroAccent: asset('moon.png'),
    theme: {
      emphasis: 'pink-yellow',
      heroBackdrop: 'pink',
      accentPrimary: pink,
      accentSecondary: yellow,
    },
    chairs: [
      { name: 'KHADIJA SHASH', role: 'UNHCR CHAIR', image: secsImage('Khadija Shash - UNHCR Chair.png') },
      { name: 'MALAK EL SHAHED', role: 'UNHCR CO-CHAIR', image: secsImage('Malak El Shahed - Co-Chair Of UNHCR.png') },
    ],
    chairBackings: [blue, pink],
    groupPhoto: secsImage('UNHCR.png'),
    groupPhoto2: secsImage('UNHCR 2.png'),
    ctaShortName: 'UNHCR',
    ctaTitle: 'UNITED NATIONS HIGH COMMISSIONER FOR REFUGEES — UNHCR',
  },

  press: {
    slug: 'press',
    title: 'International Press',
    badge: 'BEGINNER',
    titleParts: [
      { text: 'INTERNATIONAL', color: 'black' },
      { text: 'PRESS', color: 'pink' },
      // { text: 'IP', color: 'pink' },
    ],
    desc:
      'The International Press Corps documents committee proceedings, conducts interviews, and publishes breaking coverage. Delegates sharpen investigative skills, ethical reporting, and storytelling that keeps diplomacy accountable and the conference informed.',
    highlightWords: ['investigative skills'],
    logo: '/image/png/press-new.png',
    heroImage: secsImage('Press 2.png'),
    pillars: [
      { icon: 'newspaper', label: 'REPORT' },
      { icon: 'camera', label: 'CAPTURE' },
      { icon: 'pen', label: 'WRITE' },
    ],
    stickers: [asset('laptop.png'), asset('brain.png'), asset('pencil.png'), asset('lens.png')],
    heroAccent: asset('laptop.png'),
    theme: {
      emphasis: 'yellow-pink',
      heroBackdrop: 'yellow',
      accentPrimary: yellow,
      accentSecondary: pink,
    },
    chairs: [
      { name: 'ALI HENDAWY', role: 'HEAD OF INTERNATIONAL PRESS', image: secsImage('Ali Hendawy - Head Of International Press.png') },
    ],
    chairBackings: [blue, pink],
    groupPhoto: secsImage('Press.png'),
    ctaShortName: 'IP',
    ctaTitle: 'INTERNATIONAL PRESS',
  },
}

export const getCouncilBySlug = (slug: string): CouncilConfig | null => {
  const key = slug.toLowerCase() as (typeof COUNCIL_SLUGS)[number]
  return COMMITTEE_DATA[key] ?? null
}
