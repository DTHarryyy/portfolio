'use client'

import { useState } from 'react'
import { portfolioData } from '@/config/portfolio-data'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Recommendations() {
  const { recommendations, memberships } = portfolioData
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? recommendations.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === recommendations.length - 1 ? 0 : prev + 1
    )
  }

  const currentRec = recommendations[currentIndex]

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-bold mb-3 text-black dark:text-white">
        Recommendations
      </h2>

      {/* Carousel */}
      <div className="min-h-[160px] flex flex-col justify-between">
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-700 dark:text-gray-300 mb-2 italic line-clamp-4">
            "{currentRec.text}"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {currentRec.author.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-black dark:text-white text-xs truncate">
                {currentRec.author}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {currentRec.position}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={handlePrev}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            aria-label="Previous recommendation"
          >
            <FaChevronLeft className="text-gray-600 dark:text-gray-400 text-xs" />
          </button>

          <div className="flex gap-1">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to recommendation ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            aria-label="Next recommendation"
          >
            <FaChevronRight className="text-gray-600 dark:text-gray-400 text-xs" />
          </button>
        </div>
      </div>

      {/* Memberships */}
      {memberships && memberships.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-bold mb-2 text-black dark:text-white">
            A member of
          </h3>
          <div className="space-y-1.5">
            {memberships.map((org, index) => (
              <a
                key={index}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 dark:text-blue-400 hover:underline text-xs"
              >
                {org.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
