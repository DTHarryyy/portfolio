'use client'
import { useState, useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  // Initialize dark mode from localStorage or default to false
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(savedMode)
    if (savedMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDark
    setIsDark(newMode)
    localStorage.setItem('darkMode', newMode.toString())
    
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50 p-2 sm:p-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
      aria-label="Toggle dark mode"
    >
      {isDark ? <FaSun size={16} className="sm:w-5 sm:h-5" /> : <FaMoon size={16} className="sm:w-5 sm:h-5" />}
    </button>
  )
}
