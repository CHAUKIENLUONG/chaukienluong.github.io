import { Suspense, lazy, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import './assets/css/style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const Hero = lazy(() => import('./components/Hero'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

const LoadingSpinner = () => (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
  </div>
)

function App() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      gsap.utils.toArray('#experience .experience-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#experience .experience-list', start: 'top 80%' },
      },
    )

    gsap.fromTo(
      gsap.utils.toArray('#skills .skill-card'),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '#skills .grid', start: 'top 85%' },
      },
    )

    const contactLeft = document.querySelector('#contact .asymmetric-grid > div:nth-child(1)')
    const contactRight = document.querySelector('#contact .asymmetric-grid > div:nth-child(2)')

    if (contactLeft) {
      gsap.fromTo(
        contactLeft,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#contact', start: 'top 80%' },
        },
      )
    }

    if (contactRight) {
      gsap.fromTo(
        contactRight,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#contact', start: 'top 80%' },
        },
      )
    }
  }, { scope: container })

  useEffect(() => {
    // Force scroll to top on mount with a small delay to override GSAP/Lazy loading behavior
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      ScrollTrigger.refresh()
    }, 100)

    document.documentElement.classList.add('dark')
    document.documentElement.classList.add('selection-custom')

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={container} className="min-h-screen bg-background text-on-surface font-body selection-custom">
      <Navbar />

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
