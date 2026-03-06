'use client'
import { useState, useEffect } from 'react'
import { portfolioData } from '@/config/portfolio-data'
import Image from 'next/image'
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaCheckCircle, FaMapMarkerAlt, FaChevronDown, FaFacebook} from 'react-icons/fa'
import { MdEmail, MdEventAvailable } from 'react-icons/md'
import { BsBook } from 'react-icons/bs'

export default function Hero() {
  const { personal, social, achievements } = portfolioData
  const [isHovered, setIsHovered] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState(achievements?.[0] || null)

  // Detect dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    // Initial check
    checkDarkMode()
    
    // Watch for changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  // Determine which image to show based on dark mode and hover state
  const getProfileImage = () => {
    if (isDark) {
      return isHovered ? personal.images.darkModeHover : personal.images.darkMode
    } else {
      return isHovered ? personal.images.lightModeHover : personal.images.lightMode
    }
  }

  const handleAchievementSelect = (achievement) => {
    setSelectedAchievement(achievement)
    setIsDropdownOpen(false)
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-4 sm:py-6 px-2 sm:px-4 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-start">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div 
              className="w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={getProfileImage()}
                alt={personal.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            {/* Name and Badge + Award Dropdown */}
            <div className="flex items-center gap-1.5 mb-0.5 justify-between">
              <div className="flex items-center gap-1.5">
                <h1 className="text-2xl font-bold text-black dark:text-white">
                  {personal.name}
                </h1>
                <FaCheckCircle className="text-blue-500 text-base" />
              </div>
              
              {/* Award Dropdown */}
              {achievements && achievements.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    🏆 Awards
                    <FaChevronDown size={10} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-48 sm:w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                      {achievements.map((achievement, index) => (
                        <button
                          key={index}
                          onClick={() => handleAchievementSelect(achievement)}
                          className={`w-full text-left px-3 py-2 text-xs border-b border-gray-200 dark:border-gray-700 last:border-b-0 transition-colors ${
                            selectedAchievement?.title === achievement.title
                              ? 'bg-blue-50 dark:bg-blue-900 text-black dark:text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="font-medium">🏆 {achievement.title}</div>
                          {achievement.description && (
                            <div className="text-xs opacity-75 mt-0.5">{achievement.description}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Location */}
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mb-2">
              <FaMapMarkerAlt className="text-xs" />
              {personal.location}
            </p>

            {/* Title */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {personal.title}
            </p>


            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              <a
                href={personal.calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <MdEventAvailable className="text-sm" />
                Schedule a Call
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <MdEmail className="text-sm" />
                Send Email
              </a>
              {personal.blogLink && (
                <a
                  href={personal.blogLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <BsBook className="text-sm" />
                  Read my blog
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 text-base border-t border-gray-200 dark:border-gray-800 pt-3">
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <FaLinkedin />
                </a>
              )}
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <FaGithub />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <FaFacebook />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <FaInstagram />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
