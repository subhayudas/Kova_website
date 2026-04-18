import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StartSection from './components/StartSection'
import FeaturesChess from './components/FeaturesChess'
import FeaturesGrid from './components/FeaturesGrid'
import Testimonials from './components/Testimonials'
import CtaFooter from './components/CtaFooter'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgressBar from './components/ui/ScrollProgressBar'
import WhyEntrava from './pages/WhyEntrava'
import PromotersVenues from './pages/PromotersVenues'
import Features from './pages/Features'

function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <StartSection />
      <FeaturesChess />
      <FeaturesGrid />
      <Testimonials />
      <CtaFooter />
    </div>
  )
}

export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/why" element={<WhyEntrava />} />
        <Route path="/promoters-venues" element={<PromotersVenues />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </div>
  )
}
