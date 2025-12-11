import { useEffect, useRef } from 'react'

/**
 * Hook to enable double-tap zoom in/out functionality
 * Double tap to zoom in, double tap again to zoom out
 */
export function useDoubleTapZoom() {
  const isZoomedRef = useRef(false)
  const lastTapRef = useRef(0)
  const lastTapPositionRef = useRef({ x: 0, y: 0 })
  const zoomContainerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Find the main content container
    const findMainContainer = () => {
      return document.querySelector('main') || 
             document.querySelector('.width-fix') || 
             document.body
    }

    const handleTouchStart = (e: TouchEvent) => {
      // Only handle single touch (not pinch zoom)
      if (e.touches.length === 1 && e.touches[0]) {
        lastTapPositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        }
      }
    }

    const handleDoubleTap = (e: TouchEvent) => {
      // Only handle single touch
      if (e.changedTouches.length !== 1 || !e.changedTouches[0]) return

      // Check if the tap is on a slider image - if so, don't zoom
      // Check this FIRST before any other logic
      const target = e.target as HTMLElement
      
      // Check multiple ways to identify slider elements - be very thorough
      // Only prevent zoom on slider images, not regular images
      const isSliderImage = 
        target.hasAttribute('data-no-double-tap-zoom') ||
        target.closest('[data-no-double-tap-zoom]') ||
        target.closest('.swiper') || 
        target.closest('.image-slider') ||
        target.closest('.full-image-slider') ||
        target.closest('[data-lenis-prevent-touch]') ||
        target.closest('#full-size-image-slider') ||
        target.closest('.swiper-slide') ||
        target.closest('[class*="swiper"]') ||
        target.closest('[class*="slider"]') ||
        target.closest('[class*="Slider"]')
      
      // Only prevent zoom for slider images, allow zoom on regular images (but images won't show magnifying cursor)
      if (isSliderImage) {
        // Explicitly prevent zoom for slider images
        return
      }
      
      // Regular images are allowed - they just won't show magnifying cursor due to CSS

      const currentTime = new Date().getTime()
      const tapLength = currentTime - lastTapRef.current
      const touch = e.changedTouches[0]
      const tapX = touch.clientX
      const tapY = touch.clientY

      // Check if it's a double tap (within 300ms and similar position)
      const distance = Math.sqrt(
        Math.pow(tapX - lastTapPositionRef.current.x, 2) + 
        Math.pow(tapY - lastTapPositionRef.current.y, 2)
      )

      if (tapLength < 300 && tapLength > 0 && distance < 50) {
        e.preventDefault()
        e.stopPropagation()

        const container = findMainContainer() as HTMLElement
        if (!container) return

        zoomContainerRef.current = container

        if (!isZoomedRef.current) {
          // Zoom in - zoom to the tap position
          const rect = container.getBoundingClientRect()
          const x = ((tapX - rect.left) / rect.width) * 100
          const y = ((tapY - rect.top) / rect.height) * 100

          container.style.transformOrigin = `${x}% ${y}%`
          container.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          container.style.transform = 'scale(1.5)'
          container.style.overflowX = 'auto'
          isZoomedRef.current = true
        } else {
          // Zoom out
          container.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          container.style.transform = 'scale(1)'
          container.style.overflowX = ''
          isZoomedRef.current = false
        }
      }

      lastTapRef.current = currentTime
      lastTapPositionRef.current = { x: tapX, y: tapY }
    }

    // Add event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleDoubleTap, { passive: false })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleDoubleTap)
      
      // Reset zoom on unmount
      if (zoomContainerRef.current) {
        zoomContainerRef.current.style.transform = ''
        zoomContainerRef.current.style.transformOrigin = ''
        zoomContainerRef.current.style.transition = ''
        zoomContainerRef.current.style.overflowX = ''
      }
    }
  }, [])

  return zoomContainerRef
}

