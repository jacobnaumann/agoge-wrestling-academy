import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AccoladesBanner from './components/AccoladesBanner'
import About from './components/About'
import Programs from './components/Programs'
import Schedule from './components/Schedule'
import Competitions from './components/Competitions'
import Staff from './components/Staff'
import PersonalTraining from './components/PersonalTraining'
import Camps from './components/Camps'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AccoladesBanner />
        <About />
        <Programs />
        <Schedule />
        <Competitions />
        <Staff />
        <PersonalTraining />
        <Camps />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
