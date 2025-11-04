import { useRef, useEffect, useState } from 'react';
import { projects } from '@/data/projects';
import Project from '@/components/landing/Project';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import mobileBanner from '/public/image/png/blueBannerMobile.png';
import blueBanner from '/public/image/png/blueBanner.jpg';
import stats from '/public/image/png/stats.png';
import mobileStats from '/public/image/png/mobileStats.png';
import styles from '@/styles/landing/Projects.module.scss';

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const cardWidth = 290; // Update with your card width
  const gap = 20; // Update with your gap between cards

  const scrollLeft = () => {
    if (sliderRef.current) {
      // const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

      if (sliderRef.current.scrollLeft === 0) {
        const scrollPosition = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        sliderRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      } else {
        const scrollPosition = sliderRef.current.scrollLeft - (cardWidth + gap);
        sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      // const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

      if (sliderRef.current.scrollLeft + sliderRef.current.clientWidth >= sliderRef.current.scrollWidth) {
        const scrollPosition = 0;
        sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      } else {
        const scrollPosition = sliderRef.current.scrollLeft + cardWidth + gap;
        sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Image className={styles.blueBanner} 
      src='/image/png/blueBanner.png' 
      alt="Blue Banner" 
      width={4000}
      height={656}
      />

      <div id="projects" className={styles.container}>
        <button className={`${styles.scrollButton} ${styles.left}`} onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
        <div ref={sliderRef} className={styles.slider}>
          <div className={styles.projectContainer}>
            {projects.map((item, index) => (
              <Project key={index} index={index} item={item} />
            ))}
          </div>
        </div>
        <button className={`${styles.scrollButton} ${styles.right}`} onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
      <Image className={styles.stats} src={isMobile ? mobileStats : stats} alt="Statistics" />
    </>
  );
}
