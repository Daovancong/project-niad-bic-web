"use client"

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { ShoppingCart, ChevronDown, ChevronRight, Menu, X } from "lucide-react"

// Dữ liệu menu đa cấp
const productMenuData = [
  {
    id: "car",
    title: "Bảo hiểm ô tô",
    href: "/bao-hiem-o-to",
    subMenu: [
      {
        id: "car-liability",
        title: "Bảo hiểm trách nhiệm dân sự chủ xe ô tô",
        href: "/bao-hiem-trach-nhiem-dan-su-o-to",
      },
      {
        id: "car-physical",
        title: "Bảo hiểm vật chất ô tô",
        href: "/bao-hiem-vat-chat-o-to",
      },
    ],
  },
  {
    id: "motorcycle",
    title: "Bảo hiểm xe máy",
    href: "/bao-hiem-xe-may",
    subMenu: [
      {
        id: "motorcycle-liability",
        title: "Bảo hiểm trách nhiệm dân sự chủ xe máy",
        href: "/bao-hiem-trach-nhiem-dan-su-xe-may",
      },
    ],
  },
  {
    id: "health",
    title: "Bảo hiểm sức khỏe",
    href: "/bao-hiem-suc-khoe",
    subMenu: [
      {
        id: "health-cancer",
        title: "Bảo hiểm bệnh ung thư",
        href: "/bao-hiem-benh-ung-thu",
      },
      {
        id: "health-accident",
        title: "Bảo hiểm tai nạn và sức khỏe cá nhân",
        href: "/bao-hiem-tai-nan-va-suc-khoe-ca-nhan",
      },
    ],
  },
  {
    id: "travel",
    title: "Bảo hiểm du lịch",
    href: "/bao-hiem-du-lich",
    subMenu: [
      {
        id: "travel-international",
        title: "Bảo hiểm du lịch quốc tế (ITI)",
        href: "/bao-hiem-du-lich-quoc-te",
      },
      {
        id: "travel-domestic",
        title: "Bảo hiểm du lịch trong nước (TRV)",
        href: "/bao-hiem-du-lich-trong-nuoc",
      },
      {
        id: "travel-accident",
        title: "Bảo hiểm tai nạn khách du lịch (TVC)",
        href: "/bao-hiem-tai-nan-khach-du-lich",
      },
    ],
  },
  {
    id: "accident",
    title: "Bảo hiểm tai nạn",
    href: "/bao-hiem-tai-nan",
    subMenu: [
      {
        id: "accident-24h",
        title: "Bảo hiểm tai nạn con người 24/24",
        href: "/bao-hiem-tai-nan-con-nguoi",
      },
      {
        id: "accident-electric",
        title: "Bảo hiểm tai nạn người sử dụng điện",
        href: "/bao-hiem-tai-nan-nguoi-su-dung-dien",
      },
      {
        id: "accident-extended",
        title: "Bảo hiểm tai nạn mở rộng",
        href: "/bao-hiem-tai-nan-mo-rong",
      },
    ],
  },
  {
    id: "home",
    title: "Bảo hiểm nhà tư nhân",
    href: "/bao-hiem-nha-tu-nhan",
    subMenu: [
      {
        id: "home-comprehensive",
        title: "Bảo hiểm toàn diện nhà tư nhân",
        href: "/bao-hiem-toan-dien-nha-tu-nhan",
      },
    ],
  },
  {
    id: "cyber",
    title: "Bảo hiểm an ninh mạng",
    href: "/bao-hiem-an-ninh-mang",
    subMenu: [
      {
        id: "cyber-security",
        title: "Bảo hiểm an ninh mạng",
        href: "/bao-hiem-an-ninh-mang",
      },
    ],
  },
]

interface NavItemProps {
  children: React.ReactNode
  to: string
  active: boolean
  isHome?: boolean
  isProduct?: boolean
  hasSubmenu?: boolean
}

