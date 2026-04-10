import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar'
import './assets/css/style.css'

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
  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.add('selection-custom')
  }, [])

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection-custom">
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
