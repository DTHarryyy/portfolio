import { portfolioData } from '@/config/portfolio-data'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export const metadata = {
  title: 'Tech Stack | ' + portfolioData.seo.title,
  description: 'View my complete tech stack and skills',
}

export default function TechStackPage() {
  const { techStack } = portfolioData

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
        >
          <FaArrowLeft className="text-xs" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            Tech Stack
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Technologies and tools I work with.
          </p>
        </div>

        {/* Tech Stack Categories */}
        <div className="space-y-8">
          {/* Frontend */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-4">
              Frontend
            </h2>
            <div className="flex flex-wrap gap-2">
              {techStack.frontend.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-4">
              Backend
            </h2>
            <div className="flex flex-wrap gap-2">
              {techStack.backend.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium border border-purple-200 dark:border-purple-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Database */}
          {techStack.database && (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-4">
                Database
              </h2>
              <div className="flex flex-wrap gap-2">
                {techStack.database.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium border border-green-200 dark:border-green-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* DevOps & Cloud */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-4">
              DevOps & Cloud
            </h2>
            <div className="flex flex-wrap gap-2">
              {techStack.devops.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-medium border border-orange-200 dark:border-orange-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
