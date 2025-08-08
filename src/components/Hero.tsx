import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900" />

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center">
          <h1
            data-aos="fade-down"
            data-aos-delay="100"
            className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
          >
            <span className="block">{t('hero.greeting')}</span>
            <span className="block pt-3 pb-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Chau Kien Luong
            </span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            {t('hero.description')}
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('contact.title')}
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-indigo-200 dark:border-indigo-800 text-base font-medium rounded-full text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('projects.title')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero