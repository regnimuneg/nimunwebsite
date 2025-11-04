import React from 'react'

export interface PackageInterface {
  title: string
  price: string
  groupInfo?: string // e.g., "(Groups of 4)"
  description: string[] // Array of feature strings
  isPopular?: boolean
  titleColor: string // To match reference image title colors
}

export const singlePackagesData: PackageInterface[] = [
  {
    title: 'Regular',
    price: '440',
    description: [
      'Accommodation',
      'Transportation',
      'Conference Fees',
      'Food',
      'NIMUN\'s Welcome Set',
    ],
    titleColor: '#D9A66C',
  },
  {
    title: 'Silver',
    price: '550',
    description: [
      'Accommodation',
      'Transportation',
      'Conference Fees',
      'Food',
      'NIMUN\'s Welcome Set',
      'Sightseeing Tours Around Cairo',
      'Authentic Culinary Experience',
    ],
    titleColor: '#A0A0A0',
  },
];

export const doublePackagesData: PackageInterface[] = [
  {
    title: 'Regular',
    price: '340/ delegate',
    description: [
      'Accommodation',
      'Transportation',
      'Conference Fees',
      'Food',
      'NIMUN\'s Welcome Set',
    ],
    titleColor: '#D9A66C',
  },
  {
    title: 'Silver',
    price: '450/ delegate',
    description: [
      'Accommodation',
      'Transportation',
      'Conference Fees',
      'Food',
      'NIMUN\'s Welcome Set',
      'Sightseeing Tours Around Cairo',
      'Authentic Culinary Experience',
    ],
    titleColor: '#A0A0A0',
  },{
    title: 'Gold',
    price: '1,600/ group ',
    groupInfo: '(Groups of 4)',
    description: [
      'Accommodation',
      'Transportation',
      'Conference Fees',
      'Food',
      'NIMUN\'s Welcome Set',
      'Sightseeing Tours Around Cairo',
      'Authentic Culinary Experience',
    ],
    titleColor: '#BFA15F',
  },
  {
    title: 'Platinum',
    price: '3,600/ group',
    groupInfo: '(Groups of 8+ 2 supervisors)',
    description: [
      'Accommodation',
      'Transportation',
      'Conference Fees',
      'Food',
      'NIMUN\'s Welcome Set',
      'Sightseeing Tours Around Cairo',
      'Authentic Culinary Experience',
    ],
    isPopular: true,
    titleColor: '#5AC8FA',
  },
];

// Note: The original file used 'packages' as the export name.
// Renaming to 'packagesData' to avoid conflict if 'packages' is used elsewhere.
// User should adjust import accordingly.
export const packages = singlePackagesData.concat(doublePackagesData) // Keep original export name for compatibility if needed
