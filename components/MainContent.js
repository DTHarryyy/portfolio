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
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{personal.bio}</p>
            </div>
          </section>

          {/* Tech Stack */}
          <TechStack />
          
          {/* Projects */}
          <Projects />
          
          {/* Certifications */}
          <Certifications />
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Experience Section */}
          <Experience />

          {/* Achievement Badge */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-sm p-5 text-white text-center">
            <p className="text-xs mb-0.5">I'M PART OF</p>
            <h3 className="text-2xl font-bold mb-0.5">PH 100</h3>
            <p className="text-xs opacity-90">Philippines Top Developers</p>
          </div>

          {/* Recommendations Carousel */}
          <Recommendations />
        </div>
      </div>

      {/* Gallery - Full Width */}
      <div className="mt-4 sm:mt-6">
        <Gallery />
      </div>
    </div>
  )
}
