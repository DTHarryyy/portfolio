'use client'

import { useState, useEffect } from 'react'
import { portfolioData } from '@/config/portfolio-data'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Gallery() {
  const { gallery } = portfolioData
  const [currentIndex, setCurrentIndex] = useState(0)
  const imagesPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 4
  const [viewSize, setViewSize] = useState(imagesPerView)

  // Update view size on resize
  useEffect(() => {
    const handleResize = () => {
      setViewSize(window.innerWidth < 768 ? 2 : 4)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, gallery.length - viewSize) : Math.max(0, prev - 1)
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= gallery.length - viewSize ? 0 : prev + 1
    )
  }

  const visibleImages = gallery.slice(currentIndex, currentIndex + viewSize)

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-bold mb-3 text-black dark:text-white">
        Gallery
      </h2>

      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <button
          onClick={handlePrev}
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors flex-shrink-0"
          aria-label="Previous images"
        >
          <FaChevronLeft className="text-gray-600 dark:text-gray-400 text-sm sm:text-base" />
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 flex-1">
          {visibleImages.map((image, index) => (
            <div
              key={currentIndex + index}
              className="relative aspect-square rounded overflow-hidden bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm">
                {currentIndex + index + 1}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors flex-shrink-0"
          aria-label="Next images"
        >
          <FaChevronRight className="text-gray-600 dark:text-gray-400 text-sm sm:text-base" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-1.5 mt-2 sm:mt-3">
        {Array.from({ length: Math.ceil(gallery.length / viewSize) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(Math.min(index * viewSize, gallery.length - viewSize))}
            className={`w-2 h-2 rounded-full transition-colors ${
              Math.floor(currentIndex / viewSize) === index
                ? 'bg-blue-600 dark:bg-blue-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to gallery page ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
