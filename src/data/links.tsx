export interface LinkInterface {
  id: string
  text: string
  icon: string
  href: string
}

export const first: LinkInterface[] = [
  { id: 'hero', text: 'Join NIMUN', icon: 'eva:person-add-fill', href: '/' },
]

export const second: LinkInterface[] = [
  // { id: 'hierarchy', text: 'Hierarchy', icon: 'fluent:person-16-filled', href: '/hierarchy' },
  {
    id: 'contact',
    text: 'Contact Us',
    icon: 'material-symbols:swap-horiz-rounded',
    href: '/#contact',
  },
]
