export type TitlePartColor = 'black' | 'pink' | 'blue' | 'yellow'

export type CouncilEmphasis = 'blue-pink' | 'pink-blue' | 'yellow-blue' | 'blue-yellow' | 'pink-yellow' | 'yellow-pink'

export interface CouncilTitlePart {
  text: string
  color: TitlePartColor
}

export interface CouncilPillar {
  icon: string
  label: string
}

export interface CouncilChair {
  name: string
  role: string
  image: string
}

export interface CouncilTheme {
  emphasis: CouncilEmphasis
  heroBackdrop: 'pink' | 'yellow' | 'blue'
  accentPrimary: string
  accentSecondary: string
}

export interface CouncilConfig {
  slug: string
  title: string
  badge: string
  titleParts: CouncilTitlePart[]
  desc: string
  highlightWords: string[]
  logo: string
  heroImage?: string
  pillars?: CouncilPillar[]
  stickers: string[]
  heroAccent: string
  theme: CouncilTheme
  chairs: CouncilChair[]
  chairBackings: [string, string]
  groupPhoto: string
  groupPhoto2?: string
  ctaShortName: string
  ctaTitle?: string
}

export type CouncilSlug = 'sc' | 'crisis' | 'unodc' | 'imo' | 'unhcr' | 'press'
