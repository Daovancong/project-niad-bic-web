import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NewsItem {
  id: string
  image: string
  title: string
  description: string
  link: string
}

export default function News() {
  const newsItems: NewsItem[] = [
    {
      id: "news1",
      image: "/placeholder.svg?height=200&width=300",
      title: "BIC TẶNG QUÀ HẤP DẪN MỪNG NGÀY PHỤ NỮ VIỆT NAM",
      description:
        "Chào mừng ngày Phụ nữ Việt Nam 20/10, từ ngày 11/10/2024 đến ngày 31/10/2024, Tổng Công ty Bảo hiểm BIDV (BIC) gửi tặng...",
      link: "/tin-tuc/bic-tang-qua-phu-nu-viet-nam",
    },
    {
      id: "news2",
      image: "/placeholder.svg?height=200&width=300",
      title: "10.10: TƯNG BỪNG ƯU ĐÃI TỚI 30% PHÍ BẢO HIỂM TẠI BIC",
      description:
        "Chào mừng 70 năm Ngày Giải phóng Thủ đô (10/10/1954 – 10/10/2024), Tổng Công ty Bảo hiểm BIDV (BIC) gửi tặng khách hàng...",
      link: "/tin-tuc/uu-dai-30-phan-tram",
    },
    {
      id: "news3",
      image: "/placeholder.svg?height=200&width=300",
      title: "SIÊU HỘI NGÀY ĐÔI 9.9: BIC ƯU ĐÃI TỚI 40% PHÍ BẢO HIỂM",
      description:
        'Ngày 09/09/2024, Tổng Công ty Bảo hiểm BIDV (BIC) gửi tặng khách hàng chương trình khuyến mại "Ngày vàng siêu ưu đãi"...',
      link: "/tin-tuc/sieu-hoi-ngay-doi",
    },
    {
      id: "news4",
      image: "/placeholder.svg?height=200&width=300",
      title: "BIC TRIỂN KHAI CHƯƠNG TRÌNH BẢO HIỂM XE MÁY MỚI",
      description:
        "Từ ngày 01/08/2024, BIC chính thức triển khai chương trình bảo hiểm xe máy mới với nhiều quyền lợi hấp dẫn cho khách hàng...",
      link: "/tin-tuc/bao-hiem-xe-may-moi",
    },
    {
      id: "news5",
      image: "/placeholder.svg?height=200&width=300",
      title: "BIC ĐƯỢC VINH DANH TOP 10 DOANH NGHIỆP BẢO HIỂM UY TÍN",
      description:
        "Ngày 15/07/2024, BIC vinh dự được trao tặng danh hiệu Top 10 Doanh nghiệp Bảo hiểm uy tín năm 2024 do Công ty CP Báo cáo Đánh giá VN tổ chức...",
      link: "/tin-tuc/top-10-doanh-nghiep-bao-hiem",
    },
  ]

  const [slideIndex, setSlideIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [itemsPerRow, setItemsPerRow] = useState(3)
  const [itemWidth, setItemWidth] = useState(0)

  // Xác định số lượng tin tức hiển thị dựa trên kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerRow(3) // Desktop: 3 tin tức mỗi hàng
      } else if (window.innerWidth >= 768) {
        setItemsPerRow(2) // Tablet: 2 tin tức mỗi hàng
      } else {
        setItemsPerRow(1) // Mobile: 1 tin tức mỗi hàng
      }

      // Tính toán chiều rộng của mỗi item
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const gap = 24 // gap-6 = 1.5rem = 24px
        const calculatedWidth = (containerWidth - gap * (itemsPerRow - 1)) / itemsPerRow
        setItemWidth(calculatedWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [itemsPerRow])

  // Tính toán số slide tối đa
  const maxSlides = Math.max(0, newsItems.length - itemsPerRow)

  // Di chuyển sang phải
  const nextSlide = () => {
    if (slideIndex < maxSlides) {
      setSlideIndex(slideIndex + 1)
    }
  }

  // Di chuyển sang trái
  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1)
    }
  }

  // Tính toán translateX dựa trên slide hiện tại
  const getTranslateX = () => {
    if (itemWidth === 0) return 0
    const gapWidth = 24 // gap-6 = 1.5rem = 24px
    return -slideIndex * (itemWidth + gapWidth)
  }

  // Kiểm tra xem có thể trượt sang phải không
  const canSlideNext = slideIndex < maxSlides

  // Kiểm tra xem có thể trượt sang trái không
  const canSlidePrev = slideIndex > 0

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tiêu đề */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-0.5 bg-gray-400 mb-4"></div>
          <h2 className="text-3xl font-bold text-red-600">Tin tức</h2>
        </div>

        {/* Slider */}
        <div className="relative px-16">
          {/* Nút điều hướng trái */}
          <button
            onClick={prevSlide}
            className={`absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 ${
              canSlidePrev ? "text-gray-600 hover:text-red-600" : "text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Previous slide"
            disabled={!canSlidePrev}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Tin tức */}
          <div ref={containerRef} className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${getTranslateX()}px)` }}
            >
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-md shadow-md overflow-hidden flex-shrink-0"
                  style={{ width: itemWidth > 0 ? `${itemWidth}px` : `calc(100% / ${itemsPerRow})` }}
                >
                  <a href={item.link} className="block">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-56 object-cover" />
                    <div className="p-6">
                      <h3 className="font-medium text-gray-700 text-center mb-4 text-base">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Nút điều hướng phải */}
          <button
            onClick={nextSlide}
            className={`absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 ${
              canSlideNext ? "text-gray-600 hover:text-red-600" : "text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Next slide"
            disabled={!canSlideNext}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      </div>
    </section>
  )
}

