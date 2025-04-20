import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectGrid from './components/ProjectGrid'
import TeamSection from './components/TeamSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <ProjectGrid />
      <TeamSection />
      <Footer />
    </main>
  )
} 