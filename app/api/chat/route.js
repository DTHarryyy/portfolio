import { portfolioData } from '@/config/portfolio-data'

const GEMINI_API_BASE =
  process.env.GEMINI_API_BASE || 'https://generativelanguage.googleapis.com/v1beta'
const DEFAULT_GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-flash-latest'
]
const GEMINI_MODEL = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODELS[0]
const NOT_AVAILABLE = 'That information is not available in portfolio data yet.'

const safeJoin = (items) =>
  Array.isArray(items) && items.length > 0 ? items.join(', ') : NOT_AVAILABLE

const listOrFallback = (items, formatter) => {
  if (!Array.isArray(items) || items.length === 0) {
    return NOT_AVAILABLE
  }

  return items.map((item, index) => `${index + 1}. ${formatter(item)}`).join('\n')
}

const safeValue = (value) =>
  typeof value === 'string' && value.trim().length > 0 ? value.trim() : null

const buildPortfolioContext = (data) => {
  const {
    personal,
    social,
    experience,
    techStack,
    projects,
    certifications,
    recommendations,
    chatbotKnowledge
  } = data

  const faqEntries = Array.isArray(chatbotKnowledge?.faq)
    ? chatbotKnowledge.faq
        .filter(
          (item) =>
            item &&
            typeof item.question === 'string' &&
            item.question.trim().length > 0 &&
            typeof item.answer === 'string' &&
            item.answer.trim().length > 0
        )
        .map((item, index) => `${index + 1}. Q: ${item.question}\n   A: ${item.answer}`)
        .join('\n')
    : NOT_AVAILABLE

  return [
    `Name: ${personal?.name || NOT_AVAILABLE}`,
    `Title: ${personal?.title || NOT_AVAILABLE}`,
    `Location: ${personal?.location || NOT_AVAILABLE}`,
    `Bio: ${personal?.bio || NOT_AVAILABLE}`,
    `Email: ${personal?.email || NOT_AVAILABLE}`,
    `Phone: ${personal?.phone || NOT_AVAILABLE}`,
    `Calendly: ${personal?.calendlyLink || NOT_AVAILABLE}`,
    `Blog: ${personal?.blogLink || NOT_AVAILABLE}`,
    '',
    'Social Links:',
    `- GitHub: ${social?.github || NOT_AVAILABLE}`,
    `- LinkedIn: ${social?.linkedin || NOT_AVAILABLE}`,
    `- Facebook: ${social?.facebook || NOT_AVAILABLE}`,
    `- Instagram: ${social?.instagram || NOT_AVAILABLE}`,
    `- Twitter: ${social?.twitter || NOT_AVAILABLE}`,
    '',
    'Experience:',
    listOrFallback(
      experience,
      (item) => `${item.year} - ${item.title} at ${item.company}`
    ),
    '',
    'Tech Stack:',
    `- Frontend: ${safeJoin(techStack?.frontend)}`,
    `- Backend: ${safeJoin(techStack?.backend)}`,
    `- DevOps: ${safeJoin(techStack?.devops)}`,
    '',
    'Projects:',
    listOrFallback(
      projects,
      (item) => `${item.title}: ${item.description} (${item.url})`
    ),
    '',
    'Certifications:',
    listOrFallback(certifications, (item) => `${item.title} by ${item.issuer}`),
    '',
    'Recommendations:',
    listOrFallback(
      recommendations,
      (item) => `"${item.text}" - ${item.author}, ${item.position}`
    ),
    '',
    'Chat Contact Details:',
    `- Preferred Method: ${safeValue(chatbotKnowledge?.contactInfo?.preferredMethod) || NOT_AVAILABLE}`,
    `- Response Time: ${safeValue(chatbotKnowledge?.contactInfo?.responseTime) || NOT_AVAILABLE}`,
    `- Timezone: ${safeValue(chatbotKnowledge?.contactInfo?.timezone) || NOT_AVAILABLE}`,
    `- Availability: ${safeValue(chatbotKnowledge?.contactInfo?.availability) || NOT_AVAILABLE}`,
    `- Call Booking Note: ${safeValue(chatbotKnowledge?.contactInfo?.callBookingNote) || NOT_AVAILABLE}`,
    `- Inquiry Note: ${safeValue(chatbotKnowledge?.contactInfo?.projectInquiryNote) || NOT_AVAILABLE}`,
    '',
    'Chat Services:',
    listOrFallback(chatbotKnowledge?.services, (item) => item),
    '',
    'Chat Focus Areas:',
    listOrFallback(chatbotKnowledge?.focusAreas, (item) => item),
    '',
    'Chat FAQ:',
    faqEntries
  ].join('\n')
}