function NavItem({ children, to, active, isHome = false, isProduct = false, hasSubmenu = false }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`px-2 py-1.5 mx-1.5 text-xs lg:text-sm font-medium relative group ${
        isProduct
          ? "text-red-600 border border-red-600 rounded-md"
          : isHome
            ? "text-black"
            : "text-gray-800 hover:text-red-600"
      }`}
    >
      <div className="flex items-center">
        {children}
        {hasSubmenu && <ChevronDown className="ml-1 w-3 h-3" />}
      </div>

      {isHome && (
        <div className="absolute bottom-[-20px] left-0 w-full flex flex-col items-center">
          <ChevronDown className="w-4 h-4 text-red-600" />
          <div className="w-full h-1 bg-red-600"></div>
        </div>
      )}
      <div
        className={`absolute bottom-[-20px] left-0 w-full flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        <ChevronDown className="w-4 h-4 text-red-600" />
        <div className="w-full h-1 bg-red-600"></div>
      </div>
    </Link>
  )
}

function ProductMenu() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const productMenuRef = useRef<HTMLDivElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0 })

  // Cập nhật vị trí của dropdown menu dựa trên vị trí của nút "SẢN PHẨM"
  useEffect(() => {
    if (productMenuRef.current) {
      const rect = productMenuRef.current.getBoundingClientRect()
      setDropdownPosition({
        left: rect.left,
      })
    }
  }, [])

  // Cập nhật lại vị trí khi cửa sổ thay đổi kích thước
  useEffect(() => {
    const handleResize = () => {
      if (productMenuRef.current) {
        const rect = productMenuRef.current.getBoundingClientRect()
        setDropdownPosition({
          left: rect.left,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="group relative" ref={productMenuRef}>
      <Link
        to="/san-pham"
        className="px-2 py-1.5 mx-1.5 text-xs lg:text-sm font-medium relative text-red-600 border border-red-600 rounded-md"
      >
        SẢN PHẨM
      </Link>

      {/* Indicator for hover - đảm bảo căn chỉnh giống các mục khác */}
      <div className="absolute bottom-[-20px] left-0 w-full flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronDown className="w-4 h-4 text-red-600" />
        <div className="w-full h-1 bg-red-600"></div>
      </div>

      {/* First level dropdown - positioned exactly at top of slider with correct horizontal position */}
      <div
        className="fixed top-[82px] w-64 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
        style={{ left: `${dropdownPosition.left}px` }}
      >
        <ul className="py-2">
          {productMenuData.map((item) => (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => setActiveSubmenu(item.id)}
              onMouseLeave={() => setActiveSubmenu(null)}
            >
              <Link
                to={item.href}
                className={`block px-4 py-2 hover:bg-gray-50 flex justify-between items-center ${
                  activeSubmenu === item.id ? "text-red-600" : "hover:text-red-600"
                }`}
              >
                <span>{item.title}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              {/* Second level dropdown - always show when parent is hovered */}
              {activeSubmenu === item.id && (
                <div className="absolute left-full top-0 w-72 bg-white shadow-lg rounded-md">
                  <ul className="py-2">
                    {/* If submenu exists, show those items */}
                    {item.subMenu && item.subMenu.length > 0 ? (
                      item.subMenu.map((subItem) => (
                        <li key={subItem.id}>
                          <Link to={subItem.href} className="block px-4 py-2 hover:bg-gray-50 hover:text-red-600">
                            {subItem.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      // If no submenu, repeat the parent item
                      <li>
                        <Link to={item.href} className="block px-4 py-2 hover:bg-gray-50 hover:text-red-600">
                          {item.title}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Menu mobile
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="lg:hidden">
      {/* Nút menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700"
        aria-label={isOpen ? "Đóng menu" : "Mở menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        {/* Header menu */}
        <div className="flex justify-between items-center p-3 border-b">
          <div className="w-36">
            <img src="/bic-logo.png" alt="BIC Logo" className="h-auto" />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-700" aria-label="Đóng menu">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content menu - sử dụng flex-1 để tự động điều chỉnh chiều cao */}
        <div className="p-3 pb-0 overflow-y-auto flex-1">
          <div className="text-gray-600 mb-3">ĐĂNG NHẬP</div>

          <Link to="/dang-ky" className="inline-block border border-gray-300 rounded px-4 py-2 text-center mb-3">
            ĐĂNG KÝ
          </Link>

          <nav className="flex flex-col">
            <Link
              to="/"
              className={`py-3 border-b border-gray-200 relative ${location.pathname === "/" ? "text-red-600" : "text-gray-700"}`}
              onMouseEnter={() => setHoveredItem("home")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              TRANG CHỦ
              {location.pathname === "/" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>}
              {hoveredItem === "home" && location.pathname !== "/" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
            </Link>

            <Link
              to="/san-pham"
              className="py-3 border-b border-gray-200 relative text-red-600"
              onMouseEnter={() => setHoveredItem("products")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              SẢN PHẨM
              {location.pathname === "/san-pham" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
              {hoveredItem === "products" && location.pathname !== "/san-pham" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
            </Link>

            <Link
              to="/gioi-thieu"
              className={`py-3 border-b border-gray-200 relative ${location.pathname === "/gioi-thieu" ? "text-red-600" : "text-gray-700"}`}
              onMouseEnter={() => setHoveredItem("about")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              GIỚI THIỆU
              {location.pathname === "/gioi-thieu" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
              {hoveredItem === "about" && location.pathname !== "/gioi-thieu" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
            </Link>

            <Link
              to="/tin-tuc"
              className={`py-3 border-b border-gray-200 relative ${location.pathname === "/tin-tuc" ? "text-red-600" : "text-gray-700"}`}
              onMouseEnter={() => setHoveredItem("news")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              TIN TỨC
              {location.pathname === "/tin-tuc" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
              {hoveredItem === "news" && location.pathname !== "/tin-tuc" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
            </Link>

            <Link
              to="/khuyen-mai"
              className={`py-3 border-b border-gray-200 relative ${location.pathname === "/khuyen-mai" ? "text-red-600" : "text-gray-700"}`}
              onMouseEnter={() => setHoveredItem("promotions")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              KHUYẾN MÃI
              {location.pathname === "/khuyen-mai" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
              {hoveredItem === "promotions" && location.pathname !== "/khuyen-mai" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
            </Link>

            <Link
              to="/lien-he"
              className={`py-3 border-b border-gray-200 relative ${location.pathname === "/lien-he" ? "text-red-600" : "text-gray-700"}`}
              onMouseEnter={() => setHoveredItem("contact")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              LIÊN HỆ
              {location.pathname === "/lien-he" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
              {hoveredItem === "contact" && location.pathname !== "/lien-he" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50 shadow-sm h-[82px]">
      <div className="container mx-auto px-2 h-full flex items-center justify-between">
        {/* Logo - reduced size */}
        <div className="w-28 md:w-32 lg:w-36">
          <img src="/bic-logo.png" alt="BIC Logo" width={150} height={38} className="h-auto" />
        </div>

        {/* Navigation - hiển thị trên desktop */}
        <nav className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-3">
          <NavItem to="/" active={location.pathname === "/"} isHome={location.pathname === "/"}>
            TRANG CHỦ
          </NavItem>
          <ProductMenu />
          <NavItem to="/gioi-thieu" active={location.pathname === "/gioi-thieu"}>
            GIỚI THIỆU
          </NavItem>
          <NavItem to="/tin-tuc" active={location.pathname === "/tin-tuc"}>
            TIN TỨC
          </NavItem>
          <NavItem to="/khuyen-mai" active={location.pathname === "/khuyen-mai"}>
            KHUYẾN MÃI
          </NavItem>
          <NavItem to="/lien-he" active={location.pathname === "/lien-he"}>
            LIÊN HỆ
          </NavItem>
        </nav>

        {/* Auth & Cart - hiển thị trên desktop */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <Link to="/dang-nhap" className="px-2 xl:px-3 py-1.5 text-xs xl:text-sm font-medium">
            ĐĂNG NHẬP
          </Link>
          <Link
            to="/dang-ky"
            className="px-2 xl:px-3 py-1.5 text-xs xl:text-sm font-medium border border-gray-300 rounded-md"
          >
            ĐĂNG KÝ
          </Link>
          <div className="relative ml-1">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
        </div>

        {/* Menu mobile - hiển thị trên tablet và mobile */}
        <div className="flex lg:hidden items-center gap-4">
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

