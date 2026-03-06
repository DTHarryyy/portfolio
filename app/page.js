import Hero from '@/components/Hero'
import MainContent from '@/components/MainContent'
import Footer from '@/components/Footer'
import DarkModeToggle from '@/components/DarkModeToggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <DarkModeToggle />
      <Hero />
      <MainContent />
      <Footer />
    </main>
  )
}
