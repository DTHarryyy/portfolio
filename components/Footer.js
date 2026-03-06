'use client'
import { portfolioData } from '@/config/portfolio-data'
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'

export default function Footer() {
  const { personal, social } = portfolioData
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 sm:py-6 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-3">
        {/* Copyright */}
        <p className="text-gray-600 dark:text-gray-400 text-xs">
          © {currentYear} {personal.name}. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-3 text-lg">
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
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
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <FaFacebook />
            </a>
          )}
          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
            >
              <FaInstagram />
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
            >
              <FaTwitter />
            </a>
          )}
        </div>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors text-xs"
        >
          ↑ Back to Top
        </button>
      </div>
    </footer>
  )
}
