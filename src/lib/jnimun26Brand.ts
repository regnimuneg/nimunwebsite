/** JNIMUN'26 brand tokens and public asset paths */
export const JNIMUN26 = {
  colors: {
    pink: '#FF639B',
    teal: '#3CBF96',
    offWhite: '#F2F2F2',
    paperGray: '#E5E5E5',
    yellow: '#FFDF51',
    red: '#FF4040',
    blue: '#2E90CF',
    black: '#000000',
  },
  fonts: {
    display: "'Anton', sans-serif",
    body: "'Berlin Sans FB', sans-serif",
  },
} as const

/** URL-encoded base path for assets in `public/image/png/JNIMUN'26/` */
export const JNIMUN26_ASSET_BASE = "/image/png/JNIMUN%2726"

export const jnimun26Asset = (filename: string) =>
  `${JNIMUN26_ASSET_BASE}/${encodeURIComponent(filename)}`
