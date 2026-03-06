import Link from 'next/link'
import { portfolioData } from '@/config/portfolio-data'

export default function Certifications() {
  const { certifications } = portfolioData

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-black dark:text-white">
          Recent Certifications
        </h2>
        <Link href="/certifications" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
          View All →
        </Link>
      </div>

      <div className="space-y-2">
        {certifications.map((cert, index) => (
          <a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 bg-gray-50 dark:bg-gray-800 rounded hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {cert.title.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-black dark:text-white text-sm truncate">
                {cert.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {cert.issuer}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
