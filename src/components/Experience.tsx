import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiTailwindcss, SiPostgresql, SiAntdesign } from 'react-icons/si'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useResponsiveQuery } from '../hooks/mediaQuery'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
  const container = useRef<HTMLDivElement>(null)
  const { isMobile, isTablet, isLaptop } = useResponsiveQuery()

  useGSAP(() => {
    // Section Titles
    gsap.utils.toArray<HTMLElement>('section h2').forEach((title) => {
      if (title.parentElement) {
        gsap.fromTo(title.parentElement,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: title.parentElement,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    })

    // Experience Items
    gsap.fromTo(gsap.utils.toArray('.experience-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.experience-list', start: 'top 80%' }
      }
    )

    // Skills
    gsap.fromTo(gsap.utils.toArray('.skill-card'),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '#skills .grid', start: 'top 85%' }
      }
    )
  }, { scope: container })

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
    const iconClassName = `${isMobile ? 'h-8 w-8' : 'h-10 w-10'} transition-transform duration-300 group-hover:scale-110`

    switch (icon) {
      case 'html':
        return <FaHtml5 className={iconClassName} color="#E44D26" />
      case 'css':
        return <FaCss3Alt className={iconClassName} color="#264DE4" />
      case 'javascript':
        return <SiJavascript className={iconClassName} color="#F7DF1E" />
      case 'typescript':
        return <SiTypescript className={iconClassName} color="#3178C6" />
      case 'react':
        return <FaReact className={iconClassName} color="#61DAFB" />
      case 'tailwind':
        return <SiTailwindcss className={iconClassName} color="#38BDF8" />
      case 'postgresql':
        return <SiPostgresql className={iconClassName} color="#336791" />
      case 'nodejs':
        return <FaNodeJs className={iconClassName} color="#6CC24A" />
      case 'antd':
        return <SiAntdesign className={iconClassName} color="#1677FF" />
      default:
        return null
    }
  }

  const sectionClassName = `luxury-section ${isMobile
    ? 'px-4 py-20'
    : isTablet
      ? 'px-6 py-24'
      : isLaptop
        ? 'px-12 py-28'
        : 'px-32 py-32'
    }`
  const titleClassName = `font-bold text-tertiary text-glow-primary ${isMobile ? 'text-[2.25rem]' : 'text-5xl'}`
  const experienceListClassName = `experience-list col-span-12 ${isMobile ? 'space-y-6' : 'space-y-10'} lg:col-start-6 lg:col-span-7`
  const experienceCardClassName = `experience-card luxury-glass group relative rounded-2xl transition-all duration-500 before:absolute before:bg-gradient-to-b before:from-primary before:via-primary/25 before:to-transparent hover:border-primary/35 hover:shadow-[0_0_38px_rgba(215,182,106,0.1)] ${isMobile
    ? 'p-5 pl-8 before:left-4 before:bottom-5 before:top-5 before:w-px'
    : 'p-7 pl-10 before:left-5 before:bottom-7 before:top-7 before:w-px'
    }`
  const skillsGridClassName = `relative grid gap-4 ${isMobile
    ? 'grid-cols-2'
    : isTablet
      ? 'grid-cols-3 gap-5'
      : 'grid-cols-4 gap-6'
    }`
  const skillCardClassName = `skill-card luxury-glass group flex flex-col items-center rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_0_34px_rgba(215,182,106,0.1)] ${isMobile ? 'gap-3 p-4' : 'gap-4 p-6'}`

  return (
    <div ref={container}>
      <section className={sectionClassName} id="experience">
        <div className="relative asymmetric-grid w-full max-w-[110rem] mx-auto">
          <div
            className="col-span-12 mb-12 lg:col-span-4 lg:mb-0"
          >
            <span className="luxury-kicker mb-3 block">02 / JOURNEY</span>
            <h2 className={titleClassName}>{t('experience.title') || 'Experience'}</h2>
          </div>
          <div className={experienceListClassName}>
            {experiences.map((exp) => (
              <div
                key={exp.companyKey}
                className={experienceCardClassName}
              >
                <div className={`absolute h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_rgba(215,182,106,0.75)] ${isMobile ? 'left-[13px] top-5' : 'left-[17px] top-7'}`}></div>
                <div className="mb-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <span className={`-mt-2 block font-bold uppercase tracking-tighter text-primary ${isMobile ? 'text-lg' : 'text-xl'}`}>
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
                      <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(215,182,106,0.62)]"></span>
                      <span>{t(bulletKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClassName} id="skills">
        <div className="max-w-[110rem] mx-auto">
          <div
            className={isMobile ? 'mb-10' : 'mb-20'}
          >
            <span className="luxury-kicker mb-3 block">03 / ARSENAL</span>
            <h2 className={titleClassName}>{t('skills.title') || 'Technical Stack'}</h2>
          </div>
          <div className={skillsGridClassName}>
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={skillCardClassName}
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
        </div>
      </section>
    </div>
  )
}

export default Experience
