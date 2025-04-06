"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { newsData } from "../data/newsData"

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Lọc tin tức theo từ khóa tìm kiếm
  const filteredNews = newsData.filter(
    (news) => searchTerm === "" || news.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)

  // Lấy tin tức cho trang hiện tại
  const currentNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Xử lý chuyển trang
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-[81px]">
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
            <div className="w-full lg:w-3/4">
              {/* Danh sách tin tức */}
              <div className="space-y-10">
                {currentNews.map((news) => (
                  <div key={news.id} className="bg-white rounded-md overflow-hidden shadow-md">
                    <Link to={news.link}>
                      <img
                        src={news.image || "/placeholder.svg"}
                        alt={news.title}
                        className="w-full h-[400px] object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </Link>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-gray-500 text-sm">{news.date}</div>
                        <div className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-600">{news.category}</div>
                      </div>
                      <Link to={news.link}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-red-600 transition-colors">
                          {news.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-4">{news.excerpt}</p>
                      <Link to={news.link} className="inline-block">
                        <button className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-colors">
                          Xem thêm
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phân trang */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-md ${
                          currentPage === page ? "bg-red-600 text-white" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cột phải - Sidebar */}
            <div className="w-full lg:w-1/4">
              {/* Ô tìm kiếm */}
              <div className="bg-white rounded-md shadow-md p-4 mb-8">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1) // Reset về trang 1 khi tìm kiếm
                    }}
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
                  {newsData
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 3)
                    .map((news) => (
                      <Link to={news.link} key={news.id} className="flex gap-4">
                        <img
                          src={news.thumbnail || "/placeholder.svg"}
                          alt={news.title}
                          className="w-20 h-20 object-cover rounded-md"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">{news.title}</h4>
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

