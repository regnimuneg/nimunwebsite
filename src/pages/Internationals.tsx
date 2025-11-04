import React from 'react'
import styles from '@/styles/Internationals.module.scss'
import Packages from '@/components/landing/Packages'
import Projects from '@/components/landing/Projects'
import Image from 'next/image';



const Internationals = () => {
  return (
    <div className={styles.container}>
      <h1>INTERNATIONALS PACKAGES</h1>
      <Packages></Packages>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLScHmA6XPdUm4zaEPPDdx2q9MLsEaaBRJylZVf9Pnt7wu5pnzA/viewform?usp=sf_link.gle/XZn4d3XvmmVQygpp9" 
      target="_blank"
      rel="noopener noreferrer" 
      className={styles.applyButton}>
  Apply now
</a>
      <br></br>
      <br></br>
      <br></br>
      <Projects></Projects>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLScHmA6XPdUm4zaEPPDdx2q9MLsEaaBRJylZVf9Pnt7wu5pnzA/viewform?usp=sf_link.gle/XZn4d3XvmmVQygpp9" target="_blank" rel="noopener noreferrer" className={styles.applyButton2}>
  Apply now
</a>
    </div>
  )
}
export default Internationals
