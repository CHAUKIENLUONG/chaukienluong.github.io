import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { AppDispatch, RootState } from '../store/store'
import { setLanguage } from '../store/slices/languageSlice'
import { useResponsiveQuery } from '../hooks/mediaQuery'



const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const { i18n, t } = useTranslation()
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const { isMobile, isTablet } = useResponsiveQuery()
  const isCompactHeader = isMobile || isTablet

  // Single merged scroll handler with rAF throttle — replaces two separate listeners
  useEffect(() => {
    let rafId = 0

    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        // Navbar show/hide
        if (currentScrollY < 10) {
          setIsVisible(true)
        } else if (currentScrollY > lastScrollY.current) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        lastScrollY.current = currentScrollY
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('dark')

    const savedLanguage = localStorage.getItem('i18nextLng') ?? 'en'
    dispatch(setLanguage(savedLanguage))
    void i18n.changeLanguage(savedLanguage)
  }, [dispatch, i18n])



  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'vi' : 'en'
    dispatch(setLanguage(newLanguage))
    localStorage.setItem('i18nextLng', newLanguage)
    void i18n.changeLanguage(newLanguage)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] w-full pointer-events-auto transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${isCompactHeader ? 'px-3 py-4 sm:px-5' : 'px-4 py-5 md:px-10 lg:px-16'}`}
      >
        <div className={`relative mx-auto flex w-full max-w-[110rem] items-center justify-end ${isCompactHeader ? 'px-2 py-2' : 'px-5 py-3 md:px-6'}`}>
          {!isMobile && (
            <div className={`flex items-center ${isTablet ? 'gap-3' : 'gap-5'}`}>
              <a
                href="/CV_CHAU-KIEN-LUONG_FullStack-Developer.pdf"
                download="CV_CHAU-KIEN-LUONG_FullStack-Developer.pdf"
                className={`flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 text-primary transition-all hover:bg-primary hover:text-on-primary active:scale-95 ${isTablet ? 'px-4 py-2' : 'px-6 py-2.5'}`}
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span className="text-sm font-bold uppercase tracking-widest">{t('nav.cv') || 'Resume'}</span>
              </a>
              <button
                type="button"
                onClick={toggleLanguage}
                className={`flex items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-all hover:bg-primary hover:text-on-primary active:scale-95 ${isTablet ? 'px-3 py-2' : 'px-4 py-2'}`}
                aria-label="Toggle Language"
              >
                <span className="text-sm font-semibold uppercase tracking-widest">{currentLanguage === 'en' ? 'US' : 'VI'}</span>
              </button>
            </div>
          )}

          {isMobile && (
            <div className="absolute right-0 flex items-center gap-2 pr-2">
              <a
                href="/CV_CHAU-KIEN-LUONG_FullStack-Developer.pdf"
                download="CV_CHAU-KIEN-LUONG_FullStack-Developer.pdf"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-all active:scale-90 hover:bg-primary hover:text-on-primary"
                aria-label="Download CV"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
              </a>
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center justify-center rounded-full border border-primary/25 bg-primary/10 px-3 py-2 text-primary transition-all active:scale-90 hover:bg-primary hover:text-on-primary"
                aria-label="Toggle language"
              >
                <span className="text-xs font-bold uppercase tracking-widest">{currentLanguage === 'en' ? 'US' : 'VI'}</span>
              </button>
            </div>
          )}
        </div>
      </header>


    </>
  )
}

export default Navbar
