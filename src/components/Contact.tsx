import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import type { AppDispatch } from '../store/store'
import { updateFormData, sendEmail } from '../store/slices/contactReducer'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { formData, isSubmitting, submitStatus } = useSelector(
    (state: RootState) => state.contact
  )
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <section className="relative overflow-hidden px-4 py-20 pb-40 sm:px-6 md:px-20 md:py-32 md:pb-32 lg:px-32" id="contact">
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[85%] bg-gradient-to-l from-primary/5 to-transparent blur-3xl md:w-[50%]"></div>
      <div className="asymmetric-grid w-full gap-12 lg:gap-16">
        <div 
            data-aos="fade-right"
            className="lg:col-span-5"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">04 / CONNECT</span>
          <h2 className="mb-6 text-[2.25rem] font-bold leading-[0.95] text-tertiary sm:text-4xl md:mb-8 md:text-5xl">{t('contact.title') || 'Initiate'}<br/>{t('contact.subtitle') || 'Protocol'}</h2>
          <p className="mb-8 max-w-lg text-[15px] leading-relaxed text-on-surface-variant sm:text-base md:mb-12 md:text-lg">
            {t('contact.description') || "Have a complex project that needs architectural precision? Drop a message and let's build the future together."}
          </p>
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-start gap-4 rounded-xl border border-outline-variant/10 bg-surface-container-low/50 px-4 py-3.5 text-on-surface md:border-0 md:bg-transparent md:px-0 md:py-0">
              <span className="material-symbols-outlined mt-0.5 text-primary">mail</span>
              <span className="break-all font-bold tracking-tight sm:break-normal">{t('contact.email') || 'ckluong21@gmail.com'}</span>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-outline-variant/10 bg-surface-container-low/50 px-4 py-3.5 text-on-surface md:border-0 md:bg-transparent md:px-0 md:py-0">
              <span className="material-symbols-outlined mt-0.5 text-primary">location_on</span>
              <span className="font-bold tracking-tight">{t('contact.location') || 'Vietnam / Global'}</span>
            </div>
          </div>
          <div className="mt-10 grid max-w-sm grid-cols-2 gap-3 md:mt-12 md:flex md:max-w-none md:flex-wrap md:gap-6">
            <a className="rounded-full border border-outline-variant/10 bg-surface-container-low/50 px-4 py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0" href="https://github.com/ckluong21" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="rounded-full border border-outline-variant/10 bg-surface-container-low/50 px-4 py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0" href="https://linkedin.com/in/ckluong" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div 
            data-aos="fade-left"
            data-aos-delay="200"
            className="relative z-10 rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-low p-6 sm:p-8 md:rounded-2xl md:p-12 lg:col-span-7"
        >
          <form className="space-y-8 sm:space-y-10" onSubmit={handleSubmit}>
            <div className="relative">
              <input 
                className="peer w-full border-0 border-b border-outline-variant bg-transparent px-0 py-4 text-base text-tertiary transition-colors placeholder-transparent focus:border-primary focus:ring-0 md:text-sm" 
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
                className="peer w-full border-0 border-b border-outline-variant bg-transparent px-0 py-4 text-base text-tertiary transition-colors placeholder-transparent focus:border-primary focus:ring-0 md:text-sm" 
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
                className="peer w-full resize-none border-0 border-b border-outline-variant bg-transparent px-0 py-4 text-base text-tertiary transition-colors placeholder-transparent focus:border-primary focus:ring-0 md:text-sm" 
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
                    &gt; {t('contact.form.success')}
                </div>
                )}
                {submitStatus === 'error' && (
                <div className="rounded-lg border border-error/20 bg-error/10 px-4 py-3 text-[11px] leading-relaxed text-error sm:text-[10px] sm:uppercase sm:tracking-widest">
                    &gt; {t('contact.form.error')}
                </div>
                )}
            </div>

            <button 
                className={`metallic-gradient flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-on-primary shadow-[0_10px_30px_rgba(0,242,255,0.2)] transition-all hover:scale-105 sm:px-10 sm:py-5 sm:text-sm sm:tracking-widest md:w-max ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`} 
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
  )
}

export default Contact
