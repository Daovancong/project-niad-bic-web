import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import NewsPage from "./pages/NewsPage"
import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        {/* Thêm các route khác ở đây khi cần */}
      </Routes>
    </Router>
  )
}

export default App