const normalizeHistory = (history) => {
  if (!Array.isArray(history)) return []

  return history
    .filter(
      (item) =>
        item &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim().length > 0
    )
    .slice(-8)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 1200)
    }))
}

const toSearchText = (value) =>
  typeof value === 'string' ? value.toLowerCase().trim() : ''

const toKeywords = (value) =>
  toSearchText(value)
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2)

const FAQ_STOP_WORDS = new Set([
  'what',
  'which',
  'when',
  'where',
  'who',
  'why',
  'how',
  'does',
  'is',
  'are',
  'can',
  'the',
  'this',
  'that',
  'with',
  'for',
  'from',
  'about',
  'his',
  'her',
  'your',
  'harry'
])

const toIntentKeywords = (value) =>
  toKeywords(value).filter((token) => !FAQ_STOP_WORDS.has(token))

const findFaqReply = (query, faqList) => {
  if (!Array.isArray(faqList) || faqList.length === 0) return null

  const queryText = toSearchText(query)
  const queryTokens = toIntentKeywords(query)

  for (const item of faqList) {
    const question = safeValue(item?.question)
    const answer = safeValue(item?.answer)

    if (!question || !answer) continue

    const normalizedQuestion = toSearchText(question)

    if (queryText === normalizedQuestion) {
      return answer
    }

    const questionTokens = toIntentKeywords(question)

    if (questionTokens.length === 0 || queryTokens.length === 0) {
      continue
    }

    const overlapCount = questionTokens.filter((token) =>
      queryTokens.includes(token)
    ).length
    const matchRatio = overlapCount / questionTokens.length

    // Require a strong token-level match to avoid false positives (e.g. services -> email).
    if (overlapCount >= 2 && matchRatio >= 0.75) {
      return answer
    }
  }

  return null
}

const pickProjectsForQuery = (query, projects) => {
  if (!Array.isArray(projects) || projects.length === 0) return []

  const matches = projects.filter((project) => {
    const title = toSearchText(project?.title)
    return title && query.includes(title)
  })

  return matches.length > 0 ? matches : projects.slice(0, 4)
}

const pickExperienceForQuery = (query, experience) => {
  if (!Array.isArray(experience) || experience.length === 0) return []

  const matches = experience.filter((item) => {
    const title = toSearchText(item?.title)
    const company = toSearchText(item?.company)
    return (title && query.includes(title)) || (company && query.includes(company))
  })

  return matches.length > 0 ? matches : experience
}

