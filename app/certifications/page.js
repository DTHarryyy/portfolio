import { portfolioData } from '@/config/portfolio-data'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export const metadata = {
  title: 'All Certifications | ' + portfolioData.seo.title,
  description: 'View all certifications and credentials',
}

export default function AllCertifications() {
  const { certifications } = portfolioData

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
            Certifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Professional certifications and credentials.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-lg transition-all hover:border-blue-400 dark:hover:border-blue-500"
            >
              {/* Cert Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-lg font-bold mb-4">
                {cert.title.charAt(0)}
              </div>

              {/* Cert Title */}
              <h3 className="text-lg font-bold text-black dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cert.title}
              </h3>

              {/* Cert Issuer */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {cert.issuer}
              </p>

              {/* View Link */}
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-medium">
                View Certificate →
              </div>
            </a>
          ))}
        </div>

        {/* Empty State */}
        {certifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No certifications yet.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
