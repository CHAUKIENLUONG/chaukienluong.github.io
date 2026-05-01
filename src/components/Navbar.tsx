import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { AppDispatch, RootState } from '../store/store'
import { setLanguage } from '../store/slices/languageSlice'
import { useResponsiveQuery } from '../hooks/mediaQuery'

type NavigationItem = {
  href: string
  label: string
  icon: string
}

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const { i18n, t } = useTranslation()
  const [activeSection, setActiveSection] = useState('#home')
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const { isMobile, isTablet } = useResponsiveQuery()
  const isCompactHeader = isMobile || isTablet

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Always show at the top
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        if (isVisible) setIsVisible(false)
      } else {
        // Scrolling up
        if (!isVisible) setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  useEffect(() => {
    document.documentElement.classList.add('dark')

    const savedLanguage = localStorage.getItem('i18nextLng') ?? 'en'
    dispatch(setLanguage(savedLanguage))
    void i18n.changeLanguage(savedLanguage)
  }, [dispatch, i18n])

  useEffect(() => {
    const syncSection = () => {
      const sections = ['home', 'experience', 'projects', 'contact']

      let current = 'home'

      for (let index = sections.length - 1; index >= 0; index -= 1) {
        const sectionId = sections[index]
        const section = document.getElementById(sectionId)

        if (section && section.getBoundingClientRect().top <= 160) {
          current = sectionId
          break
        }
      }

      setActiveSection(`#${current}`)
    }

    syncSection()
    window.addEventListener('scroll', syncSection)

    return () => window.removeEventListener('scroll', syncSection)
  }, [])

  const navigationItems: NavigationItem[] = [
    { href: '#home', label: t('nav.home') || 'Home', icon: 'home_app_logo' },
    { href: '#experience', label: t('nav.experience') || 'Experience', icon: 'person' },
    { href: '#projects', label: t('nav.projects') || 'Work', icon: 'layers' },
    { href: '#contact', label: t('nav.contact') || 'Contact', icon: 'mail' },
  ]

  const handleNavClick = (href: string) => {
    setActiveSection(href)
  }

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

      {isMobile && (
        <nav className="fixed inset-x-0 bottom-0 z-50 w-full px-3 pb-5">
          <div className="luxury-glass mx-auto flex w-full max-w-sm items-center justify-between rounded-[28px] px-6 py-2">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`group relative flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90 ${isActive
                    ? 'text-primary drop-shadow-[0_0_12px_rgba(215,182,106,0.55)]'
                    : 'text-on-surface-variant/30 hover:text-primary'
                    }`}
                  aria-label={item.label}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all ${isActive ? 'bg-primary/10 shadow-[inset_0_0_18px_rgba(215,182,106,0.14)]' : ''}`}>
                    <span className={`material-symbols-outlined text-[24px]`}>
                      {item.icon}
                    </span>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-[0.16em] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    {item.label}
                  </span>

                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(215,182,106,0.85)]" />
                  )}
                </a>
              )
            })}
          </div>
        </nav>
      )}
    </>
  )
}

export default Navbar
