import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NewsPage from "./pages/NewsPage"
import PromotionsPage from "./pages/PromotionsPage"
import ProductsPage from "./pages/ProductsPage"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/khuyen-mai" element={<PromotionsPage />} />
        <Route path="/san-pham" element={<ProductsPage />} />
        <Route path="/san-pham/:category" element={<ProductsPage />} />
        <Route path="/danh-muc/:category" element={<ProductsPage />} />
        <Route path="/danh-muc/:category.html" element={<ProductsPage />} />
      </Routes>
    </Router>
  )
}

export default App
