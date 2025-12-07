import StyledButton from '@/components/utils/StyledButton'
import useWindowSize from '@/lib/useWindowSize'
import Link from 'next/link'
import styles from '@/styles/layout/Header.module.scss'
import React, { useState, useRef, useEffect } from 'react' // Import React and hooks

// Define the structure for submenu items
interface SubMenuItem {
  id: string
  text: string
  href: string
}

// Define the structure for main navigation links, including optional submenu
interface MainLink {
  id: string
  text: string
  href: string // Keep href for structure, but override behavior for 'about'
  submenu?: SubMenuItem[]
}

// Define the main navigation links with the new 'ABOUT US' submenu
const mainLinks: MainLink[] = [
  { id: 'IC7', text: 'IC', href: '/IC7' },
  {
    id: 'about',
    text: 'ABOUT US',
    href: '#', // Use '#' or an appropriate non-navigational href
    submenu: [
      { id: 'team', text: 'Our team', href: '/hierarchy' },
      { id: 'mission', text: 'Mission and History', href: '/MissionHistory' },
      { id: 'numbers', text: 'By the numbers', href: '/Numbers' },
      { id: 'archives', text: 'Conference Archives', href: '/Archives' },
    ],
  },
  { id: 'contact', text: 'CONTACT US', href: '/#contact' },
]

interface MenuProps {
  onNavigate?: () => void
}

export default function Menu({ onNavigate }: MenuProps) {
  const isTabletOrMobile = useWindowSize(1050)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLElement>(null) // Ref for the main nav container

  const handleMouseEnter = (id: string) => {
    if (!isTabletOrMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      // Only open dropdown on hover if it has a submenu
      const link = mainLinks.find((l) => l.id === id)
      if (link?.submenu) {
        setOpenDropdown(id)
      }
    }
  }

  const handleMouseLeave = () => {
    if (!isTabletOrMobile) {
      timeoutRef.current = setTimeout(() => {
        setOpenDropdown(null)
      }, 200) // Add a small delay to prevent flickering
    }
  }

  const handleDropdownMouseEnter = () => {
    if (!isTabletOrMobile && timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const handleDropdownMouseLeave = () => {
    if (!isTabletOrMobile) {
      handleMouseLeave() // Use the same logic as leaving the main button
    }
  }

  const handleClick = (e: React.MouseEvent, link: MainLink) => {
    if (link.id === 'about') {
      if (isTabletOrMobile) {
        setOpenDropdown(openDropdown === link.id ? null : link.id)
        // Do NOT call onNavigate here!
      } else {
        e.preventDefault()
      }
    } else if (isTabletOrMobile && link.submenu) {
      e.preventDefault()
      setOpenDropdown(openDropdown === link.id ? null : link.id)
    } else {
      setOpenDropdown(null)
      if (onNavigate) onNavigate() // Only close drawer on real navigation
    }
  }

  // Close dropdown if clicking outside the nav menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []) // Runs once on mount

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <nav className={styles.navbar} ref={navRef}>
      {mainLinks.map((link) => (
        <div
          key={link.id}
          className={styles.navItemContainer} // Wrapper for positioning dropdown
          onMouseEnter={() => handleMouseEnter(link.id)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={link.href}
            className={`${styles.navLink} ${link.submenu ? styles.hasSubmenu : ''} ${link.id === 'about' ? styles.aboutLink : ''}`}
            onClick={(e) => handleClick(e, link)}
            aria-haspopup={!!link.submenu}
            aria-expanded={openDropdown === link.id}
            role={isTabletOrMobile && link.submenu ? 'button' : undefined}
            tabIndex={link.id === 'about' ? -1 : undefined}
          >
            <StyledButton
              className={styles.navButton}
              fontFamily={'Montserrat'}
            >
              {link.text}
              {link.submenu && <span className={styles.dropdownIndicator}></span>}
            </StyledButton>
          </Link>
          {link.submenu && openDropdown === link.id && (
            <div
              className={styles.dropdownMenu}
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              {link.submenu.map((subItem) => (
                <Link
                  key={subItem.id}
                  href={subItem.href}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setOpenDropdown(null)
                    if (onNavigate) onNavigate()
                  }}
                >
                  {subItem.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
