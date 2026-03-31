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
    <section className="py-32 px-6 md:px-20 lg:px-32 relative overflow-hidden" id="contact">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-primary/5 to-transparent blur-3xl pointer-events-none"></div>
      <div className="asymmetric-grid w-full gap-16">
        <div 
            data-aos="fade-right"
            className="col-span-12 lg:col-span-5"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">04 / CONNECT</span>
          <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-8">{t('contact.title') || 'Initiate'}<br/>{t('contact.subtitle') || 'Protocol'}</h2>
          <p className="text-on-surface-variant mb-12 text-lg">
            {t('contact.description') || "Have a complex project that needs architectural precision? Drop a message and let's build the future together."}
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-on-surface">
              <span className="material-symbols-outlined text-primary">mail</span>
              <span className="font-bold tracking-tight">{t('contact.email') || 'ckluong21@gmail.com'}</span>
            </div>
            <div className="flex items-center gap-4 text-on-surface">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span className="font-bold tracking-tight">{t('contact.location') || 'Vietnam / Global'}</span>
            </div>
          </div>
          <div className="flex gap-6 mt-12">
            <a className="text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]" href="https://github.com/ckluong21" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]" href="https://linkedin.com/in/ckluong" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div 
            data-aos="fade-left"
            data-aos-delay="200"
            className="col-span-12 lg:col-span-7 bg-surface-container-low p-8 md:p-12 rounded-2xl relative z-10 border border-outline-variant/10"
        >
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="relative">
              <input 
                className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-tertiary transition-colors placeholder-transparent text-sm" 
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
                className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-tertiary transition-colors placeholder-transparent text-sm" 
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
                className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-tertiary transition-colors placeholder-transparent resize-none text-sm" 
                id="message" 
                name="message"
                placeholder=" " 
                rows={4}
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
                <div className="text-[10px] text-primary uppercase tracking-widest bg-primary/10 px-4 py-3 rounded-lg border border-primary/20">
                    &gt; {t('contact.form.success')}
                </div>
                )}
                {submitStatus === 'error' && (
                <div className="text-[10px] text-error uppercase tracking-widest bg-error/10 px-4 py-3 rounded-lg border border-error/20">
                    &gt; {t('contact.form.error')}
                </div>
                )}
            </div>

            <button 
                className={`metallic-gradient text-on-primary px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-sm w-full md:w-max shadow-[0_10px_30px_rgba(0,242,255,0.2)] hover:scale-105 transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`} 
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
