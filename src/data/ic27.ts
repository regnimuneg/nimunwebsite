// IC'27 page content.
//
// Anything set to TBA is a PLACEHOLDER: the real information hasn't been
// provided yet. Replace the value here and the page updates everywhere it is used.
// Search this file for "PLACEHOLDER" to find everything still missing.

export const TBA = 'TO BE ANNOUNCED'

export interface IC27Detail {
  label: string
  value: string
}

export const ic27Details: IC27Detail[] = [
  { label: 'DATES', value: TBA }, // PLACEHOLDER: e.g. '12 – 15 FEBRUARY 2027'
  { label: 'VENUE', value: TBA }, // PLACEHOLDER: venue name
  { label: 'CITY', value: TBA }, // PLACEHOLDER: e.g. 'CAIRO, EGYPT'
  { label: 'REGISTRATION DEADLINE', value: TBA }, // PLACEHOLDER
]

export interface IC27Council {
  number: string
  prefix?: string
  topLine: string
  bottomLine?: string
  highlightBottom?: boolean
  topic: string
  chairs: string
  studyGuideUrl?: string
}

export const ic27Councils: IC27Council[] = [
  {
    number: '01',
    topLine: 'SECURITY',
    bottomLine: 'COUNCIL',
    highlightBottom: true,
    topic: TBA, // PLACEHOLDER
    chairs: TBA, // PLACEHOLDER
  },
  {
    number: '02',
    prefix: 'UN',
    topLine: 'WOMEN',
    topic: TBA, // PLACEHOLDER
    chairs: TBA, // PLACEHOLDER
  },
  {
    number: '03',
    topLine: 'UNESCO',
    topic: TBA, // PLACEHOLDER
    chairs: TBA, // PLACEHOLDER
  },
  {
    number: '04',
    topLine: 'UNICEF',
    topic: TBA, // PLACEHOLDER
    chairs: TBA, // PLACEHOLDER
  },
  {
    number: '05',
    topLine: 'DISEC',
    topic: TBA, // PLACEHOLDER
    chairs: TBA, // PLACEHOLDER
  },
]

const FAQ_PENDING =
  'Details coming soon. In the meantime, email nimun.nu@gmail.com and our team will help.'

export interface IC27Faq {
  question: string
  answer: string
}

export const ic27Faqs: IC27Faq[] = [
  { question: 'Who can apply?', answer: FAQ_PENDING }, // PLACEHOLDER
  { question: 'Do you provide visa invitation letters?', answer: FAQ_PENDING }, // PLACEHOLDER
  { question: 'Is airport pickup included?', answer: FAQ_PENDING }, // PLACEHOLDER
  { question: 'What do the "Outings" in the Gold package include?', answer: FAQ_PENDING }, // PLACEHOLDER
  { question: 'How do I pay, and what is the refund policy?', answer: FAQ_PENDING }, // PLACEHOLDER
  { question: 'How are council and country assignments made?', answer: FAQ_PENDING }, // PLACEHOLDER
]

export const ic27Contact = {
  email: 'nimun.nu@gmail.com',
  phone: '+20 12 26243491',
  phoneHref: 'tel:+201226243491',
  address: '26th of July Axis, Juhayna Square, Nile University',
  instagram: 'https://www.instagram.com/nimuneg/',
  linkedin: 'https://www.linkedin.com/company/nile-international-model-united-nations/',
  facebook: 'https://www.facebook.com/NIMUNeg/',
}
