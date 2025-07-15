import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

const About = () => {
  const skills = useSelector((state: RootState) => state.about.skills)

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            data-aos="fade-up"
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
          >
            About Me
          </h2>
          <div
            data-aos="zoom-in"
            data-aos-delay="100"
            className="mt-8 flex justify-center"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/avatar-aws.png`}
              alt="Profile Avatar"
              className="w-48 h-48 rounded-full object-cover border-4 border-indigo-500 dark:border-indigo-400 shadow-lg"
            />
          </div>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-4 text-lg text-gray-500 dark:text-gray-300"
          >
            I'm a passionate developer with a strong foundation in web development and a keen eye for creating engaging user experiences.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div data-aos="fade-right" data-aos-delay="300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Experience
            </h3>
            <div className="space-y-6">
              <div
                data-aos="fade-up"
                data-aos-delay="400"
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Fresher Developer
                </h4>
                <p className="text-gray-600 dark:text-gray-300">Company Name • 2020 - Present</p>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Led the development of multiple web applications using React and Node.js.
                  Implemented CI/CD pipelines and improved team productivity by 40%.
                </p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="600"
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Frontend Developer
                </h4>
                <p className="text-gray-600 dark:text-gray-300">Previous Company • 2018 - 2020</p>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Developed and maintained web applications using modern JavaScript frameworks.
                  Collaborated with design teams to implement responsive and accessible UIs.
                </p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Skills
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  data-aos="fade-up"
                  data-aos-delay={400 + index * 100}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
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