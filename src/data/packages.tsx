import React from 'react'

// Legacy interface for backward compatibility with Package component
export interface PackageInterface {
  title: string
  price: string
  groupInfo?: string // e.g., "(Groups of 4)"
  description: string[] // Array of feature strings
  isPopular?: boolean
  titleColor: string // To match reference image title colors
  roomType?: 'Single' | 'Double' // Room type label for cards
}

export interface RoomTypeOption {
  roomType: 'Single' | 'Double'
  price: string
  description: string[] // Array of feature strings
  priceNote?: string // Optional savings note (e.g., "Save $90!")
}

export interface PackageData {
  packageName: string
  titleColor: string // Color for the package title
  hasRoomTypes: boolean // Whether this package has Single/Double options
  roomOptions?: RoomTypeOption[] // Single and Double room options (only for Regular & Silver)
  price?: string // Direct price (for Gold & Platinum)
  priceNote?: string // For per-person pricing and savings notes
  description?: string[] // Features (for Gold & Platinum)
  isPopular?: boolean
}

export const packagesData: PackageData[] = [
  {
    packageName: 'Regular',
    titleColor: '#0036bf', // Dark blue
    hasRoomTypes: true,
    roomOptions: [
      {
        roomType: 'Single',
        price: '440',
        description: [
          'Accommodation',
          'Conference fees',
          'Transportation',
          'NIMUN\'s Welcome Set',
          'Food',
        ],
      },
      {
        roomType: 'Double',
        price: '350',
        priceNote: 'Save $90!',
        description: [
          'Accommodation',
          'Conference fees',
          'Transportation',
          'NIMUN\'s Welcome Set',
          'Food',
        ],
      },
    ],
  },
  {
    packageName: 'Silver',
    titleColor: '#A0A0A0', // Silver
    hasRoomTypes: true,
    roomOptions: [
      {
        roomType: 'Single',
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
      },
      {
        roomType: 'Double',
        price: '450',
        priceNote: 'Save $90!',
        description: [
          'Accommodation',
          'Conference fees',
          'Transportation',
          'NIMUN\'s Welcome Set',
          'Food',
          'Sightseeing Tours all over Cairo',
          'Authentic Culinary Experience',
        ],
      },
    ],
  },
  {
    packageName: 'Gold',
    titleColor: '#BFA15F', // Gold
    hasRoomTypes: false,
    price: '1,699',
    priceNote: '$425 per person (Groups of 4) - Save $115!',
    description: [
      'Accommodation',
      'Conference fees',
      'Transportation',
      'NIMUN\'s Welcome Set',
      'Food',
      'Sightseeing Tours all over Cairo',
      'Authentic Culinary Experience',
    ],
  },
  {
    packageName: 'Platinum',
    titleColor: '#5AC8FA', // Platinum blue
    hasRoomTypes: false,
    price: '3,680',
    priceNote: '$460 per person (Groups of 8 + Supervisor) - Save $80!',
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
  },
]

// Legacy exports for backward compatibility (if needed)
export const singlePackagesData = packagesData.map(pkg => ({
  title: pkg.packageName,
  price: pkg.hasRoomTypes && pkg.roomOptions?.[0] ? pkg.roomOptions[0].price : pkg.price || '',
  groupInfo: pkg.priceNote,
  description: pkg.hasRoomTypes && pkg.roomOptions?.[0] ? pkg.roomOptions[0].description : pkg.description || [],
  isPopular: pkg.isPopular,
  titleColor: pkg.titleColor,
}))

export const doublePackagesData = packagesData.map(pkg => ({
  title: pkg.packageName,
  price: pkg.hasRoomTypes && pkg.roomOptions?.[1] ? pkg.roomOptions[1].price : pkg.price || '',
  groupInfo: pkg.priceNote,
  description: pkg.hasRoomTypes && pkg.roomOptions?.[1] ? pkg.roomOptions[1].description : pkg.description || [],
  isPopular: pkg.isPopular,
  titleColor: pkg.titleColor,
}))

export const packages = singlePackagesData.concat(doublePackagesData)
