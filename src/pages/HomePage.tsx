import Navbar from "../components/Navbar"
import HeroBanner from "../components/HeroBanner"
import ProductShowcase from "../components/ProductShowcase"
import CustomerSupport from "../components/CustomerSupport"
import AboutUs from "../components/AboutUs"
import News from "../components/News"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-[82px]">
        <HeroBanner />
        <ProductShowcase />
        <CustomerSupport />
        <AboutUs />
        <News />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}

