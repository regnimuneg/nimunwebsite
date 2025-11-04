import Hero from '@/components/landing/Hero'
import Images from '@/components/landing/Images'
import Video from '@/components/landing/Video'
import Summary from '@/components/landing/Summary'
import ContactUs from '@/components/landing/ContactUs'
import Packages from '@/components/landing/Packages'

export default function Home() {
  return (
    <>
      <Hero />
      <Summary />
      <Video />
      <Packages />
      <Images />
      <ContactUs />
    </>
  )
}
