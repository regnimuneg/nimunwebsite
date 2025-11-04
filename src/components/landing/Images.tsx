import ImageLoadingTracker from '@/lib/loading/ImageLoadingTracker'
import hollowplanets from '@public/image/png/hollowplanets.png'

export default function Images() {
  return (
    <>
      <ImageLoadingTracker
        quality={85}
        placeholder="empty"
        height={0}
        width={0}
        src={hollowplanets}
        alt="Hollow Planets"
        // className={styles.hollowplanets}
        priority
      />
      {/* <ImageLoadingTracker src={planet2} alt="Big Planet" className={styles.bigplanet} priority />
      <ImageLoadingTracker
        src={planet1}
        alt="Small Planet"
        className={styles.smallplanet}
        priority
      /> */}
    </>
  )
}
