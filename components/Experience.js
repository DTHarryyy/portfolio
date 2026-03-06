import { portfolioData } from '@/config/portfolio-data'

export default function Experience() {
  const { experience } = portfolioData

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-bold mb-4 text-black dark:text-white">
        Experience
      </h2>

      <div className="space-y-4">
        {experience.map((item, index) => (
          <div key={index} className="relative pl-8">
            {index !== experience.length - 1 && (
              <span
                className="absolute left-[7px] top-5 w-px bg-gradient-to-b from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-500"
                style={{ height: 'calc(100% + 1rem)' }}
                aria-hidden="true"
              />
            )}

            <span
              className="absolute left-0 top-1.5 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-sm shadow-sm shadow-blue-500/30"
              aria-hidden="true"
            />

            <div className="flex items-start justify-between gap-3 p-2.5 border border-gray-200 dark:border-gray-800 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {item.company}
                </p>
              </div>
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex-shrink-0">
                {item.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
