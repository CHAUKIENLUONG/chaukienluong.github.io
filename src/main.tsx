import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import './index.css'
import App from './App.tsx'
import { store } from './store/store'
import i18n from './i18n'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Immediately disable scroll restoration and scroll to top
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)
ScrollTrigger.clearScrollMemory('manual')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </StrictMode>,
)
