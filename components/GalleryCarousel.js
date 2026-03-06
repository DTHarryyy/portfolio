'use client'
import { useState } from 'react'
import Image from 'next/image'
import { portfolioData } from '@/config/portfolio-data'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function GalleryCarousel() {
  const { gallery } = portfolioData
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 5
  const maxIndex = Math.max(0, gallery.length - itemsPerView)

  const goToNext = () => {
    setCurrentIndex(Math.min(currentIndex + 1, maxIndex))
  }

  const goToPrev = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0))
  }

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-bold mb-3 text-black dark:text-white">
        Gallery
      </h2>

      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div className="flex gap-2 transition-transform duration-300" style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}>
            {gallery.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/5 aspect-square overflow-hidden rounded bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-transform cursor-pointer relative"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {gallery.length > itemsPerView && (
          <>
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-50 transition-colors"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-50 transition-colors"
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}
      </div>
    </section>
  )
}