const buildDeterministicReply = (message, data) => {
  const query = toSearchText(message)
  const {
    personal,
    social,
    techStack,
    projects,
    experience,
    certifications,
    chatbotKnowledge
  } = data

  if (/\b(hello|hi|hey|yo|good morning|good afternoon|good evening)\b/.test(query)) {
    return {
      matched: true,
      reply: `Hi! I can help you with ${personal?.name || 'this portfolio'} details. Ask me about experience, projects, tech stack, certifications, or contact info.`
    }
  }

  if (/\b(contact|email|phone|hire|reach|calendly|call|schedule)\b/.test(query)) {
    const lines = [
      personal?.email ? `Email: ${personal.email}` : null,
      personal?.phone ? `Phone: ${personal.phone}` : null,
      personal?.calendlyLink ? `Calendly: ${personal.calendlyLink}` : null,
      safeValue(chatbotKnowledge?.contactInfo?.preferredMethod)
        ? `Preferred contact method: ${chatbotKnowledge.contactInfo.preferredMethod}`
        : null,
      safeValue(chatbotKnowledge?.contactInfo?.responseTime)
        ? `Response time: ${chatbotKnowledge.contactInfo.responseTime}`
        : null,
      safeValue(chatbotKnowledge?.contactInfo?.timezone)
        ? `Timezone: ${chatbotKnowledge.contactInfo.timezone}`
        : null,
      safeValue(chatbotKnowledge?.contactInfo?.availability)
        ? `Availability: ${chatbotKnowledge.contactInfo.availability}`
        : null,
      safeValue(chatbotKnowledge?.contactInfo?.callBookingNote)
        ? `Note: ${chatbotKnowledge.contactInfo.callBookingNote}`
        : null,
      safeValue(chatbotKnowledge?.contactInfo?.projectInquiryNote)
        ? `Tip: ${chatbotKnowledge.contactInfo.projectInquiryNote}`
        : null
    ].filter(Boolean)

    return {
      matched: true,
      reply: lines.length > 0 ? lines.join('\n') : NOT_AVAILABLE
    }
  }

  if (/\b(github|linkedin|facebook|instagram|twitter|social)\b/.test(query)) {
    const lines = [
      social?.github ? `GitHub: ${social.github}` : null,
      social?.linkedin ? `LinkedIn: ${social.linkedin}` : null,
      social?.facebook ? `Facebook: ${social.facebook}` : null,
      social?.instagram ? `Instagram: ${social.instagram}` : null,
      social?.twitter ? `Twitter: ${social.twitter}` : null
    ].filter(Boolean)

    return {
      matched: true,
      reply: lines.length > 0 ? lines.join('\n') : NOT_AVAILABLE
    }
  }

  if (/\b(tech|stack|skill|skills|frontend|backend|devops)\b/.test(query)) {
    return {
      matched: true,
      reply: [
        `Frontend: ${safeJoin(techStack?.frontend)}`,
        `Backend: ${safeJoin(techStack?.backend)}`,
        `DevOps: ${safeJoin(techStack?.devops)}`,
        Array.isArray(chatbotKnowledge?.focusAreas) && chatbotKnowledge.focusAreas.length > 0
          ? `Focus Areas: ${chatbotKnowledge.focusAreas.join(', ')}`
          : null
      ].join('\n')
    }
  }

  if (/\b(service|services|offer|offers|can do|build for|freelance|contract)\b/.test(query)) {
    const serviceLines = [
      listOrFallback(chatbotKnowledge?.services, (item) => item),
      Array.isArray(chatbotKnowledge?.focusAreas) && chatbotKnowledge.focusAreas.length > 0
        ? `\nCurrent focus:\n${chatbotKnowledge.focusAreas.map((item, index) => `${index + 1}. ${item}`).join('\n')}`
        : null
    ].filter(Boolean)

    return {
      matched: true,
      reply:
        serviceLines.length > 0
          ? `Services and collaboration:\n${serviceLines.join('\n\n')}`
          : NOT_AVAILABLE
    }
  }

  if (/\b(project|projects|portfolio work|recent work|built)\b/.test(query)) {
    const selectedProjects = pickProjectsForQuery(query, projects)

    if (selectedProjects.length === 0) {
      return {
        matched: true,
        reply: NOT_AVAILABLE
      }
    }

    const projectLines = selectedProjects
      .map(
        (project, index) =>
          `${index + 1}. ${project.title} - ${project.description}${
            project.url ? ` (${project.url})` : ''
          }`
      )
      .join('\n')

    return {
      matched: true,
      reply: `Projects:\n${projectLines}`
    }
  }

  if (/\b(experience|work|career|timeline|job|jobs)\b/.test(query)) {
    const selectedExperience = pickExperienceForQuery(query, experience)

    if (selectedExperience.length === 0) {
      return {
        matched: true,
        reply: NOT_AVAILABLE
      }
    }

    const experienceLines = selectedExperience
      .map((item, index) => `${index + 1}. ${item.year} - ${item.title} at ${item.company}`)
      .join('\n')

    return {
      matched: true,
      reply: `Experience timeline:\n${experienceLines}`
    }
  }

  if (/\b(certification|certifications|certificate|credentials|credential)\b/.test(query)) {
    if (!Array.isArray(certifications) || certifications.length === 0) {
      return {
        matched: true,
        reply: NOT_AVAILABLE
      }
    }

    const certificationLines = certifications
      .map((item, index) => `${index + 1}. ${item.title} (${item.issuer})`)
      .join('\n')

    return {
      matched: true,
      reply: `Certifications:\n${certificationLines}`
    }
  }

  if (/\b(title|role|position)\b/.test(query)) {
    return {
      matched: true,
      reply: personal?.title
        ? `${personal.name}'s title is: ${personal.title}.`
        : NOT_AVAILABLE
    }
  }

  if (/\b(name|who is|who are|about)\b/.test(query)) {
    const aboutLine = [
      personal?.name ? personal.name : null,
      personal?.title ? personal.title : null,
      personal?.location ? `based in ${personal.location}` : null
    ]
      .filter(Boolean)
      .join(' - ')

    if (!aboutLine) {
      return {
        matched: true,
        reply: NOT_AVAILABLE
      }
    }

    const bio = personal?.bio ? `\n\n${personal.bio}` : ''

    return {
      matched: true,
      reply: `${aboutLine}${bio}`
    }
  }

  const faqReply = findFaqReply(query, chatbotKnowledge?.faq)
  if (faqReply) {
    return {
      matched: true,
      reply: faqReply
    }
  }

  return {
    matched: false,
    reply: `I can answer questions about ${personal?.name || 'this portfolio'} background, tech stack, projects, certifications, and contact details. Try asking "What is the tech stack?" or "How can I contact you?"`
  }
}

