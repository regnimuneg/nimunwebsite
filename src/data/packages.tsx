export interface PackageInterface {
  title: string
  price: string
  priceUnit?: string
  groupInfo?: string
  description: string[]
  isPopular?: boolean
  titleColor?: string
  roomType?: 'Single' | 'Double'
}

export interface RoomTypeOption {
  roomType: 'Single' | 'Double'
  price: string
  description: string[]
  priceNote?: string
}

export interface PackageData {
  packageName: string
  titleColor: string
  hasRoomTypes: boolean
  roomOptions?: RoomTypeOption[]
  price?: string
  priceUnit?: string
  priceNote?: string
  description?: string[]
  isPopular?: boolean
}

const sharedBenefits = [
  'Accommodation',
  'Transportation',
  'Conference fees',
  'Food',
  "NIMUN's Welcome Set",
  'Sightseeing Tours',
  'Authentic Culinary Experience',
]

export const packagesData: PackageData[] = [
  {
    packageName: 'Regular',
    titleColor: '#0037C0',
    hasRoomTypes: false,
    price: '340',
    priceUnit: 'delegate',
    description: sharedBenefits,
  },
  {
    packageName: 'Silver',
    titleColor: '#0037C0',
    hasRoomTypes: false,
    price: '450',
    priceUnit: 'delegate',
    description: sharedBenefits,
  },
  {
    packageName: 'Gold',
    titleColor: '#0037C0',
    hasRoomTypes: false,
    price: '1,600',
    priceUnit: 'group',
    priceNote: 'Groups of 4',
    description: sharedBenefits,
  },
  {
    packageName: 'Platinum',
    titleColor: '#0037C0',
    hasRoomTypes: false,
    price: '3,600',
    priceUnit: 'group',
    priceNote: 'Groups of 8 + 2 supervisors',
    description: sharedBenefits,
    isPopular: true,
  },
]

export const packages: PackageInterface[] = packagesData.map((pkg) => ({
  title: pkg.packageName,
  price: pkg.price || '',
  priceUnit: pkg.priceUnit,
  groupInfo: pkg.priceNote,
  description: pkg.description || [],
  isPopular: pkg.isPopular,
  titleColor: pkg.titleColor,
}))

export const singlePackagesData = packages
export const doublePackagesData = packages
