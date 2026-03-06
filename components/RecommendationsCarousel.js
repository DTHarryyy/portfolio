'use client'
import { useState } from 'react'
import { portfolioData } from '@/config/portfolio-data'

export default function RecommendationsCarousel() {
  const { recommendations } = portfolioData
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!recommendations || recommendations.length === 0) return null

  const goToSlide = (index) => {
    setCurrentIndex(index % recommendations.length)
  }

  const currentRec = recommendations[currentIndex]

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-bold mb-4 text-black dark:text-white">
        Recommendations
      </h2>

      <div className="min-h-32">
        {/* Recommendation Card */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 italic leading-relaxed">
            "{currentRec.text}"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {currentRec.author.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-black dark:text-white text-xs">
                {currentRec.author}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {currentRec.position}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      {recommendations.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-blue-600 w-6'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to recommendation ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