const SYSTEM_PROMPT = `You are a portfolio assistant for Harry De Torres.

Rules:
- Answer only with information from the provided portfolio context.
- If a detail is missing, respond exactly with: "That information is not available in portfolio data yet."
- Do not guess or invent dates, employers, numbers, links, or achievements.
- Keep answers concise and practical.
`

const PORTFOLIO_CONTEXT = buildPortfolioContext(portfolioData)

const getGeminiApiKey = () =>
  process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY

const toGeminiRole = (role) => (role === 'assistant' ? 'model' : 'user')

const getModelCandidates = () => {
  const candidates = [process.env.GEMINI_MODEL, ...DEFAULT_GEMINI_MODELS].filter(
    (model) => typeof model === 'string' && model.trim().length > 0
  )

  return [...new Set(candidates)]
}

const getGeminiReply = async (message, history) => {
  const apiKey = getGeminiApiKey()

  if (!apiKey) {
    return null
  }

  let lastError = null

  for (const model of getModelCandidates()) {
    const response = await fetch(
      `${GEMINI_API_BASE}/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `${SYSTEM_PROMPT}\nPortfolio context:\n${PORTFOLIO_CONTEXT}`
              }
            ]
          },
          contents: [
            ...history.map((item) => ({
              role: toGeminiRole(item.role),
              parts: [{ text: item.content }]
            })),
            {
              role: 'user',
              parts: [{ text: message }]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 320
          }
        }),
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      const failure = await response.text()
      const error = new Error(`Gemini request failed: ${response.status} ${failure}`)
      lastError = error

      // Try the next candidate model if this one is not found.
      if (response.status === 404) {
        continue
      }

      throw error
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part) => (typeof part?.text === 'string' ? part.text : ''))
      .join('\n')
      .trim()

    if (!text) {
      lastError = new Error('Gemini response did not include text content.')
      continue
    }

    return {
      reply: text,
      model
    }
  }

  if (lastError) {
    throw lastError
  }

  return null
}

export async function POST(request) {
  try {
    const payload = await request.json()
    const message = typeof payload?.message === 'string' ? payload.message.trim() : ''

    if (!message) {
      return Response.json({ error: 'Message is required.' }, { status: 400 })
    }

    const history = normalizeHistory(payload?.history)
    const deterministic = buildDeterministicReply(message, portfolioData)
    const hasGeminiKey = Boolean(getGeminiApiKey())

    if (hasGeminiKey) {
      try {
        const geminiResult = await getGeminiReply(message, history)

        if (geminiResult?.reply) {
          return Response.json({
            reply: geminiResult.reply,
            provider: 'gemini',
            model: geminiResult.model
          })
        }
      } catch {
        if (deterministic.matched) {
          return Response.json({
            reply: `${deterministic.reply}\n\nNote: Gemini was unavailable, so this came from local portfolio knowledge mode.`,
            provider: 'local-fallback'
          })
        }
      }
    }

    // For direct factual intents, return deterministic answers to avoid model drift.
    if (deterministic.matched) {
      return Response.json({
        reply: deterministic.reply,
        provider: 'local-deterministic'
      })
    }

    return Response.json({
      reply: deterministic.reply,
      provider: 'local'
    })
  } catch {
    return Response.json(
      {
        error: 'Failed to process chat request.'
      },
      { status: 500 }
    )
  }
}
