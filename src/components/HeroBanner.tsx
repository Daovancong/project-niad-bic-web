import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const totalSlides = 3 // We'll create 3 sample slides
  const sliderRef = useRef<HTMLDivElement>(null)
  const startPos = useRef<number>(0)
  const currentTranslate = useRef<number>(0)
  const prevTranslate = useRef<number>(0)
  const animationID = useRef<number | null>(null)
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    startAutoSlide()

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current)
      }
      if (animationID.current) {
        cancelAnimationFrame(animationID.current)
      }
    }
  }, [])

  const startAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current)
    }

    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)
  }

  const pauseAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current)
      autoSlideInterval.current = null
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    pauseAutoSlide()
    startAutoSlide()
  }

  const getPositionX = (event: MouseEvent | TouchEvent) => {
    return "touches" in event ? event.touches[0].clientX : (event as MouseEvent).clientX
  }

  const handleDragStart = (event: React.TouchEvent | React.MouseEvent) => {
    pauseAutoSlide()
    setIsDragging(true)
    startPos.current = getPositionX(event.nativeEvent)

    if (animationID.current) {
      cancelAnimationFrame(animationID.current)
    }
    
    if ("clientX" in event.nativeEvent) {
      event.preventDefault()
    }
  }

  const handleDragMove = (event: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return

    const currentPosition = getPositionX(event.nativeEvent)
    currentTranslate.current = prevTranslate.current + currentPosition - startPos.current

    // Prevent default to stop scrolling when swiping on touch devices
    if ("touches" in event.nativeEvent) {
      event.preventDefault()
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    const movedBy = currentTranslate.current - prevTranslate.current

    // If moved enough negative (swipe left), go to next slide
    if (movedBy < -100 && currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }

    // If moved enough positive (swipe right), go to previous slide
    if (movedBy > 100 && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }

    // If at the first slide and swiping right, go to the last slide
    if (movedBy > 100 && currentSlide === 0) {
      setCurrentSlide(totalSlides - 1)
    }

    // If at the last slide and swiping left, go to the first slide
    if (movedBy < -100 && currentSlide === totalSlides - 1) {
      setCurrentSlide(0)
    }

    prevTranslate.current = currentTranslate.current
    startAutoSlide()
  }

  // Sample slides data
  const slides = [
    {
      title: "PHÍ GIẢM THÊM AN, VỮNG VÀNG TAY LÁI",
      discount: "15%",
      description: "PHÍ BẢO HIỂM TNDS XE MÁY",
      subtext: "DÀNH CHO KHÁCH HÀNG TÁI TỤC KHÔNG PHÁT SINH TỔN THẤT",
      bgColor: "from-[#a8e0d1] to-[#b9e6d9]",
    },
    {
      title: "BẢO HIỂM XE MÁY TOÀN DIỆN",
      discount: "20%",
      description: "BẢO HIỂM VẬT CHẤT XE MÁY",
      subtext: "BẢO VỆ TOÀN DIỆN CHO XE CỦA BẠN",
      bgColor: "from-[#a8d0e1] to-[#b9d6e9]",
    },
    {
      title: "AN TÂM TRÊN MỌI HÀNH TRÌNH",
      discount: "10%",
      description: "BẢO HIỂM TAI NẠN NGƯỜI LÁI",
      subtext: "CHỈ TỪ 50.000 ĐỒNG/NĂM",
      bgColor: "from-[#c8e0a1] to-[#d9e6b9]",
    },
  ]

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-[calc(100vh-82px)] overflow-hidden cursor-grab"
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background with clouds effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}>
            {/* We would add cloud images here in a real implementation */}
          </div>

          {/* Main content */}
          <div className="container mx-auto px-4 h-full relative z-10">
            <div className="flex flex-col md:flex-row h-full">
              {/* Left side - Text content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-[#2a8b7d] text-3xl md:text-4xl font-bold text-right mb-4 drop-shadow-md">
                  {slide.title.split(",").map((part, i) => (
                    <span key={i}>
                      {part}
                      {i < slide.title.split(",").length - 1 && <br />}
                    </span>
                  ))}
                </h2>

                <div className="text-[#2a8b7d] text-4xl md:text-5xl font-bold mb-6">GIẢM NGAY</div>

                <div className="text-[#f0c14b] text-8xl md:text-9xl font-bold drop-shadow-lg mb-4">
                  {slide.discount}
                </div>

                <div className="text-[#2a8b7d] text-xl md:text-2xl font-bold mb-2">{slide.description}</div>

                <div className="text-[#2a8b7d] text-lg">
                  {slide.subtext.split(" ").length > 5 ? (
                    <>
                      {slide.subtext.split(" ").slice(0, 5).join(" ")}
                      <br />
                      {slide.subtext.split(" ").slice(5).join(" ")}
                    </>
                  ) : (
                    slide.subtext
                  )}
                </div>
              </div>

              {/* Right side - Image */}
              <div className="w-full md:w-1/2 flex items-center justify-center relative">
                <img
                  src="/placeholder.svg?height=500&width=300"
                  alt="Couple on motorcycle"
                  width={500}
                  height={300}
                  className="object-contain"
                  draggable="false"
                />

                {/* QR code */}
                <div className="absolute bottom-10 right-0">
                  <div className="text-right mb-2 text-[#2a8b7d]">mybic.vn</div>
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="QR Code"
                    width={100}
                    height={100}
                    className="ml-auto"
                    draggable="false"
                  />
                  <div className="text-right mt-2 text-[#2a8b7d]">1900 9456</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slider dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-[#2a8b7d]" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Visual indicator for swipe */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 pointer-events-none">
        <div className={`bg-white/30 rounded-full p-2 transition-opacity ${isDragging ? "opacity-50" : "opacity-0"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#2a8b7d]"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <div className={`bg-white/30 rounded-full p-2 transition-opacity ${isDragging ? "opacity-50" : "opacity-0"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#2a8b7d]"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  )
}

