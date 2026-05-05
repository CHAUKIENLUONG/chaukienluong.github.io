import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import './assets/css/style.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const container = useRef<HTMLDivElement>(null)



  useEffect(() => {
    // Force scroll to top on mount with a small delay to override GSAP/Lazy loading behavior
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      ScrollTrigger.config({ 
        ignoreMobileResize: true, 
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize' 
      })
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
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
