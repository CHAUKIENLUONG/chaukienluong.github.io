import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

type SkillIconKey =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'tailwind'
  | 'postgresql'
  | 'nodejs'
  | 'antd'

type Skill = {
  name: string
  icon: SkillIconKey
}

const Experience = () => {
  const { t } = useTranslation()
  const experiences = useSelector((state: RootState) => state.experience.experiences)

  const skills: Skill[] = [
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'React / Next', icon: 'react' },
    { name: 'Tailwind CSS', icon: 'tailwind' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Ant Design', icon: 'antd' },
  ]

  const renderSkillIcon = (icon: SkillIconKey) => {
    const iconClassName = 'h-10 w-10 transition-transform duration-300 group-hover:scale-110'

    switch (icon) {
      case 'html':
        return (
          <svg viewBox="0 0 64 64" className={iconClassName} aria-hidden="true">
            <path d="M12 10h40l-3.6 40.8L32 55l-16.4-4.2Z" fill="#E44D26" />
            <path d="M32 13h16.3l-3.1 35.2L32 51.7Z" fill="#F16529" />
            <path d="M32 28.1H23.8l-.6-6.2H32V16h-15l1.7 18h13.3Zm0 9.7l-.1.1l-6.7-1.8l-.4-4.4H19l.8 9l12.1 3.2l.1-.1Z" fill="#EBEBEB" />
            <path d="M32 28.1v5.9h7.6l-.7 7.8L32 43.5v6.2l12.2-3.3l1.8-20.3Zm0-12.1v5.9h13.8l.5-5.9Z" fill="#fff" />
          </svg>
        )
      case 'css':
        return (
          <svg viewBox="0 0 64 64" className={iconClassName} aria-hidden="true">
            <path d="M12 10h40l-3.6 40.8L32 55l-16.4-4.2Z" fill="#264DE4" />
            <path d="M32 13h16.3l-3.1 35.2L32 51.7Z" fill="#2965F1" />
            <path d="M32 28.1H23.8l-.6-6.2H32V16h-15l1.7 18h13.3Zm0 9.7l-.1.1l-6.7-1.8l-.4-4.4H19l.8 9l12.1 3.2l.1-.1Z" fill="#EBEBEB" />
            <path d="M32 28.1v5.9h7.6l-.7 7.8L32 43.5v6.2l12.2-3.3l1.8-20.3Zm0-12.1v5.9h13.8l.5-5.9Z" fill="#fff" />
          </svg>
        )
      case 'javascript':
        return (
          <svg viewBox="0 0 64 64" className={iconClassName} aria-hidden="true">
            <rect x="10" y="10" width="44" height="44" rx="10" fill="#F7DF1E" />
            <path d="M34.9 42.6c1.4 2.3 3.2 4 6.4 4c2.7 0 4.4-1.3 4.4-3.2c0-2.2-1.7-3-4.7-4.3l-1.6-.7c-4.5-1.9-7.5-4.3-7.5-9.3c0-4.6 3.5-8.1 9-8.1c3.9 0 6.7 1.4 8.7 4.9l-4.8 3.1c-1.1-1.9-2.2-2.7-3.9-2.7c-1.8 0-2.9 1.1-2.9 2.7c0 1.9 1.1 2.6 3.8 3.8l1.6.7c5.3 2.3 8.4 4.6 8.4 9.8c0 5.6-4.4 8.7-10.4 8.7c-5.8 0-9.5-2.8-11.3-6.4Zm-21.9.5c1 .1 1.8.2 2.5.2c2.1 0 3.4-.8 3.4-3.8V21.3h6.1v18.3c0 5.6-3.3 8.2-8.1 8.2c-1.2 0-2.2-.1-3.9-.4Z" fill="#111" />
          </svg>
        )
      case 'typescript':
        return (
          <svg viewBox="0 0 64 64" className={iconClassName} aria-hidden="true">
            <rect x="8" y="8" width="48" height="48" rx="12" fill="#3178C6" />
            <path d="M22 24h20v6h-7v20h-6V30h-7z" fill="#fff" />
            <path d="M46 32c-1.7-1.3-3.5-2-5.5-2c-3.7 0-6.5 2.2-6.5 5.5c0 2.7 1.5 4.2 5 5.4c2.3.8 3 1.4 3 2.4c0 1-.9 1.8-2.5 1.8c-1.8 0-3.6-.9-5.4-2.6l-3.4 4.3c2.3 2.2 5.5 3.4 8.8 3.4c5 0 8.5-2.6 8.5-6.8c0-3.3-1.7-5.2-5.9-6.5c-2-.7-2.7-1.2-2.7-2.2c0-.9.8-1.5 2-1.5c1.2 0 2.5.5 4.1 1.7z" fill="#fff" />
          </svg>
        )
      case 'react':
        return (
          <svg viewBox="0 0 64 64" className={iconClassName} aria-hidden="true">
            <circle cx="32" cy="32" r="4.5" fill="#61DAFB" />
            <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="#61DAFB" strokeWidth="3" />
            <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(60 32 32)" fill="none" stroke="#61DAFB" strokeWidth="3" />
            <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(120 32 32)" fill="none" stroke="#61DAFB" strokeWidth="3" />
          </svg>
        )
      case 'tailwind':
        return (
          <svg viewBox="0 0 64 64" className={iconClassName} aria-hidden="true">
            <path d="M20 26c2.7-5.3 6.7-8 12-8c8 0 9 6 13 8c2.7 1.3 5.7 1 9-1c-2.7 5.3-6.7 8-12 8c-8 0-9-6-13-8c-2.7-1.3-5.7-1-9 1Z" fill="#38BDF8" />
            <path d="M11 39c2.7-5.3 6.7-8 12-8c8 0 9 6 13 8c2.7 1.3 5.7 1 9-1c-2.7 5.3-6.7 8-12 8c-8 0-9-6-13-8c-2.7-1.3-5.7-1-9 1Z" fill="#38BDF8" />
          </svg>
        )
      case 'postgresql':
        return (
          <svg viewBox="0 0 64 64" className={iconClassName} aria-hidden="true">
            <path d="M30 12c-6.4 0-11 4.7-11 11.5v14.8c0 4.5 2.6 7.7 6.5 9.2l-1.2 6.9l5.5-1.4l3.2-4.4h3.5c6.2 0 10.5-4.6 10.5-11V23.8C47 16.7 40.7 12 30 12Z" fill="#336791" />
            <path d="M30 18c-4.3 0-6.7 2.3-6.7 6.3v13c0 4.5 2.8 7.1 7.4 7.1h2.8c5.2 0 8.2-2.9 8.2-8V24.9c0-4.4-3.7-6.9-11.7-6.9Z" fill="#fff" opacity=".14" />
            <circle cx="28" cy="27" r="2.2" fill="#fff" />
            <circle cx="38" cy="27" r="2.2" fill="#fff" />
            <path d="M27 35c3.2 1.8 6.8 1.8 10 0" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M41.8 39.5c2.4.2 4.7-.3 6.8-1.5" fill="none" stroke="#336791" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )
      case 'nodejs':
        return (
          <svg viewBox="0 0 64 64" className={iconClassName} aria-hidden="true">
            <path d="M32 9l19 11v24L32 55L13 44V20Z" fill="#539E43" />
            <path d="M32 15.2l13.5 7.8v15.9L32 46.8l-13.5-7.9V23Z" fill="#6CC24A" />
            <path d="M27.4 24h4.2l5 8.8V24H41v16h-4l-5.2-9.2V40h-4.4Z" fill="#fff" />
          </svg>
        )
      case 'antd':
        return (
          <svg viewBox="0 0 64 64" className={iconClassName} aria-hidden="true">
            <path d="M32 10L13 21v22l19 11l19-11V21Zm0 6.5l12.9 7.4v14.8L32 46.1l-12.9-7.4V23.9Z" fill="#1677FF" />
            <path d="M32 23.7l6.8 4v8.6L32 40.3l-6.8-4v-8.6Z" fill="#91C3FF" />
            <path d="M25.2 27.7L32 31.6l6.8-3.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 31.6v8.7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
    }
  }

  return (
    <>
      <section className="bg-surface-container-lowest px-6 py-32 md:px-20 lg:px-32" id="experience">
        <div className="asymmetric-grid w-full">
          <div
            data-aos="fade-right"
            className="col-span-12 mb-12 lg:col-span-4 lg:mb-0"
          >
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">02 / JOURNEY</span>
            <h2 className="text-4xl font-bold text-tertiary">{t('experience.title') || 'Experience'}</h2>
          </div>
          <div className="col-span-12 space-y-12 lg:col-start-6 lg:col-span-7">
            {experiences.map((exp, index) => (
              <div
                key={exp.companyKey}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
              >
                <div className="absolute left-[-4px] top-0 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,242,255,0.6)]"></div>
                <div className="mb-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <span className="-mt-2 block text-xl font-bold uppercase tracking-tighter text-primary">
                    {t(exp.companyKey)}
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                    {t(exp.periodKey)}
                  </span>
                </div>
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-on-surface">
                  {t(exp.roleKey)}
                </h3>
                <ul className="max-w-2xl space-y-2 leading-relaxed text-on-surface-variant">
                  {exp.bulletKeys.map((bulletKey) => (
                    <li key={bulletKey} className="flex gap-3">
                      <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                      <span>{t(bulletKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32 md:px-20 lg:px-32" id="skills">
        <div
          data-aos="fade-up"
          className="mb-20"
        >
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">03 / ARSENAL</span>
          <h2 className="text-4xl font-bold text-tertiary">{t('skills.title') || 'Technical Stack'}</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="ghost-border flex flex-col items-center gap-4 rounded-lg p-6 transition-all duration-300 group hover:bg-surface-container-high/30"
            >
              <div className="text-tertiary transition-colors group-hover:text-primary">
                {renderSkillIcon(skill.icon)}
              </div>
              <span className="label-md flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.05em] text-on-surface-variant group-hover:text-primary">
                <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100"></span>
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Experience
