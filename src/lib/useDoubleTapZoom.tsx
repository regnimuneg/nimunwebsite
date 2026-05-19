import { useEffect, useRef } from 'react'

/**
 * Hook to enable double-tap zoom in/out functionality
 * Double tap to zoom in, double tap again to zoom out
 */
export function useDoubleTapZoom() {
  // Disabled custom JS transform-based zoom to allow native browser pinch-to-zoom
  // and native scroll/pan gestures to work flawlessly without breaking position:fixed.
  return { current: null }
}


