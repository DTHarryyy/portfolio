import { portfolioData } from '@/config/portfolio-data'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export const metadata = {
  title: 'All Projects | ' + portfolioData.seo.title,
  description: 'View all projects and work',
}

export default function AllProjects() {
  const { projects } = portfolioData

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
            All Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            A complete collection of my recent work and projects.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-lg transition-all hover:border-blue-400 dark:hover:border-blue-500"
            >
              {/* Project Image/Icon */}
              {project.image && (
                <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <div className="text-white text-4xl opacity-75">📁</div>
                </div>
              )}

              {/* Project Title */}
              <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Project URL */}
              <div className="flex items-center justify-between">
                <p className="text-blue-600 dark:text-blue-400 text-xs font-medium truncate">
                  {project.url.replace('https://', '').replace('http://', '')}
                </p>
                <span className="text-blue-600 dark:text-blue-400">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No projects yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
