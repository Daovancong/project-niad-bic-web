import Navbar from "./components/Navbar"
import HeroBanner from "./components/HeroBanner"
import ProductShowcase from "./components/ProductShowcase"
import CustomerSupport from "./components/CustomerSupport"
import AboutUs from "./components/AboutUs"
import "./index.css"

function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-[82px]">
        <HeroBanner />
        <ProductShowcase />
        <CustomerSupport />
        <AboutUs />
      </div>
    </main>
  )
}

export default App

