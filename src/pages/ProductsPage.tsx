"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { ArrowRight, Check, Star, Filter, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

interface ProductCardProps {
  id: number
  image: string
  title: string
  rating: number
  features: string[]
  price: string
  discountPrice?: string
  url: string
  category: string
}

const ProductCard = ({ image, title, rating, features, price, discountPrice, url }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
      <div className="h-48 overflow-hidden relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        {discountPrice && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            Giảm giá
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
          <a href={url} className="hover:text-red-600 transition-colors">
            {title}
          </a>
        </h3>

        <div className="flex items-center mb-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
            ))}
          <span className="text-sm text-gray-500 ml-2">({rating}.0)</span>
        </div>

        <ul className="mb-4 space-y-2">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          {discountPrice ? (
            <div className="flex items-center">
              <span className="text-red-600 font-bold text-lg">{discountPrice}</span>
              <span className="text-gray-500 line-through ml-2 text-sm">{price}</span>
            </div>
          ) : (
            <div className="text-red-600 font-bold text-lg">{price}</div>
          )}
        </div>

        <div className="mt-4">
          <a
            href={url}
            className="w-full inline-flex justify-center items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Mua ngay
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

// Danh sách tất cả sản phẩm
const allProducts: ProductCardProps[] = [
  // Bảo hiểm ô tô
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm ô tô toàn diện",
    rating: 5,
    features: [
      "Bồi thường nhanh chóng trong 24h",
      "Mạng lưới gara liên kết rộng khắp",
      "Hỗ trợ cứu hộ 24/7",
      "Bảo hiểm trách nhiệm dân sự",
    ],
    price: "1.200.000đ/năm",
    discountPrice: "600.000đ/năm",
    url: "/san-pham/bao-hiem-o-to/toan-dien",
    category: "bao-hiem-o-to-9",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm ô tô vật chất xe",
    rating: 4,
    features: [
      "Bảo hiểm thiệt hại vật chất xe",
      "Bồi thường thiệt hại do thiên tai",
      "Bảo hiểm mất cắp bộ phận",
      "Sửa chữa tại gara chính hãng",
    ],
    price: "950.000đ/năm",
    url: "/san-pham/bao-hiem-o-to/vat-chat-xe",
    category: "bao-hiem-o-to-9",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm TNDS bắt buộc",
    rating: 5,
    features: [
      "Tuân thủ quy định pháp luật",
      "Chi phí hợp lý",
      "Bồi thường thiệt hại cho bên thứ ba",
      "Thủ tục đơn giản",
    ],
    price: "480.000đ/năm",
    discountPrice: "436.000đ/năm",
    url: "/san-pham/bao-hiem-o-to/tnds-bat-buoc",
    category: "bao-hiem-o-to-9",
  },

  // Bảo hiểm xe máy
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm TNDS bắt buộc xe máy",
    rating: 5,
    features: [
      "Tuân thủ quy định pháp luật",
      "Chi phí thấp, chỉ từ 60.000đ/năm",
      "Bồi thường thiệt hại cho bên thứ ba",
      "Thủ tục đơn giản, nhanh chóng",
    ],
    price: "66.000đ/năm",
    discountPrice: "60.000đ/năm",
    url: "/san-pham/bao-hiem-xe-may/tnds-bat-buoc",
    category: "bao-hiem-xe-may-10",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm tai nạn người ngồi trên xe máy",
    rating: 4,
    features: [
      "Bảo hiểm cho người lái và người ngồi sau",
      "Chi trả chi phí y tế do tai nạn",
      "Bồi thường thương tật vĩnh viễn",
      "Mức phí hợp lý",
    ],
    price: "90.000đ/năm",
    url: "/san-pham/bao-hiem-xe-may/tai-nan-nguoi-ngoi-tren-xe",
    category: "bao-hiem-xe-may-10",
  },

  // Bảo hiểm sức khỏe
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm sức khỏe và tai nạn cá nhân BIC Tâm An",
    rating: 5,
    features: [
      "Bảo hiểm tai nạn 24/24",
      "Chi trả chi phí y tế nội trú và ngoại trú",
      "Bảo lãnh viện phí tại hơn 300 bệnh viện",
      "Tư vấn y tế 24/7",
    ],
    price: "800.000đ/năm",
    discountPrice: "680.000đ/năm",
    url: "/san-pham/bao-hiem-suc-khoe/bic-tam-an",
    category: "bao-hiem-suc-khoe-11",
  },
  {
    id: 7,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm bệnh ung thư BIC Phúc Tâm An",
    rating: 5,
    features: [
      "Chi trả khi phát hiện ung thư giai đoạn đầu",
      "Chi trả khi phát hiện ung thư giai đoạn sau",
      "Hỗ trợ chi phí điều trị",
      "Tư vấn y tế chuyên sâu",
    ],
    price: "500.000đ/năm",
    url: "/san-pham/bao-hiem-suc-khoe/bic-phuc-tam-an",
    category: "bao-hiem-suc-khoe-11",
  },

  // Bảo hiểm du lịch
  {
    id: 8,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm du lịch trong nước",
    rating: 4,
    features: [
      "Bảo hiểm tai nạn cá nhân",
      "Chi trả chi phí y tế",
      "Hỗ trợ vận chuyển y tế khẩn cấp",
      "Hỗ trợ mất hành lý",
    ],
    price: "30.000đ/chuyến",
    discountPrice: "22.000đ/chuyến",
    url: "/san-pham/bao-hiem-du-lich/trong-nuoc",
    category: "bao-hiem-du-lich-13",
  },
  {
    id: 9,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm du lịch quốc tế",
    rating: 5,
    features: [
      "Bảo hiểm y tế và tai nạn toàn cầu",
      "Hỗ trợ hủy chuyến & mất hành lý",
      "Hỗ trợ khẩn cấp 24/7",
      "Bảo hiểm trách nhiệm cá nhân",
    ],
    price: "300.000đ/chuyến",
    discountPrice: "220.000đ/chuyến",
    url: "/san-pham/bao-hiem-du-lich/quoc-te",
    category: "bao-hiem-du-lich-13",
  },

  // Bảo hiểm tai nạn
  {
    id: 10,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm tai nạn 24/24",
    rating: 4,
    features: [
      "Bảo hiểm tai nạn mọi lúc, mọi nơi",
      "Chi trả chi phí y tế do tai nạn",
      "Trợ cấp thu nhập trong thời gian điều trị",
      "Bồi thường thương tật",
    ],
    price: "200.000đ/năm",
    url: "/san-pham/bao-hiem-tai-nan/24-24",
    category: "bao-hiem-tai-nan-12",
  },

  // Bảo hiểm an ninh mạng
  {
    id: 11,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm an ninh mạng cá nhân",
    rating: 4,
    features: [
      "Bảo vệ trước các cuộc tấn công mạng",
      "Bồi thường thiệt hại tài chính do lừa đảo trực tuyến",
      "Hỗ trợ khôi phục dữ liệu",
      "Tư vấn an ninh mạng 24/7",
    ],
    price: "350.000đ/năm",
    discountPrice: "299.000đ/năm",
    url: "/san-pham/bao-hiem-an-ninh-mang/ca-nhan",
    category: "bao-hiem-an-ninh-mang-15",
  },
  {
    id: 12,
    image: "/placeholder.svg?height=300&width=500",
    title: "Bảo hiểm an ninh mạng doanh nghiệp",
    rating: 5,
    features: [
      "Bảo vệ hệ thống CNTT doanh nghiệp",
      "Bồi thường thiệt hại do rò rỉ dữ liệu",
      "Hỗ trợ pháp lý khi xảy ra sự cố",
      "Đánh giá rủi ro an ninh mạng",
    ],
    price: "5.000.000đ/năm",
    url: "/san-pham/bao-hiem-an-ninh-mang/doanh-nghiep",
    category: "bao-hiem-an-ninh-mang-15",
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)
  const [pageTitle, setPageTitle] = useState("Sản phẩm")
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>(allProducts)
  const [bannerImage, setBannerImage] = useState("/placeholder.svg?height=300&width=1920")
  const [bannerTitle, setBannerTitle] = useState("Sản phẩm bảo hiểm")
  const [bannerDescription, setBannerDescription] = useState("Các sản phẩm bảo hiểm ưu việt từ BIC")

  const params = useParams<{ category?: string }>()

  useEffect(() => {
    // Xử lý tham số URL
    if (params.category) {
      // Loại bỏ phần .html nếu có
      const categorySlug = params.category.replace(".html", "")

      // Lọc sản phẩm theo danh mục
      const products = allProducts.filter((product) => product.category === categorySlug)
      setFilteredProducts(products)

      // Cập nhật tiêu đề và banner dựa trên danh mục
      if (categorySlug.includes("bao-hiem-o-to")) {
        setPageTitle("Bảo hiểm ô tô")
        setBannerTitle("Bảo hiểm ô tô")
        setBannerDescription("Bảo vệ toàn diện cho xe của bạn với các gói bảo hiểm ưu việt từ BIC")
      } else if (categorySlug.includes("bao-hiem-xe-may")) {
        setPageTitle("Bảo hiểm xe máy")
        setBannerTitle("Bảo hiểm xe máy")
        setBannerDescription("An tâm khi tham gia giao thông với bảo hiểm xe máy từ BIC")
      } else if (categorySlug.includes("bao-hiem-suc-khoe")) {
        setPageTitle("Bảo hiểm sức khỏe")
        setBannerTitle("Bảo hiểm sức khỏe")
        setBannerDescription("Chăm sóc sức khỏe toàn diện cho bạn và gia đình")
      } else if (categorySlug.includes("bao-hiem-du-lich")) {
        setPageTitle("Bảo hiểm du lịch")
        setBannerTitle("Bảo hiểm du lịch")
        setBannerDescription("An tâm tận hưởng chuyến đi với bảo hiểm du lịch từ BIC")
      } else if (categorySlug.includes("bao-hiem-tai-nan")) {
        setPageTitle("Bảo hiểm tai nạn")
        setBannerTitle("Bảo hiểm tai nạn")
        setBannerDescription("Bảo vệ bạn trước những rủi ro không lường trước")
      } else if (categorySlug.includes("bao-hiem-an-ninh-mang")) {
        setPageTitle("Bảo hiểm an ninh mạng")
        setBannerTitle("Bảo hiểm an ninh mạng")
        setBannerDescription("Bảo vệ bạn trước các rủi ro trong thời đại số")
      }
    } else {
      // Nếu không có tham số, hiển thị tất cả sản phẩm
      setFilteredProducts(allProducts)
      setPageTitle("Sản phẩm")
      setBannerTitle("Sản phẩm bảo hiểm")
      setBannerDescription("Các sản phẩm bảo hiểm ưu việt từ BIC")
    }
  }, [params.category])

  // Danh mục sản phẩm
  const categories = [
    { id: "all", name: "Tất cả sản phẩm" },
    { id: "bao-hiem-o-to-9", name: "Bảo hiểm ô tô" },
    { id: "bao-hiem-xe-may-10", name: "Bảo hiểm xe máy" },
    { id: "bao-hiem-suc-khoe-11", name: "Bảo hiểm sức khỏe" },
    { id: "bao-hiem-tai-nan-12", name: "Bảo hiểm tai nạn" },
    { id: "bao-hiem-du-lich-13", name: "Bảo hiểm du lịch" },
    { id: "bao-hiem-an-ninh-mang-15", name: "Bảo hiểm an ninh mạng" },
  ]

  // Khoảng giá
  const priceRanges = [
    { id: "all", name: "Tất cả mức giá" },
    { id: "under-100", name: "Dưới 100.000đ" },
    { id: "100-500", name: "100.000đ - 500.000đ" },
    { id: "above-500", name: "Trên 500.000đ" },
  ]

  // Sắp xếp sản phẩm
  const sortOptions = [
    { id: "popular", name: "Phổ biến nhất" },
    { id: "newest", name: "Mới nhất" },
    { id: "price-asc", name: "Giá tăng dần" },
    { id: "price-desc", name: "Giá giảm dần" },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-[81px]">
        {/* Hero Banner */}
        <div
          className="w-full h-[300px] bg-cover bg-center relative"
          style={{ backgroundImage: `url('${bannerImage}')` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{bannerTitle}</h1>
              <p className="text-xl text-white max-w-2xl mx-auto">{bannerDescription}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-red-600">
              Trang chủ
            </a>{" "}
            /{" "}
            <a href="/san-pham" className="hover:text-red-600">
              Sản phẩm
            </a>{" "}
            {pageTitle !== "Sản phẩm" && (
              <span>
                / <span className="text-gray-700">{pageTitle}</span>
              </span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Danh mục sản phẩm</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full text-left py-2 px-3 rounded ${
                          selectedCategory === category.id ? "bg-red-600 text-white" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedCategory(category.id === "all" ? null : category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Khoảng giá</h3>
                <ul className="space-y-2">
                  {priceRanges.map((range) => (
                    <li key={range.id}>
                      <button
                        className={`w-full text-left py-2 px-3 rounded ${
                          selectedPrice === range.id ? "bg-red-600 text-white" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedPrice(range.id === "all" ? null : range.id)}
                      >
                        {range.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filters */}
              <div className="lg:hidden mb-6">
                <button
                  className="w-full bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <div className="flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-gray-700" />
                    <span className="font-medium text-gray-800">Lọc sản phẩm</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-700 transition-transform ${showFilters ? "rotate-180" : ""}`}
                  />
                </button>

                {showFilters && (
                  <div className="bg-white rounded-lg shadow-md p-4 mt-2">
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-800 mb-2">Danh mục sản phẩm</h3>
                      <ul className="space-y-2">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <button
                              className={`w-full text-left py-2 px-3 rounded ${
                                selectedCategory === category.id
                                  ? "bg-red-600 text-white"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                              onClick={() => setSelectedCategory(category.id === "all" ? null : category.id)}
                            >
                              {category.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">Khoảng giá</h3>
                      <ul className="space-y-2">
                        {priceRanges.map((range) => (
                          <li key={range.id}>
                            <button
                              className={`w-full text-left py-2 px-3 rounded ${
                                selectedPrice === range.id ? "bg-red-600 text-white" : "text-gray-700 hover:bg-gray-100"
                              }`}
                              onClick={() => setSelectedPrice(range.id === "all" ? null : range.id)}
                            >
                              {range.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Sort and Results */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <p className="text-gray-700 mb-2 sm:mb-0">
                    Hiển thị <span className="font-medium">{filteredProducts.length}</span> sản phẩm
                  </p>
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-2">Sắp xếp theo:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-600"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    rating={product.rating}
                    features={product.features}
                    price={product.price}
                    discountPrice={product.discountPrice}
                    url={product.url}
                    category={product.category}
                  />
                ))}
              </div>

              {/* Hiển thị thông báo khi không có sản phẩm */}
              {filteredProducts.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy sản phẩm</h3>
                  <p className="text-gray-600">
                    Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn. Vui lòng thử lại với bộ lọc khác.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                      &laquo;
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded bg-red-600 text-white">1</button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                      &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
