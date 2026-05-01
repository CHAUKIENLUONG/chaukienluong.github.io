import { useEffect, useMemo, useState } from 'react'

export const mediaQueries = {
  mobile: '(max-width: 639px)',
  tablet: '(min-width: 640px) and (max-width: 1023px)',
  laptop: '(min-width: 1024px) and (max-width: 1279px)',
  desktop: '(min-width: 1280px)',
} as const

export const useMediaQuery = (query: string, defaultValue = false) => {
  const getMatches = () => {
    if (typeof window === 'undefined') {
      return defaultValue
    }

    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState(getMatches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches)

    setMatches(mediaQueryList.matches)
    mediaQueryList.addEventListener('change', handleChange)

    return () => mediaQueryList.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

export const useResponsiveQuery = () => {
  const isMobile = useMediaQuery(mediaQueries.mobile)
  const isTablet = useMediaQuery(mediaQueries.tablet)
  const isLaptop = useMediaQuery(mediaQueries.laptop)
  const isDesktop = useMediaQuery(mediaQueries.desktop, true)

  return useMemo(
    () => ({
      isMobile,
      isTablet,
      isLaptop,
      isDesktop,
      isSmallScreen: isMobile || isTablet,
      isLargeScreen: isLaptop || isDesktop,
    }),
    [isDesktop, isLaptop, isMobile, isTablet],
  )
}
