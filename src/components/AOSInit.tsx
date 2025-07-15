import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      mirror: true,
      easing: 'ease-in-out',
      offset: 150,
      disable: false,
      startEvent: 'DOMContentLoaded',
      disableMutationObserver: false,
      delay: 0,
    })
  }, [])

  return null
}

export default AOSInit