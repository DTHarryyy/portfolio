'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { portfolioData } from '@/config/portfolio-data'
import { FaComments, FaPaperPlane, FaRobot, FaTimes, FaUser } from 'react-icons/fa'

const DEFAULT_QUICK_PROMPTS = [
  'Tell me about Harry',
  'What is his tech stack?',
  'Show me recent projects',
  'How can I contact him?'
]

const normalizeImagePath = (imagePath) => {
  if (!imagePath) return '/profile-light.png'
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`
}

export default function ChatbotWidget() {
  const { personal } = portfolioData
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I am ${personal.name}'s portfolio assistant. Ask me about ${personal.title}, projects, experience, certifications, or contact details.`
    }
  ])

  const messageEndRef = useRef(null)
  const profileImage = useMemo(
    () => normalizeImagePath(personal.images?.profile || personal.images?.lightMode),
    [personal.images]
  )
  const quickPrompts = useMemo(() => {
    const promptsFromData = portfolioData?.chatbotKnowledge?.quickPrompts
    if (Array.isArray(promptsFromData) && promptsFromData.length > 0) {
      return promptsFromData.slice(0, 6)
    }

    return DEFAULT_QUICK_PROMPTS
  }, [])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const sendMessage = async (rawMessage) => {
    const message = rawMessage.trim()
    if (!message || isSending) return

    const userMessage = { role: 'user', content: message }
    const chatHistory = messages.slice(-8)

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          history: chatHistory
        })
      })

      if (!response.ok) {
        throw new Error('Chat request failed')
      }

      const data = await response.json()
      const reply =
        typeof data.reply === 'string' && data.reply.trim().length > 0
          ? data.reply.trim()
          : 'I could not find a clear answer yet. Try asking about projects, experience, skills, or contact info.'

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I cannot reach the AI service right now. You can still ask about contact info, projects, and skills while fallback mode is active.'
        }
      ])
    } finally {
      setIsSending(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {isOpen && (
        <aside className="fixed inset-0 z-[70] w-screen h-dvh rounded-none border-0 bg-white dark:bg-gradient-to-br dark:from-blue-900 dark:to-indigo-900 shadow-2xl overflow-hidden flex flex-col animate-fade-in sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[min(92vw,24rem)] sm:h-[min(78vh,34rem)] sm:rounded-2xl sm:border sm:border-blue-200 sm:dark:border-blue-900">
          <header className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] text-white sm:pt-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/40 bg-white/20 flex-shrink-0">
                  <Image
                    src={profileImage}
                    alt={`${personal.name} profile`}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{personal.name}</p>
                  <p className="text-[11px] text-blue-100 truncate">{personal.title}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/20 transition-colors"
                aria-label="Close chat"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-3 bg-white dark:bg-gradient-to-b dark:from-blue-900/50 dark:to-indigo-950 space-y-3">
            {messages.map((message, index) => {
              const isUser = message.role === 'user'

              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3 py-2 text-xs sm:text-sm leading-relaxed border ${
                      isUser
                        ? 'bg-blue-600 text-white border-blue-600 rounded-br-md'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700 rounded-bl-md'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 opacity-75 text-[10px] uppercase tracking-wide">
                      {isUser ? <FaUser /> : <FaRobot />}
                      <span>{isUser ? 'You' : 'Harry AI'}</span>
                    </div>
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              )
            })}

            {isSending && (
              <div className="flex justify-start">
                <div className="max-w-[88%] rounded-2xl rounded-bl-md px-3 py-2 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
                  <p>Thinking...</p>
                </div>
              </div>
            )}

            <div ref={messageEndRef} />
          </div>

          <div className="border-t border-gray-200 dark:border-indigo-800 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] bg-white dark:bg-gradient-to-t dark:from-indigo-950 dark:to-blue-900 sm:pb-3">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isSending}
                  className="text-[11px] px-2 py-1 rounded-full border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-60 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Harry's profile..."
                className="flex-1 h-10 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isSending}
                className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </div>
        </aside>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-4 sm:right-6 z-[65] inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        aria-label={isOpen ? 'Hide chat assistant' : 'Open chat assistant'}
      >
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-white/20">
          {isOpen ? <FaTimes className="text-sm" /> : <FaComments className="text-sm" />}
        </span>
        <span className="text-sm font-semibold">
          {isOpen ? 'Hide Chat' : 'Chat with Harry AI'}
        </span>
      </button>
    </>
  )
}
