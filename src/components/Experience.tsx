import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { motion } from 'framer-motion'
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiTailwindcss, SiPostgresql, SiAntdesign } from 'react-icons/si'

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

  return (
    <>
      <section className="bg-surface-container-lowest px-6 py-32 md:px-20 lg:px-32" id="experience">
        <div className="asymmetric-grid w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-12 mb-12 lg:col-span-4 lg:mb-0"
          >
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">02 / JOURNEY</span>
            <h2 className="text-4xl font-bold text-tertiary">{t('experience.title') || 'Experience'}</h2>
          </motion.div>
          <div className="col-span-12 space-y-12 lg:col-start-6 lg:col-span-7">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.companyKey}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32 md:px-20 lg:px-32" id="skills">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">03 / ARSENAL</span>
          <h2 className="text-4xl font-bold text-tertiary">{t('skills.title') || 'Technical Stack'}</h2>
        </motion.div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="ghost-border flex flex-col items-center gap-4 rounded-lg p-6 transition-all duration-300 group hover:bg-surface-container-high/30"
            >
              <div className="text-tertiary transition-colors group-hover:text-primary">
                {renderSkillIcon(skill.icon)}
              </div>
              <span className="label-md flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.05em] text-on-surface-variant group-hover:text-primary">
                <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100"></span>
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Experience
