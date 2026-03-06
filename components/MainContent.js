import { portfolioData } from '@/config/portfolio-data'
import TechStack from './TechStack'
import Experience from './Experience'
import Projects from './Projects'
import Certifications from './Certifications'
import Recommendations from './Recommendations'
import Gallery from './Gallery'
import Contact from './Contact'

export default function MainContent() {
  const { personal } = portfolioData

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 bg-white dark:bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* About Section */}
          <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3 text-black dark:text-white">About</h2>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              <p>{personal.bio}</p>
            </div>
          </section>

          {/* Tech Stack */}
          <TechStack />
          
          {/* Projects */}
          <Projects />
          
          
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Experience Section */}
          <Experience />

          {/* Recommendations Carousel */}
          <Recommendations />

          {/* Certifications */}
          <Certifications />
        </div>
      </div>

      {/* Gallery - Full Width */}
      <div className="mt-4 sm:mt-6">
        <Gallery />
      </div>
    </div>
  )
}
