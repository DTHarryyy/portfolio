'use client'

import { useState, useEffect, useRef } from 'react'
import { portfolioData } from '@/config/portfolio-data'

export default function Recommendations() {
  const { recommendations } = portfolioData
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollAmount = currentIndex * (scrollContainerRef.current.offsetWidth)
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }, [currentIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === recommendations.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [recommendations.length])

  const currentRec = recommendations[currentIndex]

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-bold mb-3 text-black dark:text-white">
        Recommendations
      </h2>

      {/* Scrollable Carousel */}
      <div className="min-h-[160px] flex flex-col justify-between">
        {/* Scrollable Container */}
        <div className="overflow-x-auto scrollbar-hide" ref={scrollContainerRef}>
          <div className="flex gap-3 pb-2">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-full bg-gray-50 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 transition-all duration-500 ease-in-out ${
                  index === currentIndex ? 'ring-2 ring-blue-600 dark:ring-blue-400' : ''
                }`}
              >
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-2 italic line-clamp-4 animate-fade-in">
                  "{rec.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {rec.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-black dark:text-white text-xs truncate">
                      {rec.author}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {rec.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex gap-1 justify-center mt-3">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlay(false)
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? 'bg-blue-600 dark:bg-blue-400 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to recommendation ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
