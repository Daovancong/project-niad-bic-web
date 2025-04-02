"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"

// Dữ liệu tin tức mẫu
const newsData = [
  {
    id: "news1",
    image: "/placeholder.svg?height=400&width=800",
    thumbnail: "/placeholder.svg?height=100&width=150",
    title: "THÔNG BÁO ĐIỀU CHỈNH THỜI GIAN THỰC HIỆN BẢO LÃNH VIỆN PHÍ",
    date: "October 05, 2023",
    category: "Tin tức BIC",
    excerpt:
      "Thông báo về việc điều chỉnh thời gian thực hiện bảo lãnh viện phí đối với các hợp đồng bảo hiểm sức khỏe...",
    link: "/tin-tuc/thong-bao-dieu-chinh-thoi-gian-bao-lanh-vien-phi",
    featured: true,
  },
  {
    id: "news2",
    image: "/placeholder.svg?height=400&width=800",
    thumbnail: "/placeholder.svg?height=100&width=150",
    title: "BIC RA MẮT BẢO HIỂM SỨC KHỎE BIC SMART CARE DÀNH CHO KHÁCH HÀNG CAO CẤP CỦA BIDV",
    date: "July 19, 2023",
    category: "Tin tức BIC",
    excerpt:
      "Tổng Công ty Bảo hiểm BIDV (BIC) chính thức ra mắt sản phẩm bảo hiểm sức khỏe BIC Smart Care dành riêng cho khách hàng cao cấp của BIDV...",
    link: "/tin-tuc/bic-ra-mat-bao-hiem-suc-khoe-smart-care",
    featured: false,
  },
  {
    id: "news3",
    image: "/placeholder.svg?height=400&width=800",
    thumbnail: "/placeholder.svg?height=100&width=150",
    title: "THÔNG BÁO LỊCH NGHỈ TẾT NGUYÊN ĐÁN QUÝ MÃO 2023",
    date: "January 18, 2023",
    category: "Tin tức BIC",
    excerpt: "Tổng Công ty Bảo hiểm BIDV (BIC) trân trọng thông báo lịch nghỉ Tết Nguyên đán Quý Mão 2023 như sau...",
    link: "/tin-tuc/thong-bao-lich-nghi-tet-nguyen-dan-2023",
    featured: false,
  },
  {
    id: "news4",
    image: "/placeholder.svg?height=400&width=800",
    thumbnail: "/placeholder.svg?height=100&width=150",
    title: "BIC TẶNG QUÀ HẤP DẪN MỪNG NGÀY PHỤ NỮ VIỆT NAM",
    date: "October 11, 2023",
    category: "Khuyến mại",
    excerpt:
      "Chào mừng ngày Phụ nữ Việt Nam 20/10, từ ngày 11/10/2023 đến ngày 31/10/2023, Tổng Công ty Bảo hiểm BIDV (BIC) gửi tặng khách hàng nữ...",
    link: "/tin-tuc/bic-tang-qua-phu-nu-viet-nam",
    featured: false,
  },
  {
    id: "news5",
    image: "/placeholder.svg?height=400&width=800",
    thumbnail: "/placeholder.svg?height=100&width=150",
    title: "SIÊU HỘI NGÀY ĐÔI 9.9: BIC ƯU ĐÃI TỚI 40% PHÍ BẢO HIỂM",
    date: "September 09, 2023",
    category: "Khuyến mại",
    excerpt:
      "Ngày 09/09/2023, Tổng Công ty Bảo hiểm BIDV (BIC) gửi tặng khách hàng chương trình khuyến mại 'Ngày vàng siêu ưu đãi'...",
    link: "/tin-tuc/sieu-hoi-ngay-doi",
    featured: false,
  },
  {
    id: "news6",
    image: "/placeholder.svg?height=400&width=800",
    thumbnail: "/placeholder.svg?height=100&width=150",
    title: "CÂU CHUYỆN VỀ NGƯỜI PHỤ NỮ ĐƯỢC BẢO HIỂM BIC HỖ TRỢ ĐIỀU TRỊ UNG THƯ",
    date: "August 15, 2023",
    category: "Câu chuyện bảo hiểm",
    excerpt:
      "Câu chuyện cảm động về hành trình chiến đấu với bệnh ung thư của chị Nguyễn Thị H. và sự đồng hành của BIC...",
    link: "/tin-tuc/cau-chuyen-ve-nguoi-phu-nu-duoc-bao-hiem",
    featured: false,
  },
]

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Lọc tin tức theo từ khóa tìm kiếm
  const filteredNews = newsData.filter(
    (news) => searchTerm === "" || news.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Tìm tin tức nổi bật
  const featuredNews = newsData.find((news) => news.featured)

  // Lấy 3 tin tức mới nhất (dựa trên ngày tháng)
  const latestNews = [...newsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-[82px]">
        {/* Tiêu đề trang */}
        <div className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-red-600 text-center">Tin tức</h1>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cột trái - Tin tức chính */}
            <div className="w-full lg:w-2/3">
              {/* Tin nổi bật */}
              {featuredNews && (
                <div className="mb-8">
                  <Link to={featuredNews.link} className="block">
                    <div className="bg-white rounded-md overflow-hidden shadow-md">
                      <img
                        src={featuredNews.image || "/placeholder.svg"}
                        alt={featuredNews.title}
                        className="w-full h-[400px] object-cover"
                      />
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-gray-500 text-sm">{featuredNews.date}</div>
                          <div className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                            {featuredNews.category}
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">{featuredNews.title}</h2>
                        <p className="text-gray-600">{featuredNews.excerpt}</p>
                        <div className="mt-4">
                          <span className="text-red-600 font-medium">Xem thêm</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Danh sách tin tức */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews
                  .filter((news) => !news.featured)
                  .map((news) => (
                    <Link to={news.link} key={news.id} className="block">
                      <div className="bg-white rounded-md overflow-hidden shadow-md h-full">
                        <img
                          src={news.image || "/placeholder.svg"}
                          alt={news.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-gray-500 text-sm">{news.date}</div>
                            <div className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                              {news.category}
                            </div>
                          </div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">{news.title}</h3>
                          <p className="text-gray-600 text-sm">{news.excerpt}</p>
                          <div className="mt-3">
                            <span className="text-red-600 text-sm font-medium">Xem thêm</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Cột phải - Sidebar */}
            <div className="w-full lg:w-1/3">
              {/* Ô tìm kiếm */}
              <div className="bg-white rounded-md shadow-md p-4 mb-8">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="bg-red-600 text-white px-4 py-2 rounded-r-md">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tin mới nhất */}
              <div className="bg-white rounded-md shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold text-red-600 mb-6 pb-2 border-b border-gray-200">TIN MỚI NHẤT</h3>
                <div className="space-y-6">
                  {latestNews.map((news) => (
                    <Link to={news.link} key={news.id} className="flex gap-4">
                      <img
                        src={news.thumbnail || "/placeholder.svg"}
                        alt={news.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 mb-1">{news.title}</h4>
                        <div className="text-gray-500 text-xs">{news.date}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}

