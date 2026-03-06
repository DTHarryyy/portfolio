import Link from 'next/link'
import { portfolioData } from '@/config/portfolio-data'

export default function TechStack() {
  const { techStack } = portfolioData

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-black dark:text-white">
          Tech Stack
        </h2>
        <Link href="/tech-stack" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
          View All →
        </Link>
      </div>

      <div className="space-y-3">
        {/* Frontend */}
        <div>
          <h3 className="text-xs font-semibold mb-2 text-black dark:text-white">
            Frontend
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {techStack.frontend.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded text-xs border border-gray-200 dark:border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div>
          <h3 className="text-xs font-semibold mb-2 text-black dark:text-white">
            Backend
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {techStack.backend.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded text-xs border border-gray-200 dark:border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* DevOps & Cloud */}
        <div>
          <h3 className="text-xs font-semibold mb-2 text-black dark:text-white">
            DevOps & Cloud
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {techStack.devops.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded text-xs border border-gray-200 dark:border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
