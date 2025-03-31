import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const insuranceProducts = [
  {
    id: "cyber-risk",
    image: "/products/bic-cyber-risk.png",
    tag: "BIC Cyber Risk",
    title: "Bảo hiểm an ninh mạng",
    contactLink: "/lien-he/an-ninh-mang",
    buyLink: "/mua-ngay/an-ninh-mang",
  },
  {
    id: "phuc-tam-an",
    image: "/products/bic-phuc-tam-an.png",
    tag: "BIC Phúc Tâm An",
    title: "Bảo hiểm bệnh ung thư",
    contactLink: "/lien-he/benh-ung-thu",
    buyLink: "/mua-ngay/benh-ung-thu",
  },
  {
    id: "tam-an",
    image: "/products/bic-tam-an.png",
    tag: "BIC Tâm An",
    title: "Bảo hiểm tai nạn và sức khỏe cá nhân",
    contactLink: "/lien-he/tai-nan-suc-khoe",
    buyLink: "/mua-ngay/tai-nan-suc-khoe",
  },
  {
    id: "tai-nan-24h",
    image: "/products/bic-tai-nan-24h.png",
    tag: "BIC Tâm An",
    title: "Bảo hiểm tai nạn con người 24/24",
    contactLink: "/lien-he/tai-nan-24h",
    buyLink: "/mua-ngay/tai-nan-24h",
  },
  {
    id: "travel-care",
    image: "/products/bic-travel-care.png",
    tag: "BIC Travel Care",
    title: "Bảo hiểm du lịch trong nước (TRV)",
    contactLink: "/lien-he/du-lich-trong-nuoc",
    buyLink: "/mua-ngay/du-lich-trong-nuoc",
  },
  {
    id: "tnds-oto",
    image: "/products/bic-tnds-oto.png",
    tag: "TNDS Ô tô",
    title: "Bảo hiểm trách nhiệm dân sự chủ xe ô tô",
    contactLink: "/lien-he/tnds-oto",
    buyLink: "/mua-ngay/tnds-oto",
  },
  {
    id: "tnds-xe-may",
    image: "/products/bic-tnds-xe-may.png",
    tag: "TNDS Xe máy",
    title: "Bảo hiểm trách nhiệm dân sự chủ xe máy",
    contactLink: "/lien-he/tnds-xe-may",
    buyLink: "/mua-ngay/tnds-xe-may",
  },
  {
    id: "vat-chat-oto",
    image: "/products/bic-vat-chat-oto.png",
    tag: "Vật chất ô tô",
    title: "Bảo hiểm vật chất ô tô",
    contactLink: "/lien-he/vat-chat-oto",
    buyLink: "/mua-ngay/vat-chat-oto",
  },
  {
    id: "vat-chat-xe-may",
    image: "/products/bic-vat-chat-xe-may.png",
    tag: "Vật chất xe máy",
    title: "Bảo hiểm vật chất xe máy",
    contactLink: "/lien-he/vat-chat-xe-may",
    buyLink: "/mua-ngay/vat-chat-xe-may",
  },
  {
    id: "du-lich-quoc-te",
    image: "/products/bic-du-lich-quoc-te.png",
    tag: "Du lịch quốc tế",
    title: "Bảo hiểm du lịch quốc tế (ITI)",
    contactLink: "/lien-he/du-lich-quoc-te",
    buyLink: "/mua-ngay/du-lich-quoc-te",
  },
]

export default function ProductShowcase() {
  const [slideIndex, setSlideIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [itemsPerRow, setItemsPerRow] = useState(3)
  const [itemWidth, setItemWidth] = useState(0)

  const firstRowCount = Math.ceil(insuranceProducts.length / 2)
  const topRowProducts = insuranceProducts.slice(0, firstRowCount)
  const bottomRowProducts = insuranceProducts.slice(firstRowCount)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerRow(3) 
      } else if (window.innerWidth >= 768) {
        setItemsPerRow(2) 
      } else {
        setItemsPerRow(1) 
      }

    
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const gap = 24 
        const calculatedWidth = (containerWidth - gap * (itemsPerRow - 1)) / itemsPerRow
        setItemWidth(calculatedWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [itemsPerRow])

  const maxSlides = Math.max(0, topRowProducts.length - itemsPerRow)

  const nextSlide = () => {
    if (slideIndex < maxSlides) {
      setSlideIndex(slideIndex + 1)
    }
  }

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1)
    }
  }

  const getTranslateX = () => {
    if (itemWidth === 0) return 0
    const gapWidth = 24 
    return -slideIndex * (itemWidth + gapWidth)
  }

  const renderProductRow = (products: typeof insuranceProducts) => {
    return products.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex-shrink-0"
        style={{ width: itemWidth > 0 ? `${itemWidth}px` : `calc(100% / ${itemsPerRow})` }}
      >
        <div className="relative h-56">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-6">
          <div className="text-gray-600 text-center mb-2">{product.tag}</div>

          <h3 className="text-red-600 font-medium text-center mb-8">{product.title}</h3>

          <div className="flex justify-between items-center mt-4">
            <a href={product.contactLink} className="text-red-600 font-medium hover:underline">
              Liên hệ
            </a>

            <a
              href={product.buyLink}
              className="border border-red-600 text-red-600 px-6 py-2 rounded hover:bg-red-600 hover:text-white transition-colors"
            >
              MUA NGAY
            </a>
          </div>
        </div>
      </div>
    ))
  }

  const canSlideNext = slideIndex < maxSlides

  const canSlidePrev = slideIndex > 0

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-red-600 text-3xl font-bold mb-12">Sản phẩm Bảo hiểm trực tuyến BIC</h2>

        <div className="relative px-16">
          <button
            onClick={prevSlide}
            className={`absolute left-[-10px] top-1/2 transform -translate-y-1/2 z-10 ${
              canSlidePrev ? "text-gray-600 hover:text-red-600" : "text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Previous slide"
            disabled={!canSlidePrev}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-[-10px] top-1/2 transform -translate-y-1/2 z-10 ${
              canSlideNext ? "text-gray-600 hover:text-red-600" : "text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Next slide"
            disabled={!canSlideNext}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div ref={containerRef} className="overflow-hidden">
            <div className="grid grid-rows-2 gap-6">
              <div className="overflow-hidden">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(${getTranslateX()}px)` }}
                >
                  {renderProductRow(topRowProducts)}
                </div>
              </div>

              <div className="overflow-hidden">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(${getTranslateX()}px)` }}
                >
                  {renderProductRow(bottomRowProducts)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

