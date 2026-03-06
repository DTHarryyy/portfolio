import { portfolioData } from '@/config/portfolio-data'

export default function Experience() {
  const { experience } = portfolioData

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-bold mb-4 text-black dark:text-white">
        Experience
      </h2>

      <div className="space-y-3">
        {experience.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <div className="w-4 h-4 mt-0.5 flex-shrink-0 bg-black dark:bg-white rounded-sm"></div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-black dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {item.company}
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                {item.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
