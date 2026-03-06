import Link from 'next/link'
import { portfolioData } from '@/config/portfolio-data'

export default function Projects() {
  const { projects } = portfolioData

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-black dark:text-white">
          Recent Projects
        </h2>
        <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projects.slice(0, 4).map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gray-50 dark:bg-gray-800 rounded p-3 hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm font-bold text-black dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1.5">
              {project.description}
            </p>
            <p className="text-blue-600 dark:text-blue-400 text-xs truncate">
              {project.url.replace('https://', '').replace('http://', '')}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}
