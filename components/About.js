import { portfolioData } from '@/config/portfolio-data'

export default function About() {
  const { personal, achievements } = portfolioData

  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          About
        </h2>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
            {personal.bio}
          </p>
        </div>

        {/* Achievements/Badges */}
        {achievements && achievements.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {achievements.map((achievement, index) => (
              <a
                key={index}
                href={achievement.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                {achievement.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
