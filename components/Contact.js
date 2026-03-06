import { portfolioData } from '@/config/portfolio-data'
import { FaEnvelope, FaCalendar, FaBook, FaChevronRight } from 'react-icons/fa'

export default function Contact() {
  const { personal } = portfolioData

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <div className="space-y-3">
        <a
          href={`mailto:${personal.email}`}
          className="flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors"
        >
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-600 dark:text-gray-400 text-sm" />
            <div>
              <p className="text-xs font-medium text-black dark:text-white">Email</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{personal.email}</p>
            </div>
          </div>
          <FaChevronRight className="text-gray-400 text-xs" />
        </a>

        <a
          href={personal.calendlyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors"
        >
          <div className="flex items-center gap-2">
            <FaCalendar className="text-gray-600 dark:text-gray-400 text-sm" />
            <div>
              <p className="text-xs font-medium text-black dark:text-white">Let's Talk</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Schedule a Call</p>
            </div>
          </div>
          <FaChevronRight className="text-gray-400 text-xs" />
        </a>

        {personal.blogLink && (
          <a
            href={personal.blogLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors"
          >
            <div className="flex items-center gap-2">
              <FaBook className="text-gray-600 dark:text-gray-400 text-sm" />
              <div>
                <p className="text-xs font-medium text-black dark:text-white">Blog</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Read my blog</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400 text-xs" />
          </a>
        )}
      </div>
    </section>
  )
}
