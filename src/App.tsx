import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewsPage from "./pages/NewsPage";
import PromotionsPage from "./pages/PromotionsPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import "./App.css";

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

        {/* Các route cụ thể cho từng sản phẩm */}
        <Route
          path="/bao-hiem-trach-nhiem-dan-su-chu-xe-o-to-9.html"
          element={
            <ProductDetailPage productSlug="bao-hiem-trach-nhiem-dan-su-chu-xe-o-to" />
          }
        />
        <Route
          path="/bao-hiem-vat-chat-o-to-10.html"
          element={<ProductDetailPage productSlug="bao-hiem-vat-chat-o-to" />}
        />
        <Route
          path="/bao-hiem-tnds-xe-may-11.html"
          element={<ProductDetailPage productSlug="bao-hiem-tnds-xe-may" />}
        />
        <Route
          path="/bao-hiem-suc-khoe-ca-nhan-12.html"
          element={
            <ProductDetailPage productSlug="bao-hiem-suc-khoe-ca-nhan" />
          }
        />
        <Route
          path="/bao-hiem-du-lich-quoc-te-13.html"
          element={<ProductDetailPage productSlug="bao-hiem-du-lich-quoc-te" />}
        />
        <Route
          path="/bao-hiem-tai-nan-24h-14.html"
          element={<ProductDetailPage productSlug="bao-hiem-tai-nan-24h" />}
        />

        {/* Thêm các routes mới cho đường dẫn sản phẩm mới */}
        <Route
          path="/san-pham/bao-hiem-trach-nhiem-dan-su-chu-xe-o-to"
          element={
            <ProductDetailPage productSlug="bao-hiem-trach-nhiem-dan-su-chu-xe-o-to" />
          }
        />
        <Route
          path="/san-pham/bao-hiem-vat-chat-o-to"
          element={<ProductDetailPage productSlug="bao-hiem-vat-chat-o-to" />}
        />
        <Route
          path="/san-pham/bao-hiem-tnds-xe-may"
          element={<ProductDetailPage productSlug="bao-hiem-tnds-xe-may" />}
        />
        <Route
          path="/san-pham/bao-hiem-suc-khoe-tam-an"
          element={<ProductDetailPage productSlug="bao-hiem-suc-khoe-tam-an" />}
        />
        <Route
          path="/san-pham/bao-hiem-benh-ung-thu-phuc-tam-an"
          element={
            <ProductDetailPage productSlug="bao-hiem-benh-ung-thu-phuc-tam-an" />
          }
        />
        <Route
          path="/san-pham/bao-hiem-du-lich-quoc-te"
          element={<ProductDetailPage productSlug="bao-hiem-du-lich-quoc-te" />}
        />
        <Route
          path="/san-pham/bao-hiem-du-lich-trong-nuoc"
          element={
            <ProductDetailPage productSlug="bao-hiem-du-lich-trong-nuoc" />
          }
        />
        <Route
          path="/san-pham/bao-hiem-tai-nan-khach-du-lich"
          element={
            <ProductDetailPage productSlug="bao-hiem-tai-nan-khach-du-lich" />
          }
        />
        <Route
          path="/san-pham/bao-hiem-tai-nan-24-24"
          element={<ProductDetailPage productSlug="bao-hiem-tai-nan-24-24" />}
        />
        <Route
          path="/san-pham/bao-hiem-toan-dien-nha-tu-nhan"
          element={
            <ProductDetailPage productSlug="bao-hiem-toan-dien-nha-tu-nhan" />
          }
        />
        <Route
          path="/san-pham/bao-hiem-an-ninh-mang"
          element={<ProductDetailPage productSlug="bao-hiem-an-ninh-mang" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
