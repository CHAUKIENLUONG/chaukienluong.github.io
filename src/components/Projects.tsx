import { useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Projects = () => {
  const projects = useSelector((state: RootState) => state.projects.projects)
  const { t } = useTranslation()
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Section Title
    const title = container.current?.querySelector('h2');
    if (title && title.parentElement) {
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

    // Projects Items
    gsap.fromTo(gsap.utils.toArray('.group'),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.grid', start: 'top 80%' }
      }
    )
  }, { scope: container })

  return (
    <div ref={container}>
      <section className="py-32 px-6 md:px-20 lg:px-32 bg-surface-container-lowest" id="projects">
        <div
          className="flex justify-between items-end mb-20"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">03 / PROJECTS</span>
            <h2 className="text-4xl font-bold text-tertiary">{t('projects.title') || 'Selected Projects'}</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="bg-surface-container-low rounded-xl overflow-hidden mb-8 transition-all duration-500 ghost-border group-hover:shadow-[0_20px_40px_rgba(0,242,255,0.08)] relative">
                <div className="aspect-video overflow-hidden">
                  <img
                    alt={project.title}
                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700"
                    src={project.image}
                  />
                </div>
                {/* Top Glow Edge */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-4">
                <span className="label-sm uppercase tracking-widest text-[10px] font-bold text-secondary">{project.technologies[0]} / {project.technologies[1]}</span>
                <h3 className="text-2xl font-bold text-tertiary group-hover:text-primary transition-colors uppercase tracking-tighter">
                  {t(project.titleKey)}
                </h3>
                <p className="text-on-surface-variant leading-relaxed max-w-md">
                  {t(project.descriptionKey)}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="text-[10px] font-bold uppercase tracking-tighter px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full group-hover:text-primary transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-4">
                  <a
                    className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-primary shadow-[0_10px_30px_rgba(0,242,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/10 hover:shadow-[0_16px_40px_rgba(0,242,255,0.16)] hover:text-tertiary"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-surface-container-high text-primary transition-colors group-hover:border-primary/40">
                      <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                    </span>
                    <span>{t('projects.viewRepository') || 'View Repository'}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects
