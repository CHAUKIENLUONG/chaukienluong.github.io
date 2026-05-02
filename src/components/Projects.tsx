import { useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useResponsiveQuery } from '../hooks/mediaQuery'


const Projects = () => {
  const projects = useSelector((state: RootState) => state.projects.projects)
  const { t } = useTranslation()
  const container = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const { isLargeScreen } = useResponsiveQuery()
  const shouldPinCarousel = isLargeScreen

  useGSAP(() => {
    const section = container.current
    const viewportElement = viewport.current
    const trackElement = track.current

    if (!section || !viewportElement || !trackElement) {
      return
    }

    const getHorizontalDistance = () => Math.max(
      0,
      trackElement.scrollWidth - viewportElement.clientWidth,
    )

    gsap.set(trackElement, { x: 0 })

    if (!shouldPinCarousel) {
      gsap.fromTo(
        section.querySelector('.projects-heading'),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        section.querySelectorAll('.project-card'),
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }

    const refreshOnImagesLoaded = () => ScrollTrigger.refresh()
    const images = Array.from(trackElement.querySelectorAll('img'))

    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener('load', refreshOnImagesLoaded, { once: true })
      }
    })

    const tween = shouldPinCarousel
      ? gsap.to(trackElement, {
        x: () => -getHorizontalDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(getHorizontalDistance(), window.innerHeight)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      : undefined

    return () => {
      images.forEach((image) => image.removeEventListener('load', refreshOnImagesLoaded))
      tween?.scrollTrigger?.kill()
      tween?.kill()
    }
  }, { scope: container, dependencies: [projects.length, shouldPinCarousel] })

  const sectionClassName = `luxury-section ${shouldPinCarousel ? 'overflow-hidden' : ''}`
  const contentClassName = `relative flex flex-col ${shouldPinCarousel ? 'min-h-screen justify-start pt-8 pb-12 lg:pt-12 lg:pb-16' : 'justify-start py-20 sm:py-24 md:py-28'}`
  const viewportClassName = `relative w-full ${shouldPinCarousel ? 'overflow-hidden' : 'overflow-visible'}`
  const trackClassName = shouldPinCarousel
    ? 'flex w-max items-stretch gap-6 pl-6 pr-[12vw] md:gap-8 md:pl-20 lg:pl-32'
    : 'grid w-full grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-2 md:gap-6'
  const projectCardClassName = shouldPinCarousel
    ? 'project-card luxury-glass group grid h-[calc(100vh-22rem)] min-h-[22rem] max-h-[36rem] w-[72vw] max-w-[62rem] shrink-0 overflow-hidden rounded-2xl border border-primary/20 transition-all duration-500 hover:border-primary/50 lg:grid-cols-[1fr_1fr]'
    : 'project-card luxury-glass group flex flex-col w-full min-h-[32rem] overflow-hidden rounded-2xl border border-primary/20 transition-all duration-500 hover:border-primary/50'
  const mediaClassName = shouldPinCarousel
    ? 'relative min-h-0 overflow-hidden transition-all duration-500 group-hover:border-primary/40 max-lg:h-[42%]'
    : 'relative h-56 overflow-hidden transition-all duration-500 group-hover:border-primary/40 sm:h-64 md:h-60'

  return (
    <div ref={container}>
      <section className={sectionClassName} id="projects">
        <div className={`${contentClassName} max-w-[110rem] mx-auto`}>
          <div className="projects-heading mb-6 flex flex-col gap-4 px-6 md:mb-8 md:flex-row md:items-end md:justify-between md:px-20 lg:px-32">
            <div>
              <span className="luxury-kicker mb-3 block">04 / PROJECTS</span>
              <h2 className="text-4xl font-bold text-tertiary text-glow-primary md:text-5xl">
                {t('projects.title') || 'Selected Projects'}
              </h2>
            </div>
          </div>

          <div ref={viewport} className={viewportClassName}>
            <div ref={track} className={trackClassName}>
              {projects.map((project, index) => (
                <article
                  key={project.title}
                  className={projectCardClassName}
                >
                  <div className={mediaClassName}>
                    <img
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 grayscale-[12%] transform-gpu transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                      src={project.image}
                    />
                    <div className="gold-rule absolute left-0 top-0 h-px w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-5 top-5 rounded-full border border-primary/25 bg-background/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary backdrop-blur-xl shadow-[0_0_18px_rgba(215,182,106,0.18)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex min-h-0 flex-col justify-center p-5 sm:p-6 md:p-8 lg:p-10">
                    <span className="label-sm text-[10px] font-bold uppercase tracking-widest text-primary/80">
                      {project.technologies[0]} / {project.technologies[1]}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tighter text-tertiary transition-colors group-hover:text-primary md:text-3xl">
                      {t(project.titleKey)}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-on-surface-variant md:text-base">
                      {t(project.descriptionKey)}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant backdrop-blur-xl transition-colors group-hover:border-primary/25 group-hover:text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6">
                      <a
                        className="inline-flex items-center gap-3 rounded-full border border-primary/25 bg-primary/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-primary shadow-[0_10px_30px_rgba(215,182,106,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/55 hover:bg-primary hover:text-on-primary"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/25 bg-background/40 text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary group-hover:text-black">
                          <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                        </span>
                        <span>{t('projects.viewRepository') || 'View Repository'}</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects
