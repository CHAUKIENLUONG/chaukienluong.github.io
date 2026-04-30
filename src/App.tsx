import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar'
import './assets/css/style.css'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Lazy load components
const Hero = lazy(() => import('./components/Hero'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
  </div>
)

function App() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Hero Animations
    const heroLeft = document.querySelector('#home .order-2')
    const heroRight = document.querySelector('#home .order-1')
    if (heroLeft) {
      gsap.fromTo(heroLeft, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
    }
    if (heroRight) {
      gsap.fromTo(heroRight, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
    }

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
    gsap.fromTo(gsap.utils.toArray('#experience .relative.pl-8'),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '#experience .col-span-12.space-y-12', start: 'top 80%' }
      }
    )

    // Skills
    gsap.fromTo(gsap.utils.toArray('#skills .ghost-border'),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '#skills .grid', start: 'top 85%' }
      }
    )

    // Projects
    gsap.fromTo(gsap.utils.toArray('#projects .group'),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '#projects .grid', start: 'top 80%' }
      }
    )

    // Contact
    const contactLeft = document.querySelector('#contact .asymmetric-grid > div:nth-child(1)')
    const contactRight = document.querySelector('#contact .asymmetric-grid > div:nth-child(2)')
    if (contactLeft) {
      gsap.fromTo(contactLeft, 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#contact', start: 'top 80%' } }
      )
    }
    if (contactRight) {
      gsap.fromTo(contactRight, 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '#contact', start: 'top 80%' } }
      )
    }
  }, { scope: container })

  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.add('selection-custom')
  }, [])

  return (
    <div ref={container} className="min-h-screen bg-surface text-on-surface font-body selection-custom">
      <Navbar />

      {/* Floating Navigation Rail (Desktop Enhancement) */}
      <div className="hidden lg:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-10 z-40">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-outline-variant to-transparent opacity-20 mx-auto"></div>
        <div className="flex flex-col gap-6 text-on-surface-variant">
          <a href="#home" className="label-sm uppercase tracking-widest -rotate-90 origin-center text-[10px] font-bold">Scroll</a>
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,242,255,0.6)] mx-auto"></div>
        </div>
      </div>

      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
