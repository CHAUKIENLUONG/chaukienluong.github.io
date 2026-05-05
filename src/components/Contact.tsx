import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import type { AppDispatch } from '../store/store'
import { updateFormData, sendEmail } from '../store/slices/contactReducer'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useResponsiveQuery } from '../hooks/mediaQuery'


const Contact = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { formData, isSubmitting, submitStatus } = useSelector(
    (state: RootState) => state.contact
  )
  const { t } = useTranslation()
  const container = useRef<HTMLDivElement>(null)
  const { isMobile, isTablet, isLaptop } = useResponsiveQuery()

  useGSAP(() => {
    if (isMobile || isTablet) return
    // Contact Content
    const contactLeft = container.current?.querySelector('.asymmetric-grid > div:nth-child(1)')
    const contactRight = container.current?.querySelector('.asymmetric-grid > div:nth-child(2)')
    if (contactLeft) {
      gsap.fromTo(contactLeft,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: contactLeft, start: 'top 80%' } }
      )
    }
    if (contactRight) {
      gsap.fromTo(contactRight,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: contactRight, start: 'top 80%' } }
      )
    }
  }, { scope: container })

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(sendEmail(formData))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    dispatch(updateFormData({ name, value }))
  }

  const floatingLabelClass = (hasValue: boolean) =>
    `absolute left-0 font-bold uppercase tracking-widest transition-all pointer-events-none ${hasValue
      ? '-top-4 text-[10px] text-primary'
      : 'top-4 text-on-surface-variant text-xs'
    } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary`

  const sectionClassName = `luxury-section ${isMobile
    ? 'px-4 py-20 pb-44'
    : isTablet
      ? 'px-6 py-24 pb-28'
      : isLaptop
        ? 'px-12 py-28'
        : 'px-32 py-32'
    }`
  const gridClassName = `relative asymmetric-grid w-full ${isMobile ? 'gap-10' : 'gap-12 lg:gap-16'}`
  const titleClassName = `mb-6 font-bold leading-[0.95] text-tertiary text-glow-primary ${isMobile ? 'text-[2.25rem]' : 'text-5xl'}`
  const descriptionClassName = `mb-8 max-w-lg leading-relaxed text-on-surface-variant ${isMobile ? 'text-[15px]' : 'text-lg md:mb-12'}`
  const formPanelClassName = `luxury-glass luxury-glow relative z-10 rounded-[1.5rem] lg:col-span-7 ${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-12'}`

  return (
    <div ref={container}>
      <section className={sectionClassName} id="contact">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[85%] bg-gradient-to-l from-primary/10 to-transparent blur-3xl md:w-[50%]"></div>
        <div className={`${gridClassName} max-w-[110rem] mx-auto`}>
          <div
            className="lg:col-span-5"
          >
            <span className="luxury-kicker mb-3 block">05 / CONNECT</span>
            <h2 className={titleClassName}>{t('contact.title') || 'Initiate'}<br />{t('contact.subtitle') || 'Protocol'}</h2>
            <p className={descriptionClassName}>
              {t('contact.description') || "Have a complex project that needs architectural precision? Drop a message and let's build the future together."}
            </p>
            <div className="space-y-4 md:space-y-6">
              <div className="luxury-glass flex items-start gap-4 rounded-2xl px-4 py-3.5 text-on-surface md:px-5 md:py-4">
                <span className="material-symbols-outlined mt-0.5 text-primary">mail</span>
                <span className="break-all font-bold tracking-tight sm:break-normal">{t('contact.email') || 'ckluong21@gmail.com'}</span>
              </div>
              <div className="luxury-glass flex items-start gap-4 rounded-2xl px-4 py-3.5 text-on-surface md:px-5 md:py-4">
                <span className="material-symbols-outlined mt-0.5 text-primary">location_on</span>
                <span className="font-bold tracking-tight">{t('contact.location') || 'Vietnam / Global'}</span>
              </div>
            </div>
            <div className="mt-10 grid max-w-sm grid-cols-2 gap-3 md:mt-12 md:flex md:max-w-none md:flex-wrap md:gap-6">
              <a className="rounded-full border border-primary/20 bg-primary/10 px-4 py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary" href="https://github.com/CHAUKIENLUONG" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="rounded-full border border-primary/20 bg-primary/10 px-4 py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary" href="https://www.linkedin.com/in/luong-chau-254162346/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
          <div
            className={formPanelClassName}
          >
            <form className="space-y-8 sm:space-y-10" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  className="peer w-full border-0 border-b border-primary/20 bg-transparent px-0 py-4 text-base text-tertiary transition-colors placeholder-transparent focus:border-primary focus:ring-0 md:text-sm"
                  id="name"
                  name="name"
                  placeholder=" "
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label className={floatingLabelClass(Boolean(formData.name))} htmlFor="name">
                  {t('contact.form.name')}
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer w-full border-0 border-b border-primary/20 bg-transparent px-0 py-4 text-base text-tertiary transition-colors placeholder-transparent focus:border-primary focus:ring-0 md:text-sm"
                  id="email"
                  name="email"
                  placeholder=" "
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label className={floatingLabelClass(Boolean(formData.email))} htmlFor="email">
                  {t('contact.form.email')}
                </label>
              </div>
              <div className="relative">
                <textarea
                  className="peer w-full resize-none border-0 border-b border-primary/20 bg-transparent px-0 py-4 text-base text-tertiary transition-colors placeholder-transparent focus:border-primary focus:ring-0 md:text-sm"
                  id="message"
                  name="message"
                  placeholder=" "
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <label className={floatingLabelClass(Boolean(formData.message))} htmlFor="message">
                  {t('contact.form.message')}
                </label>
              </div>

              <div className="py-2">
                {submitStatus === 'success' && (
                  <div className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-[11px] leading-relaxed text-primary sm:text-[10px] sm:uppercase sm:tracking-widest">
                    {t('contact.form.success')}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="rounded-lg border border-error/20 bg-error/10 px-4 py-3 text-[11px] leading-relaxed text-error sm:text-[10px] sm:uppercase sm:tracking-widest">
                    {t('contact.form.error')}
                  </div>
                )}
              </div>

              <button
                className={`metallic-gradient flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-on-primary shadow-[0_10px_34px_rgba(215,182,106,0.22)] transition-all hover:scale-105 sm:px-10 sm:py-5 sm:text-sm sm:tracking-widest md:w-max ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />}
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit') || 'Transmit Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
