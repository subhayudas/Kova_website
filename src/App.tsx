import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StartSection from './components/StartSection'
import FeaturesChess from './components/FeaturesChess'
import FeaturesGrid from './components/FeaturesGrid'
import Testimonials from './components/Testimonials'
import CtaFooter from './components/CtaFooter'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgressBar from './components/ui/ScrollProgressBar'

export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <Hero />
      <div className="bg-black">
        <StartSection />
        <FeaturesChess />
        <FeaturesGrid />
        <Testimonials />
        <CtaFooter />
      </div>
    </div>
  )
}
