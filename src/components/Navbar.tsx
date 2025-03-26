"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ShoppingCart, ChevronDown, ChevronRight } from "lucide-react"

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
  href: string
  active: boolean
  isHome?: boolean
  isProduct?: boolean
  hasSubmenu?: boolean
}

function NavItem({ children, href, active, isHome = false, isProduct = false, hasSubmenu = false }: NavItemProps) {
  return (
    <a
      href={href}
      className={`px-4 py-2 mx-1 font-medium relative group ${
        isProduct
          ? "text-red-600 border border-red-600 rounded-md"
          : isHome
            ? "text-black"
            : "text-gray-800 hover:text-red-600"
      }`}
    >
      <div className="flex items-center">
        {children}
        {hasSubmenu && <ChevronDown className="ml-1 w-4 h-4" />}
      </div>

      {isHome && (
        <div className="absolute bottom-[-20px] left-0 w-full flex flex-col items-center">
          <ChevronDown className="w-5 h-5 text-red-600" />
          <div className="w-full h-1 bg-red-600"></div>
        </div>
      )}
      <div
        className={`absolute bottom-[-20px] left-0 w-full flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        <ChevronDown className="w-5 h-5 text-red-600" />
        <div className="w-full h-1 bg-red-600"></div>
      </div>
    </a>
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
      <a href="/san-pham" className="px-4 py-2 mx-1 font-medium relative text-red-600 border border-red-600 rounded-md">
        SẢN PHẨM
      </a>

      {/* Indicator for hover - đảm bảo căn chỉnh giống các mục khác */}
      <div className="absolute bottom-[-23px] left-0 w-full flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronDown className="w-5 h-5 text-red-600" />
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
              <a
                href={item.href}
                className={`block px-4 py-2 hover:bg-gray-50 flex justify-between items-center ${
                  activeSubmenu === item.id ? "text-red-600" : "hover:text-red-600"
                }`}
              >
                <span>{item.title}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              {/* Second level dropdown - always show when parent is hovered */}
              {activeSubmenu === item.id && (
                <div className="absolute left-full top-0 w-72 bg-white shadow-lg rounded-md">
                  <ul className="py-2">
                    {/* If submenu exists, show those items */}
                    {item.subMenu && item.subMenu.length > 0 ? (
                      item.subMenu.map((subItem) => (
                        <li key={subItem.id}>
                          <a href={subItem.href} className="block px-4 py-2 hover:bg-gray-50 hover:text-red-600">
                            {subItem.title}
                          </a>
                        </li>
                      ))
                    ) : (
                      // If no submenu, repeat the parent item
                      <li>
                        <a href={item.href} className="block px-4 py-2 hover:bg-gray-50 hover:text-red-600">
                          {item.title}
                        </a>
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

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50 shadow-sm h-[82px]">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo - reduced size */}
        <div className="w-48">
          <img src="/bic-logo.png" alt="BIC Logo" width={180} height={45} className="h-auto" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center">
          <NavItem href="/" active={true} isHome={true}>
            TRANG CHỦ
          </NavItem>
          <ProductMenu />
          <NavItem href="/gioi-thieu" active={false}>
            GIỚI THIỆU
          </NavItem>
          <NavItem href="/tin-tuc" active={false}>
            TIN TỨC
          </NavItem>
          <NavItem href="/khuyen-mai" active={false}>
            KHUYẾN MÃI
          </NavItem>
          <NavItem href="/lien-he" active={false}>
            LIÊN HỆ
          </NavItem>
        </nav>

        {/* Auth & Cart */}
        <div className="flex items-center gap-4">
          <a href="/dang-nhap" className="px-4 py-2 text-sm font-medium">
            ĐĂNG NHẬP
          </a>
          <a href="/dang-ky" className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md">
            ĐĂNG KÝ
          </a>
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

