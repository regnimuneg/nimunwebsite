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
      'Conference fees',
      'Transportation',
      'NIMUN\'s Welcome Set',
      'Food',
    ],
    titleColor: '#0036bf', // Dark blue to match design
  },
  {
    title: 'Silver',
    price: '540',
    description: [
      'Accommodation',
      'Conference fees',
      'Transportation',
      'NIMUN\'s Welcome Set',
      'Food',
      'Sightseeing Tours all over Cairo',
      'Authentic Culinary Experience',
    ],
    titleColor: '#A0A0A0',
  },
  {
    title: 'Gold',
    price: '425',
    groupInfo: 'Per Person (Groups of 4)',
    description: [
      'Accommodation',
      'Conference fees',
      'Transportation',
      'NIMUN\'s Welcome Set',
      'Food',
      'Sightseeing Tours all over Cairo',
      'Authentic Culinary Experience',
    ],
    titleColor: '#BFA15F',
  },
  {
    title: 'Platinum',
    price: '460',
    groupInfo: 'Per Person (Groups of 8 + Supervisor)',
    description: [
      'Accommodation',
      'Conference fees',
      'Transportation',
      'NIMUN\'s Welcome Set',
      'Food',
      'Sightseeing Tours all over Cairo',
      'Authentic Culinary Experience',
    ],
    isPopular: true,
    titleColor: '#5AC8FA',
  },
];

export const doublePackagesData: PackageInterface[] = [
  {
    title: 'Regular',
    price: '350',
    description: [
      'Accommodation',
      'Conference fees',
      'Transportation',
      'NIMUN\'s Welcome Set',
      'Food',
    ],
    titleColor: '#0036bf', // Dark blue to match design
  },
  {
    title: 'Silver',
    price: '450',
    description: [
      'Accommodation',
      'Conference fees',
      'Transportation',
      'NIMUN\'s Welcome Set',
      'Food',
      'Sightseeing Tours all over Cairo',
      'Authentic Culinary Experience',
    ],
    titleColor: '#A0A0A0',
  },
  {
    title: 'Gold',
    price: '425',
    groupInfo: 'Per Person (Groups of 4)',
    description: [
      'Accommodation',
      'Conference fees',
      'Transportation',
      'NIMUN\'s Welcome Set',
      'Food',
      'Sightseeing Tours all over Cairo',
      'Authentic Culinary Experience',
    ],
    titleColor: '#BFA15F',
  },
  {
    title: 'Platinum',
    price: '450',
    groupInfo: 'Per Person (Groups of 8 + Supervisor)',
    description: [
      'Accommodation',
      'Conference fees',
      'Transportation',
      'NIMUN\'s Welcome Set',
      'Food',
      'Sightseeing Tours all over Cairo',
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
