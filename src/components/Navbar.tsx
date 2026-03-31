import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { AppDispatch, RootState } from '../store/store'
import { setLanguage } from '../store/slices/languageSlice'

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

  useEffect(() => {
    document.documentElement.classList.add('dark')

    const savedLanguage = localStorage.getItem('i18nextLng') ?? 'en'
    dispatch(setLanguage(savedLanguage))
    void i18n.changeLanguage(savedLanguage)
  }, [dispatch, i18n])

  useEffect(() => {
    const syncSection = () => {
      const sections = ['home', 'experience', 'projects', 'contact']
      const scrollPosition = window.scrollY + 160
      let current = 'home'

      for (let index = sections.length - 1; index >= 0; index -= 1) {
        const sectionId = sections[index]
        const section = document.getElementById(sectionId)

        if (section && scrollPosition >= section.offsetTop) {
          current = sectionId
          break
        }
      }

      setActiveSection(current ? `#${current}` : '#home')
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
      {/* Full Width Top Header */}
      <header className="fixed inset-x-0 top-0 z-50 w-full px-6 py-6 md:px-10 lg:px-16 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 to-transparent pointer-events-none backdrop-blur-[1px]" />

        {/* Desktop: justify-between | Mobile: justify-between */}
        <div className="relative flex w-full items-center justify-between">
          <a
            href="#home"
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 text-primary transition-all hover:scale-[1.02] active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl">terminal</span>
            <span className="text-base font-bold uppercase tracking-wide text-primary md:text-xl">
              Portfolio
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8 mr-4">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.href

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`group relative text-sm font-semibold uppercase tracking-wider transition-all ${isActive
                        ? 'text-primary'
                        : 'text-on-surface-variant/80 hover:text-primary'
                      }`}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>

            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center justify-center text-primary transition-all hover:opacity-80 active:scale-95"
              aria-label="Toggle Language"
            >
              <span className="text-sm font-semibold uppercase tracking-widest">{currentLanguage === 'en' ? 'US' : 'VI'}</span>
            </button>
          </div>

          {/* Mobile Language Switcher (Absolute on the right to keep logo centered) */}
          <div className="absolute right-0 flex items-center md:hidden pr-4 sm:pr-8">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center justify-center text-primary transition-all active:scale-90 hover:opacity-80"
              aria-label="Toggle language"
            >
              <span className="text-xs font-bold uppercase tracking-widest">{currentLanguage === 'en' ? 'US' : 'VI'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full Width Bottom Navigation for Mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-50 w-full px-6 pb-6 md:hidden">
        {/* Strictly no container background, item center align */}
        <div className="mx-auto flex w-full max-w-sm items-center justify-between rounded-[32px] py-2">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.href

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`group relative flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90 ${isActive
                    ? 'text-primary drop-shadow-[0_0_12px_rgba(0,242,255,0.5)]'
                    : 'text-on-surface-variant/30 hover:text-primary'
                  }`}
                aria-label={item.label}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all ${isActive ? 'bg-primary/5' : ''}`}>
                  <span className={`material-symbols-outlined text-[24px]`}>
                    {item.icon}
                  </span>
                </div>
                <span className={`text-[8px] font-black uppercase tracking-[0.16em] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_#00f2ff]" />
                )}
              </a>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default Navbar
