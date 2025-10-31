import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { useTranslation } from 'react-i18next'

const About = () => {
  const skills = useSelector((state: RootState) => state.about.skills)
  const { t } = useTranslation()
  const tKeys = {
    frontend: 'about.experiences.frontend'
  }

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            data-aos="fade-up"
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
          >
            {t('about.title')}
          </h2>
          <div
            data-aos="zoom-in"
            data-aos-delay="100"
            className="mt-8 flex justify-center"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/avatar.png`}
              alt="Profile Avatar"
              className="w-48 h-48 rounded-full object-cover border-4 border-indigo-500 dark:border-indigo-400 shadow-lg"
            />
          </div>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-4 text-lg text-gray-500 dark:text-gray-300"
          >
            {t('about.description')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div data-aos="fade-right" data-aos-delay="300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about.sectionTitles.experience')}</h3>
            <div className="space-y-6">
              <div
                data-aos="fade-up"
                data-aos-delay="400"
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t(`${tKeys.frontend}.title`)}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">{t(`${tKeys.frontend}.company`)}</p>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {t(`${tKeys.frontend}.description`)}
                </p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about.sectionTitles.skills')}
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  data-aos="fade-up"
                  data-aos-delay={400 + index * 100}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      {skill.nameKey ? t(skill.nameKey) : skill.name}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full"
                      style={{ width: skill.level }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About